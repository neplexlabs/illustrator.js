import { IllustratorCollection } from "../utils/IllustratorCollection";
import { generateRandomId } from "../utils/randomId";
import { Illustrator } from "../illustrator/Illustrator";
import { Layer, LayerToolHistory } from "./Layer";

export interface CreateLayerOptions {
    name: string;
    position?: number;
    config?: {
        height?: number;
        width?: number;
        exposeContext?: boolean;
    };
}

export interface LayerWrapper {
    layer: Layer;
    name: string;
    id: number;
    position: number;
}

export type LayerResolvable = number | Layer | string;

export class LayerManager {
    #layers = new IllustratorCollection<number, LayerWrapper>();

    public constructor(public readonly illustrator: Illustrator) {}

    public count() {
        return this.#layers.size;
    }

    public createLayer(options: CreateLayerOptions) {
        if (!options.name || typeof options.name !== "string") throw new Error("Layer name is required");
        if (this.#layers.findKey((x) => x.name === options.name))
            throw new Error("Layer with that name already exists");
        const id = generateRandomId();
        const layerObj: LayerWrapper = {
            id,
            layer: new Layer(this, id, options.config),
            name: options.name,
            position: options.position ?? this.count() + 1
        };

        this.#layers.set(layerObj.id, layerObj);
        // rearrange
        layerObj.layer.setPosition(layerObj.position);

        return layerObj.layer;
    }

    public duplicateLayer(layer: Layer, history: LayerToolHistory, options: CreateLayerOptions) {
        if (!options.name || typeof options.name !== "string") throw new Error("Layer name is required");
        if (this.#layers.findKey((x) => x.name === options.name))
            throw new Error("Layer with that name already exists");
        const id = generateRandomId();
        const layerObj: LayerWrapper = {
            id,
            layer: new Layer(this, id, options.config),
            name: options.name,
            position: options.position ?? this.count() + 1
        };

        layerObj.layer.setHistory(history);

        this.#layers.set(layerObj.id, layerObj);
        layerObj.layer.setPosition(layer.position + 1);

        return layerObj.layer;
    }

    public deleteLayer(layer: LayerResolvable) {
        const id = this.resolveId(layer);
        if (id == null) return false;
        return this.#layers.delete(id);
    }

    public hasLayer(layer: LayerResolvable) {
        const id = this.resolveId(layer);
        return id != null;
    }

    public getLayer(layer: LayerResolvable) {
        const l = this.resolveLayer(layer);
        if (l == null) return null;
        return l;
    }

    public getLayerPosition(layer: LayerResolvable) {
        const l = this.resolve(layer);
        if (!l) return -1;
        return l.position;
    }

    public setLayerPosition(layer: LayerResolvable, position: number) {
        if (position < 0) throw new Error(`invalid layer position index ${position}`);
        const l = this.resolve(layer);
        if (!l) return -1;
        const layersToBeUpdated = this.#layers.filter((l) => l.position >= position);
        layersToBeUpdated.forEach((l) => {
            this.#layers.set(l.id, {
                ...l,
                position: l.position + 1
            });
        });
        this.#layers.set(l.id, {
            ...l,
            position
        });
        return this.#layers.get(l.id)?.position ?? -1;
    }

    public resolveLayer(layer: LayerResolvable) {
        return this.resolve(layer)?.layer;
    }

    public resolveId(layer: LayerResolvable) {
        return this.resolve(layer)?.id;
    }

    public resolve(layer: LayerResolvable) {
        if (layer instanceof Layer) return this.#layers.get(layer.id);
        if (typeof layer === "number") return this.#layers.get(layer);
        if (typeof layer === "string") return this.#layers.find((l) => l.name === layer);
    }

    public getAllLayers(ordered = true) {
        return ordered ? this.#layers.array().sort((a, b) => b.position - a.position) : this.#layers.array();
    }

    public iterate() {
        return this.#layers.values();
    }
}
