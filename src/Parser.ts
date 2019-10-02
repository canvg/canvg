import Screen from './Screen';

export interface IParserOptions {
	fetch?: typeof fetch;
	DOMParser?: typeof DOMParser;
}

const {
	defaultFetch
} = Screen;

const DefaultDOMParser = typeof DOMParser !== 'undefined'
	? DOMParser
	: null;

export default class Parser {

	private readonly fetch: typeof defaultFetch;
	private readonly DOMParser: typeof DefaultDOMParser;
	// private readonly options: any;

	constructor({
		fetch = defaultFetch,
		DOMParser = DefaultDOMParser
		// ...options
	}: IParserOptions = {}) {
		this.fetch = fetch;
		this.DOMParser = DOMParser;
		// this.options = options;
	}

	async parse(resource: string) {

		if (/^</.test(resource)) {
			return this.parseFromString(resource);
		}

		return this.load(resource);
	}

	parseFromString(xml: string) {

		try {

			const parser = new this.DOMParser();

			return parser.parseFromString(xml, 'image/svg+xml');

		} catch (err) {

			const parser = new this.DOMParser();

			return parser.parseFromString(xml, 'text/xml');
		}
	}

	async load(url: string) {

		const response = await this.fetch(url);
		const xml = await response.text();

		return this.parseFromString(xml);
	}
}
