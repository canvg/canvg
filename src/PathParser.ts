import {
	compressSpaces
} from './util';
import Point from './Point';

function preparePath(path: string) {

	const d = path
		.replace(/,/gm, ' ') // get rid of all commas
		// As the end of a match can also be the start of the next match, we need to run this replace twice.
		.replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm, '$1 $2') // suffix commands with spaces
		.replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm, '$1 $2') // suffix commands with spaces
		.replace(/([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm, '$1 $2') // prefix commands with spaces
		.replace(/([0-9])([+\-])/gm, '$1 $2') // separate digits on +- signs
		// Again, we need to run this twice to find all occurances
		.replace(/(\.[0-9]*)(\.)/gm, '$1 $2') // separate digits when they start with a comma
		.replace(/(\.[0-9]*)(\.)/gm, '$1 $2') // separate digits when they start with a comma
		.replace(/([Aa](\s+[0-9]+){3})\s+([01])\s*([01])/gm, '$1 $3 $4 '); // shorthand elliptical arc path syntax

	return compressSpaces(d).trim();
}

export default class PathParser {

	control: Point = null;
	start: Point = null;
	current: Point = null;
	command = '';
	private readonly tokens: string[] = [];
	private i = -1;
	private previousCommand = '';
	private points: Point[] = [];
	private angles: number[] = [];

	constructor(path: string) {
		this.tokens = preparePath(path).split(' ');
	}

	reset() {
		this.i = -1;
		this.command = '';
		this.previousCommand = '';
		this.start = new Point(0, 0);
		this.control = new Point(0, 0);
		this.current = new Point(0, 0);
		this.points = [];
		this.angles = [];
	}

	isEnd() {

		const {
			i,
			tokens
		} = this;

		return i >= tokens.length - 1;
	}

	isCommandOrEnd() {

		if (this.isEnd()) {
			return true;
		}

		const {
			i,
			tokens
		} = this;

		return /^[A-Za-z]$/.test(tokens[i + 1]);
	}

	isRelativeCommand() {

		switch (this.command) {
			case 'm':
			case 'l':
			case 'h':
			case 'v':
			case 'c':
			case 's':
			case 'q':
			case 't':
			case 'a':
			case 'z':
				return true;

			default:
				return false;
		}
	}

	getToken() {
		this.i++;
		return this.tokens[this.i];
	}

	getScalar() {
		return parseFloat(this.getToken());
	}

	nextCommand() {
		this.previousCommand = this.command;
		this.command = this.getToken();
	}

	getPoint() {

		const point = new Point(
			this.getScalar(),
			this.getScalar()
		);

		return this.makeAbsolute(point);
	}

	getAsControlPoint() {

		const point = this.getPoint();

		this.control = point;

		return point;
	}

	getAsCurrentPoint() {

		const point = this.getPoint();

		this.current = point;

		return point;
	}

	getReflectedControlPoint() {

		const previousCommand = this.previousCommand.toLowerCase();

		if (previousCommand !== 'c'
			&& previousCommand !== 's'
			&& previousCommand !== 'q'
			&& previousCommand !== 't'
		) {
			return this.current;
		}

		// reflect point
		const {
			current: {
				x: cx,
				y: cy
			},
			control: {
				x: ox,
				y: oy
			}
		} = this;
		const point = new Point(2 * cx - ox, 2 * cy - oy);

		return point;
	}

	makeAbsolute(point: Point) {

		if (this.isRelativeCommand()) {

			const {
				x,
				y
			} = this.current;

			point.x += x;
			point.y += y;
		}

		return point;
	}

	addMarker(point: Point, from?: Point, priorTo?: Point) {

		const {
			points,
			angles
		} = this;
		// if the last angle isn't filled in because we didn't have this point yet ...
		if (priorTo && angles.length > 0 && !angles[angles.length - 1]) {
			angles[angles.length - 1] = points[points.length - 1].angleTo(priorTo);
		}

		this.addMarkerAngle(point, from ? from.angleTo(point) : null);
	}

	addMarkerAngle(point: Point, angle: number) {
		this.points.push(point);
		this.angles.push(angle);
	}

	getMarkerPoints() {
		return this.points;
	}

	getMarkerAngles() {

		const {
			angles
		} = this;
		const len = angles.length;

		for (let i = 0; i < len; i++) {

			if (!angles[i]) {

				for (let j = i + 1; j < len; j++) {

					if (angles[j]) {
						angles[i] = angles[j];
						break;
					}
				}
			}
		}

		return angles;
	}
}
