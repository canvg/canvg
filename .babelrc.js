const productionPresets = [
	'babel-preset-trigen/lib'
];
const testPresets = [
	[
		'babel-preset-trigen/jest',
		{
			typescript: true
		}
	]
];

module.exports = (api) => {

	const isProd = !api.env('test');

	return {
		exclude: 'node_modules/**',
		presets: isProd ? productionPresets : testPresets
	};
};
