import {
	toNumberArray
} from '../util';
import Document from '../Document';
import Property from '../Property';
import Point from '../Point';

export default class Rotate {

	type = 'rotate';
	private readonly angle: Property = null;
	private readonly cx: number = 0;
	private readonly cy: number = 0;

	constructor(
		document: Document,
		rotate: string
	) {

		const numbers = toNumberArray(rotate);

		this.angle = new Property(document, 'angle', numbers[0]);
		this.cx = numbers[1] || 0;
		this.cy = numbers[2] || 0;
	}

	apply(ctx: CanvasRenderingContext2D) {

		const {
			cx,
			cy,
			angle
		} = this;

		ctx.translate(cx, cy);
		ctx.rotate(angle.getRadians());
		ctx.translate(-cx, -cy);
	}

	unapply(ctx: CanvasRenderingContext2D) {

		const {
			cx,
			cy,
			angle
		} = this;

		ctx.translate(cx, cy);
		ctx.rotate(-1.0 * angle.getRadians());
		ctx.translate(-cx, -cy);
	}

	applyToPoint(point: Point) {

		const {
			cx,
			cy,
			angle
		} = this;
		const rad = angle.getRadians();

		// tslint:disable-next-line: no-console
		// console.warn('Unknown action:', (this as any).p, this);
		// ?

		point.applyTransform([
			1,
			0,
			0,
			1,
			cx || 0.0, // this.p.x
			cy || 0.0 // this.p.y
		]);
		point.applyTransform([
			Math.cos(rad),
			Math.sin(rad),
			-Math.sin(rad),
			Math.cos(rad),
			0,
			0
		]);
		point.applyTransform([
			1,
			0,
			0,
			1,
			-cx || 0.0, // -this.p.x
			-cy || 0.0 // -this.p.y
		]);
	}
}
