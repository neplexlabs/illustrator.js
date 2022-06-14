import { ToolBox } from "../base/ToolBox";

export interface EraserOptions {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class EraserTool extends ToolBox {
    public rectangular(options: EraserOptions) {
        this.history.push((ctx) => {
            ctx.clearRect(options.x, options.y, options.width, options.height);
        });
        return this;
    }

    public circular(options: Omit<EraserOptions, "width" | "height"> & { radius?: number }) {
        this.history.push((ctx) => {
            ctx.beginPath();
            ctx.arc(options.x, options.y, options.radius ?? 50, 0, 2 * Math.PI);
            ctx.clip();
            ctx.clearRect(0, 0, this.layer.width, this.layer.height);
        });
        return this;
    }

    public render() {
        this.layer.applyTool(this);
    }
}
