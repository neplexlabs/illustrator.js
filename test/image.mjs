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
    name: "images"
});
const image = new Tools.ImageTool(layer2);
const img = await image.load("https://cdn.discordapp.com/embed/avatars/0.png?size=2048");
image.draw(img, 25, 25, 462, 462, 250);
image.render();
await illustrator.render();

const output = await illustrator.export({
    encoding: "png"
});

await fs.writeFile("./image.png", output);