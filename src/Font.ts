import {
	compressSpaces
} from './util';

function prepareFontFamily(fontFamily: string) {
	return typeof process === 'undefined'
		? fontFamily
		: fontFamily
			.trim()
			.split(',')
			.map(_ =>
				_.startsWith('"')
					? _
					: `"${_}"`)
			.join(',');
}

export default class Font {

	static readonly styles = 'normal|italic|oblique|inherit';
	static readonly variants = 'normal|small-caps|inherit';
	static readonly weights = 'normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit';

	static parse(font = '') {

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
			fontFamily
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
		inherit?: string
	) {

		const def = inherit
			? Font.parse(inherit)
			: {} as any;

		this.fontFamily = prepareFontFamily(fontFamily || def.fontFamily);
		this.fontSize = fontSize || def.fontSize;
		this.fontStyle = fontStyle || def.fontStyle;
		this.fontWeight = fontWeight || def.fontWeight;
		this.fontVariant = fontVariant || def.fontVariant;
	}

	toString() {
		return [
			this.fontStyle,
			this.fontVariant,
			this.fontWeight,
			this.fontSize,
			this.fontFamily
		].join(' ');
	}
}
