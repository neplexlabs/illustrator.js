import { Illustrator } from "../illustrator/Illustrator";
import { Layer } from "../layer/Layer";
import { GifEncoder, EncoderOptions, DisposalCode } from "@skyra/gifenc";

export interface FrameLayer {
    frame: Layer;
    duration?: number;
}

export class IllustratorAnimation {
    #frames: Array<Required<FrameLayer>> | null = null;
    #encoderConfig: EncoderOptions = {};

    public constructor(public readonly illustrator: Illustrator) {}

    public clearFrames() {
        this.#frames = null;
    }

    public addFrame(layer: FrameLayer): IllustratorAnimation;
    public addFrame(layer: Layer, duration?: number): IllustratorAnimation;
    public addFrame(layer: Layer | FrameLayer, duration?: number): IllustratorAnimation {
        if (!arguments.length || layer == null) throw new Error("frame args required");
        let frame: Required<FrameLayer> | null = null;
        if (layer instanceof Layer)
            frame = {
                frame: layer,
                duration: duration ?? 1000
            };

        if (typeof layer === "object")
            frame = {
                duration: (layer as FrameLayer).duration ?? 1000,
                frame: (layer as FrameLayer).frame
            };

        if (!frame) throw new Error("missing frame data");

        return this.addFrames([frame]);
    }

    public addFrames(layers: Array<Required<FrameLayer>>) {
        if (!layers.length) throw new Error("Frames required");
        if (!layers.every((l) => l.frame instanceof Layer)) throw new TypeError("frame must be a Layer instance");
        this.#addFrame(layers);
        return this;
    }

    public setFrameRate(frameRate: number) {
        if (typeof frameRate !== "number") throw new TypeError("frame rate value must be a number");
        this.#encoderConfig.framerate = frameRate;
        return this;
    }

    public setTransparency(transparent: number) {
        if (typeof transparent !== "number") throw new TypeError("transparency value must be a number");
        this.#encoderConfig.transparent = transparent;
        return this;
    }

    public setFrameDelay(delay: number) {
        if (typeof delay !== "number") throw new TypeError("delay value must be a number");
        this.#encoderConfig.delay = delay;
        return this;
    }

    public setDisposalCode(code: DisposalCode) {
        if (typeof code !== "number") throw new TypeError("disposal code value must be a number");
        this.#encoderConfig.dispose = code;
        return this;
    }

    public setQuality(quality: number) {
        if (typeof quality !== "number") throw new TypeError("quality value must be a number");
        this.#encoderConfig.quality = quality;
        return this;
    }

    public setRepeat(repeats: number) {
        if (typeof repeats !== "number") throw new TypeError("repeats value must be a number");
        this.#encoderConfig.repeat = repeats;
        return this;
    }

    public async createAnimation() {
        if (!this.#frames?.length) throw new Error("missing animation frames data");
        const encoder = new GifEncoder(this.illustrator.width, this.illustrator.height);
        const frames = await this.#renderEachLayer();

        const gifStream = encoder.createReadStream();

        if (this.#encoderConfig.dispose != null) encoder.setDispose(this.#encoderConfig.dispose);
        if (this.#encoderConfig.framerate != null) encoder.setFramerate(this.#encoderConfig.framerate);
        if (this.#encoderConfig.quality != null) encoder.setQuality(this.#encoderConfig.quality);
        if (this.#encoderConfig.repeat != null) encoder.setRepeat(this.#encoderConfig.repeat);
        if (this.#encoderConfig.transparent != null) encoder.setTransparent(this.#encoderConfig.transparent);

        encoder.start();
        for (const frame of frames) {
            encoder.setDelay(frame.duration ?? this.#encoderConfig.delay);
            encoder.addFrame(frame.ctx.getImageData(0, 0, frame.ctx.canvas.width, frame.ctx.canvas.height).data);
        }
        encoder.finish();

        return gifStream;
    }

    async #renderEachLayer() {
        if (!this.#frames) return [];

        const canvasArray = await Promise.all(
            this.#frames
                .filter((frame) => !frame.frame.hidden)
                .map(async (m) => ({
                    canvas: await m.frame.render(),
                    duration: m.duration
                }))
        );

        return canvasArray.map((m) => ({
            duration: m.duration,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ctx: m.canvas!.getContext("2d")
        }));
    }

    #addFrame(frames: Array<Required<FrameLayer>>) {
        if (!Array.isArray(this.#frames)) this.#frames = [];
        this.#frames.push(...frames);
    }
}
