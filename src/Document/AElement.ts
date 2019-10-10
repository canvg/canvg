import Property from '../Property';
import Font from '../Font';
import BoundingBox from '../BoundingBox';
import Document from './Document';
import TextElement from './TextElement';
import GElement from './GElement';

export default class AElement extends TextElement {

	type = 'a';
	protected readonly hasText: boolean;
	protected readonly text: string;

	constructor(
		document: Document,
		node: HTMLElement,
		captureTextNodes?: boolean
	) {

		super(document, node, captureTextNodes);

		let hasText = node.childNodes.length > 0;

		if (hasText) {
			Array.from(node.childNodes).some((node) => {

				if (node.nodeType !== 3) {
					hasText = false;
					return true;
				}

				return false;
			});
		}

		const firstChild = node.childNodes[0] as any;

		this.hasText = hasText;
		this.text = hasText
			? firstChild.value || firstChild.data
			: '';
	}

	getText() {
		return this.text;
	}

	renderChildren(ctx: CanvasRenderingContext2D) {

		if (this.hasText) {
			// render as text element
			super.renderChildren(ctx);

			const {
				document,
				x,
				y
			} = this;
			const fontSize = new Property(
				document,
				'fontSize',
				Font.parse(document.ctx.font).fontSize
			);

			document.screen.mouse.checkBoundingBox(
				this,
				new BoundingBox(
					x,
					y - fontSize.getPixels('y'),
					x + this.measureText(ctx),
					y
				)
			);

		} else
		if (this.children.length > 0) {
			// render as temporary group
			const g = new GElement(
				this.document,
				null
			);

			g.children = this.children;
			g.parent = this;
			g.render(ctx);
		}
	}

	onClick() {

		const {
			window
		} = this.document;

		if (window) {
			window.open(this.getHrefAttribute().getString());
		}
	}

	onMouseMove() {
		this.document.ctx.canvas.style.cursor = 'pointer';
	}
}