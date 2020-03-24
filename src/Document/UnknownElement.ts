import Document from './Document';
import Element from './Element';

export default class UnknownElement extends Element {

	constructor(
		document: Document,
		node: HTMLElement,
		captureTextNodes?: boolean
	) {

		super(document, node, captureTextNodes);

		if (process.env.NODE_ENV !== 'production') {
			// tslint:disable-next-line: no-console
			console.warn(`Element ${node.nodeName} not yet implemented.`);
		}
	}
}
