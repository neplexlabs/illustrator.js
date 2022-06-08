# Illustrator

JavaScript image processing library

# Installation

```sh
$ npm install illustrator.js
$ yarn add illustrator.js
```

# Features

* Illustrator is fast, powered by **[@napi-rs/canvas](https://github.com/Brooooooklyn/canvas)** 🚀
* Illustrator provides beginner friendly API 🤓
* TypeScript supported 💪
* Layers API 🎚️
* Color utilities API 🎨
* Filters 📸
* Tools such as eraser, shapes, text, etc. ⚒️
* Animation API (GIF) 😎

and more...

# Quick Example

## Creating GIF

```js
// import
import { Illustrator, Tools } from "illustrator.js";
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
    const bgTool = new Tools.BackgroundColorTool(layer);
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
const layers = illustrator.layers.getAllLayers().map(m => ({
    duration: 500,
    frame: m.layer
}));
// animation config, set repeat to infinite (or 0) and add our layers to frames
animation.setRepeat(0).addFrames(layers);

// render the frames
const output = await animation.createAnimation();
// write the output file
output.pipe(fs.createWriteStream("./animation.gif"));
```

#### Preview Output

<img src="https://raw.githubusercontent.com/CesiumLabs/illustrator.js/main/examples/gif/animation.gif" alt="gif-example" height="128" width="128" />

## Other Examples

Check out **[~/examples](https://github.com/CesiumLabs/illustrator.js/tree/main/examples)** for more.

# Canvacord

This library acts as Image Processor. It may be hard to get simple things done via this library.
Check out **[Canvacord](https://github.com/CesiumLabs/canvacord)** for beginner-friendly utility APIs, built with **Illustrator.js**.

# Help us keep this project alive

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/G2G05KFHP)