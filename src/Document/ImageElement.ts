import {
	RenderingContext2D
} from '../types';
import BoundingBox from '../BoundingBox';
import Document from './Document';
import RenderedElement from './RenderedElement';

export default class ImageElement extends RenderedElement {

	type = 'image';
	loaded = false;
	protected readonly isSvg: boolean;
	protected image: CanvasImageSource | string;

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

	protected async loadImage(href: string) {

		try {

			const image = await this.document.createImage(href);

			this.image = image;

		} catch (err) {
			// tslint:disable-next-line: no-console
			console.error(`ERROR: image "${href}" not found`, err);
		}

		this.loaded = true;
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

	renderChildren(ctx: RenderingContext2D) {

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

			const image = this.image as CanvasImageSource;

			ctx.translate(x, y);
			document.setViewBox({
				ctx,
				aspectRatio:   this.getAttribute('preserveAspectRatio').getString(),
				width,
				desiredWidth:  image.width as number,
				height,
				desiredHeight: image.height as number
			});

			if (this.loaded) {

				if (typeof (image as any).complete === 'undefined' || (image as any).complete) {
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
