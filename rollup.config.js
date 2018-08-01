import resolve from "rollup-plugin-node-resolve";
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';



let is_node = process.env.IS_NODE === '1';

let globals = { stackblur: 'stackBlur', rgbcolor: 'RGBColor' };
let external = ['stackblur', 'rgbcolor'];
if (is_node) {
    external = external.concat(['xmldom', 'jsdom']);
    globals.xmldom = 'xmldom';
    globals.jsdom = 'jsdom';
}

let input = "./canvg.src.js",
    plugins = [
        replace({
            '__NODE_ENV__': is_node,
            '__JSDOM__': is_node ? "require('jsdom')" : null,
            '__DOMPARSER__': is_node ? "require('xmldom').DOMParser" : 'window.DOMParser',
            '__WINDOWENV__': is_node ? "jsdom.jsdom().defaultView" : 'window'

        }),
        commonjs(),
        resolve(),
        json()
    ],

    output = {
        file: is_node ? "canvg.node.js" : "canvg.js",
        format: "umd",
        exports: 'default',
        name: 'canvg',

        globals: globals,
        extend: false
    };




export default {
    input: input,
    plugins: plugins,
    output: output,
    external: external

};