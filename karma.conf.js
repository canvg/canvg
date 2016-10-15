module.exports = function(config) {
	config.set({
		autoWatch: true,
		basePath: '',
		browsers: ['PhantomJS'],
		colors: true,
		concurrency: Infinity,
		files: [
			'canvg.js',
			'test/**/*.spec.js'
		],
		frameworks: ['jasmine'],
		logLevel: config.LOG_INFO,
		port: 9876,
		reporters: ['progress'],
		singleRun: false
	});
};
