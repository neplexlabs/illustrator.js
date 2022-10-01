/**
 * @author SohamSuvarna
 */

import { Illustrator, ImageLoader } from "../../dist/index.mjs";
// Use the following in prod
// import { Illustrator, ImageLoader } from "illustrator.js";
import fs from "fs";

const illustrator = new Illustrator(1024, 256);

const songTitle = "Starboy";
const artist = "The Weeknd, Daft Punk";
const album = "Starboy";
const coverImgSrc = "./coverimg.jpg";
const fontPath = "./GothamBold.ttf";

let totalDuration = 199; // in seconds
let playedDuration = 79; // in seconds

let totalWidth = illustrator.width / 2;
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
let coverImg = await ImageLoader.loadImage(coverImgSrc);
img.draw(coverImg, 40, 40, 176, 176);
img.render();

const text = illustrator.layers.createLayer({
    name: "text"
});

let font = fs.readFileSync(fontPath);

const textT = text.tools.get("TextTool");
textT.setColor("#FFFFFF");
textT.registerFont(font, "Gotham");
textT.setFont("Gotham", 40);
textT.writeText(songTitle, illustrator.width / 4, illustrator.height / 2 - 40);

textT.setColor("rgba(179,179,179,0.2)");
textT.setFont("Gotham", 25);
textT.writeText(artist, illustrator.width / 4, illustrator.height / 2 - 7);
textT.render();

textT.setColor("rgba(179,179,179,0.1)");
textT.setFont("Gotham", 25);
textT.writeText(album, illustrator.width / 4, illustrator.height / 2 + 20);
textT.render();

let progressbar = illustrator.layers.createLayer({
    name: "progress bar"
});

let textTool = progressbar.tools.get("TextTool");
textTool
    .setFont("Gotham", 15)
    .setColor("#A7A7A7")
    .writeText(pd, illustrator.width / 4, illustrator.height / 2 + 67)
    .writeText(td, illustrator.width / 4 + textTool.measure(pd).width + totalWidth + 35, illustrator.height / 2 + 67)
    .render();

let rect = progressbar.tools.get("RectangleTool");
rect.fill();
rect.drawRounded({
    x: illustrator.width / 4 + textTool.measure(pd).width + 25,
    y: illustrator.height / 2 + 60,
    width: barWidth,
    height: 5,
    radius: 5
});
rect.setFillColor("#1db954");

rect.fill();
rect.drawRounded({
    x: illustrator.width / 4 + textTool.measure(pd).width + 25,
    y: illustrator.height / 2 + 60,
    width: totalWidth,
    height: 5,
    radius: 5
});
rect.setFillColor("rgba(255,255,255,0.3)");

rect.render();

await illustrator.render();

const output = await illustrator.export({ encoding: "png" });
await fs.promises.writeFile("./spotify_card_classic.png", output);

function formatTime(time) {
    let fmt = new Date(time * 1000).toISOString().slice(14, 19);
    if (time > 3600) fmt = new Date(time * 1000).toISOString().slice(11, 19);
    return fmt;
}
