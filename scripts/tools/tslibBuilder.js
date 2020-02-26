const rollup = require('rollup');
const typescript = require('rollup-plugin-typescript');
const { camelCase } = require('change-case');
const path = require('path');
const {
    readJSON,
    writeJSON,
    exec,
    unlink
} = require('./utils');

const cwd = process.cwd();

class TypeScriptLibBuilder {

    async build({ input, output }) {
        try {
            await exec('rm -fr dist lib');
            if (output.formats.includes('cjs')) {
                await this._tsc();
            }
            await this._rollup(input, output.formats.filter((format) => format !== 'cjs'));
        } catch (err) {
            console.error(err);
        }
    }

    async _tsc() {
        const tscPath = path.resolve(cwd, 'node_modules/typescript/bin/tsc');
        const tsConfigPath = path.resolve(cwd, 'tsconfig.json');
        const tmpTsConfigPath = path.resolve(cwd, './.tmp.tsconfig.json');

        const tsconfig = await readJSON(tsConfigPath);
        tsconfig.exclude = ['src/**/__tests__/**'];
        await writeJSON(tmpTsConfigPath, tsconfig);

        await exec(`${tscPath} --project ${tmpTsConfigPath}`);
        await unlink(tmpTsConfigPath);
    }

    async _rollup(input, formats) {
        const bundle = await rollup.rollup({
            input,
            plugins: [
                typescript() // so Rollup can convert TypeScript to JavaScript
            ]
        });
        await Promise.all(
            formats
                .map(format => this._getOutputOption(format))
                .map(option => bundle.write(option))
        );
    }

    _getOutputOption(format) {
        const pkg = require(path.resolve(cwd, 'package.json'));
        return new Map([
            ['es', { file: pkg.module, format: 'es' }],
            ['umd', { file: pkg.browser, name: camelCase(pkg.name), format: 'umd' }]
        ]).get(format);
    }
}

const tslibBuilder = new TypeScriptLibBuilder();

module.exports = tslibBuilder;