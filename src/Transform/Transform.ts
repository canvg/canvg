import { RenderingContext2D } from '../types'
import { compressSpaces } from '../util'
import { Property } from '../Property'
import { Point } from '../Point'
import { Document, Element } from '../Document'
import { ITransform } from './types'
import { Translate } from './Translate'
import { Rotate } from './Rotate'
import { Scale } from './Scale'
import { Matrix } from './Matrix'
import { SkewX } from './SkewX'
import { SkewY } from './SkewY'

function parseTransforms(transform: string) {
  return compressSpaces(transform)
    .trim()
    .replace(/\)([a-zA-Z])/g, ') $1')
    .replace(/\)(\s?,\s?)/g, ') ')
    .split(/\s(?=[a-z])/)
}

function parseTransform(transform: string) {
  const [type = '', value = ''] = transform.split('(')

  return [type.trim(), value.trim().replace(')', '')] as const
}

interface ITransformConstructor {
  prototype: ITransform
  new (
    document: Document,
    value: string,
    transformOrigin: readonly [Property<string>, Property<string>]
  ): ITransform
}

export class Transform {
  static fromElement(document: Document, element: Element) {
    const transformStyle = element.getStyle('transform', false, true)

    if (transformStyle.hasValue()) {
      const [transformOriginXProperty, transformOriginYProperty = transformOriginXProperty] = element.getStyle('transform-origin', false, true).split()

      if (transformOriginXProperty && transformOriginYProperty) {
        const transformOrigin = [transformOriginXProperty, transformOriginYProperty] as const

        return new Transform(
          document,
          transformStyle.getString(),
          transformOrigin
        )
      }
    }

    return null
  }

  static transformTypes: Record<string, ITransformConstructor> = {
    translate: Translate,
    rotate: Rotate,
    scale: Scale,
    matrix: Matrix,
    skewX: SkewX,
    skewY: SkewY
  }

  private readonly transforms: ITransform[] = []

  constructor(
    private readonly document: Document,
    transform: string,
    transformOrigin: readonly [Property<string>, Property<string>]
  ) {
    const data = parseTransforms(transform)

    data.forEach((transform) => {
      if (transform === 'none') {
        return
      }

      const [type, value] = parseTransform(transform)
      const TransformType = Transform.transformTypes[type]

      if (TransformType) {
        this.transforms.push(new TransformType(this.document, value, transformOrigin))
      }
    })
  }

  apply(ctx: RenderingContext2D) {
    this.transforms.forEach(transform => transform.apply(ctx))
  }

  unapply(ctx: RenderingContext2D) {
    this.transforms.forEach(transform => transform.unapply(ctx))
  }

  // TODO: applyToPoint unused ... remove?
  applyToPoint(point: Point) {
    this.transforms.forEach(transform => transform.applyToPoint(point))
  }
}
