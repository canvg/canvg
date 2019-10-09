import './imageSnapshot';
import path from 'path';
import {
	promises as fs,
	createReadStream
} from 'fs';
// import {
// 	JSDOM
// } from 'jsdom';
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
import svgs from './svgs.json';

const options: IOptions = {
	DOMParser,
	fetch(input) {

		if (typeof input === 'string' && !/^http/.test(input)) {

			const stream = createReadStream(
				path.join(__dirname, input)
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
		path.join(__dirname, '..', 'svgs', file),
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

		let mockWarn: jest.SpyInstance = null;
		let mockError: jest.SpyInstance = null;

		beforeAll(() => {

			const {
				error,
				warn
			} = console;

			mockWarn = jest.spyOn(console, 'warn').mockImplementation((first, ...args) => {

				if (typeof first !== 'string'
					|| !/Element (metadata|script|([a-z]+:[a-z]+)) not yet implemented/i.test(first)
				) {
					warn(first, ...args);
				}
			});

			mockError = jest.spyOn(console, 'error').mockImplementation((first, ...args) => {

				if (typeof first !== 'string'
					|| !/entity not found/i.test(first)
				) {
					error(first, ...args);
				}
			});
		});

		afterAll(() => {
			mockWarn.mockRestore();
			mockError.mockRestore();
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
