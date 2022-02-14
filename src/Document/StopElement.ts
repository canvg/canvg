import { Document } from './Document'
import { Element } from './Element'

export class StopElement extends Element {
  override type = 'stop'
  readonly offset: number
  readonly color: string

  constructor(
    document: Document,
    node: HTMLElement,
    captureTextNodes?: boolean
  ) {
    super(document, node, captureTextNodes)

    const offset = Math.max(0, Math.min(1, this.getAttribute('offset').getNumber()))
    const stopOpacity = this.getStyle('stop-opacity')
    let stopColor = this.getStyle('stop-color', true)

    if (stopColor.getString() === '') {
      stopColor.setValue('#000')
    }

    if (stopOpacity.hasValue()) {
      stopColor = stopColor.addOpacity(stopOpacity)
    }

    this.offset = offset
    this.color = stopColor.getColor()
  }
}
