import { writeFile } from "fs/promises";
import { ColorUtil, Illustrator } from "../dist/index.mjs";

const illustrator = new Illustrator(2048, 2048);
const layer = illustrator.backgroundLayer.unlock();

// prettier-ignore
layer.tools.get("BackgroundColorTool")
    .setFillColor("#EB459E")
    .fill(0, 0, layer.width, layer.height)
    .render();

const shadow = layer.tools.get("ShadowTool");
shadow.setColor("#000000");
shadow.setBlur(8);
shadow.setOffsetX(8);
shadow.setOffsetY(-12);
shadow.render();

const offset = layer.utils.getCenterPoint(2);
const text = layer.tools.get("TextTool");
text.setTextAlignment("center");
text.setTextBaseline("middle");
text.setFont("PRIMETIME", 280);
text.setColor(ColorUtil.Colors.DC_WHITE);
text.writeText("BLACKPINK", offset.x, offset.y);
text.render();

const img = await illustrator.export();
await writeFile("./text.png", img);
