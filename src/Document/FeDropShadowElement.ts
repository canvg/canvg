import {
	RenderingContext2D
} from '../types';
import Document from './Document';
import Element from './Element';

export default class FeDropShadowElement extends Element {

	type = 'feDropShadow';

	constructor(
		document: Document,
		node: HTMLElement,
		captureTextNodes?: boolean
	) {

		super(document, node, captureTextNodes);

		this.addStylesFromStyleDefinition();
	}

	apply(
		_: RenderingContext2D,
		__: number,
		___: number,
		____: number,
		_____: number
	) {
		// TODO: implement
	}
}
