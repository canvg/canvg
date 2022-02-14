
export class BoundingBox {
  constructor(
    public x1 = Number.NaN,
    public y1 = Number.NaN,
    public x2 = Number.NaN,
    public y2 = Number.NaN
  ) {
    this.addPoint(x1, y1)
    this.addPoint(x2, y2)
  }

  get x() {
    return this.x1
  }

  get y() {
    return this.y1
  }

  get width() {
    return this.x2 - this.x1
  }

  get height() {
    return this.y2 - this.y1
  }

  addPoint(x: number | undefined, y: number | undefined) {
    if (typeof x !== 'undefined') {
      if (isNaN(this.x1) || isNaN(this.x2)) {
        this.x1 = x
        this.x2 = x
      }

      if (x < this.x1) {
        this.x1 = x
      }

      if (x > this.x2) {
        this.x2 = x
      }
    }

    if (typeof y !== 'undefined') {
      if (isNaN(this.y1) || isNaN(this.y2)) {
        this.y1 = y
        this.y2 = y
      }

      if (y < this.y1) {
        this.y1 = y
      }

      if (y > this.y2) {
        this.y2 = y
      }
    }
  }

  addX(x: number) {
    this.addPoint(x, 0)
  }

  addY(y: number) {
    this.addPoint(0, y)
  }

  addBoundingBox(boundingBox: BoundingBox | null) {
    if (!boundingBox) {
      return
    }

    const {
      x1,
      y1,
      x2,
      y2
    } = boundingBox

    this.addPoint(x1, y1)
    this.addPoint(x2, y2)
  }

  private sumCubic(
    t: number,
    p0: number,
    p1: number,
    p2: number,
    p3: number
  ) {
    return (
      Math.pow(1 - t, 3) * p0
      + 3 * Math.pow(1 - t, 2) * t * p1
      + 3 * (1 - t) * Math.pow(t, 2) * p2
      + Math.pow(t, 3) * p3
    )
  }

  private bezierCurveAdd(
    forX: boolean,
    p0: number,
    p1: number,
    p2: number,
    p3: number
  ) {
    const b = 6 * p0 - 12 * p1 + 6 * p2
    const a = -3 * p0 + 9 * p1 - 9 * p2 + 3 * p3
    const c = 3 * p1 - 3 * p0

    if (a === 0) {
      if (b === 0) {
        return
      }

      const t = -c / b

      if (0 < t && t < 1) {
        if (forX) {
          this.addX(this.sumCubic(t, p0, p1, p2, p3))
        } else {
          this.addY(this.sumCubic(t, p0, p1, p2, p3))
        }
      }

      return
    }

    const b2ac = Math.pow(b, 2) - 4 * c * a

    if (b2ac < 0) {
      return
    }

    const t1 = (-b + Math.sqrt(b2ac)) / (2 * a)

    if (0 < t1 && t1 < 1) {
      if (forX) {
        this.addX(
          this.sumCubic(t1, p0, p1, p2, p3)
        )
      } else {
        this.addY(
          this.sumCubic(t1, p0, p1, p2, p3)
        )
      }
    }

    const t2 = (-b - Math.sqrt(b2ac)) / (2 * a)

    if (0 < t2 && t2 < 1) {
      if (forX) {
        this.addX(this.sumCubic(t2, p0, p1, p2, p3))
      } else {
        this.addY(this.sumCubic(t2, p0, p1, p2, p3))
      }
    }
  }

  // from http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
  addBezierCurve(
    p0x: number,
    p0y: number,
    p1x: number,
    p1y: number,
    p2x: number,
    p2y: number,
    p3x: number,
    p3y: number
  ) {
    this.addPoint(p0x, p0y)
    this.addPoint(p3x, p3y)
    this.bezierCurveAdd(true, p0x, p1x, p2x, p3x)
    this.bezierCurveAdd(false, p0y, p1y, p2y, p3y)
  }

  addQuadraticCurve(
    p0x: number,
    p0y: number,
    p1x: number,
    p1y: number,
    p2x: number,
    p2y: number
  ) {
    const cp1x = p0x + 2 / 3 * (p1x - p0x) // CP1 = QP0 + 2/3 *(QP1-QP0)
    const cp1y = p0y + 2 / 3 * (p1y - p0y) // CP1 = QP0 + 2/3 *(QP1-QP0)
    const cp2x = cp1x + 1 / 3 * (p2x - p0x) // CP2 = CP1 + 1/3 *(QP2-QP0)
    const cp2y = cp1y + 1 / 3 * (p2y - p0y) // CP2 = CP1 + 1/3 *(QP2-QP0)

    this.addBezierCurve(p0x, p0y, cp1x, cp2x, cp1y, cp2y, p2x, p2y)
  }

  isPointInBox(
    x: number,
    y: number
  ) {
    const {
      x1,
      y1,
      x2,
      y2
    } = this

    return (
      x1 <= x
      && x <= x2
      && y1 <= y
      && y <= y2
    )
  }
}
