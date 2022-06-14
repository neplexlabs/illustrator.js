import { Image } from "@napi-rs/canvas";
import { ImageLoader, IllustratorImageSource } from "../../image/ImageLoader";
import { ToolBox } from "../base/ToolBox";

export class ImageTool extends ToolBox {
    public load(source: IllustratorImageSource) {
        return ImageLoader.loadImage(source);
    }

    public draw(image: Image, dx: number, dy: number): this;
    public draw(image: Image, dx: number, dy: number, dw: number, dh: number): this;
    public draw(image: Image, dx: number, dy: number, dw: number, dh: number, circle: true): this;
    public draw(image: Image, dx: number, dy: number, dw?: number, dh?: number, circle?: boolean): this {
        let args = arguments;
        this.history.push((ctx) => {
            ctx.save();

            if (args.length === 4 && typeof dw === "boolean") {
                this.drawRounded(image, dx, dy, image.width, image.height, image.width / 2);
                return ctx.restore();
            }

            if ([dw, dh].every((x) => typeof x === "number") && circle) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.drawRounded(image, dx, dy, dw!, dh!, dw! / 2);
                return ctx.restore();
            }

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if ([dw, dh].every((x) => typeof x === "number")) return ctx.drawImage(image, dx, dy, dw!, dh!);

            return ctx.drawImage(image, dx, dy);
        });

        return this;
    }

    public drawRounded(image: Image, dx: number, dy: number, dw: number, dh: number, radius: number) {
        this.history.push((ctx) => {
            if (dw < 2 * radius) radius = dw / 2;
            if (dh < 2 * radius) radius = dh / 2;

            ctx.beginPath();
            ctx.moveTo(dx + radius, dy);
            ctx.arcTo(dx + dw, dy, dx + dw, dy + dh, radius);
            ctx.arcTo(dx + dw, dy + dh, dx, dy + dh, radius);
            ctx.arcTo(dx, dy + dh, dx, dy, radius);
            ctx.arcTo(dx, dy, dx + dw, dy, radius);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(image, dx, dy, dw, dh);
            return ctx.restore();
        });

        return this;
    }

    public render() {
        this.layer.applyTool(this);
    }
}
