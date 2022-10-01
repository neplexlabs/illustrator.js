import { IllustratorImage, ImageLoader, IllustratorImageEnums } from "../../dist/index.mjs";
// use this for prod
// import { IllustratorImage, ImageLoader } from "illustrator.js";
import fs from "node:fs";

const img = await ImageLoader.loadImage("https://cdn.discordapp.com/embed/avatars/0.png?size=2048", true);
const image = new IllustratorImage(img);

const output = await image
    .crop(50, 50, 1024, 1024)
    .grayscale()
    .blur(3)
    .rotate(IllustratorImageEnums.Orientation.Rotate180)
    .png();

await fs.promises.writeFile("./example.png", output);
