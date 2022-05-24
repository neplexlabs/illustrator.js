import { ToolBox } from "./ToolBox";
import { GlobalFonts } from "@napi-rs/canvas";

export class TextTool extends ToolBox {
    public registerFont(font: Buffer, nameAlias?: string) {
        return GlobalFonts.register(font, nameAlias);
    }

    public registerFontPath(fontPath: string, nameAlias?: string) {
        return GlobalFonts.registerFromPath(fontPath, nameAlias);
    }

    public registerFontsDir(fontDir: string) {
        return GlobalFonts.loadFontsFromDir(fontDir);
    }

    public getFonts() {
        return GlobalFonts.families;
    }

    public hasFont(name: string) {
        return GlobalFonts.has(name);
    }

    public setDirection(direction: "inherit" | "ltr" | "rtl") {
        this.history.push((ctx) => {
            ctx.direction = direction;
        });

        return this;
    }

    public setTextAlignment(alignment: "center" | "end" | "left" | "right" | "start") {
        this.history.push((ctx) => {
            ctx.textAlign = alignment;
        });

        return this;
    }

    public setTextBaseline(alignment: "alphabetic" | "bottom" | "hanging" | "ideographic" | "middle" | "top") {
        this.history.push((ctx) => {
            ctx.textBaseline = alignment;
        });

        return this;
    }

    public setFont(name: string, size: string) {
        this.history.push((ctx) => {
            ctx.font = `${size} ${name}`;
        });

        return this;
    }

    public setColor(color: string | CanvasGradient | CanvasPattern) {
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

    public writeText(text: string, x: number, y: number, maxWidth?: number) {
        this.history.push((ctx) => {
            ctx.fillText(text, x, y, maxWidth);
        });

        return this;
    }

    public strokeText(text: string, x: number, y: number, maxWidth?: number) {
        this.history.push((ctx) => {
            ctx.strokeText(text, x, y, maxWidth);
        });

        return this;
    }

    public render() {
        this.layer.applyTool(this);
    }
}
