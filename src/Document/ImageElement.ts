import BoundingBox from '../BoundingBox';
import Document from './Document';
import RenderedElement from './RenderedElement';

export default class ImageElement extends RenderedElement {

	type = 'image';
	loaded = false;
	protected readonly isSvg: boolean;
	protected image: HTMLImageElement | string;

	constructor(
		document: Document,
		node: HTMLElement,
		captureTextNodes?: boolean
	) {

		super(document, node, captureTextNodes);

		const href = this.getHrefAttribute().getString();

		if (!href) {
			return;
		}

		const isSvg = /\.svg$/.test(href);

		document.images.push(this);

		if (!isSvg) {
			this.loadImage(href);
		} else {
			this.loadSvg(href);
		}

		this.isSvg = isSvg;
	}

	protected loadImage(href: string) {

		const image = this.document.createImage();
		// if (svg.opts['useCORS'] == true) { this.img.crossOrigin = 'Anonymous'; }

		image.onload = () => {
			this.loaded = true;
		};
		image.onerror = () => {
			// tslint:disable-next-line: no-console
			console.error(`ERROR: image "${href}" not found`);
			this.loaded = true;
		};
		image.src = href;

		this.image = image;
	}

	protected async loadSvg(href: string) {

		try {

			const response = await this.document.fetch(href);
			const svg = await response.text();

			this.image = svg;

		} catch (err) {
			// tslint:disable-next-line: no-console
			console.error(`ERROR: image "${href}" not found`, err);
		}

		this.loaded = true;
	}

	renderChildren(ctx: CanvasRenderingContext2D) {

		const {
			document
		} = this;
		const x = this.getAttribute('x').getPixels('x');
		const y = this.getAttribute('y').getPixels('y');
		const width = this.getAttribute('width').getPixels('x');
		const height = this.getAttribute('height').getPixels('y');

		if (!width || !height) {
			return;
		}

		ctx.save();

		if (this.isSvg) {
			document.canvg.forkString(
				ctx,
				this.image as string,
				{
					ignoreMouse:      true,
					ignoreAnimation:  true,
					ignoreDimensions: true,
					ignoreClear:      true,
					offsetX:          x,
					offsetY:          y,
					scaleWidth:       width,
					scaleHeight:      height
				}
			).render();
		} else {

			const image = this.image as HTMLImageElement;

			ctx.translate(x, y);
			document.setAspectRatio(
				ctx,
				this.getAttribute('preserveAspectRatio').getString(),
				width,
				image.width,
				height,
				image.height,
				0,
				0
			);

			if (this.loaded) {

				if (typeof image.complete === 'undefined' || image.complete) {
					ctx.drawImage(image, 0, 0);
				}
			}
		}

		ctx.restore();
	}

	getBoundingBox() {

		const x = this.getAttribute('x').getPixels('x');
		const y = this.getAttribute('y').getPixels('y');
		const width = this.getAttribute('width').getPixels('x');
		const height = this.getAttribute('height').getPixels('y');

		return new BoundingBox(x, y, x + width, y + height);
	}
}
