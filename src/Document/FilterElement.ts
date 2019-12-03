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
			document
		} = this;
		const boundingBox = element.getBoundingBox(ctx);

		if (!boundingBox) {
			return;
		}

		const x = Math.floor(boundingBox.x1);
		const y = Math.floor(boundingBox.y1);
		const width = Math.floor(boundingBox.width);
		const height = Math.floor(boundingBox.height);
		// temporarily remove filter to avoid recursion
		const filter = element.getStyle('filter').getString();

		element.getStyle('filter').setValue('');

		let px = 0;
		let py = 0;

		this.children.forEach((child: FeGaussianBlurElement) => {

			const efd = child.extraFilterDistance || 0;

			px = Math.max(px, efd);
			py = Math.max(py, efd);
		});

		const tmpCanvas = document.createCanvas(width + 2 * px, height + 2 * py);
		const tmpCtx = tmpCanvas.getContext('2d');

		document.screen.setDefaults(tmpCtx);
		tmpCtx.translate(-x + px, -y + py);
		element.render(tmpCtx);

		// apply filters
		this.children.forEach((child: FeGaussianBlurElement) => {

			if (typeof child.apply === 'function') {
				child.apply(
					tmpCtx,
					0,
					0,
					width + 2 * px,
					height + 2 * py
				);
			}
		});

		// render on me
		ctx.drawImage(
			tmpCanvas,
			0,
			0,
			width + 2 * px,
			height + 2 * py,
			x - px,
			y - py,
			width + 2 * px,
			height + 2 * py
		);

		// reassign filter
		element.getStyle('filter', true).setValue(filter);
	}

	render(_: RenderingContext2D) {
		// NO RENDER
	}
}
