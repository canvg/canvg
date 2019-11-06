import {
	RenderingContext2D
} from '../types';
import {
	vectorsRatio,
	vectorsAngle
} from '../util';
import Point from '../Point';
import BoundingBox from '../BoundingBox';
import PathParser from '../PathParser';
import Document from './Document';
import RenderedElement from './RenderedElement';
import MarkerElement from './MarkerElement';

export type Marker = [Point, number];

export default class PathElement extends RenderedElement {

	type = 'path';
	readonly pathParser: PathParser = null;

	constructor(
		document: Document,
		node: HTMLElement,
		captureTextNodes?: boolean
	) {

		super(document, node, captureTextNodes);

		this.pathParser = new PathParser(this.getAttribute('d').getString());
	}

	path(ctx?: RenderingContext2D) {

		const {
			pathParser
		} = this;
		const boundingBox = new BoundingBox();

		pathParser.reset();

		if (ctx) {
			ctx.beginPath();
		}

		while (!pathParser.isEnd()) {

			pathParser.nextCommand();

			switch (pathParser.command) {

				case 'M':
				case 'm':
					this.pathM(ctx, boundingBox);
					break;

				case 'L':
				case 'l':
					this.pathL(ctx, boundingBox);
					break;

				case 'H':
				case 'h':
					this.pathH(ctx, boundingBox);
					break;

				case 'V':
				case 'v':
					this.pathV(ctx, boundingBox);
					break;

				case 'C':
				case 'c':
					this.pathC(ctx, boundingBox);
					break;

				case 'S':
				case 's':
					this.pathS(ctx, boundingBox);
					break;

				case 'Q':
				case 'q':
					this.pathQ(ctx, boundingBox);
					break;

				case 'T':
				case 't':
					this.pathT(ctx, boundingBox);
					break;

				case 'A':
				case 'a':
					this.pathA(ctx, boundingBox);
					break;

				case 'Z':
				case 'z':
					this.pathZ(ctx, boundingBox);
					break;

				default:
			}
		}

		return boundingBox;
	}

	getBoundingBox(_?: RenderingContext2D) {
		return this.path();
	}

	getMarkers(): Marker[] {

		const {
			pathParser
		} = this;
		const points = pathParser.getMarkerPoints();
		const angles = pathParser.getMarkerAngles();
		const markers = points.map((point, i): Marker => [
			point,
			angles[i]
		]);

		return markers;
	}

	renderChildren(ctx: RenderingContext2D) {

		this.path(ctx);
		this.document.screen.mouse.checkPath(this, ctx);

		const fillRuleStyleProp = this.getStyle('fill-rule');

		if (ctx.fillStyle !== '') {

			if (fillRuleStyleProp.getString('inherit') !== 'inherit') {
				ctx.fill(fillRuleStyleProp.getString() as any);
			} else {
				ctx.fill();
			}
		}

		if (ctx.strokeStyle !== '') {
			ctx.stroke();
		}

		const markers = this.getMarkers();

		if (markers) {

			const markersLastIndex = markers.length - 1;
			const markerStartStyleProp = this.getStyle('marker-start');
			const markerMidStyleProp = this.getStyle('marker-mid');
			const markerEndStyleProp = this.getStyle('marker-end');

			if (markerStartStyleProp.isUrlDefinition()) {

				const marker = markerStartStyleProp.getDefinition<MarkerElement>();
				const [
					point,
					angle
				] = markers[0];

				marker.render(ctx, point, angle);
			}

			if (markerMidStyleProp.isUrlDefinition()) {

				const marker = markerMidStyleProp.getDefinition<MarkerElement>();

				for (let i = 1; i < markersLastIndex; i++) {

					const [
						point,
						angle
					] = markers[i];

					marker.render(ctx, point, angle);
				}
			}

			if (markerEndStyleProp.isUrlDefinition()) {

				const marker = markerEndStyleProp.getDefinition<MarkerElement>();
				const [
					point,
					angle
				] = markers[markersLastIndex];

				marker.render(ctx, point, angle);
			}
		}
	}

	protected pathM(
		ctx: RenderingContext2D,
		boundingBox: BoundingBox
	) {

		const {
			pathParser
		} = this;
		const point = pathParser.getAsCurrentPoint();
		const {
			x,
			y
		} = point;

		pathParser.addMarker(point);
		boundingBox.addPoint(x, y);

		if (ctx) {
			ctx.moveTo(x, y);
		}

		pathParser.start = pathParser.current;

		while (!pathParser.isCommandOrEnd()) {

			const point = pathParser.getAsCurrentPoint();
			const {
				x,
				y
			} = point;

			pathParser.addMarker(point, pathParser.start);
			boundingBox.addPoint(x, y);

			if (ctx) {
				ctx.lineTo(x, y);
			}
		}
	}

	protected pathL(
		ctx: RenderingContext2D,
		boundingBox: BoundingBox
	) {

		const {
			pathParser
		} = this;

		while (!pathParser.isCommandOrEnd()) {

			const {
				current
			} = pathParser;
			const point = pathParser.getAsCurrentPoint();
			const {
				x,
				y
			} = point;

			pathParser.addMarker(point, current);
			boundingBox.addPoint(x, y);

			if (ctx) {
				ctx.lineTo(x, y);
			}
		}
	}

	protected pathH(
		ctx: RenderingContext2D,
		boundingBox: BoundingBox
	) {

		const {
			pathParser
		} = this;

		while (!pathParser.isCommandOrEnd()) {

			const {
				current
			} = pathParser;
			const point = new Point(
				(pathParser.isRelativeCommand()
					? current.x
					: 0)
				+ pathParser.getScalar(),
				current.y
			);

			pathParser.addMarker(point, current);
			pathParser.current = point;
			boundingBox.addPoint(point.x, point.y);

			if (ctx) {
				ctx.lineTo(point.x, point.y);
			}
		}
	}

	protected pathV(
		ctx: RenderingContext2D,
		boundingBox: BoundingBox
	) {

		const {
			pathParser
		} = this;

		while (!pathParser.isCommandOrEnd()) {

			const {
				current
			} = pathParser;
			const point = new Point(
				current.x,
				(pathParser.isRelativeCommand()
					? current.y
					: 0)
				+ pathParser.getScalar()
			);

			pathParser.addMarker(point, current);
			pathParser.current = point;
			boundingBox.addPoint(point.x, point.y);

			if (ctx) {
				ctx.lineTo(point.x, point.y);
			}
		}
	}

	protected pathC(
		ctx: RenderingContext2D,
		boundingBox: BoundingBox
	) {

		const {
			pathParser
		} = this;

		while (!pathParser.isCommandOrEnd()) {

			const {
				current
			} = pathParser;
			const point = pathParser.getPoint();
			const controlPoint = pathParser.getAsControlPoint();
			const currentPoint = pathParser.getAsCurrentPoint();

			pathParser.addMarker(currentPoint, controlPoint, point);
			boundingBox.addBezierCurve(
				current.x,
				current.y,
				point.x,
				point.y,
				controlPoint.x,
				controlPoint.y,
				currentPoint.x,
				currentPoint.y
			);

			if (ctx) {
				ctx.bezierCurveTo(
					point.x,
					point.y,
					controlPoint.x,
					controlPoint.y,
					currentPoint.x,
					currentPoint.y
				);
			}
		}
	}

	protected pathS(
		ctx: RenderingContext2D,
		boundingBox: BoundingBox
	) {

		const {
			pathParser
		} = this;

		while (!pathParser.isCommandOrEnd()) {

			const {
				current
			} = pathParser;
			const point = pathParser.getReflectedControlPoint();
			const controlPoint = pathParser.getAsControlPoint();
			const currentPoint = pathParser.getAsCurrentPoint();

			pathParser.addMarker(currentPoint, controlPoint, point);
			boundingBox.addBezierCurve(
				current.x,
				current.y,
				point.x,
				point.y,
				controlPoint.x,
				controlPoint.y,
				currentPoint.x,
				currentPoint.y
			);

			if (ctx) {
				ctx.bezierCurveTo(
					point.x,
					point.y,
					controlPoint.x,
					controlPoint.y,
					currentPoint.x,
					currentPoint.y
				);
			}
		}
	}

	protected pathQ(
		ctx: RenderingContext2D,
		boundingBox: BoundingBox
	) {

		const {
			pathParser
		} = this;

		while (!pathParser.isCommandOrEnd()) {

			const {
				current
			} = pathParser;
			const controlPoint = pathParser.getAsControlPoint();
			const currentPoint = pathParser.getAsCurrentPoint();

			pathParser.addMarker(currentPoint, controlPoint, controlPoint);
			boundingBox.addQuadraticCurve(
				current.x,
				current.y,
				controlPoint.x,
				controlPoint.y,
				currentPoint.x,
				currentPoint.y
			);

			if (ctx) {
				ctx.quadraticCurveTo(
					controlPoint.x,
					controlPoint.y,
					currentPoint.x,
					currentPoint.y
				);
			}
		}
	}

	protected pathT(
		ctx: RenderingContext2D,
		boundingBox: BoundingBox
	) {

		const {
			pathParser
		} = this;

		while (!pathParser.isCommandOrEnd()) {

			const {
				current
			} = pathParser;
			const controlPoint = pathParser.getReflectedControlPoint();

			pathParser.control = controlPoint;

			const currentPoint = pathParser.getAsCurrentPoint();

			pathParser.addMarker(currentPoint, controlPoint, controlPoint);
			boundingBox.addQuadraticCurve(
				current.x,
				current.y,
				controlPoint.x,
				controlPoint.y,
				currentPoint.x,
				currentPoint.y
			);

			if (ctx) {
				ctx.quadraticCurveTo(
					controlPoint.x,
					controlPoint.y,
					currentPoint.x,
					currentPoint.y
				);
			}
		}
	}

	protected pathA(
		ctx: RenderingContext2D,
		boundingBox: BoundingBox
	) {

		const {
			pathParser
		} = this;

		while (!pathParser.isCommandOrEnd()) {

			const {
				current
			} = pathParser;
			let rx = pathParser.getScalar();
			let ry = pathParser.getScalar();
			const xAxisRotation = pathParser.getScalar() * (Math.PI / 180.0);
			const largeArcFlag = pathParser.getScalar();
			const sweepFlag = pathParser.getScalar();
			const currentPoint = pathParser.getAsCurrentPoint();

			// Conversion from endpoint to center parameterization
			// http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
			// x1', y1'
			const currp = new Point(
				Math.cos(xAxisRotation) * (current.x - currentPoint.x) / 2.0
				+ Math.sin(xAxisRotation) * (current.y - currentPoint.y) / 2.0,
				-Math.sin(xAxisRotation) * (current.x - currentPoint.x) / 2.0
				+ Math.cos(xAxisRotation) * (current.y - currentPoint.y) / 2.0
			);
			// adjust radii
			const l = Math.pow(currp.x, 2) / Math.pow(rx, 2) + Math.pow(currp.y, 2) / Math.pow(ry, 2);

			if (l > 1) {
				rx *= Math.sqrt(l);
				ry *= Math.sqrt(l);
			}
			// cx', cy'
			let s = (largeArcFlag === sweepFlag ? -1 : 1) * Math.sqrt(
				(
					(Math.pow(rx, 2) * Math.pow(ry, 2))
					- (Math.pow(rx, 2) * Math.pow(currp.y, 2))
					- (Math.pow(ry, 2) * Math.pow(currp.x, 2))
				) / (
					Math.pow(rx, 2) * Math.pow(currp.y, 2)
					+ Math.pow(ry, 2) * Math.pow(currp.x, 2)
				)
			);

			if (isNaN(s)) {
				s = 0;
			}

			const cpp = new Point(
				s * rx * currp.y / ry,
				s * -ry * currp.x / rx
			);
			// cx, cy
			const centp = new Point(
				(current.x + currentPoint.x) / 2.0
				+ Math.cos(xAxisRotation) * cpp.x
				- Math.sin(xAxisRotation) * cpp.y,
				(current.y + currentPoint.y) / 2.0
				+ Math.sin(xAxisRotation) * cpp.x
				+ Math.cos(xAxisRotation) * cpp.y
			);
			// initial angle
			const a1 = vectorsAngle([1, 0], [(currp.x - cpp.x) / rx, (currp.y - cpp.y) / ry]);
			// angle delta
			const u = [(currp.x - cpp.x) / rx, (currp.y - cpp.y) / ry];
			const v = [(-currp.x - cpp.x) / rx, (-currp.y - cpp.y) / ry];
			let ad = vectorsAngle(u, v);

			if (vectorsRatio(u, v) <= -1) {
				ad = Math.PI;
			}

			if (vectorsRatio(u, v) >= 1) {
				ad = 0;
			}

			// for markers
			const dir = 1 - sweepFlag ? 1.0 : -1.0;
			const ah = a1 + dir * (ad / 2.0);
			const halfWay = new Point(
				centp.x + rx * Math.cos(ah),
				centp.y + ry * Math.sin(ah)
			);
			pathParser.addMarkerAngle(halfWay, ah - dir * Math.PI / 2);
			pathParser.addMarkerAngle(currentPoint, ah - dir * Math.PI);

			boundingBox.addPoint(currentPoint.x, currentPoint.y); // TODO: this is too naive, make it better

			if (ctx && !isNaN(a1) && !isNaN(ad)) {

				const r = rx > ry ? rx : ry;
				const sx = rx > ry ? 1 : rx / ry;
				const sy = rx > ry ? ry / rx : 1;

				ctx.translate(centp.x, centp.y);
				ctx.rotate(xAxisRotation);
				ctx.scale(sx, sy);
				ctx.arc(0, 0, r, a1, a1 + ad, Boolean(1 - sweepFlag));
				ctx.scale(1 / sx, 1 / sy);
				ctx.rotate(-xAxisRotation);
				ctx.translate(-centp.x, -centp.y);
			}
		}
	}

	protected pathZ(
		ctx: RenderingContext2D,
		boundingBox: BoundingBox
	) {

		const {
			pathParser
		} = this;

		if (ctx) {
			// only close path if it is not a straight line
			if (boundingBox.x1 !== boundingBox.x2
				&& boundingBox.y1 !== boundingBox.y2
			) {
				ctx.closePath();
			}
		}

		pathParser.current = pathParser.start;
	}
}
