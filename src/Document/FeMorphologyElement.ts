import {
	RenderingContext2D
} from '../types';
import Element from './Element';

export default class FeMorphologyElement extends Element {
	type = 'feMorphology';

	apply(
		_: RenderingContext2D,
		_x: number,
		_y: number,
		_width: number,
		_height: number
	) {
		// TODO: implement
	}
}
