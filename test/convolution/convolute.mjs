import { Illustrator, Layer, Tools } from "../../dist/index.mjs";
import fs from "fs/promises";

const illustrator = new Illustrator(512, 512);
const layer = illustrator.backgroundLayer;
layer.unlock();

const imgTool = new Tools.ImageTool(layer);

await imgTool.load("https://cdn.discordapp.com/embed/avatars/0.png").then((image) => {
    imgTool.draw(
        image,
        0,
        0,
        illustrator.width,
        illustrator.height
    );
    imgTool.render();
});

const conv = new Tools.ConvolutionTool(layer);
conv.convolute({
    iterations: 30,
    weights: [0, -1, 0,
        -1, 5, -1,
        0, -1, 0]
}).render();

const output = await illustrator.export({
    encoding: "png"
});

await fs.writeFile("./test/convolution/output.png", output);