import { RenderingContext2D } from '../types'
import { Property } from '../Property'
import { Font } from '../Font'
import { BoundingBox } from '../BoundingBox'
import { Document } from './Document'
import { TextElement } from './TextElement'
import { GElement } from './GElement'

export class AElement extends TextElement {
  override type = 'a'
  protected readonly hasText: boolean
  protected readonly text: string

  constructor(
    document: Document,
    node: HTMLElement,
    captureTextNodes?: boolean
  ) {
    super(document, node, captureTextNodes)

    const { childNodes } = node
    const firstChild = childNodes[0]
    const hasText = childNodes.length > 0
      && Array.from(childNodes).every(node => node.nodeType === 3)

    this.hasText = hasText
    this.text = hasText
      ? this.getTextFromNode(firstChild)
      : ''
  }

  override getText() {
    return this.text
  }

  override renderChildren(ctx: RenderingContext2D) {
    if (this.hasText) {
      // render as text element
      super.renderChildren(ctx)

      const {
        document,
        x,
        y
      } = this
      const { mouse } = document.screen
      const fontSize = new Property(
        document,
        'fontSize',
        Font.parse(document.ctx.font).fontSize
      )

      // Do not calc bounding box if mouse is not working.
      if (mouse.isWorking()) {
        mouse.checkBoundingBox(
          this,
          new BoundingBox(
            x,
            y - fontSize.getPixels('y'),
            x + this.measureText(ctx),
            y
          )
        )
      }
    } else
    if (this.children.length > 0) {
      // render as temporary group
      const g = new GElement(this.document)

      g.children = this.children
      g.parent = this
      g.render(ctx)
    }
  }

  onClick() {
    const { window } = this.document

    if (window) {
      window.open(this.getHrefAttribute().getString())
    }
  }

  onMouseMove() {
    const ctx = this.document.ctx as CanvasRenderingContext2D

    ctx.canvas.style.cursor = 'pointer'
  }
}
