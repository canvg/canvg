import {
	RenderingContext2D
} from '../types';
import {
	toNumbers
} from '../util';
import Property from '../Property';
import Font from '../Font';
import RenderedElement from './RenderedElement';

export default class SVGElement extends RenderedElement {

	type = 'svg';
	root = false;

	clearContext(ctx: RenderingContext2D) {

		super.clearContext(ctx);

		this.document.screen.viewPort.removeCurrent();
	}

	setContext(ctx: RenderingContext2D) {

		const {
			document
		} = this;
		const {
			screen,
			window
		} = document;
		const canvas = ctx.canvas as HTMLCanvasElement;

		screen.setDefaults(ctx);

		if (canvas.style
			&& typeof ctx.font !== 'undefined'
			&& window
			&& typeof window.getComputedStyle !== 'undefined'
		) {

			ctx.font = window.getComputedStyle(canvas).getPropertyValue('font');

			const fontSizeProp = new Property(
				document,
				'fontSize',
				Font.parse(ctx.font).fontSize
			);

			if (fontSizeProp.hasValue()) {
				document.rootEmSize = fontSizeProp.getPixels('y');
				document.emSize = document.rootEmSize;
			}
		}

		super.setContext(ctx);

		// create new view port
		if (!this.getAttribute('x').hasValue()) {
			this.getAttribute('x', true).setValue(0);
		}

		if (!this.getAttribute('y').hasValue()) {
			this.getAttribute('y', true).setValue(0);
		}

		ctx.translate(
			this.getAttribute('x').getPixels('x'),
			this.getAttribute('y').getPixels('y')
		);

		let {
			width,
			height
		} = screen.viewPort;

		if (!this.getAttribute('width').hasValue()) {
			this.getAttribute('width', true).setValue('100%');
		}

		if (!this.getAttribute('height').hasValue()) {
			this.getAttribute('height', true).setValue('100%');
		}

		if (!this.root) {

			width = this.getAttribute('width').getPixels('x');
			height = this.getAttribute('height').getPixels('y');

			const refXAttr = this.getAttribute('refX');
			const refYAttr = this.getAttribute('refY');
			let x = 0;
			let y = 0;

			if (refXAttr.hasValue() && refYAttr.hasValue()) {
				x = -refXAttr.getPixels('x');
				y = -refYAttr.getPixels('y');
			}

			if (this.getAttribute('overflow').getValue('hidden') !== 'visible') {
				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.lineTo(width, y);
				ctx.lineTo(width, height);
				ctx.lineTo(x, height);
				ctx.closePath();
				ctx.clip();
			}
		}

		screen.viewPort.setCurrent(width, height);

		// viewbox
		const viewBoxAttr = this.getAttribute('viewBox');
		const hasViewBox = viewBoxAttr.hasValue();
		let minX = 0;
		let minY = 0;

		if (hasViewBox) {
			[
				minX,
				minY,
				width,
				height
			] = toNumbers(viewBoxAttr.getString());
		}

		document.setAspectRatio(
			ctx,
			this.getAttribute('preserveAspectRatio').getString(),
			screen.viewPort.width,
			width,
			screen.viewPort.height,
			height,
			minX,
			minY,
			this.getAttribute('refX').getNumber(),
			this.getAttribute('refY').getNumber()
		);

		if (hasViewBox) {
			screen.viewPort.removeCurrent();
			screen.viewPort.setCurrent(width, height);
		}
	}

	/**
	 * Resize SVG to fit in given size.
	 * @param width
	 * @param height
	 * @param preserveAspectRatio
	 */
	resize(
		width: number,
		height = width,
		preserveAspectRatio: boolean|string = false
	) {

		const widthAttr = this.getAttribute('width', true);
		const heightAttr = this.getAttribute('height', true);
		const viewBoxAttr = this.getAttribute('viewBox');
		const styleAttr = this.getAttribute('style');
		const originWidth = widthAttr.getNumber(0);
		const originHeight = heightAttr.getNumber(0);

		if (preserveAspectRatio) {

			if (typeof preserveAspectRatio === 'string') {
				this.getAttribute('preserveAspectRatio', true).setValue(preserveAspectRatio);
			} else {

				const preserveAspectRatioAttr = this.getAttribute('preserveAspectRatio');

				if (preserveAspectRatioAttr.hasValue()) {
					preserveAspectRatioAttr.setValue(preserveAspectRatioAttr.getString().replace(/^\s*(\S.*\S)\s*$/, '$1'));
				}
			}
		}

		widthAttr.setValue(width);
		heightAttr.setValue(height);

		if (!viewBoxAttr.hasValue()) {
			viewBoxAttr.setValue(`0 0 ${originWidth || width} ${originHeight || height}`);
		}

		if (styleAttr.hasValue()) {

			const widthStyle = this.getStyle('width');
			const heightStyle = this.getStyle('height');

			if (widthStyle.hasValue()) {
				widthStyle.setValue(`${width}px`);
			}

			if (heightStyle.hasValue()) {
				heightStyle.setValue(`${height}px`);
			}
		}
	}
}
