import { Canvas, createCanvas, SKRSContext2D } from "@napi-rs/canvas";
import { ToolBox } from "../toolbox/ToolBox";
import { Illustrator } from "./Illustrator";
import { LayerUtils } from "./LayerUtils";

export interface LayerTransformationData {
    coordinates?: {
        x: number;
        y: number;
    };
    height?: number;
    width?: number;
}

export class Layer {
    #canvas: Canvas;
    #ctx: SKRSContext2D;
    #locked = false;
    #hidden = false;
    public utils: LayerUtils;
    public coordinates = {
        x: 0,
        y: 0
    };
    public width: number;
    public height: number;

    public constructor(public readonly illustrator: Illustrator, width?: number, height?: number) {
        this.height = height ?? this.illustrator.height;
        this.width = width ?? this.illustrator.width;
        this.#canvas = createCanvas(this.width, this.height);
        this.#ctx = this.#canvas.getContext("2d");
        this.utils = new LayerUtils(this.#ctx);
    }

    public createTransformation(data: LayerTransformationData) {
        if (data.coordinates) this.coordinates = data.coordinates;
        if (data.width) this.width = data.width;
        if (data.height) this.height = data.height;
    }

    public get locked() {
        return this.#locked;
    }

    public lock() {
        this.#locked = true;
        return this;
    }

    public unlock() {
        this.#locked = false;
        return this;
    }

    public get hidden() {
        return this.#hidden;
    }

    public hide() {
        this.#hidden = true;
        return this;
    }

    public show() {
        this.#hidden = false;
        return this;
    }

    public save() {
        this.#ctx.save();
    }

    public restore() {
        this.#ctx.restore();
    }

    public async applyTool(tool: ToolBox) {
        this.#throwIfLocked();
        if (!(tool instanceof ToolBox)) throw new Error("tool must be a ToolBox instance");
        await Promise.all(tool.history.map((m) => m(this.#ctx)));
    }

    #throwIfLocked() {
        if (this.#locked) throw new Error("Cannot perform operations on locked layer");
    }

    public render() {
        if (this.#hidden) return null;
        return this.#canvas;
    }
}
