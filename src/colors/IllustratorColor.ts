import { ColorConfig, ColorSwatches } from "./ColorSwatches";

export interface IllustratorColorData {
    hex: `#${string}`;
    int: number;
    rgba: number[];
    cmyk: number[];
    hsla: number[];
}

export class IllustratorColor {
    #data!: IllustratorColorData;
    public constructor(public readonly swatches: ColorSwatches, public readonly data: ColorConfig) {
        this.#parse(data.color);
    }

    #parse(color: typeof this.data.color) {
        void color;
        throw new Error("Not implemented");
        // if (typeof color === "string") {
        //     if (["rgb(", "rgba(", "cmyk(", "hsl(", "hsla("].some(pattern => color.indexOf(pattern) === 0)) {
        //         if (color.startsWith("rgb(") || color.startsWith("rgba(")) {
        //             const points = color.split(",").map(m => {
        //                 let val = m.trim();
        //                 if (val.includes("%")) val = `0.${val.replace("%", "")}`;
        //                 return parseFloat(val);
        //             }).slice(0, 4);

        //             this.#data.rgba = points;
        //             this.#data.hex = `#${(points[0] << 16 + points[1] << 8 + points[2]).toString(16).toUpperCase()}`;
        //             if (points[3]) {
        //                 const alpha = (255 + 0x10000).toString(16).substring(-2).toUpperCase();
        //                 this.#data.hex += alpha;
        //             }
        //             this.#data.int = parseInt(this.#data.hex.replace("#", ""), 16);
        //         }
        //         else if (color.startsWith("hsl(") || color.startsWith("hsla(")) { }
        //         else { }
        //     }
        // } else if (Array.isArray(color)) {

        // } else if (typeof color === "number") {
        //     this.#data.int = color;
        //     const hex = color.toString(16);
        //     this.#data.hex = `#${hex.padStart(6, "0")}`;
        // }
    }

    public hex() {
        return this.#data.hex.padStart(6, "0");
    }

    public int() {
        return this.#data.int;
    }

    public rgba() {
        return `rgba(${this.#data.rgba.slice(0, 4).join(", ")})`;
    }

    public rgb() {
        return `rgb(${this.#data.rgba.slice(0, 3).join(", ")})`;
    }

    public get name() {
        return this.data.name;
    }
}
