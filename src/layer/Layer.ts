import { Canvas, createCanvas, SKRSContext2D } from "@napi-rs/canvas";
import { ToolBox } from "../toolbox/ToolBox";
import { LayerManager } from "./LayerManager";
import { LayerUtils } from "./LayerUtils";

export type LayerToolHistory = Array<(ctx: SKRSContext2D) => Promise<void> | void>[];

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
    #toolHistory: LayerToolHistory = [];
    public utils: LayerUtils;
    public coordinates = {
        x: 0,
        y: 0
    };
    public width: number;
    public height: number;
    #exposed = false;

    public constructor(
        public readonly manager: LayerManager,
        public readonly id: number,
        options?: {
            width?: number;
            height?: number;
            exposeContext?: boolean;
        }
    ) {
        this.height = options?.height ?? this.manager.illustrator.height;
        this.width = options?.width ?? this.manager.illustrator.width;
        this.#canvas = createCanvas(this.width, this.height);
        this.#ctx = this.#canvas.getContext("2d");
        this.utils = new LayerUtils(this.#ctx);
        if (options?.exposeContext) {
            this.#exposed = true;
        }
    }

    public get name() {
        return this.manager.resolve(this)?.name as string;
    }

    public get illustrator() {
        return this.manager.illustrator;
    }

    public get context() {
        return this.#exposed ? this.#ctx : null;
    }

    public get position() {
        return this.manager.getLayerPosition(this);
    }

    public setPosition(position: number) {
        return this.manager.setLayerPosition(this, position);
    }

    public createTransformation(data: LayerTransformationData) {
        if (data.coordinates) this.coordinates = data.coordinates;
        if (data.width) this.width = data.width;
        if (data.height) this.height = data.height;
    }

    public get locked() {
        return this.#locked;
    }

    public isLocked() {
        return this.locked;
    }

    public lock() {
        this.#locked = true;
        return this;
    }

    public unlock() {
        this.#locked = false;
        return this;
    }

    public isHidden() {
        return this.hidden;
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

    public duplicate(name = `${this.name} Copy`) {
        return this.manager.duplicateLayer(this, this.#toolHistory, {
            name,
            config: {
                exposeContext: this.#exposed,
                height: this.height,
                width: this.width
            },
            position: this.position + 1
        });
    }

    public applyTool(tool: ToolBox) {
        this.#throwIfLocked();
        if (!(tool instanceof ToolBox)) throw new Error("tool must be a ToolBox instance");
        this.#toolHistory.push(tool.history);
    }

    public setHistory(history: LayerToolHistory) {
        this.#toolHistory = history;
    }

    #throwIfLocked() {
        if (this.#locked) throw new Error("Cannot perform operations on locked layer");
    }

    public async render() {
        if (this.#hidden) return null;
        await Promise.all(this.#toolHistory.flat(2).map((m) => m(this.#ctx)));
        return this.#canvas;
    }
}
