import { writeFile } from "fs/promises";
import { ColorUtil, Illustrator } from "../dist/index.mjs";

const illustrator = new Illustrator(2048, 2048);
const layer = illustrator.backgroundLayer.unlock();

// prettier-ignore
layer.tools.get("BackgroundColorTool")
    .setFillColor(ColorUtil.Colors.DC_DARK_BUT_NOT_BLACK)
    .fill(0, 0, layer.width, layer.height)
    .render();
const text = layer.tools.get("TextTool");
text.setFont("PRIMETIME", 190);
text.setColor(ColorUtil.Colors.DC_WHITE);
text.writeText("BLACKPINK", 40, 460);
text.render();

const img = await illustrator.export();
await writeFile("./text.png", img);