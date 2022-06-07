import { BaseShapeTool } from "../base/BaseShapeTool";

export interface DrawArcOptions {
    x: number;
    y: number;
    radius: number;
    startAngle: number;
    endAngle: number;
    counterclockwise?: boolean;
}

export interface ArcToPoint {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    radius: number;
}

export interface QuadraticBezierCurveOptions {
    controlPointX: number;
    controlPointY: number;
    x: number;
    y: number;
}

export interface CubicBezierCurveOptions {
    firstControlPointX: number;
    firstControlPointY: number;
    secondControlPointX: number;
    secondControlPointY: number;
    x: number;
    y: number;
}

export class LineTool extends BaseShapeTool {
    public draw(from: number, to: number) {
        this.history.push((ctx) => {
            ctx.lineTo(from, to);
        });

        return this;
    }

    public arc(options: DrawArcOptions) {
        this.history.push((ctx) => {
            ctx.arc(
                options.x,
                options.y,
                options.radius,
                options.startAngle,
                options.endAngle,
                !!options.counterclockwise
            );
        });

        return this;
    }

    public arcTo(options: ArcToPoint) {
        this.history.push((ctx) => {
            ctx.arcTo(options.x1, options.y1, options.x2, options.y2, options.radius);
        });

        return this;
    }

    public quadraticBezierCurve(options: QuadraticBezierCurveOptions) {
        this.history.push((ctx) => {
            ctx.quadraticCurveTo(options.controlPointX, options.controlPointY, options.x, options.y);
        });

        return this;
    }

    public cubicBezierCurve(options: CubicBezierCurveOptions) {
        this.history.push((ctx) => {
            ctx.bezierCurveTo(
                options.firstControlPointX,
                options.firstControlPointY,
                options.secondControlPointX,
                options.secondControlPointY,
                options.x,
                options.y
            );
        });

        return this;
    }
}
