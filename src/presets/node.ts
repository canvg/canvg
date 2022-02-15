/* eslint-disable @typescript-eslint/no-explicit-any */
import { DOMParser } from './types'

/**
 * `node-canvas` exports.
 */
interface ICanvas {
  createCanvas(width: number, height: number): any
  loadImage(src: string): Promise<any>
}

/**
 * WHATWG-compatible `fetch` function.
 */
type Fetch = (input: any, config?: any) => Promise<any>

interface IConfig {
  /**
   * XML/HTML parser from string into DOM Document.
   */
  DOMParser: DOMParser
  /**
   * `node-canvas` exports.
   */
  canvas: ICanvas
  /**
   * WHATWG-compatible `fetch` function.
   */
  fetch: Fetch
}

/**
 * Options preset for `node-canvas`.
 * @param config - Preset requirements.
 * @param config.DOMParser - XML/HTML parser from string into DOM Document.
 * @param config.canvas - `node-canvas` exports.
 * @param config.fetch - WHATWG-compatible `fetch` function.
 * @returns Preset object.
 */
export function node({
  DOMParser,
  canvas,
  fetch
}: IConfig) {
  return {
    window: null,
    ignoreAnimation: true,
    ignoreMouse: true,
    DOMParser,
    fetch,
    createCanvas: canvas.createCanvas,
    createImage: canvas.loadImage
  }
}
