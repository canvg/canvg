import './common/imageSnapshot';
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
} from '../src';
import {
	filterConsoleWarn,
	filterConsoleError
} from './common';
import svgs from './svgs.json';

const options: IOptions = {
	DOMParser,
	fetch(input) {

		if (typeof input === 'string' && !/^http/.test(input)) {

			const stream = createReadStream(
				path.join(__dirname, 'svgs', input)
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

async function render(file: string) {

	const svg = await fs.readFile(
		path.join(__dirname, 'svgs', file),
		'utf8'
	);
	const c = createCanvas(800, 600);
	const ctx = c.getContext('2d');
	const v = Canvg.fromString(ctx, svg, options);

	await v.render();

	return c.toBuffer();
}

describe('canvg', () => {

	describe('node', () => {

		let restoreWarn: () => void = null;
		let restoreError: () => void = null;

		beforeAll(() => {
			restoreWarn = filterConsoleWarn();
			restoreError = filterConsoleError();
		});

		afterAll(() => {
			restoreWarn();
			restoreError();
		});

		for (const type in svgs) {

			const svgsOfType = svgs[type];

			for (const svg in svgsOfType) {

				const description = svgsOfType[svg];

				it(`should render ${description}`, async () => {
					expect(
						await render(svg)
					).toMatchImageSnapshot();
				});
			}
		}
	});
});
