import { BaseShapeTool } from "../base/BaseShapeTool";

export interface RectangleOptions {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface RoundedRectangleOptions {
    x: number;
    y: number;
    width: number;
    height: number;
    radius: number;
}

export class RectangleTool extends BaseShapeTool {
    public draw(options: RectangleOptions) {
        this.history.push((ctx) => {
            ctx.rect(options.x, options.y, options.width, options.height);
        });

        return this;
    }

    public drawRounded(options: RoundedRectangleOptions) {
        if (options.width < 2 * options.radius) options.radius = options.width / 2;
        if (options.height < 2 * options.radius) options.radius = options.height / 2;

        this.history.push((ctx) => {
            ctx.beginPath();
            ctx.moveTo(options.x + options.radius, options.y);
            ctx.arcTo(
                options.x + options.width,
                options.y,
                options.x + options.width,
                options.y + options.height,
                options.radius
            );
            ctx.arcTo(
                options.x + options.width,
                options.y + options.height,
                options.x,
                options.y + options.height,
                options.radius
            );
            ctx.arcTo(options.x, options.y + options.height, options.x, options.y, options.radius);
            ctx.arcTo(options.x, options.y, options.x + options.width, options.y, options.radius);
            ctx.closePath();
        });

        return this;
    }
}
