import { ToolBox } from "../base/ToolBox";

export interface TransformOptions {
    horizontalScaling?: number;
    verticalSkewing: number;
    horizontalSkewing: number;
    verticalScaling?: number;
    horizontalTranslation: number;
    verticalTranslation: number;
}

export class TransformTool extends ToolBox {
    public translate(x: number, y: number) {
        this.history.push((ctx) => {
            ctx.translate(x, y);
        });

        return this;
    }

    public transform(options: TransformOptions) {
        this.history.push((ctx) => {
            options.horizontalScaling ??= 1;
            options.verticalScaling ??= 1;

            ctx.transform(
                options.horizontalScaling,
                options.verticalSkewing,
                options.horizontalSkewing,
                options.verticalScaling,
                options.horizontalTranslation,
                options.verticalTranslation
            );
        });

        return this;
    }

    public setTransform(options: TransformOptions) {
        this.history.push((ctx) => {
            options.horizontalScaling ??= 1;
            options.verticalScaling ??= 1;

            ctx.setTransform(
                options.horizontalScaling,
                options.verticalSkewing,
                options.horizontalSkewing,
                options.verticalScaling,
                options.horizontalTranslation,
                options.verticalTranslation
            );
        });

        return this;
    }

    public resetTransform() {
        this.history.push((ctx) => {
            ctx.resetTransform();
        });

        return this;
    }

    public getTransform() {
        const transformation = this.layer.utils.getLayerTransformation();

        return {
            horizontalScaling: transformation.a,
            verticalSkewing: transformation.b,
            horizontalSkewing: transformation.c,
            verticalScaling: transformation.d,
            horizontalTranslation: transformation.e,
            verticalTranslation: transformation.f
        } as TransformOptions;
    }

    public rotate(angle: number) {
        this.history.push((ctx) => {
            ctx.rotate(angle);
        });

        return this;
    }

    public scale(x: number, y: number) {
        this.history.push((ctx) => {
            ctx.scale(x, y);
        });

        return this;
    }
}
