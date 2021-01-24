import {
	RenderingContext2D
} from '../types';
import {
	PSEUDO_ZERO
} from '../util';
import Document from '../Document';
import Point from '../Point';

export default class Scale {
	type = 'scale';
	private readonly scale: Point = null;

	constructor(
		_: Document,
		scale: string
	) {
		const scaleSize = Point.parseScale(scale);

		// Workaround for node-canvas
		if (scaleSize.x === 0
			|| scaleSize.y === 0
		) {
			scaleSize.x = PSEUDO_ZERO;
			scaleSize.y = PSEUDO_ZERO;
		}

		this.scale = scaleSize;
	}

	apply(ctx: RenderingContext2D) {
		const {
			x,
			y
		} = this.scale;

		ctx.scale(x, y || x);
	}

	unapply(ctx: RenderingContext2D) {
		const {
			x,
			y
		} = this.scale;

		ctx.scale(1.0 / x, 1.0 / y || x);
	}

	applyToPoint(point: Point) {
		const {
			x,
			y
		} = this.scale;

		point.applyTransform([
			x || 0.0,
			0,
			0,
			y || 0.0,
			0,
			0
		]);
	}
}
