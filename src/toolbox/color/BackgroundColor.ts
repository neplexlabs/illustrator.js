import { ToolBox } from "../base/ToolBox";

export class BackgroundColorTool extends ToolBox {
    public setFillColor(color: string | CanvasPattern | CanvasGradient) {
        this.history.push((ctx) => {
            ctx.fillStyle = color;
        });
        return this;
    }

    public fill(x: number, y: number, w: number, h: number) {
        this.history.push((ctx) => {
            ctx.fillRect(x, y, w, h);
        });
        return this;
    }

    public stroke(x: number, y: number, w: number, h: number) {
        this.history.push((ctx) => {
            ctx.strokeRect(x, y, w, h);
        });
        return this;
    }

    public setStrokeColor(color: string | CanvasPattern | CanvasGradient) {
        this.history.push((ctx) => {
            ctx.strokeStyle = color;
        });
        return this;
    }

    public setStrokeWidth(w: number) {
        this.history.push((ctx) => {
            ctx.lineWidth = w;
        });
        return this;
    }

    public render() {
        this.layer.applyTool(this);
    }
}
