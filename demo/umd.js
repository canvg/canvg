(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.canvg = {}));
})(this, (function (exports) { 'use strict';

  /**
   * Options preset for `OffscreenCanvas`.
   * @param config - Preset requirements.
   * @param config.DOMParser - XML/HTML parser from string into DOM Document.
   * @returns Preset object.
   */ function offscreen() {
      let { DOMParser: DOMParserFallback  } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      const preset = {
          window: null,
          ignoreAnimation: true,
          ignoreMouse: true,
          DOMParser: DOMParserFallback,
          createCanvas (width, height) {
              return new OffscreenCanvas(width, height);
          },
          async createImage (url) {
              const response = await fetch(url);
              const blob = await response.blob();
              const img = await createImageBitmap(blob);
              return img;
          }
      };
      if (typeof globalThis.DOMParser !== 'undefined' || typeof DOMParserFallback === 'undefined') {
          Reflect.deleteProperty(preset, 'DOMParser');
      }
      return preset;
  }

  /**
   * Options preset for `node-canvas`.
   * @param config - Preset requirements.
   * @param config.DOMParser - XML/HTML parser from string into DOM Document.
   * @param config.canvas - `node-canvas` exports.
   * @param config.fetch - WHATWG-compatible `fetch` function.
   * @returns Preset object.
   */ function node(param) {
      let { DOMParser , canvas , fetch  } = param;
      return {
          window: null,
          ignoreAnimation: true,
          ignoreMouse: true,
          DOMParser,
          fetch,
          createCanvas: canvas.createCanvas,
          createImage: canvas.loadImage
      };
  }

  var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    offscreen: offscreen,
    node: node
  });

  /**
   * HTML-safe compress white-spaces.
   * @param str - String to compress.
   * @returns String.
   */ function compressSpaces(str) {
      return str.replace(/(?!\u3000)\s+/gm, ' ');
  }
  /**
   * HTML-safe left trim.
   * @param str - String to trim.
   * @returns String.
   */ function trimLeft(str) {
      return str.replace(/^[\n \t]+/, '');
  }
  /**
   * HTML-safe right trim.
   * @param str - String to trim.
   * @returns String.
   */ function trimRight(str) {
      return str.replace(/[\n \t]+$/, '');
  }
  /**
   * String to numbers array.
   * @param str - Numbers string.
   * @returns Numbers array.
   */ function toNumbers(str) {
      const matches = str.match(/-?(\d+(?:\.\d*(?:[eE][+-]?\d+)?)?|\.\d+)(?=\D|$)/gm);
      return matches ? matches.map(parseFloat) : [];
  }
  /**
   * String to matrix value.
   * @param str - Numbers string.
   * @returns Matrix value.
   */ function toMatrixValue(str) {
      const numbers = toNumbers(str);
      const matrix = [
          numbers[0] || 0,
          numbers[1] || 0,
          numbers[2] || 0,
          numbers[3] || 0,
          numbers[4] || 0,
          numbers[5] || 0
      ];
      return matrix;
  }
  // Microsoft Edge fix
  const allUppercase = /^[A-Z-]+$/;
  /**
   * Normalize attribute name.
   * @param name - Attribute name.
   * @returns Normalized attribute name.
   */ function normalizeAttributeName(name) {
      if (allUppercase.test(name)) {
          return name.toLowerCase();
      }
      return name;
  }
  /**
   * Parse external URL.
   * @param url - CSS url string.
   * @returns Parsed URL.
   */ function parseExternalUrl(url) {
      //                      single quotes [2]
      //                      v         double quotes [3]
      //                      v         v         no quotes [4]
      //                      v         v         v
      const urlMatch = /url\(('([^']+)'|"([^"]+)"|([^'")]+))\)/.exec(url);
      if (!urlMatch) {
          return '';
      }
      return urlMatch[2] || urlMatch[3] || urlMatch[4] || '';
  }
  /**
   * Transform floats to integers in rgb colors.
   * @param color - Color to normalize.
   * @returns Normalized color.
   */ function normalizeColor(color) {
      if (!color.startsWith('rgb')) {
          return color;
      }
      let rgbParts = 3;
      const normalizedColor = color.replace(/\d+(\.\d+)?/g, (num, isFloat)=>(rgbParts--) && isFloat ? String(Math.round(parseFloat(num))) : num
      );
      return normalizedColor;
  }

  // slightly modified version of https://github.com/keeganstreet/specificity/blob/master/specificity.js
  const attributeRegex = /(\[[^\]]+\])/g;
  const idRegex = /(#[^\s+>~.[:]+)/g;
  const classRegex = /(\.[^\s+>~.[:]+)/g;
  const pseudoElementRegex = /(::[^\s+>~.[:]+|:first-line|:first-letter|:before|:after)/gi;
  const pseudoClassWithBracketsRegex = /(:[\w-]+\([^)]*\))/gi;
  const pseudoClassRegex = /(:[^\s+>~.[:]+)/g;
  const elementRegex = /([^\s+>~.[:]+)/g;
  function findSelectorMatch(selector, regex) {
      const matches = regex.exec(selector);
      if (!matches) {
          return [
              selector,
              0
          ];
      }
      return [
          selector.replace(regex, ' '),
          matches.length
      ];
  }
  /**
   * Measure selector specificity.
   * @param selector - Selector to measure.
   * @returns Specificity.
   */ function getSelectorSpecificity(selector) {
      const specificity = [
          0,
          0,
          0
      ];
      let currentSelector = selector.replace(/:not\(([^)]*)\)/g, '     $1 ').replace(/{[\s\S]*/gm, ' ');
      let delta = 0;
      [currentSelector, delta] = findSelectorMatch(currentSelector, attributeRegex);
      specificity[1] += delta;
      [currentSelector, delta] = findSelectorMatch(currentSelector, idRegex);
      specificity[0] += delta;
      [currentSelector, delta] = findSelectorMatch(currentSelector, classRegex);
      specificity[1] += delta;
      [currentSelector, delta] = findSelectorMatch(currentSelector, pseudoElementRegex);
      specificity[2] += delta;
      [currentSelector, delta] = findSelectorMatch(currentSelector, pseudoClassWithBracketsRegex);
      specificity[1] += delta;
      [currentSelector, delta] = findSelectorMatch(currentSelector, pseudoClassRegex);
      specificity[1] += delta;
      currentSelector = currentSelector.replace(/[*\s+>~]/g, ' ').replace(/[#.]/g, ' ');
      [currentSelector, delta] = findSelectorMatch(currentSelector, elementRegex) // lgtm [js/useless-assignment-to-local]
      ;
      specificity[2] += delta;
      return specificity.join('');
  }

  const PSEUDO_ZERO = 0.00000001;
  /**
   * Vector magnitude.
   * @param v
   * @returns Number result.
   */ function vectorMagnitude(v) {
      return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
  }
  /**
   * Ratio between two vectors.
   * @param u
   * @param v
   * @returns Number result.
   */ function vectorsRatio(u, v) {
      return (u[0] * v[0] + u[1] * v[1]) / (vectorMagnitude(u) * vectorMagnitude(v));
  }
  /**
   * Angle between two vectors.
   * @param u
   * @param v
   * @returns Number result.
   */ function vectorsAngle(u, v) {
      return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vectorsRatio(u, v));
  }
  function CB1(t) {
      return t * t * t;
  }
  function CB2(t) {
      return 3 * t * t * (1 - t);
  }
  function CB3(t) {
      return 3 * t * (1 - t) * (1 - t);
  }
  function CB4(t) {
      return (1 - t) * (1 - t) * (1 - t);
  }
  function QB1(t) {
      return t * t;
  }
  function QB2(t) {
      return 2 * t * (1 - t);
  }
  function QB3(t) {
      return (1 - t) * (1 - t);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var raf$1 = {exports: {}};

  var performanceNow = {exports: {}};

  // Generated by CoffeeScript 1.12.2
  (function() {
      var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;
      if (typeof performance !== "undefined" && performance !== null && performance.now) {
          performanceNow.exports = function() {
              return performance.now();
          };
      } else if (typeof process !== "undefined" && process !== null && process.hrtime) {
          performanceNow.exports = function() {
              return (getNanoSeconds() - nodeLoadTime) / 1000000;
          };
          hrtime = process.hrtime;
          getNanoSeconds = function() {
              var hr;
              hr = hrtime();
              return hr[0] * 1000000000 + hr[1];
          };
          moduleLoadTime = getNanoSeconds();
          upTime = process.uptime() * 1000000000;
          nodeLoadTime = moduleLoadTime - upTime;
      } else if (Date.now) {
          performanceNow.exports = function() {
              return Date.now() - loadTime;
          };
          loadTime = Date.now();
      } else {
          performanceNow.exports = function() {
              return new Date().getTime() - loadTime;
          };
          loadTime = new Date().getTime();
      }
  }).call(commonjsGlobal);

  var now = performanceNow.exports, root = typeof window === 'undefined' ? commonjsGlobal : window, vendors = [
      'moz',
      'webkit'
  ], suffix = 'AnimationFrame', raf = root['request' + suffix], caf = root['cancel' + suffix] || root['cancelRequest' + suffix];
  for(var i$1 = 0; !raf && i$1 < vendors.length; i$1++){
      raf = root[vendors[i$1] + 'Request' + suffix];
      caf = root[vendors[i$1] + 'Cancel' + suffix] || root[vendors[i$1] + 'CancelRequest' + suffix];
  }
  // Some versions of FF have rAF but not cAF
  if (!raf || !caf) {
      var last = 0, id = 0, queue = [], frameDuration = 1000 / 60;
      raf = function(callback) {
          if (queue.length === 0) {
              var _now = now(), next = Math.max(0, frameDuration - (_now - last));
              last = next + _now;
              setTimeout(function() {
                  var cp = queue.slice(0);
                  // Clear queue here to prevent
                  // callbacks from appending listeners
                  // to the current frame's queue
                  queue.length = 0;
                  for(var i1 = 0; i1 < cp.length; i1++){
                      if (!cp[i1].cancelled) {
                          try {
                              cp[i1].callback(last);
                          } catch (e) {
                              setTimeout(function() {
                                  throw e;
                              }, 0);
                          }
                      }
                  }
              }, Math.round(next));
          }
          queue.push({
              handle: ++id,
              callback: callback,
              cancelled: false
          });
          return id;
      };
      caf = function(handle) {
          for(var i2 = 0; i2 < queue.length; i2++){
              if (queue[i2].handle === handle) {
                  queue[i2].cancelled = true;
              }
          }
      };
  }
  raf$1.exports = function(fn) {
      // Wrap in a new function to prevent
      // `cancel` potentially being assigned
      // to the native rAF function
      return raf.call(root, fn);
  };
  raf$1.exports.cancel = function() {
      caf.apply(root, arguments);
  };
  raf$1.exports.polyfill = function(object) {
      if (!object) {
          object = root;
      }
      object.requestAnimationFrame = raf;
      object.cancelAnimationFrame = caf;
  };

  var requestAnimationFrame = raf$1.exports;

  /*
  	Based on rgbcolor.js by Stoyan Stefanov <sstoo@gmail.com>
  	http://www.phpied.com/rgb-color-parser-in-javascript/
  */

  var rgbcolor = function(color_string) {
      this.ok = false;
      this.alpha = 1;
      // strip any leading #
      if (color_string.charAt(0) == '#') {
          color_string = color_string.substr(1, 6);
      }
      color_string = color_string.replace(/ /g, '');
      color_string = color_string.toLowerCase();
      // before getting into regexps, try simple matches
      // and overwrite the input
      var simple_colors = {
          aliceblue: 'f0f8ff',
          antiquewhite: 'faebd7',
          aqua: '00ffff',
          aquamarine: '7fffd4',
          azure: 'f0ffff',
          beige: 'f5f5dc',
          bisque: 'ffe4c4',
          black: '000000',
          blanchedalmond: 'ffebcd',
          blue: '0000ff',
          blueviolet: '8a2be2',
          brown: 'a52a2a',
          burlywood: 'deb887',
          cadetblue: '5f9ea0',
          chartreuse: '7fff00',
          chocolate: 'd2691e',
          coral: 'ff7f50',
          cornflowerblue: '6495ed',
          cornsilk: 'fff8dc',
          crimson: 'dc143c',
          cyan: '00ffff',
          darkblue: '00008b',
          darkcyan: '008b8b',
          darkgoldenrod: 'b8860b',
          darkgray: 'a9a9a9',
          darkgreen: '006400',
          darkkhaki: 'bdb76b',
          darkmagenta: '8b008b',
          darkolivegreen: '556b2f',
          darkorange: 'ff8c00',
          darkorchid: '9932cc',
          darkred: '8b0000',
          darksalmon: 'e9967a',
          darkseagreen: '8fbc8f',
          darkslateblue: '483d8b',
          darkslategray: '2f4f4f',
          darkturquoise: '00ced1',
          darkviolet: '9400d3',
          deeppink: 'ff1493',
          deepskyblue: '00bfff',
          dimgray: '696969',
          dodgerblue: '1e90ff',
          feldspar: 'd19275',
          firebrick: 'b22222',
          floralwhite: 'fffaf0',
          forestgreen: '228b22',
          fuchsia: 'ff00ff',
          gainsboro: 'dcdcdc',
          ghostwhite: 'f8f8ff',
          gold: 'ffd700',
          goldenrod: 'daa520',
          gray: '808080',
          green: '008000',
          greenyellow: 'adff2f',
          honeydew: 'f0fff0',
          hotpink: 'ff69b4',
          indianred: 'cd5c5c',
          indigo: '4b0082',
          ivory: 'fffff0',
          khaki: 'f0e68c',
          lavender: 'e6e6fa',
          lavenderblush: 'fff0f5',
          lawngreen: '7cfc00',
          lemonchiffon: 'fffacd',
          lightblue: 'add8e6',
          lightcoral: 'f08080',
          lightcyan: 'e0ffff',
          lightgoldenrodyellow: 'fafad2',
          lightgrey: 'd3d3d3',
          lightgreen: '90ee90',
          lightpink: 'ffb6c1',
          lightsalmon: 'ffa07a',
          lightseagreen: '20b2aa',
          lightskyblue: '87cefa',
          lightslateblue: '8470ff',
          lightslategray: '778899',
          lightsteelblue: 'b0c4de',
          lightyellow: 'ffffe0',
          lime: '00ff00',
          limegreen: '32cd32',
          linen: 'faf0e6',
          magenta: 'ff00ff',
          maroon: '800000',
          mediumaquamarine: '66cdaa',
          mediumblue: '0000cd',
          mediumorchid: 'ba55d3',
          mediumpurple: '9370d8',
          mediumseagreen: '3cb371',
          mediumslateblue: '7b68ee',
          mediumspringgreen: '00fa9a',
          mediumturquoise: '48d1cc',
          mediumvioletred: 'c71585',
          midnightblue: '191970',
          mintcream: 'f5fffa',
          mistyrose: 'ffe4e1',
          moccasin: 'ffe4b5',
          navajowhite: 'ffdead',
          navy: '000080',
          oldlace: 'fdf5e6',
          olive: '808000',
          olivedrab: '6b8e23',
          orange: 'ffa500',
          orangered: 'ff4500',
          orchid: 'da70d6',
          palegoldenrod: 'eee8aa',
          palegreen: '98fb98',
          paleturquoise: 'afeeee',
          palevioletred: 'd87093',
          papayawhip: 'ffefd5',
          peachpuff: 'ffdab9',
          peru: 'cd853f',
          pink: 'ffc0cb',
          plum: 'dda0dd',
          powderblue: 'b0e0e6',
          purple: '800080',
          rebeccapurple: '663399',
          red: 'ff0000',
          rosybrown: 'bc8f8f',
          royalblue: '4169e1',
          saddlebrown: '8b4513',
          salmon: 'fa8072',
          sandybrown: 'f4a460',
          seagreen: '2e8b57',
          seashell: 'fff5ee',
          sienna: 'a0522d',
          silver: 'c0c0c0',
          skyblue: '87ceeb',
          slateblue: '6a5acd',
          slategray: '708090',
          snow: 'fffafa',
          springgreen: '00ff7f',
          steelblue: '4682b4',
          tan: 'd2b48c',
          teal: '008080',
          thistle: 'd8bfd8',
          tomato: 'ff6347',
          turquoise: '40e0d0',
          violet: 'ee82ee',
          violetred: 'd02090',
          wheat: 'f5deb3',
          white: 'ffffff',
          whitesmoke: 'f5f5f5',
          yellow: 'ffff00',
          yellowgreen: '9acd32'
      };
      color_string = simple_colors[color_string] || color_string;
      // emd of simple type-in colors
      // array of color definition objects
      var color_defs = [
          {
              re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*((?:\d?\.)?\d)\)$/,
              example: [
                  'rgba(123, 234, 45, 0.8)',
                  'rgba(255,234,245,1.0)'
              ],
              process: function(bits) {
                  return [
                      parseInt(bits[1]),
                      parseInt(bits[2]),
                      parseInt(bits[3]),
                      parseFloat(bits[4])
                  ];
              }
          },
          {
              re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
              example: [
                  'rgb(123, 234, 45)',
                  'rgb(255,234,245)'
              ],
              process: function(bits) {
                  return [
                      parseInt(bits[1]),
                      parseInt(bits[2]),
                      parseInt(bits[3])
                  ];
              }
          },
          {
              re: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
              example: [
                  '#00ff00',
                  '336699'
              ],
              process: function(bits) {
                  return [
                      parseInt(bits[1], 16),
                      parseInt(bits[2], 16),
                      parseInt(bits[3], 16)
                  ];
              }
          },
          {
              re: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
              example: [
                  '#fb0',
                  'f0f'
              ],
              process: function(bits) {
                  return [
                      parseInt(bits[1] + bits[1], 16),
                      parseInt(bits[2] + bits[2], 16),
                      parseInt(bits[3] + bits[3], 16)
                  ];
              }
          }
      ];
      // search through the definitions to find a match
      for(var i1 = 0; i1 < color_defs.length; i1++){
          var re = color_defs[i1].re;
          var processor = color_defs[i1].process;
          var bits1 = re.exec(color_string);
          if (bits1) {
              var channels = processor(bits1);
              this.r = channels[0];
              this.g = channels[1];
              this.b = channels[2];
              if (channels.length > 3) {
                  this.alpha = channels[3];
              }
              this.ok = true;
          }
      }
      // validate/cleanup values
      this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r;
      this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g;
      this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b;
      this.alpha = this.alpha < 0 ? 0 : this.alpha > 1 || isNaN(this.alpha) ? 1 : this.alpha;
      // some getters
      this.toRGB = function() {
          return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
      };
      this.toRGBA = function() {
          return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.alpha + ')';
      };
      this.toHex = function() {
          var r = this.r.toString(16);
          var g = this.g.toString(16);
          var b = this.b.toString(16);
          if (r.length == 1) r = '0' + r;
          if (g.length == 1) g = '0' + g;
          if (b.length == 1) b = '0' + b;
          return '#' + r + g + b;
      };
      // help
      this.getHelpXML = function() {
          var examples = new Array();
          // add regexps
          for(var i = 0; i < color_defs.length; i++){
              var example = color_defs[i].example;
              for(var j = 0; j < example.length; j++){
                  examples[examples.length] = example[j];
              }
          }
          // add type-in colors
          for(var sc in simple_colors){
              examples[examples.length] = sc;
          }
          var xml = document.createElement('ul');
          xml.setAttribute('id', 'rgbcolor-examples');
          for(var i = 0; i < examples.length; i++){
              try {
                  var list_item = document.createElement('li');
                  var list_color = new RGBColor(examples[i]);
                  var example_div = document.createElement('div');
                  example_div.style.cssText = 'margin: 3px; ' + 'border: 1px solid black; ' + 'background:' + list_color.toHex() + '; ' + 'color:' + list_color.toHex();
                  example_div.appendChild(document.createTextNode('test'));
                  var list_item_value = document.createTextNode(' ' + examples[i] + ' -> ' + list_color.toRGB() + ' -> ' + list_color.toHex());
                  list_item.appendChild(example_div);
                  list_item.appendChild(list_item_value);
                  xml.appendChild(list_item);
              } catch (e) {}
          }
          return xml;
      };
  };

  class Property {
      static empty(document) {
          return new Property(document, 'EMPTY', '');
      }
      split() {
          let separator = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ' ';
          const { document , name  } = this;
          return compressSpaces(this.getString()).trim().split(separator).map((value)=>new Property(document, name, value)
          );
      }
      hasValue(zeroIsValue) {
          const value = this.value;
          return value !== null && value !== '' && (zeroIsValue || value !== 0) && typeof value !== 'undefined';
      }
      isString(regexp) {
          const { value  } = this;
          const result = typeof value === 'string';
          if (!result || !regexp) {
              return result;
          }
          return regexp.test(value);
      }
      isUrlDefinition() {
          return this.isString(/^url\(/);
      }
      isPixels() {
          if (!this.hasValue()) {
              return false;
          }
          const asString = this.getString();
          switch(true){
              case asString.endsWith('px'):
              case /^[0-9]+$/.test(asString):
                  return true;
              default:
                  return false;
          }
      }
      setValue(value) {
          this.value = value;
          return this;
      }
      getValue(def) {
          if (typeof def === 'undefined' || this.hasValue()) {
              return this.value;
          }
          return def;
      }
      getNumber(def) {
          if (!this.hasValue()) {
              if (typeof def === 'undefined') {
                  return 0;
              }
              // @ts-expect-error Parse unknown value.
              return parseFloat(def);
          }
          const { value  } = this;
          // @ts-expect-error Parse unknown value.
          let n = parseFloat(value);
          if (this.isString(/%$/)) {
              n /= 100;
          }
          return n;
      }
      getString(def) {
          if (typeof def === 'undefined' || this.hasValue()) {
              return typeof this.value === 'undefined' ? '' : String(this.value);
          }
          return String(def);
      }
      getColor(def) {
          let color = this.getString(def);
          if (this.isNormalizedColor) {
              return color;
          }
          this.isNormalizedColor = true;
          color = normalizeColor(color);
          this.value = color;
          return color;
      }
      getDpi() {
          return 96 // TODO: compute?
          ;
      }
      getRem() {
          return this.document.rootEmSize;
      }
      getEm() {
          return this.document.emSize;
      }
      getUnits() {
          return this.getString().replace(/[0-9.-]/g, '');
      }
      getPixels(axisOrIsFontSize) {
          let processPercent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          if (!this.hasValue()) {
              return 0;
          }
          const [axis, isFontSize] = typeof axisOrIsFontSize === 'boolean' ? [
              undefined,
              axisOrIsFontSize
          ] : [
              axisOrIsFontSize
          ];
          const { viewPort  } = this.document.screen;
          switch(true){
              case this.isString(/vmin$/):
                  return this.getNumber() / 100 * Math.min(viewPort.computeSize('x'), viewPort.computeSize('y'));
              case this.isString(/vmax$/):
                  return this.getNumber() / 100 * Math.max(viewPort.computeSize('x'), viewPort.computeSize('y'));
              case this.isString(/vw$/):
                  return this.getNumber() / 100 * viewPort.computeSize('x');
              case this.isString(/vh$/):
                  return this.getNumber() / 100 * viewPort.computeSize('y');
              case this.isString(/rem$/):
                  return this.getNumber() * this.getRem();
              case this.isString(/em$/):
                  return this.getNumber() * this.getEm();
              case this.isString(/ex$/):
                  return this.getNumber() * this.getEm() / 2;
              case this.isString(/px$/):
                  return this.getNumber();
              case this.isString(/pt$/):
                  return this.getNumber() * this.getDpi() * (1 / 72);
              case this.isString(/pc$/):
                  return this.getNumber() * 15;
              case this.isString(/cm$/):
                  return this.getNumber() * this.getDpi() / 2.54;
              case this.isString(/mm$/):
                  return this.getNumber() * this.getDpi() / 25.4;
              case this.isString(/in$/):
                  return this.getNumber() * this.getDpi();
              case this.isString(/%$/) && isFontSize:
                  return this.getNumber() * this.getEm();
              case this.isString(/%$/):
                  return this.getNumber() * viewPort.computeSize(axis);
              default:
                  {
                      const n = this.getNumber();
                      if (processPercent && n < 1) {
                          return n * viewPort.computeSize(axis);
                      }
                      return n;
                  }
          }
      }
      getMilliseconds() {
          if (!this.hasValue()) {
              return 0;
          }
          if (this.isString(/ms$/)) {
              return this.getNumber();
          }
          return this.getNumber() * 1000;
      }
      getRadians() {
          if (!this.hasValue()) {
              return 0;
          }
          switch(true){
              case this.isString(/deg$/):
                  return this.getNumber() * (Math.PI / 180);
              case this.isString(/grad$/):
                  return this.getNumber() * (Math.PI / 200);
              case this.isString(/rad$/):
                  return this.getNumber();
              default:
                  return this.getNumber() * (Math.PI / 180);
          }
      }
      getDefinition() {
          const asString = this.getString();
          const match = /#([^)'"]+)/.exec(asString);
          const name = (match === null || match === void 0 ? void 0 : match[1]) || asString;
          return this.document.definitions[name];
      }
      getFillStyleDefinition(element, opacity) {
          let def = this.getDefinition();
          if (!def) {
              return null;
          }
          // gradient
          if (typeof def.createGradient === 'function' && 'getBoundingBox' in element) {
              return def.createGradient(this.document.ctx, element, opacity);
          }
          // pattern
          if (typeof def.createPattern === 'function') {
              if (def.getHrefAttribute().hasValue()) {
                  const patternTransform = def.getAttribute('patternTransform');
                  def = def.getHrefAttribute().getDefinition();
                  if (def && patternTransform.hasValue()) {
                      def.getAttribute('patternTransform', true).setValue(patternTransform.value);
                  }
              }
              if (def) {
                  return def.createPattern(this.document.ctx, element, opacity);
              }
          }
          return null;
      }
      getTextBaseline() {
          if (!this.hasValue()) {
              return null;
          }
          const key = this.getString();
          return Property.textBaselineMapping[key] || null;
      }
      addOpacity(opacity) {
          let value = this.getColor();
          const len = value.length;
          let commas = 0;
          // Simulate old RGBColor version, which can't parse rgba.
          for(let i = 0; i < len; i++){
              if (value[i] === ',') {
                  commas++;
              }
              if (commas === 3) {
                  break;
              }
          }
          if (opacity.hasValue() && this.isString() && commas !== 3) {
              const color = new rgbcolor(value);
              if (color.ok) {
                  color.alpha = opacity.getNumber();
                  value = color.toRGBA();
              }
          }
          return new Property(this.document, this.name, value);
      }
      constructor(document, name, value){
          this.document = document;
          this.name = name;
          this.value = value;
          this.isNormalizedColor = false;
      }
  }
  Property.textBaselineMapping = {
      'baseline': 'alphabetic',
      'before-edge': 'top',
      'text-before-edge': 'top',
      'middle': 'middle',
      'central': 'middle',
      'after-edge': 'bottom',
      'text-after-edge': 'bottom',
      'ideographic': 'ideographic',
      'alphabetic': 'alphabetic',
      'hanging': 'hanging',
      'mathematical': 'alphabetic'
  };

  class ViewPort {
      clear() {
          this.viewPorts = [];
      }
      setCurrent(width, height) {
          this.viewPorts.push({
              width,
              height
          });
      }
      removeCurrent() {
          this.viewPorts.pop();
      }
      getRoot() {
          const [root] = this.viewPorts;
          if (!root) {
              return getDefault();
          }
          return root;
      }
      getCurrent() {
          const { viewPorts  } = this;
          const current = viewPorts[viewPorts.length - 1];
          if (!current) {
              return getDefault();
          }
          return current;
      }
      get width() {
          return this.getCurrent().width;
      }
      get height() {
          return this.getCurrent().height;
      }
      computeSize(d) {
          if (typeof d === 'number') {
              return d;
          }
          if (d === 'x') {
              return this.width;
          }
          if (d === 'y') {
              return this.height;
          }
          return Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) / Math.sqrt(2);
      }
      constructor(){
          this.viewPorts = [];
      }
  }
  ViewPort.DEFAULT_VIEWPORT_WIDTH = 800;
  ViewPort.DEFAULT_VIEWPORT_HEIGHT = 600;
  function getDefault() {
      return {
          width: ViewPort.DEFAULT_VIEWPORT_WIDTH,
          height: ViewPort.DEFAULT_VIEWPORT_HEIGHT
      };
  }

  class Point {
      static parse(point) {
          let defaultValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          const [x = defaultValue, y = defaultValue] = toNumbers(point);
          return new Point(x, y);
      }
      static parseScale(scale) {
          let defaultValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
          const [x = defaultValue, y = x] = toNumbers(scale);
          return new Point(x, y);
      }
      static parsePath(path) {
          const points = toNumbers(path);
          const len = points.length;
          const pathPoints = [];
          for(let i = 0; i < len; i += 2){
              pathPoints.push(new Point(points[i], points[i + 1]));
          }
          return pathPoints;
      }
      angleTo(point) {
          return Math.atan2(point.y - this.y, point.x - this.x);
      }
      applyTransform(transform) {
          const { x , y  } = this;
          const xp = x * transform[0] + y * transform[2] + transform[4];
          const yp = x * transform[1] + y * transform[3] + transform[5];
          this.x = xp;
          this.y = yp;
      }
      constructor(x, y){
          this.x = x;
          this.y = y;
      }
  }

  class Mouse {
      isWorking() {
          return this.working;
      }
      start() {
          if (this.working) {
              return;
          }
          const { screen , onClick , onMouseMove  } = this;
          const canvas = screen.ctx.canvas;
          canvas.onclick = onClick;
          canvas.onmousemove = onMouseMove;
          this.working = true;
      }
      stop() {
          if (!this.working) {
              return;
          }
          const canvas = this.screen.ctx.canvas;
          this.working = false;
          canvas.onclick = null;
          canvas.onmousemove = null;
      }
      hasEvents() {
          return this.working && this.events.length > 0;
      }
      runEvents() {
          if (!this.working) {
              return;
          }
          const { screen: document , events , eventElements  } = this;
          const { style  } = document.ctx.canvas;
          let element;
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (style) {
              style.cursor = '';
          }
          events.forEach((param, i)=>{
              let { run  } = param;
              element = eventElements[i];
              while(element){
                  run(element);
                  element = element.parent;
              }
          });
          // done running, clear
          this.events = [];
          this.eventElements = [];
      }
      checkPath(element, ctx) {
          if (!this.working || !ctx) {
              return;
          }
          const { events , eventElements  } = this;
          events.forEach((param, i)=>{
              let { x , y  } = param;
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
              if (!eventElements[i] && ctx.isPointInPath && ctx.isPointInPath(x, y)) {
                  eventElements[i] = element;
              }
          });
      }
      checkBoundingBox(element, boundingBox) {
          if (!this.working || !boundingBox) {
              return;
          }
          const { events , eventElements  } = this;
          events.forEach((param, i)=>{
              let { x , y  } = param;
              if (!eventElements[i] && boundingBox.isPointInBox(x, y)) {
                  eventElements[i] = element;
              }
          });
      }
      mapXY(x, y) {
          const { window , ctx  } = this.screen;
          const point = new Point(x, y);
          let element = ctx.canvas;
          while(element){
              point.x -= element.offsetLeft;
              point.y -= element.offsetTop;
              element = element.offsetParent;
          }
          if (window === null || window === void 0 ? void 0 : window.scrollX) {
              point.x += window.scrollX;
          }
          if (window === null || window === void 0 ? void 0 : window.scrollY) {
              point.y += window.scrollY;
          }
          return point;
      }
      onClick(event) {
          const { x , y  } = this.mapXY(event.clientX, event.clientY);
          this.events.push({
              type: 'onclick',
              x,
              y,
              run (eventTarget) {
                  if (eventTarget.onClick) {
                      eventTarget.onClick();
                  }
              }
          });
      }
      onMouseMove(event) {
          const { x , y  } = this.mapXY(event.clientX, event.clientY);
          this.events.push({
              type: 'onmousemove',
              x,
              y,
              run (eventTarget) {
                  if (eventTarget.onMouseMove) {
                      eventTarget.onMouseMove();
                  }
              }
          });
      }
      constructor(screen){
          this.screen = screen;
          this.working = false;
          this.events = [];
          this.eventElements = [];
          this.onClick = this.onClick.bind(this);
          this.onMouseMove = this.onMouseMove.bind(this);
      }
  }

  const defaultWindow = typeof window !== 'undefined' ? window : null;
  const defaultFetch$1 = typeof fetch !== 'undefined' ? fetch.bind(undefined) // `fetch` depends on context: `someObject.fetch(...)` will throw error.
   : undefined;
  class Screen {
      wait(checker) {
          this.waits.push(checker);
      }
      ready() {
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          if (!this.readyPromise) {
              return Promise.resolve();
          }
          return this.readyPromise;
      }
      isReady() {
          if (this.isReadyLock) {
              return true;
          }
          const isReadyLock = this.waits.every((_)=>_()
          );
          if (isReadyLock) {
              this.waits = [];
              if (this.resolveReady) {
                  this.resolveReady();
              }
          }
          this.isReadyLock = isReadyLock;
          return isReadyLock;
      }
      setDefaults(ctx) {
          // initial values and defaults
          ctx.strokeStyle = 'rgba(0,0,0,0)';
          ctx.lineCap = 'butt';
          ctx.lineJoin = 'miter';
          ctx.miterLimit = 4;
      }
      setViewBox(param) {
          let { document , ctx , aspectRatio , width , desiredWidth , height , desiredHeight , minX =0 , minY =0 , refX , refY , clip =false , clipX =0 , clipY =0  } = param;
          // aspect ratio - http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
          const cleanAspectRatio = compressSpaces(aspectRatio).replace(/^defer\s/, '') // ignore defer
          ;
          const [aspectRatioAlign, aspectRatioMeetOrSlice] = cleanAspectRatio.split(' ');
          const align = aspectRatioAlign || 'xMidYMid';
          const meetOrSlice = aspectRatioMeetOrSlice || 'meet';
          // calculate scale
          const scaleX = width / desiredWidth;
          const scaleY = height / desiredHeight;
          const scaleMin = Math.min(scaleX, scaleY);
          const scaleMax = Math.max(scaleX, scaleY);
          let finalDesiredWidth = desiredWidth;
          let finalDesiredHeight = desiredHeight;
          if (meetOrSlice === 'meet') {
              finalDesiredWidth *= scaleMin;
              finalDesiredHeight *= scaleMin;
          }
          if (meetOrSlice === 'slice') {
              finalDesiredWidth *= scaleMax;
              finalDesiredHeight *= scaleMax;
          }
          const refXProp = new Property(document, 'refX', refX);
          const refYProp = new Property(document, 'refY', refY);
          const hasRefs = refXProp.hasValue() && refYProp.hasValue();
          if (hasRefs) {
              ctx.translate(-scaleMin * refXProp.getPixels('x'), -scaleMin * refYProp.getPixels('y'));
          }
          if (clip) {
              const scaledClipX = scaleMin * clipX;
              const scaledClipY = scaleMin * clipY;
              ctx.beginPath();
              ctx.moveTo(scaledClipX, scaledClipY);
              ctx.lineTo(width, scaledClipY);
              ctx.lineTo(width, height);
              ctx.lineTo(scaledClipX, height);
              ctx.closePath();
              ctx.clip();
          }
          if (!hasRefs) {
              const isMeetMinY = meetOrSlice === 'meet' && scaleMin === scaleY;
              const isSliceMaxY = meetOrSlice === 'slice' && scaleMax === scaleY;
              const isMeetMinX = meetOrSlice === 'meet' && scaleMin === scaleX;
              const isSliceMaxX = meetOrSlice === 'slice' && scaleMax === scaleX;
              if (align.startsWith('xMid') && (isMeetMinY || isSliceMaxY)) {
                  ctx.translate(width / 2 - finalDesiredWidth / 2, 0);
              }
              if (align.endsWith('YMid') && (isMeetMinX || isSliceMaxX)) {
                  ctx.translate(0, height / 2 - finalDesiredHeight / 2);
              }
              if (align.startsWith('xMax') && (isMeetMinY || isSliceMaxY)) {
                  ctx.translate(width - finalDesiredWidth, 0);
              }
              if (align.endsWith('YMax') && (isMeetMinX || isSliceMaxX)) {
                  ctx.translate(0, height - finalDesiredHeight);
              }
          }
          // scale
          switch(true){
              case align === 'none':
                  ctx.scale(scaleX, scaleY);
                  break;
              case meetOrSlice === 'meet':
                  ctx.scale(scaleMin, scaleMin);
                  break;
              case meetOrSlice === 'slice':
                  ctx.scale(scaleMax, scaleMax);
                  break;
          }
          // translate
          ctx.translate(-minX, -minY);
      }
      start(element) {
          let { enableRedraw =false , ignoreMouse =false , ignoreAnimation =false , ignoreDimensions =false , ignoreClear =false , forceRedraw , scaleWidth , scaleHeight , offsetX , offsetY  } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          const { mouse  } = this;
          const frameDuration = 1000 / Screen.FRAMERATE;
          this.isReadyLock = false;
          this.frameDuration = frameDuration;
          this.readyPromise = new Promise((resolve)=>{
              this.resolveReady = resolve;
          });
          if (this.isReady()) {
              this.render(element, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY);
          }
          if (!enableRedraw) {
              return;
          }
          let now = Date.now();
          let then = now;
          let delta = 0;
          const tick = ()=>{
              now = Date.now();
              delta = now - then;
              if (delta >= frameDuration) {
                  then = now - delta % frameDuration;
                  if (this.shouldUpdate(ignoreAnimation, forceRedraw)) {
                      this.render(element, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY);
                      mouse.runEvents();
                  }
              }
              this.intervalId = requestAnimationFrame(tick);
          };
          if (!ignoreMouse) {
              mouse.start();
          }
          this.intervalId = requestAnimationFrame(tick);
      }
      stop() {
          if (this.intervalId) {
              requestAnimationFrame.cancel(this.intervalId);
              this.intervalId = null;
          }
          this.mouse.stop();
      }
      shouldUpdate(ignoreAnimation, forceRedraw) {
          // need update from animations?
          if (!ignoreAnimation) {
              const { frameDuration  } = this;
              const shouldUpdate1 = this.animations.reduce((shouldUpdate, animation)=>animation.update(frameDuration) || shouldUpdate
              , false);
              if (shouldUpdate1) {
                  return true;
              }
          }
          // need update from redraw?
          if (typeof forceRedraw === 'function' && forceRedraw()) {
              return true;
          }
          if (!this.isReadyLock && this.isReady()) {
              return true;
          }
          // need update from mouse events?
          if (this.mouse.hasEvents()) {
              return true;
          }
          return false;
      }
      render(element, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY) {
          const { viewPort , ctx , isFirstRender  } = this;
          const canvas = ctx.canvas;
          viewPort.clear();
          if (canvas.width && canvas.height) {
              viewPort.setCurrent(canvas.width, canvas.height);
          }
          const widthStyle = element.getStyle('width');
          const heightStyle = element.getStyle('height');
          if (!ignoreDimensions && (isFirstRender || typeof scaleWidth !== 'number' && typeof scaleHeight !== 'number')) {
              // set canvas size
              if (widthStyle.hasValue()) {
                  canvas.width = widthStyle.getPixels('x');
                  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                  if (canvas.style) {
                      canvas.style.width = "".concat(canvas.width, "px");
                  }
              }
              if (heightStyle.hasValue()) {
                  canvas.height = heightStyle.getPixels('y');
                  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                  if (canvas.style) {
                      canvas.style.height = "".concat(canvas.height, "px");
                  }
              }
          }
          let cWidth = canvas.clientWidth || canvas.width;
          let cHeight = canvas.clientHeight || canvas.height;
          if (ignoreDimensions && widthStyle.hasValue() && heightStyle.hasValue()) {
              cWidth = widthStyle.getPixels('x');
              cHeight = heightStyle.getPixels('y');
          }
          viewPort.setCurrent(cWidth, cHeight);
          if (typeof offsetX === 'number') {
              element.getAttribute('x', true).setValue(offsetX);
          }
          if (typeof offsetY === 'number') {
              element.getAttribute('y', true).setValue(offsetY);
          }
          if (typeof scaleWidth === 'number' || typeof scaleHeight === 'number') {
              const viewBox = toNumbers(element.getAttribute('viewBox').getString());
              let xRatio = 0;
              let yRatio = 0;
              if (typeof scaleWidth === 'number') {
                  const widthStyle = element.getStyle('width');
                  if (widthStyle.hasValue()) {
                      xRatio = widthStyle.getPixels('x') / scaleWidth;
                  } else if (viewBox[2] && !isNaN(viewBox[2])) {
                      xRatio = viewBox[2] / scaleWidth;
                  }
              }
              if (typeof scaleHeight === 'number') {
                  const heightStyle = element.getStyle('height');
                  if (heightStyle.hasValue()) {
                      yRatio = heightStyle.getPixels('y') / scaleHeight;
                  } else if (viewBox[3] && !isNaN(viewBox[3])) {
                      yRatio = viewBox[3] / scaleHeight;
                  }
              }
              if (!xRatio) {
                  xRatio = yRatio;
              }
              if (!yRatio) {
                  yRatio = xRatio;
              }
              element.getAttribute('width', true).setValue(scaleWidth);
              element.getAttribute('height', true).setValue(scaleHeight);
              const transformStyle = element.getStyle('transform', true, true);
              transformStyle.setValue("".concat(transformStyle.getString(), " scale(").concat(1 / xRatio, ", ").concat(1 / yRatio, ")"));
          }
          // clear and render
          if (!ignoreClear) {
              ctx.clearRect(0, 0, cWidth, cHeight);
          }
          element.render(ctx);
          if (isFirstRender) {
              this.isFirstRender = false;
          }
      }
      constructor(ctx, { fetch =defaultFetch$1 , window =defaultWindow  } = {}){
          this.ctx = ctx;
          this.viewPort = new ViewPort();
          this.mouse = new Mouse(this);
          this.animations = [];
          this.waits = [];
          this.frameDuration = 0;
          this.isReadyLock = false;
          this.isFirstRender = true;
          this.intervalId = null;
          this.window = window;
          if (!fetch) {
              throw new Error("Can't find 'fetch' in 'globalThis', please provide it via options");
          }
          this.fetch = fetch;
      }
  }
  Screen.defaultWindow = defaultWindow;
  Screen.defaultFetch = defaultFetch$1;
  Screen.FRAMERATE = 30;
  Screen.MAX_VIRTUAL_PIXELS = 30000;

  const { defaultFetch  } = Screen;
  const DefaultDOMParser = typeof DOMParser !== 'undefined' ? DOMParser : undefined;
  class Parser {
      async parse(resource) {
          if (resource.startsWith('<')) {
              return this.parseFromString(resource);
          }
          return this.load(resource);
      }
      parseFromString(xml) {
          const parser = new this.DOMParser();
          try {
              return this.checkDocument(parser.parseFromString(xml, 'image/svg+xml'));
          } catch (err) {
              return this.checkDocument(parser.parseFromString(xml, 'text/xml'));
          }
      }
      checkDocument(document) {
          const parserError = document.getElementsByTagName('parsererror')[0];
          if (parserError) {
              throw new Error(parserError.textContent || 'Unknown parse error');
          }
          return document;
      }
      async load(url) {
          const response = await this.fetch(url);
          const xml = await response.text();
          return this.parseFromString(xml);
      }
      constructor({ fetch =defaultFetch , DOMParser =DefaultDOMParser  } = {}){
          if (!fetch) {
              throw new Error("Can't find 'fetch' in 'globalThis', please provide it via options");
          }
          if (!DOMParser) {
              throw new Error("Can't find 'DOMParser' in 'globalThis', please provide it via options");
          }
          this.fetch = fetch;
          this.DOMParser = DOMParser;
      }
  }

  class Translate {
      apply(ctx) {
          const { x , y  } = this.point;
          ctx.translate(x || 0, y || 0);
      }
      unapply(ctx) {
          const { x , y  } = this.point;
          ctx.translate(-1 * x || 0, -1 * y || 0);
      }
      applyToPoint(point) {
          const { x , y  } = this.point;
          point.applyTransform([
              1,
              0,
              0,
              1,
              x || 0,
              y || 0
          ]);
      }
      constructor(_, point){
          this.type = 'translate';
          this.point = Point.parse(point);
      }
  }

  class Rotate {
      apply(ctx) {
          const { cx , cy , originX , originY , angle  } = this;
          const tx = cx + originX.getPixels('x');
          const ty = cy + originY.getPixels('y');
          ctx.translate(tx, ty);
          ctx.rotate(angle.getRadians());
          ctx.translate(-tx, -ty);
      }
      unapply(ctx) {
          const { cx , cy , originX , originY , angle  } = this;
          const tx = cx + originX.getPixels('x');
          const ty = cy + originY.getPixels('y');
          ctx.translate(tx, ty);
          ctx.rotate(-1 * angle.getRadians());
          ctx.translate(-tx, -ty);
      }
      applyToPoint(point) {
          const { cx , cy , angle  } = this;
          const rad = angle.getRadians();
          point.applyTransform([
              1,
              0,
              0,
              1,
              cx || 0,
              cy || 0 // this.p.y
          ]);
          point.applyTransform([
              Math.cos(rad),
              Math.sin(rad),
              -Math.sin(rad),
              Math.cos(rad),
              0,
              0
          ]);
          point.applyTransform([
              1,
              0,
              0,
              1,
              -cx || 0,
              -cy || 0 // -this.p.y
          ]);
      }
      constructor(document, rotate, transformOrigin){
          this.type = 'rotate';
          const numbers = toNumbers(rotate);
          this.angle = new Property(document, 'angle', numbers[0]);
          this.originX = transformOrigin[0];
          this.originY = transformOrigin[1];
          this.cx = numbers[1] || 0;
          this.cy = numbers[2] || 0;
      }
  }

  class Scale {
      apply(ctx) {
          const { scale: { x , y  } , originX , originY  } = this;
          const tx = originX.getPixels('x');
          const ty = originY.getPixels('y');
          ctx.translate(tx, ty);
          ctx.scale(x, y || x);
          ctx.translate(-tx, -ty);
      }
      unapply(ctx) {
          const { scale: { x , y  } , originX , originY  } = this;
          const tx = originX.getPixels('x');
          const ty = originY.getPixels('y');
          ctx.translate(tx, ty);
          ctx.scale(1 / x, 1 / y || x);
          ctx.translate(-tx, -ty);
      }
      applyToPoint(point) {
          const { x , y  } = this.scale;
          point.applyTransform([
              x || 0,
              0,
              0,
              y || 0,
              0,
              0
          ]);
      }
      constructor(_, scale, transformOrigin){
          this.type = 'scale';
          const scaleSize = Point.parseScale(scale);
          // Workaround for node-canvas
          if (scaleSize.x === 0 || scaleSize.y === 0) {
              scaleSize.x = PSEUDO_ZERO;
              scaleSize.y = PSEUDO_ZERO;
          }
          this.scale = scaleSize;
          this.originX = transformOrigin[0];
          this.originY = transformOrigin[1];
      }
  }

  class Matrix {
      apply(ctx) {
          const { originX , originY , matrix  } = this;
          const tx = originX.getPixels('x');
          const ty = originY.getPixels('y');
          ctx.translate(tx, ty);
          ctx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
          ctx.translate(-tx, -ty);
      }
      unapply(ctx) {
          const { originX , originY , matrix  } = this;
          const a = matrix[0];
          const b = matrix[2];
          const c = matrix[4];
          const d = matrix[1];
          const e = matrix[3];
          const f = matrix[5];
          const g = 0;
          const h = 0;
          const i = 1;
          const det = 1 / (a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g));
          const tx = originX.getPixels('x');
          const ty = originY.getPixels('y');
          ctx.translate(tx, ty);
          ctx.transform(det * (e * i - f * h), det * (f * g - d * i), det * (c * h - b * i), det * (a * i - c * g), det * (b * f - c * e), det * (c * d - a * f));
          ctx.translate(-tx, -ty);
      }
      applyToPoint(point) {
          point.applyTransform(this.matrix);
      }
      constructor(_, matrix, transformOrigin){
          this.type = 'matrix';
          this.matrix = toMatrixValue(matrix);
          this.originX = transformOrigin[0];
          this.originY = transformOrigin[1];
      }
  }

  class Skew extends Matrix {
      constructor(document, skew, transformOrigin){
          super(document, skew, transformOrigin);
          this.type = 'skew';
          this.angle = new Property(document, 'angle', skew);
      }
  }

  class SkewX extends Skew {
      constructor(document, skew, transformOrigin){
          super(document, skew, transformOrigin);
          this.type = 'skewX';
          this.matrix = [
              1,
              0,
              Math.tan(this.angle.getRadians()),
              1,
              0,
              0
          ];
      }
  }

  class SkewY extends Skew {
      constructor(document, skew, transformOrigin){
          super(document, skew, transformOrigin);
          this.type = 'skewY';
          this.matrix = [
              1,
              Math.tan(this.angle.getRadians()),
              0,
              1,
              0,
              0
          ];
      }
  }

  function parseTransforms(transform) {
      return compressSpaces(transform).trim().replace(/\)([a-zA-Z])/g, ') $1').replace(/\)(\s?,\s?)/g, ') ').split(/\s(?=[a-z])/);
  }
  function parseTransform(transform) {
      const [type = '', value = ''] = transform.split('(');
      return [
          type.trim(),
          value.trim().replace(')', '')
      ];
  }
  class Transform {
      static fromElement(document, element) {
          const transformStyle = element.getStyle('transform', false, true);
          if (transformStyle.hasValue()) {
              const [transformOriginXProperty, transformOriginYProperty = transformOriginXProperty] = element.getStyle('transform-origin', false, true).split();
              if (transformOriginXProperty && transformOriginYProperty) {
                  const transformOrigin = [
                      transformOriginXProperty,
                      transformOriginYProperty
                  ];
                  return new Transform(document, transformStyle.getString(), transformOrigin);
              }
          }
          return null;
      }
      apply(ctx) {
          this.transforms.forEach((transform)=>transform.apply(ctx)
          );
      }
      unapply(ctx) {
          this.transforms.forEach((transform)=>transform.unapply(ctx)
          );
      }
      // TODO: applyToPoint unused ... remove?
      applyToPoint(point) {
          this.transforms.forEach((transform)=>transform.applyToPoint(point)
          );
      }
      constructor(document, transform1, transformOrigin){
          this.document = document;
          this.transforms = [];
          const data = parseTransforms(transform1);
          data.forEach((transform)=>{
              if (transform === 'none') {
                  return;
              }
              const [type, value] = parseTransform(transform);
              const TransformType = Transform.transformTypes[type];
              if (TransformType) {
                  this.transforms.push(new TransformType(this.document, value, transformOrigin));
              }
          });
      }
  }
  Transform.transformTypes = {
      translate: Translate,
      rotate: Rotate,
      scale: Scale,
      matrix: Matrix,
      skewX: SkewX,
      skewY: SkewY
  };

  class Element {
      getAttribute(name) {
          let createIfNotExists = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          const attr = this.attributes[name];
          if (!attr && createIfNotExists) {
              const attr = new Property(this.document, name, '');
              this.attributes[name] = attr;
              return attr;
          }
          return attr || Property.empty(this.document);
      }
      getHrefAttribute() {
          let href;
          for(const key in this.attributes){
              if (key === 'href' || key.endsWith(':href')) {
                  href = this.attributes[key];
                  break;
              }
          }
          return href || Property.empty(this.document);
      }
      getStyle(name) {
          let createIfNotExists = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false, skipAncestors = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
          const style = this.styles[name];
          if (style) {
              return style;
          }
          const attr = this.getAttribute(name);
          if (attr.hasValue()) {
              this.styles[name] = attr // move up to me to cache
              ;
              return attr;
          }
          if (!skipAncestors) {
              const { parent  } = this;
              if (parent) {
                  const parentStyle = parent.getStyle(name);
                  if (parentStyle.hasValue()) {
                      return parentStyle;
                  }
              }
          }
          if (createIfNotExists) {
              const style = new Property(this.document, name, '');
              this.styles[name] = style;
              return style;
          }
          return Property.empty(this.document);
      }
      render(ctx) {
          // don't render display=none
          // don't render visibility=hidden
          if (this.getStyle('display').getString() === 'none' || this.getStyle('visibility').getString() === 'hidden') {
              return;
          }
          ctx.save();
          if (this.getStyle('mask').hasValue()) {
              const mask = this.getStyle('mask').getDefinition();
              if (mask) {
                  this.applyEffects(ctx);
                  mask.apply(ctx, this);
              }
          } else if (this.getStyle('filter').getValue('none') !== 'none') {
              const filter = this.getStyle('filter').getDefinition();
              if (filter) {
                  this.applyEffects(ctx);
                  filter.apply(ctx, this);
              }
          } else {
              this.setContext(ctx);
              this.renderChildren(ctx);
              this.clearContext(ctx);
          }
          ctx.restore();
      }
      setContext(_) {
      // NO RENDER
      }
      applyEffects(ctx) {
          // transform
          const transform = Transform.fromElement(this.document, this);
          if (transform) {
              transform.apply(ctx);
          }
          // clip
          const clipPathStyleProp = this.getStyle('clip-path', false, true);
          if (clipPathStyleProp.hasValue()) {
              const clip = clipPathStyleProp.getDefinition();
              if (clip) {
                  clip.apply(ctx);
              }
          }
      }
      clearContext(_) {
      // NO RENDER
      }
      renderChildren(ctx) {
          this.children.forEach((child)=>{
              child.render(ctx);
          });
      }
      addChild(childNode) {
          const child = childNode instanceof Element ? childNode : this.document.createElement(childNode);
          child.parent = this;
          if (!Element.ignoreChildTypes.includes(child.type)) {
              this.children.push(child);
          }
      }
      matchesSelector(selector) {
          var ref;
          const { node  } = this;
          if (typeof node.matches === 'function') {
              return node.matches(selector);
          }
          const styleClasses = (ref = node.getAttribute) === null || ref === void 0 ? void 0 : ref.call(node, 'class');
          if (!styleClasses || styleClasses === '') {
              return false;
          }
          return styleClasses.split(' ').some((styleClass)=>".".concat(styleClass) === selector
          );
      }
      addStylesFromStyleDefinition() {
          const { styles , stylesSpecificity  } = this.document;
          let styleProp;
          for(const selector in styles){
              if (!selector.startsWith('@') && this.matchesSelector(selector)) {
                  const style = styles[selector];
                  const specificity = stylesSpecificity[selector];
                  if (style) {
                      for(const name in style){
                          let existingSpecificity = this.stylesSpecificity[name];
                          if (typeof existingSpecificity === 'undefined') {
                              existingSpecificity = '000';
                          }
                          if (specificity && specificity >= existingSpecificity) {
                              styleProp = style[name];
                              if (styleProp) {
                                  this.styles[name] = styleProp;
                              }
                              this.stylesSpecificity[name] = specificity;
                          }
                      }
                  }
              }
          }
      }
      removeStyles(element, ignoreStyles) {
          const toRestore1 = ignoreStyles.reduce((toRestore, name)=>{
              const styleProp = element.getStyle(name);
              if (!styleProp.hasValue()) {
                  return toRestore;
              }
              const value = styleProp.getString();
              styleProp.setValue('');
              return [
                  ...toRestore,
                  [
                      name,
                      value
                  ]
              ];
          }, []);
          return toRestore1;
      }
      restoreStyles(element, styles) {
          styles.forEach((param)=>{
              let [name, value] = param;
              element.getStyle(name, true).setValue(value);
          });
      }
      isFirstChild() {
          var ref;
          return ((ref = this.parent) === null || ref === void 0 ? void 0 : ref.children.indexOf(this)) === 0;
      }
      constructor(document, node, captureTextNodes = false){
          this.document = document;
          this.node = node;
          this.captureTextNodes = captureTextNodes;
          this.type = '';
          this.attributes = {};
          this.styles = {};
          this.stylesSpecificity = {};
          this.animationFrozen = false;
          this.animationFrozenValue = '';
          this.parent = null;
          this.children = [];
          if (!node || node.nodeType !== 1) {
              return;
          }
          // add attributes
          Array.from(node.attributes).forEach((attribute)=>{
              const nodeName = normalizeAttributeName(attribute.nodeName);
              this.attributes[nodeName] = new Property(document, nodeName, attribute.value);
          });
          this.addStylesFromStyleDefinition();
          // add inline styles
          if (this.getAttribute('style').hasValue()) {
              const styles = this.getAttribute('style').getString().split(';').map((_)=>_.trim()
              );
              styles.forEach((style)=>{
                  if (!style) {
                      return;
                  }
                  const [name, value] = style.split(':').map((_)=>_.trim()
                  );
                  if (name) {
                      this.styles[name] = new Property(document, name, value);
                  }
              });
          }
          const { definitions  } = document;
          const id = this.getAttribute('id');
          // add id
          if (id.hasValue()) {
              if (!definitions[id.getString()]) {
                  definitions[id.getString()] = this;
              }
          }
          Array.from(node.childNodes).forEach((childNode)=>{
              if (childNode.nodeType === 1) {
                  this.addChild(childNode) // ELEMENT_NODE
                  ;
              } else if (captureTextNodes && (childNode.nodeType === 3 || childNode.nodeType === 4)) {
                  const textNode = document.createTextNode(childNode);
                  if (textNode.getText().length > 0) {
                      this.addChild(textNode) // TEXT_NODE
                      ;
                  }
              }
          });
      }
  }
  Element.ignoreChildTypes = [
      'title'
  ];

  class UnknownElement extends Element {
      constructor(document, node, captureTextNodes){
          super(document, node, captureTextNodes);
      }
  }

  function wrapFontFamily(fontFamily) {
      const trimmed = fontFamily.trim();
      return /^('|")/.test(trimmed) ? trimmed : "\"".concat(trimmed, "\"");
  }
  function prepareFontFamily(fontFamily) {
      return typeof process === 'undefined' ? fontFamily : fontFamily.trim().split(',').map(wrapFontFamily).join(',');
  }
  /**
   * https://developer.mozilla.org/en-US/docs/Web/CSS/font-style
   * @param fontStyle
   * @returns CSS font style.
   */ function prepareFontStyle(fontStyle) {
      if (!fontStyle) {
          return '';
      }
      const targetFontStyle = fontStyle.trim().toLowerCase();
      switch(targetFontStyle){
          case 'normal':
          case 'italic':
          case 'oblique':
          case 'inherit':
          case 'initial':
          case 'unset':
              return targetFontStyle;
          default:
              if (/^oblique\s+(-|)\d+deg$/.test(targetFontStyle)) {
                  return targetFontStyle;
              }
              return '';
      }
  }
  /**
   * https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
   * @param fontWeight
   * @returns CSS font weight.
   */ function prepareFontWeight(fontWeight) {
      if (!fontWeight) {
          return '';
      }
      const targetFontWeight = fontWeight.trim().toLowerCase();
      switch(targetFontWeight){
          case 'normal':
          case 'bold':
          case 'lighter':
          case 'bolder':
          case 'inherit':
          case 'initial':
          case 'unset':
              return targetFontWeight;
          default:
              if (/^[\d.]+$/.test(targetFontWeight)) {
                  return targetFontWeight;
              }
              return '';
      }
  }
  class Font {
      static parse() {
          let font = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '', inherit = arguments.length > 1 ? arguments[1] : void 0;
          let fontStyle = '';
          let fontVariant = '';
          let fontWeight = '';
          let fontSize = '';
          let fontFamily = '';
          const parts = compressSpaces(font).trim().split(' ');
          const set = {
              fontSize: false,
              fontStyle: false,
              fontWeight: false,
              fontVariant: false
          };
          parts.forEach((part)=>{
              switch(true){
                  case !set.fontStyle && Font.styles.includes(part):
                      if (part !== 'inherit') {
                          fontStyle = part;
                      }
                      set.fontStyle = true;
                      break;
                  case !set.fontVariant && Font.variants.includes(part):
                      if (part !== 'inherit') {
                          fontVariant = part;
                      }
                      set.fontStyle = true;
                      set.fontVariant = true;
                      break;
                  case !set.fontWeight && Font.weights.includes(part):
                      if (part !== 'inherit') {
                          fontWeight = part;
                      }
                      set.fontStyle = true;
                      set.fontVariant = true;
                      set.fontWeight = true;
                      break;
                  case !set.fontSize:
                      if (part !== 'inherit') {
                          fontSize = part.split('/')[0] || '';
                      }
                      set.fontStyle = true;
                      set.fontVariant = true;
                      set.fontWeight = true;
                      set.fontSize = true;
                      break;
                  default:
                      if (part !== 'inherit') {
                          fontFamily += part;
                      }
              }
          });
          return new Font(fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit);
      }
      toString() {
          return [
              prepareFontStyle(this.fontStyle),
              this.fontVariant,
              prepareFontWeight(this.fontWeight),
              this.fontSize,
              // Wrap fontFamily only on nodejs and only for canvas.ctx
              prepareFontFamily(this.fontFamily)
          ].join(' ').trim();
      }
      constructor(fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit){
          const inheritFont = inherit ? typeof inherit === 'string' ? Font.parse(inherit) : inherit : {};
          this.fontFamily = fontFamily || inheritFont.fontFamily;
          this.fontSize = fontSize || inheritFont.fontSize;
          this.fontStyle = fontStyle || inheritFont.fontStyle;
          this.fontWeight = fontWeight || inheritFont.fontWeight;
          this.fontVariant = fontVariant || inheritFont.fontVariant;
      }
  }
  Font.styles = 'normal|italic|oblique|inherit';
  Font.variants = 'normal|small-caps|inherit';
  Font.weights = 'normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit';

  class BoundingBox {
      get x() {
          return this.x1;
      }
      get y() {
          return this.y1;
      }
      get width() {
          return this.x2 - this.x1;
      }
      get height() {
          return this.y2 - this.y1;
      }
      addPoint(x, y) {
          if (typeof x !== 'undefined') {
              if (isNaN(this.x1) || isNaN(this.x2)) {
                  this.x1 = x;
                  this.x2 = x;
              }
              if (x < this.x1) {
                  this.x1 = x;
              }
              if (x > this.x2) {
                  this.x2 = x;
              }
          }
          if (typeof y !== 'undefined') {
              if (isNaN(this.y1) || isNaN(this.y2)) {
                  this.y1 = y;
                  this.y2 = y;
              }
              if (y < this.y1) {
                  this.y1 = y;
              }
              if (y > this.y2) {
                  this.y2 = y;
              }
          }
      }
      addX(x) {
          this.addPoint(x, 0);
      }
      addY(y) {
          this.addPoint(0, y);
      }
      addBoundingBox(boundingBox) {
          if (!boundingBox) {
              return;
          }
          const { x1 , y1 , x2 , y2  } = boundingBox;
          this.addPoint(x1, y1);
          this.addPoint(x2, y2);
      }
      sumCubic(t, p0, p1, p2, p3) {
          return Math.pow(1 - t, 3) * p0 + 3 * Math.pow(1 - t, 2) * t * p1 + 3 * (1 - t) * Math.pow(t, 2) * p2 + Math.pow(t, 3) * p3;
      }
      bezierCurveAdd(forX, p0, p1, p2, p3) {
          const b = 6 * p0 - 12 * p1 + 6 * p2;
          const a = -3 * p0 + 9 * p1 - 9 * p2 + 3 * p3;
          const c = 3 * p1 - 3 * p0;
          if (a === 0) {
              if (b === 0) {
                  return;
              }
              const t = -c / b;
              if (0 < t && t < 1) {
                  if (forX) {
                      this.addX(this.sumCubic(t, p0, p1, p2, p3));
                  } else {
                      this.addY(this.sumCubic(t, p0, p1, p2, p3));
                  }
              }
              return;
          }
          const b2ac = Math.pow(b, 2) - 4 * c * a;
          if (b2ac < 0) {
              return;
          }
          const t1 = (-b + Math.sqrt(b2ac)) / (2 * a);
          if (0 < t1 && t1 < 1) {
              if (forX) {
                  this.addX(this.sumCubic(t1, p0, p1, p2, p3));
              } else {
                  this.addY(this.sumCubic(t1, p0, p1, p2, p3));
              }
          }
          const t2 = (-b - Math.sqrt(b2ac)) / (2 * a);
          if (0 < t2 && t2 < 1) {
              if (forX) {
                  this.addX(this.sumCubic(t2, p0, p1, p2, p3));
              } else {
                  this.addY(this.sumCubic(t2, p0, p1, p2, p3));
              }
          }
      }
      // from http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
      addBezierCurve(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {
          this.addPoint(p0x, p0y);
          this.addPoint(p3x, p3y);
          this.bezierCurveAdd(true, p0x, p1x, p2x, p3x);
          this.bezierCurveAdd(false, p0y, p1y, p2y, p3y);
      }
      addQuadraticCurve(p0x, p0y, p1x, p1y, p2x, p2y) {
          const cp1x = p0x + 2 / 3 * (p1x - p0x) // CP1 = QP0 + 2/3 *(QP1-QP0)
          ;
          const cp1y = p0y + 2 / 3 * (p1y - p0y) // CP1 = QP0 + 2/3 *(QP1-QP0)
          ;
          const cp2x = cp1x + 1 / 3 * (p2x - p0x) // CP2 = CP1 + 1/3 *(QP2-QP0)
          ;
          const cp2y = cp1y + 1 / 3 * (p2y - p0y) // CP2 = CP1 + 1/3 *(QP2-QP0)
          ;
          this.addBezierCurve(p0x, p0y, cp1x, cp2x, cp1y, cp2y, p2x, p2y);
      }
      isPointInBox(x, y) {
          const { x1 , y1 , x2 , y2  } = this;
          return x1 <= x && x <= x2 && y1 <= y && y <= y2;
      }
      constructor(x1 = Number.NaN, y1 = Number.NaN, x2 = Number.NaN, y2 = Number.NaN){
          this.x1 = x1;
          this.y1 = y1;
          this.x2 = x2;
          this.y2 = y2;
          this.addPoint(x1, y1);
          this.addPoint(x2, y2);
      }
  }

  class RenderedElement extends Element {
      calculateOpacity() {
          let opacity = 1;
          // eslint-disable-next-line @typescript-eslint/no-this-alias, consistent-this
          let element = this;
          while(element){
              const opacityStyle = element.getStyle('opacity', false, true) // no ancestors on style call
              ;
              if (opacityStyle.hasValue(true)) {
                  opacity *= opacityStyle.getNumber();
              }
              element = element.parent;
          }
          return opacity;
      }
      setContext(ctx) {
          let fromMeasure = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          if (!fromMeasure) {
              // fill
              const fillStyleProp = this.getStyle('fill');
              const fillOpacityStyleProp = this.getStyle('fill-opacity');
              const strokeStyleProp = this.getStyle('stroke');
              const strokeOpacityProp = this.getStyle('stroke-opacity');
              if (fillStyleProp.isUrlDefinition()) {
                  const fillStyle = fillStyleProp.getFillStyleDefinition(this, fillOpacityStyleProp);
                  if (fillStyle) {
                      ctx.fillStyle = fillStyle;
                  }
              } else if (fillStyleProp.hasValue()) {
                  if (fillStyleProp.getString() === 'currentColor') {
                      fillStyleProp.setValue(this.getStyle('color').getColor());
                  }
                  const fillStyle = fillStyleProp.getColor();
                  if (fillStyle !== 'inherit') {
                      ctx.fillStyle = fillStyle === 'none' ? 'rgba(0,0,0,0)' : fillStyle;
                  }
              }
              if (fillOpacityStyleProp.hasValue()) {
                  const fillStyle = new Property(this.document, 'fill', ctx.fillStyle).addOpacity(fillOpacityStyleProp).getColor();
                  ctx.fillStyle = fillStyle;
              }
              // stroke
              if (strokeStyleProp.isUrlDefinition()) {
                  const strokeStyle = strokeStyleProp.getFillStyleDefinition(this, strokeOpacityProp);
                  if (strokeStyle) {
                      ctx.strokeStyle = strokeStyle;
                  }
              } else if (strokeStyleProp.hasValue()) {
                  if (strokeStyleProp.getString() === 'currentColor') {
                      strokeStyleProp.setValue(this.getStyle('color').getColor());
                  }
                  const strokeStyle = strokeStyleProp.getString();
                  if (strokeStyle !== 'inherit') {
                      ctx.strokeStyle = strokeStyle === 'none' ? 'rgba(0,0,0,0)' : strokeStyle;
                  }
              }
              if (strokeOpacityProp.hasValue()) {
                  const strokeStyle = new Property(this.document, 'stroke', ctx.strokeStyle).addOpacity(strokeOpacityProp).getString();
                  ctx.strokeStyle = strokeStyle;
              }
              const strokeWidthStyleProp = this.getStyle('stroke-width');
              if (strokeWidthStyleProp.hasValue()) {
                  const newLineWidth = strokeWidthStyleProp.getPixels();
                  ctx.lineWidth = !newLineWidth ? PSEUDO_ZERO // browsers don't respect 0 (or node-canvas? :-)
                   : newLineWidth;
              }
              const strokeLinecapStyleProp = this.getStyle('stroke-linecap');
              const strokeLinejoinStyleProp = this.getStyle('stroke-linejoin');
              const strokeMiterlimitProp = this.getStyle('stroke-miterlimit');
              // NEED TEST
              // const pointOrderStyleProp = this.getStyle('paint-order');
              const strokeDasharrayStyleProp = this.getStyle('stroke-dasharray');
              const strokeDashoffsetProp = this.getStyle('stroke-dashoffset');
              if (strokeLinecapStyleProp.hasValue()) {
                  ctx.lineCap = strokeLinecapStyleProp.getString();
              }
              if (strokeLinejoinStyleProp.hasValue()) {
                  ctx.lineJoin = strokeLinejoinStyleProp.getString();
              }
              if (strokeMiterlimitProp.hasValue()) {
                  ctx.miterLimit = strokeMiterlimitProp.getNumber();
              }
              // NEED TEST
              // if (pointOrderStyleProp.hasValue()) {
              //   // ?
              //   ctx.paintOrder = pointOrderStyleProp.getValue();
              // }
              if (strokeDasharrayStyleProp.hasValue() && strokeDasharrayStyleProp.getString() !== 'none') {
                  const gaps = toNumbers(strokeDasharrayStyleProp.getString());
                  if (typeof ctx.setLineDash !== 'undefined') {
                      ctx.setLineDash(gaps);
                  } else // @ts-expect-error Handle browser prefix.
                  if (typeof ctx.webkitLineDash !== 'undefined') {
                      // @ts-expect-error Handle browser prefix.
                      ctx.webkitLineDash = gaps;
                  } else // @ts-expect-error Handle browser prefix.
                  if (typeof ctx.mozDash !== 'undefined' && !(gaps.length === 1 && gaps[0] === 0)) {
                      // @ts-expect-error Handle browser prefix.
                      ctx.mozDash = gaps;
                  }
                  const offset = strokeDashoffsetProp.getPixels();
                  if (typeof ctx.lineDashOffset !== 'undefined') {
                      ctx.lineDashOffset = offset;
                  } else // @ts-expect-error Handle browser prefix.
                  if (typeof ctx.webkitLineDashOffset !== 'undefined') {
                      // @ts-expect-error Handle browser prefix.
                      ctx.webkitLineDashOffset = offset;
                  } else // @ts-expect-error Handle browser prefix.
                  if (typeof ctx.mozDashOffset !== 'undefined') {
                      // @ts-expect-error Handle browser prefix.
                      ctx.mozDashOffset = offset;
                  }
              }
          }
          // font
          this.modifiedEmSizeStack = false;
          if (typeof ctx.font !== 'undefined') {
              const fontStyleProp = this.getStyle('font');
              const fontStyleStyleProp = this.getStyle('font-style');
              const fontVariantStyleProp = this.getStyle('font-variant');
              const fontWeightStyleProp = this.getStyle('font-weight');
              const fontSizeStyleProp = this.getStyle('font-size');
              const fontFamilyStyleProp = this.getStyle('font-family');
              const font = new Font(fontStyleStyleProp.getString(), fontVariantStyleProp.getString(), fontWeightStyleProp.getString(), fontSizeStyleProp.hasValue() ? "".concat(fontSizeStyleProp.getPixels(true), "px") : '', fontFamilyStyleProp.getString(), Font.parse(fontStyleProp.getString(), ctx.font));
              fontStyleStyleProp.setValue(font.fontStyle);
              fontVariantStyleProp.setValue(font.fontVariant);
              fontWeightStyleProp.setValue(font.fontWeight);
              fontSizeStyleProp.setValue(font.fontSize);
              fontFamilyStyleProp.setValue(font.fontFamily);
              ctx.font = font.toString();
              if (fontSizeStyleProp.isPixels()) {
                  this.document.emSize = fontSizeStyleProp.getPixels();
                  this.modifiedEmSizeStack = true;
              }
          }
          if (!fromMeasure) {
              // effects
              this.applyEffects(ctx);
              // opacity
              ctx.globalAlpha = this.calculateOpacity();
          }
      }
      clearContext(ctx) {
          super.clearContext(ctx);
          if (this.modifiedEmSizeStack) {
              this.document.popEmSize();
          }
      }
      constructor(...args){
          super(...args);
          this.modifiedEmSizeStack = false;
      }
  }

  class TextElement extends RenderedElement {
      setContext(ctx) {
          let fromMeasure = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          super.setContext(ctx, fromMeasure);
          const textBaseline = this.getStyle('dominant-baseline').getTextBaseline() || this.getStyle('alignment-baseline').getTextBaseline();
          if (textBaseline) {
              ctx.textBaseline = textBaseline;
          }
      }
      initializeCoordinates() {
          this.x = 0;
          this.y = 0;
          this.leafTexts = [];
          this.textChunkStart = 0;
          this.minX = Number.POSITIVE_INFINITY;
          this.maxX = Number.NEGATIVE_INFINITY;
      }
      getBoundingBox(ctx) {
          if (this.type !== 'text') {
              return this.getTElementBoundingBox(ctx);
          }
          // first, calculate child positions
          this.initializeCoordinates();
          this.adjustChildCoordinatesRecursive(ctx);
          let boundingBox = null;
          // then calculate bounding box
          this.children.forEach((_, i)=>{
              const childBoundingBox = this.getChildBoundingBox(ctx, this, this, i);
              if (!boundingBox) {
                  boundingBox = childBoundingBox;
              } else {
                  boundingBox.addBoundingBox(childBoundingBox);
              }
          });
          return boundingBox;
      }
      getFontSize() {
          const { document , parent  } = this;
          const inheritFontSize = Font.parse(document.ctx.font).fontSize;
          const fontSize = parent.getStyle('font-size').getNumber(inheritFontSize);
          return fontSize;
      }
      getTElementBoundingBox(ctx) {
          const fontSize = this.getFontSize();
          return new BoundingBox(this.x, this.y - fontSize, this.x + this.measureText(ctx), this.y);
      }
      getGlyph(font, text, i) {
          const char = text[i];
          let glyph;
          if (font.isArabic) {
              var ref;
              const len = text.length;
              const prevChar = text[i - 1];
              const nextChar = text[i + 1];
              let arabicForm = 'isolated';
              if ((i === 0 || prevChar === ' ') && i < len - 1 && nextChar !== ' ') {
                  arabicForm = 'terminal';
              }
              if (i > 0 && prevChar !== ' ' && i < len - 1 && nextChar !== ' ') {
                  arabicForm = 'medial';
              }
              if (i > 0 && prevChar !== ' ' && (i === len - 1 || nextChar === ' ')) {
                  arabicForm = 'initial';
              }
              glyph = ((ref = font.arabicGlyphs[char]) === null || ref === void 0 ? void 0 : ref[arabicForm]) || font.glyphs[char];
          } else {
              glyph = font.glyphs[char];
          }
          if (!glyph) {
              glyph = font.missingGlyph;
          }
          return glyph;
      }
      getText() {
          return '';
      }
      getTextFromNode(node) {
          const textNode = node || this.node;
          const childNodes = Array.from(textNode.parentNode.childNodes);
          const index = childNodes.indexOf(textNode);
          const lastIndex = childNodes.length - 1;
          let text = compressSpaces(// textNode.value
          // || textNode.text
          textNode.textContent || '');
          if (index === 0) {
              text = trimLeft(text);
          }
          if (index === lastIndex) {
              text = trimRight(text);
          }
          return text;
      }
      renderChildren(ctx) {
          if (this.type !== 'text') {
              this.renderTElementChildren(ctx);
              return;
          }
          // first, calculate child positions
          this.initializeCoordinates();
          this.adjustChildCoordinatesRecursive(ctx);
          // then render
          this.children.forEach((_, i)=>{
              this.renderChild(ctx, this, this, i);
          });
          const { mouse  } = this.document.screen;
          // Do not calc bounding box if mouse is not working.
          if (mouse.isWorking()) {
              mouse.checkBoundingBox(this, this.getBoundingBox(ctx));
          }
      }
      renderTElementChildren(ctx) {
          const { document , parent  } = this;
          const renderText = this.getText();
          const customFont = parent.getStyle('font-family').getDefinition();
          if (customFont) {
              const { unitsPerEm  } = customFont.fontFace;
              const ctxFont = Font.parse(document.ctx.font);
              const fontSize = parent.getStyle('font-size').getNumber(ctxFont.fontSize);
              const fontStyle = parent.getStyle('font-style').getString(ctxFont.fontStyle);
              const scale = fontSize / unitsPerEm;
              const text = customFont.isRTL ? renderText.split('').reverse().join('') : renderText;
              const dx = toNumbers(parent.getAttribute('dx').getString());
              const len = text.length;
              for(let i = 0; i < len; i++){
                  const glyph = this.getGlyph(customFont, text, i);
                  ctx.translate(this.x, this.y);
                  ctx.scale(scale, -scale);
                  const lw = ctx.lineWidth;
                  ctx.lineWidth = ctx.lineWidth * unitsPerEm / fontSize;
                  if (fontStyle === 'italic') {
                      ctx.transform(1, 0, 0.4, 1, 0, 0);
                  }
                  glyph.render(ctx);
                  if (fontStyle === 'italic') {
                      ctx.transform(1, 0, -0.4, 1, 0, 0);
                  }
                  ctx.lineWidth = lw;
                  ctx.scale(1 / scale, -1 / scale);
                  ctx.translate(-this.x, -this.y);
                  this.x += fontSize * (glyph.horizAdvX || customFont.horizAdvX) / unitsPerEm;
                  if (typeof dx[i] !== 'undefined' && !isNaN(dx[i])) {
                      this.x += dx[i];
                  }
              }
              return;
          }
          const { x , y  } = this;
          // NEED TEST
          // if (ctx.paintOrder === 'stroke') {
          //   if (ctx.strokeStyle) {
          //     ctx.strokeText(renderText, x, y);
          //   }
          //   if (ctx.fillStyle) {
          //     ctx.fillText(renderText, x, y);
          //   }
          // } else {
          if (ctx.fillStyle) {
              ctx.fillText(renderText, x, y);
          }
          if (ctx.strokeStyle) {
              ctx.strokeText(renderText, x, y);
          }
      // }
      }
      applyAnchoring() {
          if (this.textChunkStart >= this.leafTexts.length) {
              return;
          }
          // This is basically the "Apply anchoring" part of https://www.w3.org/TR/SVG2/text.html#TextLayoutAlgorithm.
          // The difference is that we apply the anchoring as soon as a chunk is finished. This saves some extra looping.
          // Vertical text is not supported.
          const firstElement = this.leafTexts[this.textChunkStart];
          const textAnchor = firstElement.getStyle('text-anchor').getString('start');
          const isRTL = false // we treat RTL like LTR
          ;
          let shift = 0;
          if (textAnchor === 'start' && !isRTL || textAnchor === 'end' && isRTL) {
              shift = firstElement.x - this.minX;
          } else if (textAnchor === 'end' && !isRTL || textAnchor === 'start' && isRTL) {
              shift = firstElement.x - this.maxX;
          } else {
              shift = firstElement.x - (this.minX + this.maxX) / 2;
          }
          for(let i = this.textChunkStart; i < this.leafTexts.length; i++){
              this.leafTexts[i].x += shift;
          }
          // start new chunk
          this.minX = Number.POSITIVE_INFINITY;
          this.maxX = Number.NEGATIVE_INFINITY;
          this.textChunkStart = this.leafTexts.length;
      }
      adjustChildCoordinatesRecursive(ctx) {
          this.children.forEach((_, i)=>{
              this.adjustChildCoordinatesRecursiveCore(ctx, this, this, i);
          });
          this.applyAnchoring();
      }
      adjustChildCoordinatesRecursiveCore(ctx, textParent, parent, i1) {
          const child = parent.children[i1];
          if (child.children.length > 0) {
              child.children.forEach((_, i)=>{
                  textParent.adjustChildCoordinatesRecursiveCore(ctx, textParent, child, i);
              });
          } else {
              // only leafs are relevant
              this.adjustChildCoordinates(ctx, textParent, parent, i1);
          }
      }
      adjustChildCoordinates(ctx, textParent, parent, i) {
          const child = parent.children[i];
          if (typeof child.measureText !== 'function') {
              return child;
          }
          ctx.save();
          child.setContext(ctx, true);
          const xAttr = child.getAttribute('x');
          const yAttr = child.getAttribute('y');
          const dxAttr = child.getAttribute('dx');
          const dyAttr = child.getAttribute('dy');
          const customFont = child.getStyle('font-family').getDefinition();
          const isRTL = Boolean(customFont === null || customFont === void 0 ? void 0 : customFont.isRTL);
          if (i === 0) {
              // First children inherit attributes from parent(s). Positional attributes
              // are only inherited from a parent to it's first child.
              if (!xAttr.hasValue()) {
                  xAttr.setValue(child.getInheritedAttribute('x'));
              }
              if (!yAttr.hasValue()) {
                  yAttr.setValue(child.getInheritedAttribute('y'));
              }
              if (!dxAttr.hasValue()) {
                  dxAttr.setValue(child.getInheritedAttribute('dx'));
              }
              if (!dyAttr.hasValue()) {
                  dyAttr.setValue(child.getInheritedAttribute('dy'));
              }
          }
          const width = child.measureText(ctx);
          if (isRTL) {
              textParent.x -= width;
          }
          if (xAttr.hasValue()) {
              // an "x" attribute marks the start of a new chunk
              textParent.applyAnchoring();
              child.x = xAttr.getPixels('x');
              if (dxAttr.hasValue()) {
                  child.x += dxAttr.getPixels('x');
              }
          } else {
              if (dxAttr.hasValue()) {
                  textParent.x += dxAttr.getPixels('x');
              }
              child.x = textParent.x;
          }
          textParent.x = child.x;
          if (!isRTL) {
              textParent.x += width;
          }
          if (yAttr.hasValue()) {
              child.y = yAttr.getPixels('y');
              if (dyAttr.hasValue()) {
                  child.y += dyAttr.getPixels('y');
              }
          } else {
              if (dyAttr.hasValue()) {
                  textParent.y += dyAttr.getPixels('y');
              }
              child.y = textParent.y;
          }
          textParent.y = child.y;
          // update the current chunk and it's bounds
          textParent.leafTexts.push(child);
          textParent.minX = Math.min(textParent.minX, child.x, child.x + width);
          textParent.maxX = Math.max(textParent.maxX, child.x, child.x + width);
          child.clearContext(ctx);
          ctx.restore();
          return child;
      }
      getChildBoundingBox(ctx, textParent, parent, i2) {
          const child = parent.children[i2];
          // not a text node?
          if (typeof child.getBoundingBox !== 'function') {
              return null;
          }
          const boundingBox = child.getBoundingBox(ctx);
          if (boundingBox) {
              child.children.forEach((_, i)=>{
                  const childBoundingBox = textParent.getChildBoundingBox(ctx, textParent, child, i);
                  boundingBox.addBoundingBox(childBoundingBox);
              });
          }
          return boundingBox;
      }
      renderChild(ctx, textParent, parent, i3) {
          const child = parent.children[i3];
          child.render(ctx);
          child.children.forEach((_, i)=>{
              textParent.renderChild(ctx, textParent, child, i);
          });
      }
      measureText(ctx) {
          const { measureCache  } = this;
          if (~measureCache) {
              return measureCache;
          }
          const renderText = this.getText();
          const measure = this.measureTargetText(ctx, renderText);
          this.measureCache = measure;
          return measure;
      }
      measureTargetText(ctx, targetText) {
          if (!targetText.length) {
              return 0;
          }
          const { parent  } = this;
          const customFont = parent.getStyle('font-family').getDefinition();
          if (customFont) {
              const fontSize = this.getFontSize();
              const text = customFont.isRTL ? targetText.split('').reverse().join('') : targetText;
              const dx = toNumbers(parent.getAttribute('dx').getString());
              const len = text.length;
              let measure = 0;
              for(let i = 0; i < len; i++){
                  const glyph = this.getGlyph(customFont, text, i);
                  measure += (glyph.horizAdvX || customFont.horizAdvX) * fontSize / customFont.fontFace.unitsPerEm;
                  if (typeof dx[i] !== 'undefined' && !isNaN(dx[i])) {
                      measure += dx[i];
                  }
              }
              return measure;
          }
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (!ctx.measureText) {
              return targetText.length * 10;
          }
          ctx.save();
          this.setContext(ctx, true);
          const { width: measure  } = ctx.measureText(targetText);
          this.clearContext(ctx);
          ctx.restore();
          return measure;
      }
      /**
     * Inherits positional attributes from {@link TextElement} parent(s). Attributes
     * are only inherited from a parent to its first child.
     * @param name - The attribute name.
     * @returns The attribute value or null.
     */ getInheritedAttribute(name) {
          // eslint-disable-next-line @typescript-eslint/no-this-alias,consistent-this
          let current = this;
          while(current instanceof TextElement && current.isFirstChild() && current.parent){
              const parentAttr = current.parent.getAttribute(name);
              if (parentAttr.hasValue(true)) {
                  return parentAttr.getString('0');
              }
              current = current.parent;
          }
          return null;
      }
      constructor(document, node, captureTextNodes){
          super(document, node, new.target === TextElement ? true : captureTextNodes);
          this.type = 'text';
          this.x = 0;
          this.y = 0;
          this.leafTexts = [];
          this.textChunkStart = 0;
          this.minX = Number.POSITIVE_INFINITY;
          this.maxX = Number.NEGATIVE_INFINITY;
          this.measureCache = -1;
      }
  }

  class TSpanElement extends TextElement {
      getText() {
          return this.text;
      }
      constructor(document, node, captureTextNodes){
          super(document, node, new.target === TSpanElement ? true : captureTextNodes);
          this.type = 'tspan';
          // if this node has children, then they own the text
          this.text = this.children.length > 0 ? '' : this.getTextFromNode();
      }
  }

  class TextNode extends TSpanElement {
      constructor(...args){
          super(...args);
          this.type = 'textNode';
      }
  }

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */ var t = function(r1, e1) {
      return (t = Object.setPrototypeOf || ({
          __proto__: []
      }) instanceof Array && function(t1, r2) {
          t1.__proto__ = r2;
      } || function(t2, r3) {
          for(var e2 in r3)Object.prototype.hasOwnProperty.call(r3, e2) && (t2[e2] = r3[e2]);
      })(r1, e1);
  };
  function r(r4, e3) {
      if ("function" != typeof e3 && null !== e3) throw new TypeError("Class extends value " + String(e3) + " is not a constructor or null");
      function i1() {
          this.constructor = r4;
      }
      t(r4, e3), r4.prototype = null === e3 ? Object.create(e3) : (i1.prototype = e3.prototype, new i1);
  }
  function e(t3) {
      var r5 = "";
      Array.isArray(t3) || (t3 = [
          t3
      ]);
      for(var e4 = 0; e4 < t3.length; e4++){
          var i2 = t3[e4];
          if (i2.type === _.CLOSE_PATH) r5 += "z";
          else if (i2.type === _.HORIZ_LINE_TO) r5 += (i2.relative ? "h" : "H") + i2.x;
          else if (i2.type === _.VERT_LINE_TO) r5 += (i2.relative ? "v" : "V") + i2.y;
          else if (i2.type === _.MOVE_TO) r5 += (i2.relative ? "m" : "M") + i2.x + " " + i2.y;
          else if (i2.type === _.LINE_TO) r5 += (i2.relative ? "l" : "L") + i2.x + " " + i2.y;
          else if (i2.type === _.CURVE_TO) r5 += (i2.relative ? "c" : "C") + i2.x1 + " " + i2.y1 + " " + i2.x2 + " " + i2.y2 + " " + i2.x + " " + i2.y;
          else if (i2.type === _.SMOOTH_CURVE_TO) r5 += (i2.relative ? "s" : "S") + i2.x2 + " " + i2.y2 + " " + i2.x + " " + i2.y;
          else if (i2.type === _.QUAD_TO) r5 += (i2.relative ? "q" : "Q") + i2.x1 + " " + i2.y1 + " " + i2.x + " " + i2.y;
          else if (i2.type === _.SMOOTH_QUAD_TO) r5 += (i2.relative ? "t" : "T") + i2.x + " " + i2.y;
          else {
              if (i2.type !== _.ARC) throw new Error('Unexpected command type "' + i2.type + '" at index ' + e4 + ".");
              r5 += (i2.relative ? "a" : "A") + i2.rX + " " + i2.rY + " " + i2.xRot + " " + +i2.lArcFlag + " " + +i2.sweepFlag + " " + i2.x + " " + i2.y;
          }
      }
      return r5;
  }
  function i(t4, r6) {
      var e5 = t4[0], i3 = t4[1];
      return [
          e5 * Math.cos(r6) - i3 * Math.sin(r6),
          e5 * Math.sin(r6) + i3 * Math.cos(r6)
      ];
  }
  function a() {
      for(var t5 = [], r7 = 0; r7 < arguments.length; r7++)t5[r7] = arguments[r7];
      for(var e6 = 0; e6 < t5.length; e6++)if ("number" != typeof t5[e6]) throw new Error("assertNumbers arguments[" + e6 + "] is not a number. " + typeof t5[e6] + " == typeof " + t5[e6]);
      return !0;
  }
  var n = Math.PI;
  function o(t6, r8, e7) {
      t6.lArcFlag = 0 === t6.lArcFlag ? 0 : 1, t6.sweepFlag = 0 === t6.sweepFlag ? 0 : 1;
      var a1 = t6.rX, o1 = t6.rY, s1 = t6.x, u1 = t6.y;
      a1 = Math.abs(t6.rX), o1 = Math.abs(t6.rY);
      var h1 = i([
          (r8 - s1) / 2,
          (e7 - u1) / 2
      ], -t6.xRot / 180 * n), c1 = h1[0], y1 = h1[1], p1 = Math.pow(c1, 2) / Math.pow(a1, 2) + Math.pow(y1, 2) / Math.pow(o1, 2);
      1 < p1 && (a1 *= Math.sqrt(p1), o1 *= Math.sqrt(p1)), t6.rX = a1, t6.rY = o1;
      var m1 = Math.pow(a1, 2) * Math.pow(y1, 2) + Math.pow(o1, 2) * Math.pow(c1, 2), O1 = (t6.lArcFlag !== t6.sweepFlag ? 1 : -1) * Math.sqrt(Math.max(0, (Math.pow(a1, 2) * Math.pow(o1, 2) - m1) / m1)), l1 = a1 * y1 / o1 * O1, T1 = -o1 * c1 / a1 * O1, v1 = i([
          l1,
          T1
      ], t6.xRot / 180 * n);
      t6.cX = v1[0] + (r8 + s1) / 2, t6.cY = v1[1] + (e7 + u1) / 2, t6.phi1 = Math.atan2((y1 - T1) / o1, (c1 - l1) / a1), t6.phi2 = Math.atan2((-y1 - T1) / o1, (-c1 - l1) / a1), 0 === t6.sweepFlag && t6.phi2 > t6.phi1 && (t6.phi2 -= 2 * n), 1 === t6.sweepFlag && t6.phi2 < t6.phi1 && (t6.phi2 += 2 * n), t6.phi1 *= 180 / n, t6.phi2 *= 180 / n;
  }
  function s(t7, r9, e8) {
      a(t7, r9, e8);
      var i4 = t7 * t7 + r9 * r9 - e8 * e8;
      if (0 > i4) return [];
      if (0 === i4) return [
          [
              t7 * e8 / (t7 * t7 + r9 * r9),
              r9 * e8 / (t7 * t7 + r9 * r9)
          ]
      ];
      var n1 = Math.sqrt(i4);
      return [
          [
              (t7 * e8 + r9 * n1) / (t7 * t7 + r9 * r9),
              (r9 * e8 - t7 * n1) / (t7 * t7 + r9 * r9)
          ],
          [
              (t7 * e8 - r9 * n1) / (t7 * t7 + r9 * r9),
              (r9 * e8 + t7 * n1) / (t7 * t7 + r9 * r9)
          ]
      ];
  }
  var u, h = Math.PI / 180;
  function c$1(t8, r10, e9) {
      return (1 - e9) * t8 + e9 * r10;
  }
  function y(t9, r11, e10, i5) {
      return t9 + Math.cos(i5 / 180 * n) * r11 + Math.sin(i5 / 180 * n) * e10;
  }
  function p(t10, r12, e11, i6) {
      var a2 = 0.000001, n2 = r12 - t10, o2 = e11 - r12, s2 = 3 * n2 + 3 * (i6 - e11) - 6 * o2, u2 = 6 * (o2 - n2), h2 = 3 * n2;
      return Math.abs(s2) < a2 ? [
          -h2 / u2
      ] : (function(t11, r13, e12) {
          void 0 === e12 && (e12 = 0.000001);
          var i7 = t11 * t11 / 4 - r13;
          if (i7 < -e12) return [];
          if (i7 <= e12) return [
              -t11 / 2
          ];
          var a3 = Math.sqrt(i7);
          return [
              -t11 / 2 - a3,
              -t11 / 2 + a3
          ];
      })(u2 / s2, h2 / s2, a2);
  }
  function m$1(t12, r14, e13, i8, a4) {
      var n3 = 1 - a4;
      return t12 * (n3 * n3 * n3) + r14 * (3 * n3 * n3 * a4) + e13 * (3 * n3 * a4 * a4) + i8 * (a4 * a4 * a4);
  }
  !function(t13) {
      function r15() {
          return u3(function(t14, r16, e15) {
              return t14.relative && (void 0 !== t14.x1 && (t14.x1 += r16), void 0 !== t14.y1 && (t14.y1 += e15), void 0 !== t14.x2 && (t14.x2 += r16), void 0 !== t14.y2 && (t14.y2 += e15), void 0 !== t14.x && (t14.x += r16), void 0 !== t14.y && (t14.y += e15), t14.relative = !1), t14;
          });
      }
      function e14() {
          var t15 = NaN, r17 = NaN, e16 = NaN, i9 = NaN;
          return u3(function(a5, n5, o3) {
              return a5.type & _.SMOOTH_CURVE_TO && (a5.type = _.CURVE_TO, t15 = isNaN(t15) ? n5 : t15, r17 = isNaN(r17) ? o3 : r17, a5.x1 = a5.relative ? n5 - t15 : 2 * n5 - t15, a5.y1 = a5.relative ? o3 - r17 : 2 * o3 - r17), a5.type & _.CURVE_TO ? (t15 = a5.relative ? n5 + a5.x2 : a5.x2, r17 = a5.relative ? o3 + a5.y2 : a5.y2) : (t15 = NaN, r17 = NaN), a5.type & _.SMOOTH_QUAD_TO && (a5.type = _.QUAD_TO, e16 = isNaN(e16) ? n5 : e16, i9 = isNaN(i9) ? o3 : i9, a5.x1 = a5.relative ? n5 - e16 : 2 * n5 - e16, a5.y1 = a5.relative ? o3 - i9 : 2 * o3 - i9), a5.type & _.QUAD_TO ? (e16 = a5.relative ? n5 + a5.x1 : a5.x1, i9 = a5.relative ? o3 + a5.y1 : a5.y1) : (e16 = NaN, i9 = NaN), a5;
          });
      }
      function n4() {
          var t16 = NaN, r18 = NaN;
          return u3(function(e17, i10, a6) {
              if (e17.type & _.SMOOTH_QUAD_TO && (e17.type = _.QUAD_TO, t16 = isNaN(t16) ? i10 : t16, r18 = isNaN(r18) ? a6 : r18, e17.x1 = e17.relative ? i10 - t16 : 2 * i10 - t16, e17.y1 = e17.relative ? a6 - r18 : 2 * a6 - r18), e17.type & _.QUAD_TO) {
                  t16 = e17.relative ? i10 + e17.x1 : e17.x1, r18 = e17.relative ? a6 + e17.y1 : e17.y1;
                  var n6 = e17.x1, o4 = e17.y1;
                  e17.type = _.CURVE_TO, e17.x1 = ((e17.relative ? 0 : i10) + 2 * n6) / 3, e17.y1 = ((e17.relative ? 0 : a6) + 2 * o4) / 3, e17.x2 = (e17.x + 2 * n6) / 3, e17.y2 = (e17.y + 2 * o4) / 3;
              } else t16 = NaN, r18 = NaN;
              return e17;
          });
      }
      function u3(t17) {
          var r19 = 0, e18 = 0, i11 = NaN, a7 = NaN;
          return function(n7) {
              if (isNaN(i11) && !(n7.type & _.MOVE_TO)) throw new Error("path must start with moveto");
              var o5 = t17(n7, r19, e18, i11, a7);
              return n7.type & _.CLOSE_PATH && (r19 = i11, e18 = a7), void 0 !== n7.x && (r19 = n7.relative ? r19 + n7.x : n7.x), void 0 !== n7.y && (e18 = n7.relative ? e18 + n7.y : n7.y), n7.type & _.MOVE_TO && (i11 = r19, a7 = e18), o5;
          };
      }
      function O2(t18, r20, e19, i12, n8, o6) {
          return a(t18, r20, e19, i12, n8, o6), u3(function(a8, s3, u4, h3) {
              var c2 = a8.x1, y2 = a8.x2, p2 = a8.relative && !isNaN(h3), m2 = void 0 !== a8.x ? a8.x : p2 ? 0 : s3, O3 = void 0 !== a8.y ? a8.y : p2 ? 0 : u4;
              function l3(t19) {
                  return t19 * t19;
              }
              a8.type & _.HORIZ_LINE_TO && 0 !== r20 && (a8.type = _.LINE_TO, a8.y = a8.relative ? 0 : u4), a8.type & _.VERT_LINE_TO && 0 !== e19 && (a8.type = _.LINE_TO, a8.x = a8.relative ? 0 : s3), void 0 !== a8.x && (a8.x = a8.x * t18 + O3 * e19 + (p2 ? 0 : n8)), void 0 !== a8.y && (a8.y = m2 * r20 + a8.y * i12 + (p2 ? 0 : o6)), void 0 !== a8.x1 && (a8.x1 = a8.x1 * t18 + a8.y1 * e19 + (p2 ? 0 : n8)), void 0 !== a8.y1 && (a8.y1 = c2 * r20 + a8.y1 * i12 + (p2 ? 0 : o6)), void 0 !== a8.x2 && (a8.x2 = a8.x2 * t18 + a8.y2 * e19 + (p2 ? 0 : n8)), void 0 !== a8.y2 && (a8.y2 = y2 * r20 + a8.y2 * i12 + (p2 ? 0 : o6));
              var T2 = t18 * i12 - r20 * e19;
              if (void 0 !== a8.xRot && (1 !== t18 || 0 !== r20 || 0 !== e19 || 1 !== i12)) if (0 === T2) delete a8.rX, delete a8.rY, delete a8.xRot, delete a8.lArcFlag, delete a8.sweepFlag, a8.type = _.LINE_TO;
              else {
                  var v2 = a8.xRot * Math.PI / 180, f1 = Math.sin(v2), N1 = Math.cos(v2), x = 1 / l3(a8.rX), d = 1 / l3(a8.rY), E = l3(N1) * x + l3(f1) * d, A = 2 * f1 * N1 * (x - d), C = l3(f1) * x + l3(N1) * d, M = E * i12 * i12 - A * r20 * i12 + C * r20 * r20, R = A * (t18 * i12 + r20 * e19) - 2 * (E * e19 * i12 + C * t18 * r20), g = E * e19 * e19 - A * t18 * e19 + C * t18 * t18, I = (Math.atan2(R, M - g) + Math.PI) % Math.PI / 2, S = Math.sin(I), L = Math.cos(I);
                  a8.rX = Math.abs(T2) / Math.sqrt(M * l3(L) + R * S * L + g * l3(S)), a8.rY = Math.abs(T2) / Math.sqrt(M * l3(S) - R * S * L + g * l3(L)), a8.xRot = 180 * I / Math.PI;
              }
              return void 0 !== a8.sweepFlag && 0 > T2 && (a8.sweepFlag = +!a8.sweepFlag), a8;
          });
      }
      function l2() {
          return function(t20) {
              var r21 = {};
              for(var e20 in t20)r21[e20] = t20[e20];
              return r21;
          };
      }
      t13.ROUND = function(t21) {
          function r22(r23) {
              return Math.round(r23 * t21) / t21;
          }
          return void 0 === t21 && (t21 = 10000000000000), a(t21), function(t22) {
              return void 0 !== t22.x1 && (t22.x1 = r22(t22.x1)), void 0 !== t22.y1 && (t22.y1 = r22(t22.y1)), void 0 !== t22.x2 && (t22.x2 = r22(t22.x2)), void 0 !== t22.y2 && (t22.y2 = r22(t22.y2)), void 0 !== t22.x && (t22.x = r22(t22.x)), void 0 !== t22.y && (t22.y = r22(t22.y)), void 0 !== t22.rX && (t22.rX = r22(t22.rX)), void 0 !== t22.rY && (t22.rY = r22(t22.rY)), t22;
          };
      }, t13.TO_ABS = r15, t13.TO_REL = function() {
          return u3(function(t23, r24, e21) {
              return t23.relative || (void 0 !== t23.x1 && (t23.x1 -= r24), void 0 !== t23.y1 && (t23.y1 -= e21), void 0 !== t23.x2 && (t23.x2 -= r24), void 0 !== t23.y2 && (t23.y2 -= e21), void 0 !== t23.x && (t23.x -= r24), void 0 !== t23.y && (t23.y -= e21), t23.relative = !0), t23;
          });
      }, t13.NORMALIZE_HVZ = function(t24, r25, e22) {
          return void 0 === t24 && (t24 = !0), void 0 === r25 && (r25 = !0), void 0 === e22 && (e22 = !0), u3(function(i13, a9, n9, o7, s4) {
              if (isNaN(o7) && !(i13.type & _.MOVE_TO)) throw new Error("path must start with moveto");
              return r25 && i13.type & _.HORIZ_LINE_TO && (i13.type = _.LINE_TO, i13.y = i13.relative ? 0 : n9), e22 && i13.type & _.VERT_LINE_TO && (i13.type = _.LINE_TO, i13.x = i13.relative ? 0 : a9), t24 && i13.type & _.CLOSE_PATH && (i13.type = _.LINE_TO, i13.x = i13.relative ? o7 - a9 : o7, i13.y = i13.relative ? s4 - n9 : s4), i13.type & _.ARC && (0 === i13.rX || 0 === i13.rY) && (i13.type = _.LINE_TO, delete i13.rX, delete i13.rY, delete i13.xRot, delete i13.lArcFlag, delete i13.sweepFlag), i13;
          });
      }, t13.NORMALIZE_ST = e14, t13.QT_TO_C = n4, t13.INFO = u3, t13.SANITIZE = function(t25) {
          void 0 === t25 && (t25 = 0), a(t25);
          var r26 = NaN, e23 = NaN, i14 = NaN, n10 = NaN;
          return u3(function(a10, o8, s5, u5, h4) {
              var c3 = Math.abs, y3 = !1, p3 = 0, m3 = 0;
              if (a10.type & _.SMOOTH_CURVE_TO && (p3 = isNaN(r26) ? 0 : o8 - r26, m3 = isNaN(e23) ? 0 : s5 - e23), a10.type & (_.CURVE_TO | _.SMOOTH_CURVE_TO) ? (r26 = a10.relative ? o8 + a10.x2 : a10.x2, e23 = a10.relative ? s5 + a10.y2 : a10.y2) : (r26 = NaN, e23 = NaN), a10.type & _.SMOOTH_QUAD_TO ? (i14 = isNaN(i14) ? o8 : 2 * o8 - i14, n10 = isNaN(n10) ? s5 : 2 * s5 - n10) : a10.type & _.QUAD_TO ? (i14 = a10.relative ? o8 + a10.x1 : a10.x1, n10 = a10.relative ? s5 + a10.y1 : a10.y2) : (i14 = NaN, n10 = NaN), a10.type & _.LINE_COMMANDS || a10.type & _.ARC && (0 === a10.rX || 0 === a10.rY || !a10.lArcFlag) || a10.type & _.CURVE_TO || a10.type & _.SMOOTH_CURVE_TO || a10.type & _.QUAD_TO || a10.type & _.SMOOTH_QUAD_TO) {
                  var O4 = void 0 === a10.x ? 0 : a10.relative ? a10.x : a10.x - o8, l4 = void 0 === a10.y ? 0 : a10.relative ? a10.y : a10.y - s5;
                  p3 = isNaN(i14) ? void 0 === a10.x1 ? p3 : a10.relative ? a10.x : a10.x1 - o8 : i14 - o8, m3 = isNaN(n10) ? void 0 === a10.y1 ? m3 : a10.relative ? a10.y : a10.y1 - s5 : n10 - s5;
                  var T3 = void 0 === a10.x2 ? 0 : a10.relative ? a10.x : a10.x2 - o8, v3 = void 0 === a10.y2 ? 0 : a10.relative ? a10.y : a10.y2 - s5;
                  c3(O4) <= t25 && c3(l4) <= t25 && c3(p3) <= t25 && c3(m3) <= t25 && c3(T3) <= t25 && c3(v3) <= t25 && (y3 = !0);
              }
              return a10.type & _.CLOSE_PATH && c3(o8 - u5) <= t25 && c3(s5 - h4) <= t25 && (y3 = !0), y3 ? [] : a10;
          });
      }, t13.MATRIX = O2, t13.ROTATE = function(t26, r27, e24) {
          void 0 === r27 && (r27 = 0), void 0 === e24 && (e24 = 0), a(t26, r27, e24);
          var i15 = Math.sin(t26), n11 = Math.cos(t26);
          return O2(n11, i15, -i15, n11, r27 - r27 * n11 + e24 * i15, e24 - r27 * i15 - e24 * n11);
      }, t13.TRANSLATE = function(t27, r28) {
          return void 0 === r28 && (r28 = 0), a(t27, r28), O2(1, 0, 0, 1, t27, r28);
      }, t13.SCALE = function(t28, r29) {
          return void 0 === r29 && (r29 = t28), a(t28, r29), O2(t28, 0, 0, r29, 0, 0);
      }, t13.SKEW_X = function(t29) {
          return a(t29), O2(1, 0, Math.atan(t29), 1, 0, 0);
      }, t13.SKEW_Y = function(t30) {
          return a(t30), O2(1, Math.atan(t30), 0, 1, 0, 0);
      }, t13.X_AXIS_SYMMETRY = function(t31) {
          return void 0 === t31 && (t31 = 0), a(t31), O2(-1, 0, 0, 1, t31, 0);
      }, t13.Y_AXIS_SYMMETRY = function(t32) {
          return void 0 === t32 && (t32 = 0), a(t32), O2(1, 0, 0, -1, 0, t32);
      }, t13.A_TO_C = function() {
          return u3(function(t33, r30, e25) {
              return _.ARC === t33.type ? (function(t34, r31, e26) {
                  var a11, n12, s6, u6;
                  t34.cX || o(t34, r31, e26);
                  for(var y4 = Math.min(t34.phi1, t34.phi2), p4 = Math.max(t34.phi1, t34.phi2) - y4, m4 = Math.ceil(p4 / 90), O5 = new Array(m4), l5 = r31, T4 = e26, v4 = 0; v4 < m4; v4++){
                      var f2 = c$1(t34.phi1, t34.phi2, v4 / m4), N2 = c$1(t34.phi1, t34.phi2, (v4 + 1) / m4), x = N2 - f2, d = 4 / 3 * Math.tan(x * h / 4), E = [
                          Math.cos(f2 * h) - d * Math.sin(f2 * h),
                          Math.sin(f2 * h) + d * Math.cos(f2 * h)
                      ], A = E[0], C = E[1], M = [
                          Math.cos(N2 * h),
                          Math.sin(N2 * h)
                      ], R = M[0], g = M[1], I = [
                          R + d * Math.sin(N2 * h),
                          g - d * Math.cos(N2 * h)
                      ], S = I[0], L = I[1];
                      O5[v4] = {
                          relative: t34.relative,
                          type: _.CURVE_TO
                      };
                      var H = function(r32, e27) {
                          var a12 = i([
                              r32 * t34.rX,
                              e27 * t34.rY
                          ], t34.xRot), n13 = a12[0], o9 = a12[1];
                          return [
                              t34.cX + n13,
                              t34.cY + o9
                          ];
                      };
                      a11 = H(A, C), O5[v4].x1 = a11[0], O5[v4].y1 = a11[1], n12 = H(S, L), O5[v4].x2 = n12[0], O5[v4].y2 = n12[1], s6 = H(R, g), O5[v4].x = s6[0], O5[v4].y = s6[1], t34.relative && (O5[v4].x1 -= l5, O5[v4].y1 -= T4, O5[v4].x2 -= l5, O5[v4].y2 -= T4, O5[v4].x -= l5, O5[v4].y -= T4), l5 = (u6 = [
                          O5[v4].x,
                          O5[v4].y
                      ])[0], T4 = u6[1];
                  }
                  return O5;
              })(t33, t33.relative ? 0 : r30, t33.relative ? 0 : e25) : t33;
          });
      }, t13.ANNOTATE_ARCS = function() {
          return u3(function(t35, r33, e28) {
              return t35.relative && (r33 = 0, e28 = 0), _.ARC === t35.type && o(t35, r33, e28), t35;
          });
      }, t13.CLONE = l2, t13.CALCULATE_BOUNDS = function() {
          var t36 = function(t37) {
              var r34 = {};
              for(var e29 in t37)r34[e29] = t37[e29];
              return r34;
          }, i16 = r15(), a13 = n4(), h5 = e14(), c4 = u3(function(r35, e30, n14) {
              var u7 = h5(a13(i16(t36(r35))));
              function O6(t38) {
                  t38 > c4.maxX && (c4.maxX = t38), t38 < c4.minX && (c4.minX = t38);
              }
              function l6(t39) {
                  t39 > c4.maxY && (c4.maxY = t39), t39 < c4.minY && (c4.minY = t39);
              }
              if (u7.type & _.DRAWING_COMMANDS && (O6(e30), l6(n14)), u7.type & _.HORIZ_LINE_TO && O6(u7.x), u7.type & _.VERT_LINE_TO && l6(u7.y), u7.type & _.LINE_TO && (O6(u7.x), l6(u7.y)), u7.type & _.CURVE_TO) {
                  O6(u7.x), l6(u7.y);
                  for(var T5 = 0, v5 = p(e30, u7.x1, u7.x2, u7.x); T5 < v5.length; T5++){
                      0 < (w = v5[T5]) && 1 > w && O6(m$1(e30, u7.x1, u7.x2, u7.x, w));
                  }
                  for(var f3 = 0, N3 = p(n14, u7.y1, u7.y2, u7.y); f3 < N3.length; f3++){
                      0 < (w = N3[f3]) && 1 > w && l6(m$1(n14, u7.y1, u7.y2, u7.y, w));
                  }
              }
              if (u7.type & _.ARC) {
                  O6(u7.x), l6(u7.y), o(u7, e30, n14);
                  for(var x = u7.xRot / 180 * Math.PI, d = Math.cos(x) * u7.rX, E = Math.sin(x) * u7.rX, A = -Math.sin(x) * u7.rY, C = Math.cos(x) * u7.rY, M = u7.phi1 < u7.phi2 ? [
                      u7.phi1,
                      u7.phi2
                  ] : -180 > u7.phi2 ? [
                      u7.phi2 + 360,
                      u7.phi1 + 360
                  ] : [
                      u7.phi2,
                      u7.phi1
                  ], R = M[0], g = M[1], I = function(t40) {
                      var r36 = t40[0], e31 = t40[1], i17 = 180 * Math.atan2(e31, r36) / Math.PI;
                      return i17 < R ? i17 + 360 : i17;
                  }, S = 0, L = s(A, -d, 0).map(I); S < L.length; S++){
                      (w = L[S]) > R && w < g && O6(y(u7.cX, d, A, w));
                  }
                  for(var H = 0, U = s(C, -E, 0).map(I); H < U.length; H++){
                      var w;
                      (w = U[H]) > R && w < g && l6(y(u7.cY, E, C, w));
                  }
              }
              return r35;
          });
          return c4.minX = 1 / 0, c4.maxX = -1 / 0, c4.minY = 1 / 0, c4.maxY = -1 / 0, c4;
      };
  }(u || (u = {}));
  var O, l = function() {
      function t41() {}
      return t41.prototype.round = function(t42) {
          return this.transform(u.ROUND(t42));
      }, t41.prototype.toAbs = function() {
          return this.transform(u.TO_ABS());
      }, t41.prototype.toRel = function() {
          return this.transform(u.TO_REL());
      }, t41.prototype.normalizeHVZ = function(t43, r37, e32) {
          return this.transform(u.NORMALIZE_HVZ(t43, r37, e32));
      }, t41.prototype.normalizeST = function() {
          return this.transform(u.NORMALIZE_ST());
      }, t41.prototype.qtToC = function() {
          return this.transform(u.QT_TO_C());
      }, t41.prototype.aToC = function() {
          return this.transform(u.A_TO_C());
      }, t41.prototype.sanitize = function(t44) {
          return this.transform(u.SANITIZE(t44));
      }, t41.prototype.translate = function(t45, r38) {
          return this.transform(u.TRANSLATE(t45, r38));
      }, t41.prototype.scale = function(t46, r39) {
          return this.transform(u.SCALE(t46, r39));
      }, t41.prototype.rotate = function(t47, r40, e33) {
          return this.transform(u.ROTATE(t47, r40, e33));
      }, t41.prototype.matrix = function(t48, r41, e34, i18, a14, n15) {
          return this.transform(u.MATRIX(t48, r41, e34, i18, a14, n15));
      }, t41.prototype.skewX = function(t49) {
          return this.transform(u.SKEW_X(t49));
      }, t41.prototype.skewY = function(t50) {
          return this.transform(u.SKEW_Y(t50));
      }, t41.prototype.xSymmetry = function(t51) {
          return this.transform(u.X_AXIS_SYMMETRY(t51));
      }, t41.prototype.ySymmetry = function(t52) {
          return this.transform(u.Y_AXIS_SYMMETRY(t52));
      }, t41.prototype.annotateArcs = function() {
          return this.transform(u.ANNOTATE_ARCS());
      }, t41;
  }(), T = function(t53) {
      return " " === t53 || "\t" === t53 || "\r" === t53 || "\n" === t53;
  }, v = function(t54) {
      return "0".charCodeAt(0) <= t54.charCodeAt(0) && t54.charCodeAt(0) <= "9".charCodeAt(0);
  }, f = function(t55) {
      function e35() {
          var r42 = t55.call(this) || this;
          return r42.curNumber = "", r42.curCommandType = -1, r42.curCommandRelative = !1, r42.canParseCommandOrComma = !0, r42.curNumberHasExp = !1, r42.curNumberHasExpDigits = !1, r42.curNumberHasDecimal = !1, r42.curArgs = [], r42;
      }
      return r(e35, t55), e35.prototype.finish = function(t56) {
          if (void 0 === t56 && (t56 = []), this.parse(" ", t56), 0 !== this.curArgs.length || !this.canParseCommandOrComma) throw new SyntaxError("Unterminated command at the path end.");
          return t56;
      }, e35.prototype.parse = function(t57, r43) {
          var e36 = this;
          void 0 === r43 && (r43 = []);
          for(var i19 = function(t58) {
              r43.push(t58), e36.curArgs.length = 0, e36.canParseCommandOrComma = !0;
          }, a15 = 0; a15 < t57.length; a15++){
              var n16 = t57[a15], o10 = !(this.curCommandType !== _.ARC || 3 !== this.curArgs.length && 4 !== this.curArgs.length || 1 !== this.curNumber.length || "0" !== this.curNumber && "1" !== this.curNumber), s7 = v(n16) && ("0" === this.curNumber && "0" === n16 || o10);
              if (!v(n16) || s7) if ("e" !== n16 && "E" !== n16) if ("-" !== n16 && "+" !== n16 || !this.curNumberHasExp || this.curNumberHasExpDigits) if ("." !== n16 || this.curNumberHasExp || this.curNumberHasDecimal || o10) {
                  if (this.curNumber && -1 !== this.curCommandType) {
                      var u8 = Number(this.curNumber);
                      if (isNaN(u8)) throw new SyntaxError("Invalid number ending at " + a15);
                      if (this.curCommandType === _.ARC) {
                          if (0 === this.curArgs.length || 1 === this.curArgs.length) {
                              if (0 > u8) throw new SyntaxError('Expected positive number, got "' + u8 + '" at index "' + a15 + '"');
                          } else if ((3 === this.curArgs.length || 4 === this.curArgs.length) && "0" !== this.curNumber && "1" !== this.curNumber) throw new SyntaxError('Expected a flag, got "' + this.curNumber + '" at index "' + a15 + '"');
                      }
                      this.curArgs.push(u8), this.curArgs.length === N[this.curCommandType] && (_.HORIZ_LINE_TO === this.curCommandType ? i19({
                          type: _.HORIZ_LINE_TO,
                          relative: this.curCommandRelative,
                          x: u8
                      }) : _.VERT_LINE_TO === this.curCommandType ? i19({
                          type: _.VERT_LINE_TO,
                          relative: this.curCommandRelative,
                          y: u8
                      }) : this.curCommandType === _.MOVE_TO || this.curCommandType === _.LINE_TO || this.curCommandType === _.SMOOTH_QUAD_TO ? (i19({
                          type: this.curCommandType,
                          relative: this.curCommandRelative,
                          x: this.curArgs[0],
                          y: this.curArgs[1]
                      }), _.MOVE_TO === this.curCommandType && (this.curCommandType = _.LINE_TO)) : this.curCommandType === _.CURVE_TO ? i19({
                          type: _.CURVE_TO,
                          relative: this.curCommandRelative,
                          x1: this.curArgs[0],
                          y1: this.curArgs[1],
                          x2: this.curArgs[2],
                          y2: this.curArgs[3],
                          x: this.curArgs[4],
                          y: this.curArgs[5]
                      }) : this.curCommandType === _.SMOOTH_CURVE_TO ? i19({
                          type: _.SMOOTH_CURVE_TO,
                          relative: this.curCommandRelative,
                          x2: this.curArgs[0],
                          y2: this.curArgs[1],
                          x: this.curArgs[2],
                          y: this.curArgs[3]
                      }) : this.curCommandType === _.QUAD_TO ? i19({
                          type: _.QUAD_TO,
                          relative: this.curCommandRelative,
                          x1: this.curArgs[0],
                          y1: this.curArgs[1],
                          x: this.curArgs[2],
                          y: this.curArgs[3]
                      }) : this.curCommandType === _.ARC && i19({
                          type: _.ARC,
                          relative: this.curCommandRelative,
                          rX: this.curArgs[0],
                          rY: this.curArgs[1],
                          xRot: this.curArgs[2],
                          lArcFlag: this.curArgs[3],
                          sweepFlag: this.curArgs[4],
                          x: this.curArgs[5],
                          y: this.curArgs[6]
                      })), this.curNumber = "", this.curNumberHasExpDigits = !1, this.curNumberHasExp = !1, this.curNumberHasDecimal = !1, this.canParseCommandOrComma = !0;
                  }
                  if (!T(n16)) if ("," === n16 && this.canParseCommandOrComma) this.canParseCommandOrComma = !1;
                  else if ("+" !== n16 && "-" !== n16 && "." !== n16) if (s7) this.curNumber = n16, this.curNumberHasDecimal = !1;
                  else {
                      if (0 !== this.curArgs.length) throw new SyntaxError("Unterminated command at index " + a15 + ".");
                      if (!this.canParseCommandOrComma) throw new SyntaxError('Unexpected character "' + n16 + '" at index ' + a15 + ". Command cannot follow comma");
                      if (this.canParseCommandOrComma = !1, "z" !== n16 && "Z" !== n16) if ("h" === n16 || "H" === n16) this.curCommandType = _.HORIZ_LINE_TO, this.curCommandRelative = "h" === n16;
                      else if ("v" === n16 || "V" === n16) this.curCommandType = _.VERT_LINE_TO, this.curCommandRelative = "v" === n16;
                      else if ("m" === n16 || "M" === n16) this.curCommandType = _.MOVE_TO, this.curCommandRelative = "m" === n16;
                      else if ("l" === n16 || "L" === n16) this.curCommandType = _.LINE_TO, this.curCommandRelative = "l" === n16;
                      else if ("c" === n16 || "C" === n16) this.curCommandType = _.CURVE_TO, this.curCommandRelative = "c" === n16;
                      else if ("s" === n16 || "S" === n16) this.curCommandType = _.SMOOTH_CURVE_TO, this.curCommandRelative = "s" === n16;
                      else if ("q" === n16 || "Q" === n16) this.curCommandType = _.QUAD_TO, this.curCommandRelative = "q" === n16;
                      else if ("t" === n16 || "T" === n16) this.curCommandType = _.SMOOTH_QUAD_TO, this.curCommandRelative = "t" === n16;
                      else {
                          if ("a" !== n16 && "A" !== n16) throw new SyntaxError('Unexpected character "' + n16 + '" at index ' + a15 + ".");
                          this.curCommandType = _.ARC, this.curCommandRelative = "a" === n16;
                      }
                      else r43.push({
                          type: _.CLOSE_PATH
                      }), this.canParseCommandOrComma = !0, this.curCommandType = -1;
                  }
                  else this.curNumber = n16, this.curNumberHasDecimal = "." === n16;
              } else this.curNumber += n16, this.curNumberHasDecimal = !0;
              else this.curNumber += n16;
              else this.curNumber += n16, this.curNumberHasExp = !0;
              else this.curNumber += n16, this.curNumberHasExpDigits = this.curNumberHasExp;
          }
          return r43;
      }, e35.prototype.transform = function(t59) {
          return Object.create(this, {
              parse: {
                  value: function(r44, e37) {
                      void 0 === e37 && (e37 = []);
                      for(var i20 = 0, a16 = Object.getPrototypeOf(this).parse.call(this, r44); i20 < a16.length; i20++){
                          var n17 = a16[i20], o11 = t59(n17);
                          Array.isArray(o11) ? e37.push.apply(e37, o11) : e37.push(o11);
                      }
                      return e37;
                  }
              }
          });
      }, e35;
  }(l), _ = function(t60) {
      function i21(r45) {
          var e38 = t60.call(this) || this;
          return e38.commands = "string" == typeof r45 ? i21.parse(r45) : r45, e38;
      }
      return r(i21, t60), i21.prototype.encode = function() {
          return i21.encode(this.commands);
      }, i21.prototype.getBounds = function() {
          var t61 = u.CALCULATE_BOUNDS();
          return this.transform(t61), t61;
      }, i21.prototype.transform = function(t62) {
          for(var r46 = [], e39 = 0, i22 = this.commands; e39 < i22.length; e39++){
              var a17 = t62(i22[e39]);
              Array.isArray(a17) ? r46.push.apply(r46, a17) : r46.push(a17);
          }
          return this.commands = r46, this;
      }, i21.encode = function(t63) {
          return e(t63);
      }, i21.parse = function(t64) {
          var r47 = new f, e40 = [];
          return r47.parse(t64, e40), r47.finish(e40), e40;
      }, i21.CLOSE_PATH = 1, i21.MOVE_TO = 2, i21.HORIZ_LINE_TO = 4, i21.VERT_LINE_TO = 8, i21.LINE_TO = 16, i21.CURVE_TO = 32, i21.SMOOTH_CURVE_TO = 64, i21.QUAD_TO = 128, i21.SMOOTH_QUAD_TO = 256, i21.ARC = 512, i21.LINE_COMMANDS = i21.LINE_TO | i21.HORIZ_LINE_TO | i21.VERT_LINE_TO, i21.DRAWING_COMMANDS = i21.HORIZ_LINE_TO | i21.VERT_LINE_TO | i21.LINE_TO | i21.CURVE_TO | i21.SMOOTH_CURVE_TO | i21.QUAD_TO | i21.SMOOTH_QUAD_TO | i21.ARC, i21;
  }(l), N = ((O = {})[_.MOVE_TO] = 2, O[_.LINE_TO] = 2, O[_.HORIZ_LINE_TO] = 1, O[_.VERT_LINE_TO] = 1, O[_.CLOSE_PATH] = 0, O[_.QUAD_TO] = 4, O[_.SMOOTH_QUAD_TO] = 2, O[_.CURVE_TO] = 6, O[_.SMOOTH_CURVE_TO] = 4, O[_.ARC] = 7, O);

  class PathParser extends _ {
      reset() {
          this.i = -1;
          this.command = null;
          this.previousCommand = null;
          this.start = new Point(0, 0);
          this.control = new Point(0, 0);
          this.current = new Point(0, 0);
          this.points = [];
          this.angles = [];
      }
      isEnd() {
          const { i , commands  } = this;
          return i >= commands.length - 1;
      }
      next() {
          const command = this.commands[++this.i];
          this.previousCommand = this.command;
          this.command = command;
          return command;
      }
      getPoint() {
          let xProp = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'x', yProp = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'y';
          const point = new Point(this.command[xProp], this.command[yProp]);
          return this.makeAbsolute(point);
      }
      getAsControlPoint(xProp, yProp) {
          const point = this.getPoint(xProp, yProp);
          this.control = point;
          return point;
      }
      getAsCurrentPoint(xProp, yProp) {
          const point = this.getPoint(xProp, yProp);
          this.current = point;
          return point;
      }
      getReflectedControlPoint() {
          const previousCommand = this.previousCommand.type;
          if (previousCommand !== _.CURVE_TO && previousCommand !== _.SMOOTH_CURVE_TO && previousCommand !== _.QUAD_TO && previousCommand !== _.SMOOTH_QUAD_TO) {
              return this.current;
          }
          // reflect point
          const { current: { x: cx , y: cy  } , control: { x: ox , y: oy  }  } = this;
          const point = new Point(2 * cx - ox, 2 * cy - oy);
          return point;
      }
      makeAbsolute(point) {
          if (this.command.relative) {
              const { x , y  } = this.current;
              point.x += x;
              point.y += y;
          }
          return point;
      }
      addMarker(point, from, priorTo) {
          const { points , angles  } = this;
          // if the last angle isn't filled in because we didn't have this point yet ...
          if (priorTo && angles.length > 0 && !angles[angles.length - 1]) {
              angles[angles.length - 1] = points[points.length - 1].angleTo(priorTo);
          }
          this.addMarkerAngle(point, from ? from.angleTo(point) : null);
      }
      addMarkerAngle(point, angle) {
          this.points.push(point);
          this.angles.push(angle);
      }
      getMarkerPoints() {
          return this.points;
      }
      getMarkerAngles() {
          const { angles  } = this;
          const len = angles.length;
          for(let i = 0; i < len; i++){
              if (!angles[i]) {
                  for(let j = i + 1; j < len; j++){
                      if (angles[j]) {
                          angles[i] = angles[j];
                          break;
                      }
                  }
              }
          }
          return angles;
      }
      constructor(path){
          super(path// Fix spaces after signs.
          .replace(/([+\-.])\s+/gm, '$1')// Remove invalid part.
          .replace(/[^MmZzLlHhVvCcSsQqTtAae\d\s.,+-].*/g, ''));
          this.control = new Point(0, 0);
          this.start = new Point(0, 0);
          this.current = new Point(0, 0);
          this.command = null;
          this.commands = this.commands;
          this.i = -1;
          this.previousCommand = null;
          this.points = [];
          this.angles = [];
      }
  }

  class PathElement extends RenderedElement {
      path(ctx) {
          const { pathParser  } = this;
          const boundingBox = new BoundingBox();
          pathParser.reset();
          if (ctx) {
              ctx.beginPath();
          }
          while(!pathParser.isEnd()){
              switch(pathParser.next().type){
                  case PathParser.MOVE_TO:
                      this.pathM(ctx, boundingBox);
                      break;
                  case PathParser.LINE_TO:
                      this.pathL(ctx, boundingBox);
                      break;
                  case PathParser.HORIZ_LINE_TO:
                      this.pathH(ctx, boundingBox);
                      break;
                  case PathParser.VERT_LINE_TO:
                      this.pathV(ctx, boundingBox);
                      break;
                  case PathParser.CURVE_TO:
                      this.pathC(ctx, boundingBox);
                      break;
                  case PathParser.SMOOTH_CURVE_TO:
                      this.pathS(ctx, boundingBox);
                      break;
                  case PathParser.QUAD_TO:
                      this.pathQ(ctx, boundingBox);
                      break;
                  case PathParser.SMOOTH_QUAD_TO:
                      this.pathT(ctx, boundingBox);
                      break;
                  case PathParser.ARC:
                      this.pathA(ctx, boundingBox);
                      break;
                  case PathParser.CLOSE_PATH:
                      this.pathZ(ctx, boundingBox);
                      break;
              }
          }
          return boundingBox;
      }
      getBoundingBox(_ctx) {
          return this.path();
      }
      getMarkers() {
          const { pathParser  } = this;
          const points = pathParser.getMarkerPoints();
          const angles = pathParser.getMarkerAngles();
          const markers = points.map((point, i)=>[
                  point,
                  angles[i]
              ]
          );
          return markers;
      }
      renderChildren(ctx) {
          this.path(ctx);
          this.document.screen.mouse.checkPath(this, ctx);
          const fillRuleStyleProp = this.getStyle('fill-rule');
          if (ctx.fillStyle !== '') {
              if (fillRuleStyleProp.getString('inherit') !== 'inherit') {
                  ctx.fill(fillRuleStyleProp.getString());
              } else {
                  ctx.fill();
              }
          }
          if (ctx.strokeStyle !== '') {
              if (this.getAttribute('vector-effect').getString() === 'non-scaling-stroke') {
                  ctx.save();
                  ctx.setTransform(1, 0, 0, 1, 0, 0);
                  ctx.stroke();
                  ctx.restore();
              } else {
                  ctx.stroke();
              }
          }
          const markers = this.getMarkers();
          if (markers) {
              const markersLastIndex = markers.length - 1;
              const markerStartStyleProp = this.getStyle('marker-start');
              const markerMidStyleProp = this.getStyle('marker-mid');
              const markerEndStyleProp = this.getStyle('marker-end');
              if (markerStartStyleProp.isUrlDefinition()) {
                  const marker = markerStartStyleProp.getDefinition();
                  const [point, angle] = markers[0];
                  marker.render(ctx, point, angle);
              }
              if (markerMidStyleProp.isUrlDefinition()) {
                  const marker = markerMidStyleProp.getDefinition();
                  for(let i = 1; i < markersLastIndex; i++){
                      const [point, angle] = markers[i];
                      marker.render(ctx, point, angle);
                  }
              }
              if (markerEndStyleProp.isUrlDefinition()) {
                  const marker = markerEndStyleProp.getDefinition();
                  const [point, angle] = markers[markersLastIndex];
                  marker.render(ctx, point, angle);
              }
          }
      }
      static pathM(pathParser) {
          const point = pathParser.getAsCurrentPoint();
          pathParser.start = pathParser.current;
          return {
              point
          };
      }
      pathM(ctx, boundingBox) {
          const { pathParser  } = this;
          const { point  } = PathElement.pathM(pathParser);
          const { x , y  } = point;
          pathParser.addMarker(point);
          boundingBox.addPoint(x, y);
          if (ctx) {
              ctx.moveTo(x, y);
          }
      }
      static pathL(pathParser) {
          const { current  } = pathParser;
          const point = pathParser.getAsCurrentPoint();
          return {
              current,
              point
          };
      }
      pathL(ctx, boundingBox) {
          const { pathParser  } = this;
          const { current , point  } = PathElement.pathL(pathParser);
          const { x , y  } = point;
          pathParser.addMarker(point, current);
          boundingBox.addPoint(x, y);
          if (ctx) {
              ctx.lineTo(x, y);
          }
      }
      static pathH(pathParser) {
          const { current , command  } = pathParser;
          const point = new Point((command.relative ? current.x : 0) + command.x, current.y);
          pathParser.current = point;
          return {
              current,
              point
          };
      }
      pathH(ctx, boundingBox) {
          const { pathParser  } = this;
          const { current , point  } = PathElement.pathH(pathParser);
          const { x , y  } = point;
          pathParser.addMarker(point, current);
          boundingBox.addPoint(x, y);
          if (ctx) {
              ctx.lineTo(x, y);
          }
      }
      static pathV(pathParser) {
          const { current , command  } = pathParser;
          const point = new Point(current.x, (command.relative ? current.y : 0) + command.y);
          pathParser.current = point;
          return {
              current,
              point
          };
      }
      pathV(ctx, boundingBox) {
          const { pathParser  } = this;
          const { current , point  } = PathElement.pathV(pathParser);
          const { x , y  } = point;
          pathParser.addMarker(point, current);
          boundingBox.addPoint(x, y);
          if (ctx) {
              ctx.lineTo(x, y);
          }
      }
      static pathC(pathParser) {
          const { current  } = pathParser;
          const point = pathParser.getPoint('x1', 'y1');
          const controlPoint = pathParser.getAsControlPoint('x2', 'y2');
          const currentPoint = pathParser.getAsCurrentPoint();
          return {
              current,
              point,
              controlPoint,
              currentPoint
          };
      }
      pathC(ctx, boundingBox) {
          const { pathParser  } = this;
          const { current , point , controlPoint , currentPoint  } = PathElement.pathC(pathParser);
          pathParser.addMarker(currentPoint, controlPoint, point);
          boundingBox.addBezierCurve(current.x, current.y, point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
          if (ctx) {
              ctx.bezierCurveTo(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
          }
      }
      static pathS(pathParser) {
          const { current  } = pathParser;
          const point = pathParser.getReflectedControlPoint();
          const controlPoint = pathParser.getAsControlPoint('x2', 'y2');
          const currentPoint = pathParser.getAsCurrentPoint();
          return {
              current,
              point,
              controlPoint,
              currentPoint
          };
      }
      pathS(ctx, boundingBox) {
          const { pathParser  } = this;
          const { current , point , controlPoint , currentPoint  } = PathElement.pathS(pathParser);
          pathParser.addMarker(currentPoint, controlPoint, point);
          boundingBox.addBezierCurve(current.x, current.y, point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
          if (ctx) {
              ctx.bezierCurveTo(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
          }
      }
      static pathQ(pathParser) {
          const { current  } = pathParser;
          const controlPoint = pathParser.getAsControlPoint('x1', 'y1');
          const currentPoint = pathParser.getAsCurrentPoint();
          return {
              current,
              controlPoint,
              currentPoint
          };
      }
      pathQ(ctx, boundingBox) {
          const { pathParser  } = this;
          const { current , controlPoint , currentPoint  } = PathElement.pathQ(pathParser);
          pathParser.addMarker(currentPoint, controlPoint, controlPoint);
          boundingBox.addQuadraticCurve(current.x, current.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
          if (ctx) {
              ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
          }
      }
      static pathT(pathParser) {
          const { current  } = pathParser;
          const controlPoint = pathParser.getReflectedControlPoint();
          pathParser.control = controlPoint;
          const currentPoint = pathParser.getAsCurrentPoint();
          return {
              current,
              controlPoint,
              currentPoint
          };
      }
      pathT(ctx, boundingBox) {
          const { pathParser  } = this;
          const { current , controlPoint , currentPoint  } = PathElement.pathT(pathParser);
          pathParser.addMarker(currentPoint, controlPoint, controlPoint);
          boundingBox.addQuadraticCurve(current.x, current.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
          if (ctx) {
              ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
          }
      }
      static pathA(pathParser) {
          const { current , command  } = pathParser;
          let { rX , rY , xRot , lArcFlag , sweepFlag  } = command;
          const xAxisRotation = xRot * (Math.PI / 180);
          const currentPoint = pathParser.getAsCurrentPoint();
          // Conversion from endpoint to center parameterization
          // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
          // x1', y1'
          const currp = new Point(Math.cos(xAxisRotation) * (current.x - currentPoint.x) / 2 + Math.sin(xAxisRotation) * (current.y - currentPoint.y) / 2, -Math.sin(xAxisRotation) * (current.x - currentPoint.x) / 2 + Math.cos(xAxisRotation) * (current.y - currentPoint.y) / 2);
          // adjust radii
          const l = Math.pow(currp.x, 2) / Math.pow(rX, 2) + Math.pow(currp.y, 2) / Math.pow(rY, 2);
          if (l > 1) {
              rX *= Math.sqrt(l);
              rY *= Math.sqrt(l);
          }
          // cx', cy'
          let s = (lArcFlag === sweepFlag ? -1 : 1) * Math.sqrt((Math.pow(rX, 2) * Math.pow(rY, 2) - Math.pow(rX, 2) * Math.pow(currp.y, 2) - Math.pow(rY, 2) * Math.pow(currp.x, 2)) / (Math.pow(rX, 2) * Math.pow(currp.y, 2) + Math.pow(rY, 2) * Math.pow(currp.x, 2)));
          if (isNaN(s)) {
              s = 0;
          }
          const cpp = new Point(s * rX * currp.y / rY, s * -rY * currp.x / rX);
          // cx, cy
          const centp = new Point((current.x + currentPoint.x) / 2 + Math.cos(xAxisRotation) * cpp.x - Math.sin(xAxisRotation) * cpp.y, (current.y + currentPoint.y) / 2 + Math.sin(xAxisRotation) * cpp.x + Math.cos(xAxisRotation) * cpp.y);
          // initial angle
          const a1 = vectorsAngle([
              1,
              0
          ], [
              (currp.x - cpp.x) / rX,
              (currp.y - cpp.y) / rY
          ]) // θ1
          ;
          // angle delta
          const u = [
              (currp.x - cpp.x) / rX,
              (currp.y - cpp.y) / rY
          ];
          const v = [
              (-currp.x - cpp.x) / rX,
              (-currp.y - cpp.y) / rY
          ];
          let ad = vectorsAngle(u, v) // Δθ
          ;
          if (vectorsRatio(u, v) <= -1) {
              ad = Math.PI;
          }
          if (vectorsRatio(u, v) >= 1) {
              ad = 0;
          }
          return {
              currentPoint,
              rX,
              rY,
              sweepFlag,
              xAxisRotation,
              centp,
              a1,
              ad
          };
      }
      pathA(ctx, boundingBox) {
          const { pathParser  } = this;
          const { currentPoint , rX , rY , sweepFlag , xAxisRotation , centp , a1 , ad  } = PathElement.pathA(pathParser);
          // for markers
          const dir = 1 - sweepFlag ? 1 : -1;
          const ah = a1 + dir * (ad / 2);
          const halfWay = new Point(centp.x + rX * Math.cos(ah), centp.y + rY * Math.sin(ah));
          pathParser.addMarkerAngle(halfWay, ah - dir * Math.PI / 2);
          pathParser.addMarkerAngle(currentPoint, ah - dir * Math.PI);
          boundingBox.addPoint(currentPoint.x, currentPoint.y) // TODO: this is too naive, make it better
          ;
          if (ctx && !isNaN(a1) && !isNaN(ad)) {
              const r = rX > rY ? rX : rY;
              const sx = rX > rY ? 1 : rX / rY;
              const sy = rX > rY ? rY / rX : 1;
              ctx.translate(centp.x, centp.y);
              ctx.rotate(xAxisRotation);
              ctx.scale(sx, sy);
              ctx.arc(0, 0, r, a1, a1 + ad, Boolean(1 - sweepFlag));
              ctx.scale(1 / sx, 1 / sy);
              ctx.rotate(-xAxisRotation);
              ctx.translate(-centp.x, -centp.y);
          }
      }
      static pathZ(pathParser) {
          pathParser.current = pathParser.start;
      }
      pathZ(ctx, boundingBox) {
          PathElement.pathZ(this.pathParser);
          if (ctx) {
              // only close path if it is not a straight line
              if (boundingBox.x1 !== boundingBox.x2 && boundingBox.y1 !== boundingBox.y2) {
                  ctx.closePath();
              }
          }
      }
      constructor(document, node, captureTextNodes){
          super(document, node, captureTextNodes);
          this.type = 'path';
          this.pathParser = new PathParser(this.getAttribute('d').getString());
      }
  }

  class SVGElement extends RenderedElement {
      setContext(ctx) {
          var ref;
          const { document  } = this;
          const { screen , window  } = document;
          const canvas = ctx.canvas;
          screen.setDefaults(ctx);
          if ('style' in canvas && typeof ctx.font !== 'undefined' && window && typeof window.getComputedStyle !== 'undefined') {
              ctx.font = window.getComputedStyle(canvas).getPropertyValue('font');
              const fontSizeProp = new Property(document, 'fontSize', Font.parse(ctx.font).fontSize);
              if (fontSizeProp.hasValue()) {
                  document.rootEmSize = fontSizeProp.getPixels('y');
                  document.emSize = document.rootEmSize;
              }
          }
          // create new view port
          if (!this.getAttribute('x').hasValue()) {
              this.getAttribute('x', true).setValue(0);
          }
          if (!this.getAttribute('y').hasValue()) {
              this.getAttribute('y', true).setValue(0);
          }
          let { width , height  } = screen.viewPort;
          if (!this.getStyle('width').hasValue()) {
              this.getStyle('width', true).setValue('100%');
          }
          if (!this.getStyle('height').hasValue()) {
              this.getStyle('height', true).setValue('100%');
          }
          if (!this.getStyle('color').hasValue()) {
              this.getStyle('color', true).setValue('black');
          }
          const refXAttr = this.getAttribute('refX');
          const refYAttr = this.getAttribute('refY');
          const viewBoxAttr = this.getAttribute('viewBox');
          const viewBox = viewBoxAttr.hasValue() ? toNumbers(viewBoxAttr.getString()) : null;
          const clip = !this.root && this.getStyle('overflow').getValue('hidden') !== 'visible';
          let minX = 0;
          let minY = 0;
          let clipX = 0;
          let clipY = 0;
          if (viewBox) {
              minX = viewBox[0];
              minY = viewBox[1];
          }
          if (!this.root) {
              width = this.getStyle('width').getPixels('x');
              height = this.getStyle('height').getPixels('y');
              if (this.type === 'marker') {
                  clipX = minX;
                  clipY = minY;
                  minX = 0;
                  minY = 0;
              }
          }
          screen.viewPort.setCurrent(width, height);
          // Default value of transform-origin is center only for root SVG elements
          // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform-origin
          if (this.node // is not temporary SVGElement
           && (!this.parent || ((ref = this.node.parentNode) === null || ref === void 0 ? void 0 : ref.nodeName) === 'foreignObject') && this.getStyle('transform', false, true).hasValue() && !this.getStyle('transform-origin', false, true).hasValue()) {
              this.getStyle('transform-origin', true, true).setValue('50% 50%');
          }
          super.setContext(ctx);
          ctx.translate(this.getAttribute('x').getPixels('x'), this.getAttribute('y').getPixels('y'));
          if (viewBox) {
              width = viewBox[2];
              height = viewBox[3];
          }
          document.setViewBox({
              ctx,
              aspectRatio: this.getAttribute('preserveAspectRatio').getString(),
              width: screen.viewPort.width,
              desiredWidth: width,
              height: screen.viewPort.height,
              desiredHeight: height,
              minX,
              minY,
              refX: refXAttr.getValue(),
              refY: refYAttr.getValue(),
              clip,
              clipX,
              clipY
          });
          if (viewBox) {
              screen.viewPort.removeCurrent();
              screen.viewPort.setCurrent(width, height);
          }
      }
      clearContext(ctx) {
          super.clearContext(ctx);
          this.document.screen.viewPort.removeCurrent();
      }
      /**
     * Resize SVG to fit in given size.
     * @param width
     * @param height
     * @param preserveAspectRatio
     */ resize(width) {
          let height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : width, preserveAspectRatio = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
          const widthAttr = this.getAttribute('width', true);
          const heightAttr = this.getAttribute('height', true);
          const viewBoxAttr = this.getAttribute('viewBox');
          const styleAttr = this.getAttribute('style');
          const originWidth = widthAttr.getNumber(0);
          const originHeight = heightAttr.getNumber(0);
          if (preserveAspectRatio) {
              if (typeof preserveAspectRatio === 'string') {
                  this.getAttribute('preserveAspectRatio', true).setValue(preserveAspectRatio);
              } else {
                  const preserveAspectRatioAttr = this.getAttribute('preserveAspectRatio');
                  if (preserveAspectRatioAttr.hasValue()) {
                      preserveAspectRatioAttr.setValue(preserveAspectRatioAttr.getString().replace(/^\s*(\S.*\S)\s*$/, '$1'));
                  }
              }
          }
          widthAttr.setValue(width);
          heightAttr.setValue(height);
          if (!viewBoxAttr.hasValue()) {
              viewBoxAttr.setValue("0 0 ".concat(originWidth || width, " ").concat(originHeight || height));
          }
          if (styleAttr.hasValue()) {
              const widthStyle = this.getStyle('width');
              const heightStyle = this.getStyle('height');
              if (widthStyle.hasValue()) {
                  widthStyle.setValue("".concat(width, "px"));
              }
              if (heightStyle.hasValue()) {
                  heightStyle.setValue("".concat(height, "px"));
              }
          }
      }
      constructor(...args){
          super(...args);
          this.type = 'svg';
          this.root = false;
      }
  }

  class RectElement extends PathElement {
      path(ctx) {
          const x = this.getAttribute('x').getPixels('x');
          const y = this.getAttribute('y').getPixels('y');
          const width = this.getStyle('width', false, true).getPixels('x');
          const height = this.getStyle('height', false, true).getPixels('y');
          const rxAttr = this.getAttribute('rx');
          const ryAttr = this.getAttribute('ry');
          let rx = rxAttr.getPixels('x');
          let ry = ryAttr.getPixels('y');
          if (rxAttr.hasValue() && !ryAttr.hasValue()) {
              ry = rx;
          }
          if (ryAttr.hasValue() && !rxAttr.hasValue()) {
              rx = ry;
          }
          rx = Math.min(rx, width / 2);
          ry = Math.min(ry, height / 2);
          if (ctx) {
              const KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
              ctx.beginPath() // always start the path so we don't fill prior paths
              ;
              if (height > 0 && width > 0) {
                  ctx.moveTo(x + rx, y);
                  ctx.lineTo(x + width - rx, y);
                  ctx.bezierCurveTo(x + width - rx + KAPPA * rx, y, x + width, y + ry - KAPPA * ry, x + width, y + ry);
                  ctx.lineTo(x + width, y + height - ry);
                  ctx.bezierCurveTo(x + width, y + height - ry + KAPPA * ry, x + width - rx + KAPPA * rx, y + height, x + width - rx, y + height);
                  ctx.lineTo(x + rx, y + height);
                  ctx.bezierCurveTo(x + rx - KAPPA * rx, y + height, x, y + height - ry + KAPPA * ry, x, y + height - ry);
                  ctx.lineTo(x, y + ry);
                  ctx.bezierCurveTo(x, y + ry - KAPPA * ry, x + rx - KAPPA * rx, y, x + rx, y);
                  ctx.closePath();
              }
          }
          return new BoundingBox(x, y, x + width, y + height);
      }
      getMarkers() {
          return null;
      }
      constructor(...args){
          super(...args);
          this.type = 'rect';
      }
  }

  class CircleElement extends PathElement {
      path(ctx) {
          const cx = this.getAttribute('cx').getPixels('x');
          const cy = this.getAttribute('cy').getPixels('y');
          const r = this.getAttribute('r').getPixels();
          if (ctx && r > 0) {
              ctx.beginPath();
              ctx.arc(cx, cy, r, 0, Math.PI * 2, false);
              ctx.closePath();
          }
          return new BoundingBox(cx - r, cy - r, cx + r, cy + r);
      }
      getMarkers() {
          return null;
      }
      constructor(...args){
          super(...args);
          this.type = 'circle';
      }
  }

  class EllipseElement extends PathElement {
      path(ctx) {
          const KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
          const rx = this.getAttribute('rx').getPixels('x');
          const ry = this.getAttribute('ry').getPixels('y');
          const cx = this.getAttribute('cx').getPixels('x');
          const cy = this.getAttribute('cy').getPixels('y');
          if (ctx && rx > 0 && ry > 0) {
              ctx.beginPath();
              ctx.moveTo(cx + rx, cy);
              ctx.bezierCurveTo(cx + rx, cy + KAPPA * ry, cx + KAPPA * rx, cy + ry, cx, cy + ry);
              ctx.bezierCurveTo(cx - KAPPA * rx, cy + ry, cx - rx, cy + KAPPA * ry, cx - rx, cy);
              ctx.bezierCurveTo(cx - rx, cy - KAPPA * ry, cx - KAPPA * rx, cy - ry, cx, cy - ry);
              ctx.bezierCurveTo(cx + KAPPA * rx, cy - ry, cx + rx, cy - KAPPA * ry, cx + rx, cy);
              ctx.closePath();
          }
          return new BoundingBox(cx - rx, cy - ry, cx + rx, cy + ry);
      }
      getMarkers() {
          return null;
      }
      constructor(...args){
          super(...args);
          this.type = 'ellipse';
      }
  }

  class LineElement extends PathElement {
      getPoints() {
          return [
              new Point(this.getAttribute('x1').getPixels('x'), this.getAttribute('y1').getPixels('y')),
              new Point(this.getAttribute('x2').getPixels('x'), this.getAttribute('y2').getPixels('y'))
          ];
      }
      path(ctx) {
          const [{ x: x0 , y: y0  }, { x: x1 , y: y1  }] = this.getPoints();
          if (ctx) {
              ctx.beginPath();
              ctx.moveTo(x0, y0);
              ctx.lineTo(x1, y1);
          }
          return new BoundingBox(x0, y0, x1, y1);
      }
      getMarkers() {
          const [p0, p1] = this.getPoints();
          const a = p0.angleTo(p1);
          return [
              [
                  p0,
                  a
              ],
              [
                  p1,
                  a
              ]
          ];
      }
      constructor(...args){
          super(...args);
          this.type = 'line';
      }
  }

  class PolylineElement extends PathElement {
      path(ctx) {
          const { points  } = this;
          const [{ x: x0 , y: y0  }] = points;
          const boundingBox = new BoundingBox(x0, y0);
          if (ctx) {
              ctx.beginPath();
              ctx.moveTo(x0, y0);
          }
          points.forEach((param)=>{
              let { x , y  } = param;
              boundingBox.addPoint(x, y);
              if (ctx) {
                  ctx.lineTo(x, y);
              }
          });
          return boundingBox;
      }
      getMarkers() {
          const { points  } = this;
          const lastIndex = points.length - 1;
          const markers = [];
          points.forEach((point, i)=>{
              if (i === lastIndex) {
                  return;
              }
              markers.push([
                  point,
                  point.angleTo(points[i + 1])
              ]);
          });
          if (markers.length > 0) {
              markers.push([
                  points[points.length - 1],
                  markers[markers.length - 1][1]
              ]);
          }
          return markers;
      }
      constructor(document, node, captureTextNodes){
          super(document, node, captureTextNodes);
          this.type = 'polyline';
          this.points = [];
          this.points = Point.parsePath(this.getAttribute('points').getString());
      }
  }

  class PolygonElement extends PolylineElement {
      path(ctx) {
          const boundingBox = super.path(ctx);
          const [{ x , y  }] = this.points;
          if (ctx) {
              ctx.lineTo(x, y);
              ctx.closePath();
          }
          return boundingBox;
      }
      constructor(...args){
          super(...args);
          this.type = 'polygon';
      }
  }

  class PatternElement extends Element {
      createPattern(ctx, _, parentOpacityProp) {
          const width = this.getStyle('width').getPixels('x', true);
          const height = this.getStyle('height').getPixels('y', true);
          // render me using a temporary svg element
          const patternSvg = new SVGElement(this.document, null);
          patternSvg.attributes.viewBox = new Property(this.document, 'viewBox', this.getAttribute('viewBox').getValue());
          patternSvg.attributes.width = new Property(this.document, 'width', "".concat(width, "px"));
          patternSvg.attributes.height = new Property(this.document, 'height', "".concat(height, "px"));
          patternSvg.attributes.transform = new Property(this.document, 'transform', this.getAttribute('patternTransform').getValue());
          patternSvg.children = this.children;
          const patternCanvas = this.document.createCanvas(width, height);
          const patternCtx = patternCanvas.getContext('2d');
          const xAttr = this.getAttribute('x');
          const yAttr = this.getAttribute('y');
          if (xAttr.hasValue() && yAttr.hasValue()) {
              patternCtx.translate(xAttr.getPixels('x', true), yAttr.getPixels('y', true));
          }
          if (parentOpacityProp.hasValue()) {
              this.styles['fill-opacity'] = parentOpacityProp;
          } else {
              Reflect.deleteProperty(this.styles, 'fill-opacity');
          }
          // render 3x3 grid so when we transform there's no white space on edges
          for(let x = -1; x <= 1; x++){
              for(let y = -1; y <= 1; y++){
                  patternCtx.save();
                  patternSvg.attributes.x = new Property(this.document, 'x', x * patternCanvas.width);
                  patternSvg.attributes.y = new Property(this.document, 'y', y * patternCanvas.height);
                  patternSvg.render(patternCtx);
                  patternCtx.restore();
              }
          }
          const pattern = ctx.createPattern(patternCanvas, 'repeat');
          return pattern;
      }
      constructor(...args){
          super(...args);
          this.type = 'pattern';
      }
  }

  class MarkerElement extends Element {
      render(ctx, point, angle) {
          if (!point) {
              return;
          }
          const { x , y  } = point;
          const orient = this.getAttribute('orient').getString('auto');
          const markerUnits = this.getAttribute('markerUnits').getString('strokeWidth');
          ctx.translate(x, y);
          if (orient === 'auto') {
              ctx.rotate(angle);
          }
          if (markerUnits === 'strokeWidth') {
              ctx.scale(ctx.lineWidth, ctx.lineWidth);
          }
          ctx.save();
          // render me using a temporary svg element
          const markerSvg = new SVGElement(this.document);
          markerSvg.type = this.type;
          markerSvg.attributes.viewBox = new Property(this.document, 'viewBox', this.getAttribute('viewBox').getValue());
          markerSvg.attributes.refX = new Property(this.document, 'refX', this.getAttribute('refX').getValue());
          markerSvg.attributes.refY = new Property(this.document, 'refY', this.getAttribute('refY').getValue());
          markerSvg.attributes.width = new Property(this.document, 'width', this.getAttribute('markerWidth').getValue());
          markerSvg.attributes.height = new Property(this.document, 'height', this.getAttribute('markerHeight').getValue());
          markerSvg.attributes.overflow = new Property(this.document, 'overflow', this.getAttribute('overflow').getValue());
          markerSvg.attributes.fill = new Property(this.document, 'fill', this.getAttribute('fill').getColor('black'));
          markerSvg.attributes.stroke = new Property(this.document, 'stroke', this.getAttribute('stroke').getValue('none'));
          markerSvg.children = this.children;
          markerSvg.render(ctx);
          ctx.restore();
          if (markerUnits === 'strokeWidth') {
              ctx.scale(1 / ctx.lineWidth, 1 / ctx.lineWidth);
          }
          if (orient === 'auto') {
              ctx.rotate(-angle);
          }
          ctx.translate(-x, -y);
      }
      constructor(...args){
          super(...args);
          this.type = 'marker';
      }
  }

  class DefsElement extends Element {
      render() {
      // NOOP
      }
      constructor(...args){
          super(...args);
          this.type = 'defs';
      }
  }

  class GElement extends RenderedElement {
      getBoundingBox(ctx) {
          const boundingBox = new BoundingBox();
          this.children.forEach((child)=>{
              boundingBox.addBoundingBox(child.getBoundingBox(ctx));
          });
          return boundingBox;
      }
      constructor(...args){
          super(...args);
          this.type = 'g';
      }
  }

  class GradientElement extends Element {
      getGradientUnits() {
          return this.getAttribute('gradientUnits').getString('objectBoundingBox');
      }
      createGradient(ctx, element, parentOpacityProp) {
          // eslint-disable-next-line @typescript-eslint/no-this-alias, consistent-this
          let stopsContainer = this;
          if (this.getHrefAttribute().hasValue()) {
              stopsContainer = this.getHrefAttribute().getDefinition();
              this.inheritStopContainer(stopsContainer);
          }
          const { stops  } = stopsContainer;
          const gradient = this.getGradient(ctx, element);
          if (!gradient) {
              return this.addParentOpacity(parentOpacityProp, stops[stops.length - 1].color);
          }
          stops.forEach((stop)=>{
              gradient.addColorStop(stop.offset, this.addParentOpacity(parentOpacityProp, stop.color));
          });
          if (this.getAttribute('gradientTransform').hasValue()) {
              // render as transformed pattern on temporary canvas
              const { document  } = this;
              const { MAX_VIRTUAL_PIXELS  } = Screen;
              const { viewPort  } = document.screen;
              const rootView = viewPort.getRoot();
              const rect = new RectElement(document);
              rect.attributes.x = new Property(document, 'x', -MAX_VIRTUAL_PIXELS / 3);
              rect.attributes.y = new Property(document, 'y', -MAX_VIRTUAL_PIXELS / 3);
              rect.attributes.width = new Property(document, 'width', MAX_VIRTUAL_PIXELS);
              rect.attributes.height = new Property(document, 'height', MAX_VIRTUAL_PIXELS);
              const group = new GElement(document);
              group.attributes.transform = new Property(document, 'transform', this.getAttribute('gradientTransform').getValue());
              group.children = [
                  rect
              ];
              const patternSvg = new SVGElement(document);
              patternSvg.attributes.x = new Property(document, 'x', 0);
              patternSvg.attributes.y = new Property(document, 'y', 0);
              patternSvg.attributes.width = new Property(document, 'width', rootView.width);
              patternSvg.attributes.height = new Property(document, 'height', rootView.height);
              patternSvg.children = [
                  group
              ];
              const patternCanvas = document.createCanvas(rootView.width, rootView.height);
              const patternCtx = patternCanvas.getContext('2d');
              patternCtx.fillStyle = gradient;
              patternSvg.render(patternCtx);
              return patternCtx.createPattern(patternCanvas, 'no-repeat');
          }
          return gradient;
      }
      inheritStopContainer(stopsContainer) {
          this.attributesToInherit.forEach((attributeToInherit)=>{
              if (!this.getAttribute(attributeToInherit).hasValue() && stopsContainer.getAttribute(attributeToInherit).hasValue()) {
                  this.getAttribute(attributeToInherit, true).setValue(stopsContainer.getAttribute(attributeToInherit).getValue());
              }
          });
      }
      addParentOpacity(parentOpacityProp, color) {
          if (parentOpacityProp.hasValue()) {
              const colorProp = new Property(this.document, 'color', color);
              return colorProp.addOpacity(parentOpacityProp).getColor();
          }
          return color;
      }
      constructor(document, node, captureTextNodes){
          super(document, node, captureTextNodes);
          this.attributesToInherit = [
              'gradientUnits'
          ];
          this.stops = [];
          const { stops , children  } = this;
          children.forEach((child)=>{
              if (child.type === 'stop') {
                  stops.push(child);
              }
          });
      }
  }

  class LinearGradientElement extends GradientElement {
      getGradient(ctx, element) {
          const isBoundingBoxUnits = this.getGradientUnits() === 'objectBoundingBox';
          const boundingBox = isBoundingBoxUnits ? element.getBoundingBox(ctx) : null;
          if (isBoundingBoxUnits && !boundingBox) {
              return null;
          }
          if (!this.getAttribute('x1').hasValue() && !this.getAttribute('y1').hasValue() && !this.getAttribute('x2').hasValue() && !this.getAttribute('y2').hasValue()) {
              this.getAttribute('x1', true).setValue(0);
              this.getAttribute('y1', true).setValue(0);
              this.getAttribute('x2', true).setValue(1);
              this.getAttribute('y2', true).setValue(0);
          }
          const x1 = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute('x1').getNumber() : this.getAttribute('x1').getPixels('x');
          const y1 = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute('y1').getNumber() : this.getAttribute('y1').getPixels('y');
          const x2 = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute('x2').getNumber() : this.getAttribute('x2').getPixels('x');
          const y2 = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute('y2').getNumber() : this.getAttribute('y2').getPixels('y');
          if (x1 === x2 && y1 === y2) {
              return null;
          }
          return ctx.createLinearGradient(x1, y1, x2, y2);
      }
      constructor(document, node, captureTextNodes){
          super(document, node, captureTextNodes);
          this.type = 'linearGradient';
          this.attributesToInherit.push('x1', 'y1', 'x2', 'y2');
      }
  }

  class RadialGradientElement extends GradientElement {
      getGradient(ctx, element) {
          const isBoundingBoxUnits = this.getGradientUnits() === 'objectBoundingBox';
          const boundingBox = element.getBoundingBox(ctx);
          if (isBoundingBoxUnits && !boundingBox) {
              return null;
          }
          if (!this.getAttribute('cx').hasValue()) {
              this.getAttribute('cx', true).setValue('50%');
          }
          if (!this.getAttribute('cy').hasValue()) {
              this.getAttribute('cy', true).setValue('50%');
          }
          if (!this.getAttribute('r').hasValue()) {
              this.getAttribute('r', true).setValue('50%');
          }
          const cx = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute('cx').getNumber() : this.getAttribute('cx').getPixels('x');
          const cy = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute('cy').getNumber() : this.getAttribute('cy').getPixels('y');
          let fx = cx;
          let fy = cy;
          if (this.getAttribute('fx').hasValue()) {
              fx = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute('fx').getNumber() : this.getAttribute('fx').getPixels('x');
          }
          if (this.getAttribute('fy').hasValue()) {
              fy = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute('fy').getNumber() : this.getAttribute('fy').getPixels('y');
          }
          const r = isBoundingBoxUnits ? (boundingBox.width + boundingBox.height) / 2 * this.getAttribute('r').getNumber() : this.getAttribute('r').getPixels();
          const fr = this.getAttribute('fr').getPixels();
          return ctx.createRadialGradient(fx, fy, fr, cx, cy, r);
      }
      constructor(document, node, captureTextNodes){
          super(document, node, captureTextNodes);
          this.type = 'radialGradient';
          this.attributesToInherit.push('cx', 'cy', 'r', 'fx', 'fy', 'fr');
      }
  }

  class StopElement extends Element {
      constructor(document, node, captureTextNodes){
          super(document, node, captureTextNodes);
          this.type = 'stop';
          const offset = Math.max(0, Math.min(1, this.getAttribute('offset').getNumber()));
          const stopOpacity = this.getStyle('stop-opacity');
          let stopColor = this.getStyle('stop-color', true);
          if (stopColor.getString() === '') {
              stopColor.setValue('#000');
          }
          if (stopOpacity.hasValue()) {
              stopColor = stopColor.addOpacity(stopOpacity);
          }
          this.offset = offset;
          this.color = stopColor.getColor();
      }
  }

  class AnimateElement extends Element {
      getProperty() {
          const attributeType = this.getAttribute('attributeType').getString();
          const attributeName = this.getAttribute('attributeName').getString();
          if (attributeType === 'CSS') {
              return this.parent.getStyle(attributeName, true);
          }
          return this.parent.getAttribute(attributeName, true);
      }
      calcValue() {
          const { initialUnits  } = this;
          const { progress , from , to  } = this.getProgress();
          // tween value linearly
          let newValue = from.getNumber() + (to.getNumber() - from.getNumber()) * progress;
          if (initialUnits === '%') {
              newValue *= 100 // numValue() returns 0-1 whereas properties are 0-100
              ;
          }
          return "".concat(newValue).concat(initialUnits);
      }
      update(delta) {
          const { parent  } = this;
          const prop = this.getProperty();
          // set initial value
          if (!this.initialValue) {
              this.initialValue = prop.getString();
              this.initialUnits = prop.getUnits();
          }
          // if we're past the end time
          if (this.duration > this.maxDuration) {
              const fill = this.getAttribute('fill').getString('remove');
              // loop for indefinitely repeating animations
              if (this.getAttribute('repeatCount').getString() === 'indefinite' || this.getAttribute('repeatDur').getString() === 'indefinite') {
                  this.duration = 0;
              } else if (fill === 'freeze' && !this.frozen) {
                  this.frozen = true;
                  if (parent && prop) {
                      parent.animationFrozen = true;
                      parent.animationFrozenValue = prop.getString();
                  }
              } else if (fill === 'remove' && !this.removed) {
                  this.removed = true;
                  if (parent && prop) {
                      prop.setValue(parent.animationFrozen ? parent.animationFrozenValue : this.initialValue);
                  }
                  return true;
              }
              return false;
          }
          this.duration += delta;
          // if we're past the begin time
          let updated = false;
          if (this.begin < this.duration) {
              let newValue = this.calcValue() // tween
              ;
              const typeAttr = this.getAttribute('type');
              if (typeAttr.hasValue()) {
                  // for transform, etc.
                  const type = typeAttr.getString();
                  newValue = "".concat(type, "(").concat(newValue, ")");
              }
              prop.setValue(newValue);
              updated = true;
          }
          return updated;
      }
      getProgress() {
          const { document , values  } = this;
          let progress = (this.duration - this.begin) / (this.maxDuration - this.begin);
          let from;
          let to;
          if (values.hasValue()) {
              const p = progress * (values.getValue().length - 1);
              const lb = Math.floor(p);
              const ub = Math.ceil(p);
              let value;
              value = values.getValue()[lb];
              from = new Property(document, 'from', value ? parseFloat(value) : 0);
              value = values.getValue()[ub];
              to = new Property(document, 'to', value ? parseFloat(value) : 0);
              progress = (p - lb) / (ub - lb);
          } else {
              from = this.from;
              to = this.to;
          }
          return {
              progress,
              from,
              to
          };
      }
      constructor(document, node, captureTextNodes){
          super(document, node, captureTextNodes);
          this.type = 'animate';
          this.duration = 0;
          this.initialUnits = '';
          this.removed = false;
          this.frozen = false;
          document.screen.animations.push(this);
          this.begin = this.getAttribute('begin').getMilliseconds();
          this.maxDuration = this.begin + this.getAttribute('dur').getMilliseconds();
          this.from = this.getAttribute('from');
          this.to = this.getAttribute('to');
          this.values = new Property(document, 'values', null);
          const valuesAttr = this.getAttribute('values');
          if (valuesAttr.hasValue()) {
              this.values.setValue(valuesAttr.getString().split(';'));
          }
      }
  }

  class AnimateColorElement extends AnimateElement {
      calcValue() {
          const { progress , from , to  } = this.getProgress();
          const colorFrom = new rgbcolor(from.getColor());
          const colorTo = new rgbcolor(to.getColor());
          if (colorFrom.ok && colorTo.ok) {
              // tween color linearly
              const r = colorFrom.r + (colorTo.r - colorFrom.r) * progress;
              const g = colorFrom.g + (colorTo.g - colorFrom.g) * progress;
              const b = colorFrom.b + (colorTo.b - colorFrom.b) * progress;
              // ? alpha
              return "rgb(".concat(Math.floor(r), ", ").concat(Math.floor(g), ", ").concat(Math.floor(b), ")");
          }
          return this.getAttribute('from').getColor();
      }
      constructor(...args){
          super(...args);
          this.type = 'animateColor';
      }
  }

  class AnimateTransformElement extends AnimateElement {
      calcValue() {
          const { progress , from: from1 , to: to1  } = this.getProgress();
          // tween value linearly
          const transformFrom = toNumbers(from1.getString());
          const transformTo = toNumbers(to1.getString());
          const newValue = transformFrom.map((from, i)=>{
              const to = transformTo[i];
              return from + (to - from) * progress;
          }).join(' ');
          return newValue;
      }
      constructor(...args){
          super(...args);
          this.type = 'animateTransform';
      }
  }

  class FontFaceElement extends Element {
      constructor(document, node, captureTextNodes){
          super(document, node, captureTextNodes);
          this.type = 'font-face';
          this.ascent = this.getAttribute('ascent').getNumber();
          this.descent = this.getAttribute('descent').getNumber();
          this.unitsPerEm = this.getAttribute('units-per-em').getNumber();
      }
  }

  class GlyphElement extends PathElement {
      constructor(document, node, captureTextNodes){
          super(document, node, captureTextNodes);
          this.type = 'glyph';
          this.horizAdvX = this.getAttribute('horiz-adv-x').getNumber();
          this.unicode = this.getAttribute('unicode').getString();
          this.arabicForm = this.getAttribute('arabic-form').getString();
      }
  }

  class MissingGlyphElement extends GlyphElement {
      constructor(...args){
          super(...args);
          this.type = 'missing-glyph';
          this.horizAdvX = 0;
      }
  }

  class FontElement extends Element {
      render() {
      // NO RENDER
      }
      constructor(document, node, captureTextNodes){
          super(document, node, captureTextNodes);
          this.type = 'font';
          this.isArabic = false;
          this.glyphs = {};
          this.arabicGlyphs = {};
          this.isRTL = false;
          this.horizAdvX = this.getAttribute('horiz-adv-x').getNumber();
          const { definitions  } = document;
          const { children  } = this;
          for (const child of children){
              if (child instanceof FontFaceElement) {
                  this.fontFace = child;
                  const fontFamilyStyle = child.getStyle('font-family');
                  if (fontFamilyStyle.hasValue()) {
                      definitions[fontFamilyStyle.getString()] = this;
                  }
              } else if (child instanceof MissingGlyphElement) {
                  this.missingGlyph = child;
              } else if (child instanceof GlyphElement) {
                  if (child.arabicForm) {
                      this.isRTL = true;
                      this.isArabic = true;
                      const arabicGlyph = this.arabicGlyphs[child.unicode];
                      if (typeof arabicGlyph === 'undefined') {
                          this.arabicGlyphs[child.unicode] = {
                              [child.arabicForm]: child
                          };
                      } else {
                          arabicGlyph[child.arabicForm] = child;
                      }
                  } else {
                      this.glyphs[child.unicode] = child;
                  }
              }
          }
      }
  }

  class TRefElement extends TextElement {
      getText() {
          const element = this.getHrefAttribute().getDefinition();
          if (element) {
              const firstChild = element.children[0];
              if (firstChild) {
                  return firstChild.getText();
              }
          }
          return '';
      }
      constructor(...args){
          super(...args);
          this.type = 'tref';
      }
  }

  class AElement extends TextElement {
      getText() {
          return this.text;
      }
      renderChildren(ctx) {
          if (this.hasText) {
              // render as text element
              super.renderChildren(ctx);
              const { document , x , y  } = this;
              const { mouse  } = document.screen;
              const fontSize = new Property(document, 'fontSize', Font.parse(document.ctx.font).fontSize);
              // Do not calc bounding box if mouse is not working.
              if (mouse.isWorking()) {
                  mouse.checkBoundingBox(this, new BoundingBox(x, y - fontSize.getPixels('y'), x + this.measureText(ctx), y));
              }
          } else if (this.children.length > 0) {
              // render as temporary group
              const g = new GElement(this.document);
              g.children = this.children;
              g.parent = this;
              g.render(ctx);
          }
      }
      onClick() {
          const { window  } = this.document;
          if (window) {
              window.open(this.getHrefAttribute().getString());
          }
      }
      onMouseMove() {
          const ctx = this.document.ctx;
          ctx.canvas.style.cursor = 'pointer';
      }
      constructor(document, node1, captureTextNodes){
          super(document, node1, captureTextNodes);
          this.type = 'a';
          const { childNodes  } = node1;
          const firstChild = childNodes[0];
          const hasText = childNodes.length > 0 && Array.from(childNodes).every((node)=>node.nodeType === 3
          );
          this.hasText = hasText;
          this.text = hasText ? this.getTextFromNode(firstChild) : '';
      }
  }

  class TextPathElement extends TextElement {
      getText() {
          return this.text;
      }
      path(ctx) {
          const { dataArray  } = this;
          if (ctx) {
              ctx.beginPath();
          }
          dataArray.forEach((param)=>{
              let { type , points  } = param;
              switch(type){
                  case PathParser.LINE_TO:
                      if (ctx) {
                          ctx.lineTo(points[0], points[1]);
                      }
                      break;
                  case PathParser.MOVE_TO:
                      if (ctx) {
                          ctx.moveTo(points[0], points[1]);
                      }
                      break;
                  case PathParser.CURVE_TO:
                      if (ctx) {
                          ctx.bezierCurveTo(points[0], points[1], points[2], points[3], points[4], points[5]);
                      }
                      break;
                  case PathParser.QUAD_TO:
                      if (ctx) {
                          ctx.quadraticCurveTo(points[0], points[1], points[2], points[3]);
                      }
                      break;
                  case PathParser.ARC:
                      {
                          const [cx, cy, rx, ry, theta, dTheta, psi, fs] = points;
                          const r = rx > ry ? rx : ry;
                          const scaleX = rx > ry ? 1 : rx / ry;
                          const scaleY = rx > ry ? ry / rx : 1;
                          if (ctx) {
                              ctx.translate(cx, cy);
                              ctx.rotate(psi);
                              ctx.scale(scaleX, scaleY);
                              ctx.arc(0, 0, r, theta, theta + dTheta, Boolean(1 - fs));
                              ctx.scale(1 / scaleX, 1 / scaleY);
                              ctx.rotate(-psi);
                              ctx.translate(-cx, -cy);
                          }
                          break;
                      }
                  case PathParser.CLOSE_PATH:
                      if (ctx) {
                          ctx.closePath();
                      }
                      break;
              }
          });
      }
      renderChildren(ctx) {
          this.setTextData(ctx);
          ctx.save();
          const textDecoration = this.parent.getStyle('text-decoration').getString();
          const fontSize = this.getFontSize();
          const { glyphInfo  } = this;
          const fill = ctx.fillStyle;
          if (textDecoration === 'underline') {
              ctx.beginPath();
          }
          glyphInfo.forEach((glyph, i)=>{
              const { p0 , p1 , rotation , text: partialText  } = glyph;
              ctx.save();
              ctx.translate(p0.x, p0.y);
              ctx.rotate(rotation);
              if (ctx.fillStyle) {
                  ctx.fillText(partialText, 0, 0);
              }
              if (ctx.strokeStyle) {
                  ctx.strokeText(partialText, 0, 0);
              }
              ctx.restore();
              if (textDecoration === 'underline') {
                  if (i === 0) {
                      ctx.moveTo(p0.x, p0.y + fontSize / 8);
                  }
                  ctx.lineTo(p1.x, p1.y + fontSize / 5);
              }
          // // To assist with debugging visually, uncomment following
          //
          // ctx.beginPath();
          // if (i % 2)
          //   ctx.strokeStyle = 'red';
          // else
          //   ctx.strokeStyle = 'green';
          // ctx.moveTo(p0.x, p0.y);
          // ctx.lineTo(p1.x, p1.y);
          // ctx.stroke();
          // ctx.closePath();
          });
          if (textDecoration === 'underline') {
              ctx.lineWidth = fontSize / 20;
              ctx.strokeStyle = fill;
              ctx.stroke();
              ctx.closePath();
          }
          ctx.restore();
      }
      getLetterSpacingAt() {
          let idx = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
          return this.letterSpacingCache[idx] || 0;
      }
      findSegmentToFitChar(ctx, anchor, textFullWidth, fullPathWidth, spacesNumber, inputOffset, dy, c, charI) {
          let offset = inputOffset;
          let glyphWidth = this.measureText(ctx, c);
          if (c === ' ' && anchor === 'justify' && textFullWidth < fullPathWidth) {
              glyphWidth += (fullPathWidth - textFullWidth) / spacesNumber;
          }
          if (charI > -1) {
              offset += this.getLetterSpacingAt(charI);
          }
          const splineStep = this.textHeight / 20;
          const p0 = this.getEquidistantPointOnPath(offset, splineStep, 0);
          const p1 = this.getEquidistantPointOnPath(offset + glyphWidth, splineStep, 0);
          const segment = {
              p0,
              p1
          };
          const rotation = p0 && p1 ? Math.atan2(p1.y - p0.y, p1.x - p0.x) : 0;
          if (dy) {
              const dyX = Math.cos(Math.PI / 2 + rotation) * dy;
              const dyY = Math.cos(-rotation) * dy;
              segment.p0 = {
                  ...p0,
                  x: p0.x + dyX,
                  y: p0.y + dyY
              };
              segment.p1 = {
                  ...p1,
                  x: p1.x + dyX,
                  y: p1.y + dyY
              };
          }
          offset += glyphWidth;
          return {
              offset,
              segment,
              rotation
          };
      }
      measureText(ctx, text) {
          const { measuresCache  } = this;
          const targetText = text || this.getText();
          if (measuresCache.has(targetText)) {
              return measuresCache.get(targetText);
          }
          const measure = this.measureTargetText(ctx, targetText);
          measuresCache.set(targetText, measure);
          return measure;
      }
      // This method supposes what all custom fonts already loaded.
      // If some font will be loaded after this method call, <textPath> will not be rendered correctly.
      // You need to call this method manually to update glyphs cache.
      setTextData(ctx) {
          if (this.glyphInfo) {
              return;
          }
          const renderText = this.getText();
          const chars = renderText.split('');
          const spacesNumber = renderText.split(' ').length - 1;
          const dx = this.parent.getAttribute('dx').split().map((_)=>_.getPixels('x')
          );
          const dy = this.parent.getAttribute('dy').getPixels('y');
          const anchor = this.parent.getStyle('text-anchor').getString('start');
          const thisSpacing = this.getStyle('letter-spacing');
          const parentSpacing = this.parent.getStyle('letter-spacing');
          let letterSpacing = 0;
          if (!thisSpacing.hasValue() || thisSpacing.getValue() === 'inherit') {
              letterSpacing = parentSpacing.getPixels();
          } else if (thisSpacing.hasValue()) {
              if (thisSpacing.getValue() !== 'initial' && thisSpacing.getValue() !== 'unset') {
                  letterSpacing = thisSpacing.getPixels();
              }
          }
          // fill letter-spacing cache
          const letterSpacingCache = [];
          const textLen = renderText.length;
          this.letterSpacingCache = letterSpacingCache;
          for(let i1 = 0; i1 < textLen; i1++){
              letterSpacingCache.push(typeof dx[i1] !== 'undefined' ? dx[i1] : letterSpacing);
          }
          const dxSum = letterSpacingCache.reduce((acc, cur, i)=>i === 0 ? 0 : acc + cur || 0
          , 0);
          const textWidth = this.measureText(ctx);
          const textFullWidth = Math.max(textWidth + dxSum, 0);
          this.textWidth = textWidth;
          this.textHeight = this.getFontSize();
          this.glyphInfo = [];
          const fullPathWidth = this.getPathLength();
          const startOffset = this.getStyle('startOffset').getNumber(0) * fullPathWidth;
          let offset = 0;
          if (anchor === 'middle' || anchor === 'center') {
              offset = -textFullWidth / 2;
          }
          if (anchor === 'end' || anchor === 'right') {
              offset = -textFullWidth;
          }
          offset += startOffset;
          chars.forEach((char, i)=>{
              // Find such segment what distance between p0 and p1 is approx. width of glyph
              const { offset: nextOffset , segment , rotation  } = this.findSegmentToFitChar(ctx, anchor, textFullWidth, fullPathWidth, spacesNumber, offset, dy, char, i);
              offset = nextOffset;
              if (!segment.p0 || !segment.p1) {
                  return;
              }
              // const width = this.getLineLength(
              //   segment.p0.x,
              //   segment.p0.y,
              //   segment.p1.x,
              //   segment.p1.y
              // );
              // Note: Since glyphs are rendered one at a time, any kerning pair data built into the font will not be used.
              // Can foresee having a rough pair table built in that the developer can override as needed.
              // Or use "dx" attribute of the <text> node as a naive replacement
              // const kern = 0;
              // placeholder for future implementation
              // const midpoint = this.getPointOnLine(
              //   kern + width / 2.0,
              //   segment.p0.x, segment.p0.y, segment.p1.x, segment.p1.y
              // );
              this.glyphInfo.push({
                  // transposeX: midpoint.x,
                  // transposeY: midpoint.y,
                  text: chars[i],
                  p0: segment.p0,
                  p1: segment.p1,
                  rotation
              });
          });
      }
      parsePathData(path) {
          this.pathLength = -1 // reset path length
          ;
          if (!path) {
              return [];
          }
          const pathCommands = [];
          const { pathParser  } = path;
          pathParser.reset();
          // convert l, H, h, V, and v to L
          while(!pathParser.isEnd()){
              const { current  } = pathParser;
              const startX = current ? current.x : 0;
              const startY = current ? current.y : 0;
              const command = pathParser.next();
              let nextCommandType = command.type;
              let points = [];
              switch(command.type){
                  case PathParser.MOVE_TO:
                      this.pathM(pathParser, points);
                      break;
                  case PathParser.LINE_TO:
                      nextCommandType = this.pathL(pathParser, points);
                      break;
                  case PathParser.HORIZ_LINE_TO:
                      nextCommandType = this.pathH(pathParser, points);
                      break;
                  case PathParser.VERT_LINE_TO:
                      nextCommandType = this.pathV(pathParser, points);
                      break;
                  case PathParser.CURVE_TO:
                      this.pathC(pathParser, points);
                      break;
                  case PathParser.SMOOTH_CURVE_TO:
                      nextCommandType = this.pathS(pathParser, points);
                      break;
                  case PathParser.QUAD_TO:
                      this.pathQ(pathParser, points);
                      break;
                  case PathParser.SMOOTH_QUAD_TO:
                      nextCommandType = this.pathT(pathParser, points);
                      break;
                  case PathParser.ARC:
                      points = this.pathA(pathParser);
                      break;
                  case PathParser.CLOSE_PATH:
                      PathElement.pathZ(pathParser);
                      break;
              }
              if (command.type !== PathParser.CLOSE_PATH) {
                  pathCommands.push({
                      type: nextCommandType,
                      points,
                      start: {
                          x: startX,
                          y: startY
                      },
                      pathLength: this.calcLength(startX, startY, nextCommandType, points)
                  });
              } else {
                  pathCommands.push({
                      type: PathParser.CLOSE_PATH,
                      points: [],
                      pathLength: 0
                  });
              }
          }
          return pathCommands;
      }
      pathM(pathParser, points) {
          const { x , y  } = PathElement.pathM(pathParser).point;
          points.push(x, y);
      }
      pathL(pathParser, points) {
          const { x , y  } = PathElement.pathL(pathParser).point;
          points.push(x, y);
          return PathParser.LINE_TO;
      }
      pathH(pathParser, points) {
          const { x , y  } = PathElement.pathH(pathParser).point;
          points.push(x, y);
          return PathParser.LINE_TO;
      }
      pathV(pathParser, points) {
          const { x , y  } = PathElement.pathV(pathParser).point;
          points.push(x, y);
          return PathParser.LINE_TO;
      }
      pathC(pathParser, points) {
          const { point , controlPoint , currentPoint  } = PathElement.pathC(pathParser);
          points.push(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
      }
      pathS(pathParser, points) {
          const { point , controlPoint , currentPoint  } = PathElement.pathS(pathParser);
          points.push(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
          return PathParser.CURVE_TO;
      }
      pathQ(pathParser, points) {
          const { controlPoint , currentPoint  } = PathElement.pathQ(pathParser);
          points.push(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
      }
      pathT(pathParser, points) {
          const { controlPoint , currentPoint  } = PathElement.pathT(pathParser);
          points.push(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
          return PathParser.QUAD_TO;
      }
      pathA(pathParser) {
          let { rX , rY , sweepFlag , xAxisRotation , centp , a1 , ad  } = PathElement.pathA(pathParser);
          if (sweepFlag === 0 && ad > 0) {
              ad -= 2 * Math.PI;
          }
          if (sweepFlag === 1 && ad < 0) {
              ad += 2 * Math.PI;
          }
          return [
              centp.x,
              centp.y,
              rX,
              rY,
              a1,
              ad,
              xAxisRotation,
              sweepFlag
          ];
      }
      calcLength(x, y, commandType, points) {
          let len = 0;
          let p1 = null;
          let p2 = null;
          let t = 0;
          switch(commandType){
              case PathParser.LINE_TO:
                  return this.getLineLength(x, y, points[0], points[1]);
              case PathParser.CURVE_TO:
                  // Approximates by breaking curve into 100 line segments
                  len = 0;
                  p1 = this.getPointOnCubicBezier(0, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
                  for(t = 0.01; t <= 1; t += 0.01){
                      p2 = this.getPointOnCubicBezier(t, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
                      len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
                      p1 = p2;
                  }
                  return len;
              case PathParser.QUAD_TO:
                  // Approximates by breaking curve into 100 line segments
                  len = 0;
                  p1 = this.getPointOnQuadraticBezier(0, x, y, points[0], points[1], points[2], points[3]);
                  for(t = 0.01; t <= 1; t += 0.01){
                      p2 = this.getPointOnQuadraticBezier(t, x, y, points[0], points[1], points[2], points[3]);
                      len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
                      p1 = p2;
                  }
                  return len;
              case PathParser.ARC:
                  {
                      // Approximates by breaking curve into line segments
                      len = 0;
                      const start = points[4];
                      // 4 = theta
                      const dTheta = points[5];
                      // 5 = dTheta
                      const end = points[4] + dTheta;
                      let inc = Math.PI / 180;
                      // 1 degree resolution
                      if (Math.abs(start - end) < inc) {
                          inc = Math.abs(start - end);
                      }
                      // Note: for purpose of calculating arc length, not going to worry about rotating X-axis by angle psi
                      p1 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], start, 0);
                      if (dTheta < 0) {
                          for(t = start - inc; t > end; t -= inc){
                              p2 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
                              len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
                              p1 = p2;
                          }
                      } else {
                          for(t = start + inc; t < end; t += inc){
                              p2 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
                              len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
                              p1 = p2;
                          }
                      }
                      p2 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], end, 0);
                      len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
                      return len;
                  }
          }
          return 0;
      }
      getPointOnLine(dist, p1x, p1y, p2x, p2y) {
          let fromX = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : p1x, fromY = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : p1y;
          const m = (p2y - p1y) / (p2x - p1x + PSEUDO_ZERO);
          let run = Math.sqrt(dist * dist / (1 + m * m));
          if (p2x < p1x) {
              run *= -1;
          }
          let rise = m * run;
          let pt = null;
          if (p2x === p1x) {
              pt = {
                  x: fromX,
                  y: fromY + rise
              };
          } else if ((fromY - p1y) / (fromX - p1x + PSEUDO_ZERO) === m) {
              pt = {
                  x: fromX + run,
                  y: fromY + rise
              };
          } else {
              let ix = 0;
              let iy = 0;
              const len = this.getLineLength(p1x, p1y, p2x, p2y);
              if (len < PSEUDO_ZERO) {
                  return null;
              }
              let u = (fromX - p1x) * (p2x - p1x) + (fromY - p1y) * (p2y - p1y);
              u /= len * len;
              ix = p1x + u * (p2x - p1x);
              iy = p1y + u * (p2y - p1y);
              const pRise = this.getLineLength(fromX, fromY, ix, iy);
              const pRun = Math.sqrt(dist * dist - pRise * pRise);
              run = Math.sqrt(pRun * pRun / (1 + m * m));
              if (p2x < p1x) {
                  run *= -1;
              }
              rise = m * run;
              pt = {
                  x: ix + run,
                  y: iy + rise
              };
          }
          return pt;
      }
      getPointOnPath(distance) {
          const fullLen = this.getPathLength();
          let cumulativePathLength = 0;
          let p = null;
          if (distance < -0.00005 || distance - 0.00005 > fullLen) {
              return null;
          }
          const { dataArray  } = this;
          for (const command of dataArray){
              if (command && (command.pathLength < 0.00005 || cumulativePathLength + command.pathLength + 0.00005 < distance)) {
                  cumulativePathLength += command.pathLength;
                  continue;
              }
              const delta = distance - cumulativePathLength;
              let currentT = 0;
              switch(command.type){
                  case PathParser.LINE_TO:
                      p = this.getPointOnLine(delta, command.start.x, command.start.y, command.points[0], command.points[1], command.start.x, command.start.y);
                      break;
                  case PathParser.ARC:
                      {
                          const start = command.points[4];
                          // 4 = theta
                          const dTheta = command.points[5];
                          // 5 = dTheta
                          const end = command.points[4] + dTheta;
                          currentT = start + delta / command.pathLength * dTheta;
                          if (dTheta < 0 && currentT < end || dTheta >= 0 && currentT > end) {
                              break;
                          }
                          p = this.getPointOnEllipticalArc(command.points[0], command.points[1], command.points[2], command.points[3], currentT, command.points[6]);
                          break;
                      }
                  case PathParser.CURVE_TO:
                      currentT = delta / command.pathLength;
                      if (currentT > 1) {
                          currentT = 1;
                      }
                      p = this.getPointOnCubicBezier(currentT, command.start.x, command.start.y, command.points[0], command.points[1], command.points[2], command.points[3], command.points[4], command.points[5]);
                      break;
                  case PathParser.QUAD_TO:
                      currentT = delta / command.pathLength;
                      if (currentT > 1) {
                          currentT = 1;
                      }
                      p = this.getPointOnQuadraticBezier(currentT, command.start.x, command.start.y, command.points[0], command.points[1], command.points[2], command.points[3]);
                      break;
              }
              if (p) {
                  return p;
              }
              break;
          }
          return null;
      }
      getLineLength(x1, y1, x2, y2) {
          return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      }
      getPathLength() {
          if (this.pathLength === -1) {
              this.pathLength = this.dataArray.reduce((length, command)=>command.pathLength > 0 ? length + command.pathLength : length
              , 0);
          }
          return this.pathLength;
      }
      getPointOnCubicBezier(pct, p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y) {
          const x = p4x * CB1(pct) + p3x * CB2(pct) + p2x * CB3(pct) + p1x * CB4(pct);
          const y = p4y * CB1(pct) + p3y * CB2(pct) + p2y * CB3(pct) + p1y * CB4(pct);
          return {
              x,
              y
          };
      }
      getPointOnQuadraticBezier(pct, p1x, p1y, p2x, p2y, p3x, p3y) {
          const x = p3x * QB1(pct) + p2x * QB2(pct) + p1x * QB3(pct);
          const y = p3y * QB1(pct) + p2y * QB2(pct) + p1y * QB3(pct);
          return {
              x,
              y
          };
      }
      getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi) {
          const cosPsi = Math.cos(psi);
          const sinPsi = Math.sin(psi);
          const pt = {
              x: rx * Math.cos(theta),
              y: ry * Math.sin(theta)
          };
          return {
              x: cx + (pt.x * cosPsi - pt.y * sinPsi),
              y: cy + (pt.x * sinPsi + pt.y * cosPsi)
          };
      }
      // TODO need some optimisations. possibly build cache only for curved segments?
      buildEquidistantCache(inputStep, inputPrecision) {
          const fullLen = this.getPathLength();
          const precision = inputPrecision || 0.25 // accuracy vs performance
          ;
          const step = inputStep || fullLen / 100;
          if (!this.equidistantCache || this.equidistantCache.step !== step || this.equidistantCache.precision !== precision) {
              // Prepare cache
              this.equidistantCache = {
                  step,
                  precision,
                  points: []
              };
              // Calculate points
              let s = 0;
              for(let l = 0; l <= fullLen; l += precision){
                  const p0 = this.getPointOnPath(l);
                  const p1 = this.getPointOnPath(l + precision);
                  if (!p0 || !p1) {
                      continue;
                  }
                  s += this.getLineLength(p0.x, p0.y, p1.x, p1.y);
                  if (s >= step) {
                      this.equidistantCache.points.push({
                          x: p0.x,
                          y: p0.y,
                          distance: l
                      });
                      s -= step;
                  }
              }
          }
      }
      getEquidistantPointOnPath(targetDistance, step, precision) {
          this.buildEquidistantCache(step, precision);
          if (targetDistance < 0 || targetDistance - this.getPathLength() > 0.00005) {
              return null;
          }
          const idx = Math.round(targetDistance / this.getPathLength() * (this.equidistantCache.points.length - 1));
          return this.equidistantCache.points[idx] || null;
      }
      constructor(document, node, captureTextNodes){
          super(document, node, captureTextNodes);
          this.type = 'textPath';
          this.textWidth = 0;
          this.textHeight = 0;
          this.pathLength = -1;
          this.glyphInfo = null;
          this.letterSpacingCache = [];
          this.measuresCache = new Map([
              [
                  '',
                  0
              ]
          ]);
          const pathElement = this.getHrefAttribute().getDefinition();
          this.text = this.getTextFromNode();
          this.dataArray = this.parsePathData(pathElement);
      }
  }

  // groups: 1: mime-type (+ charset), 2: mime-type (w/o charset), 3: charset, 4: base64?, 5: body
  const dataUriRegex = /^\s*data:(([^/,;]+\/[^/,;]+)(?:;([^,;=]+=[^,;=]+))?)?(?:;(base64))?,(.*)$/i;
  class ImageElement extends RenderedElement {
      async loadImage(href) {
          try {
              const image = await this.document.createImage(href);
              this.image = image;
          } catch (err) {
              console.error("Error while loading image \"".concat(href, "\":"), err);
          }
          this.loaded = true;
      }
      async loadSvg(href) {
          const match = dataUriRegex.exec(href);
          if (match) {
              const data = match[5];
              if (data) {
                  if (match[4] === 'base64') {
                      this.image = atob(data);
                  } else {
                      this.image = decodeURIComponent(data);
                  }
              }
          } else {
              try {
                  const response = await this.document.fetch(href);
                  const svg = await response.text();
                  this.image = svg;
              } catch (err) {
                  console.error("Error while loading image \"".concat(href, "\":"), err);
              }
          }
          this.loaded = true;
      }
      renderChildren(ctx) {
          const { document , image , loaded  } = this;
          const x = this.getAttribute('x').getPixels('x');
          const y = this.getAttribute('y').getPixels('y');
          const width = this.getStyle('width').getPixels('x');
          const height = this.getStyle('height').getPixels('y');
          if (!loaded || !image || !width || !height) {
              return;
          }
          ctx.save();
          ctx.translate(x, y);
          if (typeof image === 'string') {
              const subDocument = document.canvg.forkString(ctx, image, {
                  ignoreMouse: true,
                  ignoreAnimation: true,
                  ignoreDimensions: true,
                  ignoreClear: true,
                  offsetX: 0,
                  offsetY: 0,
                  scaleWidth: width,
                  scaleHeight: height
              });
              const { documentElement  } = subDocument.document;
              if (documentElement) {
                  documentElement.parent = this;
              }
              void subDocument.render();
          } else {
              document.setViewBox({
                  ctx,
                  aspectRatio: this.getAttribute('preserveAspectRatio').getString(),
                  width,
                  desiredWidth: image.width,
                  height,
                  desiredHeight: image.height
              });
              if (this.loaded) {
                  if (!('complete' in image) || image.complete) {
                      ctx.drawImage(image, 0, 0);
                  }
              }
          }
          ctx.restore();
      }
      getBoundingBox() {
          const x = this.getAttribute('x').getPixels('x');
          const y = this.getAttribute('y').getPixels('y');
          const width = this.getStyle('width').getPixels('x');
          const height = this.getStyle('height').getPixels('y');
          return new BoundingBox(x, y, x + width, y + height);
      }
      constructor(document, node, captureTextNodes){
          super(document, node, captureTextNodes);
          this.type = 'image';
          this.loaded = false;
          const href = this.getHrefAttribute().getString();
          if (!href) {
              return;
          }
          const isSvg = href.endsWith('.svg') || /^\s*data:image\/svg\+xml/i.test(href);
          document.images.push(this);
          if (!isSvg) {
              void this.loadImage(href);
          } else {
              void this.loadSvg(href);
          }
      }
  }

  class SymbolElement extends RenderedElement {
      render(_) {
      // NO RENDER
      }
      constructor(...args){
          super(...args);
          this.type = 'symbol';
      }
  }

  class SVGFontLoader {
      async load(fontFamily, url) {
          try {
              const { document  } = this;
              const svgDocument = await document.canvg.parser.load(url);
              const fonts = svgDocument.getElementsByTagName('font');
              Array.from(fonts).forEach((fontNode)=>{
                  const font = document.createElement(fontNode);
                  document.definitions[fontFamily] = font;
              });
          } catch (err) {
              console.error("Error while loading font \"".concat(url, "\":"), err);
          }
          this.loaded = true;
      }
      constructor(document){
          this.document = document;
          this.loaded = false;
          document.fonts.push(this);
      }
  }

  class StyleElement extends Element {
      constructor(document, node, captureTextNodes){
          super(document, node, captureTextNodes);
          this.type = 'style';
          const css = compressSpaces(Array.from(node.childNodes)// NEED TEST
          .map((_)=>_.textContent
          ).join('').replace(/(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, '') // remove comments
          .replace(/@import.*;/g, '') // remove imports
          );
          const cssDefs = css.split('}');
          cssDefs.forEach((_1)=>{
              const def = _1.trim();
              if (!def) {
                  return;
              }
              const cssParts = def.split('{');
              const cssClasses = cssParts[0].split(',');
              const cssProps = cssParts[1].split(';');
              cssClasses.forEach((_)=>{
                  const cssClass = _.trim();
                  if (!cssClass) {
                      return;
                  }
                  const props = document.styles[cssClass] || {};
                  cssProps.forEach((cssProp)=>{
                      const prop = cssProp.indexOf(':');
                      const name = cssProp.substr(0, prop).trim();
                      const value = cssProp.substr(prop + 1, cssProp.length - prop).trim();
                      if (name && value) {
                          props[name] = new Property(document, name, value);
                      }
                  });
                  document.styles[cssClass] = props;
                  document.stylesSpecificity[cssClass] = getSelectorSpecificity(cssClass);
                  if (cssClass === '@font-face') {
                      const fontFamily = props['font-family'].getString().replace(/"|'/g, '');
                      const srcs = props.src.getString().split(',');
                      srcs.forEach((src)=>{
                          if (src.indexOf('format("svg")') > 0) {
                              const url = parseExternalUrl(src);
                              if (url) {
                                  void new SVGFontLoader(document).load(fontFamily, url);
                              }
                          }
                      });
                  }
              });
          });
      }
  }
  StyleElement.parseExternalUrl = parseExternalUrl;

  class UseElement extends RenderedElement {
      setContext(ctx) {
          super.setContext(ctx);
          const xAttr = this.getAttribute('x');
          const yAttr = this.getAttribute('y');
          if (xAttr.hasValue()) {
              ctx.translate(xAttr.getPixels('x'), 0);
          }
          if (yAttr.hasValue()) {
              ctx.translate(0, yAttr.getPixels('y'));
          }
      }
      path(ctx) {
          const { element  } = this;
          if (element) {
              element.path(ctx);
          }
      }
      renderChildren(ctx) {
          const { document , element  } = this;
          if (element) {
              let tempSvg = element;
              if (element.type === 'symbol') {
                  // render me using a temporary svg element in symbol cases (http://www.w3.org/TR/SVG/struct.html#UseElement)
                  tempSvg = new SVGElement(document);
                  tempSvg.attributes.viewBox = new Property(document, 'viewBox', element.getAttribute('viewBox').getString());
                  tempSvg.attributes.preserveAspectRatio = new Property(document, 'preserveAspectRatio', element.getAttribute('preserveAspectRatio').getString());
                  tempSvg.attributes.overflow = new Property(document, 'overflow', element.getAttribute('overflow').getString());
                  tempSvg.children = element.children;
                  // element is still the parent of the children
                  element.styles.opacity = new Property(document, 'opacity', this.calculateOpacity());
              }
              if (tempSvg.type === 'svg') {
                  const widthStyle = this.getStyle('width', false, true);
                  const heightStyle = this.getStyle('height', false, true);
                  // if symbol or svg, inherit width/height from me
                  if (widthStyle.hasValue()) {
                      tempSvg.attributes.width = new Property(document, 'width', widthStyle.getString());
                  }
                  if (heightStyle.hasValue()) {
                      tempSvg.attributes.height = new Property(document, 'height', heightStyle.getString());
                  }
              }
              const oldParent = tempSvg.parent;
              tempSvg.parent = this;
              tempSvg.render(ctx);
              tempSvg.parent = oldParent;
          }
      }
      getBoundingBox(ctx) {
          const { element  } = this;
          if (element) {
              return element.getBoundingBox(ctx);
          }
          return null;
      }
      elementTransform() {
          const { document , element  } = this;
          if (!element) {
              return null;
          }
          return Transform.fromElement(document, element);
      }
      get element() {
          if (!this.cachedElement) {
              this.cachedElement = this.getHrefAttribute().getDefinition();
          }
          return this.cachedElement;
      }
      constructor(...args){
          super(...args);
          this.type = 'use';
      }
  }

  function imGet(img, x, y, width, _height, rgba) {
      return img[y * width * 4 + x * 4 + rgba];
  }
  function imSet(img, x, y, width, _height, rgba, val) {
      img[y * width * 4 + x * 4 + rgba] = val;
  }
  function m(matrix, i, v) {
      const mi = matrix[i];
      return mi * v;
  }
  function c(a, m1, m2, m3) {
      return m1 + Math.cos(a) * m2 + Math.sin(a) * m3;
  }
  class FeColorMatrixElement extends Element {
      apply(ctx, _x, _y, width, height) {
          // assuming x==0 && y==0 for now
          const { includeOpacity , matrix  } = this;
          const srcData = ctx.getImageData(0, 0, width, height);
          for(let y = 0; y < height; y++){
              for(let x = 0; x < width; x++){
                  const r = imGet(srcData.data, x, y, width, height, 0);
                  const g = imGet(srcData.data, x, y, width, height, 1);
                  const b = imGet(srcData.data, x, y, width, height, 2);
                  const a = imGet(srcData.data, x, y, width, height, 3);
                  let nr = m(matrix, 0, r) + m(matrix, 1, g) + m(matrix, 2, b) + m(matrix, 3, a) + m(matrix, 4, 1);
                  let ng = m(matrix, 5, r) + m(matrix, 6, g) + m(matrix, 7, b) + m(matrix, 8, a) + m(matrix, 9, 1);
                  let nb = m(matrix, 10, r) + m(matrix, 11, g) + m(matrix, 12, b) + m(matrix, 13, a) + m(matrix, 14, 1);
                  let na = m(matrix, 15, r) + m(matrix, 16, g) + m(matrix, 17, b) + m(matrix, 18, a) + m(matrix, 19, 1);
                  if (includeOpacity) {
                      nr = 0;
                      ng = 0;
                      nb = 0;
                      na *= a / 255;
                  }
                  imSet(srcData.data, x, y, width, height, 0, nr);
                  imSet(srcData.data, x, y, width, height, 1, ng);
                  imSet(srcData.data, x, y, width, height, 2, nb);
                  imSet(srcData.data, x, y, width, height, 3, na);
              }
          }
          ctx.clearRect(0, 0, width, height);
          ctx.putImageData(srcData, 0, 0);
      }
      constructor(document, node, captureTextNodes){
          super(document, node, captureTextNodes);
          this.type = 'feColorMatrix';
          let matrix = toNumbers(this.getAttribute('values').getString());
          switch(this.getAttribute('type').getString('matrix')){
              case 'saturate':
                  {
                      const s = matrix[0];
                      /* eslint-disable array-element-newline */ matrix = [
                          0.213 + 0.787 * s,
                          0.715 - 0.715 * s,
                          0.072 - 0.072 * s,
                          0,
                          0,
                          0.213 - 0.213 * s,
                          0.715 + 0.285 * s,
                          0.072 - 0.072 * s,
                          0,
                          0,
                          0.213 - 0.213 * s,
                          0.715 - 0.715 * s,
                          0.072 + 0.928 * s,
                          0,
                          0,
                          0,
                          0,
                          0,
                          1,
                          0,
                          0,
                          0,
                          0,
                          0,
                          1
                      ];
                      break;
                  }
              case 'hueRotate':
                  {
                      const a = matrix[0] * Math.PI / 180;
                      /* eslint-disable array-element-newline */ matrix = [
                          c(a, 0.213, 0.787, -0.213),
                          c(a, 0.715, -0.715, -0.715),
                          c(a, 0.072, -0.072, 0.928),
                          0,
                          0,
                          c(a, 0.213, -0.213, 0.143),
                          c(a, 0.715, 0.285, 0.14),
                          c(a, 0.072, -0.072, -0.283),
                          0,
                          0,
                          c(a, 0.213, -0.213, -0.787),
                          c(a, 0.715, -0.715, 0.715),
                          c(a, 0.072, 0.928, 0.072),
                          0,
                          0,
                          0,
                          0,
                          0,
                          1,
                          0,
                          0,
                          0,
                          0,
                          0,
                          1
                      ];
                      break;
                  }
              case 'luminanceToAlpha':
                  /* eslint-disable array-element-newline */ matrix = [
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0.2125,
                      0.7154,
                      0.0721,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1
                  ];
                  break;
          }
          this.matrix = matrix;
          this.includeOpacity = this.getAttribute('includeOpacity').hasValue();
      }
  }

  class MaskElement extends Element {
      apply(ctx, element) {
          const { document  } = this;
          // render as temp svg
          let x = this.getAttribute('x').getPixels('x');
          let y = this.getAttribute('y').getPixels('y');
          let width = this.getStyle('width').getPixels('x');
          let height = this.getStyle('height').getPixels('y');
          if (!width && !height) {
              const boundingBox = new BoundingBox();
              this.children.forEach((child)=>{
                  boundingBox.addBoundingBox(child.getBoundingBox(ctx));
              });
              x = Math.floor(boundingBox.x1);
              y = Math.floor(boundingBox.y1);
              width = Math.floor(boundingBox.width);
              height = Math.floor(boundingBox.height);
          }
          const ignoredStyles = this.removeStyles(element, MaskElement.ignoreStyles);
          const maskCanvas = document.createCanvas(x + width, y + height);
          const maskCtx = maskCanvas.getContext('2d');
          document.screen.setDefaults(maskCtx);
          this.renderChildren(maskCtx);
          // convert mask to alpha with a fake node
          // TODO: refactor out apply from feColorMatrix
          new FeColorMatrixElement(document, {
              nodeType: 1,
              childNodes: [],
              attributes: [
                  {
                      nodeName: 'type',
                      value: 'luminanceToAlpha'
                  },
                  {
                      nodeName: 'includeOpacity',
                      value: 'true'
                  }
              ]
          }).apply(maskCtx, 0, 0, x + width, y + height);
          const tmpCanvas = document.createCanvas(x + width, y + height);
          const tmpCtx = tmpCanvas.getContext('2d');
          document.screen.setDefaults(tmpCtx);
          element.render(tmpCtx);
          tmpCtx.globalCompositeOperation = 'destination-in';
          tmpCtx.fillStyle = maskCtx.createPattern(maskCanvas, 'no-repeat');
          tmpCtx.fillRect(0, 0, x + width, y + height);
          ctx.fillStyle = tmpCtx.createPattern(tmpCanvas, 'no-repeat');
          ctx.fillRect(0, 0, x + width, y + height);
          // reassign mask
          this.restoreStyles(element, ignoredStyles);
      }
      render(_) {
      // NO RENDER
      }
      constructor(...args){
          super(...args);
          this.type = 'mask';
      }
  }
  MaskElement.ignoreStyles = [
      'mask',
      'transform',
      'clip-path'
  ];

  const noop = ()=>{
  // NOOP
  };
  class ClipPathElement extends Element {
      apply(ctx) {
          const { document  } = this;
          const contextProto = Reflect.getPrototypeOf(ctx);
          const { beginPath , closePath  } = ctx;
          if (contextProto) {
              contextProto.beginPath = noop;
              contextProto.closePath = noop;
          }
          Reflect.apply(beginPath, ctx, []);
          this.children.forEach((child)=>{
              if (!('path' in child)) {
                  return;
              }
              let transform = 'elementTransform' in child ? child.elementTransform() : null // handle <use />
              ;
              if (!transform) {
                  transform = Transform.fromElement(document, child);
              }
              if (transform) {
                  transform.apply(ctx);
              }
              child.path(ctx);
              if (contextProto) {
                  contextProto.closePath = closePath;
              }
              if (transform) {
                  transform.unapply(ctx);
              }
          });
          Reflect.apply(closePath, ctx, []);
          ctx.clip();
          if (contextProto) {
              contextProto.beginPath = beginPath;
              contextProto.closePath = closePath;
          }
      }
      render(_) {
      // NO RENDER
      }
      constructor(...args){
          super(...args);
          this.type = 'clipPath';
      }
  }

  class FilterElement extends Element {
      apply(ctx, element) {
          // render as temp svg
          const { document , children  } = this;
          const boundingBox = 'getBoundingBox' in element ? element.getBoundingBox(ctx) : null;
          if (!boundingBox) {
              return;
          }
          let px = 0;
          let py = 0;
          children.forEach((child)=>{
              const efd = child.extraFilterDistance || 0;
              px = Math.max(px, efd);
              py = Math.max(py, efd);
          });
          const width = Math.floor(boundingBox.width);
          const height = Math.floor(boundingBox.height);
          const tmpCanvasWidth = width + 2 * px;
          const tmpCanvasHeight = height + 2 * py;
          if (tmpCanvasWidth < 1 || tmpCanvasHeight < 1) {
              return;
          }
          const x = Math.floor(boundingBox.x);
          const y = Math.floor(boundingBox.y);
          const ignoredStyles = this.removeStyles(element, FilterElement.ignoreStyles);
          const tmpCanvas = document.createCanvas(tmpCanvasWidth, tmpCanvasHeight);
          const tmpCtx = tmpCanvas.getContext('2d');
          document.screen.setDefaults(tmpCtx);
          tmpCtx.translate(-x + px, -y + py);
          element.render(tmpCtx);
          // apply filters
          children.forEach((child)=>{
              if (typeof child.apply === 'function') {
                  child.apply(tmpCtx, 0, 0, tmpCanvasWidth, tmpCanvasHeight);
              }
          });
          // render on me
          ctx.drawImage(tmpCanvas, 0, 0, tmpCanvasWidth, tmpCanvasHeight, x - px, y - py, tmpCanvasWidth, tmpCanvasHeight);
          this.restoreStyles(element, ignoredStyles);
      }
      render(_) {
      // NO RENDER
      }
      constructor(...args){
          super(...args);
          this.type = 'filter';
      }
  }
  FilterElement.ignoreStyles = [
      'filter',
      'transform',
      'clip-path'
  ];

  class FeDropShadowElement extends Element {
      apply(_, _x, _y, _width, _height) {
      // TODO: implement
      }
      constructor(document, node, captureTextNodes){
          super(document, node, captureTextNodes);
          this.type = 'feDropShadow';
          this.addStylesFromStyleDefinition();
      }
  }

  class FeMorphologyElement extends Element {
      apply(_, _x, _y, _width, _height) {
      // TODO: implement
      }
      constructor(...args){
          super(...args);
          this.type = 'feMorphology';
      }
  }

  class FeCompositeElement extends Element {
      apply(_, _x, _y, _width, _height) {
      // TODO: implement
      }
      constructor(...args){
          super(...args);
          this.type = 'feComposite';
      }
  }

  function _typeof(obj1) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function(obj) {
              return typeof obj;
          };
      } else {
          _typeof = function(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
          };
      }
      return _typeof(obj1);
  }
  function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
      }
  }
  /* eslint-disable no-bitwise -- used for calculations */ /* eslint-disable unicorn/prefer-query-selector -- aiming at
    backward-compatibility */ /**
  * StackBlur - a fast almost Gaussian Blur For Canvas
  *
  * In case you find this class useful - especially in commercial projects -
  * I am not totally unhappy for a small donation to my PayPal account
  * mario@quasimondo.de
  *
  * Or support me on flattr:
  * {@link https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript}.
  *
  * @module StackBlur
  * @author Mario Klingemann
  * Contact: mario@quasimondo.com
  * Website: {@link http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html}
  * Twitter: @quasimondo
  *
  * @copyright (c) 2010 Mario Klingemann
  *
  * Permission is hereby granted, free of charge, to any person
  * obtaining a copy of this software and associated documentation
  * files (the "Software"), to deal in the Software without
  * restriction, including without limitation the rights to use,
  * copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the
  * Software is furnished to do so, subject to the following
  * conditions:
  *
  * The above copyright notice and this permission notice shall be
  * included in all copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  * OTHER DEALINGS IN THE SOFTWARE.
  */ var mulTable = [
      512,
      512,
      456,
      512,
      328,
      456,
      335,
      512,
      405,
      328,
      271,
      456,
      388,
      335,
      292,
      512,
      454,
      405,
      364,
      328,
      298,
      271,
      496,
      456,
      420,
      388,
      360,
      335,
      312,
      292,
      273,
      512,
      482,
      454,
      428,
      405,
      383,
      364,
      345,
      328,
      312,
      298,
      284,
      271,
      259,
      496,
      475,
      456,
      437,
      420,
      404,
      388,
      374,
      360,
      347,
      335,
      323,
      312,
      302,
      292,
      282,
      273,
      265,
      512,
      497,
      482,
      468,
      454,
      441,
      428,
      417,
      405,
      394,
      383,
      373,
      364,
      354,
      345,
      337,
      328,
      320,
      312,
      305,
      298,
      291,
      284,
      278,
      271,
      265,
      259,
      507,
      496,
      485,
      475,
      465,
      456,
      446,
      437,
      428,
      420,
      412,
      404,
      396,
      388,
      381,
      374,
      367,
      360,
      354,
      347,
      341,
      335,
      329,
      323,
      318,
      312,
      307,
      302,
      297,
      292,
      287,
      282,
      278,
      273,
      269,
      265,
      261,
      512,
      505,
      497,
      489,
      482,
      475,
      468,
      461,
      454,
      447,
      441,
      435,
      428,
      422,
      417,
      411,
      405,
      399,
      394,
      389,
      383,
      378,
      373,
      368,
      364,
      359,
      354,
      350,
      345,
      341,
      337,
      332,
      328,
      324,
      320,
      316,
      312,
      309,
      305,
      301,
      298,
      294,
      291,
      287,
      284,
      281,
      278,
      274,
      271,
      268,
      265,
      262,
      259,
      257,
      507,
      501,
      496,
      491,
      485,
      480,
      475,
      470,
      465,
      460,
      456,
      451,
      446,
      442,
      437,
      433,
      428,
      424,
      420,
      416,
      412,
      408,
      404,
      400,
      396,
      392,
      388,
      385,
      381,
      377,
      374,
      370,
      367,
      363,
      360,
      357,
      354,
      350,
      347,
      344,
      341,
      338,
      335,
      332,
      329,
      326,
      323,
      320,
      318,
      315,
      312,
      310,
      307,
      304,
      302,
      299,
      297,
      294,
      292,
      289,
      287,
      285,
      282,
      280,
      278,
      275,
      273,
      271,
      269,
      267,
      265,
      263,
      261,
      259
  ];
  var shgTable = [
      9,
      11,
      12,
      13,
      13,
      14,
      14,
      15,
      15,
      15,
      15,
      16,
      16,
      16,
      16,
      17,
      17,
      17,
      17,
      17,
      17,
      17,
      18,
      18,
      18,
      18,
      18,
      18,
      18,
      18,
      18,
      19,
      19,
      19,
      19,
      19,
      19,
      19,
      19,
      19,
      19,
      19,
      19,
      19,
      19,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24
  ];
  /**
   * @param {string|HTMLCanvasElement} canvas
   * @param {Integer} topX
   * @param {Integer} topY
   * @param {Integer} width
   * @param {Integer} height
   * @throws {Error|TypeError}
   * @returns {ImageData} See {@link https://html.spec.whatwg.org/multipage/canvas.html#imagedata}
   */ function getImageDataFromCanvas(canvas, topX, topY, width, height) {
      if (typeof canvas === 'string') {
          canvas = document.getElementById(canvas);
      }
      if (!canvas || _typeof(canvas) !== 'object' || !('getContext' in canvas)) {
          throw new TypeError('Expecting canvas with `getContext` method ' + 'in processCanvasRGB(A) calls!');
      }
      var context = canvas.getContext('2d');
      try {
          return context.getImageData(topX, topY, width, height);
      } catch (e) {
          throw new Error('unable to access image data: ' + e);
      }
  }
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {Integer} topX
   * @param {Integer} topY
   * @param {Integer} width
   * @param {Integer} height
   * @param {Float} radius
   * @returns {undefined}
   */ function processCanvasRGBA(canvas, topX, topY, width, height, radius) {
      if (isNaN(radius) || radius < 1) {
          return;
      }
      radius |= 0;
      var imageData = getImageDataFromCanvas(canvas, topX, topY, width, height);
      imageData = processImageDataRGBA(imageData, topX, topY, width, height, radius);
      canvas.getContext('2d').putImageData(imageData, topX, topY);
  }
  /**
   * @param {ImageData} imageData
   * @param {Integer} topX
   * @param {Integer} topY
   * @param {Integer} width
   * @param {Integer} height
   * @param {Float} radius
   * @returns {ImageData}
   */ function processImageDataRGBA(imageData, topX, topY, width, height, radius) {
      var pixels = imageData.data;
      var div = 2 * radius + 1; // const w4 = width << 2;
      var widthMinus1 = width - 1;
      var heightMinus1 = height - 1;
      var radiusPlus1 = radius + 1;
      var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
      var stackStart = new BlurStack();
      var stack = stackStart;
      var stackEnd;
      for(var i = 1; i < div; i++){
          stack = stack.next = new BlurStack();
          if (i === radiusPlus1) {
              stackEnd = stack;
          }
      }
      stack.next = stackStart;
      var stackIn = null, stackOut = null, yw = 0, yi = 0;
      var mulSum = mulTable[radius];
      var shgSum = shgTable[radius];
      for(var y = 0; y < height; y++){
          stack = stackStart;
          var pr = pixels[yi], pg = pixels[yi + 1], pb = pixels[yi + 2], pa = pixels[yi + 3];
          for(var _i = 0; _i < radiusPlus1; _i++){
              stack.r = pr;
              stack.g = pg;
              stack.b = pb;
              stack.a = pa;
              stack = stack.next;
          }
          var rInSum = 0, gInSum = 0, bInSum = 0, aInSum = 0, rOutSum = radiusPlus1 * pr, gOutSum = radiusPlus1 * pg, bOutSum = radiusPlus1 * pb, aOutSum = radiusPlus1 * pa, rSum = sumFactor * pr, gSum = sumFactor * pg, bSum = sumFactor * pb, aSum = sumFactor * pa;
          for(var _i2 = 1; _i2 < radiusPlus1; _i2++){
              var p = yi + ((widthMinus1 < _i2 ? widthMinus1 : _i2) << 2);
              var r = pixels[p], g = pixels[p + 1], b = pixels[p + 2], a = pixels[p + 3];
              var rbs = radiusPlus1 - _i2;
              rSum += (stack.r = r) * rbs;
              gSum += (stack.g = g) * rbs;
              bSum += (stack.b = b) * rbs;
              aSum += (stack.a = a) * rbs;
              rInSum += r;
              gInSum += g;
              bInSum += b;
              aInSum += a;
              stack = stack.next;
          }
          stackIn = stackStart;
          stackOut = stackEnd;
          for(var x = 0; x < width; x++){
              var paInitial = aSum * mulSum >> shgSum;
              pixels[yi + 3] = paInitial;
              if (paInitial !== 0) {
                  var _a2 = 255 / paInitial;
                  pixels[yi] = (rSum * mulSum >> shgSum) * _a2;
                  pixels[yi + 1] = (gSum * mulSum >> shgSum) * _a2;
                  pixels[yi + 2] = (bSum * mulSum >> shgSum) * _a2;
              } else {
                  pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
              }
              rSum -= rOutSum;
              gSum -= gOutSum;
              bSum -= bOutSum;
              aSum -= aOutSum;
              rOutSum -= stackIn.r;
              gOutSum -= stackIn.g;
              bOutSum -= stackIn.b;
              aOutSum -= stackIn.a;
              var _p = x + radius + 1;
              _p = yw + (_p < widthMinus1 ? _p : widthMinus1) << 2;
              rInSum += stackIn.r = pixels[_p];
              gInSum += stackIn.g = pixels[_p + 1];
              bInSum += stackIn.b = pixels[_p + 2];
              aInSum += stackIn.a = pixels[_p + 3];
              rSum += rInSum;
              gSum += gInSum;
              bSum += bInSum;
              aSum += aInSum;
              stackIn = stackIn.next;
              var _stackOut = stackOut, _r = _stackOut.r, _g = _stackOut.g, _b = _stackOut.b, _a = _stackOut.a;
              rOutSum += _r;
              gOutSum += _g;
              bOutSum += _b;
              aOutSum += _a;
              rInSum -= _r;
              gInSum -= _g;
              bInSum -= _b;
              aInSum -= _a;
              stackOut = stackOut.next;
              yi += 4;
          }
          yw += width;
      }
      for(var _x = 0; _x < width; _x++){
          yi = _x << 2;
          var _pr = pixels[yi], _pg = pixels[yi + 1], _pb = pixels[yi + 2], _pa = pixels[yi + 3], _rOutSum = radiusPlus1 * _pr, _gOutSum = radiusPlus1 * _pg, _bOutSum = radiusPlus1 * _pb, _aOutSum = radiusPlus1 * _pa, _rSum = sumFactor * _pr, _gSum = sumFactor * _pg, _bSum = sumFactor * _pb, _aSum = sumFactor * _pa;
          stack = stackStart;
          for(var _i3 = 0; _i3 < radiusPlus1; _i3++){
              stack.r = _pr;
              stack.g = _pg;
              stack.b = _pb;
              stack.a = _pa;
              stack = stack.next;
          }
          var yp = width;
          var _gInSum = 0, _bInSum = 0, _aInSum = 0, _rInSum = 0;
          for(var _i4 = 1; _i4 <= radius; _i4++){
              yi = yp + _x << 2;
              var _rbs = radiusPlus1 - _i4;
              _rSum += (stack.r = _pr = pixels[yi]) * _rbs;
              _gSum += (stack.g = _pg = pixels[yi + 1]) * _rbs;
              _bSum += (stack.b = _pb = pixels[yi + 2]) * _rbs;
              _aSum += (stack.a = _pa = pixels[yi + 3]) * _rbs;
              _rInSum += _pr;
              _gInSum += _pg;
              _bInSum += _pb;
              _aInSum += _pa;
              stack = stack.next;
              if (_i4 < heightMinus1) {
                  yp += width;
              }
          }
          yi = _x;
          stackIn = stackStart;
          stackOut = stackEnd;
          for(var _y = 0; _y < height; _y++){
              var _p2 = yi << 2;
              pixels[_p2 + 3] = _pa = _aSum * mulSum >> shgSum;
              if (_pa > 0) {
                  _pa = 255 / _pa;
                  pixels[_p2] = (_rSum * mulSum >> shgSum) * _pa;
                  pixels[_p2 + 1] = (_gSum * mulSum >> shgSum) * _pa;
                  pixels[_p2 + 2] = (_bSum * mulSum >> shgSum) * _pa;
              } else {
                  pixels[_p2] = pixels[_p2 + 1] = pixels[_p2 + 2] = 0;
              }
              _rSum -= _rOutSum;
              _gSum -= _gOutSum;
              _bSum -= _bOutSum;
              _aSum -= _aOutSum;
              _rOutSum -= stackIn.r;
              _gOutSum -= stackIn.g;
              _bOutSum -= stackIn.b;
              _aOutSum -= stackIn.a;
              _p2 = _x + ((_p2 = _y + radiusPlus1) < heightMinus1 ? _p2 : heightMinus1) * width << 2;
              _rSum += _rInSum += stackIn.r = pixels[_p2];
              _gSum += _gInSum += stackIn.g = pixels[_p2 + 1];
              _bSum += _bInSum += stackIn.b = pixels[_p2 + 2];
              _aSum += _aInSum += stackIn.a = pixels[_p2 + 3];
              stackIn = stackIn.next;
              _rOutSum += _pr = stackOut.r;
              _gOutSum += _pg = stackOut.g;
              _bOutSum += _pb = stackOut.b;
              _aOutSum += _pa = stackOut.a;
              _rInSum -= _pr;
              _gInSum -= _pg;
              _bInSum -= _pb;
              _aInSum -= _pa;
              stackOut = stackOut.next;
              yi += width;
          }
      }
      return imageData;
  }
  /**
   *
   */ var BlurStack = /**
   * Set properties.
   */ function BlurStack1() {
      _classCallCheck(this, BlurStack1);
      this.r = 0;
      this.g = 0;
      this.b = 0;
      this.a = 0;
      this.next = null;
  };

  class FeGaussianBlurElement extends Element {
      apply(ctx, x, y, width, height) {
          const { document , blurRadius  } = this;
          const body = document.window ? document.window.document.body : null;
          const canvas = ctx.canvas;
          // StackBlur requires canvas be on document
          canvas.id = document.getUniqueId();
          if (body) {
              canvas.style.display = 'none';
              body.appendChild(canvas);
          }
          processCanvasRGBA(canvas, x, y, width, height, blurRadius);
          if (body) {
              body.removeChild(canvas);
          }
      }
      constructor(document, node, captureTextNodes){
          super(document, node, captureTextNodes);
          this.type = 'feGaussianBlur';
          this.blurRadius = Math.floor(this.getAttribute('stdDeviation').getNumber());
          this.extraFilterDistance = this.blurRadius;
      }
  }

  class TitleElement extends Element {
      constructor(...args){
          super(...args);
          this.type = 'title';
      }
  }

  class DescElement extends Element {
      constructor(...args){
          super(...args);
          this.type = 'desc';
      }
  }

  const elements = {
      'svg': SVGElement,
      'rect': RectElement,
      'circle': CircleElement,
      'ellipse': EllipseElement,
      'line': LineElement,
      'polyline': PolylineElement,
      'polygon': PolygonElement,
      'path': PathElement,
      'pattern': PatternElement,
      'marker': MarkerElement,
      'defs': DefsElement,
      'linearGradient': LinearGradientElement,
      'radialGradient': RadialGradientElement,
      'stop': StopElement,
      'animate': AnimateElement,
      'animateColor': AnimateColorElement,
      'animateTransform': AnimateTransformElement,
      'font': FontElement,
      'font-face': FontFaceElement,
      'missing-glyph': MissingGlyphElement,
      'glyph': GlyphElement,
      'text': TextElement,
      'tspan': TSpanElement,
      'tref': TRefElement,
      'a': AElement,
      'textPath': TextPathElement,
      'image': ImageElement,
      'g': GElement,
      'symbol': SymbolElement,
      'style': StyleElement,
      'use': UseElement,
      'mask': MaskElement,
      'clipPath': ClipPathElement,
      'filter': FilterElement,
      'feDropShadow': FeDropShadowElement,
      'feMorphology': FeMorphologyElement,
      'feComposite': FeCompositeElement,
      'feColorMatrix': FeColorMatrixElement,
      'feGaussianBlur': FeGaussianBlurElement,
      'title': TitleElement,
      'desc': DescElement
  };

  function createCanvas(width, height) {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      return canvas;
  }
  async function createImage(src) {
      let anonymousCrossOrigin = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      const image = document.createElement('img');
      if (anonymousCrossOrigin) {
          image.crossOrigin = 'Anonymous';
      }
      return new Promise((resolve, reject)=>{
          image.onload = ()=>{
              resolve(image);
          };
          image.onerror = (_event, _source, _lineno, _colno, error)=>{
              reject(error);
          };
          image.src = src;
      });
  }
  const DEFAULT_EM_SIZE = 12;
  class Document {
      bindCreateImage(createImage1, anonymousCrossOrigin) {
          if (typeof anonymousCrossOrigin === 'boolean') {
              return (source, forceAnonymousCrossOrigin)=>createImage1(source, typeof forceAnonymousCrossOrigin === 'boolean' ? forceAnonymousCrossOrigin : anonymousCrossOrigin)
              ;
          }
          return createImage1;
      }
      get window() {
          return this.screen.window;
      }
      get fetch() {
          return this.screen.fetch;
      }
      get ctx() {
          return this.screen.ctx;
      }
      get emSize() {
          const { emSizeStack  } = this;
          return emSizeStack[emSizeStack.length - 1] || DEFAULT_EM_SIZE;
      }
      set emSize(value) {
          const { emSizeStack  } = this;
          emSizeStack.push(value);
      }
      popEmSize() {
          const { emSizeStack  } = this;
          emSizeStack.pop();
      }
      getUniqueId() {
          return "canvg".concat(++this.uniqueId);
      }
      isImagesLoaded() {
          return this.images.every((_)=>_.loaded
          );
      }
      isFontsLoaded() {
          return this.fonts.every((_)=>_.loaded
          );
      }
      createDocumentElement(document) {
          const documentElement = this.createElement(document.documentElement);
          documentElement.root = true;
          documentElement.addStylesFromStyleDefinition();
          this.documentElement = documentElement;
          return documentElement;
      }
      createElement(node) {
          const elementType = node.nodeName.replace(/^[^:]+:/, '');
          const ElementType = Document.elementTypes[elementType];
          if (ElementType) {
              return new ElementType(this, node);
          }
          return new UnknownElement(this, node);
      }
      createTextNode(node) {
          return new TextNode(this, node);
      }
      setViewBox(config) {
          this.screen.setViewBox({
              document: this,
              ...config
          });
      }
      constructor(canvg, { rootEmSize =DEFAULT_EM_SIZE , emSize =DEFAULT_EM_SIZE , createCanvas: createCanvas1 = Document.createCanvas , createImage: createImage2 = Document.createImage , anonymousCrossOrigin  } = {}){
          this.canvg = canvg;
          this.definitions = {};
          this.styles = {};
          this.stylesSpecificity = {};
          this.images = [];
          this.fonts = [];
          this.emSizeStack = [];
          this.uniqueId = 0;
          this.screen = canvg.screen;
          this.rootEmSize = rootEmSize;
          this.emSize = emSize;
          this.createCanvas = createCanvas1;
          this.createImage = this.bindCreateImage(createImage2, anonymousCrossOrigin);
          this.screen.wait(()=>this.isImagesLoaded()
          );
          this.screen.wait(()=>this.isFontsLoaded()
          );
      }
  }
  Document.createCanvas = createCanvas;
  Document.createImage = createImage;
  Document.elementTypes = elements;

  /**
   * SVG renderer on canvas.
   */ class Canvg {
      /**
     * Create Canvg instance from SVG source string or URL.
     * @param ctx - Rendering context.
     * @param svg - SVG source string or URL.
     * @param options - Rendering options.
     * @returns Canvg instance.
     */ static async from(ctx, svg) {
          let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          const parser = new Parser(options);
          const svgDocument = await parser.parse(svg);
          return new Canvg(ctx, svgDocument, options);
      }
      /**
     * Create Canvg instance from SVG source string.
     * @param ctx - Rendering context.
     * @param svg - SVG source string.
     * @param options - Rendering options.
     * @returns Canvg instance.
     */ static fromString(ctx, svg) {
          let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          const parser = new Parser(options);
          const svgDocument = parser.parseFromString(svg);
          return new Canvg(ctx, svgDocument, options);
      }
      /**
     * Create new Canvg instance with inherited options.
     * @param ctx - Rendering context.
     * @param svg - SVG source string or URL.
     * @param options - Rendering options.
     * @returns Canvg instance.
     */ fork(ctx, svg) {
          let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return Canvg.from(ctx, svg, {
              ...this.options,
              ...options
          });
      }
      /**
     * Create new Canvg instance with inherited options.
     * @param ctx - Rendering context.
     * @param svg - SVG source string.
     * @param options - Rendering options.
     * @returns Canvg instance.
     */ forkString(ctx, svg) {
          let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return Canvg.fromString(ctx, svg, {
              ...this.options,
              ...options
          });
      }
      /**
     * Document is ready promise.
     * @returns Ready promise.
     */ ready() {
          return this.screen.ready();
      }
      /**
     * Document is ready value.
     * @returns Is ready or not.
     */ isReady() {
          return this.screen.isReady();
      }
      /**
     * Render only first frame, ignoring animations and mouse.
     * @param options - Rendering options.
     */ async render() {
          let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          this.start({
              enableRedraw: true,
              ignoreAnimation: true,
              ignoreMouse: true,
              ...options
          });
          await this.ready();
          this.stop();
      }
      /**
     * Start rendering.
     * @param options - Render options.
     */ start() {
          let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          const { documentElement , screen , options: baseOptions  } = this;
          screen.start(documentElement, {
              enableRedraw: true,
              ...baseOptions,
              ...options
          });
      }
      /**
     * Stop rendering.
     */ stop() {
          this.screen.stop();
      }
      /**
     * Resize SVG to fit in given size.
     * @param width
     * @param height
     * @param preserveAspectRatio
     */ resize(width) {
          let height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : width, preserveAspectRatio = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
          this.documentElement.resize(width, height, preserveAspectRatio);
      }
      /**
     * Main constructor.
     * @param ctx - Rendering context.
     * @param svg - SVG Document.
     * @param options - Rendering options.
     */ constructor(ctx, svg, options = {}){
          this.parser = new Parser(options);
          this.screen = new Screen(ctx, options);
          this.options = options;
          const document = new Document(this, options);
          const documentElement = document.createDocumentElement(svg);
          this.document = document;
          this.documentElement = documentElement;
      }
  }

  exports.AElement = AElement;
  exports.AnimateColorElement = AnimateColorElement;
  exports.AnimateElement = AnimateElement;
  exports.AnimateTransformElement = AnimateTransformElement;
  exports.BoundingBox = BoundingBox;
  exports.CB1 = CB1;
  exports.CB2 = CB2;
  exports.CB3 = CB3;
  exports.CB4 = CB4;
  exports.Canvg = Canvg;
  exports.CircleElement = CircleElement;
  exports.ClipPathElement = ClipPathElement;
  exports.DefsElement = DefsElement;
  exports.DescElement = DescElement;
  exports.Document = Document;
  exports.Element = Element;
  exports.EllipseElement = EllipseElement;
  exports.FeColorMatrixElement = FeColorMatrixElement;
  exports.FeCompositeElement = FeCompositeElement;
  exports.FeDropShadowElement = FeDropShadowElement;
  exports.FeGaussianBlurElement = FeGaussianBlurElement;
  exports.FeMorphologyElement = FeMorphologyElement;
  exports.FilterElement = FilterElement;
  exports.Font = Font;
  exports.FontElement = FontElement;
  exports.FontFaceElement = FontFaceElement;
  exports.GElement = GElement;
  exports.GlyphElement = GlyphElement;
  exports.GradientElement = GradientElement;
  exports.ImageElement = ImageElement;
  exports.LineElement = LineElement;
  exports.LinearGradientElement = LinearGradientElement;
  exports.MarkerElement = MarkerElement;
  exports.MaskElement = MaskElement;
  exports.Matrix = Matrix;
  exports.MissingGlyphElement = MissingGlyphElement;
  exports.Mouse = Mouse;
  exports.PSEUDO_ZERO = PSEUDO_ZERO;
  exports.Parser = Parser;
  exports.PathElement = PathElement;
  exports.PathParser = PathParser;
  exports.PatternElement = PatternElement;
  exports.Point = Point;
  exports.PolygonElement = PolygonElement;
  exports.PolylineElement = PolylineElement;
  exports.Property = Property;
  exports.QB1 = QB1;
  exports.QB2 = QB2;
  exports.QB3 = QB3;
  exports.RadialGradientElement = RadialGradientElement;
  exports.RectElement = RectElement;
  exports.RenderedElement = RenderedElement;
  exports.Rotate = Rotate;
  exports.SVGElement = SVGElement;
  exports.SVGFontLoader = SVGFontLoader;
  exports.Scale = Scale;
  exports.Screen = Screen;
  exports.Skew = Skew;
  exports.SkewX = SkewX;
  exports.SkewY = SkewY;
  exports.StopElement = StopElement;
  exports.StyleElement = StyleElement;
  exports.SymbolElement = SymbolElement;
  exports.TRefElement = TRefElement;
  exports.TSpanElement = TSpanElement;
  exports.TextElement = TextElement;
  exports.TextPathElement = TextPathElement;
  exports.TitleElement = TitleElement;
  exports.Transform = Transform;
  exports.Translate = Translate;
  exports.UnknownElement = UnknownElement;
  exports.UseElement = UseElement;
  exports.ViewPort = ViewPort;
  exports.compressSpaces = compressSpaces;
  exports.elements = elements;
  exports.getSelectorSpecificity = getSelectorSpecificity;
  exports.normalizeAttributeName = normalizeAttributeName;
  exports.normalizeColor = normalizeColor;
  exports.parseExternalUrl = parseExternalUrl;
  exports.presets = index;
  exports.toMatrixValue = toMatrixValue;
  exports.toNumbers = toNumbers;
  exports.trimLeft = trimLeft;
  exports.trimRight = trimRight;
  exports.vectorMagnitude = vectorMagnitude;
  exports.vectorsAngle = vectorsAngle;
  exports.vectorsRatio = vectorsRatio;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=umd.js.map
