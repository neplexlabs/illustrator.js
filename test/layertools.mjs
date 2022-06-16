import { writeFile } from "fs/promises";
import { ColorUtil, Illustrator } from "../dist/index.mjs";

const illustrator = new Illustrator(512, 512);
const layer = illustrator.backgroundLayer.unlock();

// prettier-ignore
layer.tools.get("BackgroundColorTool")
    .setFillColor(ColorUtil.Colors.DC_DARK_GREEN)
    .fill(0, 0, layer.width, layer.height)
    .render();

const img = await illustrator.export();
await writeFile("./layertools.png", img);