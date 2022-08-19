/**
 * @author SohamSuvarna
*/

import { Illustrator, ImageLoader } from "../../dist/index.mjs";
// Use the following in prod
// import { Illustrator, ImageLoader } from "illustrator.js";
import fs from "fs";

const illustrator = new Illustrator(512, 690);

const songTitle = "Starboy";
const artist = "The Weeknd, Daft Punk";
const coverImageSrc = "./coverimg.jpg";
const fontPath = "./GothamBold.ttf";

let totalDuration = 199; // in seconds
let playedDuration = 79; // in seconds

let totalWidth = illustrator.width / 2 + illustrator.width / 8;
let barWidth = (playedDuration / totalDuration) * totalWidth;

let td = formatTime(totalDuration);
let pd = formatTime(playedDuration);

const background = illustrator.backgroundLayer;
background.unlock();

const bgTool = background.tools.get("BackgroundColorTool");
bgTool.setFillColor("#181818");
bgTool.fill(0, 0, illustrator.width, illustrator.height);
bgTool.render();

const cover = illustrator.layers.createLayer({
    name: "cover"
});

let img = cover.tools.get("ImageTool");
let coverImg = await ImageLoader.loadImage(coverImageSrc);
img.drawRounded(coverImg, 50, 50, 412, 412, 15);
img.render();

const text = illustrator.layers.createLayer({
    name: "text"
});

let textT = text.tools.get("TextTool");

textT.registerFontPath(fontPath);

textT
    .setColor("#FFFFFF")
    .setFont("Gotham", 35, "bold")
    .writeText(songTitle, 52, 535)
    .setFont("Gotham", 28, "bold")
    .setColor("rgba(179,179,179,0.3)")
    .writeText(artist, 50, 570)
    .render();

let progressbar = illustrator.layers.createLayer({
    name: "progress bar"
});

let textTool = progressbar.tools.get("TextTool");
textTool
    .setFont("Gotham", 15)
    .setColor("#A7A7A7")
    .writeText(pd, 50, 632)
    .writeText(td, 50 + textTool.measure(pd).width + totalWidth + 35, 632)
    .render();

let rect = progressbar.tools.get("RectangleTool");
rect.fill();
rect.drawRounded({ x: 50 + textTool.measure(pd).width + 25, y: 625, width: barWidth, height: 5, radius: 5 });
rect.setFillColor("#1db954");

rect.fill();
rect.drawRounded({ x: 50 + textTool.measure(pd).width + 25, y: 625, width: totalWidth, height: 5, radius: 5 });
rect.setFillColor("rgba(255,255,255,0.3)");

rect.render();

await illustrator.render();

const output = await illustrator.export({ encoding: "png" });
await fs.promises.writeFile("./spotify_card.png", output);

function formatTime(time) {
    let fmt = new Date(time * 1000).toISOString().slice(14, 19);
    if (time > 3600) fmt = new Date(time * 1000).toISOString().slice(11, 19);
    return fmt;
}