/* eslint-disable @typescript-eslint/member-ordering */
import { RenderingContext2D } from '../types'
import {
  vectorsRatio,
  vectorsAngle
} from '../util'
import { Point } from '../Point'
import { BoundingBox } from '../BoundingBox'
import { PathParser } from '../PathParser'
import { Document } from './Document'
import { RenderedElement } from './RenderedElement'
import { MarkerElement } from './MarkerElement'

export type Marker = [Point, number]

export class PathElement extends RenderedElement {
  override type = 'path'
  readonly pathParser: PathParser

  constructor(
    document: Document,
    node?: HTMLElement,
    captureTextNodes?: boolean
  ) {
    super(document, node, captureTextNodes)

    this.pathParser = new PathParser(this.getAttribute('d').getString())
  }

  path(ctx?: RenderingContext2D) {
    const { pathParser } = this
    const boundingBox = new BoundingBox()

    pathParser.reset()

    if (ctx) {
      ctx.beginPath()
    }

    while (!pathParser.isEnd()) {
      switch (pathParser.next().type) {
        case PathParser.MOVE_TO:
          this.pathM(ctx, boundingBox)
          break

        case PathParser.LINE_TO:
          this.pathL(ctx, boundingBox)
          break

        case PathParser.HORIZ_LINE_TO:
          this.pathH(ctx, boundingBox)
          break

        case PathParser.VERT_LINE_TO:
          this.pathV(ctx, boundingBox)
          break

        case PathParser.CURVE_TO:
          this.pathC(ctx, boundingBox)
          break

        case PathParser.SMOOTH_CURVE_TO:
          this.pathS(ctx, boundingBox)
          break

        case PathParser.QUAD_TO:
          this.pathQ(ctx, boundingBox)
          break

        case PathParser.SMOOTH_QUAD_TO:
          this.pathT(ctx, boundingBox)
          break

        case PathParser.ARC:
          this.pathA(ctx, boundingBox)
          break

        case PathParser.CLOSE_PATH:
          this.pathZ(ctx, boundingBox)
          break

        default:
      }
    }

    return boundingBox
  }

  getBoundingBox(_ctx: RenderingContext2D) {
    return this.path()
  }

  getMarkers(): Marker[] {
    const { pathParser } = this
    const points = pathParser.getMarkerPoints()
    const angles = pathParser.getMarkerAngles()
    const markers = points.map((point, i): Marker => [point, angles[i]])

    return markers
  }

  override renderChildren(ctx: RenderingContext2D) {
    this.path(ctx)
    this.document.screen.mouse.checkPath(this, ctx)

    const fillRuleStyleProp = this.getStyle('fill-rule')

    if (ctx.fillStyle !== '') {
      if (fillRuleStyleProp.getString('inherit') !== 'inherit') {
        ctx.fill(fillRuleStyleProp.getString() as CanvasFillRule)
      } else {
        ctx.fill()
      }
    }

    if (ctx.strokeStyle !== '') {
      if (this.getAttribute('vector-effect').getString() === 'non-scaling-stroke') {
        ctx.save()
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.stroke()
        ctx.restore()
      } else {
        ctx.stroke()
      }
    }

    const markers = this.getMarkers()

    if (markers) {
      const markersLastIndex = markers.length - 1
      const markerStartStyleProp = this.getStyle('marker-start')
      const markerMidStyleProp = this.getStyle('marker-mid')
      const markerEndStyleProp = this.getStyle('marker-end')

      if (markerStartStyleProp.isUrlDefinition()) {
        const marker = markerStartStyleProp.getDefinition<MarkerElement>()
        const [point, angle] = markers[0]

        marker.render(ctx, point, angle)
      }

      if (markerMidStyleProp.isUrlDefinition()) {
        const marker = markerMidStyleProp.getDefinition<MarkerElement>()

        for (let i = 1; i < markersLastIndex; i++) {
          const [point, angle] = markers[i]

          marker.render(ctx, point, angle)
        }
      }

      if (markerEndStyleProp.isUrlDefinition()) {
        const marker = markerEndStyleProp.getDefinition<MarkerElement>()
        const [point, angle] = markers[markersLastIndex]

        marker.render(ctx, point, angle)
      }
    }
  }

  static pathM(pathParser: PathParser) {
    const point = pathParser.getAsCurrentPoint()

    pathParser.start = pathParser.current

    return {
      point
    }
  }

  protected pathM(
    ctx: RenderingContext2D | undefined,
    boundingBox: BoundingBox
  ) {
    const { pathParser } = this
    const { point } = PathElement.pathM(pathParser)
    const {
      x,
      y
    } = point

    pathParser.addMarker(point)
    boundingBox.addPoint(x, y)

    if (ctx) {
      ctx.moveTo(x, y)
    }
  }

  static pathL(pathParser: PathParser) {
    const { current } = pathParser
    const point = pathParser.getAsCurrentPoint()

    return {
      current,
      point
    }
  }

  protected pathL(
    ctx: RenderingContext2D | undefined,
    boundingBox: BoundingBox
  ) {
    const { pathParser } = this
    const {
      current,
      point
    } = PathElement.pathL(pathParser)
    const {
      x,
      y
    } = point

    pathParser.addMarker(point, current)
    boundingBox.addPoint(x, y)

    if (ctx) {
      ctx.lineTo(x, y)
    }
  }

  static pathH(pathParser: PathParser) {
    const {
      current,
      command
    } = pathParser
    const point = new Point(
      (command.relative ? current.x : 0) + command.x,
      current.y
    )

    pathParser.current = point

    return {
      current,
      point
    }
  }

  protected pathH(
    ctx: RenderingContext2D | undefined,
    boundingBox: BoundingBox
  ) {
    const { pathParser } = this
    const {
      current,
      point
    } = PathElement.pathH(pathParser)
    const {
      x,
      y
    } = point

    pathParser.addMarker(point, current)
    boundingBox.addPoint(x, y)

    if (ctx) {
      ctx.lineTo(x, y)
    }
  }

  static pathV(pathParser: PathParser) {
    const {
      current,
      command
    } = pathParser
    const point = new Point(
      current.x,
      (command.relative ? current.y : 0) + command.y
    )

    pathParser.current = point

    return {
      current,
      point
    }
  }

  protected pathV(
    ctx: RenderingContext2D | undefined,
    boundingBox: BoundingBox
  ) {
    const { pathParser } = this
    const {
      current,
      point
    } = PathElement.pathV(pathParser)
    const {
      x,
      y
    } = point

    pathParser.addMarker(point, current)
    boundingBox.addPoint(x, y)

    if (ctx) {
      ctx.lineTo(x, y)
    }
  }

  static pathC(pathParser: PathParser) {
    const { current } = pathParser
    const point = pathParser.getPoint('x1', 'y1')
    const controlPoint = pathParser.getAsControlPoint('x2', 'y2')
    const currentPoint = pathParser.getAsCurrentPoint()

    return {
      current,
      point,
      controlPoint,
      currentPoint
    }
  }

  protected pathC(
    ctx: RenderingContext2D | undefined,
    boundingBox: BoundingBox
  ) {
    const { pathParser } = this
    const {
      current,
      point,
      controlPoint,
      currentPoint
    } = PathElement.pathC(pathParser)

    pathParser.addMarker(currentPoint, controlPoint, point)
    boundingBox.addBezierCurve(
      current.x,
      current.y,
      point.x,
      point.y,
      controlPoint.x,
      controlPoint.y,
      currentPoint.x,
      currentPoint.y
    )

    if (ctx) {
      ctx.bezierCurveTo(
        point.x,
        point.y,
        controlPoint.x,
        controlPoint.y,
        currentPoint.x,
        currentPoint.y
      )
    }
  }

  static pathS(pathParser: PathParser) {
    const { current } = pathParser
    const point = pathParser.getReflectedControlPoint()
    const controlPoint = pathParser.getAsControlPoint('x2', 'y2')
    const currentPoint = pathParser.getAsCurrentPoint()

    return {
      current,
      point,
      controlPoint,
      currentPoint
    }
  }

  protected pathS(
    ctx: RenderingContext2D | undefined,
    boundingBox: BoundingBox
  ) {
    const { pathParser } = this
    const {
      current,
      point,
      controlPoint,
      currentPoint
    } = PathElement.pathS(pathParser)

    pathParser.addMarker(currentPoint, controlPoint, point)
    boundingBox.addBezierCurve(
      current.x,
      current.y,
      point.x,
      point.y,
      controlPoint.x,
      controlPoint.y,
      currentPoint.x,
      currentPoint.y
    )

    if (ctx) {
      ctx.bezierCurveTo(
        point.x,
        point.y,
        controlPoint.x,
        controlPoint.y,
        currentPoint.x,
        currentPoint.y
      )
    }
  }

  static pathQ(pathParser: PathParser) {
    const { current } = pathParser
    const controlPoint = pathParser.getAsControlPoint('x1', 'y1')
    const currentPoint = pathParser.getAsCurrentPoint()

    return {
      current,
      controlPoint,
      currentPoint
    }
  }

  protected pathQ(
    ctx: RenderingContext2D | undefined,
    boundingBox: BoundingBox
  ) {
    const { pathParser } = this
    const {
      current,
      controlPoint,
      currentPoint
    } = PathElement.pathQ(pathParser)

    pathParser.addMarker(currentPoint, controlPoint, controlPoint)
    boundingBox.addQuadraticCurve(
      current.x,
      current.y,
      controlPoint.x,
      controlPoint.y,
      currentPoint.x,
      currentPoint.y
    )

    if (ctx) {
      ctx.quadraticCurveTo(
        controlPoint.x,
        controlPoint.y,
        currentPoint.x,
        currentPoint.y
      )
    }
  }

  static pathT(pathParser: PathParser) {
    const { current } = pathParser
    const controlPoint = pathParser.getReflectedControlPoint()

    pathParser.control = controlPoint

    const currentPoint = pathParser.getAsCurrentPoint()

    return {
      current,
      controlPoint,
      currentPoint
    }
  }

  protected pathT(
    ctx: RenderingContext2D | undefined,
    boundingBox: BoundingBox
  ) {
    const { pathParser } = this
    const {
      current,
      controlPoint,
      currentPoint
    } = PathElement.pathT(pathParser)

    pathParser.addMarker(currentPoint, controlPoint, controlPoint)
    boundingBox.addQuadraticCurve(
      current.x,
      current.y,
      controlPoint.x,
      controlPoint.y,
      currentPoint.x,
      currentPoint.y
    )

    if (ctx) {
      ctx.quadraticCurveTo(
        controlPoint.x,
        controlPoint.y,
        currentPoint.x,
        currentPoint.y
      )
    }
  }

  static pathA(pathParser: PathParser) {
    const {
      current,
      command
    } = pathParser
    let {
      rX,
      rY,
      xRot,
      lArcFlag,
      sweepFlag
    } = command
    const xAxisRotation = xRot * (Math.PI / 180.0)
    const currentPoint = pathParser.getAsCurrentPoint()
    // Conversion from endpoint to center parameterization
    // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
    // x1', y1'
    const currp = new Point(
      Math.cos(xAxisRotation) * (current.x - currentPoint.x) / 2.0
      + Math.sin(xAxisRotation) * (current.y - currentPoint.y) / 2.0,
      -Math.sin(xAxisRotation) * (current.x - currentPoint.x) / 2.0
      + Math.cos(xAxisRotation) * (current.y - currentPoint.y) / 2.0
    )
    // adjust radii
    const l =
      Math.pow(currp.x, 2) / Math.pow(rX, 2)
      + Math.pow(currp.y, 2) / Math.pow(rY, 2)

    if (l > 1) {
      rX *= Math.sqrt(l)
      rY *= Math.sqrt(l)
    }

    // cx', cy'
    let s = (lArcFlag === sweepFlag ? -1 : 1) * Math.sqrt(
      (
        (Math.pow(rX, 2) * Math.pow(rY, 2))
        - (Math.pow(rX, 2) * Math.pow(currp.y, 2))
        - (Math.pow(rY, 2) * Math.pow(currp.x, 2))
      ) / (
        Math.pow(rX, 2) * Math.pow(currp.y, 2)
        + Math.pow(rY, 2) * Math.pow(currp.x, 2)
      )
    )

    if (isNaN(s)) {
      s = 0
    }

    const cpp = new Point(
      s * rX * currp.y / rY,
      s * -rY * currp.x / rX
    )
    // cx, cy
    const centp = new Point(
      (current.x + currentPoint.x) / 2.0
      + Math.cos(xAxisRotation) * cpp.x
      - Math.sin(xAxisRotation) * cpp.y,
      (current.y + currentPoint.y) / 2.0
      + Math.sin(xAxisRotation) * cpp.x
      + Math.cos(xAxisRotation) * cpp.y
    )
    // initial angle
    const a1 = vectorsAngle([1, 0], [(currp.x - cpp.x) / rX, (currp.y - cpp.y) / rY]) // θ1
    // angle delta
    const u = [(currp.x - cpp.x) / rX, (currp.y - cpp.y) / rY] as const
    const v = [(-currp.x - cpp.x) / rX, (-currp.y - cpp.y) / rY] as const
    let ad = vectorsAngle(u, v) // Δθ

    if (vectorsRatio(u, v) <= -1) {
      ad = Math.PI
    }

    if (vectorsRatio(u, v) >= 1) {
      ad = 0
    }

    return {
      currentPoint,
      rX,
      rY,
      sweepFlag,
      xAxisRotation,
      centp,
      a1,
      ad
    }
  }

  protected pathA(
    ctx: RenderingContext2D | undefined,
    boundingBox: BoundingBox
  ) {
    const { pathParser } = this
    const {
      currentPoint,
      rX,
      rY,
      sweepFlag,
      xAxisRotation,
      centp,
      a1,
      ad
    } = PathElement.pathA(pathParser)
    // for markers
    const dir = 1 - sweepFlag ? 1.0 : -1.0
    const ah = a1 + dir * (ad / 2.0)
    const halfWay = new Point(
      centp.x + rX * Math.cos(ah),
      centp.y + rY * Math.sin(ah)
    )

    pathParser.addMarkerAngle(halfWay, ah - dir * Math.PI / 2)
    pathParser.addMarkerAngle(currentPoint, ah - dir * Math.PI)
    boundingBox.addPoint(currentPoint.x, currentPoint.y) // TODO: this is too naive, make it better

    if (ctx && !isNaN(a1) && !isNaN(ad)) {
      const r = rX > rY ? rX : rY
      const sx = rX > rY ? 1 : rX / rY
      const sy = rX > rY ? rY / rX : 1

      ctx.translate(centp.x, centp.y)
      ctx.rotate(xAxisRotation)
      ctx.scale(sx, sy)
      ctx.arc(0, 0, r, a1, a1 + ad, Boolean(1 - sweepFlag))
      ctx.scale(1 / sx, 1 / sy)
      ctx.rotate(-xAxisRotation)
      ctx.translate(-centp.x, -centp.y)
    }
  }

  static pathZ(pathParser: PathParser) {
    pathParser.current = pathParser.start
  }

  protected pathZ(
    ctx: RenderingContext2D | undefined,
    boundingBox: BoundingBox
  ) {
    PathElement.pathZ(this.pathParser)

    if (ctx) {
      // only close path if it is not a straight line
      if (boundingBox.x1 !== boundingBox.x2
        && boundingBox.y1 !== boundingBox.y2
      ) {
        ctx.closePath()
      }
    }
  }
}
