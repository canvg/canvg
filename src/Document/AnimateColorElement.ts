import RGBColor from 'rgbcolor'
import { AnimateElement } from './AnimateElement'

export class AnimateColorElement extends AnimateElement {
  override type = 'animateColor'

  override calcValue() {
    const {
      progress,
      from,
      to
    } = this.getProgress()
    const colorFrom = new RGBColor(from.getColor())
    const colorTo = new RGBColor(to.getColor())

    if (colorFrom.ok && colorTo.ok) {
      // tween color linearly
      const r = colorFrom.r + (colorTo.r - colorFrom.r) * progress
      const g = colorFrom.g + (colorTo.g - colorFrom.g) * progress
      const b = colorFrom.b + (colorTo.b - colorFrom.b) * progress

      // ? alpha
      return `rgb(${
        Math.floor(r)
      }, ${
        Math.floor(g)
      }, ${
        Math.floor(b)
      })`
    }

    return this.getAttribute('from').getColor()
  }
}
