// import
import { Illustrator, Tools } from "../../dist/index.mjs";
// use this for prod
// import { Illustrator, Tools } from "illustrator.js";
import fs from "fs";

const OVERLAY_COLOR = "#FF000033";
const illustrator = new Illustrator(256, 310);

let img, base;

illustrator.backgroundLayer.hide();
illustrator.animation.setFrameDelay(15).setRepeat(0);

for (let i = 0; i < 9; i++) {
    const layer = illustrator.layers.createLayer({ name: `Layer ${i}` });
    const imgTool = new Tools.ImageTool(layer);
    const bgTool = new Tools.BackgroundColorTool(layer);
    if (!img) img = await imgTool.load("https://cdn.discordapp.com/embed/avatars/0.png?size=4096");
    if (!base) base = await imgTool.load("./triggered-base.png");

    imgTool.draw(
        img,
        Math.floor(Math.random() * 30) - 30,
        Math.floor(Math.random() * 30) - 30,
        256 + 30,
        310 - 54 + 30
    );

    imgTool.draw(
        base,
        Math.floor(Math.random() * 20) - 20,
        310 - 54 + Math.floor(Math.random() * 20) - 20,
        256 + 20,
        54 + 20
    );

    imgTool.render();

    bgTool.setFillColor(OVERLAY_COLOR);
    bgTool.fill(0, 0, 256, 310);
    bgTool.render();
}

const layers = illustrator.layers.getAllLayers().map(m => ({
    frame: m.layer
}));

illustrator.animation.addFrames(layers);

const output = await illustrator.animation.createAnimation();
output.pipe(fs.createWriteStream("./triggered.gif"));