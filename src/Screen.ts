import requestAnimationFrame from 'raf';
import {
	compressSpaces,
	toNumberArray
} from './util';
import Property from './Property';
import ViewPort from './ViewPort';
import Mouse from './Mouse';
import Document, {
	Element,
	AnimateElement
} from './Document';

export interface IScreenOptions {
	window?: Window;
	fetch?: typeof fetch;
}

export interface IScreenStartOptions {
	enableRedraw?: boolean;
	ignoreMouse?: boolean;
	ignoreAnimation?: boolean;
	ignoreDimensions?: boolean;
	ignoreClear?: boolean;
	scaleWidth?: number;
	scaleHeight?: number;
	offsetX?: number;
	offsetY?: number;
	forceRedraw?(): boolean;
}

const defaultWindow = typeof window !== 'undefined'
	? window
	: null;
const defaultFetch = typeof fetch !== 'undefined'
	? fetch.bind(window)
	: null;

export default class Screen {

	static readonly defaultWindow = defaultWindow;
	static readonly defaultFetch = defaultFetch;

	FRAMERATE = 30;
	MAX_VIRTUAL_PIXELS = 30000;
	CLIENT_WIDTH = 800;
	CLIENT_HEIGHT = 600;
	readonly window?: Window;
	readonly fetch: typeof defaultFetch;
	readonly viewPort = new ViewPort();
	readonly mouse = new Mouse(this);
	readonly animations: AnimateElement[] = [];
	private readyPromise: Promise<void>;
	private resolveReady: () => void;
	private waits: (() => boolean)[] = [];
	private frameDuration = 0;
	private isReadyLock = false;
	private isFirstRender = true;
	private intervalId: any = null;

	constructor(
		readonly ctx: CanvasRenderingContext2D,
		{
			fetch = defaultFetch,
			window = defaultWindow
		}: IScreenOptions = {}
	) {
		this.window = window;
		this.fetch = fetch;
	}

	wait(checker: () => boolean) {
		this.waits.push(checker);
	}

	ready() {

		if (!this.readyPromise) {
			return Promise.resolve();
		}

		return this.readyPromise;
	}

	isReady() {

		if (this.isReadyLock) {
			return true;
		}

		const isReadyLock = this.waits.every(_ => _());

		if (isReadyLock) {

			this.waits = [];

			if (this.resolveReady) {
				this.resolveReady();
			}
		}

		this.isReadyLock = isReadyLock;

		return isReadyLock;
	}

	setDefaults(ctx: CanvasRenderingContext2D) {
		// initial values and defaults
		ctx.strokeStyle = 'rgba(0,0,0,0)';
		ctx.lineCap = 'butt';
		ctx.lineJoin = 'miter';
		ctx.miterLimit = 4;
	}

	setAspectRatio(
		document: Document,
		ctx: CanvasRenderingContext2D,
		aspectRatio: string,
		width: number,
		desiredWidth: number,
		height: number,
		desiredHeight: number,
		minX = 0,
		minY = 0,
		refX?: number,
		refY?: number
	) {
		// aspect ratio - http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
		const cleanAspectRatio = compressSpaces(aspectRatio).replace(/^defer\s/, ''); // ignore defer
		const [
			aspectRatioAlign,
			aspectRatioMeetOrSlice
		] = cleanAspectRatio.split(' ');
		const align = aspectRatioAlign || 'xMidYMid';
		const meetOrSlice = aspectRatioMeetOrSlice || 'meet';
		// calculate scale
		const scaleX = width / desiredWidth;
		const scaleY = height / desiredHeight;
		const scaleMin = Math.min(scaleX, scaleY);
		const scaleMax = Math.max(scaleX, scaleY);
		let finalDesiredWidth = desiredWidth;
		let finalDesiredHeight = desiredHeight;

		if (meetOrSlice === 'meet') {
			finalDesiredWidth *= scaleMin;
			finalDesiredHeight *= scaleMin;
		}

		if (meetOrSlice === 'slice') {
			finalDesiredWidth *= scaleMax;
			finalDesiredHeight *= scaleMax;
		}

		const refXProp = new Property(document, 'refX', refX);
		const refYProp = new Property(document, 'refY', refY);

		if (refXProp.hasValue() && refYProp.hasValue()) {
			ctx.translate(
				-scaleMin * refXProp.getPixels('x'),
				-scaleMin * refYProp.getPixels('y')
			);
		} else {

			const isMeetMinY = meetOrSlice === 'meet' && scaleMin === scaleY;
			const isSliceMaxY = meetOrSlice === 'slice' && scaleMax === scaleY;
			const isMeetMinX = meetOrSlice === 'meet' && scaleMin === scaleX;
			const isSliceMaxX = meetOrSlice === 'slice' && scaleMax === scaleX;

			switch (true) {

				case /^xMid/.test(align) && (
					isMeetMinY || isSliceMaxY
				):
					ctx.translate(width / 2.0 - finalDesiredWidth / 2.0, 0);
					break;

				case /YMid$/.test(align) && (
					isMeetMinX || isSliceMaxX
				):
					ctx.translate(0, height / 2.0 - finalDesiredHeight / 2.0);
					break;

				case /^xMax/.test(align) && (
					isMeetMinY || isSliceMaxY
				):
					ctx.translate(width - finalDesiredWidth, 0);
					break;

				case /YMax$/.test(align) && (
					isMeetMinX || isSliceMaxX
				):
					ctx.translate(0, height - finalDesiredHeight);
					break;

				default:
			}
		}

		// scale
		switch (true) {

			case align === 'none':
				ctx.scale(scaleX, scaleY);
				break;

			case meetOrSlice === 'meet':
				ctx.scale(scaleMin, scaleMin);
				break;

			case meetOrSlice === 'slice':
				ctx.scale(scaleMax, scaleMax);
				break;

			default:
		}

		// translate
		ctx.translate(-minX, -minY);
	}

	start(
		element: Element,
		{
			enableRedraw = false,
			ignoreMouse = false,
			ignoreAnimation = false,
			ignoreDimensions = false,
			ignoreClear = false,
			forceRedraw,
			scaleWidth,
			scaleHeight,
			offsetX,
			offsetY
		}: IScreenStartOptions = {}
	) {

		const {
			FRAMERATE,
			mouse
		} = this;
		const frameDuration = 1000 / FRAMERATE;

		this.frameDuration = frameDuration;
		this.readyPromise = new Promise((resolve) => {
			this.resolveReady = resolve;
		});

		if (this.isReady()) {
			this.render(
				element,
				ignoreDimensions,
				ignoreClear,
				scaleWidth,
				scaleHeight,
				offsetX,
				offsetY
			);
		}

		if (!enableRedraw) {
			return;
		}

		let now = Date.now();
		let then = now;
		let delta = 0;
		const tick = () => {

			now = Date.now();
			delta = now - then;

			if (delta >= frameDuration) {

				then = now - (delta % frameDuration);

				if (this.shouldUpdate(
					ignoreMouse,
					ignoreAnimation,
					forceRedraw
				)) {
					this.render(
						element,
						ignoreDimensions,
						ignoreClear,
						scaleWidth,
						scaleHeight,
						offsetX,
						offsetY
					);
					mouse.runEvents();
				}
			}

			this.intervalId = requestAnimationFrame(tick);
		};

		mouse.start();
		this.intervalId = requestAnimationFrame(tick);
	}

	stop() {

		if (this.intervalId) {
			requestAnimationFrame.cancel(this.intervalId);
			this.intervalId = null;
		}

		this.mouse.stop();
	}

	private shouldUpdate(
		ignoreMouse: boolean,
		ignoreAnimation: boolean,
		forceRedraw: () => boolean
	) {

		// need update from animations?
		if (!ignoreAnimation) {

			const {
				frameDuration
			} = this;
			const shouldUpdate = this.animations.reduce(
				(shouldUpdate, animation) => animation.update(frameDuration) || shouldUpdate,
				false
			);

			if (shouldUpdate) {
				return true;
			}
		}

		// need update from redraw?
		if (typeof forceRedraw === 'function' && forceRedraw()) {
			return true;
		}

		if (!this.isReadyLock && this.isReady()) {
			return true;
		}

		// need update from mouse events?
		if (!ignoreMouse && this.mouse.hasEvents()) {
			return true;
		}

		return false;
	}

	private render(
		element: Element,
		ignoreDimensions: boolean,
		ignoreClear: boolean,
		scaleWidth: number,
		scaleHeight: number,
		offsetX: number,
		offsetY: number
	) {

		const {
			CLIENT_WIDTH,
			CLIENT_HEIGHT,
			viewPort,
			ctx,
			isFirstRender
		} = this;
		const {
			canvas
		} = ctx;

		viewPort.clear();

		if (canvas.parentNode) {

			const {
				clientWidth,
				clientHeight
			} = canvas.parentNode as HTMLElement;

			viewPort.setCurrent(clientWidth, clientHeight);
		} else {
			viewPort.setCurrent(CLIENT_WIDTH, CLIENT_HEIGHT);
		}

		const widthStyle = element.getStyle('width');
		const heightStyle = element.getStyle('height');

		if (!ignoreDimensions && (
			isFirstRender
			|| typeof scaleWidth !== 'number' && typeof scaleHeight !== 'number'
		)) {
			// set canvas size
			if (widthStyle.hasValue()) {

				canvas.width = widthStyle.getPixels('x');

				if (canvas.style) {
					canvas.style.width = `${canvas.width}px`;
				}
			}

			if (heightStyle.hasValue()) {

				canvas.height = heightStyle.getPixels('y');

				if (canvas.style) {
					canvas.style.height = `${canvas.height}px`;
				}
			}
		}

		let cWidth = canvas.clientWidth || canvas.width;
		let cHeight = canvas.clientHeight || canvas.height;

		if (ignoreDimensions && widthStyle.hasValue() && heightStyle.hasValue()) {
			cWidth = widthStyle.getPixels('x');
			cHeight = heightStyle.getPixels('y');
		}

		viewPort.setCurrent(cWidth, cHeight);

		if (typeof offsetX === 'number') {
			element.getAttribute('x', true).setValue(offsetX);
		}

		if (typeof offsetY === 'number') {
			element.getAttribute('y', true).setValue(offsetY);
		}

		if (typeof scaleWidth === 'number'
			|| typeof scaleHeight === 'number'
		) {

			const viewBox = toNumberArray(element.getAttribute('viewBox').getString());
			let xRatio = 0;
			let yRatio = 0;

			if (typeof scaleWidth === 'number') {

				const widthAttr = element.getAttribute('width');

				if (widthAttr.hasValue()) {
					xRatio = widthAttr.getPixels('x') / scaleWidth;
				} else
				if (!isNaN(viewBox[2])) {
					xRatio = viewBox[2] / scaleWidth;
				}
			}

			if (typeof scaleHeight === 'number') {

				const heightAttr = element.getAttribute('height');

				if (heightAttr.hasValue()) {
					yRatio = heightAttr.getPixels('y') / scaleHeight;
				} else
				if (!isNaN(viewBox[3])) {
					yRatio = viewBox[3] / scaleHeight;
				}
			}

			if (!xRatio) {
				xRatio = yRatio;
			}

			if (!yRatio) {
				yRatio = xRatio;
			}

			element.getAttribute('width', true).setValue(scaleWidth);
			element.getAttribute('height', true).setValue(scaleHeight);

			const transformStyle = element.getStyle('transform', true, true);

			transformStyle.setValue(`${transformStyle.getString()} scale(${1.0 / xRatio}, ${1.0 / yRatio})`);
		}

		// clear and render
		if (!ignoreClear) {
			ctx.clearRect(0, 0, cWidth, cHeight);
		}

		element.render(ctx);

		if (isFirstRender) {
			this.isFirstRender = false;
		}
	}
}