// tslint:disable: variable-name
import {
	RenderingContext2D
} from '../types';
import Property from '../Property';
import Transform from '../Transform';
import RenderedElement from './RenderedElement';
import PathElement from './PathElement';
import SVGElement from './SVGElement';

export default class UseElement extends RenderedElement {

	type = 'use';
	private _element: PathElement;

	setContext(ctx: RenderingContext2D) {

		super.setContext(ctx);

		const xAttr = this.getAttribute('x');
		const yAttr = this.getAttribute('y');

		if (xAttr.hasValue()) {
			ctx.translate(xAttr.getPixels('x'), 0);
		}

		if (yAttr.hasValue()) {
			ctx.translate(0, yAttr.getPixels('y'));
		}
	}

	path(ctx: RenderingContext2D) {

		const {
			element
		} = this;

		if (element) {
			element.path(ctx);
		}
	}

	renderChildren(ctx: RenderingContext2D) {

		const {
			document,
			element
		} = this;

		if (element) {

			let tempSvg: RenderedElement = element;

			if (element.type === 'symbol') {
				// render me using a temporary svg element in symbol cases (http://www.w3.org/TR/SVG/struct.html#UseElement)
				tempSvg = new SVGElement(
					document,
					null
				);
				tempSvg.attributes.viewBox = new Property(
					document,
					'viewBox',
					element.getAttribute('viewBox').getString()
				);
				tempSvg.attributes.preserveAspectRatio = new Property(
					document,
					'preserveAspectRatio',
					element.getAttribute('preserveAspectRatio').getString()
				);
				tempSvg.attributes.overflow = new Property(
					document,
					'overflow',
					element.getAttribute('overflow').getString()
				);
				tempSvg.children = element.children;
			}

			if (tempSvg.type === 'svg') {

				const widthAttr = this.getAttribute('width');
				const heightAttr = this.getAttribute('height');
				// if symbol or svg, inherit width/height from me
				if (widthAttr.hasValue()) {
					tempSvg.attributes.width = new Property(
						document,
						'width',
						this.getAttribute('width').getString()
					);
				}

				if (heightAttr.hasValue()) {
					tempSvg.attributes.height = new Property(
						document,
						'height',
						heightAttr.getString()
					);
				}
			}

			const oldParent = tempSvg.parent;

			tempSvg.parent = null;
			tempSvg.render(ctx);
			tempSvg.parent = oldParent;
		}
	}

	getBoundingBox(ctx: RenderingContext2D) {

		const {
			element
		} = this;

		if (element) {
			return element.getBoundingBox(ctx);
		}

		return null;
	}

	elementTransform() {

		const {
			document,
			element
		} = this;

		return Transform.fromElement(document, element);
	}

	protected get element() {

		if (!this._element) {
			this._element = this.getHrefAttribute().getDefinition();
		}

		return this._element;
	}
}
