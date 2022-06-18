import { ToolBox } from "../base/ToolBox";
import { GlobalFonts } from "@napi-rs/canvas";
import { makeArgs } from "../../utils/makeArgs";

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

    public setFont(name: string, size: string, style?: string) {
        this.history.push((ctx) => {
            ctx.font = `${style ? style + " " : ""}${name}${size ? " " + size : ""}`;
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
            // @ts-expect-error
            ctx.fillText(...makeArgs((el) => el != null, [text, x, y, maxWidth]));
        });

        return this;
    }

    public strokeText(text: string, x: number, y: number, maxWidth?: number) {
        this.history.push((ctx) => {
            // @ts-expect-error
            ctx.strokeText(...makeArgs((el) => el != null, [text, x, y, maxWidth]));
        });

        return this;
    }

    public measure(text: string) {
        return this.layer.utils.measureText(text);
    }
}
