import RGBColor from 'rgbcolor';
import {
	normalizeColor
} from './util';
import {
	Axis
} from './ViewPort';
import Document, {
	Element,
	PatternElement,
	GradientElement
} from './Document';

export default class Property<T = any> {

	static readonly textBaselineMapping = {
		'baseline':         'alphabetic',
		'before-edge':      'top',
		'text-before-edge': 'top',
		'middle':           'middle',
		'central':          'middle',
		'after-edge':       'bottom',
		'text-after-edge':  'bottom',
		'ideographic':      'ideographic',
		'alphabetic':       'alphabetic',
		'hanging':          'hanging',
		'mathematical':     'alphabetic'
	};

	static empty(document: Document) {
		return new Property(document, 'EMPTY', '');
	}

	private isNormalizedColor = false;

	constructor(
		private readonly document: Document,
		private readonly name: string,
		private value: T
	) {}

	hasValue(zeroIsValue?: boolean) {

		const {
			value
		} = this as any;

		return value !== null
			&& value !== ''
			&& (zeroIsValue || value !== 0)
			&& typeof value !== 'undefined';
	}

	isString(regexp?: RegExp) {

		const {
			value
		} = this as any;
		const result = typeof value === 'string';

		if (!result || !regexp) {
			return result;
		}

		return regexp.test(value as string);
	}

	isUrlDefinition() {
		return this.isString(/^url\(/);
	}

	isPixels() {

		if (!this.hasValue()) {
			return false;
		}

		const asString = this.getString();

		switch (true) {

			case /px$/.test(asString):
			case /^[0-9]+$/.test(asString):
				return true;

			default:
				return false;
		}
	}

	setValue(value: T) {
		this.value = value;
		return this;
	}

	getValue(def?: T) {

		if (typeof def === 'undefined' || this.hasValue()) {
			return this.value;
		}

		return def;
	}

	getNumber(def?: T) {

		if (!this.hasValue()) {

			if (typeof def === 'undefined') {
				return 0;
			}

			return parseFloat(def as any);
		}

		const {
			value
		} = this as any;
		let n = parseFloat(value);

		if (this.isString(/%$/)) {
			n = n / 100.0;
		}

		return n;
	}

	getString(def?: T) {

		if (typeof def === 'undefined' || this.hasValue()) {
			return typeof this.value === 'undefined'
				? ''
				: String(this.value);
		}

		return String(def);
	}

	getColor(def?: T) {

		let color = this.getString(def);

		if (this.isNormalizedColor) {
			return color;
		}

		this.isNormalizedColor = true;
		color = normalizeColor(color);
		this.value = color as any;

		return color;
	}

	getDpi() {
		return 96.0; // TODO: compute?
	}

	getRem() {
		return this.document.rootEmSize;
	}

	getEm() {
		return this.document.emSize;
	}

	getUnits() {
		return this.getString().replace(/[0-9\.\-]/g, '');
	}

	getPixels(axis?: Axis, processPercent?: boolean): number;
	getPixels(isFontSize?: boolean): number;
	getPixels(axisOrIsFontSize?: Axis | boolean, processPercent = false): number {

		if (!this.hasValue()) {
			return 0;
		}

		const [
			axis,
			isFontSize
		] = typeof axisOrIsFontSize === 'boolean'
			? [undefined, axisOrIsFontSize]
			: [axisOrIsFontSize];
		const {
			viewPort
		} = this.document.screen;

		switch (true) {

			case this.isString(/vmin$/):
				return this.getNumber()
					/ 100.0
					* Math.min(
						viewPort.computeSize('x'),
						viewPort.computeSize('y')
					);

			case this.isString(/vmax$/):
				return this.getNumber()
					/ 100.0
					* Math.max(
						viewPort.computeSize('x'),
						viewPort.computeSize('y')
					);

			case this.isString(/vw$/):
				return this.getNumber()
					/ 100.0
					* viewPort.computeSize('x');

			case this.isString(/vh$/):
				return this.getNumber()
					/ 100.0
					* viewPort.computeSize('y');

			case this.isString(/rem$/):
				return this.getNumber() * this.getRem(/* viewPort */);

			case this.isString(/em$/):
				return this.getNumber() * this.getEm(/* viewPort */);

			case this.isString(/ex$/):
				return this.getNumber() * this.getEm(/* viewPort */) / 2.0;

			case this.isString(/px$/):
				return this.getNumber();

			case this.isString(/pt$/):
				return this.getNumber() * this.getDpi(/* viewPort */) * (1.0 / 72.0);

			case this.isString(/pc$/):
				return this.getNumber() * 15;

			case this.isString(/cm$/):
				return this.getNumber() * this.getDpi(/* viewPort */) / 2.54;

			case this.isString(/mm$/):
				return this.getNumber() * this.getDpi(/* viewPort */) / 25.4;

			case this.isString(/in$/):
				return this.getNumber() * this.getDpi(/* viewPort */);

			case this.isString(/%$/) && isFontSize:
				return this.getNumber() * this.getEm(/* viewPort */);

			case this.isString(/%$/):
				return this.getNumber() * viewPort.computeSize(axis);

			default: {

				const n = this.getNumber();

				if (processPercent && n < 1.0) {
					return n * viewPort.computeSize(axis);
				}

				return n;
			}
		}
	}

	getMilliseconds() {

		if (!this.hasValue()) {
			return 0;
		}

		if (this.isString(/ms$/)) {
			return this.getNumber();
		}

		return this.getNumber() * 1000;
	}

	getRadians() {

		if (!this.hasValue()) {
			return 0;
		}

		switch (true) {

			case this.isString(/deg$/):
				return this.getNumber() * (Math.PI / 180.0);

			case this.isString(/grad$/):
				return this.getNumber() * (Math.PI / 200.0);

			case this.isString(/rad$/):
				return this.getNumber();

			default:
				return this.getNumber() * (Math.PI / 180.0);
		}
	}

	getDefinition<T extends Element>() {

		const asString = this.getString();
		let name: string | RegExpMatchArray = asString.match(/#([^\)'"]+)/);

		if (name) {
			name = name[1];
		}

		if (!name) {
			name = asString;
		}

		return this.document.definitions[name as string] as T;
	}

	getFillStyleDefinition(element: Element, opacity: Property) {

		let def: PatternElement & GradientElement = this.getDefinition();

		if (!def) {
			return null;
		}

		// gradient
		if (typeof def.createGradient === 'function') {
			return def.createGradient(this.document.ctx, element, opacity);
		}

		// pattern
		if (typeof def.createPattern === 'function') {

			if (def.getHrefAttribute().hasValue()) {

				const patternTransform = def.getAttribute('patternTransform');

				def = def.getHrefAttribute().getDefinition();

				if (patternTransform.hasValue()) {
					def.getAttribute('patternTransform', true).setValue(patternTransform.value);
				}
			}

			return def.createPattern(this.document.ctx, element, opacity);
		}

		return null;
	}

	getTextBaseline(): string {

		if (!this.hasValue()) {
			return null;
		}

		return Property.textBaselineMapping[this.getString()];
	}

	addOpacity(opacity: Property) {

		let value = this.getColor();
		const len = value.length;
		let commas = 0;

		// Simulate old RGBColor version, which can't parse rgba.
		for (let i = 0; i < len; i++) {

			if (value[i] === ',') {
				commas++;
			}

			if (commas === 3) {
				break;
			}
		}

		if (opacity.hasValue() && this.isString() && commas !== 3) {

			const color = new RGBColor(value);

			if (color.ok) {
				color.alpha = opacity.getNumber();
				value = color.toRGBA();
			}
		}

		return new Property<string>(this.document, this.name, value);
	}
}
