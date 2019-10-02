import {
	toNumberArray
} from '../util';
import AnimateElement from './AnimateElement';

export default class AnimateTransformElement extends AnimateElement {

	type = 'animateTransform';

	calcValue() {

		const {
			progress,
			from,
			to
		} = this.getProgress();

		// tween value linearly
		const transformFrom = toNumberArray(from.getString());
		const transformTo = toNumberArray(to.getString());
		const newValue = transformFrom.map((from, i) => {

			const to = transformTo[i];

			return from + (to - from) * progress;
		}).join(' ');

		return newValue;
	}
}
