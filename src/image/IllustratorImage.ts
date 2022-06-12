import { Transformer } from "@napi-rs/image";
import { ImageLoader } from "../utils/ImageLoader";

export class IllustratorImage extends Transformer {
    public constructor(data: Buffer) {
        super(data);
    }

    public async toImage() {
        const png = await super.png();
        return ImageLoader.createImage(png);
    }

    public toImageSync() {
        const png = super.pngSync();
        return ImageLoader.createImage(png);
    }
}
