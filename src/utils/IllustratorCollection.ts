/* partially taken from discord.js collection */

export class IllustratorCollection<K = unknown, V = unknown> extends Map<K, V> {
    #keyArray: K[] | null = null;
    #array: V[] | null = null;
    #arrayReverse: V[] | null = null;

    public array(): V[] {
        if (!this.#array || this.#array.length !== this.size) this.#array = [...this.values()];
        return this.#array;
    }

    public keyArray(): K[] {
        if (!this.#keyArray || this.#keyArray.length !== this.size) this.#keyArray = [...this.keys()];
        return this.#keyArray;
    }

    public reverse(): V[] {
        if (!this.#arrayReverse || this.#arrayReverse.length !== this.size)
            this.#arrayReverse = this.array().slice().reverse();
        return this.#arrayReverse;
    }

    public set(key: K, value: V) {
        this.#cleanup();
        return super.set(key, value);
    }

    public delete(key: K) {
        this.#cleanup();
        return super.delete(key);
    }

    public clear() {
        super.clear();
        this.#cleanup();
    }

    #cleanup() {
        this.#array = null;
        this.#arrayReverse = null;
        this.#keyArray = null;
    }

    public first(): V | undefined;
    public first(amount: number): V[];
    public first(amount?: number): V | V[] | undefined {
        if (typeof amount === "undefined") return this.values().next().value;
        if (amount < 0) return this.last(amount * -1);
        amount = Math.min(this.size, amount);
        const iter = this.values();
        return Array.from({ length: amount }, (): V => iter.next().value);
    }

    public firstKey(): K | undefined;
    public firstKey(amount: number): K[];
    public firstKey(amount?: number): K | K[] | undefined {
        if (typeof amount === "undefined") return this.keys().next().value;
        if (amount < 0) return this.lastKey(amount * -1);
        amount = Math.min(this.size, amount);
        const iter = this.keys();
        return Array.from({ length: amount }, (): K => iter.next().value);
    }

    public last(): V | undefined;
    public last(amount: number): V[];
    public last(amount?: number): V | V[] | undefined {
        const arr = this.array();
        if (typeof amount === "undefined") return arr[arr.length - 1];
        if (amount < 0) return this.first(amount * -1);
        if (!amount) return [];
        return arr.slice(-amount);
    }

    public lastKey(): K | undefined;
    public lastKey(amount: number): K[];
    public lastKey(amount?: number): K | K[] | undefined {
        const arr = this.keyArray();
        if (typeof amount === "undefined") return arr[arr.length - 1];
        if (amount < 0) return this.firstKey(amount * -1);
        if (!amount) return [];
        return arr.slice(-amount);
    }

    public random(): V;
    public random(amount: number): V[];
    public random(amount?: number): V | V[] {
        let arr = this.array();
        if (typeof amount === "undefined") return arr[Math.floor(Math.random() * arr.length)];
        if (arr.length === 0 || !amount) return [];
        arr = arr.slice();
        return Array.from({ length: amount }, (): V => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
    }

    public randomKey(): K;
    public randomKey(amount: number): K[];
    public randomKey(amount?: number): K | K[] {
        let arr = this.keyArray();
        if (typeof amount === "undefined") return arr[Math.floor(Math.random() * arr.length)];
        if (arr.length === 0 || !amount) return [];
        arr = arr.slice();
        return Array.from({ length: amount }, (): K => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
    }

    public find(fn: (value: V, key: K, collection: this) => boolean): V | undefined;
    public find<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): V | undefined;
    public find(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): V | undefined {
        if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
        for (const [key, val] of this) {
            if (fn(val, key, this)) return val;
        }
        return undefined;
    }

    public findKey(fn: (value: V, key: K, collection: this) => boolean): K | undefined;
    public findKey<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): K | undefined;
    public findKey(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): K | undefined {
        if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
        for (const [key, val] of this) {
            if (fn(val, key, this)) return key;
        }
        return undefined;
    }

    public sweep(fn: (value: V, key: K, collection: this) => boolean): number;
    public sweep<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): number;
    public sweep(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): number {
        if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
        const previousSize = this.size;
        for (const [key, val] of this) {
            if (fn(val, key, this)) this.delete(key);
        }
        return previousSize - this.size;
    }

    public filter(fn: (value: V, key: K, collection: this) => boolean): this;
    public filter<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): this;
    public filter(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): this {
        if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
        // @ts-expect-error
        const results = new this.constructor[Symbol.species]<K, V>() as this;
        for (const [key, val] of this) {
            if (fn(val, key, this)) results.set(key, val);
        }
        return results;
    }

    public partition(fn: (value: V, key: K, collection: this) => boolean): [this, this];
    public partition<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): [this, this];
    public partition(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): [this, this] {
        if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
        const results: [this, this] = [
            // @ts-expect-error
            new this.constructor[Symbol.species]<K, V>() as this,
            // @ts-expect-error
            new this.constructor[Symbol.species]<K, V>() as this
        ];
        for (const [key, val] of this) {
            if (fn(val, key, this)) {
                results[0].set(key, val);
            } else {
                results[1].set(key, val);
            }
        }
        return results;
    }

    public flatMap<T>(
        fn: (value: V, key: K, collection: this) => IllustratorCollection<K, T>
    ): IllustratorCollection<K, T>;
    public flatMap<T, This>(
        fn: (this: This, value: V, key: K, collection: this) => IllustratorCollection<K, T>,
        thisArg: This
    ): IllustratorCollection<K, T>;
    public flatMap<T>(
        fn: (value: V, key: K, collection: this) => IllustratorCollection<K, T>,
        thisArg?: unknown
    ): IllustratorCollection<K, T> {
        const collections = this.map(fn, thisArg);
        // @ts-expect-error
        return (new this.constructor[Symbol.species]<K, T>() as IllustratorCollection<K, T>).concat(...collections);
    }

    public map<T>(fn: (value: V, key: K, collection: this) => T): T[];
    public map<This, T>(fn: (this: This, value: V, key: K, collection: this) => T, thisArg: This): T[];
    public map<T>(fn: (value: V, key: K, collection: this) => T, thisArg?: unknown): T[] {
        if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
        const iter = this.entries();
        return Array.from({ length: this.size }, (): T => {
            const [key, value] = iter.next().value;
            return fn(value, key, this);
        });
    }

    public mapValues<T>(fn: (value: V, key: K, collection: this) => T): IllustratorCollection<K, T>;
    public mapValues<This, T>(
        fn: (this: This, value: V, key: K, collection: this) => T,
        thisArg: This
    ): IllustratorCollection<K, T>;
    public mapValues<T>(fn: (value: V, key: K, collection: this) => T, thisArg?: unknown): IllustratorCollection<K, T> {
        if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
        // @ts-expect-error
        const coll = new this.constructor[Symbol.species]<K, T>() as IllustratorCollection<K, T>;
        for (const [key, val] of this) coll.set(key, fn(val, key, this));
        return coll;
    }

    public some(fn: (value: V, key: K, collection: this) => boolean): boolean;
    public some<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): boolean;
    public some(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): boolean {
        if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
        for (const [key, val] of this) {
            if (fn(val, key, this)) return true;
        }
        return false;
    }

    public every(fn: (value: V, key: K, collection: this) => boolean): boolean;
    public every<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): boolean;
    public every(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): boolean {
        if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
        for (const [key, val] of this) {
            if (!fn(val, key, this)) return false;
        }
        return true;
    }

    public reduce<T>(fn: (accumulator: T, value: V, key: K, collection: this) => T, initialValue?: T): T {
        let accumulator!: T;

        if (typeof initialValue !== "undefined") {
            accumulator = initialValue;
            for (const [key, val] of this) accumulator = fn(accumulator, val, key, this);
            return accumulator;
        }
        let first = true;
        for (const [key, val] of this) {
            if (first) {
                accumulator = val as unknown as T;
                first = false;
                continue;
            }
            accumulator = fn(accumulator, val, key, this);
        }

        if (first) {
            throw new TypeError("Reduce of empty collection with no initial value");
        }

        return accumulator;
    }

    public clone(): this {
        // @ts-expect-error
        return new this.constructor[Symbol.species](this) as this;
    }

    public concat(...collections: IllustratorCollection<K, V>[]): this {
        const newColl = this.clone();
        for (const coll of collections) {
            for (const [key, val] of coll) newColl.set(key, val);
        }
        return newColl;
    }

    public equals(collection: IllustratorCollection<K, V>): boolean {
        if (!collection) return false;
        if (this === collection) return true;
        if (this.size !== collection.size) return false;
        for (const [key, value] of this) {
            if (!collection.has(key) || value !== collection.get(key)) {
                return false;
            }
        }
        return true;
    }

    public sort(
        compareFunction: (firstValue: V, secondValue: V, firstKey: K, secondKey: K) => number = (x, y): number =>
            Number(x > y) || Number(x === y) - 1
    ): this {
        const entries = [...this.entries()];
        entries.sort((a, b): number => compareFunction(a[1], b[1], a[0], b[0]));
        super.clear();
        for (const [k, v] of entries) {
            super.set(k, v);
        }
        return this;
    }
}
