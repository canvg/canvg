import {
	RenderingContext2D
} from '../types';
import Element from './Element';
import PathElement from './PathElement';
import FeGaussianBlurElement from './FeGaussianBlurElement';

export default class FilterElement extends Element {

	type = 'filter';

	apply(ctx: RenderingContext2D, element: PathElement) {
		// render as temp svg
		const {
			document,
			children
		} = this;
		const boundingBox = element.getBoundingBox(ctx);

		if (!boundingBox) {
			return;
		}

		let px = 0;
		let py = 0;

		children.forEach((child: FeGaussianBlurElement) => {

			const efd = child.extraFilterDistance || 0;

			px = Math.max(px, efd);
			py = Math.max(py, efd);
		});

		const width = Math.floor(boundingBox.width);
		const height = Math.floor(boundingBox.height);
		const tmpCanvasWidth = width + 2 * px;
		const tmpCanvasHeight = height + 2 * py;

		if (tmpCanvasWidth < 1 || tmpCanvasHeight < 1) {
			return;
		}

		const x = Math.floor(boundingBox.x1);
		const y = Math.floor(boundingBox.y1);
		// temporarily remove filter to avoid recursion
		const filter = element.getStyle('filter').getString();

		element.getStyle('filter').setValue('');

		const tmpCanvas = document.createCanvas(tmpCanvasWidth, tmpCanvasHeight);
		const tmpCtx = tmpCanvas.getContext('2d');

		document.screen.setDefaults(tmpCtx);
		tmpCtx.translate(-x + px, -y + py);
		element.render(tmpCtx);

		// apply filters
		children.forEach((child: FeGaussianBlurElement) => {

			if (typeof child.apply === 'function') {
				child.apply(
					tmpCtx,
					0,
					0,
					tmpCanvasWidth,
					tmpCanvasHeight
				);
			}
		});

		// render on me
		ctx.drawImage(
			tmpCanvas,
			0,
			0,
			tmpCanvasWidth,
			tmpCanvasHeight,
			x - px,
			y - py,
			tmpCanvasWidth,
			tmpCanvasHeight
		);

		// reassign filter
		element.getStyle('filter', true).setValue(filter);
	}

	render(_: RenderingContext2D) {
		// NO RENDER
	}
}
