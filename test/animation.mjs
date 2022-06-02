import { ColorUtil, Illustrator, Tools } from "../dist/index.mjs";
import fs from "fs";

const illustrator = new Illustrator(512, 512);
illustrator.backgroundLayer.hide();

const colors = ColorUtil.Colors;

for (const color in colors) {
    const layer = illustrator.layers.createLayer({
        name: color
    });
    const bgTool = new Tools.BackgroundColorTool(layer);
    bgTool.setFillColor(color);
    bgTool.fill(0, 0, illustrator.width, illustrator.height);
    bgTool.render();
}

const animation = illustrator.animation;
const layers = illustrator.layers.getAllLayers().map(m => ({
    duration: 100,
    frame: m.layer
}));
animation.setRepeat(0);
animation.addFrames(layers);

const output = await animation.createAnimation();
output.pipe(fs.createWriteStream("./test/animation.gif"));