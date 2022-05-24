import { Image, SKRSContext2D } from "@napi-rs/canvas";

export class LayerUtils {
    #ctx: SKRSContext2D;

    public constructor(ctx: SKRSContext2D) {
        this.#ctx = ctx;
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
}
