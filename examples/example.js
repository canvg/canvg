/* eslint-env browser */
/* eslint-disable import/unambiguous, no-console */
/* global canvg, canvgv2 */

const {
	Canvg,
	Document,
	Parser
} = canvg;
const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 500;
const gallery = document.querySelector('#gallery');
const custom = document.querySelector('#custom');
const options = document.querySelector('#options');
const canvasOutput = document.querySelector('#canvas');
const svgOutput = document.querySelector('#svg');
let overrideTextBox = false;

main();

function main() {

	const search = new URLSearchParams(location.search);

	if (search.has('light')) {
		document.body.classList.add('light');
	}

	if (search.has('redraw')) {
		options.redraw.checked = JSON.parse(search.get('redraw'));
	}

	if (search.has('render')) {
		options.render.value = search.get('render');
	}

	if (search.has('url')) {
		overrideTextBox = true;
		render(search.get('url'));
	}

	if (search.has('svg')) {
		overrideTextBox = true;
		render(search.get('svg'));
	}

	gallery.examples.addEventListener('change', onGalleryChange);
	gallery.issues.addEventListener('change', onGalleryChange);
	custom.addEventListener('submit', onCustomRenderSubmit);
}

function onGalleryChange(event) {

	const {
		value
	} = event.target;

	if (value) {
		overrideTextBox = true;
		render(`../svgs/${value}`);
	}
}

function onCustomRenderSubmit(event) {

	event.preventDefault();

	render(
		custom.svg.value,
		parseInt(custom.width.value, 10),
		parseInt(custom.height.value, 10)
	);
}

async function render(svg, width, height) {

	if (options.render.value === 'offscreen') {
		offscreenRender(svg, width, height);
		return;
	}

	if (options.render.value === 'v2') {
		v2Render(svg, width, height);
		return;
	}

	const c = Document.defaultCreateCanvas(
		width || DEFAULT_WIDTH,
		height || DEFAULT_HEIGHT
	);
	const ctx = c.getContext('2d');
	const v = await Canvg.from(ctx, svg);

	canvasOutput.innerHTML = '';
	canvasOutput.appendChild(c);

	if (options.redraw.checked) {
		await v.start({
			enableRedraw: true
		});
	} else {
		await v.render();
	}

	renderSource(svg);
}

async function offscreenRender(svg, width, height) {

	const c = new OffscreenCanvas(
		width || DEFAULT_WIDTH,
		height || DEFAULT_HEIGHT
	);
	const ctx = c.getContext('2d');
	const v = await Canvg.from(ctx, svg, {
		createCanvas(width, height) {
			return new OffscreenCanvas(width, height);
		},
		async createImage(url) {

			const response = await fetch(url);
			const blob = await response.blob();
			const img = await createImageBitmap(blob);

			return img;
		}
	});

	await v.render();

	const blob = await c.convertToBlob({
		type: 'image/png'
	});

	canvasOutput.innerHTML = `<img src="${URL.createObjectURL(blob)}">`;

	renderSource(svg);
}

function v2Render(svg, width, height) {

	const c = Document.defaultCreateCanvas(
		width || DEFAULT_WIDTH,
		height || DEFAULT_HEIGHT
	);

	canvasOutput.innerHTML = '';
	canvasOutput.appendChild(c);

	canvgv2(c, svg, {
		renderCallback() {
			renderSource(svg);
		}
	});
}

async function renderSource(svg) {

	let svgText = svg;

	if (!/^</.test(svg)) {

		const response = await fetch(svg);

		svgText = await response.text();
	}

	const parser = new Parser();
	const document = parser.parseFromString(svgText);

	svgOutput.innerHTML = '';
	svgOutput.append(document.documentElement);

	if (overrideTextBox) {
		custom.svg.value = svgOutput.innerHTML;
		overrideTextBox = false;
	}
}

// eslint-disable-next-line
function contextLogger(ctx) {
	return new Proxy(ctx, {

		get(target, key) {

			const value = target[key];

			if (typeof value === 'function') {
				return (...args) => {

					const result = Reflect.apply(value, target, args);

					console.log('Call:', key, '()', args, '=>', result);

					return result;
				};
			}

			console.log('Get:', key, ':', value);

			return value;
		},

		set(target, key, value) {

			console.log('Set:', key, ':', value);

			target[key] = value;

			return true;
		}
	});
}
