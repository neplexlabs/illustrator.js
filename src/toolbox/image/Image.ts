import { Image } from "@napi-rs/canvas";
import { ImageLoader, IllustratorImageSource } from "../../image/ImageLoader";
import { ToolBox } from "../base/ToolBox";

export class ImageTool extends ToolBox {
    public load(source: IllustratorImageSource) {
        return ImageLoader.loadImage(source);
    }

    public draw(image: Image, dx: number, dy: number): this;
    public draw(image: Image, dx: number, dy: number, radius: number): this;
    public draw(image: Image, dx: number, dy: number, dw: number, dh: number, radius: number): this;
    public draw(image: Image, dx: number, dy: number, dw: number, dh: number): this;
    public draw(image: Image, dx: number, dy: number, dw?: number, dh?: number, radius?: number): this {
        this.history.push((ctx) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if ([dw, dh, radius].every((x) => typeof x === "number")) {
                if (dw! < 2 * radius!) radius = dw! / 2;
                if (dh! < 2 * radius!) radius = dh! / 2;

                ctx.beginPath();
                ctx.moveTo(dx + radius!, dy);
                ctx.arcTo(dx + dw!, dy, dx + dw!, dy + dh!, radius!);
                ctx.arcTo(dx + dw!, dy + dh!, dx, dy + dh!, radius!);
                ctx.arcTo(dx, dy + dh!, dx, dy, radius!);
                ctx.arcTo(dx, dy, dx + dw!, dy, radius!);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(image, dx, dy, dw!, dh!);
                return ctx.restore();
            }
            if ([dw, dh].every((x) => typeof x === "number")) return ctx.drawImage(image, dx, dy, dw!, dh!);
            return ctx.drawImage(image, dx, dy);
        });

        return this;
    }

    public render() {
        this.layer.applyTool(this);
    }
}
