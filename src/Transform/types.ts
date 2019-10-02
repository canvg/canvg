import Point from '../Point';

export interface ITransform {
	type: string;
	apply(ctx: CanvasRenderingContext2D): void;
	unapply(ctx: CanvasRenderingContext2D): void;
	applyToPoint(point: Point): void;
}
