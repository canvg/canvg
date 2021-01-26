import Property from '../Property';
import Document from './Document';
import Element from './Element';

export interface IProgress {
	from?: Property;
	to?: Property;
	progress: number;
}

export default class AnimateElement extends Element {
	type = 'animate';
	protected readonly begin: number;
	protected readonly maxDuration: number;
	protected readonly from: Property;
	protected readonly to: Property;
	protected readonly values: Property<string[]>;
	protected duration = 0;
	protected initialValue: string = null;
	protected initialUnits = '';
	protected removed = false;
	protected frozen = false;

	constructor(
		document: Document,
		node: HTMLElement,
		captureTextNodes?: boolean
	) {
		super(document, node, captureTextNodes);

		document.screen.animations.push(this);

		this.begin = this.getAttribute('begin').getMilliseconds();
		this.maxDuration = this.begin + this.getAttribute('dur').getMilliseconds();
		this.from = this.getAttribute('from');
		this.to = this.getAttribute('to');
		this.values = new Property<string[]>(document, 'values', null);

		const valuesAttr = this.getAttribute('values');

		if (valuesAttr.hasValue()) {
			this.values.setValue(valuesAttr.getString().split(';'));
		}
	}

	protected getProperty() {
		const attributeType = this.getAttribute('attributeType').getString();
		const attributeName = this.getAttribute('attributeName').getString();

		if (attributeType === 'CSS') {
			return this.parent.getStyle(attributeName, true);
		}

		return this.parent.getAttribute(attributeName, true);
	}

	calcValue() {
		const {
			initialUnits
		} = this;
		const {
			progress,
			from,
			to
		} = this.getProgress();
		// tween value linearly
		let newValue = from.getNumber() + (to.getNumber() - from.getNumber()) * progress;

		if (initialUnits === '%') {
			newValue *= 100.0; // numValue() returns 0-1 whereas properties are 0-100
		}

		return `${newValue}${initialUnits}`;
	}

	update(delta: number) {
		const {
			parent
		} = this;
		const prop = this.getProperty();

		// set initial value
		if (!this.initialValue) {
			this.initialValue = prop.getString();
			this.initialUnits = prop.getUnits();
		}

		// if we're past the end time
		if (this.duration > this.maxDuration) {
			const fill = this.getAttribute('fill').getString('remove');

			// loop for indefinitely repeating animations
			if (this.getAttribute('repeatCount').getString() === 'indefinite'
				|| this.getAttribute('repeatDur').getString() === 'indefinite'
			) {
				this.duration = 0;
			} else
			if (fill === 'freeze' && !this.frozen) {
				this.frozen = true;
				parent.animationFrozen = true;
				parent.animationFrozenValue = prop.getString();
			} else
			if (fill === 'remove' && !this.removed) {
				this.removed = true;
				prop.setValue(
					parent.animationFrozen
						? parent.animationFrozenValue
						: this.initialValue
				);
				return true;
			}

			return false;
		}

		this.duration += delta;

		// if we're past the begin time
		let updated = false;

		if (this.begin < this.duration) {
			let newValue = this.calcValue(); // tween
			const typeAttr = this.getAttribute('type');

			if (typeAttr.hasValue()) {
				// for transform, etc.
				const type = typeAttr.getString();

				newValue = `${type}(${newValue})`;
			}

			prop.setValue(newValue);
			updated = true;
		}

		return updated;
	}

	getProgress() {
		const {
			document,
			values
		} = this;
		const result: IProgress = {
			progress: (this.duration - this.begin) / (this.maxDuration - this.begin)
		};

		if (values.hasValue()) {
			const p = result.progress * (values.getValue().length - 1);
			const lb = Math.floor(p);
			const ub = Math.ceil(p);

			result.from = new Property(
				document,
				'from',
				parseFloat(values.getValue()[lb])
			);
			result.to = new Property(
				document,
				'to',
				parseFloat(values.getValue()[ub])
			);
			result.progress = (p - lb) / (ub - lb);
		} else {
			result.from = this.from;
			result.to = this.to;
		}

		return result;
	}
}
