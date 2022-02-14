import { RenderingContext2D } from '../types'
import { Element } from './Element'
import { PathElement } from './PathElement'
import { FeGaussianBlurElement } from './FeGaussianBlurElement'

export class FilterElement extends Element {
  static ignoreStyles = [
    'filter',
    'transform',
    'clip-path'
  ]

  override type = 'filter'

  apply(ctx: RenderingContext2D, element: Element | PathElement) {
    // render as temp svg
    const {
      document,
      children
    } = this
    const boundingBox = 'getBoundingBox' in element
      ? element.getBoundingBox(ctx)
      : null

    if (!boundingBox) {
      return
    }

    let px = 0
    let py = 0

    children.forEach((child: FeGaussianBlurElement) => {
      const efd = child.extraFilterDistance || 0

      px = Math.max(px, efd)
      py = Math.max(py, efd)
    })

    const width = Math.floor(boundingBox.width)
    const height = Math.floor(boundingBox.height)
    const tmpCanvasWidth = width + 2 * px
    const tmpCanvasHeight = height + 2 * py

    if (tmpCanvasWidth < 1 || tmpCanvasHeight < 1) {
      return
    }

    const x = Math.floor(boundingBox.x)
    const y = Math.floor(boundingBox.y)
    const ignoredStyles = this.removeStyles(element, FilterElement.ignoreStyles)
    const tmpCanvas = document.createCanvas(tmpCanvasWidth, tmpCanvasHeight)
    const tmpCtx = tmpCanvas.getContext('2d')

    document.screen.setDefaults(tmpCtx)
    tmpCtx.translate(-x + px, -y + py)
    element.render(tmpCtx)

    // apply filters
    children.forEach((child: FeGaussianBlurElement) => {
      if (typeof child.apply === 'function') {
        child.apply(
          tmpCtx,
          0,
          0,
          tmpCanvasWidth,
          tmpCanvasHeight
        )
      }
    })

    // render on me
    ctx.drawImage(
      tmpCanvas,
      0,
      0,
      tmpCanvasWidth,
      tmpCanvasHeight,
      x - px,
      y - py,
      tmpCanvasWidth,
      tmpCanvasHeight
    )

    this.restoreStyles(element, ignoredStyles)
  }

  override render(_: RenderingContext2D) {
    // NO RENDER
  }
}
