import Document from './Document';
import Element from './Element';
import FontFaceElement from './FontFaceElement';
import MissingGlyphElement from './MissingGlyphElement';
import GlyphElement from './GlyphElement';

export default class FontElement extends Element {

	type = 'font';
	readonly isArabic: boolean;
	readonly missingGlyph: MissingGlyphElement;
	readonly glyphs: Record<string, GlyphElement | Record<string, GlyphElement>> = {};
	readonly horizAdvX: number;
	readonly isRTL: boolean;
	readonly fontFace: FontFaceElement;

	constructor(
		document: Document,
		node: HTMLElement,
		captureTextNodes?: boolean
	) {

		super(document, node, captureTextNodes);

		this.horizAdvX = this.getAttribute('horiz-adv-x').getNumber();

		const {
			definitions
		} = document;
		const {
			children
		} = this;

		for (const child of children) {

			switch (child.type) {

				case 'font-face': {

					this.fontFace = child as FontFaceElement;

					const fontFamilyStyle = child.getStyle('font-family');

					if (fontFamilyStyle.hasValue()) {
						definitions[fontFamilyStyle.getString()] = this;
					}

					break;
				}

				case 'missing-glyph':
					this.missingGlyph = child as MissingGlyphElement;
					break;

				case 'glyph': {

					const glyph = child as GlyphElement;

					if (glyph.arabicForm) {

						this.isRTL = true;
						this.isArabic = true;

						if (typeof this.glyphs[glyph.unicode] === 'undefined') {
							this.glyphs[glyph.unicode] = {};
						}

						this.glyphs[glyph.unicode][glyph.arabicForm] = glyph;
					} else {
						this.glyphs[glyph.unicode] = glyph;
					}

					break;
				}

				default:
			}
		}
	}

	render() {
		// NO RENDER
	}
}
