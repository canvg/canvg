
export const PSEUDO_ZERO = .00000001;

/**
 * Vector magnitude.
 */
export function vectorMagnitude(v: number[]) {
	return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
}

/**
 * Ratio between two vectors.
 */
export function vectorsRatio(u: number[], v: number[]) {
	return (u[0] * v[0] + u[1] * v[1]) / (vectorMagnitude(u) * vectorMagnitude(v));
}

/**
 * Angle between two vectors.
 */
export function vectorsAngle(u: number[], v: number[]) {
	return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vectorsRatio(u, v));
}

export function CB1(t: number) {
	return t * t * t;
}

export function CB2(t: number) {
	return 3 * t * t * (1 - t);
}

export function CB3(t: number) {
	return 3 * t * (1 - t) * (1 - t);
}

export function CB4(t: number) {
	return (1 - t) * (1 - t) * (1 - t);
}

export function QB1(t: number) {
	return t * t;
}

export function QB2(t: number) {
	return 2 * t * (1 - t);
}

export function QB3(t: number) {
	return (1 - t) * (1 - t);
}
