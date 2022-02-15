import { Document } from './Document'
import { TextElement } from './TextElement'

export class TSpanElement extends TextElement {
  override type = 'tspan'
  protected readonly text: string

  constructor(
    document: Document,
    node: HTMLElement,
    captureTextNodes?: boolean
  ) {
    super(
      document,
      node,
      new.target === TSpanElement
        ? true
        : captureTextNodes
    )

    // if this node has children, then they own the text
    this.text = this.children.length > 0
      ? ''
      : this.getTextFromNode()
  }

  override getText() {
    return this.text
  }
}
