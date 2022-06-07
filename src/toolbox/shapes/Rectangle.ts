import { BaseShapeTool } from "../base/BaseShapeTool";

export interface RectangleOptions {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class RectangleTool extends BaseShapeTool {
    public draw(options: RectangleOptions) {
        this.history.push((ctx) => {
            ctx.rect(options.x, options.y, options.width, options.height);
        });

        return this;
    }
}
