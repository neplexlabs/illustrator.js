import { AvifConfig, createCanvas } from "@napi-rs/canvas";
import { IllustratorAnimation } from "../animation/IllustratorAnimation";
import { Colors } from "../colors/Colors";
import { IllustratorImageManager } from "../image/IllustratorImageManager";
import { Layer } from "../layer/Layer";
import { LayerManager } from "../layer/LayerManager";

export interface IllustratorExportConfig {
    encoding?: "png" | "avif" | "jpeg" | "webp";
    avifConfig?: AvifConfig;
    quality?: number;
}

export class Illustrator {
    public layers = new LayerManager(this);
    public animation = new IllustratorAnimation(this);
    public colors = new Colors(this);
    public image = new IllustratorImageManager();

    public constructor(public readonly width: number, public readonly height: number) {
        this.layers
            .createLayer({
                name: "background"
            })
            .lock();
    }

    public get backgroundLayer() {
        return this.layers.getLayer("background") as Layer;
    }

    public async render() {
        const canvas = createCanvas(this.width, this.height);
        const ctx = canvas.getContext("2d");

        // render background layer first
        // eslint-disable-next-line
        const data = (await this.backgroundLayer.render())!;
        // draw rendered layer on main canvas
        if (data != null)
            ctx.drawImage(
                data,
                this.backgroundLayer.coordinates.x,
                this.backgroundLayer.coordinates.y,
                this.backgroundLayer.width,
                this.backgroundLayer.height
            );

        // render from top to bottom
        const layers = this.layers.getAllLayers(true);

        for (const layerConfig of layers) {
            // skip background layer
            if (layerConfig.name === "background") continue;
            // don't render if the layer is hidden
            if (layerConfig.layer.hidden) continue;
            // eslint-disable-next-line
            const data = (await layerConfig.layer.render())!;
            if (data == null) continue;
            // draw rendered layer on main canvas
            ctx.drawImage(
                data,
                layerConfig.layer.coordinates.x,
                layerConfig.layer.coordinates.y,
                layerConfig.layer.width,
                layerConfig.layer.height
            );
        }

        return { canvas, ctx };
    }

    public async export(config: IllustratorExportConfig = {}) {
        const output = await this.render();

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
