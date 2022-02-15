import { RenderingContext2D } from '../types'
import { BoundingBox } from '../BoundingBox'
import { Element } from './Element'
import { PathElement } from './PathElement'
import { FeColorMatrixElement } from './FeColorMatrixElement'

export class MaskElement extends Element {
  static ignoreStyles = [
    'mask',
    'transform',
    'clip-path'
  ]

  override type = 'mask'

  apply(ctx: RenderingContext2D, element: Element) {
    const { document } = this
    // render as temp svg
    let x = this.getAttribute('x').getPixels('x')
    let y = this.getAttribute('y').getPixels('y')
    let width = this.getStyle('width').getPixels('x')
    let height = this.getStyle('height').getPixels('y')

    if (!width && !height) {
      const boundingBox = new BoundingBox()

      this.children.forEach((child: PathElement) => {
        boundingBox.addBoundingBox(child.getBoundingBox(ctx))
      })

      x = Math.floor(boundingBox.x1)
      y = Math.floor(boundingBox.y1)
      width = Math.floor(boundingBox.width)
      height = Math.floor(boundingBox.height)
    }

    const ignoredStyles = this.removeStyles(element, MaskElement.ignoreStyles)
    const maskCanvas = document.createCanvas(x + width, y + height)
    const maskCtx = maskCanvas.getContext('2d')

    document.screen.setDefaults(maskCtx)
    this.renderChildren(maskCtx)

    // convert mask to alpha with a fake node
    // TODO: refactor out apply from feColorMatrix
    new FeColorMatrixElement(
      document,
      ({
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
      }) as unknown as HTMLElement
    ).apply(maskCtx, 0, 0, x + width, y + height)

    const tmpCanvas = document.createCanvas(x + width, y + height)
    const tmpCtx = tmpCanvas.getContext('2d')

    document.screen.setDefaults(tmpCtx)
    element.render(tmpCtx)

    tmpCtx.globalCompositeOperation = 'destination-in'
    tmpCtx.fillStyle = maskCtx.createPattern(maskCanvas as CanvasImageSource, 'no-repeat')
    tmpCtx.fillRect(0, 0, x + width, y + height)

    ctx.fillStyle = tmpCtx.createPattern(tmpCanvas as CanvasImageSource, 'no-repeat')
    ctx.fillRect(0, 0, x + width, y + height)

    // reassign mask
    this.restoreStyles(element, ignoredStyles)
  }

  override render(_: RenderingContext2D) {
    // NO RENDER
  }
}
