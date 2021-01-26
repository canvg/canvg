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

		const isSvg = href.endsWith('.svg');

		document.images.push(this);

		if (!isSvg) {
			void this.loadImage(href);
		} else {
			void this.loadSvg(href);
		}

		this.isSvg = isSvg;
	}

	protected async loadImage(href: string) {
		try {
			const image = await this.document.createImage(href);

			this.image = image;
		} catch (err) {
			console.error(`Error while loading image "${href}":`, err);
		}

		this.loaded = true;
	}

	protected async loadSvg(href: string) {
		try {
			const response = await this.document.fetch(href);
			const svg = await response.text();

			this.image = svg;
		} catch (err) {
			console.error(`Error while loading image "${href}":`, err);
		}

		this.loaded = true;
	}

	renderChildren(ctx: RenderingContext2D) {
		const {
			document,
			image,
			loaded
		} = this;
		const x = this.getAttribute('x').getPixels('x');
		const y = this.getAttribute('y').getPixels('y');
		const width = this.getStyle('width').getPixels('x');
		const height = this.getStyle('height').getPixels('y');

		if (!loaded || !image
			|| !width || !height
		) {
			return;
		}

		ctx.save();

		if (this.isSvg) {
			void document.canvg.forkString(
				ctx,
				this.image as string,
				{
					ignoreMouse: true,
					ignoreAnimation: true,
					ignoreDimensions: true,
					ignoreClear: true,
					offsetX: x,
					offsetY: y,
					scaleWidth: width,
					scaleHeight: height
				}
			).render();
		} else {
			const image = this.image as CanvasImageSource;

			ctx.translate(x, y);
			document.setViewBox({
				ctx,
				aspectRatio: this.getAttribute('preserveAspectRatio').getString(),
				width,
				desiredWidth: image.width as number,
				height,
				desiredHeight: image.height as number
			});

			if (this.loaded) {
				if (typeof (image as HTMLImageElement).complete === 'undefined' || (image as HTMLImageElement).complete) {
					ctx.drawImage(image, 0, 0);
				}
			}
		}

		ctx.restore();
	}

	getBoundingBox() {
		const x = this.getAttribute('x').getPixels('x');
		const y = this.getAttribute('y').getPixels('y');
		const width = this.getStyle('width').getPixels('x');
		const height = this.getStyle('height').getPixels('y');

		return new BoundingBox(x, y, x + width, y + height);
	}
}
