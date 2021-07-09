import Document from '../Document';
import Property from '../Property';
import Matrix from './Matrix';

export default class Skew extends Matrix {
	type = 'skew';
	protected readonly angle: Property = null;

	constructor(
		document: Document,
		skew: string,
		transformOrigin: [Property<string>, Property<string>]
	) {
		super(document, skew, transformOrigin);

		this.angle = new Property(document, 'angle', skew);
	}
}
