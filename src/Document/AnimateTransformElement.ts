import { toNumbers } from '../util'
import { AnimateElement } from './AnimateElement'

export class AnimateTransformElement extends AnimateElement {
  override type = 'animateTransform'

  override calcValue() {
    const {
      progress,
      from,
      to
    } = this.getProgress()
    // tween value linearly
    const transformFrom = toNumbers(from.getString())
    const transformTo = toNumbers(to.getString())
    const newValue = transformFrom.map((from, i) => {
      const to = transformTo[i]

      return from + (to - from) * progress
    }).join(' ')

    return newValue
  }
}
