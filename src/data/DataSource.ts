import { IllustratorImageSource } from "../image/ImageLoader";

export interface IllustratorDataSource {
    name: string;
    type: "text" | "image";
    data: TextDataSource | ImageDataSource;
}

export interface TextDataSource {
    value: string;
    config: {
        x: number;
        y: number;
        maxWidth?: number;
        font: string;
        fontPath?: string;
    };
}

// TODO: template api
export interface ImageDataSource {
    value: IllustratorImageSource;
    config: {
        x: number;
        y: number;
        width: number;
        height: number;
        radius?: number;
    };
}

export class DataSource {
    public data: Array<IllustratorDataSource> = [];

    public loadData(data: Array<IllustratorDataSource>) {
        if (!Array.isArray(data)) throw new TypeError("data source must be array");
        this.data = data;
    }

    public addData(data: IllustratorDataSource) {
        this.data.push(data);
    }

    public removeData(nameOrFn: string | ((ctx: IllustratorDataSource) => boolean)) {
        if (typeof nameOrFn === "string") this.data = this.data.filter((ds) => ds.name === nameOrFn);
        if (typeof nameOrFn === "function") this.data = this.data.filter(nameOrFn);
        throw new Error("invalid parameter");
    }

    public get(nameOrFn: string | ((ctx: IllustratorDataSource) => boolean)) {
        return this.data.find(typeof nameOrFn === "function" ? nameOrFn : (fn) => fn.name === nameOrFn);
    }

    public toJSON() {
        return this.data;
    }

    public toArray() {
        return this.data;
    }

    public toString(): `DataSource<${number}>` {
        return `DataSource<${this.data.length}>`;
    }

    public clone() {
        const ds = new DataSource();
        ds.loadData(this.data.slice());
        return ds;
    }

    public *[Symbol.iterator](): IterableIterator<IllustratorDataSource> {
        yield* this.data ?? [];
    }
}
