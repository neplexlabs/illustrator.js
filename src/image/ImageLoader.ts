import { Canvas, Image, ImageData } from "@napi-rs/canvas";
import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import { Readable } from "stream";
import { Illustrator } from "../illustrator/Illustrator";
import { IllustratorImage } from "./IllustratorImage";
import { Layer } from "../layer/Layer";
import isBufferLike from "is-buffer-like";

export type IllustratorImageSource =
    | string
    | URL
    | Buffer
    | Image
    | Canvas
    | ArrayBuffer
    | SharedArrayBuffer
    | Uint8Array
    | Layer
    | Illustrator
    | IllustratorImage
    | ImageData;

function createImage(source: Buffer, bufferOnly = false) {
    if (bufferOnly) return source;
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

export class ImageLoader extends null {
    private constructor() {
        /* no-op */
    }

    /**
     * Loads the given source into `Image` instance.
     * @param source The image source to load
     * @example import { loadImage } from "illustrator.js";
     *
     * const image = await loadImage("https://example.com/image.png");
     * console.log(image.width, image.height);
     */
    public static async loadImage(source: IllustratorImageSource, bufferOnly?: false): Promise<Image>;
    public static async loadImage(source: IllustratorImageSource, bufferOnly?: true): Promise<Buffer>;
    public static async loadImage(source: IllustratorImageSource, bufferOnly?: boolean): Promise<Image | Buffer> {
        if (source instanceof Readable) return createImage(await consumeStream(source), bufferOnly);
        if (Buffer.isBuffer(source)) return createImage(source, bufferOnly);
        if (isBufferLike(source)) return createImage(Buffer.from(source as Buffer), bufferOnly);
        if (source instanceof Image) return createImage(source.src, bufferOnly);
        if (source instanceof Canvas) return createImage(await source.encode("png"), bufferOnly);
        if (source instanceof Layer)
            return createImage(await ((await source.render()) as Canvas).encode("png"), bufferOnly);
        if (source instanceof Illustrator) return createImage(await source.export(), bufferOnly);
        if (source instanceof IllustratorImage) return createImage(await source.png(), bufferOnly);
        if (source instanceof ImageData) {
            const img = await IllustratorImage.fromImageData(source);
            return createImage(await img.png(), bufferOnly);
        }
        if ((typeof source === "string" || source instanceof URL) && fs.existsSync(source)) {
            const data = await fs.promises.readFile(source);
            return createImage(data, bufferOnly);
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

                return createImage(Buffer.from(ab), bufferOnly);
            } else {
                const res = await httpReq(source);
                return createImage(res, bufferOnly);
            }
        }

        throw new TypeError("Unsupported source type");
    }

    /**
     * Creates `Image` instance
     * @param data The image source data
     */
    public static createImage(data: Buffer) {
        return createImage(data, false) as Image;
    }
}
