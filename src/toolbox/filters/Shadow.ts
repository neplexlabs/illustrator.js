import { ToolBox } from "../base/ToolBox";

export class ShadowTool extends ToolBox {
    public setColor(color: string) {
        this.history.push((ctx) => {
            ctx.shadowColor = color;
        });

        return this;
    }

    public setBlur(amount: number) {
        this.history.push((ctx) => {
            ctx.shadowBlur = amount;
        });

        return this;
    }

    public setOffsetX(amount: number) {
        this.history.push((ctx) => {
            ctx.shadowOffsetX = amount;
        });

        return this;
    }

    public setOffsetY(amount: number) {
        this.history.push((ctx) => {
            ctx.shadowOffsetY = amount;
        });

        return this;
    }
}
