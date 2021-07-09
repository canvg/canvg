import Document from '../Document';
import Property from '../Property';
import Skew from './Skew';

export default class SkewX extends Skew {
	type = 'skewX';

	constructor(
		document: Document,
		skew: string,
		transformOrigin: [Property<string>, Property<string>]
	) {
		super(document, skew, transformOrigin);

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
