import { Layer } from "./Layer";
import * as Tools from "../toolbox/exports";
import { IllustratorCollection } from "../utils/IllustratorCollection";

export interface LayerToolConfig<Name> {
    name: Name;
    cache?: boolean;
}

export class LayerTools {
    #toolsCache = new IllustratorCollection<string, Tools.ToolBox>();
    public constructor(public readonly layer: Layer) {}

    public clearCache() {
        this.#toolsCache.clear();
    }

    public delete<K extends keyof typeof Tools>(name: K) {
        return this.#toolsCache.delete(name);
    }

    public isCached<K extends keyof typeof Tools>(name: K) {
        return this.#toolsCache.has(name);
    }

    public get<K extends keyof typeof Tools>(name: K, cache?: boolean): InstanceType<typeof Tools[K]>;
    public get<K extends keyof typeof Tools>(config: LayerToolConfig<K>): InstanceType<typeof Tools[K]>;
    public get<K extends keyof typeof Tools>(
        nameOrConfig: LayerToolConfig<K> | K,
        cache?: boolean
    ): InstanceType<typeof Tools[K]> {
        const name = typeof nameOrConfig === "string" ? nameOrConfig : nameOrConfig.name;
        const shouldCache = !!(typeof nameOrConfig === "object" ? nameOrConfig.cache : cache);
        if (typeof name !== "string" || !name)
            throw new TypeError(`tool name must be a string, received ${typeof name}`);
        if (!shouldCache && this.#toolsCache.has(name))
            return this.#toolsCache.get(name) as unknown as InstanceType<typeof Tools[K]>;
        if (!Tools[name]) throw new Error(`Unknown tool ${name}`);
        const toolConstructor = Tools[name];
        const tool = new toolConstructor(this.layer);
        if (shouldCache) this.#toolsCache.set(name, tool);
        return tool as unknown as InstanceType<typeof Tools[K]>;
    }

    public isValidTool<K extends keyof typeof Tools>(name: K) {
        return name in Tools;
    }
}
