import { SKRSContext2D } from "@napi-rs/canvas";
import { ToolBox } from "../base/ToolBox";

export interface ConvolutionOptions {
    sx?: number;
    sy?: number;
    opaque?: boolean;
    matrix: Array<number>;
    iterations?: number;
}

export class ConvolutionTool extends ToolBox {
    public convolute(options: ConvolutionOptions) {
        this.history.push(async (ctx) => {
            options.iterations ??= 1;
            if (options.iterations < 1 || !Number.isFinite(options.iterations)) options.iterations = 1;

            for (let i = 0; i < options.iterations; i++) {
                this.#convoluteInternal({
                    ctx,
                    opaque: options.opaque ?? true,
                    sx: options.sx ?? 0,
                    sy: options.sy ?? 0,
                    matrix: options.matrix,
                    // not required here
                    iterations: 0
                });
            }
        });

        return this;
    }

    #convoluteInternal(options: Required<ConvolutionOptions> & { ctx: SKRSContext2D }) {
        const side = Math.round(Math.sqrt(options.matrix.length));
        const halfSide = Math.floor(side / 2);
        const pixels = options.ctx.getImageData(
            options.sx,
            options.sy,
            options.ctx.canvas.width,
            options.ctx.canvas.height
        );
        const src = pixels.data;
        const sw = pixels.width;
        const sh = pixels.height;
        const w = sw;
        const h = sh;
        const output = options.ctx.getImageData(
            options.sx,
            options.sy,
            options.ctx.canvas.width,
            options.ctx.canvas.height
        );
        const dst = output.data;
        const alphaFac = options.opaque ? 1 : 0;

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const sy = y;
                const sx = x;
                const dstOff = (y * w + x) * 4;
                let r = 0;
                let g = 0;
                let b = 0;
                let a = 0;
                for (let cy = 0; cy < side; cy++) {
                    for (let cx = 0; cx < side; cx++) {
                        const scy = sy + cy - halfSide;
                        const scx = sx + cx - halfSide;
                        if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                            const srcOff = (scy * sw + scx) * 4;
                            const wt = options.matrix[cy * side + cx];
                            r += src[srcOff] * wt;
                            g += src[srcOff + 1] * wt;
                            b += src[srcOff + 2] * wt;
                            a += src[srcOff + 3] * wt;
                        }
                    }
                }
                dst[dstOff] = r;
                dst[dstOff + 1] = g;
                dst[dstOff + 2] = b;
                dst[dstOff + 3] = a + alphaFac * (255 - a);
            }
        }

        options.ctx.putImageData(output, options.sx, options.sy);
    }

    public get matrices() {
        return {
            Identify: [0, 0, 0, 0, 1, 0, 0, 0, 0],
            Ridge: [-1, -1, -1 - 1, 8, -1, -1, -1, -1],
            Sharpen: [0, -1, 0, -1, 5, -1, 0, -1, 0],
            Blur: [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9],
            Edge: [0, -1, 0, -1, 4, -1, 0, -1, 0]
        };
    }
}
