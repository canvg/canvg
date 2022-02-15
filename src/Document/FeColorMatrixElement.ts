import { RenderingContext2D } from '../types'
import { toNumbers } from '../util'
import { Document } from './Document'
import { Element } from './Element'

function imGet(
  img: Uint8ClampedArray,
  x: number,
  y: number,
  width: number,
  _height: number,
  rgba: number
) {
  return img[y * width * 4 + x * 4 + rgba]
}

function imSet(
  img: Uint8ClampedArray,
  x: number,
  y: number,
  width: number,
  _height: number,
  rgba: number,
  val: number
) {
  img[y * width * 4 + x * 4 + rgba] = val
}

function m(
  matrix: number[],
  i: number,
  v: number
) {
  const mi = matrix[i]

  return mi * v
}

function c(
  a: number,
  m1: number,
  m2: number,
  m3: number
) {
  return m1 + Math.cos(a) * m2 + Math.sin(a) * m3
}

export class FeColorMatrixElement extends Element {
  override type = 'feColorMatrix'
  protected readonly matrix: number[]
  protected readonly includeOpacity: boolean

  constructor(
    document: Document,
    node: HTMLElement,
    captureTextNodes?: boolean
  ) {
    super(document, node, captureTextNodes)

    let matrix = toNumbers(this.getAttribute('values').getString())

    switch (this.getAttribute('type').getString('matrix')) { // http://www.w3.org/TR/SVG/filters.html#feColorMatrixElement
      case 'saturate': {
        const s = matrix[0]

        /* eslint-disable array-element-newline */
        matrix = [
          0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s, 0, 0,
          0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s, 0, 0,
          0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s, 0, 0,
          0, 0, 0, 1, 0,
          0, 0, 0, 0, 1
        ]
        /* eslint-enable array-element-newline */
        break
      }

      case 'hueRotate': {
        const a = matrix[0] * Math.PI / 180.0

        /* eslint-disable array-element-newline */
        matrix = [
          c(a, 0.213, 0.787, -0.213), c(a, 0.715, -0.715, -0.715), c(a, 0.072, -0.072, 0.928), 0, 0,
          c(a, 0.213, -0.213, 0.143), c(a, 0.715, 0.285, 0.140), c(a, 0.072, -0.072, -0.283), 0, 0,
          c(a, 0.213, -0.213, -0.787), c(a, 0.715, -0.715, 0.715), c(a, 0.072, 0.928, 0.072), 0, 0,
          0, 0, 0, 1, 0,
          0, 0, 0, 0, 1
        ]
        /* eslint-enable array-element-newline */
        break
      }

      case 'luminanceToAlpha':
        /* eslint-disable array-element-newline */
        matrix = [
          0, 0, 0, 0, 0,
          0, 0, 0, 0, 0,
          0, 0, 0, 0, 0,
          0.2125, 0.7154, 0.0721, 0, 0,
          0, 0, 0, 0, 1
        ]
        /* eslint-enable array-element-newline */
        break

      default:
    }

    this.matrix = matrix
    this.includeOpacity = this.getAttribute('includeOpacity').hasValue()
  }

  apply(
    ctx: RenderingContext2D,
    _x: number,
    _y: number,
    width: number,
    height: number
  ) {
    // assuming x==0 && y==0 for now
    const {
      includeOpacity,
      matrix
    } = this
    const srcData = ctx.getImageData(0, 0, width, height)

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const r = imGet(srcData.data, x, y, width, height, 0)
        const g = imGet(srcData.data, x, y, width, height, 1)
        const b = imGet(srcData.data, x, y, width, height, 2)
        const a = imGet(srcData.data, x, y, width, height, 3)
        let nr = m(matrix, 0, r) + m(matrix, 1, g) + m(matrix, 2, b) + m(matrix, 3, a) + m(matrix, 4, 1)
        let ng = m(matrix, 5, r) + m(matrix, 6, g) + m(matrix, 7, b) + m(matrix, 8, a) + m(matrix, 9, 1)
        let nb = m(matrix, 10, r) + m(matrix, 11, g) + m(matrix, 12, b) + m(matrix, 13, a) + m(matrix, 14, 1)
        let na = m(matrix, 15, r) + m(matrix, 16, g) + m(matrix, 17, b) + m(matrix, 18, a) + m(matrix, 19, 1)

        if (includeOpacity) {
          nr = 0
          ng = 0
          nb = 0
          na *= a / 255
        }

        imSet(srcData.data, x, y, width, height, 0, nr)
        imSet(srcData.data, x, y, width, height, 1, ng)
        imSet(srcData.data, x, y, width, height, 2, nb)
        imSet(srcData.data, x, y, width, height, 3, na)
      }
    }

    ctx.clearRect(0, 0, width, height)
    ctx.putImageData(srcData, 0, 0)
  }
}
