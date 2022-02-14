import { canvasRGBA } from 'stackblur-canvas'
import { RenderingContext2D } from '../types'
import { Document } from './Document'
import { Element } from './Element'

export class FeGaussianBlurElement extends Element {
  override type = 'feGaussianBlur'
  readonly extraFilterDistance: number
  protected readonly blurRadius: number

  constructor(
    document: Document,
    node: HTMLElement,
    captureTextNodes?: boolean
  ) {
    super(document, node, captureTextNodes)

    this.blurRadius = Math.floor(this.getAttribute('stdDeviation').getNumber())
    this.extraFilterDistance = this.blurRadius
  }

  apply(
    ctx: RenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    const {
      document,
      blurRadius
    } = this
    const body = document.window
      ? document.window.document.body
      : null
    const canvas = ctx.canvas as HTMLCanvasElement

    // StackBlur requires canvas be on document
    canvas.id = document.getUniqueId()

    if (body) {
      canvas.style.display = 'none'
      body.appendChild(canvas)
    }

    canvasRGBA(canvas, x, y, width, height, blurRadius)

    if (body) {
      body.removeChild(canvas)
    }
  }
}
