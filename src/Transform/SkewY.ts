import Document from '../Document';
import Skew from './Skew';

export default class SkewY extends Skew {
	type = 'skewY';

	constructor(
		document: Document,
		skew: string
	) {
		super(document, skew);

		this.matrix = [
			1,
			Math.tan(this.angle.getRadians()),
			0,
			1,
			0,
			0
		];
	}
}
