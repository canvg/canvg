import {
	RenderingContext2D
} from '../types';
import PolylineElement from './PolylineElement';

export default class PolygonElement extends PolylineElement {
	type = 'polygon';

	path(ctx: RenderingContext2D) {
		const boundingBox = super.path(ctx);
		const [{
			x,
			y
		}] = this.points;

		if (ctx) {
			ctx.lineTo(x, y);
			ctx.closePath();
		}

		return boundingBox;
	}
}
