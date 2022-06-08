import { ColorUtil, Illustrator, Tools } from "../dist/index.mjs";
import fs from "fs/promises";

const illustrator = new Illustrator(512, 512);
const layer = illustrator.backgroundLayer;
layer.unlock();

// background
const bgTool = new Tools.BackgroundColorTool(layer);
const gradient = layer.utils.createConicGradient(90, 0, 0);
gradient.addColorStop(0, ColorUtil.resolveHex("DC_RED"));
gradient.addColorStop(1, ColorUtil.resolveHex("DC_GREEN"));
bgTool.setFillColor(gradient);
bgTool.fill(0, 0, illustrator.width, illustrator.height);
bgTool.render();

const layer2 = illustrator.layers.createLayer({
    name: "rectangles"
});
const rectangle = new Tools.RectangleTool(layer2);
rectangle.setFillColor(ColorUtil.resolveHex("DC_WHITE"));
rectangle.fill();
rectangle.drawRounded({ x: 25, y: 25, width: 125, height: 125, radius: 25 });
rectangle.render();

rectangle.setFillColor(ColorUtil.resolveHex("DC_WHITE"));
rectangle.fill();
rectangle.draw({ x: illustrator.width - 150, y: illustrator.height - 150, width: 125, height: 125 });
rectangle.render();

await illustrator.render();

const output = await illustrator.export({
    encoding: "png"
});

await fs.writeFile("./rectangle.png", output);