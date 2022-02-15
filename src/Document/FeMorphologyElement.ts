import { RenderingContext2D } from '../types'
import { Element } from './Element'

export class FeMorphologyElement extends Element {
  override type = 'feMorphology'

  apply(
    _: RenderingContext2D,
    _x: number,
    _y: number,
    _width: number,
    _height: number
  ) {
    // TODO: implement
  }
}
