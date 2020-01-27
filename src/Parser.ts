import Screen from './Screen';

export interface IParserOptions {
	/**
	 * WHATWG-compatible `fetch` function.
	 */
	fetch?: typeof fetch;
	/**
	 * XML/HTML parser from string into DOM Document.
	 */
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

	constructor({
		fetch = defaultFetch,
		DOMParser = DefaultDOMParser
	}: IParserOptions = {}) {
		this.fetch = fetch;
		this.DOMParser = DOMParser;
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
