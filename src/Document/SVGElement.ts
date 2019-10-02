import {
	toNumberArray
} from '../util';
import Property from '../Property';
import Font from '../Font';
import RenderedElement from './RenderedElement';

export default class SVGElement extends RenderedElement {

	type = 'svg';
	root = false;

	clearContext(ctx: CanvasRenderingContext2D) {

		super.clearContext(ctx);

		this.document.screen.viewPort.removeCurrent();
	}

	setContext(ctx: CanvasRenderingContext2D) {

		const {
			document
		} = this;
		const {
			screen,
			window
		} = document;

		screen.setDefaults(ctx);

		if (ctx.canvas.style
			&& typeof ctx.font !== 'undefined'
			&& window
			&& typeof window.getComputedStyle !== 'undefined'
		) {

			ctx.font = window.getComputedStyle(ctx.canvas).getPropertyValue('font');

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

		if (viewBoxAttr.hasValue()) {

			const viewBox = toNumberArray(viewBoxAttr.getString());
			const minX = viewBox[0];
			const minY = viewBox[1];

			width = viewBox[2];
			height = viewBox[3];

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

			screen.viewPort.removeCurrent();
			screen.viewPort.setCurrent(viewBox[2], viewBox[3]);
		}
	}
}
