import Parser, {
	IParserOptions
} from './Parser';
import Screen, {
	IScreenOptions,
	IScreenStartOptions
} from './Screen';
import Document, {
	IDocumentOptions,
	SVGElement
} from './Document';

type DOMDocument = typeof window.document;

export interface IOptions extends IParserOptions,
	IScreenOptions,
	IScreenStartOptions,
	IDocumentOptions {}

export default class Canvg {

	static async from(
		ctx: RenderingContext2D,
		svg: string,
		options: IOptions = {}
	) {

		const parser = new Parser(options);
		const svgDocument = await parser.parse(svg);

		return new Canvg(ctx, svgDocument, options);
	}

	static fromString(
		ctx: RenderingContext2D,
		svg: string,
		options: IOptions = {}
	) {

		const parser = new Parser(options);
		const svgDocument = parser.parseFromString(svg);

		return new Canvg(ctx, svgDocument, options);
	}

	readonly parser: Parser;
	readonly screen: Screen;
	readonly document: Document;
	private readonly documentElement: SVGElement;
	private readonly options: IOptions;

	constructor(
		ctx: RenderingContext2D,
		svg: DOMDocument,
		options: IOptions = {}
	) {

		this.parser = new Parser(options);
		this.screen = new Screen(ctx, options);
		this.options = options;

		const document = new Document(this, options);
		const documentElement = document.createDocumentElement(svg);

		this.document = document;
		this.documentElement = documentElement;
	}

	fork(
		ctx: RenderingContext2D,
		svg: string,
		options: IOptions = {}
	) {
		return Canvg.from(ctx, svg, {
			...this.options,
			...options
		});
	}

	forkString(
		ctx: RenderingContext2D,
		svg: string,
		options: IOptions = {}
	) {
		return Canvg.fromString(ctx, svg, {
			...this.options,
			...options
		});
	}

	ready() {
		return this.screen.ready();
	}

	isReady() {
		return this.screen.isReady();
	}

	async render(options: IScreenStartOptions = {}) {

		this.start({
			enableRedraw:    true,
			ignoreAnimation: true,
			ignoreMouse:     true,
			...options
		});

		await this.ready();

		this.stop();
	}

	start(options: IScreenStartOptions = {}) {

		const {
			documentElement,
			screen,
			options: baseOptions
		} = this;

		screen.start(documentElement, {
			enableRedraw: true,
			...baseOptions,
			...options
		});
	}

	stop() {
		this.screen.stop();
	}
}
