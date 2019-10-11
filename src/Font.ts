import {
	compressSpaces
} from './util';

function wrapFontFamily(fontFamily: string) {

	const trimmed = fontFamily.trim();

	return /^('|")/.test(trimmed)
		? trimmed
		: `"${trimmed}"`;
}

function prepareFontFamily(fontFamily: string) {
	return typeof process === 'undefined'
		? fontFamily
		: fontFamily
			.trim()
			.split(',')
			.map(wrapFontFamily)
			.join(',');
}

export default class Font {

	static readonly styles = 'normal|italic|oblique|inherit';
	static readonly variants = 'normal|small-caps|inherit';
	static readonly weights = 'normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit';

	static parse(
		font = '',
		inherit?: string | Font
	) {

		let fontStyle = '';
		let fontVariant = '';
		let fontWeight = '';
		let fontSize = '';
		let fontFamily = '';
		const parts = compressSpaces(font).trim().split(' ');
		const set = {
			fontSize:    false,
			fontStyle:   false,
			fontWeight:  false,
			fontVariant: false
		};

		parts.forEach((part) => {

			switch (true) {

				case !set.fontStyle && Font.styles.includes(part):

					if (part !== 'inherit') {
						fontStyle = part;
					}

					set.fontStyle = true;
					break;

				case !set.fontVariant && Font.variants.includes(part):

					if (part !== 'inherit') {
						fontVariant = part;
					}

					set.fontStyle = true;
					set.fontVariant = true;
					break;

				case !set.fontWeight && Font.weights.includes(part):

					if (part !== 'inherit') {
						fontWeight = part;
					}

					set.fontStyle = true;
					set.fontVariant = true;
					set.fontWeight = true;
					break;

				case !set.fontSize:

					if (part !== 'inherit') {
						[fontSize] = part.split('/');
					}

					set.fontStyle = true;
					set.fontVariant = true;
					set.fontWeight = true;
					set.fontSize = true;
					break;

				default:

					if (part !== 'inherit') {
						fontFamily += part;
					}
			}
		});

		return new Font(
			fontStyle,
			fontVariant,
			fontWeight,
			fontSize,
			fontFamily,
			inherit
		);
	}

	readonly fontFamily: string;
	readonly fontSize: string;
	readonly fontStyle: string;
	readonly fontWeight: string;
	readonly fontVariant: string;

	constructor(
		fontStyle: string,
		fontVariant: string,
		fontWeight: string,
		fontSize: string,
		fontFamily: string,
		inherit?: string | Font
	) {

		const inheritFont = inherit
			? typeof inherit === 'string'
				? Font.parse(inherit)
				: inherit
			: {} as any;

		this.fontFamily = fontFamily || inheritFont.fontFamily;
		this.fontSize = fontSize || inheritFont.fontSize;
		this.fontStyle = fontStyle || inheritFont.fontStyle;
		this.fontWeight = fontWeight || inheritFont.fontWeight;
		this.fontVariant = fontVariant || inheritFont.fontVariant;
	}

	toString() {
		return [
			this.fontStyle,
			this.fontVariant,
			this.fontWeight,
			this.fontSize,
			// Wrap fontFamily only on nodejs and only for canvas.ctx
			prepareFontFamily(this.fontFamily)
		].join(' ');
	}
}
