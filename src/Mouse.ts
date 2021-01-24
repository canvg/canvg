import {
	RenderingContext2D
} from './types';
import BoundingBox from './BoundingBox';
import Point from './Point';
import Screen from './Screen';
import {
	Element
} from './Document';

interface IEventTarget {
	onClick?(): void;
	onMouseMove?(): void;
}

export interface IEvent {
	type: string;
	x: number;
	y: number;
	run(eventTarget: IEventTarget): void;
}

export default class Mouse {
	private working = false;
	private events: IEvent[] = [];
	private eventElements: Element[] = [];

	constructor(
		private readonly screen: Screen
	) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		this.onClick = this.onClick.bind(this);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		this.onMouseMove = this.onMouseMove.bind(this);
	}

	isWorking() {
		return this.working;
	}

	start() {
		if (this.working) {
			return;
		}

		const {
			screen,
			onClick,
			onMouseMove
		} = this;
		const canvas = screen.ctx.canvas as HTMLCanvasElement;

		canvas.onclick = onClick;
		canvas.onmousemove = onMouseMove;
		this.working = true;
	}

	stop() {
		if (!this.working) {
			return;
		}

		const canvas = this.screen.ctx.canvas as HTMLCanvasElement;

		this.working = false;
		canvas.onclick = null;
		canvas.onmousemove = null;
	}

	hasEvents() {
		return this.working && this.events.length > 0;
	}

	runEvents() {
		if (!this.working) {
			return;
		}

		const {
			screen: document,
			events,
			eventElements
		} = this;
		const {
			style
		} = document.ctx.canvas as HTMLCanvasElement;

		if (style) {
			style.cursor = '';
		}

		events.forEach(({
			run
		}, i) => {
			let element = eventElements[i];

			while (element) {
				run(element as IEventTarget);
				element = element.parent;
			}
		});

		// done running, clear
		this.events = [];
		this.eventElements = [];
	}

	checkPath(element: Element, ctx: RenderingContext2D) {
		if (!this.working || !ctx) {
			return;
		}

		const {
			events,
			eventElements
		} = this;

		events.forEach(({
			x, y
		}, i) => {
			if (!eventElements[i] && ctx.isPointInPath && ctx.isPointInPath(x, y)) {
				eventElements[i] = element;
			}
		});
	}

	checkBoundingBox(element: Element, boundingBox: BoundingBox) {
		if (!this.working || !boundingBox) {
			return;
		}

		const {
			events,
			eventElements
		} = this;

		events.forEach(({
			x, y
		}, i) => {
			if (!eventElements[i] && boundingBox.isPointInBox(x, y)) {
				eventElements[i] = element;
			}
		});
	}

	private mapXY(x: number, y: number) {
		const {
			window,
			ctx
		} = this.screen;
		const point = new Point(x, y);
		let element = ctx.canvas as HTMLElement;

		while (element) {
			point.x -= element.offsetLeft;
			point.y -= element.offsetTop;
			element = element.offsetParent as HTMLElement;
		}

		if (window.scrollX) {
			point.x += window.scrollX;
		}

		if (window.scrollY) {
			point.y += window.scrollY;
		}

		return point;
	}

	private onClick(event: MouseEvent) {
		const {
			x,
			y
		} = this.mapXY(
			event.clientX,
			event.clientY
		);

		this.events.push({
			type: 'onclick',
			x,
			y,
			run(eventTarget) {
				if (eventTarget.onClick) {
					eventTarget.onClick();
				}
			}
		});
	}

	private onMouseMove(event: MouseEvent) {
		const {
			x,
			y
		} = this.mapXY(
			event.clientX,
			event.clientY
		);

		this.events.push({
			type: 'onmousemove',
			x,
			y,
			run(eventTarget) {
				if (eventTarget.onMouseMove) {
					eventTarget.onMouseMove();
				}
			}
		});
	}
}
