import { ConvolutionTool } from "./ConvolutionFilter";

export class SharpenTool extends ConvolutionTool {
    public applySharpness(amount = 1) {
        amount = amount < 1 ? 1 : !Number.isFinite(amount) ? 1 : amount;

        this.convolute({
            matrix: this.matrices.Sharpen,
            iterations: amount
        });

        return this;
    }
}
