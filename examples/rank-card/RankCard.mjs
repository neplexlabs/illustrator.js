import { Illustrator, IllustratorImage, ImageLoader } from "../../dist/index.mjs";
// use the following for prod
// import { Illustrator, IllustratorImage, ImageLoader } from "illustrator.js";
import { promises as fs } from "fs";

const config = {
    width: 2048,
    height: 512,
    backgroundImage: "./background.png",
    avatar: "https://avatars.githubusercontent.com/u/46562212?v=4",
    username: "Archaeopteryx",
    font: {
        path: "./MANROPE_BOLD.ttf",
        name: "MANROPE_BOLD"
    },
    rank: 1,
    level: 10,
    currentXp: 284,
    requiredXp: 600
};

const formatNumber = (n) => new Intl.NumberFormat("en", { notation: "compact" }).format(n);

const illustrator = new Illustrator(config.width, config.height);

// background
const img = await ImageLoader.loadImage(config.backgroundImage, true);
const image = new IllustratorImage(img);

const bg = await image.resize(config.width).crop(0, 200, config.width, 712).png();
const background = await ImageLoader.loadImage(bg);

const layer = illustrator.backgroundLayer.unlock();
const itool = layer.tools.get("ImageTool");

itool.drawRounded(background, 0, 0, config.width, config.height, 15);
itool.render();

const textL = illustrator.layers.createLayer({
    name: "text"
});

const xp = config.currentXp > config.requiredXp ? config.requiredXp : config.currentXp;
const barWidth = xp / config.requiredXp * 1413;
const perc = ((xp / config.requiredXp) * 100);

let textTool = textL.tools.get("TextTool");
textTool.registerFontPath("./MANROPE_BOLD.ttf", "MANROPE_BOLD");

textTool
    .setColor("#FFFFFF")
    .setFont("MANROPE_BOLD", "85px")
    .writeText(config.username, 485, illustrator.height / 2 - 25)
    .setColor("#A7A7A7")
    .setFont("MANROPE_BOLD", "40px")
    .writeText(`RANK:`, 500, illustrator.height / 2 + 120)
    .setColor("#FFFFFF")
    .writeText(`#${config.rank}`, 500 + 130, illustrator.height / 2 + 120)
    .setColor("#A7A7A7")
    .writeText(`LEVEL:`, 500 + 265, illustrator.height / 2 + 120)
    .setColor("#FFFFFF")
    .writeText(`${config.level}`, 500 + 410, illustrator.height / 2 + 120)
    .render();

const xpText = illustrator.layers.createLayer({
    name: "XP"
});

let textToolXP = xpText.tools.get("TextTool");

textToolXP
    .registerFontPath("MANROPE_BOLD", "MANROPE_BOLD");
textToolXP
    .setColor("#A7A7A7")
    .setFont("MANROPE_BOLD", "40px")
    .writeText(`XP:`, 1060, illustrator.height / 2 + 120)
    .setColor("#FFFFFF")
    .setFont("MANROPE_BOLD", "40px")
    .writeText(`${formatNumber(config.currentXp)}/${formatNumber(config.requiredXp)}`, 1140, illustrator.height / 2 + 120)
    .setFont("MANROPE_BOLD", "50px")
    .setColor("#A7A7A7")
    .writeText(`${perc.toFixed(2)}%`, illustrator.width - 330, illustrator.height / 2 + 15)
    .render();

const progressLayer = illustrator.layers.createLayer({
    name: "progress bar"
});

const rectTool = progressLayer.tools.get("RectangleTool");
rectTool.drawRounded({ x: 475, y: illustrator.height / 2 + 25, width: 1413, height: 50, radius: 50 });
rectTool.setFillColor("#292929");
rectTool.fill();
rectTool.drawRounded({ x: 475, y: illustrator.height / 2 + 25, width: barWidth, height: 50, radius: 50 });
rectTool.setFillColor("#5865F2");
rectTool.fill();
rectTool.render();

const avatarLayer = illustrator.layers.createLayer({
    name: "avatar"
});

let rectangleTool = avatarLayer.tools.get("RectangleTool");
rectangleTool.setFillColor("#2f3136");
rectangleTool.fill();
rectangleTool.drawRounded({ x: 50, y: 50, width: 1948, height: 412, radius: 15 });
rectangleTool.render();

let aImgTool = avatarLayer.tools.get("ImageTool");
let avatar = await ImageLoader.loadImage(config.avatar);
aImgTool.draw(avatar, 100, 100, 312, 312, true);
aImgTool.render();

await illustrator.render();

const output = await illustrator.export({ encoding: "png" });
await fs.writeFile("./rank-card.png", output);