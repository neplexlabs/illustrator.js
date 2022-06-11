import { Canvas, Image } from "@napi-rs/canvas";
import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import { Readable } from "stream";

export type IllustratorImageSource = string | URL | Buffer | Image | Canvas | ArrayBuffer | SharedArrayBuffer;

function createImage(source: Buffer) {
    const image = new Image();
    image.src = source;
    return image;
}

// TODO: use stream/consumers for this?
function consumeStream(stream: Readable) {
    return new Promise<Buffer>((resolve, reject) => {
        const body: Buffer[] = [];

        stream.on("data", (chunk: Buffer) => body.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(body)));
        stream.on("error", (err) => reject(err));
    });
}

function makeRequest(
    link: string | URL,
    redirectCount: number,
    resolve: (v: Buffer) => void,
    reject: (e: Error) => void
) {
    const url = typeof link === "string" ? new URL(link) : link;
    const reqBy = url.protocol === "http:" ? http : https;
    reqBy.get(url, (res) => {
        const shouldRedirect =
            [301, 302].includes(res.statusCode as number) && typeof res.headers.location === "string";
        if (shouldRedirect && redirectCount > 0)
            return makeRequest(res.headers.location as string, redirectCount - 1, resolve, reject);
        if (typeof res.statusCode === "number" && !(res.statusCode >= 200 && res.statusCode < 300)) {
            return reject(new Error(`request for image source rejected with status code "${res.statusCode}"`));
        }

        consumeStream(res).then(resolve, reject);
    });
}

function httpReq(link: string | URL): Promise<Buffer> {
    return new Promise((resolve, reject) => makeRequest(link, 20, resolve, reject));
}

/**
 * Loads the given source into `Image` instance.
 * @param source The image source to load
 * @example import { loadImage } from "illustrator.js";
 *
 * const image = await loadImage("https://example.com/image.png");
 * console.log(image.width, image.height);
 */
export async function loadImage(source: IllustratorImageSource) {
    if (source instanceof Readable) return createImage(await consumeStream(source));
    if (Buffer.isBuffer(source)) return createImage(source);
    if (source instanceof ArrayBuffer || source instanceof SharedArrayBuffer) return createImage(Buffer.from(source));
    if (source instanceof Image) return createImage(source.src);
    if (source instanceof Canvas) return createImage(await source.encode("png"));
    if ((typeof source === "string" || source instanceof URL) && fs.existsSync(source)) {
        const data = await fs.promises.readFile(source);
        return createImage(data);
    }

    if (typeof source === "string" || source instanceof URL) {
        if (typeof fetch === "function") {
            const ab = await fetch(source as unknown as RequestInfo, {
                method: "GET",
                redirect: "follow"
            }).then((res) => {
                if (!res.ok) throw new Error(`request for image source rejected with status code "${res.status}"`);
                return res.arrayBuffer();
            });

            return createImage(Buffer.from(ab));
        } else {
            const res = await httpReq(source);
            return createImage(res);
        }
    }

    throw new TypeError("Unsupported source type");
}
