/* eslint-disable import/no-default-export */

declare module 'rgbcolor' {

  export default class RGBColor {
    r: number
    g: number
    b: number
    alpha: number
    ok: boolean

    constructor(color: string)

    toRGB(): string
    toRGBA(): string
  }
}
