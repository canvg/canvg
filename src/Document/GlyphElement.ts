import Document from './Document';
import PathElement from './PathElement';

export default class GlyphElement extends PathElement {

	type = 'glyph';
	readonly horizAdvX: number;
	readonly unicode: string;
	readonly arabicForm: string;

	constructor(
		document: Document,
		node: HTMLElement,
		captureTextNodes?: boolean
	) {

		super(document, node, captureTextNodes);

		this.horizAdvX = this.getAttribute('horiz-adv-x').getNumber();
		this.unicode = this.getAttribute('unicode').getString();
		this.arabicForm = this.getAttribute('arabic-form').getString();
	}
}
