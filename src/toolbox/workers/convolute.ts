import { ImageData } from "@napi-rs/canvas";
import { parentPort } from "worker_threads";

interface ConvolutionData {
    pixels: {
        width: number;
        height: number;
        data: Uint8ClampedArray;
    };
    weights: Array<number>;
    opaque: boolean;
    iterations?: number;
}

function convolute(data: ConvolutionData) {
    const { pixels, weights, opaque } = data;

    const side = Math.round(Math.sqrt(weights.length));
    const halfSide = Math.floor(side / 2);
    const src = pixels.data;
    const sw = pixels.width;
    const sh = pixels.height;
    const w = sw;
    const h = sh;
    const output = new ImageData(src, w, h);
    const dst = output.data;
    const alphaFac = opaque ? 1 : 0;

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const sy = y;
            const sx = x;
            const dstOff = (y * w + x) * 4;
            let r = 0;
            let g = 0;
            let b = 0;
            let a = 0;
            for (let cy = 0; cy < side; cy++) {
                for (let cx = 0; cx < side; cx++) {
                    const scy = sy + cy - halfSide;
                    const scx = sx + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        const srcOff = (scy * sw + scx) * 4;
                        const wt = weights[cy * side + cx];
                        r += src[srcOff] * wt;
                        g += src[srcOff + 1] * wt;
                        b += src[srcOff + 2] * wt;
                        a += src[srcOff + 3] * wt;
                    }
                }
            }
            dst[dstOff] = r;
            dst[dstOff + 1] = g;
            dst[dstOff + 2] = b;
            dst[dstOff + 3] = a + alphaFac * (255 - a);
        }
    }

    return output;
}

parentPort?.once("message", (msg: ConvolutionData) => {
    const itr = msg.iterations ?? 1;

    let result = msg.pixels;
    for (let i = 0; i < itr; i++) {
        result = convolute({
            opaque: msg.opaque,
            pixels: result,
            weights: msg.weights
        });
    }

    parentPort?.postMessage(result);
});
