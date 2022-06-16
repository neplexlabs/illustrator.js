<div align="left">
    <img src="https://raw.githubusercontent.com/CesiumLabs/illustrator.js/06de5d9cb50f8e4caf76fd20bb16cefc3fdef396/assets/logo.png" alt="illustrator.js" height="128" width="128" style="border-radius:7px;" align="right" />
    <div align="left">
         <h1>Illustrator.js</h1>
         <p>JavaScript image processing library</p>
    </div>
</div>

-----------------------

# Installation

```powershell
# install with npm
$ npm install illustrator.js
# install with yarn
$ yarn add illustrator.js
```

🎉 No build tools required!

# Features

* Illustrator is fast, powered by **[@napi-rs/canvas](https://github.com/Brooooooklyn/canvas)** 🚀
* Illustrator provides beginner friendly API 🤓
* TypeScript supported 💪
* Layers API 🎚️
* Color utilities API 🎨
* Filters 📸
* Tools such as eraser, shapes, text, etc. ⚒️
* Image manipulation (crop, brightness, blur, sharpness, format conversion, compression and much more..)
* Animation API (GIF) 😎

and more...

# Documentation

**[https://illustrator.js.org](https://illustrator.js.org)**

# Quick Example

## Creating GIF

<details>
<summary>Show code</summary>

```js
// import
import { Illustrator } from "illustrator.js";
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
    const bgTool = layer.tools.get("BackgroundColorTool");
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

#### Output Preview

<img src="https://raw.githubusercontent.com/CesiumLabs/illustrator.js/main/examples/gif/animation.gif" alt="gif-example" height="128" width="128" />
</details>

## Other Examples

Check out **[~/examples](https://github.com/CesiumLabs/illustrator.js/tree/main/examples)** for more.

# Canvacord

It may be hard to get simple things done via this library.
Check out **[Canvacord](https://github.com/CesiumLabs/canvacord)** for beginner-friendly utility APIs, built with **Illustrator.js**.

# Discord

Join our official Discord support server: **[Join Now](https://discord.gg/uqB8kxh)**

# Help us keep this project alive

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/G2G05KFHP)