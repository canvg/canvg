import {
	RenderingContext2D
} from '../types';
import Transform from '../Transform';
import Element from './Element';
import UseElement from './UseElement';

const noop = () => {};

export default class ClipPathElement extends Element {

	type = 'clipPath';

	apply(ctx: RenderingContext2D) {

		const {
			document
		} = this;
		const contextProto = Reflect.getPrototypeOf(ctx) as RenderingContext2D;
		const {
			beginPath,
			closePath
		} = ctx;

		if (contextProto) {
			contextProto.beginPath = noop;
			contextProto.closePath = noop;
		}

		Reflect.apply(beginPath, ctx, []);

		this.children.forEach((child: UseElement) => {

			if (typeof child.path === 'undefined') {
				return;
			}

			let transform = typeof child.elementTransform !== 'undefined'
				? child.elementTransform()
				: null; // handle <use />

			if (!transform) {
				transform = Transform.fromElement(document, child);
			}

			if (transform) {
				transform.apply(ctx);
			}

			child.path(ctx);

			if (contextProto) {
				contextProto.closePath = closePath;
			}

			if (transform) {
				transform.unapply(ctx);
			}
		});

		Reflect.apply(closePath, ctx, []);
		ctx.clip();

		if (contextProto) {
			contextProto.beginPath = beginPath;
			contextProto.closePath = closePath;
		}
	}

	render(_: RenderingContext2D) {
		// NO RENDER
	}
}
