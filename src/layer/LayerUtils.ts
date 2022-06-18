import { ColorSpace, Image, ImageData, SKRSContext2D } from "@napi-rs/canvas";

export class LayerUtils {
    #ctx: SKRSContext2D;

    public constructor(ctx: SKRSContext2D) {
        this.#ctx = ctx;
    }

    public measureText(text: string) {
        return this.#ctx.measureText(text);
    }

    public getLayerTransformation() {
        return this.#ctx.getTransform();
    }

    public createLinearGradient(x0: number, x1: number, y0: number, y1: number) {
        return this.#ctx.createLinearGradient(x0, x1, y0, y1);
    }

    public createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number) {
        return this.#ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    }

    public createConicGradient(startAngle: number, x: number, y: number) {
        return this.#ctx.createConicGradient(startAngle, x, y);
    }

    public createPattern(image: Image | ImageData, repeat: "repeat" | "repeat-x" | "repeat-y" | "no-repeat" | null) {
        return this.#ctx.createPattern(image, repeat);
    }

    public getImageData(sx = 0, sy = 0, sw = this.#ctx.canvas.width, sh = this.#ctx.canvas.height) {
        return this.#ctx.getImageData(sx, sy, sw, sh);
    }

    public putImageData(data: ImageData & { colorSpace: ColorSpace }, dx: number, dy: number) {
        return this.#ctx.putImageData(data, dx, dy);
    }

    public getCenterPoint(divider = 2) {
        if (typeof divider !== "number") throw new TypeError("divider must be a number");

        return {
            x: this.#ctx.canvas.width / divider,
            y: this.#ctx.canvas.height / divider
        };
    }
}
