import { IllustratorCollection } from "../utils/IllustratorCollection";
import { IllustratorColor } from "./IllustratorColor";

export interface ColorConfig {
    color:
        | number[]
        | number
        | `#${string}`
        | `rgb(${number}, ${number}, ${number})`
        | `rgba(${number}, ${number})`
        | `cmyk(${number}%, ${number}%, ${number}%, ${number}%)`
        | `hsl(${number}%, ${number}%, ${number}%)`
        | `hsla(${number}%, ${number}%, ${number}%, ${number}%)`;
    name: string;
    force?: boolean;
}

export class ColorSwatches {
    #data = new IllustratorCollection<string, IllustratorColor>();

    public add(data: ColorConfig): IllustratorColor | false {
        if (!data.name || typeof data.name !== "string") throw new TypeError("name is required");
        if (!data.color || typeof data.color !== "string") throw new TypeError("color is required");
        data.force ??= false;

        if (this.#data.has(data.name) && !data.force) return false;

        const color = new IllustratorColor(this, data);
        this.#data.set(data.name, color);

        return color;
    }

    public remove(name: string) {
        return this.#data.delete(name);
    }

    public get(name: string) {
        return this.#data.get(name);
    }

    public has(name: string) {
        return this.#data.has(name);
    }

    public clear() {
        this.#data.clear();
    }

    public count() {
        return this.#data.size;
    }

    public random(): IllustratorColor;
    public random(amount: number): IllustratorColor[];
    public random(amount?: number): IllustratorColor | IllustratorColor[] {
        return this.#data.random(amount as number);
    }

    public names() {
        return this.#data.map((m) => m.name);
    }

    public toArray() {
        return this.#data.array();
    }

    public toJSON() {
        const data: Record<string, IllustratorColor> = {};

        for (const [name, color] of this.#data) {
            data[name] = color;
        }

        return data;
    }
}
