import { Document } from './Document'
import { Element } from './Element'

export class UnknownElement extends Element {
  constructor(
    document: Document,
    node: HTMLElement,
    captureTextNodes?: boolean
  ) {
    super(document, node, captureTextNodes)

    if (process.env.NODE_ENV !== 'production') {
      console.warn(`Element ${node.nodeName} not yet implemented.`)
    }
  }
}
