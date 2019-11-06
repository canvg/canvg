import {
	RenderingContext2D
} from '../types';

/**
 * Wrap rendering context to log every action.
 * @param ctx - Rendering context.
 */
export function ctxLogger(ctx: RenderingContext2D) {
	return new Proxy(ctx, {

		get(target, key) {

			const value = target[key];

			if (typeof value === 'function') {
				return (...args) => {

					const result = Reflect.apply(value, target, args);

					console.log('Call:', key, '()', args, '=>', result);

					return result;
				};
			}

			console.log('Get:', key, ':', value);

			return value;
		},

		set(target, key, value) {

			console.log('Set:', key, ':', value);

			target[key] = value;

			return true;
		}
	});
}

/**
 * Draw point.
 * @param ctx - Rendering context.
 * @param x - Point x.
 * @param y - Point y
 * @param radius - Point radius.
 */
export function point(ctx: RenderingContext2D, x = 0, y = 0, radius = 10) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.stroke();
}

/**
 * Draw triangle to vizualize angle.
 * @param ctx - Rendering context.
 * @param x - Angle x.
 * @param y - Angle y.
 * @param size - Triangle size.
 */
export function angle(ctx: RenderingContext2D, x = 0, y = 0, size = 10) {
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x + size * 2, y - size);
	ctx.lineTo(x + size * 2, y + size);
	ctx.lineTo(x, y);
	ctx.stroke();
}
