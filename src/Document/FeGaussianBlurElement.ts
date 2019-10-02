import {
	canvasRGBA
} from 'stackblur-canvas';
import Document from './Document';
import Element from './Element';

export default class FeGaussianBlurElement extends Element {

	type = 'feGaussianBlur';
	readonly extraFilterDistance: number;
	protected readonly blurRadius: number;

	constructor(
		document: Document,
		node: HTMLElement,
		captureTextNodes?: boolean
	) {

		super(document, node, captureTextNodes);

		this.blurRadius = Math.floor(this.getAttribute('stdDeviation').getNumber());
		this.extraFilterDistance = this.blurRadius;
	}

	apply(
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		width: number,
		height: number
	) {

		const {
			document,
			blurRadius
		} = this;
		const body = document.window
			? document.window.document.body
			: null;

		// StackBlur requires canvas be on document
		ctx.canvas.id = document.getUniqueId();

		if (body) {
			ctx.canvas.style.display = 'none';
			body.appendChild(ctx.canvas);
		}

		canvasRGBA(ctx.canvas, x, y, width, height, blurRadius);

		if (body) {
			body.removeChild(ctx.canvas);
		}
	}
}
