/* eslint-env node */
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import replace from "rollup-plugin-replace";
import alias from "rollup-plugin-alias";
import pkgConfig from "./package.json";

let is_node = process.env.IS_NODE === "1";

let globals = { "stackblur-canvas": "StackBlur", rgbcolor: "RGBColor", canvas: "Canvas" };
let external = ["stackblur-canvas", "rgbcolor", "canvas"];

let plugins = [
  replace({
    "nodeEnv = isNode": is_node ? "nodeEnv = true;" : "nodeEnv = false;"
  }),
  commonjs(),
  resolve(),
  json()
];

if (is_node) {
  external = external.concat(["xmldom", "jsdom"]);
  globals.xmldom = "xmldom";
  globals.jsdom = "jsdom";
} else {
  plugins = [
    alias({
      jsdom: "./dummy.js",
      xmldom: "./dummy.js"
    })
  ].concat(plugins);
}

let input = "./src/canvg.js",
  output = {
    file: is_node ? "./dist/node/canvg.js" : "./dist/browser/canvg.js",
    format: "umd",
    exports: "default",
    name: "canvg",

    globals: globals,
    banner: `
/*
 * canvg.js - Javascript SVG parser and renderer on Canvas
 * version ${pkgConfig.version}
 * MIT Licensed
 * Gabe Lerner (gabelerner@gmail.com)
 * https://github.com/canvg/canvg
 *
 */
 `,
    extend: false
  };

export default {
  input: input,
  plugins: plugins,
  output: output,
  external: external
};
