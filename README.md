# @flexis/canvg

[![NPM version][npm]][npm-url]
[![Peer dependencies status][peer-deps]][peer-deps-url]
[![Dependencies status][deps]][deps-url]
[![Build status][build]][build-url]
[![Coverage status][coverage]][coverage-url]
[![Dependabot badge][dependabot]][dependabot-url]
[![Documentation badge][documentation]][documentation-url]

[npm]: https://img.shields.io/npm/v/@flexis/canvg.svg
[npm-url]: https://npmjs.com/package/@flexis/canvg

[peer-deps]: https://david-dm.org/TrigenSoftware/flexis-canvg/peer-status.svg
[peer-deps-url]: https://david-dm.org/TrigenSoftware/flexis-canvg?type=peer

[deps]: https://david-dm.org/TrigenSoftware/flexis-canvg.svg
[deps-url]: https://david-dm.org/TrigenSoftware/flexis-canvg

[build]: http://img.shields.io/travis/com/TrigenSoftware/flexis-canvg/master.svg
[build-url]: https://travis-ci.com/TrigenSoftware/flexis-canvg

[coverage]: https://img.shields.io/coveralls/TrigenSoftware/flexis-canvg.svg
[coverage-url]: https://coveralls.io/r/TrigenSoftware/flexis-canvg

[dependabot]: https://api.dependabot.com/badges/status?host=github&repo=TrigenSoftware/flexis-canvg
[dependabot-url]: https://dependabot.com/

[documentation]: https://img.shields.io/badge/API-Documentation-2b7489.svg
[documentation-url]: https://trigensoftware.github.io/flexis-canvg

JavaScript SVG parser and renderer on Canvas. It takes the URL to the SVG file or the text of the SVG file, parses it in JavaScript and renders the result on Canvas.

[Demo](https://trigensoftware.github.io/flexis-canvg/demo/)

## Install

```sh
npm i @flexis/canvg
# or
yarn add @flexis/canvg
```

## Usage

### JS API

Basic module exports:

```js
export default Canvg;
export {
    presets
};
```

[Description of all exports you can find in Documentation.](https://trigensoftware.github.io/flexis-canvg/index.html)

#### Example

##### Browser:

```js
import Canvg from '@flexis/canvg';

let v = null;

window.onload = async () => {

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    
    v = await Canvg.from(ctx, './svgs/1.svg');

    // Start SVG rendering with animations and mouse handling.
    v.start();
};

window.onbeforeunload = () => {
    v.stop();
};
```

##### OffscreenCanvas:

```js
import Canvg, {
    presets
} from '@flexis/canvg';

self.onmessage = async (event) => {

    const {
        width,
        height,
        svg
    } = event.data;
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    const v = await Canvg.from(ctx, svg, presets.offscreen());

    // Render only first frame, ignoring animations and mouse.
    await v.render();

    const blob = await canvas.convertToBlob();

    self.postMessage({
        pngUrl: blob
    });
};
```

##### NodeJS:

```js
import {
    promises as fs
} from 'fs';
import {
    DOMParser
} from 'xmldom';
import * as canvas from 'canvas';
import fetch from 'node-fetch';
import Canvg, {
    presets
} from '@flexis/canvg';

const preset = presets.node({
    DOMParser,
    canvas,
    fetch
});

(async (output, input) => {

    const svg = await fs.readFile(input, 'utf8');
    const canvas = preset.createCanvas(800, 600);
    const ctx = canvas.getContext('2d');
    const v = Canvg.fromString(ctx, svg, preset);

    // Render only first frame, ignoring animations.
    await v.render();

    const png = canvas.toBuffer();

    await fs.writeFile(output, png);

})(
    process.argv.pop(),
    process.argv.pop()
);
```

#### Options

The third parameter of `new Canvg(...)`, `Canvg.from(...)` and `Canvg.fromString(...)` is options:

```ts
interface IOptions {
    /**
     * WHATWG-compatible `fetch` function.
     */
    fetch?: typeof fetch;
    /**
     * XML/HTML parser from string into DOM Document.
     */
    DOMParser?: typeof DOMParser;
    /**
     * Window object.
     */
    window?: Window;
    /**
     * Whether enable the redraw.
     */
    enableRedraw?: boolean;
    /**
     * Ignore mouse events.
     */
    ignoreMouse?: boolean;
    /**
     * Ignore animations.
     */
    ignoreAnimation?: boolean;
    /**
     * Does not try to resize canvas.
     */
    ignoreDimensions?: boolean;
    /**
     * Does not clear canvas.
     */
    ignoreClear?: boolean;
    /**
     * Scales horizontally to width.
     */
    scaleWidth?: number;
    /**
     * Scales vertically to height.
     */
    scaleHeight?: number;
    /**
     * Draws at a x offset.
     */
    offsetX?: number;
    /**
     * Draws at a y offset.
     */
    offsetY?: number;
    /**
     * Will call the function on every frame, if it returns true, will redraw.
     */
    forceRedraw?(): boolean;
    /**
     * Default `rem` size.
     */
    rootEmSize?: number;
    /**
     * Default `em` size.
     */
    emSize?: number;
    /**
     * Function to create new canvas.
     */
    createCanvas?: (width: number, height: number) => HTMLCanvasElement | OffscreenCanvas;
    /**
     * Function to create new image.
     */
    createImage?: (src: string) => Promise<CanvasImageSource>;
}
```

##### Options presets

There are two options presets:

- `presets.offscreen()`: options for [`OffscreenCanvas`](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas);
- `presets.node({ DOMParser, canvas, fetch })`: options for NodeJS with [`node-canvas`](https://github.com/Automattic/node-canvas).

## What's implemented?

The end goal is everything from the [SVG spec](http://www.w3.org/TR/SVG/). The majority of the rendering and animation is working. If you would like to see a feature implemented, don't hesitate to add it to the issues list, or better is to create pull request 😎
