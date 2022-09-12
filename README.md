<div align="center">
    <img src="https://raw.githubusercontent.com/DevAndromeda/illustrator.js/main/assets/logo.png" alt="illustrator.js" height="128" width="128" align="center" style="border-radius:50%;" />
    <a href="https://illustrator.js.org"><h1>Illustrator.js</h1></a>
    <p>JavaScript image processing library</p>
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

# npm

**[https://www.npmjs.com/package/illustrator.js](https://www.npmjs.com/package/illustrator.js)**

# Quick Example

## Creating GIF

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

<img src="https://raw.githubusercontent.com/DevAndromeda/illustrator.js/main/examples/gif/animation.gif" alt="gif-example" height="128" width="128" />

## Other Examples

#### XP Card

<img src="https://raw.githubusercontent.com/DevAndromeda/illustrator.js/main/examples/rank-card/rank-card.png" alt="rank-card-example" />

[View Source](https://github.com/DevAndromeda/illustrator.js/tree/main/examples/rank-card)

##### Check out **[~/examples](https://github.com/DevAndromeda/illustrator.js/tree/main/examples)** for more.

# Canvacord

It may be hard to get simple things done via this library.
Check out **[Canvacord](https://github.com/CesiumLabs/canvacord)** for beginner-friendly utility APIs, built with **Illustrator.js**.

# Special thanks to 💖
[Brooooooklyn](https://github.com/Brooooooklyn) and the people behind [napi-rs](https://github.com/napi-rs). Illustrator.js is here only because of their hard work behind the projects under napi-rs.

# Discord

Join my official Discord server: **[https://discord.gg/CR8JxrxSwr](https://discord.gg/CR8JxrxSwr)**

# Help me keep this project alive

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/G2G05KFHP)
