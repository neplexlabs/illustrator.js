import { Illustrator, Layer, Tools } from "../dist/index.mjs";
import fs from "fs/promises";

const illustrator = new Illustrator(760, 360);
// // background
// const layer = new Layer(illustrator);
// const bgTool = new Tools.BackgroundColorTool(layer);
// // const gradient = layer.utils.createConicGradient(90, 0, 0);
// // gradient.addColorStop(0, "#000000");
// // gradient.addColorStop(1, "#FFFFFF");
// bgTool.setFillColor("#FF0000");
// bgTool.fill(0, 0, illustrator.width, illustrator.height);
// bgTool.render();
// illustrator.addLayer(layer, "layer-1");

const layer2 = new Layer(illustrator);
const textTool = new Tools.TextTool(layer2);

textTool.setColor("#FFFFFF");
textTool.setFont("PRIMETIME", "50px");
textTool.setTextAlignment("center");
textTool.writeText("Hello World", 350, 150);
textTool.render();
illustrator.addLayer(layer2, "layer-2");

const output = await illustrator.export({
    encoding: "png"
});

await fs.writeFile("./test/demo.png", output);