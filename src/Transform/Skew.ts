import Document from '../Document';
import Property from '../Property';
import Matrix from './Matrix';

export default class Skew extends Matrix {

	type = 'skew';
	protected readonly angle: Property = null;

	constructor(
		document: Document,
		skew: string
	) {

		super(document, skew);

		this.angle = new Property(document, 'angle', skew);
	}
}
