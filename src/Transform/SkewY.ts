import Document from '../Document';
import Property from '../Property';
import Skew from './Skew';

export default class SkewY extends Skew {
	type = 'skewY';

	constructor(
		document: Document,
		skew: string,
		transformOrigin: [Property<string>, Property<string>]
	) {
		super(document, skew, transformOrigin);

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
