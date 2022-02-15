import { RenderingContext2D } from '../types'
import { BoundingBox } from '../BoundingBox'
import { PathElement } from './PathElement'
import { RenderedElement } from './RenderedElement'

export class GElement extends RenderedElement {
  override type = 'g'

  getBoundingBox(ctx: RenderingContext2D) {
    const boundingBox = new BoundingBox()

    this.children.forEach((child: PathElement) => {
      boundingBox.addBoundingBox(child.getBoundingBox(ctx))
    })

    return boundingBox
  }
}
