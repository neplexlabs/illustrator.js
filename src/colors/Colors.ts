import { Illustrator } from "../illustrator/Illustrator";
import { ColorUtil } from "../utils/ColorUtil";
import { ColorSwatches } from "./ColorSwatches";

export class Colors {
    public utils = ColorUtil;
    public swatches = new ColorSwatches();
    public constructor(public readonly illustrator: Illustrator) {}
}
