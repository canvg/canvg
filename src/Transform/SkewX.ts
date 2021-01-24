import Document from '../Document';
import Skew from './Skew';

export default class SkewX extends Skew {
	type = 'skewX';

	constructor(
		document: Document,
		skew: string
	) {
		super(document, skew);

		this.matrix = [
			1,
			0,
			Math.tan(this.angle.getRadians()),
			1,
			0,
			0
		];
	}
}
