import { Canvas, Image } from "@napi-rs/canvas";
import { ToolBox } from "./ToolBox";
import * as fs from "node:fs";

export class ImageTool extends ToolBox {
    #loadImage(img: Buffer) {
        const image = new Image();
        image.src = img;
        return image;
    }

    public async load(source: string | URL | Buffer | Image | Canvas) {
        if (Buffer.isBuffer(source)) return this.#loadImage(source);
        if (source instanceof Image) return this.#loadImage(source.src);
        if (source instanceof Canvas) return this.#loadImage(await source.encode("png"));
        if ((typeof source === "string" || source instanceof URL) && fs.existsSync(source)) {
            const data = await fs.promises.readFile(source);
            return this.#loadImage(data);
        }

        if (typeof source === "string" || source instanceof URL) {
            const ab = await fetch(source as unknown as RequestInfo, {
                method: "GET",
                redirect: "follow"
            }).then((res) => {
                if (!res.ok) throw new Error(`request for image source rejected with status code "${res.status}"`);
                return res.arrayBuffer();
            });

            return this.#loadImage(Buffer.from(ab));
        }

        throw new TypeError("Unsupported source type");
    }

    public draw(image: Image, dx: number, dy: number, dw?: number, dh?: number) {
        this.history.push((ctx) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ctx.drawImage(image, dx, dy, dw!, dh!);
        });

        return this;
    }

    public render() {
        this.layer.applyTool(this);
    }
}
