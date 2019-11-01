/**
 * Options preset for `OffscreenCanvas`.
 */
export function offscreen() {
	return {
		window:          null as null,
		ignoreAnimation: true,
		ignoreMouse:     true,
		createCanvas(width: number, height: number) {
			return new OffscreenCanvas(width, height);
		},
		async createImage(url: string) {

			const response = await fetch(url);
			const blob = await response.blob();
			const img = await createImageBitmap(blob);

			return img;
		}
	};
}
