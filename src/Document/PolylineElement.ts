import { RenderingContext2D } from '../types'
import { Point } from '../Point'
import { BoundingBox } from '../BoundingBox'
import { Document } from './Document'
import { PathElement, Marker } from './PathElement'

export class PolylineElement extends PathElement {
  override type = 'polyline'
  protected readonly points: Point[] = []

  constructor(
    document: Document,
    node: HTMLElement,
    captureTextNodes?: boolean
  ) {
    super(document, node, captureTextNodes)

    this.points = Point.parsePath(
      this.getAttribute('points').getString()
    )
  }

  override path(ctx: RenderingContext2D) {
    const { points } = this
    const [
      {
        x: x0,
        y: y0
      }
    ] = points
    const boundingBox = new BoundingBox(x0, y0)

    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(x0, y0)
    }

    points.forEach(({
      x,
      y
    }) => {
      boundingBox.addPoint(x, y)

      if (ctx) {
        ctx.lineTo(x, y)
      }
    })

    return boundingBox
  }

  override getMarkers() {
    const { points } = this
    const lastIndex = points.length - 1
    const markers: Marker[] = []

    points.forEach((point, i) => {
      if (i === lastIndex) {
        return
      }

      markers.push([point, point.angleTo(points[i + 1])])
    })

    if (markers.length > 0) {
      markers.push([points[points.length - 1], markers[markers.length - 1][1]])
    }

    return markers
  }
}
