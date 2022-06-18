import { SKRSContext2D } from "@napi-rs/canvas";
import { Layer } from "../../layer/Layer";

export type Awaitable<T> = Promise<T> | T;
export type HistoryCallback = (ctx: SKRSContext2D) => Awaitable<void>;

export class ToolBox {
    public history: HistoryCallback[] = [];
    public constructor(public readonly layer: Layer, public autoClear = false) {}

    public save() {
        this.history.push((ctx) => {
            ctx.save();
        });

        return this;
    }

    public restore() {
        this.history.push((ctx) => {
            ctx.restore();
        });

        return this;
    }

    public render() {
        this.layer.applyTool(this);
        if (this.autoClear) this.history = [];
    }
}
