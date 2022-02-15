import { RenderingContext2D } from '../types'
import { Transform } from '../Transform'
import { Element } from './Element'
import { UseElement } from './UseElement'

const noop = () => {
  // NOOP
}

export class ClipPathElement extends Element {
  override type = 'clipPath'

  apply(ctx: RenderingContext2D) {
    const { document } = this
    const contextProto = Reflect.getPrototypeOf(ctx) as RenderingContext2D | null
    const {
      beginPath,
      closePath
    } = ctx

    if (contextProto) {
      contextProto.beginPath = noop
      contextProto.closePath = noop
    }

    Reflect.apply(beginPath, ctx, [])

    this.children.forEach((child: Element | UseElement) => {
      if (!('path' in child)) {
        return
      }

      let transform = 'elementTransform' in child
        ? child.elementTransform()
        : null // handle <use />

      if (!transform) {
        transform = Transform.fromElement(document, child)
      }

      if (transform) {
        transform.apply(ctx)
      }

      child.path(ctx)

      if (contextProto) {
        contextProto.closePath = closePath
      }

      if (transform) {
        transform.unapply(ctx)
      }
    })

    Reflect.apply(closePath, ctx, [])
    ctx.clip()

    if (contextProto) {
      contextProto.beginPath = beginPath
      contextProto.closePath = closePath
    }
  }

  override render(_: RenderingContext2D) {
    // NO RENDER
  }
}
