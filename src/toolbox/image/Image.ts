import { Image } from "@napi-rs/canvas";
import { ImageLoader, IllustratorImageSource } from "../../utils/ImageLoader";
import { ToolBox } from "../base/ToolBox";

export class ImageTool extends ToolBox {
    public load(source: IllustratorImageSource) {
        return ImageLoader.loadImage(source);
    }

    public draw(image: Image, dx: number, dy: number, dw?: number, dh?: number) {
        this.history.push((ctx) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if ([dw, dh].every((x) => typeof x === "number")) return ctx.drawImage(image, dx, dy, dw!, dh!);
            return ctx.drawImage(image, dx, dy);
        });

        return this;
    }

    public render() {
        this.layer.applyTool(this);
    }
}
