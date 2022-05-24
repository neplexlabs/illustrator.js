import { ImageData } from "@napi-rs/canvas";
import { ToolBox } from "./ToolBox";
import { run } from "./workers/manager";

export interface ConvolutionOptions {
    sx?: number;
    sy?: number;
    opaque?: boolean;
    weights: Array<number>;
    iterations?: number;
}

export class ConvolutionTool extends ToolBox {
    // TODO: fix this
    public convolute(options: ConvolutionOptions) {
        this.history.push(async (ctx) => {
            options.iterations ??= 1;
            if (options.iterations < 1 || !Number.isFinite(options.iterations)) options.iterations = 1;
            const pixels = ctx.getImageData(options.sx ?? 0, options.sy ?? 0, ctx.canvas.width, ctx.canvas.height);
            const rawData = await run<{ width: number; height: number; data: Uint8ClampedArray }>("convolute", {
                opaque: Boolean(options.opaque),
                weights: options.weights,
                pixels,
                iterations: options.iterations
            });
            const convolutedData = new ImageData(rawData.data, rawData.width, rawData.height) as ImageData & {
                colorSpace: PredefinedColorSpace;
            };
            ctx.putImageData(convolutedData, options.sx ?? 0, options.sy ?? 0);
        });
    }

    public render() {
        this.layer.applyTool(this);
    }
}
