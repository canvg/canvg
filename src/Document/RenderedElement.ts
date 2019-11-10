import {
	RenderingContext2D
} from '../types';
import {
	PSEUDO_ZERO,
	toNumbers
} from '../util';
import Font from '../Font';
import Property from '../Property';
import Transform from '../Transform';
import Element from './Element';
import ClipPathElement from './ClipPathElement';

export default abstract class RenderedElement extends Element {

	private modifiedEmSizeStack = false;

	protected calculateOpacity() {

		let opacity = 1.0;
		// tslint:disable-next-line: no-this-assignment
		let element: Element = this;

		while (element) {

			const opacityStyle = element.getStyle('opacity', false, true); // no ancestors on style call

			if (opacityStyle.hasValue()) {
				opacity *= opacityStyle.getNumber();
			}

			element = element.parent;
		}

		return opacity;
	}

	setContext(ctx: RenderingContext2D, fromMeasure = false) {

		if (!fromMeasure) { // causes stack overflow when measuring text with gradients

			// fill
			const fillStyleProp = this.getStyle('fill');
			const fillOpacityStyleProp = this.getStyle('fill-opacity');
			const strokeStyleProp = this.getStyle('stroke');
			const strokeOpacityProp = this.getStyle('stroke-opacity');

			if (fillStyleProp.isUrlDefinition()) {

				const fillStyle = fillStyleProp.getFillStyleDefinition(this, fillOpacityStyleProp);

				if (fillStyle) {
					ctx.fillStyle = fillStyle;
				}

			} else
			if (fillStyleProp.hasValue()) {

				if (fillStyleProp.getString() === 'currentColor') {
					fillStyleProp.setValue(this.getStyle('color').getValue());
				}

				const fillStyle = fillStyleProp.getString();

				if (fillStyle !== 'inherit') {
					ctx.fillStyle = fillStyle === 'none'
						? 'rgba(0,0,0,0)'
						: fillStyle;
				}
			}

			if (fillOpacityStyleProp.hasValue()) {

				const fillStyle = new Property(this.document, 'fill', ctx.fillStyle as string)
					.addOpacity(fillOpacityStyleProp)
					.getString();

				ctx.fillStyle = fillStyle;
			}

			// stroke
			if (strokeStyleProp.isUrlDefinition()) {

				const strokeStyle = strokeStyleProp.getFillStyleDefinition(this, strokeOpacityProp);

				if (strokeStyle) {
					ctx.strokeStyle = strokeStyle;
				}

			} else
			if (strokeStyleProp.hasValue()) {

				if (strokeStyleProp.getString() === 'currentColor') {
					strokeStyleProp.setValue(this.getStyle('color').getValue());
				}

				const strokeStyle = strokeStyleProp.getString();

				if (strokeStyle !== 'inherit') {
					ctx.strokeStyle = strokeStyle === 'none'
						? 'rgba(0,0,0,0)'
						: strokeStyle;
				}
			}

			if (strokeOpacityProp.hasValue()) {

				const strokeStyle = new Property(this.document, 'stroke', ctx.strokeStyle as string)
					.addOpacity(strokeOpacityProp)
					.getString();

				ctx.strokeStyle = strokeStyle;
			}

			const strokeWidthStyleProp = this.getStyle('stroke-width');

			if (strokeWidthStyleProp.hasValue()) {

				const newLineWidth = strokeWidthStyleProp.getPixels();

				ctx.lineWidth = !newLineWidth
					? PSEUDO_ZERO // browsers don't respect 0 (or node-canvas? :-)
					: newLineWidth;
			}

			const strokeLinecapStyleProp = this.getStyle('stroke-linecap');
			const strokeLinejoinStyleProp = this.getStyle('stroke-linejoin');
			const strokeMiterlimitProp = this.getStyle('stroke-miterlimit');
			const pointOrderStyleProp = this.getStyle('paint-order');
			const strokeDasharrayStyleProp = this.getStyle('stroke-dasharray');
			const strokeDashoffsetProp = this.getStyle('stroke-dashoffset');

			if (strokeLinecapStyleProp.hasValue()) {
				ctx.lineCap = strokeLinecapStyleProp.getString() as any;
			}

			if (strokeLinejoinStyleProp.hasValue()) {
				ctx.lineJoin = strokeLinejoinStyleProp.getString() as any;
			}

			if (strokeMiterlimitProp.hasValue()) {
				ctx.miterLimit = strokeMiterlimitProp.getNumber();
			}

			if (pointOrderStyleProp.hasValue()) {
				// ?
				(ctx as any).paintOrder = pointOrderStyleProp.getValue();
			}

			if (strokeDasharrayStyleProp.hasValue() && strokeDasharrayStyleProp.getString() !== 'none') {

				const gaps = toNumbers(strokeDasharrayStyleProp.getString());

				if (typeof ctx.setLineDash !== 'undefined') {
					ctx.setLineDash(gaps);
				} else
				if (typeof (ctx as any).webkitLineDash !== 'undefined') {
					(ctx as any).webkitLineDash = gaps;
				} else
				if (typeof (ctx as any).mozDash !== 'undefined' && !(gaps.length === 1 && gaps[0] === 0)) {
					(ctx as any).mozDash = gaps;
				}

				const offset = strokeDashoffsetProp.getPixels();

				if (typeof ctx.lineDashOffset !== 'undefined') {
					ctx.lineDashOffset = offset;
				} else
				if (typeof (ctx as any).webkitLineDashOffset !== 'undefined') {
					(ctx as any).webkitLineDashOffset = offset;
				} else
				if (typeof (ctx as any).mozDashOffset !== 'undefined') {
					(ctx as any).mozDashOffset = offset;
				}
			}
		}

		// font
		this.modifiedEmSizeStack = false;

		if (typeof ctx.font !== 'undefined') {

			const fontStyleProp = this.getStyle('font');
			const fontStyleStyleProp = this.getStyle('font-style');
			const fontVariantStyleProp = this.getStyle('font-variant');
			const fontWeightStyleProp = this.getStyle('font-weight');
			const fontSizeStyleProp = this.getStyle('font-size');
			const fontFamilyStyleProp = this.getStyle('font-family');
			const font = new Font(
				fontStyleStyleProp.getString(),
				fontVariantStyleProp.getString(),
				fontWeightStyleProp.getString(),
				fontSizeStyleProp.hasValue()
					? `${fontSizeStyleProp.getPixels(true)}px`
					: '',
				fontFamilyStyleProp.getString(),
				Font.parse(
					fontStyleProp.getString(),
					ctx.font
				)
			);

			fontStyleStyleProp.setValue(font.fontStyle);
			fontVariantStyleProp.setValue(font.fontVariant);
			fontWeightStyleProp.setValue(font.fontWeight);
			fontSizeStyleProp.setValue(font.fontSize);
			fontFamilyStyleProp.setValue(font.fontFamily);

			ctx.font = font.toString();

			if (fontSizeStyleProp.isPixels()) {
				this.document.emSize = fontSizeStyleProp.getPixels();
				this.modifiedEmSizeStack = true;
			}
		}

		// transform
		const transform = Transform.fromElement(this.document, this);

		if (transform) {
			transform.apply(ctx);
		}

		// clip
		const clipPathStyleProp = this.getStyle('clip-path', false, true);

		if (clipPathStyleProp.hasValue()) {

			const clip = clipPathStyleProp.getDefinition<ClipPathElement>();

			if (clip) {
				clip.apply(ctx);
			}
		}

		// opacity
		ctx.globalAlpha = this.calculateOpacity();
	}

	clearContext(ctx: RenderingContext2D) {

		super.clearContext(ctx);

		if (this.modifiedEmSizeStack) {
			this.document.popEmSize();
		}
	}
}
