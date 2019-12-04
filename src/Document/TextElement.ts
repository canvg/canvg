import {
	RenderingContext2D
} from '../types';
import {
	toNumbers,
	compressSpaces,
	trimLeft,
	trimRight
} from '../util';
import Font from '../Font';
import BoundingBox from '../BoundingBox';
import Document from './Document';
import Element from './Element';
import FontElement from './FontElement';
import GlyphElement from './GlyphElement';
import RenderedElement from './RenderedElement';

export default class TextElement extends RenderedElement {

	type = 'text';
	protected x = 0;
	protected y = 0;
	private measureCache = -1;

	constructor(
		document: Document,
		node: HTMLElement,
		captureTextNodes?: boolean
	) {

		super(
			document,
			node,
			new.target === TextElement
				? true
				: captureTextNodes
		);
	}

	setContext(ctx: RenderingContext2D, fromMeasure = false) {

		super.setContext(ctx, fromMeasure);

		const textBaseline = this.getStyle('dominant-baseline').getTextBaseline()
			|| this.getStyle('alignment-baseline').getTextBaseline();

		if (textBaseline) {
			ctx.textBaseline = textBaseline as any;
		}
	}

	protected initializeCoordinates(ctx: RenderingContext2D) {

		this.x = this.getAttribute('x').getPixels('x');
		this.y = this.getAttribute('y').getPixels('y');

		const dxAttr = this.getAttribute('dx');
		const dyAttr = this.getAttribute('dy');

		if (dxAttr.hasValue()) {
			this.x += dxAttr.getPixels('x');
		}

		if (dyAttr.hasValue()) {
			this.y += dyAttr.getPixels('y');
		}

		this.x += this.getAnchorDelta(ctx, this, 0);
	}

	getBoundingBox(ctx: RenderingContext2D) {

		if (this.type !== 'text') {
			return this.getTElementBoundingBox(ctx);
		}

		this.initializeCoordinates(ctx);

		let boundingBox: BoundingBox = null;

		this.children.forEach((_, i) => {

			const childBoundingBox = this.getChildBoundingBox(ctx, this, this, i);

			if (!boundingBox) {
				boundingBox = childBoundingBox;
			} else {
				boundingBox.addBoundingBox(childBoundingBox);
			}
		});

		return boundingBox;
	}

	protected getFontSize() {

		const {
			document,
			parent
		} = this;
		const inheritFontSize = Font.parse(document.ctx.font).fontSize;
		const fontSize = parent.getStyle('font-size').getNumber(inheritFontSize);

		return fontSize;
	}

	protected getTElementBoundingBox(ctx: RenderingContext2D) {

		const fontSize = this.getFontSize();

		return new BoundingBox(
			this.x,
			this.y - fontSize,
			this.x + this.measureText(ctx),
			this.y
		);
	}

	getGlyph(
		font: FontElement,
		text: string,
		i: number
	) {

		const char = text[i];
		let glyph: GlyphElement = null;

		if (font.isArabic) {

			const len = text.length;
			const prevChar = text[i - 1];
			const nextChar = text[i + 1];
			let arabicForm = 'isolated';

			if ((i === 0 || prevChar === ' ') && i < len - 2 && nextChar !== ' ') {
				arabicForm = 'terminal';
			}

			if (i > 0 && prevChar !== ' ' && i < len - 2 && nextChar !== ' ') {
				arabicForm = 'medial';
			}

			if (i > 0 && prevChar !== ' ' && (i === len - 1 || nextChar === ' ')) {
				arabicForm = 'initial';
			}

			if (typeof font.glyphs[char] !== 'undefined') {

				glyph = font.glyphs[char][arabicForm];

				if (!glyph && font.glyphs[char].type === 'glyph') {
					glyph = font.glyphs[char] as GlyphElement;
				}
			}

		} else {
			glyph = font.glyphs[char] as GlyphElement;
		}

		if (!glyph) {
			glyph = font.missingGlyph as GlyphElement;
		}

		return glyph;
	}

	getText() {
		return '';
	}

	protected getTextFromNode(node?: ChildNode) {

		const textNode = node || this.node;
		const childNodes = Array.from(textNode.parentNode.childNodes);
		const index = childNodes.indexOf(textNode);
		const lastIndex = childNodes.length - 1;
		let text = compressSpaces(
			(textNode as any).value
			|| (textNode as any).text
			|| textNode.textContent
			|| ''
		);

		if (index === 0) {
			text = trimLeft(text);
		}

		if (index === lastIndex) {
			text = trimRight(text);
		}

		return text;
	}

	renderChildren(ctx: RenderingContext2D) {

		if (this.type !== 'text') {
			this.renderTElementChildren(ctx);
			return;
		}

		this.initializeCoordinates(ctx);
		this.children.forEach((_, i) => {
			this.renderChild(ctx, this, this, i);
		});

		const {
			mouse
		} = this.document.screen;

		// Do not calc bounding box if mouse is not working.
		if (mouse.isWorking()) {
			mouse.checkBoundingBox(
				this,
				this.getBoundingBox(ctx)
			);
		}
	}

	protected renderTElementChildren(ctx: RenderingContext2D) {

		const {
			document,
			parent
		} = this;
		const renderText = this.getText();
		const customFont = parent.getStyle('font-family').getDefinition<FontElement>();

		if (customFont) {

			const {
				unitsPerEm
			} = customFont.fontFace;
			const ctxFont = Font.parse(document.ctx.font);
			const fontSize = parent.getStyle('font-size').getNumber(ctxFont.fontSize);
			const fontStyle = parent.getStyle('font-style').getString(ctxFont.fontStyle);
			const scale = fontSize / unitsPerEm;
			const text = customFont.isRTL
				? renderText.split('').reverse().join('')
				: renderText;
			const dx = toNumbers(parent.getAttribute('dx').getString());
			const len = text.length;

			for (let i = 0; i < len; i++) {

				const glyph = this.getGlyph(customFont, text, i);

				ctx.translate(this.x, this.y);
				ctx.scale(scale, -scale);

				const lw = ctx.lineWidth;

				ctx.lineWidth = ctx.lineWidth * unitsPerEm / fontSize;

				if (fontStyle === 'italic') {
					ctx.transform(1, 0, .4, 1, 0, 0);
				}

				glyph.render(ctx);

				if (fontStyle === 'italic') {
					ctx.transform(1, 0, -.4, 1, 0, 0);
				}

				ctx.lineWidth = lw;
				ctx.scale(1 / scale, -1 / scale);
				ctx.translate(-this.x, -this.y);

				this.x += fontSize * (glyph.horizAdvX || customFont.horizAdvX) / unitsPerEm;

				if (typeof dx[i] !== 'undefined' && !isNaN(dx[i])) {
					this.x += dx[i];
				}
			}

			return;
		}

		const {
			x,
			y
		} = this;

		if ((ctx as any).paintOrder === 'stroke') {

			if (ctx.strokeStyle) {
				ctx.strokeText(renderText, x, y);
			}

			if (ctx.fillStyle) {
				ctx.fillText(renderText, x, y);
			}

		} else {

			if (ctx.fillStyle) {
				ctx.fillText(renderText, x, y);
			}

			if (ctx.strokeStyle) {
				ctx.strokeText(renderText, x, y);
			}
		}

	}

	protected getAnchorDelta(
		ctx: RenderingContext2D,
		parent: Element,
		startI: number
	) {

		const textAnchor = this.getStyle('text-anchor').getString('start');

		if (textAnchor !== 'start') {

			const {
				children
			} = parent;
			const len = children.length;
			let child: TextElement = null;
			let width = 0;

			for (let i = startI; i < len; i++) {

				child = children[i] as TextElement;

				if (i > startI && child.getAttribute('x').hasValue()
					|| child.getAttribute('text-anchor').hasValue()
				) {
					break; // new group
				}

				width += child.measureTextRecursive(ctx);
			}

			return -1 * (textAnchor === 'end' ? width : width / 2.0);
		}

		return 0;
	}

	protected adjustChildCoordinates(
		ctx: RenderingContext2D,
		textParent: TextElement,
		parent: Element,
		i: number
	) {

		const child = parent.children[i] as TextElement;

		if (typeof child.measureText !== 'function') {
			return child;
		}

		const xAttr = child.getAttribute('x');
		const yAttr = child.getAttribute('y');
		const dxAttr = child.getAttribute('dx');
		const dyAttr = child.getAttribute('dy');
		const textAnchor = child.getAttribute('text-anchor').getString('start');

		if (i === 0 && child.type !== 'textNode') {

			if (!xAttr.hasValue()) {
				xAttr.setValue(textParent.getAttribute('x').getValue('0'));
			}

			if (!yAttr.hasValue()) {
				yAttr.setValue(textParent.getAttribute('y').getValue('0'));
			}

			if (!dxAttr.hasValue()) {
				dxAttr.setValue(textParent.getAttribute('dx').getValue('0'));
			}

			if (!dyAttr.hasValue()) {
				dyAttr.setValue(textParent.getAttribute('dy').getValue('0'));
			}
		}

		if (xAttr.hasValue()) {

			child.x = xAttr.getPixels('x') + textParent.getAnchorDelta(ctx, parent, i);

			if (textAnchor !== 'start') {

				const width = child.measureTextRecursive(ctx);

				child.x += -1 * (textAnchor === 'end' ? width : width / 2.0);
			}

			if (dxAttr.hasValue()) {
				child.x += dxAttr.getPixels('x');
			}

		} else {

			if (textAnchor !== 'start') {

				const width = child.measureTextRecursive(ctx);

				textParent.x += -1 * (textAnchor === 'end' ? width : width / 2.0);
			}

			if (dxAttr.hasValue()) {
				textParent.x += dxAttr.getPixels('x');
			}

			child.x = textParent.x;
		}

		textParent.x = child.x + child.measureText(ctx);

		if (yAttr.hasValue()) {

			child.y = yAttr.getPixels('y');

			if (dyAttr.hasValue()) {
				child.y += dyAttr.getPixels('y');
			}

		} else {

			if (dyAttr.hasValue()) {
				textParent.y += dyAttr.getPixels('y');
			}

			child.y = textParent.y;
		}

		textParent.y = child.y;

		return child;
	}

	protected getChildBoundingBox(
		ctx: RenderingContext2D,
		textParent: TextElement,
		parent: Element,
		i: number
	) {

		const child = this.adjustChildCoordinates(ctx, textParent, parent, i);
		const boundingBox = child.getBoundingBox(ctx);

		if (!boundingBox) {
			return null;
		}

		child.children.forEach((_, i) => {

			const childBoundingBox = textParent.getChildBoundingBox(ctx, textParent, child, i);

			boundingBox.addBoundingBox(childBoundingBox);
		});

		return boundingBox;
	}

	protected renderChild(
		ctx: RenderingContext2D,
		textParent: TextElement,
		parent: Element,
		i: number
	) {

		const child = this.adjustChildCoordinates(ctx, textParent, parent, i);

		child.render(ctx);
		child.children.forEach((_, i) => {
			textParent.renderChild(ctx, textParent, child, i);
		});
	}

	protected measureTextRecursive(ctx: RenderingContext2D) {

		const width: number = this.children.reduce(
			(width, child: TextElement) => width + child.measureTextRecursive(ctx),
			this.measureText(ctx)
		);

		return width;
	}

	protected measureText(ctx: RenderingContext2D) {

		const {
			measureCache
		} = this;

		if (~measureCache) {
			return measureCache;
		}

		const renderText = this.getText();
		const measure = this.measureTargetText(ctx, renderText);

		this.measureCache = measure;

		return measure;
	}

	protected measureTargetText(
		ctx: RenderingContext2D,
		targetText: string
	) {

		if (!targetText.length) {
			return 0;
		}

		const {
			parent
		} = this;
		const customFont = parent.getStyle('font-family').getDefinition<FontElement>();

		if (customFont) {

			const fontSize = this.getFontSize();
			const text = customFont.isRTL
				? targetText.split('').reverse().join('')
				: targetText;
			const dx = toNumbers(parent.getAttribute('dx').getString());
			const len = text.length;
			let measure = 0;

			for (let i = 0; i < len; i++) {

				const glyph = this.getGlyph(customFont, text, i);

				measure += (glyph.horizAdvX || customFont.horizAdvX)
					* fontSize
					/ customFont.fontFace.unitsPerEm;

				if (typeof dx[i] !== 'undefined' && !isNaN(dx[i])) {
					measure += dx[i];
				}
			}

			return measure;
		}

		if (!ctx.measureText) {
			return targetText.length * 10;
		}

		ctx.save();
		this.setContext(ctx, true);

		const {
			width: measure
		} = ctx.measureText(targetText);

		ctx.restore();

		return measure;
	}
}
