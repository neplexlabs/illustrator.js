import { SKRSContext2D } from "@napi-rs/canvas";
import { Layer } from "../illustrator/Layer";

export type HistoryCallback = (ctx: SKRSContext2D) => Awaited<void>;

export class ToolBox {
    public history: HistoryCallback[] = [];
    public constructor(public readonly layer: Layer) {}

    public render() {
        throw new Error("render() is not implemented by this tool");
    }
}
