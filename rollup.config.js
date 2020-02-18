import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

export default [
	{
		input: 'src/index.ts',
		plugins: [
			typescript() // so Rollup can convert TypeScript to JavaScript
		],
		output: [
			{ file: pkg.module, format: 'es' },
			{
				name: 'timeoutLib',
				file: pkg.browser,
				format: 'umd'
			}
		]
	}
];
