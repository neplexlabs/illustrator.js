import {
    Transformer,
    Orientation,
    AvifConfig,
    ChromaSubsampling,
    CompressionType,
    JsColorType,
    FilterType,
    ResizeFilterType,
    Metadata
} from "@napi-rs/image";
import { ImageLoader } from "./ImageLoader";
import { ImageData } from "@napi-rs/canvas";

export { AvifConfig, Metadata };

export type IllustratorImageData = ImageData & { colorSpace: PredefinedColorSpace };

// prettier-ignore
export const IllustratorImageEnums = {
    // @ts-expect-error
    Orientation, ChromaSubsampling, CompressionType, JsColorType, FilterType, ResizeFilterType
};

export interface RawImageData {
    data: Uint8ClampedArray | Buffer;
    width: number;
    height: number;
}

export class IllustratorImage extends Transformer {
    public constructor(private readonly _data: Buffer) {
        super(_data);
    }

    public get source() {
        return this._data;
    }

    public async toImage() {
        const png = await super.png();
        return ImageLoader.createImage(png);
    }

    public toImageSync() {
        const png = super.pngSync();
        return ImageLoader.createImage(png);
    }

    public static async fromImageData(data: ImageData | RawImageData) {
        const transformer = super.fromRgbaPixels(data.data, data.width, data.height);
        const iImage = new IllustratorImage(await transformer.rawPixels());
        return iImage;
    }

    public static fromImageDataSync(data: ImageData | RawImageData) {
        const transformer = super.fromRgbaPixels(data.data, data.width, data.height);
        const iImage = new IllustratorImage(transformer.rawPixelsSync());
        return iImage;
    }
}
