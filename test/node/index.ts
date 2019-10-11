import path from 'path';
import {
	promises as fs,
	createReadStream
} from 'fs';
import {
	DOMParser
} from 'xmldom';
import {
	createCanvas,
	loadImage
} from 'canvas';
import fetch, {
	Response
} from 'node-fetch';
import Canvg, {
	IOptions
} from '../../src';

const options: IOptions = {
	DOMParser,
	fetch(input) {

		if (typeof input === 'string' && !/^http/.test(input)) {

			const stream = createReadStream(
				path.join(__dirname, '..', 'svgs', input)
			);
			const response = new Response(stream);

			return Promise.resolve(response);
		}

		return fetch(input);
	},
	createCanvas:    createCanvas as any,
	createImage:     loadImage as any,
	ignoreAnimation: true,
	ignoreMouse:     true
};

export default async function render(file: string) {

	const svg = await fs.readFile(
		path.join(__dirname, '..', 'svgs', file),
		'utf8'
	);
	const c = createCanvas(1280, 720);
	const ctx = c.getContext('2d');
	const v = Canvg.fromString(ctx, svg, options);

	await v.render();

	return c.toBuffer();
}

const maybeRunIndex = process.argv.indexOf(__filename);

if (~maybeRunIndex && maybeRunIndex === process.argv.length - 3) {
	(async () => {

		const output = process.argv.pop();
		const input = process.argv.pop();
		const image = await render(input);

		await fs.writeFile(output, image);
	})();
}
