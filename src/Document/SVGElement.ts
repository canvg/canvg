import { RenderingContext2D } from '../types'
import { toNumbers } from '../util'
import { Property } from '../Property'
import { Font } from '../Font'
import { RenderedElement } from './RenderedElement'

export class SVGElement extends RenderedElement {
  override type = 'svg'
  root = false

  override setContext(ctx: RenderingContext2D) {
    const { document } = this
    const {
      screen,
      window
    } = document
    const canvas = ctx.canvas

    screen.setDefaults(ctx)

    if ('style' in canvas
      && typeof ctx.font !== 'undefined'
      && window
      && typeof window.getComputedStyle !== 'undefined'
    ) {
      ctx.font = window.getComputedStyle(canvas).getPropertyValue('font')

      const fontSizeProp = new Property(
        document,
        'fontSize',
        Font.parse(ctx.font).fontSize
      )

      if (fontSizeProp.hasValue()) {
        document.rootEmSize = fontSizeProp.getPixels('y')
        document.emSize = document.rootEmSize
      }
    }

    // create new view port
    if (!this.getAttribute('x').hasValue()) {
      this.getAttribute('x', true).setValue(0)
    }

    if (!this.getAttribute('y').hasValue()) {
      this.getAttribute('y', true).setValue(0)
    }

    let {
      width,
      height
    } = screen.viewPort

    if (!this.getStyle('width').hasValue()) {
      this.getStyle('width', true).setValue('100%')
    }

    if (!this.getStyle('height').hasValue()) {
      this.getStyle('height', true).setValue('100%')
    }

    if (!this.getStyle('color').hasValue()) {
      this.getStyle('color', true).setValue('black')
    }

    const refXAttr = this.getAttribute('refX')
    const refYAttr = this.getAttribute('refY')
    const viewBoxAttr = this.getAttribute('viewBox')
    const viewBox = viewBoxAttr.hasValue()
      ? toNumbers(viewBoxAttr.getString())
      : null
    const clip = !this.root
      && this.getStyle('overflow').getValue('hidden') !== 'visible'
    let minX = 0
    let minY = 0
    let clipX = 0
    let clipY = 0

    if (viewBox) {
      minX = viewBox[0]
      minY = viewBox[1]
    }

    if (!this.root) {
      width = this.getStyle('width').getPixels('x')
      height = this.getStyle('height').getPixels('y')

      if (this.type === 'marker') {
        clipX = minX
        clipY = minY
        minX = 0
        minY = 0
      }
    }

    screen.viewPort.setCurrent(width, height)

    // Default value of transform-origin is center only for root SVG elements
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform-origin
    if (this.node // is not temporary SVGElement
      && (!this.parent || this.node.parentNode?.nodeName === 'foreignObject')
      && this.getStyle('transform', false, true).hasValue()
      && !this.getStyle('transform-origin', false, true).hasValue()
    ) {
      this.getStyle('transform-origin', true, true).setValue('50% 50%')
    }

    super.setContext(ctx)

    ctx.translate(
      this.getAttribute('x').getPixels('x'),
      this.getAttribute('y').getPixels('y')
    )

    if (viewBox) {
      width = viewBox[2]
      height = viewBox[3]
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
      refX: refXAttr.getValue() as number,
      refY: refYAttr.getValue() as number,
      clip,
      clipX,
      clipY
    })

    if (viewBox) {
      screen.viewPort.removeCurrent()
      screen.viewPort.setCurrent(width, height)
    }
  }

  override clearContext(ctx: RenderingContext2D) {
    super.clearContext(ctx)

    this.document.screen.viewPort.removeCurrent()
  }

  /**
   * Resize SVG to fit in given size.
   * @param width
   * @param height
   * @param preserveAspectRatio
   */
  resize(
    width: number,
    height = width,
    preserveAspectRatio: boolean | string = false
  ) {
    const widthAttr = this.getAttribute('width', true)
    const heightAttr = this.getAttribute('height', true)
    const viewBoxAttr = this.getAttribute('viewBox')
    const styleAttr = this.getAttribute('style')
    const originWidth = widthAttr.getNumber(0)
    const originHeight = heightAttr.getNumber(0)

    if (preserveAspectRatio) {
      if (typeof preserveAspectRatio === 'string') {
        this.getAttribute('preserveAspectRatio', true).setValue(preserveAspectRatio)
      } else {
        const preserveAspectRatioAttr = this.getAttribute('preserveAspectRatio')

        if (preserveAspectRatioAttr.hasValue()) {
          preserveAspectRatioAttr.setValue(preserveAspectRatioAttr.getString().replace(/^\s*(\S.*\S)\s*$/, '$1'))
        }
      }
    }

    widthAttr.setValue(width)
    heightAttr.setValue(height)

    if (!viewBoxAttr.hasValue()) {
      viewBoxAttr.setValue(`0 0 ${originWidth || width} ${originHeight || height}`)
    }

    if (styleAttr.hasValue()) {
      const widthStyle = this.getStyle('width')
      const heightStyle = this.getStyle('height')

      if (widthStyle.hasValue()) {
        widthStyle.setValue(`${width}px`)
      }

      if (heightStyle.hasValue()) {
        heightStyle.setValue(`${height}px`)
      }
    }
  }
}
