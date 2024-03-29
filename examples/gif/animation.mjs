// import
import { Illustrator } from "../../dist/index.mjs";
// use this for prod
// import { Illustrator, Tools } from "illustrator.js";
import fs from "fs";

// create illustrator instance
const illustrator = new Illustrator(512, 512);

// colors array
const colors = ["#FFFFFF", "#FF0000", "#FFFF00", "#FF00FF", "#00FF00", "#0000FF"];

// for a color in colors array, create new layer and fill the layer with that color
for (const color of colors) {
    // create new layer
    const layer = illustrator.layers.createLayer({
        name: color
    });
    // create background color tool
    const bgTool = new layer.tools.get("BackgroundColorTool");
    // set fill color
    bgTool.setFillColor(color);
    // fill background
    bgTool.fill(0, 0, illustrator.width, illustrator.height);
    // render this tool to the layer
    bgTool.render();
}

// get animation api
const animation = illustrator.animation;
// get all layers and transform to animation frame
const layers = illustrator.layers.getAllLayers().map((m) => ({
    duration: 500,
    frame: m.layer
}));
// animation config, set repeat to infinite (or 0) and add our layers to frames
animation.setRepeat(0).addFrames(layers);

// render the frames
const output = await animation.createAnimation();
// write the output file
output.pipe(fs.createWriteStream("./animation.gif"));
