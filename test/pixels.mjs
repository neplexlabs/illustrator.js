import { writeFile } from "fs/promises";
import { ColorUtil, Illustrator } from "../dist/index.mjs";

const illustrator = new Illustrator(2048, 2048);
const layer = illustrator.backgroundLayer.unlock();

// prettier-ignore
layer.tools.get("BackgroundColorTool")
    .setFillColor(ColorUtil.Colors.DC_DARK_BUT_NOT_BLACK)
    .fill(0, 0, layer.width, layer.height)
    .render();

const pixels = layer.tools.get("PixelsTool");
await pixels.createRawTransformer("https://cdn.discordapp.com/embed/avatars/0.png?size=1024");
pixels.hueRotate(20).setContrast(50).setBrightness(50).resize(1536, 1536);
await pixels.renderTransformer({
    from: layer.height / 8,
    to: layer.width / 8,
    height: 1536,
    width: 1536
});
pixels.render();

const img = await illustrator.export();
await writeFile("./pixels.png", img);