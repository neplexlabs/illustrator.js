import { SKRSContext2D } from "@napi-rs/canvas";
import { Layer } from "../../layer/Layer";

export type Awaitable<T> = Promise<T> | T;
export type HistoryCallback = (ctx: SKRSContext2D) => Awaitable<void>;

export class ToolBox {
    public history: HistoryCallback[] = [];
    public constructor(public readonly layer: Layer) {}

    public render() {
        throw new Error(`render() is not implemented by ${this.constructor.name}`);
    }
}
