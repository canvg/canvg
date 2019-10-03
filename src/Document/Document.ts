import Canvg from '../Canvg';
import Screen from '../Screen';
import Property from '../Property';
import SVGFontLoader from '../SVGFontLoader';
import Element from './Element';
import UnknownElement from './UnknownElement';
import TSpanElement from './TSpanElement';
import ImageElement from './ImageElement';
import SVGElement from './SVGElement';
import elementTypes from './elements';

export interface IDocumentOptions {
	rootEmSize?: number;
	emSize?: number;
	createCanvas?: typeof defaultCreateCanvas;
	createImage?: typeof defaultCreateImage;
}

type DOMDocument = typeof window.document;

function defaultCreateCanvas(width: number, height: number) {

	const canvas = document.createElement('canvas');

	canvas.width = width;
	canvas.height = height;

	return canvas;
}

function defaultCreateImage() {
	return document.createElement('img');
}

export default class Document {

	static readonly defaultCreateCanvas = defaultCreateCanvas;
	static readonly defaultCreateImage = defaultCreateImage;
	static readonly elementTypes = elementTypes;

	rootEmSize: number;
	emSize: number;
	documentElement: SVGElement;
	readonly screen: Screen;
	readonly createCanvas: typeof defaultCreateCanvas;
	readonly createImage: typeof defaultCreateImage;
	readonly definitions: Record<string, Element> = {};
	readonly styles: Record<string, Record<string, Property>> = {};
	readonly stylesSpecificity: Record<string, string> = {};
	readonly images: ImageElement[] = [];
	readonly fonts: SVGFontLoader[] = [];
	private uniqueId = 0;

	constructor(
		readonly canvg: Canvg,
		{
			rootEmSize = 12,
			emSize = 12,
			createCanvas = defaultCreateCanvas,
			createImage = defaultCreateImage
		}: IDocumentOptions = {}
	) {

		this.screen = canvg.screen;
		this.rootEmSize = rootEmSize;
		this.emSize = emSize;
		this.createCanvas = createCanvas;
		this.createImage = createImage;

		this.screen.wait(this.isImagesLoaded.bind(this));
		this.screen.wait(this.isFontsLoaded.bind(this));
	}

	get window() {
		return this.screen.window;
	}

	get fetch() {
		return this.screen.fetch;
	}

	get ctx() {
		return this.screen.ctx;
	}

	getUniqueId() {
		return `canvg${++this.uniqueId}`;
	}

	isImagesLoaded() {
		return this.images.every(_ => _.loaded);
	}

	isFontsLoaded() {
		return this.fonts.every(_ => _.loaded);
	}

	createDocumentElement(document: DOMDocument) {

		const documentElement = this.createElement<SVGElement>(document.documentElement);

		documentElement.root = true;
		documentElement.addStylesFromStyleDefinition();

		this.documentElement = documentElement;

		return documentElement;
	}

	createElement<T extends Element>(node: HTMLElement) {

		const elementType = node.nodeName.replace(/^[^:]+:/, '');
		const ElementType = Document.elementTypes[elementType];

		if (typeof ElementType !== 'undefined') {
			return new ElementType(this, node) as T;
		}

		return new UnknownElement(this, node) as T;
	}

	createTextNode(node: HTMLElement) {
		return new TSpanElement(this, node);
	}

	setAspectRatio(
		ctx: CanvasRenderingContext2D,
		aspectRatio: string,
		width: number,
		desiredWidth: number,
		height: number,
		desiredHeight: number,
		minX = 0,
		minY = 0,
		refX?: number,
		refY?: number
	) {
		this.screen.setAspectRatio(
			this,
			ctx,
			aspectRatio,
			width,
			desiredWidth,
			height,
			desiredHeight,
			minX,
			minY,
			refX,
			refY
		);
	}
}
