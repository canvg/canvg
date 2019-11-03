/* eslint-env browser */
/* eslint-disable no-magic-numbers, import/unambiguous, no-console */
/* global canvg, canvgv2 */

const {
	Canvg,
	Document,
	Parser,
	presets
} = canvg;
let DEFAULT_WIDTH = 500;
let DEFAULT_HEIGHT = 500;
const search = new URLSearchParams(location.search);
const gallery = document.querySelector('#gallery');
const custom = document.querySelector('#custom');
const options = document.querySelector('#options');
const canvasOutput = document.querySelector('#canvas');
const svgOutput = document.querySelector('#svg');
let currentSvg = '';
let overrideTextBox = false;

main();

function main() {

	if (search.has('no-ui')) {
		document.body.classList.add('no-ui');
		DEFAULT_WIDTH = 1280;
		DEFAULT_HEIGHT = 720;
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

	gallery.addEventListener('change', onGalleryChange);
	custom.addEventListener('submit', onCustomRenderSubmit);
	options.addEventListener('change', onOptionChange);
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

function onOptionChange() {

	if (currentSvg) {
		overrideTextBox = true;
		render(currentSvg);
	}
}

async function render(svg, width, height) {

	currentSvg = svg;

	if (options.render.value === 'offscreen') {
		offscreenRender(svg, width, height);
		return;
	}

	if (options.render.value === 'v2') {
		v2Render(svg, width, height);
		return;
	}

	const c = Document.createCanvas(
		width || DEFAULT_WIDTH,
		height || DEFAULT_HEIGHT
	);
	const ctx = c.getContext('2d');
	const v = await Canvg.from(ctx, svg);

	if (custom.resize.checked) {
		v.resize(width, height, custom.preserveAspectRatio.value);
	}

	canvasOutput.innerHTML = '';
	canvasOutput.appendChild(c);

	if (options.redraw.checked) {
		await v.start();
	} else {
		await v.render();
	}

	renderSource(svg, width, height);
}

async function offscreenRender(svg, width, height) {

	const c = new OffscreenCanvas(
		width || DEFAULT_WIDTH,
		height || DEFAULT_HEIGHT
	);
	const ctx = c.getContext('2d');
	const v = await Canvg.from(ctx, svg, presets.offscreen());

	if (custom.resize.checked) {
		v.resize(width, height, custom.preserveAspectRatio.value);
	}

	await v.render();

	const blob = await c.convertToBlob();

	canvasOutput.innerHTML = `<img src="${URL.createObjectURL(blob)}">`;

	renderSource(svg);
}

function v2Render(svg, width, height) {

	const freeze = !options.redraw.checked;
	const c = Document.createCanvas(
		width || DEFAULT_WIDTH,
		height || DEFAULT_HEIGHT
	);

	canvasOutput.innerHTML = '';
	canvasOutput.appendChild(c);

	canvgv2(c, svg, {
		ignoreAnimation: freeze,
		ignoreMouse:     freeze,
		renderCallback() {
			renderSource(svg);
		}
	});
}

async function renderSource(svg, width, height) {

	if (search.has('no-svg')) {
		svgOutput.innerHTML = '<svg>';
		return;
	}

	let svgText = svg;

	if (!/^</.test(svg)) {

		const response = await fetch(svg);

		svgText = await response.text();
	}

	try {
		svgOutput.innerHTML = svgText;
	}
	catch {
		svgOutput.innerHTML = '<svg>';
		return;
	}

	if (custom.resize.checked) {
		const svgElement = svgOutput.childNodes[0];
		svgElement.style.width = width;
		svgElement.style.height = height;
	}

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
