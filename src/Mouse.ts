import BoundingBox from './BoundingBox';
import Point from './Point';
import Screen from './Screen';
import {
	Element
} from './Document';

export interface IEvent {
	type: string;
	x: number;
	y: number;
	run(event: any): void;
}

export default class Mouse {

	private events: IEvent[] = [];
	private eventElements: Element[] = [];

	constructor(
		private readonly screen: Screen
	) {
		this.onClick = this.onClick.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
	}

	start() {

		const {
			screen,
			onClick,
			onMouseMove
		} = this;
		const {
			canvas
		} = screen.ctx;

		canvas.onclick = onClick;
		canvas.onmousemove = onMouseMove;
	}

	stop() {

		const {
			canvas
		} = this.screen.ctx;

		canvas.onclick = null;
		canvas.onmousemove = null;
	}

	hasEvents() {
		return Boolean(this.events.length);
	}

	checkPath(element: Element, ctx: CanvasRenderingContext2D) {

		if (!ctx) {
			return;
		}

		const {
			events,
			eventElements
		} = this;

		events.forEach(({ x, y }, i) => {

			if (!eventElements[i] && ctx.isPointInPath && ctx.isPointInPath(x, y)) {
				eventElements[i] = element;
			}
		});
	}

	checkBoundingBox(element: Element, boundingBox: BoundingBox) {

		if (!boundingBox) {
			return;
		}

		const {
			events,
			eventElements
		} = this;

		events.forEach(({ x, y }, i) => {

			if (!eventElements[i] && boundingBox.isPointInBox(x, y)) {
				eventElements[i] = element;
			}
		});
	}

	runEvents() {

		const {
			screen: document,
			events,
			eventElements
		} = this;
		const {
			style
		} = document.ctx.canvas;

		if (style) {
			style.cursor = '';
		}

		events.forEach(({ run }, i) => {

			let element = eventElements[i];

			while (element) {
				run(element);
				element = element.parent;
			}
		});

		// done running, clear
		this.events = [];
		this.eventElements = [];
	}

	private mapXY(x: number, y: number) {

		const {
			window,
			ctx
		} = this.screen;
		const point = new Point(x, y);
		let element: any = ctx.canvas;

		while (element) {
			point.x -= element.offsetLeft;
			point.y -= element.offsetTop;
			element = element.offsetParent;
		}

		if (window.scrollX) {
			point.x += window.scrollX;
		}

		if (window.scrollY) {
			point.y += window.scrollY;
		}

		return point;
	}

	private onClick(evt: MouseEvent) {

		const {
			x,
			y
		} = this.mapXY(
			(evt || event as any).clientX,
			(evt || event as any).clientY
		);

		this.events.push({
			type: 'onclick',
			x,
			y,
			run(event) {
				if (event.onClick) {
					event.onClick();
				}
			}
		});
	}

	private onMouseMove(evt: MouseEvent) {

		const {
			x,
			y
		} = this.mapXY(
			(evt || event as any).clientX,
			(evt || event as any).clientY
		);

		this.events.push({
			type: 'onmousemove',
			x,
			y,
			run(event) {
				if (event.onMouseMove) {
					event.onMouseMove();
				}
			}
		});
	}
}
