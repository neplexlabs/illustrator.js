import { ToolBox } from "../exports";
import { IllustratorImageSource } from "../../image/ImageLoader";
import { IllustratorImage, IllustratorImageEnums } from "../../image/IllustratorImage";

export interface PixelTransformerContext {
    from: number;
    to: number;
    width: number;
    height: number;
}

export interface PixelTransformerRenderContext {
    from: number;
    to: number;
    width?: number;
    height?: number;
}

export class PixelsTool extends ToolBox {
    #transformer!: IllustratorImage | null;

    public async createRawTransformer(src: IllustratorImageSource) {
        const transformer = await this.layer.illustrator.image.loadImage(src);
        this.#transformer = transformer;
    }

    public async createTransformer(context: PixelTransformerContext) {
        const data = this.layer.context.getImageData(context.from, context.to, context.width, context.height);
        const transformer = await IllustratorImage.fromImageData(data);
        this.#transformer = transformer;
    }

    public rotate<K extends keyof typeof IllustratorImageEnums.Orientation>(orientation: K) {
        this.#ensureTransformer();
        // @ts-expect-error
        this.#transformer?.rotate(IllustratorImageEnums.Orientation[orientation]);

        return this;
    }

    public crop(context: PixelTransformerContext) {
        this.#ensureTransformer();
        this.#transformer?.crop(context.from, context.to, context.width, context.height);
        return this;
    }

    public invert() {
        this.#ensureTransformer();
        this.#transformer?.invert();
        return this;
    }

    public setBrightness(brightness: number) {
        this.#ensureTransformer();
        this.#transformer?.brighten(brightness);
        return this;
    }

    public setContrast(contrast: number) {
        this.#ensureTransformer();
        this.#transformer?.adjustContrast(contrast);
        return this;
    }

    public hueRotate(hue: number) {
        this.#ensureTransformer();
        this.#transformer?.huerotate(hue);
        return this;
    }

    public gaussianBlur(sigma: number) {
        this.#ensureTransformer();
        this.#transformer?.blur(sigma);
        return this;
    }

    public unsharpMasking(sigma: number, threshold: number) {
        this.#ensureTransformer();
        this.#transformer?.unsharpen(sigma, threshold);
        return this;
    }

    public resize<K extends keyof typeof IllustratorImageEnums.ResizeFilterType>(
        width: number,
        height?: number | null,
        algorithm?: K | null
    ) {
        this.#ensureTransformer();
        // @ts-expect-error
        this.#transformer?.resize(width, height, IllustratorImageEnums.ResizeFilterType[algorithm]);
        return this;
    }

    public get transformer() {
        return this.#transformer;
    }

    public async getImage() {
        this.#ensureTransformer();
        // eslint-disable-next-line
        return await this.#transformer!.toImage();
    }

    public getImageSync() {
        this.#ensureTransformer();
        // eslint-disable-next-line
        return this.#transformer!.toImageSync();
    }

    public async renderTransformer(context: PixelTransformerRenderContext) {
        const data = await this.getImage();
        this.history.push((ctx) => {
            if ("width" in context && "height" in context) {
                // eslint-disable-next-line
                ctx.drawImage(data, context.from, context.to, context.width!, context.height!);
            } else {
                ctx.drawImage(data, context.from, context.to);
            }
        });
    }

    public renderTransformerSync(context: PixelTransformerRenderContext) {
        const data = this.getImageSync();
        this.history.push((ctx) => {
            if ("width" in context && "height" in context) {
                // eslint-disable-next-line
                ctx.drawImage(data, context.from, context.to, context.width!, context.height!);
            } else {
                ctx.drawImage(data, context.from, context.to);
            }
        });
    }

    public render() {
        this.layer.applyTool(this);
    }

    public clearTransformer() {
        this.#transformer = null;
    }

    #ensureTransformer() {
        if (!this.#transformer) throw new Error("transformer is not created");
    }
}
