
declare module 'rgbcolor' {

	export default class RGBColor {

		r: number;
		g: number;
		b: number;
		a: number;
		ok: boolean;

		constructor(color: string);
	}
}
