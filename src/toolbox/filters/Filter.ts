import { ToolBox } from "../base/ToolBox";

export type FilterArgs = { name: string; value: string | number };

export class FilterTool extends ToolBox {
    public applyFilter(filters: FilterArgs[]) {
        if (!Array.isArray(filters) || !filters.length) return this;
        this.history.push((ctx) => {
            ctx.filter = filters.map((m) => `${m.name}(${m.value})`).join(" ");
        });
        return this;
    }

    public gaussianBlur(amount = 1) {
        if (typeof amount !== "number") throw new TypeError("gaussian blur amount must be a number");
        return this.applyFilter([
            {
                name: "blur",
                value: amount
            }
        ]);
    }

    public brightness(amount: number) {
        if (typeof amount !== "number") throw new TypeError("brightness amount must be a number");
        return this.applyFilter([
            {
                name: "brightness",
                value: `${amount}%`
            }
        ]);
    }

    public contrast(amount: number) {
        if (typeof amount !== "number") throw new TypeError("contrast amount must be a number");
        return this.applyFilter([
            {
                name: "contrast",
                value: `${amount}%`
            }
        ]);
    }

    public dropShadow(x: string | number, y: string | number, radius: number, color: string) {
        return this.applyFilter([
            {
                name: "drop-shadow",
                value: `${x} ${y} ${radius} ${color}`
            }
        ]);
    }

    public grayscale(amount = 100) {
        if (typeof amount !== "number") throw new TypeError("grayscale amount must be a number");
        return this.applyFilter([
            {
                name: "grayscale",
                value: `${amount}%`
            }
        ]);
    }

    public hueRotate(angle: number) {
        if (typeof angle !== "number") throw new TypeError("hue rotate angle must be a number");
        return this.applyFilter([
            {
                name: "hue-rotate",
                value: `${angle}deg`
            }
        ]);
    }

    public invert(amount = 100) {
        if (typeof amount !== "number") throw new TypeError("invert amount must be a number");
        return this.applyFilter([
            {
                name: "invert",
                value: `${amount}%`
            }
        ]);
    }

    public opacity(amount: number) {
        if (typeof amount !== "number") throw new TypeError("opacity amount must be a number");
        return this.applyFilter([
            {
                name: "opacity",
                value: `${amount}%`
            }
        ]);
    }

    public saturate(amount: number) {
        if (typeof amount !== "number") throw new TypeError("saturation amount must be a number");
        return this.applyFilter([
            {
                name: "saturate",
                value: `${amount}%`
            }
        ]);
    }

    public sepia(amount = 100) {
        if (typeof amount !== "number") throw new TypeError("sepia amount must be a number");
        return this.applyFilter([
            {
                name: "sepia",
                value: `${amount}%`
            }
        ]);
    }
}
