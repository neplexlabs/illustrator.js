import { Illustrator } from "../../dist/index.mjs";
import { writeFile } from "fs/promises";

const illustrator = new Illustrator(1024, 1024);
const layer = illustrator.backgroundLayer.unlock();
const imageTool = layer.tools.get("ImageTool");
const image = await imageTool.load("./logo.png");

imageTool.drawRounded(image, 0, 0, layer.width, layer.height, layer.width / 2);
imageTool.render();

const output = await illustrator.export({
    encoding: "png"
});

await writeFile("./rounded.png", output);
