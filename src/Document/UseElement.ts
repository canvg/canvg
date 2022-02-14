import { RenderingContext2D } from '../types'
import { Property } from '../Property'
import { Transform } from '../Transform'
import { RenderedElement } from './RenderedElement'
import { PathElement } from './PathElement'
import { SVGElement } from './SVGElement'

export class UseElement extends RenderedElement {
  override type = 'use'
  private cachedElement: PathElement | undefined

  override setContext(ctx: RenderingContext2D) {
    super.setContext(ctx)

    const xAttr = this.getAttribute('x')
    const yAttr = this.getAttribute('y')

    if (xAttr.hasValue()) {
      ctx.translate(xAttr.getPixels('x'), 0)
    }

    if (yAttr.hasValue()) {
      ctx.translate(0, yAttr.getPixels('y'))
    }
  }

  path(ctx: RenderingContext2D) {
    const { element } = this

    if (element) {
      element.path(ctx)
    }
  }

  override renderChildren(ctx: RenderingContext2D) {
    const {
      document,
      element
    } = this

    if (element) {
      let tempSvg: RenderedElement = element

      if (element.type === 'symbol') {
        // render me using a temporary svg element in symbol cases (http://www.w3.org/TR/SVG/struct.html#UseElement)
        tempSvg = new SVGElement(document)
        tempSvg.attributes.viewBox = new Property(
          document,
          'viewBox',
          element.getAttribute('viewBox').getString()
        )
        tempSvg.attributes.preserveAspectRatio = new Property(
          document,
          'preserveAspectRatio',
          element.getAttribute('preserveAspectRatio').getString()
        )
        tempSvg.attributes.overflow = new Property(
          document,
          'overflow',
          element.getAttribute('overflow').getString()
        )
        tempSvg.children = element.children

        // element is still the parent of the children
        element.styles.opacity = new Property(
          document,
          'opacity',
          this.calculateOpacity()
        )
      }

      if (tempSvg.type === 'svg') {
        const widthStyle = this.getStyle('width', false, true)
        const heightStyle = this.getStyle('height', false, true)

        // if symbol or svg, inherit width/height from me
        if (widthStyle.hasValue()) {
          tempSvg.attributes.width = new Property(
            document,
            'width',
            widthStyle.getString()
          )
        }

        if (heightStyle.hasValue()) {
          tempSvg.attributes.height = new Property(
            document,
            'height',
            heightStyle.getString()
          )
        }
      }

      const oldParent = tempSvg.parent

      tempSvg.parent = this
      tempSvg.render(ctx)
      tempSvg.parent = oldParent
    }
  }

  getBoundingBox(ctx: CanvasRenderingContext2D) {
    const { element } = this

    if (element) {
      return element.getBoundingBox(ctx)
    }

    return null
  }

  elementTransform() {
    const {
      document,
      element
    } = this

    if (!element) {
      return null
    }

    return Transform.fromElement(document, element)
  }

  protected get element() {
    if (!this.cachedElement) {
      this.cachedElement = this.getHrefAttribute().getDefinition()
    }

    return this.cachedElement
  }
}
