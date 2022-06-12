import { Illustrator } from "../illustrator/Illustrator";
import { IllustratorImageSource, ImageLoader } from "../utils/ImageLoader";
import { IllustratorImage } from "./IllustratorImage";
import {
    compressJpeg,
    compressJpegSync,
    JpegCompressOptions,
    losslessCompressPng,
    losslessCompressPngSync,
    PNGLosslessOptions,
    pngQuantize,
    pngQuantizeSync,
    PngQuantOptions
} from "@napi-rs/image";

export class IllustratorImageManager {
    public constructor(public readonly illustrator: Illustrator) {}

    /**
     * Loads image source data
     * @param src The image source
     */
    public async load(src: IllustratorImageSource) {
        return await ImageLoader.loadImage(src, true);
    }

    /**
     * Loads {@link IllustratorImage} from the given source
     * @param src The source to load
     */
    public async loadImage(src: IllustratorImageSource) {
        const img = await this.load(src);
        return new IllustratorImage(img);
    }

    public async compressJPEG(src: Buffer, options?: JpegCompressOptions | null) {
        return await compressJpeg(src, options);
    }

    public compressJPEGSync(src: Buffer, options?: JpegCompressOptions | null) {
        return compressJpegSync(src, options);
    }

    public async compressPNGLossless(src: Buffer, options?: PNGLosslessOptions | null) {
        return await losslessCompressPng(src, options);
    }

    public compressPNGLosslessSync(src: Buffer, options?: PNGLosslessOptions | null) {
        return losslessCompressPngSync(src, options);
    }

    public async PNGQuantize(src: Buffer, options?: PngQuantOptions | null) {
        return await pngQuantize(src, options);
    }

    public PNGQuantizeSync(src: Buffer, options?: PngQuantOptions | null) {
        return pngQuantizeSync(src, options);
    }
}

export { JpegCompressOptions, PNGLosslessOptions, PngQuantOptions };
