import tslint from 'rollup-plugin-tslint';
import commonjs from '@rollup/plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import {
	terser
} from 'rollup-plugin-terser';
import {
	DEFAULT_EXTENSIONS
} from '@babel/core';
import {
	external
} from './scripts/rollup-helpers';
import pkg from './package.json';

function getPlugins(standalone, transpile = true) {
	return [
		tslint({
			exclude:    ['**/*.json', 'node_modules/**'],
			throwError: true
		}),
		commonjs(),
		standalone && globals(),
		typescript(),
		replace({
			'process.env.NODE_ENV': JSON.stringify(
				process.env.ROLLUP_WATCH
					? 'development'
					: 'production'
			)
		}),
		transpile && babel({
			extensions:         [
				...DEFAULT_EXTENSIONS,
				'ts',
				'tsx'
			],
			babelHelpers:       'runtime',
			// erring otherwise in attempt to find `@babel/plugin-transform-runtime`
			//   added by `babel-preset-trigen`; see
			//   https://github.com/rollup/plugins/issues/381
			skipPreflightCheck: true
		}),
		standalone && resolve({
			preferBuiltins: false
		}),
		!process.env.ROLLUP_WATCH && standalone && terser()
	].filter(Boolean);
}

export default [{
	input:    'src/index.ts',
	plugins:  getPlugins(),
	external: external(pkg, true),
	output:   [{
		file:      pkg.main,
		format:    'cjs',
		exports:   'named',
		sourcemap: 'inline'
	}, {
		file:      pkg.module,
		format:    'es',
		sourcemap: 'inline'
	}]
}, {
	input:    'src/index.ts',
	plugins:  getPlugins(false, false),
	external: external(pkg, true),
	output:   {
		file:      pkg.raw,
		format:    'es',
		sourcemap: 'inline'
	}
}, {
	input:   'src/index.ts',
	plugins: getPlugins(true),
	output:  {
		file:      pkg.umd,
		format:    'umd',
		exports:   'named',
		name:      'canvg',
		sourcemap: true
	}
}];
