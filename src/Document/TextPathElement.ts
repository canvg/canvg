import { RenderingContext2D } from '../types'
import {
  PSEUDO_ZERO,
  CB1,
  CB2,
  CB3,
  CB4,
  QB1,
  QB2,
  QB3
} from '../util'
import { PathParser, CommandType } from '../PathParser'
import { Document } from './Document'
import { TextElement } from './TextElement'
import { PathElement } from './PathElement'

export interface IPoint {
  x: number
  y: number
}

export interface IPathCommand {
  type: CommandType
  points: number[]
  start?: IPoint
  pathLength: number
}

interface ICachedPoint extends IPoint {
  distance: number
}

interface IEquidistantCache {
  step: number
  precision: number
  points: ICachedPoint[]
}

interface IGlyphInfo {
  // transposeX: number;
  // transposeY: number;
  text: string
  rotation: number
  p0: ICachedPoint
  p1: ICachedPoint
}

export class TextPathElement extends TextElement {
  override type = 'textPath'
  protected textWidth = 0
  protected textHeight = 0
  protected pathLength = -1
  protected glyphInfo: IGlyphInfo[] = null
  protected readonly text: string
  protected readonly dataArray: IPathCommand[]
  private letterSpacingCache: number[] = []
  private equidistantCache: IEquidistantCache
  private readonly measuresCache = new Map<string, number>([['', 0]])

  constructor(
    document: Document,
    node: HTMLElement,
    captureTextNodes?: boolean
  ) {
    super(document, node, captureTextNodes)

    const pathElement = this.getHrefAttribute().getDefinition<PathElement>()

    this.text = this.getTextFromNode()
    this.dataArray = this.parsePathData(pathElement)
  }

  override getText() {
    return this.text
  }

  path(ctx: RenderingContext2D) {
    const { dataArray } = this

    if (ctx) {
      ctx.beginPath()
    }

    dataArray.forEach(({
      type,
      points
    }) => {
      switch (type) {
        case PathParser.LINE_TO:

          if (ctx) {
            ctx.lineTo(points[0], points[1])
          }

          break

        case PathParser.MOVE_TO:

          if (ctx) {
            ctx.moveTo(points[0], points[1])
          }

          break

        case PathParser.CURVE_TO:

          if (ctx) {
            ctx.bezierCurveTo(
              points[0],
              points[1],
              points[2],
              points[3],
              points[4],
              points[5]
            )
          }

          break

        case PathParser.QUAD_TO:

          if (ctx) {
            ctx.quadraticCurveTo(
              points[0],
              points[1],
              points[2],
              points[3]
            )
          }

          break

        case PathParser.ARC: {
          const [
            cx,
            cy,
            rx,
            ry,
            theta,
            dTheta,
            psi,
            fs
          ] = points
          const r = rx > ry ? rx : ry
          const scaleX = rx > ry ? 1 : rx / ry
          const scaleY = rx > ry ? ry / rx : 1

          if (ctx) {
            ctx.translate(cx, cy)
            ctx.rotate(psi)
            ctx.scale(scaleX, scaleY)
            ctx.arc(0, 0, r, theta, theta + dTheta, Boolean(1 - fs))
            ctx.scale(1 / scaleX, 1 / scaleY)
            ctx.rotate(-psi)
            ctx.translate(-cx, -cy)
          }

          break
        }

        case PathParser.CLOSE_PATH:

          if (ctx) {
            ctx.closePath()
          }

          break

        default:
      }
    })
  }

  override renderChildren(ctx: RenderingContext2D) {
    this.setTextData(ctx)
    ctx.save()

    const textDecoration = this.parent.getStyle('text-decoration').getString()
    const fontSize = this.getFontSize()
    const { glyphInfo } = this
    const fill = ctx.fillStyle

    if (textDecoration === 'underline') {
      ctx.beginPath()
    }

    glyphInfo.forEach((glyph, i) => {
      const {
        p0,
        p1,
        rotation,
        text: partialText
      } = glyph

      ctx.save()
      ctx.translate(p0.x, p0.y)
      ctx.rotate(rotation)

      if (ctx.fillStyle) {
        ctx.fillText(partialText, 0, 0)
      }

      if (ctx.strokeStyle) {
        ctx.strokeText(partialText, 0, 0)
      }

      ctx.restore()

      if (textDecoration === 'underline') {
        if (i === 0) {
          ctx.moveTo(p0.x, p0.y + fontSize / 8)
        }

        ctx.lineTo(p1.x, p1.y + fontSize / 5)
      }

      // // To assist with debugging visually, uncomment following
      //
      // ctx.beginPath();
      // if (i % 2)
      //   ctx.strokeStyle = 'red';
      // else
      //   ctx.strokeStyle = 'green';
      // ctx.moveTo(p0.x, p0.y);
      // ctx.lineTo(p1.x, p1.y);
      // ctx.stroke();
      // ctx.closePath();
    })

    if (textDecoration === 'underline') {
      ctx.lineWidth = fontSize / 20
      ctx.strokeStyle = fill
      ctx.stroke()
      ctx.closePath()
    }

    ctx.restore()
  }

  protected getLetterSpacingAt(idx = 0) {
    return this.letterSpacingCache[idx] || 0
  }

  protected findSegmentToFitChar(
    ctx: RenderingContext2D,
    anchor: string,
    textFullWidth: number,
    fullPathWidth: number,
    spacesNumber: number,
    inputOffset: number,
    dy: number,
    c: string,
    charI: number
  ) {
    let offset = inputOffset
    let glyphWidth = this.measureText(ctx, c)

    if (c === ' '
      && anchor === 'justify'
      && textFullWidth < fullPathWidth
    ) {
      glyphWidth += (fullPathWidth - textFullWidth) / spacesNumber
    }

    if (charI > -1) {
      offset += this.getLetterSpacingAt(charI)
    }

    const splineStep = this.textHeight / 20
    const p0 = this.getEquidistantPointOnPath(offset, splineStep, 0)
    const p1 = this.getEquidistantPointOnPath(offset + glyphWidth, splineStep, 0)
    const segment = {
      p0,
      p1
    }
    const rotation = p0 && p1
      ? Math.atan2(
        p1.y - p0.y,
        p1.x - p0.x
      )
      : 0

    if (dy) {
      const dyX = Math.cos(Math.PI / 2 + rotation) * dy
      const dyY = Math.cos(-rotation) * dy

      segment.p0 = {
        ...p0,
        x: p0.x + dyX,
        y: p0.y + dyY
      }
      segment.p1 = {
        ...p1,
        x: p1.x + dyX,
        y: p1.y + dyY
      }
    }

    offset += glyphWidth

    return {
      offset,
      segment,
      rotation
    }
  }

  protected override measureText(
    ctx: RenderingContext2D,
    text?: string
  ) {
    const { measuresCache } = this
    const targetText = text || this.getText()

    if (measuresCache.has(targetText)) {
      return measuresCache.get(targetText)
    }

    const measure = this.measureTargetText(ctx, targetText)

    measuresCache.set(targetText, measure)

    return measure
  }

  // This method supposes what all custom fonts already loaded.
  // If some font will be loaded after this method call, <textPath> will not be rendered correctly.
  // You need to call this method manually to update glyphs cache.
  protected setTextData(ctx: RenderingContext2D) {
    if (this.glyphInfo) {
      return
    }

    const renderText = this.getText()
    const chars = renderText.split('')
    const spacesNumber = renderText.split(' ').length - 1
    const dx = this.parent.getAttribute('dx').split().map(_ => _.getPixels('x'))
    const dy = this.parent.getAttribute('dy').getPixels('y')
    const anchor = this.parent.getStyle('text-anchor').getString('start')
    const thisSpacing = this.getStyle('letter-spacing')
    const parentSpacing = this.parent.getStyle('letter-spacing')
    let letterSpacing = 0

    if (!thisSpacing.hasValue()
      || thisSpacing.getValue() === 'inherit'
    ) {
      letterSpacing = parentSpacing.getPixels()
    } else
    if (thisSpacing.hasValue()) {
      if (thisSpacing.getValue() !== 'initial'
        && thisSpacing.getValue() !== 'unset'
      ) {
        letterSpacing = thisSpacing.getPixels()
      }
    }

    // fill letter-spacing cache
    const letterSpacingCache: number[] = []
    const textLen = renderText.length

    this.letterSpacingCache = letterSpacingCache

    for (let i = 0; i < textLen; i++) {
      letterSpacingCache.push(
        typeof dx[i] !== 'undefined'
          ? dx[i]
          : letterSpacing
      )
    }

    const dxSum = letterSpacingCache.reduce(
      (acc, cur, i) => (
        i === 0
          ? 0
          : acc + cur || 0
      ),
      0
    )
    const textWidth = this.measureText(ctx)
    const textFullWidth = Math.max(textWidth + dxSum, 0)

    this.textWidth = textWidth
    this.textHeight = this.getFontSize()
    this.glyphInfo = []

    const fullPathWidth = this.getPathLength()
    const startOffset = this.getStyle('startOffset').getNumber(0) * fullPathWidth
    let offset = 0

    if (anchor === 'middle'
      || anchor === 'center'
    ) {
      offset = -textFullWidth / 2
    }

    if (anchor === 'end'
      || anchor === 'right'
    ) {
      offset = -textFullWidth
    }

    offset += startOffset

    chars.forEach((char, i) => {
      // Find such segment what distance between p0 and p1 is approx. width of glyph
      const {
        offset: nextOffset,
        segment,
        rotation
      } = this.findSegmentToFitChar(
        ctx,
        anchor,
        textFullWidth,
        fullPathWidth,
        spacesNumber,
        offset,
        dy,
        char,
        i
      )

      offset = nextOffset

      if (!segment.p0 || !segment.p1) {
        return
      }

      // const width = this.getLineLength(
      //   segment.p0.x,
      //   segment.p0.y,
      //   segment.p1.x,
      //   segment.p1.y
      // );
      // Note: Since glyphs are rendered one at a time, any kerning pair data built into the font will not be used.
      // Can foresee having a rough pair table built in that the developer can override as needed.
      // Or use "dx" attribute of the <text> node as a naive replacement
      // const kern = 0;
      // placeholder for future implementation
      // const midpoint = this.getPointOnLine(
      //   kern + width / 2.0,
      //   segment.p0.x, segment.p0.y, segment.p1.x, segment.p1.y
      // );

      this.glyphInfo.push({
        // transposeX: midpoint.x,
        // transposeY: midpoint.y,
        text: chars[i],
        p0: segment.p0,
        p1: segment.p1,
        rotation
      })
    })
  }

  protected parsePathData(path: PathElement) {
    this.pathLength = -1 // reset path length

    if (!path) {
      return []
    }

    const pathCommands: IPathCommand[] = []
    const { pathParser } = path

    pathParser.reset()

    // convert l, H, h, V, and v to L
    while (!pathParser.isEnd()) {
      const { current } = pathParser
      const startX = current ? current.x : 0
      const startY = current ? current.y : 0
      const command = pathParser.next()
      let nextCommandType: CommandType = command.type
      let points: number[] = []

      switch (command.type) {
        case PathParser.MOVE_TO:
          this.pathM(pathParser, points)
          break

        case PathParser.LINE_TO:
          nextCommandType = this.pathL(pathParser, points)
          break

        case PathParser.HORIZ_LINE_TO:
          nextCommandType = this.pathH(pathParser, points)
          break

        case PathParser.VERT_LINE_TO:
          nextCommandType = this.pathV(pathParser, points)
          break

        case PathParser.CURVE_TO:
          this.pathC(pathParser, points)
          break

        case PathParser.SMOOTH_CURVE_TO:
          nextCommandType = this.pathS(pathParser, points)
          break

        case PathParser.QUAD_TO:
          this.pathQ(pathParser, points)
          break

        case PathParser.SMOOTH_QUAD_TO:
          nextCommandType = this.pathT(pathParser, points)
          break

        case PathParser.ARC:
          points = this.pathA(pathParser)
          break

        case PathParser.CLOSE_PATH:
          PathElement.pathZ(pathParser)
          break

        default:
      }

      if (command.type !== PathParser.CLOSE_PATH) {
        pathCommands.push({
          type: nextCommandType,
          points,
          start: {
            x: startX,
            y: startY
          },
          pathLength: this.calcLength(startX, startY, nextCommandType, points)
        })
      } else {
        pathCommands.push({
          type: PathParser.CLOSE_PATH,
          points: [],
          pathLength: 0
        })
      }
    }

    return pathCommands
  }

  protected pathM(
    pathParser: PathParser,
    points: number[]
  ) {
    const {
      x,
      y
    } = PathElement.pathM(pathParser).point

    points.push(x, y)
  }

  protected pathL(
    pathParser: PathParser,
    points: number[]
  ) {
    const {
      x,
      y
    } = PathElement.pathL(pathParser).point

    points.push(x, y)

    return PathParser.LINE_TO
  }

  protected pathH(
    pathParser: PathParser,
    points: number[]
  ) {
    const {
      x,
      y
    } = PathElement.pathH(pathParser).point

    points.push(x, y)

    return PathParser.LINE_TO
  }

  protected pathV(
    pathParser: PathParser,
    points: number[]
  ) {
    const {
      x,
      y
    } = PathElement.pathV(pathParser).point

    points.push(x, y)

    return PathParser.LINE_TO
  }

  protected pathC(
    pathParser: PathParser,
    points: number[]
  ) {
    const {
      point,
      controlPoint,
      currentPoint
    } = PathElement.pathC(pathParser)

    points.push(
      point.x,
      point.y,
      controlPoint.x,
      controlPoint.y,
      currentPoint.x,
      currentPoint.y
    )
  }

  protected pathS(
    pathParser: PathParser,
    points: number[]
  ) {
    const {
      point,
      controlPoint,
      currentPoint
    } = PathElement.pathS(pathParser)

    points.push(
      point.x,
      point.y,
      controlPoint.x,
      controlPoint.y,
      currentPoint.x,
      currentPoint.y
    )

    return PathParser.CURVE_TO
  }

  protected pathQ(
    pathParser: PathParser,
    points: number[]
  ) {
    const {
      controlPoint,
      currentPoint
    } = PathElement.pathQ(pathParser)

    points.push(
      controlPoint.x,
      controlPoint.y,
      currentPoint.x,
      currentPoint.y
    )
  }

  protected pathT(
    pathParser: PathParser,
    points: number[]
  ) {
    const {
      controlPoint,
      currentPoint
    } = PathElement.pathT(pathParser)

    points.push(
      controlPoint.x,
      controlPoint.y,
      currentPoint.x,
      currentPoint.y
    )

    return PathParser.QUAD_TO
  }

  protected pathA(
    pathParser: PathParser
  ) {
    let {
      rX,
      rY,
      sweepFlag,
      xAxisRotation,
      centp,
      a1,
      ad
    } = PathElement.pathA(pathParser)

    if (sweepFlag === 0 && ad > 0) {
      ad -= 2 * Math.PI
    }

    if (sweepFlag === 1 && ad < 0) {
      ad += 2 * Math.PI
    }

    return [
      centp.x,
      centp.y,
      rX,
      rY,
      a1,
      ad,
      xAxisRotation,
      sweepFlag
    ]
  }

  protected calcLength(
    x: number,
    y: number,
    commandType: CommandType,
    points: number[]
  ) {
    let len = 0
    let p1: IPoint = null
    let p2: IPoint = null
    let t = 0

    switch (commandType) {
      case PathParser.LINE_TO:
        return this.getLineLength(x, y, points[0], points[1])

      case PathParser.CURVE_TO:
        // Approximates by breaking curve into 100 line segments
        len = 0.0
        p1 = this.getPointOnCubicBezier(
          0,
          x,
          y,
          points[0],
          points[1],
          points[2],
          points[3],
          points[4],
          points[5]
        )

        for (t = 0.01; t <= 1; t += 0.01) {
          p2 = this.getPointOnCubicBezier(
            t,
            x,
            y,
            points[0],
            points[1],
            points[2],
            points[3],
            points[4],
            points[5]
          )
          len += this.getLineLength(p1.x, p1.y, p2.x, p2.y)
          p1 = p2
        }

        return len

      case PathParser.QUAD_TO:
        // Approximates by breaking curve into 100 line segments
        len = 0.0
        p1 = this.getPointOnQuadraticBezier(
          0,
          x,
          y,
          points[0],
          points[1],
          points[2],
          points[3]
        )

        for (t = 0.01; t <= 1; t += 0.01) {
          p2 = this.getPointOnQuadraticBezier(
            t,
            x,
            y,
            points[0],
            points[1],
            points[2],
            points[3]
          )
          len += this.getLineLength(
            p1.x,
            p1.y,
            p2.x,
            p2.y
          )
          p1 = p2
        }

        return len

      case PathParser.ARC: {
        // Approximates by breaking curve into line segments
        len = 0.0

        const start = points[4]
        // 4 = theta
        const dTheta = points[5]
        // 5 = dTheta
        const end = points[4] + dTheta
        let inc = Math.PI / 180.0

        // 1 degree resolution
        if (Math.abs(start - end) < inc) {
          inc = Math.abs(start - end)
        }

        // Note: for purpose of calculating arc length, not going to worry about rotating X-axis by angle psi
        p1 = this.getPointOnEllipticalArc(
          points[0],
          points[1],
          points[2],
          points[3],
          start,
          0
        )

        if (dTheta < 0) { // clockwise
          for (t = start - inc; t > end; t -= inc) {
            p2 = this.getPointOnEllipticalArc(
              points[0],
              points[1],
              points[2],
              points[3],
              t,
              0
            )
            len += this.getLineLength(p1.x, p1.y, p2.x, p2.y)
            p1 = p2
          }
        } else { // counter-clockwise
          for (t = start + inc; t < end; t += inc) {
            p2 = this.getPointOnEllipticalArc(
              points[0],
              points[1],
              points[2],
              points[3],
              t,
              0
            )
            len += this.getLineLength(p1.x, p1.y, p2.x, p2.y)
            p1 = p2
          }
        }

        p2 = this.getPointOnEllipticalArc(
          points[0],
          points[1],
          points[2],
          points[3],
          end,
          0
        )
        len += this.getLineLength(p1.x, p1.y, p2.x, p2.y)

        return len
      }

      default:
    }

    return 0
  }

  protected getPointOnLine(
    dist: number,
    p1x: number,
    p1y: number,
    p2x: number,
    p2y: number,
    fromX = p1x,
    fromY = p1y
  ) {
    const m = (p2y - p1y) / ((p2x - p1x) + PSEUDO_ZERO)
    let run = Math.sqrt(dist * dist / (1 + m * m))

    if (p2x < p1x) {
      run *= -1
    }

    let rise = m * run
    let pt: IPoint = null

    if (p2x === p1x) { // vertical line
      pt = {
        x: fromX,
        y: fromY + rise
      }
    } else
    if ((fromY - p1y) / ((fromX - p1x) + PSEUDO_ZERO) === m) {
      pt = {
        x: fromX + run,
        y: fromY + rise
      }
    } else {
      let ix = 0
      let iy = 0
      const len = this.getLineLength(p1x, p1y, p2x, p2y)

      if (len < PSEUDO_ZERO) {
        return null
      }

      let u =
        ((fromX - p1x) * (p2x - p1x))
        + ((fromY - p1y) * (p2y - p1y))

      u /= len * len
      ix = p1x + u * (p2x - p1x)
      iy = p1y + u * (p2y - p1y)

      const pRise = this.getLineLength(fromX, fromY, ix, iy)
      const pRun = Math.sqrt(dist * dist - pRise * pRise)

      run = Math.sqrt(pRun * pRun / (1 + m * m))

      if (p2x < p1x) {
        run *= -1
      }

      rise = m * run
      pt = {
        x: ix + run,
        y: iy + rise
      }
    }

    return pt
  }

  protected getPointOnPath(distance: number) {
    const fullLen = this.getPathLength()
    let cumulativePathLength = 0
    let p: IPoint = null

    if (distance < -0.00005
      || distance - 0.00005 > fullLen
    ) {
      return null
    }

    const { dataArray } = this

    for (const command of dataArray) {
      if (command
        && (
          command.pathLength < 0.00005
          || cumulativePathLength + command.pathLength + 0.00005 < distance
        )
      ) {
        cumulativePathLength += command.pathLength
        continue
      }

      const delta = distance - cumulativePathLength
      let currentT = 0

      switch (command.type) {
        case PathParser.LINE_TO:
          p = this.getPointOnLine(
            delta,
            command.start.x,
            command.start.y,
            command.points[0],
            command.points[1],
            command.start.x,
            command.start.y
          )
          break

        case PathParser.ARC: {
          const start = command.points[4]
          // 4 = theta
          const dTheta = command.points[5]
          // 5 = dTheta
          const end = command.points[4] + dTheta

          currentT = start + delta / command.pathLength * dTheta

          if (dTheta < 0 && currentT < end
            || dTheta >= 0 && currentT > end
          ) {
            break
          }

          p = this.getPointOnEllipticalArc(
            command.points[0],
            command.points[1],
            command.points[2],
            command.points[3],
            currentT,
            command.points[6]
          )
          break
        }

        case PathParser.CURVE_TO:

          currentT = delta / command.pathLength

          if (currentT > 1) {
            currentT = 1
          }

          p = this.getPointOnCubicBezier(
            currentT,
            command.start.x,
            command.start.y,
            command.points[0],
            command.points[1],
            command.points[2],
            command.points[3],
            command.points[4],
            command.points[5]
          )
          break

        case PathParser.QUAD_TO:

          currentT = delta / command.pathLength

          if (currentT > 1) {
            currentT = 1
          }

          p = this.getPointOnQuadraticBezier(
            currentT,
            command.start.x,
            command.start.y,
            command.points[0],
            command.points[1],
            command.points[2],
            command.points[3]
          )
          break

        default:
      }

      if (p) {
        return p
      }

      break
    }

    return null
  }

  protected getLineLength(
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    return Math.sqrt(
      (x2 - x1) * (x2 - x1)
      + (y2 - y1) * (y2 - y1)
    )
  }

  protected getPathLength() {
    if (this.pathLength === -1) {
      this.pathLength = this.dataArray.reduce<number>(
        (length, command: IPathCommand) => (
          command.pathLength > 0
            ? length + command.pathLength
            : length
        ),
        0
      )
    }

    return this.pathLength
  }

  protected getPointOnCubicBezier(
    pct: number,
    p1x: number,
    p1y: number,
    p2x: number,
    p2y: number,
    p3x: number,
    p3y: number,
    p4x: number,
    p4y: number
  ): IPoint {
    const x = p4x * CB1(pct) + p3x * CB2(pct) + p2x * CB3(pct) + p1x * CB4(pct)
    const y = p4y * CB1(pct) + p3y * CB2(pct) + p2y * CB3(pct) + p1y * CB4(pct)

    return {
      x,
      y
    }
  }

  protected getPointOnQuadraticBezier(
    pct: number,
    p1x: number,
    p1y: number,
    p2x: number,
    p2y: number,
    p3x: number,
    p3y: number
  ): IPoint {
    const x = p3x * QB1(pct) + p2x * QB2(pct) + p1x * QB3(pct)
    const y = p3y * QB1(pct) + p2y * QB2(pct) + p1y * QB3(pct)

    return {
      x,
      y
    }
  }

  protected getPointOnEllipticalArc(
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    theta: number,
    psi: number
  ): IPoint {
    const cosPsi = Math.cos(psi)
    const sinPsi = Math.sin(psi)
    const pt = {
      x: rx * Math.cos(theta),
      y: ry * Math.sin(theta)
    }

    return {
      x: cx + (pt.x * cosPsi - pt.y * sinPsi),
      y: cy + (pt.x * sinPsi + pt.y * cosPsi)
    }
  }

  // TODO need some optimisations. possibly build cache only for curved segments?
  protected buildEquidistantCache(
    inputStep: number,
    inputPrecision: number
  ) {
    const fullLen = this.getPathLength()
    const precision = inputPrecision || 0.25 // accuracy vs performance
    const step = inputStep || fullLen / 100

    if (!this.equidistantCache
      || this.equidistantCache.step !== step
      || this.equidistantCache.precision !== precision
    ) {
      // Prepare cache
      this.equidistantCache = {
        step,
        precision,
        points: []
      }

      // Calculate points
      let s = 0

      for (let l = 0; l <= fullLen; l += precision) {
        const p0 = this.getPointOnPath(l)
        const p1 = this.getPointOnPath(l + precision)

        if (!p0 || !p1) {
          continue
        }

        s += this.getLineLength(p0.x, p0.y, p1.x, p1.y)

        if (s >= step) {
          this.equidistantCache.points.push({
            x: p0.x,
            y: p0.y,
            distance: l
          })
          s -= step
        }
      }
    }
  }

  protected getEquidistantPointOnPath(
    targetDistance: number,
    step?: number,
    precision?: number
  ) {
    this.buildEquidistantCache(step, precision)

    if (targetDistance < 0
      || targetDistance - this.getPathLength() > 0.00005
    ) {
      return null
    }

    const idx = Math.round(
      targetDistance
      / this.getPathLength()
      * (this.equidistantCache.points.length - 1)
    )

    return this.equidistantCache.points[idx] || null
  }
}
