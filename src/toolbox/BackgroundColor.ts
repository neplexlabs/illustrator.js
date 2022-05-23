import { ToolBox } from "./ToolBox";

export class BackgroundColorTool extends ToolBox {
    public setFillColor(color: string) {
        this.history.push((ctx) => {
            ctx.fillStyle = color;
        });
    }

    public fill(x: number, y: number, w: number, h: number) {
        this.history.push((ctx) => {
            ctx.fillRect(x, y, w, h);
        });
    }

    public stroke(x: number, y: number, w: number, h: number) {
        this.history.push((ctx) => {
            ctx.strokeRect(x, y, w, h);
        });
    }

    public setStrokeColor(color: string) {
        this.history.push((ctx) => {
            ctx.strokeStyle = color;
        });
    }

    public setStrokeWidth(w: number) {
        this.history.push((ctx) => {
            ctx.lineWidth = w;
        });
    }

    public render() {
        this.layer.applyTool(this);
    }
}
