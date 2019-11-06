import {
	RenderingContext2D
} from '../types';
import RenderedElement from './RenderedElement';

export default class SymbolElement extends RenderedElement {

	type = 'symbol';

	render(_: RenderingContext2D) {
		// NO RENDER
	}
}
