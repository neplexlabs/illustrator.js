import { Layer } from "./Layer";
import * as Tools from "../toolbox/exports";
import { IllustratorCollection } from "../utils/IllustratorCollection";

export class LayerTools {
    #toolsCache = new IllustratorCollection<string, Tools.ToolBox>();
    public constructor(public readonly layer: Layer) {}

    public clearCache() {
        this.#toolsCache.clear();
    }

    public get<K extends keyof typeof Tools>(name: K) {
        if (typeof name !== "string" || !name)
            throw new TypeError(`tool name must be a string, received ${typeof name}`);
        if (this.#toolsCache.has(name)) return this.#toolsCache.get(name) as unknown as InstanceType<typeof Tools[K]>;
        if (!Tools[name]) throw new Error(`Unknown tool ${name}`);
        const toolConstructor = Tools[name];
        const tool = new toolConstructor(this.layer);
        this.#toolsCache.set(name, tool);
        return tool as unknown as InstanceType<typeof Tools[K]>;
    }

    public isValidTool<K extends keyof typeof Tools>(name: K) {
        return name in Tools;
    }
}
