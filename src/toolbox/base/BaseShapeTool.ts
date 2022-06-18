import { Path2D } from "@napi-rs/canvas";
import { makeArgs } from "../../utils/makeArgs";
import { ToolBox } from "./ToolBox";

export class BaseShapeTool extends ToolBox {
    public setFillColor(color: string | CanvasGradient | CanvasPattern) {
        this.history.push((ctx) => {
            ctx.fillStyle = color;
        });

        return this;
    }

    public setStrokeColor(color: string | CanvasGradient | CanvasPattern) {
        this.history.push((ctx) => {
            ctx.strokeStyle = color;
        });

        return this;
    }

    public setLineWidth(width: number) {
        this.history.push((ctx) => {
            ctx.lineWidth = width;
        });

        return this;
    }

    public setLineCap(lineCapStyle: CanvasLineCap) {
        this.history.push((ctx) => {
            ctx.lineCap = lineCapStyle;
        });

        return this;
    }

    public setDashOffset(offset: number) {
        this.history.push((ctx) => {
            ctx.lineDashOffset = offset;
        });

        return this;
    }

    public setLineJoinStyle(style: "round" | "bevel" | "miter") {
        this.history.push((ctx) => {
            ctx.lineJoin = style;
        });

        return this;
    }

    public setMiterLimit(limit: number) {
        this.history.push((ctx) => {
            ctx.miterLimit = limit;
        });

        return this;
    }

    public addPoint() {
        this.history.push((ctx) => {
            ctx.beginPath();
        });

        return this;
    }

    public removePoint() {
        this.history.push((ctx) => {
            ctx.closePath();
        });

        return this;
    }

    public move(x: number, y: number) {
        this.history.push((ctx) => {
            ctx.moveTo(x, y);
        });

        return this;
    }

    public fill(options?: { fillRule?: "evenodd" | "nonzero"; path: Path2D }) {
        this.history.push((ctx) => {
            if (!options) return ctx.fill();
            ctx.fill(
                ...makeArgs(
                    (arg, idx) => (idx === 0 ? arg instanceof Path2D : idx === 1 ? typeof arg === "string" : false),
                    [options.path, options.fillRule]
                )
            );
        });

        return this;
    }

    public stroke(options?: { path: Path2D }) {
        this.history.push((ctx) => {
            options?.path ? ctx.stroke(options.path) : ctx.stroke();
        });

        return this;
    }

    public setLineDash(segments: number[] = []) {
        this.history.push((ctx) => {
            ctx.setLineDash(segments);
        });

        return this;
    }

    public clip(options?: { fillRule?: "evenodd" | "nonzero"; path?: Path2D }) {
        this.history.push((ctx) => {
            if (!options) return ctx.clip();
            ctx.clip(
                ...makeArgs(
                    (arg, idx) => (idx === 0 ? arg instanceof Path2D : idx === 1 ? typeof arg === "string" : false),
                    [options.path, options.fillRule]
                )
            );
        });

        return this;
    }
}
