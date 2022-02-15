import {
  SVGCommand,
  CommandM,
  CommandL,
  CommandH,
  CommandV,
  CommandZ,
  CommandQ,
  CommandT,
  CommandC,
  CommandS,
  CommandA
} from 'svg-pathdata/lib/types'
import { SVGPathData } from 'svg-pathdata'
import { Point } from './Point'

export type CommandType = SVGCommand['type']
export type Command = { type: CommandType }
  & Omit<CommandM, 'type'>
  & Omit<CommandL, 'type'>
  & Omit<CommandH, 'type'>
  & Omit<CommandV, 'type'>
  & Omit<CommandZ, 'type'>
  & Omit<CommandQ, 'type'>
  & Omit<CommandT, 'type'>
  & Omit<CommandC, 'type'>
  & Omit<CommandS, 'type'>
  & Omit<CommandA, 'type'>

export class PathParser extends SVGPathData {
  control: Point = new Point(0, 0)
  start: Point = new Point(0, 0)
  current: Point = new Point(0, 0)
  command: Command | null = null
  override readonly commands: Command[] /* Babel fix: */ = this.commands
  private i = -1
  private previousCommand: Command | null = null
  private points: Point[] = []
  private angles: (number | null)[] = []

  constructor(path: string) {
    super(
      path
        // Fix spaces after signs.
        .replace(/([+\-.])\s+/gm, '$1')
        // Remove invalid part.
        .replace(/[^MmZzLlHhVvCcSsQqTtAae\d\s.,+-].*/g, '')
    )
  }

  reset() {
    this.i = -1
    this.command = null
    this.previousCommand = null
    this.start = new Point(0, 0)
    this.control = new Point(0, 0)
    this.current = new Point(0, 0)
    this.points = []
    this.angles = []
  }

  isEnd() {
    const {
      i,
      commands
    } = this

    return i >= commands.length - 1
  }

  next() {
    const command = this.commands[++this.i]

    this.previousCommand = this.command
    this.command = command

    return command
  }

  getPoint(xProp = 'x', yProp = 'y') {
    const point = new Point(
      this.command[xProp] as number,
      this.command[yProp] as number
    )

    return this.makeAbsolute(point)
  }

  getAsControlPoint(xProp?: string, yProp?: string) {
    const point = this.getPoint(xProp, yProp)

    this.control = point

    return point
  }

  getAsCurrentPoint(xProp?: string, yProp?: string) {
    const point = this.getPoint(xProp, yProp)

    this.current = point

    return point
  }

  getReflectedControlPoint() {
    const previousCommand = this.previousCommand.type

    if (previousCommand !== SVGPathData.CURVE_TO
      && previousCommand !== SVGPathData.SMOOTH_CURVE_TO
      && previousCommand !== SVGPathData.QUAD_TO
      && previousCommand !== SVGPathData.SMOOTH_QUAD_TO
    ) {
      return this.current
    }

    // reflect point
    const {
      current: {
        x: cx,
        y: cy
      },
      control: {
        x: ox,
        y: oy
      }
    } = this
    const point = new Point(2 * cx - ox, 2 * cy - oy)

    return point
  }

  makeAbsolute(point: Point) {
    if (this.command.relative) {
      const {
        x,
        y
      } = this.current

      point.x += x
      point.y += y
    }

    return point
  }

  addMarker(point: Point, from?: Point, priorTo?: Point) {
    const {
      points,
      angles
    } = this

    // if the last angle isn't filled in because we didn't have this point yet ...
    if (priorTo && angles.length > 0 && !angles[angles.length - 1]) {
      angles[angles.length - 1] = points[points.length - 1].angleTo(priorTo)
    }

    this.addMarkerAngle(point, from ? from.angleTo(point) : null)
  }

  addMarkerAngle(point: Point, angle: number) {
    this.points.push(point)
    this.angles.push(angle)
  }

  getMarkerPoints() {
    return this.points
  }

  getMarkerAngles() {
    const { angles } = this
    const len = angles.length

    for (let i = 0; i < len; i++) {
      if (!angles[i]) {
        for (let j = i + 1; j < len; j++) {
          if (angles[j]) {
            angles[i] = angles[j]
            break
          }
        }
      }
    }

    return angles
  }
}
