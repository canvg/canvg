import {
	RenderingContext2D
} from '../types';
import {
	PSEUDO_ZERO,
	toNumbers,
	vectorsRatio,
	vectorsAngle,
	CB1,
	CB2,
	CB3,
	CB4,
	QB1,
	QB2,
	QB3
} from '../util';
import PathParser from '../PathParser';
import Point from '../Point';
import Document from './Document';
import TextElement from './TextElement';
import PathElement from './PathElement';

export interface IPoint {
	x: number;
	y: number;
}

export interface IPathCommand {
	command: string;
	points: number[];
	start?: IPoint;
	pathLength: number;
}

interface ICachedPoint extends IPoint {
	distance: number;
}

interface IEquidistantCache {
	step: number;
	precision: number;
	points: ICachedPoint[];
}

interface IGlyphInfo {
	transposeX: number;
	transposeY: number;
	text: string;
	rotation: number;
	p0: ICachedPoint;
	p1: ICachedPoint;
}

export default class TextPathElement extends TextElement {

	type = 'textPath';
	protected textWidth = 0;
	protected textHeight = 0;
	protected pathLength = -1;
	protected glyphInfo: IGlyphInfo[] = null;
	protected readonly text: string;
	protected readonly dataArray: IPathCommand[];
	private letterSpacingCache: number[] = [];
	private equidistantCache: IEquidistantCache;
	private readonly measuresCache = new Map<string, number>([['', 0]]);

	constructor(
		document: Document,
		node: HTMLElement,
		captureTextNodes?: boolean
	) {

		super(document, node, captureTextNodes);

		const pathElement = this.getHrefAttribute().getDefinition<PathElement>();

		this.text = this.getTextFromNode();
		this.dataArray = this.parsePathData(pathElement);
	}

	getText() {
		return this.text;
	}

	path(ctx: RenderingContext2D) {

		const {
			dataArray
		} = this;

		if (ctx) {
			ctx.beginPath();
		}

		dataArray.forEach(({
			command,
			points
		}) => {

			switch (command) {

				case 'L':

					if (ctx) {
						ctx.lineTo(points[0], points[1]);
					}

					break;

				case 'M':

					if (ctx) {
						ctx.moveTo(points[0], points[1]);
					}

					break;

				case 'C':

					if (ctx) {
						ctx.bezierCurveTo(
							points[0],
							points[1],
							points[2],
							points[3],
							points[4],
							points[5]
						);
					}

					break;

				case 'Q':

					if (ctx) {
						ctx.quadraticCurveTo(
							points[0],
							points[1],
							points[2],
							points[3]
						);
					}

					break;

				case 'A': {

					const cx = points[0];
					const cy = points[1];
					const rx = points[2];
					const ry = points[3];
					const theta = points[4];
					const dTheta = points[5];
					const psi = points[6];
					const fs = points[7];
					const r = (rx > ry) ? rx : ry;
					const scaleX = (rx > ry) ? 1 : rx / ry;
					const scaleY = (rx > ry) ? ry / rx : 1;

					if (ctx) {
						ctx.translate(cx, cy);
						ctx.rotate(psi);
						ctx.scale(scaleX, scaleY);
						ctx.arc(0, 0, r, theta, theta + dTheta, Boolean(1 - fs));
						ctx.scale(1 / scaleX, 1 / scaleY);
						ctx.rotate(-psi);
						ctx.translate(-cx, -cy);
					}
					break;
				}

				case 'z':

					if (ctx) {
						ctx.closePath();
					}

					break;

				default:
			}
		});
	}

	renderChildren(ctx: RenderingContext2D) {

		this.setTextData(ctx);
		ctx.save();

		const textDecoration = this.parent.getStyle('text-decoration').getString();
		const fontSize = this.getFontSize();
		const {
			glyphInfo
		} = this;
		const fill = ctx.fillStyle;

		if (textDecoration === 'underline') {
			ctx.beginPath();
		}

		glyphInfo.forEach((glyph, i) => {

			const {
				p0,
				p1,
				text: partialText
			} = glyph;

			ctx.save();
			ctx.translate(p0.x, p0.y);
			ctx.rotate(glyphInfo[i].rotation);

			if (ctx.fillStyle) {
				ctx.fillText(partialText, 0, 0);
			}

			if (ctx.strokeStyle) {
				ctx.strokeText(partialText, 0, 0);
			}

			ctx.restore();

			if (textDecoration === 'underline') {

				if (i === 0) {
					ctx.moveTo(p0.x, p0.y + fontSize / 8);
				}

				ctx.lineTo(p1.x, p1.y + fontSize / 5);
			}

			//// To assist with debugging visually, uncomment following
			//
			// ctx.beginPath();
			// if (i % 2)
			// 	ctx.strokeStyle = 'red';
			// else
			// 	ctx.strokeStyle = 'green';
			// ctx.moveTo(p0.x, p0.y);
			// ctx.lineTo(p1.x, p1.y);
			// ctx.stroke();
			// ctx.closePath();
		});

		if (textDecoration === 'underline') {
			ctx.lineWidth = fontSize / 20;
			ctx.strokeStyle = fill;
			ctx.stroke();
			ctx.closePath();
		}

		ctx.restore();
	}

	protected getLetterSpacingAt(idx = 0) {
		return this.letterSpacingCache[idx] || 0;
	}

	protected findSegmentToFitChar(
		ctx: RenderingContext2D,
		anchor: string,
		textFullWidth: number,
		fullPathWidth: number,
		spacesNumber: number,
		inputOffset: number,
		c: string,
		charI: number
	) {

		let offset = inputOffset;
		let glyphWidth = this.measureText(ctx, c);

		if (c === ' '
			&& anchor === 'justify'
			&& textFullWidth < fullPathWidth
		) {
			glyphWidth += (fullPathWidth - textFullWidth) / spacesNumber;
		}

		if (charI > -1) {
			offset += this.getLetterSpacingAt(charI);
		}

		const splineStep = this.textHeight / 20;
		const segment = {
			p0: this.getEquidistantPointOnPath(offset, splineStep),
			p1: this.getEquidistantPointOnPath(offset + glyphWidth, splineStep)
		};

		offset += glyphWidth;

		return {
			offset,
			segment
		};
	}

	protected measureText(
		ctx: RenderingContext2D,
		text?: string
	) {

		const {
			measuresCache
		} = this;
		const targetText = text || this.getText();

		if (measuresCache.has(targetText)) {
			return measuresCache.get(targetText);
		}

		const measure = this.measureTargetText(ctx, targetText);

		measuresCache.set(targetText, measure);

		return measure;
	}

	// This method supposes what all custom fonts already loaded.
	// If some font will be loaded after this method call, <textPath> will not be rendered correctly.
	// You need to call this method manually to update glyphs cache.
	protected setTextData(ctx: RenderingContext2D) {

		if (this.glyphInfo) {
			return;
		}

		const renderText = this.getText();
		const chars = renderText.split('');
		const spacesNumber = renderText.split(' ').length - 1;
		const dx = toNumbers(this.parent.getAttribute('dx').getString('0'));
		const anchor = this.parent.getStyle('text-anchor').getString('start');
		const thisSpacing = this.getStyle('letter-spacing');
		const parentSpacing = this.parent.getStyle('letter-spacing');
		let letterSpacing = 0;

		if (!thisSpacing.hasValue()
			|| thisSpacing.getValue() === 'inherit'
		) {
			letterSpacing = parentSpacing.getPixels();
		} else
		if (thisSpacing.hasValue()) {

			if (thisSpacing.getValue() !== 'initial'
				&& thisSpacing.getValue() !== 'unset'
			) {
				letterSpacing = thisSpacing.getPixels();
			}
		}

		// fill letter-spacing cache
		const letterSpacingCache: number[] = [];
		const textLen = renderText.length;

		this.letterSpacingCache = letterSpacingCache;

		for (let i = 0; i < textLen; i++) {
			letterSpacingCache.push(
				typeof dx[i] !== 'undefined'
					? dx[i]
					: letterSpacing
			);
		}

		const dxSum = letterSpacingCache.reduce((acc, cur) => acc + cur || 0, 0);

		this.textWidth = this.measureText(ctx);
		this.textHeight = this.getFontSize();

		const textFullWidth = Math.max(this.textWidth + dxSum, 0);

		this.glyphInfo = [];

		const fullPathWidth = this.getPathLength();
		const startOffset = this.getStyle('startOffset').getNumber(0) * fullPathWidth;
		let offset = 0;

		if (anchor === 'middle'
			|| anchor === 'center'
		) {
			offset = -textFullWidth / 2;
		}

		if (anchor === 'end'
			|| anchor === 'right'
		) {
			offset = -textFullWidth;
		}

		offset += startOffset;

		chars.forEach((char, i) => {

			// Find such segment what distance between p0 and p1 is approx. width of glyph
			const {
				offset: nextOffset,
				segment
			} = this.findSegmentToFitChar(
				ctx,
				anchor,
				textFullWidth,
				fullPathWidth,
				spacesNumber,
				offset,
				char,
				i
			);

			offset = nextOffset;

			if (!segment.p0 || !segment.p1) {
				return;
			}

			const width = this.getLineLength(
				segment.p0.x,
				segment.p0.y,
				segment.p1.x,
				segment.p1.y
			);
			// Note: Since glyphs are rendered one at a time, any kerning pair data built into the font will not be used.
			// Can foresee having a rough pair table built in that the developer can override as needed.
			// Or use "dx" attribute of the <text> node as a naive replacement
			const kern = 0;
			// placeholder for future implementation
			const midpoint = this.getPointOnLine(
				kern + width / 2.0,
				segment.p0.x, segment.p0.y, segment.p1.x, segment.p1.y);
			const rotation = Math.atan2(
				(segment.p1.y - segment.p0.y),
				(segment.p1.x - segment.p0.x)
			);

			this.glyphInfo.push({
				transposeX: midpoint.x,
				transposeY: midpoint.y,
				text:      chars[i],
				p0:        segment.p0,
				p1:        segment.p1,
				rotation
			});
		});
	}

	protected parsePathData(path: PathElement) {

		this.pathLength = -1; // reset path length

		if (!path) {
			return [];
		}

		const pathCommands: IPathCommand[] = [];
		const pathParser = path.pathParser;

		pathParser.reset();

		// convert l, H, h, V, and v to L
		while (!pathParser.isEnd()) {

			const {
				current
			} = pathParser;
			const startX = current ? current.x : 0;
			const startY = current ? current.y : 0;
			let cmd = '';
			let points = [];

			pathParser.nextCommand();

			const upperCommand = pathParser.command.toUpperCase();

			switch (pathParser.command) {

				case 'M':
				case 'm':
					cmd = this.pathM(pathParser, points);
					break;

				case 'L':
				case 'l':
					cmd = this.pathL(pathParser, points);
					break;

				case 'H':
				case 'h':
					cmd = this.pathH(pathParser, points);
					break;

				case 'V':
				case 'v':
					cmd = this.pathV(pathParser, points);
					break;

				case 'C':
				case 'c':
					this.pathC(pathParser, points);
					break;

				case 'S':
				case 's':
					cmd = this.pathS(pathParser, points);
					break;

				case 'Q':
				case 'q':
					this.pathQ(pathParser, points);
					break;

				case 'T':
				case 't':
					cmd = this.pathT(pathParser, points);
					break;

				case 'A':
				case 'a':
					points = this.pathA(pathParser);
					break;

				case 'Z':
				case 'z':
					pathParser.current = pathParser.start;
					break;

				default:
			}

			if (upperCommand !== 'Z') {
				pathCommands.push({
					command: cmd || upperCommand,
					points,
					start: {
						x: startX,
						y: startY
					},
					pathLength: this.calcLength(startX, startY, cmd || upperCommand, points)
				});
			} else {
				pathCommands.push({
					command: 'z',
					points: [],
					pathLength: 0
				});
			}
		}

		return pathCommands;
	}

	protected pathM(
		pathParser: PathParser,
		points: number[]
	) {

		const p = pathParser.getAsCurrentPoint();
		// pathParser.addMarker(p);
		points.push(p.x, p.y);

		pathParser.start = pathParser.current;

		while (!pathParser.isCommandOrEnd()) {

			const p = pathParser.getAsCurrentPoint();

			points.push(p.x, p.y);

			return 'L';
		}
	}

	protected pathL(
		pathParser: PathParser,
		points: number[]
	) {

		while (!pathParser.isCommandOrEnd()) {

			const p = pathParser.getAsCurrentPoint();

			points.push(p.x, p.y);
		}

		return 'L';
	}

	protected pathH(
		pathParser: PathParser,
		points: number[]
	) {

		while (!pathParser.isCommandOrEnd()) {

			const {
				current
			} = pathParser;
			const point = new Point(
				(pathParser.isRelativeCommand()
					? current.x
					: 0
				) + pathParser.getScalar(),
				current.y
			);

			points.push(point.x, point.y);
			pathParser.current = point;
		}

		return 'L';
	}

	protected pathV(
		pathParser: PathParser,
		points: number[]
	) {

		while (!pathParser.isCommandOrEnd()) {

			const {
				current
			} = pathParser;
			const point = new Point(
				current.x,
				(pathParser.isRelativeCommand()
					? current.y
					: 0
				) + pathParser.getScalar()
			);

			points.push(point.x, point.y);
			pathParser.current = point;
		}

		return 'L';
	}

	protected pathC(
		pathParser: PathParser,
		points: number[]
	) {

		while (!pathParser.isCommandOrEnd()) {

			const point = pathParser.getPoint();
			const controlPoint = pathParser.getAsControlPoint();
			const currentPoint = pathParser.getAsCurrentPoint();

			points.push(
				point.x,
				point.y,
				controlPoint.x,
				controlPoint.y,
				currentPoint.x,
				currentPoint.y
			);
		}
	}

	protected pathS(
		pathParser: PathParser,
		points: number[]
	) {

		while (!pathParser.isCommandOrEnd()) {

			const point = pathParser.getReflectedControlPoint();
			const controlPoint = pathParser.getAsControlPoint();
			const currentPoint = pathParser.getAsCurrentPoint();

			points.push(
				point.x,
				point.y,
				controlPoint.x,
				controlPoint.y,
				currentPoint.x,
				currentPoint.y
			);
		}

		return 'C';
	}

	protected pathQ(
		pathParser: PathParser,
		points: number[]
	) {

		while (!pathParser.isCommandOrEnd()) {

			const controlPoint = pathParser.getAsControlPoint();
			const currentPoint = pathParser.getAsCurrentPoint();

			points.push(
				controlPoint.x,
				controlPoint.y,
				currentPoint.x,
				currentPoint.y
			);
		}
	}

	protected pathT(
		pathParser: PathParser,
		points: number[]
	) {

		while (!pathParser.isCommandOrEnd()) {

			const controlPoint = pathParser.getReflectedControlPoint();

			pathParser.control = controlPoint;

			const currentPoint = pathParser.getAsCurrentPoint();

			points.push(
				controlPoint.x,
				controlPoint.y,
				currentPoint.x,
				currentPoint.y
			);
		}

		return 'Q';
	}

	protected pathA(
		pathParser: PathParser
	) {

		while (!pathParser.isCommandOrEnd()) {

			const {
				current
			} = pathParser; // x1, y1
			let rx = pathParser.getScalar();
			let ry = pathParser.getScalar();
			const xAxisRotation = pathParser.getScalar() * (Math.PI / 180.0); // φ
			const largeArcFlag = pathParser.getScalar(); //  fA
			const sweepFlag = pathParser.getScalar(); //  fS
			const currentPoint = pathParser.getAsCurrentPoint(); // x2, y2
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
			const l = (
				Math.pow(currp.x, 2) / Math.pow(rx, 2)
				+ Math.pow(currp.y, 2) / Math.pow(ry, 2)
			);

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
			const a1 = vectorsAngle([1, 0], [(currp.x - cpp.x) / rx, (currp.y - cpp.y) / ry]); // θ1
			// angle delta
			const u = [(currp.x - cpp.x) / rx, (currp.y - cpp.y) / ry];
			const v = [(-currp.x - cpp.x) / rx, (-currp.y - cpp.y) / ry];
			let ad = vectorsAngle(u, v); // Δθ

			if (vectorsRatio(u, v) <= -1) {
				ad = Math.PI;
			}

			if (vectorsRatio(u, v) >= 1) {
				ad = 0;
			}

			if (sweepFlag === 0 && ad > 0) {
				ad = ad - 2 * Math.PI;
			}

			if (sweepFlag === 1 && ad < 0) {
				ad = ad + 2 * Math.PI;
			}

			return [
				centp.x,
				centp.y,
				rx,
				ry,
				a1,
				ad,
				xAxisRotation,
				sweepFlag
			];
		}
	}

	protected calcLength(
		x: number,
		y: number,
		cmd: string,
		points: number[]
	) {

		let len = 0;
		let p1: IPoint = null;
		let p2: IPoint = null;
		let t = 0;

		switch (cmd) {

			case 'L':
				return this.getLineLength(x, y, points[0], points[1]);

			case 'C':
				// Approximates by breaking curve into 100 line segments
				len = 0.0;
				p1 = this.getPointOnCubicBezier(
					0,
					x,
					y,
					points[0],
					points[1],
					points[2],
					points[3],
					points[4],
					points[5]
				);

				for (t = 0.01; t <= 1; t += 0.01) {
					p2 = this.getPointOnCubicBezier(
						t,
						x,
						y,
						points[0],
						points[1],
						points[2],
						points[3],
						points[4],
						points[5]
					);
					len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
					p1 = p2;
				}

				return len;

			case 'Q':
				// Approximates by breaking curve into 100 line segments
				len = 0.0;
				p1 = this.getPointOnQuadraticBezier(
					0,
					x,
					y,
					points[0],
					points[1],
					points[2],
					points[3]
				);

				for (t = 0.01; t <= 1; t += 0.01) {
					p2 = this.getPointOnQuadraticBezier(
						t,
						x,
						y,
						points[0],
						points[1],
						points[2],
						points[3]
					);
					len += this.getLineLength(
						p1.x,
						p1.y,
						p2.x,
						p2.y
					);
					p1 = p2;
				}

				return len;

			case 'A':
				// Approximates by breaking curve into line segments
				len = 0.0;

				const start = points[4];
				// 4 = theta
				const dTheta = points[5];
				// 5 = dTheta
				const end = points[4] + dTheta;
				let inc = Math.PI / 180.0;
				// 1 degree resolution
				if (Math.abs(start - end) < inc) {
					inc = Math.abs(start - end);
				}
				// Note: for purpose of calculating arc length, not going to worry about rotating X-axis by angle psi
				p1 = this.getPointOnEllipticalArc(
					points[0],
					points[1],
					points[2],
					points[3],
					start,
					0
				);

				if (dTheta < 0) {// clockwise
					for (t = start - inc; t > end; t -= inc) {
						p2 = this.getPointOnEllipticalArc(
							points[0],
							points[1],
							points[2],
							points[3],
							t,
							0
						);
						len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
						p1 = p2;
					}
				} else {// counter-clockwise

					for (t = start + inc; t < end; t += inc) {
						p2 = this.getPointOnEllipticalArc(
							points[0],
							points[1],
							points[2],
							points[3],
							t,
							0
						);
						len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
						p1 = p2;
					}
				}

				p2 = this.getPointOnEllipticalArc(
					points[0],
					points[1],
					points[2],
					points[3],
					end,
					0
				);
				len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);

				return len;

			default:
		}

		return 0;
	}

	protected getPointOnLine(
		dist: number,
		P1x: number,
		P1y: number,
		P2x: number,
		P2y: number,
		fromX = P1x,
		fromY = P1y
	) {

		const m = (P2y - P1y) / ((P2x - P1x) + PSEUDO_ZERO);
		let run = Math.sqrt(dist * dist / (1 + m * m));

		if (P2x < P1x) {
			run *= -1;
		}

		let rise = m * run;
		let pt: IPoint = null;

		if (P2x === P1x) { // vertical line
			pt = {
				x: fromX,
				y: fromY + rise
			};
		} else
		if ((fromY - P1y) / ((fromX - P1x) + PSEUDO_ZERO) === m) {
			pt = {
				x: fromX + run,
				y: fromY + rise
			};
		} else {

			let ix = 0;
			let iy = 0;
			const len = this.getLineLength(P1x, P1y, P2x, P2y);

			if (len < PSEUDO_ZERO) {
				return null;
			}

			let u = (
				((fromX - P1x) * (P2x - P1x))
				+ ((fromY - P1y) * (P2y - P1y))
			);

			u = u / (len * len);
			ix = P1x + u * (P2x - P1x);
			iy = P1y + u * (P2y - P1y);

			const pRise = this.getLineLength(fromX, fromY, ix, iy);
			const pRun = Math.sqrt(dist * dist - pRise * pRise);

			run = Math.sqrt(pRun * pRun / (1 + m * m));

			if (P2x < P1x) {
				run *= -1;
			}

			rise = m * run;
			pt = {
				x: ix + run,
				y: iy + rise
			};
		}

		return pt;
	}

	protected getPointOnPath(distance: number) {

		const fullLen = this.getPathLength();
		let cumulativePathLength = 0;
		let p: IPoint = null;

		if (distance < -0.00005
			|| distance - 0.00005 > fullLen
		) {
			return null;
		}

		const {
			dataArray
		} = this;

		for (const pathCmd of dataArray) {

			if (pathCmd
				&& (
					pathCmd.pathLength < 0.00005
					|| cumulativePathLength + pathCmd.pathLength + 0.00005 < distance
				)
			) {
				cumulativePathLength += pathCmd.pathLength;
				continue;
			}

			const delta = distance - cumulativePathLength;
			let currentT = 0;

			switch (pathCmd.command) {

				case 'L':
					p = this.getPointOnLine(
						delta,
						pathCmd.start.x,
						pathCmd.start.y,
						pathCmd.points[0],
						pathCmd.points[1],
						pathCmd.start.x,
						pathCmd.start.y
					);
					break;

				case 'A':
					const start = pathCmd.points[4];
					// 4 = theta
					const dTheta = pathCmd.points[5];
					// 5 = dTheta
					const end = pathCmd.points[4] + dTheta;

					currentT = start + delta / pathCmd.pathLength * dTheta;

					if (dTheta < 0 && currentT < end
						|| dTheta >= 0 && currentT > end
					) {
						break;
					}

					p = this.getPointOnEllipticalArc(
						pathCmd.points[0],
						pathCmd.points[1],
						pathCmd.points[2],
						pathCmd.points[3],
						currentT,
						pathCmd.points[6]
					);
					break;

				case 'C':

					currentT = delta / pathCmd.pathLength;

					if (currentT > 1) {
						currentT = 1;
					}

					p = this.getPointOnCubicBezier(
						currentT,
						pathCmd.start.x,
						pathCmd.start.y,
						pathCmd.points[0],
						pathCmd.points[1],
						pathCmd.points[2],
						pathCmd.points[3],
						pathCmd.points[4],
						pathCmd.points[5]
					);
					break;

				case 'Q':

					currentT = delta / pathCmd.pathLength;

					if (currentT > 1) {
						currentT = 1;
					}

					p = this.getPointOnQuadraticBezier(
						currentT,
						pathCmd.start.x,
						pathCmd.start.y,
						pathCmd.points[0],
						pathCmd.points[1],
						pathCmd.points[2],
						pathCmd.points[3]
					);
					break;

				default:
			}

			if (p) {
				return p;
			}

			break;
		}

		return null;
	}

	protected getLineLength(
		x1: number,
		y1: number,
		x2: number,
		y2: number
	) {
		return Math.sqrt(
			(x2 - x1) * (x2 - x1)
			+ (y2 - y1) * (y2 - y1)
		);
	}

	protected getPathLength() {

		if (this.pathLength === -1) {
			this.pathLength = this.dataArray.reduce<number>(
				(length, command: IPathCommand) => (
					command.pathLength > 0
						? length + command.pathLength
						: length
				),
				0
			);
		}

		return this.pathLength;
	}

	protected getPointOnCubicBezier(
		pct: number,
		P1x: number,
		P1y: number,
		P2x: number,
		P2y: number,
		P3x: number,
		P3y: number,
		P4x: number,
		P4y: number
	): IPoint {

		const x = P4x * CB1(pct) + P3x * CB2(pct) + P2x * CB3(pct) + P1x * CB4(pct);
		const y = P4y * CB1(pct) + P3y * CB2(pct) + P2y * CB3(pct) + P1y * CB4(pct);

		return {
			x,
			y
		};
	}

	protected getPointOnQuadraticBezier(
		pct: number,
		P1x: number,
		P1y: number,
		P2x: number,
		P2y: number,
		P3x: number,
		P3y: number
	): IPoint {

		const x = P3x * QB1(pct) + P2x * QB2(pct) + P1x * QB3(pct);
		const y = P3y * QB1(pct) + P2y * QB2(pct) + P1y * QB3(pct);

		return {
			x,
			y
		};
	}

	protected getPointOnEllipticalArc(
		cx: number,
		cy: number,
		rx: number,
		ry: number,
		theta: number,
		psi: number
	): IPoint {

		const cosPsi = Math.cos(psi);
		const sinPsi = Math.sin(psi);
		const pt = {
			x: rx * Math.cos(theta),
			y: ry * Math.sin(theta)
		};

		return {
			x: cx + (pt.x * cosPsi - pt.y * sinPsi),
			y: cy + (pt.x * sinPsi + pt.y * cosPsi)
		};
	}

	// TODO need some optimisations. possibly build cache only for curved segments?
	protected buildEquidistantCache(
		inputStep: number,
		inputPrecision: number
	) {

		const fullLen = this.getPathLength();
		const precision = inputPrecision || 0.25; // accuracy vs performance
		const step = inputStep || fullLen / 100;

		if (!this.equidistantCache
			|| this.equidistantCache.step !== step
			|| this.equidistantCache.precision !== precision
		) {
			// Prepare cache
			this.equidistantCache = {
				step,
				precision,
				points: []
			};
			// Calculate points
			let s = 0;

			for (let l = 0; l <= fullLen; l += precision) {

				const p0 = this.getPointOnPath(l);
				const p1 = this.getPointOnPath(l + precision);

				if (!p0 || !p1) {
					continue;
				}

				s += this.getLineLength(p0.x, p0.y, p1.x, p1.y);

				if (s >= step) {
					this.equidistantCache.points.push({
						x: p0.x,
						y: p0.y,
						distance: l
					});
					s -= step;
				}
			}
		}
	}

	protected getEquidistantPointOnPath(
		targetDistance: number,
		step?: number,
		precision?: number
	) {

		this.buildEquidistantCache(step, precision);

		if (targetDistance < 0
			|| targetDistance - this.getPathLength() > 0.00005
		) {
			return null;
		}

		const idx = Math.round(
			targetDistance
			/ this.getPathLength()
			* (this.equidistantCache.points.length - 1)
		);

		return this.equidistantCache.points[idx] || null;
	}
}
