/* eslint-disable */

const fs = require("fs");
const { Illustrator, Layer, Tools } = require("../dist/index");

const illustrator = new Illustrator(512, 512);
illustrator.backgroundLayer.unlock();

const bgTool = new Tools.BackgroundColorTool(illustrator.backgroundLayer);
bgTool.setFillColor("#FFFFFF");
bgTool.fill(0, 0, illustrator.width, illustrator.height);
bgTool.setStrokeColor("#FF0000");
bgTool.setStrokeWidth(20);
bgTool.stroke(0, 0, illustrator.width, illustrator.height);
bgTool.render();

async function renderImages(img) {
    const layer = new Layer(illustrator);
    const imgTool = new Tools.ImageTool(layer);

    await imgTool.load(img).then((image) => {
        imgTool.draw(
            image,
            Math.floor(Math.random() * illustrator.width),
            Math.floor(Math.random() * illustrator.height),
            128,
            128
        );
        imgTool.render();

        illustrator.addLayer(layer, `layer-${Date.now()}`);
    });
}

Promise.all(
    Array.from({ length: 5 }, (_, i) => `https://cdn.discordapp.com/embed/avatars/${i}.png`).map(renderImages)
).then(() => {
    illustrator.export({ encoding: "jpeg", quality: 100 }).then((r) => fs.writeFileSync(`${__dirname}/demo.jpg`, r));
});
