import { AvifConfig, createCanvas } from "@napi-rs/canvas";
import { Layer } from "./Layer";

export interface IllustratorExportConfig {
    encoding?: "png" | "avif" | "jpeg" | "webp";
    avifConfig?: AvifConfig;
    quality?: number;
}

export class Illustrator {
    #layers = new Map<string, Layer>();

    public constructor(public readonly width: number, public readonly height: number) {
        this.#layers.set("background", new Layer(this).lock());
    }

    public get backgroundLayer() {
        return this.#layers.get("background") as Layer;
    }

    public addLayer(layer: Layer, name: string) {
        if (!name || typeof name !== "string") throw new TypeError("layer name must be a string");
        if (this.#layers.has(name)) throw new Error("layer with this name already exists");
        this.#layers.set(name, layer);
        return this;
    }

    public deleteLayer(name: string) {
        if (!name || typeof name !== "string") throw new TypeError("layer name must be a string");
        this.#layers.delete(name);
        return this;
    }

    public hasLayer(name: string) {
        if (!name || typeof name !== "string") throw new TypeError("layer name must be a string");
        return this.#layers.has(name);
    }

    public getLayer(name: string) {
        if (!name || typeof name !== "string") throw new TypeError("layer name must be a string");
        return this.#layers.get(name);
    }

    public layersCount() {
        return this.#layers.size;
    }

    public *layers() {
        for (const layer of this.#layers) {
            // skip background layer
            if (layer[0] === "background") continue;
            yield layer[1];
        }
    }

    public render() {
        const canvas = createCanvas(this.width, this.height);
        const ctx = canvas.getContext("2d");

        // render background layer first
        // eslint-disable-next-line
        const data = this.backgroundLayer.render()!;
        // draw rendered layer on main canvas
        ctx.drawImage(
            data,
            this.backgroundLayer.coordinates.x,
            this.backgroundLayer.coordinates.y,
            this.backgroundLayer.width,
            this.backgroundLayer.height
        );

        // render from top to bottom
        const layers = Array.from(this.layers()).reverse();

        for (const layer of layers) {
            // don't render if the layer is hidden
            if (layer.hidden) continue;
            // eslint-disable-next-line
            const data = layer.render()!;
            // draw rendered layer on main canvas
            ctx.drawImage(data, layer.coordinates.x, layer.coordinates.y, layer.width, layer.height);
        }

        return { canvas, ctx };
    }

    public export(config: IllustratorExportConfig = {}) {
        const output = this.render();

        if (config.encoding == null || config.encoding === "png") {
            return output.canvas.encode("png");
        }

        if (config.encoding === "avif") {
            return output.canvas.encode("avif", config.avifConfig);
        }

        if (config.encoding === "jpeg" || config.encoding === "webp") {
            return output.canvas.encode(config.encoding, config.quality);
        }

        throw new Error(`unsupported export encoding "${config.encoding}"`);
    }
}
