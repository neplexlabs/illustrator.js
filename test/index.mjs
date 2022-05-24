import { Illustrator, Tools } from "../dist/index.mjs";
import fs from "fs/promises";

const illustrator = new Illustrator(512, 512);
illustrator.backgroundLayer.unlock();
const convolution = new Tools.ConvolutionTool(illustrator.backgroundLayer);
const imgTool = new Tools.ImageTool(illustrator.backgroundLayer);

await imgTool.load("https://cdn.discordapp.com/embed/avatars/0.png?size=4096").then((image) => {
    imgTool.draw(
        image,
        0,
        0,
        illustrator.width,
        illustrator.height
    );
    imgTool.render();
});

// convolution.convolute({
//     weights: [1 / 11, 1 / 11, 1 / 11, 1 / 11, 1 / 11, 1 / 11, 1 / 11, 1 / 11, 1 / 11],
//     iterations: 50
// });
// convolution.render();

const output = await illustrator.export({
    encoding: "png"
});

await fs.writeFile("./test/convolution.png", output);