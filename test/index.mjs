import { Illustrator, Layer, Tools } from "../dist/index.mjs";
import fs from "fs/promises";

const illustrator = new Illustrator(512, 512);
const layer = illustrator.backgroundLayer;
layer.unlock();

// background
const bgTool = new Tools.BackgroundColorTool(layer);
const gradient = layer.utils.createConicGradient(90, 0, 0);
gradient.addColorStop(0, "#000000");
gradient.addColorStop(1, "#FFFFFF");
bgTool.setFillColor(gradient);
bgTool.fill(0, 0, illustrator.width, illustrator.height);
bgTool.render();

const layer2 = new Layer(illustrator);
const ellipse = new Tools.EllipseTool(layer2);

ellipse.setFillColor("#FFFFFF");
ellipse.addPoint();
ellipse.draw({
    x: 100,
    y: 100,
    radiusX: 50,
    radiusY: 75,
    rotation: Math.PI / 4,
    startAngle: 0,
    endAngle: 2 * Math.PI
})
ellipse.fill();
ellipse.removePoint();

ellipse.setStrokeColor("#FFFFFF");
ellipse.setLineWidth(12);
ellipse.addPoint();
ellipse.setLineDash([5, 5]);
ellipse.draw({
    x: 400,
    y: 400,
    radiusX: 50,
    radiusY: 75,
    rotation: Math.PI / 4,
    startAngle: 0,
    endAngle: 2 * Math.PI
})
ellipse.stroke();
ellipse.removePoint();

ellipse.render();

illustrator.addLayer(layer2, "layer-2");

const output = await illustrator.export({
    encoding: "png"
});

await fs.writeFile("./test/demo.png", output);