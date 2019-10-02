import {
	compressSpaces
} from '../util';
import Document from './Document';
import TextElement from './TextElement';

export default class TSpanElement extends TextElement {

	type = 'tspan';
	protected readonly text: string;

	constructor(
		document: Document,
		node: HTMLElement,
		captureTextNodes?: boolean
	) {

		super(
			document,
			node,
			new.target === TSpanElement
				? true
				: captureTextNodes
		);

		this.text = compressSpaces(
			(node as any).value
			|| (node as any).text
			|| node.textContent
			|| ''
		);
	}

	getText() {
		// if this node has children, then they own the text
		if (this.children.length > 0) {
			return '';
		}

		return this.text;
	}
}
