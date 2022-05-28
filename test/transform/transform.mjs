import { Illustrator, Tools } from "../../dist/index.mjs";
import fs from "fs/promises";

const illustrator = new Illustrator(512, 512);
const layer = illustrator.backgroundLayer;
layer.unlock();

const transformTool = new Tools.TransformTool(layer);
transformTool.transform({
    horizontalSkewing: 0.8,
    verticalSkewing: 0.2,
    horizontalTranslation: 0,
    verticalTranslation: 0
});
transformTool.render();

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

const output = await illustrator.export({
    encoding: "png"
});

await fs.writeFile("./test/transform/output.png", output);