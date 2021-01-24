import {
	RenderingContext2D
} from '../types';
import {
	toNumbers
} from '../util';
import Document from '../Document';
import Point from '../Point';
import {
	ITransform
} from './types';

export default class Matrix implements ITransform {
	type = 'matrix';
	protected matrix: number[] = [];

	constructor(
		_: Document,
		matrix: string
	) {
		this.matrix = toNumbers(matrix);
	}

	apply(ctx: RenderingContext2D) {
		const {
			matrix
		} = this;

		ctx.transform(
			matrix[0],
			matrix[1],
			matrix[2],
			matrix[3],
			matrix[4],
			matrix[5]
		);
	}

	unapply(ctx: RenderingContext2D) {
		const {
			matrix
		} = this;
		const a = matrix[0];
		const b = matrix[2];
		const c = matrix[4];
		const d = matrix[1];
		const e = matrix[3];
		const f = matrix[5];
		const g = 0.0;
		const h = 0.0;
		const i = 1.0;
		const det = 1 / (a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g));

		ctx.transform(
			det * (e * i - f * h),
			det * (f * g - d * i),
			det * (c * h - b * i),
			det * (a * i - c * g),
			det * (b * f - c * e),
			det * (c * d - a * f)
		);
	}

	applyToPoint(point: Point) {
		point.applyTransform(this.matrix);
	}
}
