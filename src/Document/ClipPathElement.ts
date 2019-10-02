import Transform from '../Transform';
import Element from './Element';
import UseElement from './UseElement';

const noop = () => {};

export default class ClipPathElement extends Element {

	type = 'clipPath';

	apply(ctx: CanvasRenderingContext2D) {

		const {
			document
		} = this;
		const contextProto = typeof CanvasRenderingContext2D !== 'undefined'
			? CanvasRenderingContext2D.prototype
			: null;
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
			const transformAttr = child.getStyle('transform', false, true);

			if (!transform && transformAttr.hasValue()) {
				transform = new Transform(document, transformAttr.getString());
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

	render(_: CanvasRenderingContext2D) {
		// NO RENDER
	}
}
