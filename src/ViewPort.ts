
export interface IViewPortSize {
	width: number;
	height: number;
}

export type Axis = 'x' | 'y';

export default class ViewPort {

	viewPorts: IViewPortSize[] = [];

	clear() {
		this.viewPorts = [];
	}

	setCurrent(width: number, height: number) {
		this.viewPorts.push({
			width,
			height
		});
	}

	removeCurrent() {
		this.viewPorts.pop();
	}

	getCurrent() {

		const {
			viewPorts
		} = this;

		return viewPorts[viewPorts.length - 1];
	}

	get width() {
		return this.getCurrent().width;
	}

	get height() {
		return this.getCurrent().height;
	}

	computeSize(d?: number|Axis) {

		if (typeof d === 'number') {
			return d;
		}

		if (d === 'x') {
			return this.width;
		}

		if (d === 'y') {
			return this.height;
		}

		return Math.sqrt(
			Math.pow(this.width, 2) + Math.pow(this.height, 2)
		) / Math.sqrt(2);
	}
}
