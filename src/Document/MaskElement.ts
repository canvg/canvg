import {
	RenderingContext2D
} from '../types';
import BoundingBox from '../BoundingBox';
import Element from './Element';
import PathElement from './PathElement';
import FeColorMatrixElement from './FeColorMatrixElement';

export default class MaskElement extends Element {

	static ignoreStyles = [
		'mask',
		'transform',
		'clip-path'
	];

	type = 'mask';

	apply(ctx: RenderingContext2D, element: Element) {

		const {
			document
		} = this;
		// render as temp svg
		let x = this.getAttribute('x').getPixels('x');
		let y = this.getAttribute('y').getPixels('y');
		let width = this.getStyle('width').getPixels('x');
		let height = this.getStyle('height').getPixels('y');

		if (!width && !height) {

			const boundingBox = new BoundingBox();

			this.children.forEach((child: PathElement) => {
				boundingBox.addBoundingBox(child.getBoundingBox(ctx));
			});

			x = Math.floor(boundingBox.x1);
			y = Math.floor(boundingBox.y1);
			width = Math.floor(boundingBox.width);
			height = Math.floor(boundingBox.height);
		}

		const ignoredStyles = this.removeStyles(element, MaskElement.ignoreStyles);
		const targetWidth = x + width;
		const targetHeight = y + height;
		const [
			maskCanvas,
			maskCtx
		] = document.createTmpCanvas(targetWidth, targetHeight);
		const tmpCanvasWidth = maskCanvas.width;
		const tmpCanvasHeight = maskCanvas.height;

		this.renderChildren(maskCtx);

		// convert mask to alpha with a fake node
		// TODO: refactor out apply from feColorMatrix
		new FeColorMatrixElement(
			document,
			({
				nodeType: 1,
				childNodes: [],
				attributes: [
					{ nodeName: 'type', value: 'luminanceToAlpha' },
					{ nodeName: 'includeOpacity', value: 'true' }
				]
			}) as any
		).apply(maskCtx, 0, 0, tmpCanvasWidth, tmpCanvasHeight);

		// const [
		// 	tmpCanvas,
		// 	tmpCtx
		// ] = document.createTmpCanvas(targetWidth, targetHeight);

		element.render(ctx);

		// document.screen.unscalePixelRatio(tmpCtx);

		// tmpCtx.globalCompositeOperation = 'destination-in';
		// tmpCtx.fillStyle = maskCtx.createPattern(maskCanvas, 'no-repeat');
		// tmpCtx.fillRect(0, 0, tmpCanvasWidth, tmpCanvasHeight);

		// document.screen.scalePixelRatio(tmpCtx);

		// window.document.body.appendChild(tmpCanvas as any);

		// document.screen.unscalePixelRatio(ctx);

		// ctx.fillStyle = tmpCtx.createPattern(tmpCanvas, 'no-repeat');
		// ctx.fillRect(0, 0, tmpCanvasWidth, tmpCanvasHeight);

		// document.screen.scalePixelRatio(ctx);

		// reassign mask
		this.restoreStyles(element, ignoredStyles);
	}

	render(_: RenderingContext2D) {
		// NO RENDER
	}
}
