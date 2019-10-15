
// tslint:disable-next-line: interface-over-type-literal
type DOMParser = {
	prototype: any;
	new (): any;
};

interface ICanvas {
	createCanvas(width: number, height: number): any;
	loadImage(src: string): Promise<any>;
}

interface IConfig {
	DOMParser: DOMParser;
	canvas: ICanvas;
	fetch: typeof fetch;
}

export function node({
	DOMParser,
	canvas,
	fetch
}: IConfig) {
	return {
		window:          null as null,
		ignoreAnimation: true,
		ignoreMouse:     true,
		DOMParser,
		fetch,
		createCanvas:    canvas.createCanvas,
		createImage:     canvas.loadImage
	};
}
