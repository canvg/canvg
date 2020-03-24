import Document from './Document';

export default class SVGFontLoader {

	loaded = false;

	constructor(
		private readonly document: Document
	) {
		document.fonts.push(this);
	}

	async load(fontFamily: string, url: string) {

		try {

			const {
				document
			} = this;
			const svgDocument = await document.canvg.parser.load(url);
			const fonts = svgDocument.getElementsByTagName('font');

			Array.from(fonts).forEach((fontNode) => {

				const font = document.createElement(fontNode);

				document.definitions[fontFamily] = font;
			});

		} catch (err) {
			// tslint:disable-next-line: no-console
			console.error(`Error while loading font "${url}":`, err);
		}

		this.loaded = true;
	}
}
