import Document from '../Document';
import Point from '../Point';

export default class Scale {

	type = 'scale';
	private readonly point: Point = null;

	constructor(
		_: Document,
		point: string
	) {
		this.point = Point.parse(point);
	}

	apply(ctx: CanvasRenderingContext2D) {

		const {
			x,
			y
		} = this.point;

		ctx.scale(x || 1.0, y || x || 1.0);
	}

	unapply(ctx: CanvasRenderingContext2D) {

		const {
			x,
			y
		} = this.point;

		ctx.scale(1.0 / x || 1.0, 1.0 / y || x || 1.0);
	}

	applyToPoint(point: Point) {

		const {
			x,
			y
		} = this.point;

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
