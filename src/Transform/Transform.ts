import {
	compressSpaces
} from '../util';
import Point from '../Point';
import {
	ITransform
} from './types';
import Document from '../Document';
import Translate from './Translate';
import Rotate from './Rotate';
import Scale from './Scale';
import Matrix from './Matrix';
import Skew from './Skew';
import SkewX from './SkewX';
import SkewY from './SkewY';

export {
	Translate,
	Rotate,
	Scale,
	Matrix,
	Skew,
	SkewX,
	SkewY
};

function parseTransforms(transform: string) {
	return compressSpaces(transform)
		.trim()
		.replace(/\)([a-zA-Z])/g, ') $1')
		.replace(/\)(\s?,\s?)/g, ') ')
		.split(/\s(?=[a-z])/);
}

function parseTransform(transform: string) {

	const [
		type,
		value
	] = transform.split('(');

	return [
		type.trim(),
		value.trim().replace(')', '')
	];
}

export default class Transform {

	static transformTypes = {
		translate: Translate,
		rotate:    Rotate,
		scale:     Scale,
		matrix:    Matrix,
		skewX:     SkewX,
		skewY:     SkewY
	};

	private readonly transforms: ITransform[] = [];

	constructor(
		private readonly document: Document,
		transform: string
	) {

		const data = parseTransforms(transform);

		data.forEach((transform) => {

			if (transform === 'none') {
				return;
			}

			const [
				type,
				value
			] = parseTransform(transform);
			const TransformType = Transform.transformTypes[type];

			if (typeof TransformType !== 'undefined') {
				this.transforms.push(new TransformType(this.document, value));
			}
		});
	}

	apply(ctx: CanvasRenderingContext2D) {

		const {
			transforms
		} = this;
		const len = transforms.length;

		for (let i = 0; i < len; i++) {
			transforms[i].apply(ctx);
		}
	}

	unapply(ctx: CanvasRenderingContext2D) {

		const {
			transforms
		} = this;
		const len = transforms.length;

		for (let i = len - 1; i >= 0; i--) {
			transforms[i].unapply(ctx);
		}
	}

	// TODO: applyToPoint unused ... remove?
	applyToPoint(point: Point) {

		const {
			transforms
		} = this;
		const len = transforms.length;

		for (let i = 0; i < len; i++) {
			transforms[i].applyToPoint(point);
		}
	}
}
