import {
	RenderingContext2D
} from '../types';
import BoundingBox from '../BoundingBox';
import Element from './Element';
import PathElement from './PathElement';
import FeColorMatrixElement from './FeColorMatrixElement';

export default class MaskElement extends Element {

	type = 'mask';

	apply(ctx: RenderingContext2D, element: Element) {

		const {
			document
		} = this;
		// render as temp svg
		let x = this.getAttribute('x').getPixels('x');
		let y = this.getAttribute('y').getPixels('y');
		let width = this.getAttribute('width').getPixels('x');
		let height = this.getAttribute('height').getPixels('y');

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

		// temporarily remove mask to avoid recursion
		const mask = element.getStyle('mask').getString();

		element.getStyle('mask').setValue('');

		const cMask = document.createCanvas(x + width, y + height);
		const maskCtx = cMask.getContext('2d');

		document.screen.setDefaults(maskCtx);
		this.renderChildren(maskCtx);

		// convert mask to alpha with a fake node
		// TODO: refactor out apply from feColorMatrix
		const cm = new FeColorMatrixElement(
			document,
			{
				nodeType: 1,
				childNodes: [],
				attributes: [
					{ nodeName: 'type', value: 'luminanceToAlpha' },
					{ nodeName: 'includeOpacity', value: 'true' }
				]
			} as any
		);

		cm.apply(maskCtx, 0, 0, x + width, y + height);

		const c = document.createCanvas(x + width, y + height);
		const tempCtx = c.getContext('2d');

		document.screen.setDefaults(tempCtx);
		element.render(tempCtx);

		tempCtx.globalCompositeOperation = 'destination-in';
		tempCtx.fillStyle = maskCtx.createPattern(cMask, 'no-repeat');
		tempCtx.fillRect(0, 0, x + width, y + height);

		ctx.fillStyle = tempCtx.createPattern(c, 'no-repeat');
		ctx.fillRect(0, 0, x + width, y + height);

		// reassign mask
		element.getStyle('mask').setValue(mask);
	}

	render(_: RenderingContext2D) {
		// NO RENDER
	}
}
