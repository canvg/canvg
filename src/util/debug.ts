/* eslint-disable */
import { RenderingContext2D } from '../types'

/**
 * Wrap rendering context to log every action.
 * @param ctx - Rendering context.
 * @returns Proxy logger.
 */
export function ctxLogger(ctx: RenderingContext2D) {
  return new Proxy(ctx, {

    get(target: any, key) {
      const value = target[key]

      if (typeof value === 'function') {
        return (...args: unknown[]) => {
          const result = Reflect.apply(value, target, args)

          console.log('Call:', key, '()', args, '=>', result)

          return result
        }
      }

      console.log('Get:', key, ':', value)

      return value
    },

    set(target, key, value) {
      console.log('Set:', key, ':', value)

      target[key] = value

      return true
    }
  })
}

/**
 * Draw point.
 * @param ctx - Rendering context.
 * @param x - Point x.
 * @param y - Point y
 * @param radius - Point radius.
 */
export function point(ctx: RenderingContext2D, x = 0, y = 0, radius = 10) {
  ctx.lineWidth = 2
  ctx.strokeStyle = 'red'
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.stroke()
}

/**
 * Draw triangle to vizualize angle.
 * @param ctx - Rendering context.
 * @param x - Angle x.
 * @param y - Angle y.
 * @param size - Triangle size.
 */
export function angle(ctx: RenderingContext2D, x = 0, y = 0, size = 10) {
  ctx.lineWidth = 2
  ctx.strokeStyle = 'red'
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + size * 2, y - size)
  ctx.lineTo(x + size * 2, y + size)
  ctx.lineTo(x, y)
  ctx.stroke()
}

/**
 * Draw triangle to vizualize angle.
 * @param ctx - Rendering context.
 * @param x - Angle x.
 * @param y - Angle y.
 * @param width
 * @param height
 */
export function box(ctx: RenderingContext2D, x: number, y: number, width: number, height: number) {
  ctx.lineWidth = 2
  ctx.strokeStyle = 'red'
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + width, y)
  ctx.lineTo(x + width, y + height)
  ctx.lineTo(x, y + height)
  ctx.lineTo(x, y)
  ctx.stroke()
}
