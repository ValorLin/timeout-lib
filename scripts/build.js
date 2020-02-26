const tslibBuilder = require('./tools/tslibBuilder');

tslibBuilder.build({
	input: 'src/index.ts',
	output: {
		formats: ['es', 'umd', 'cjs']
	}
});