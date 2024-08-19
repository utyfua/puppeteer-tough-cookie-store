
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';

import pkg from './package.json' with { type: 'json' };

const banner = `
/*!
 * ${pkg.name} v${pkg.version} by ${pkg.author}
 * ${"homepage" in pkg ? pkg.homepage : `https://github.com/${pkg.repository}`}
 * @license ${pkg.license}
 */
`.trim()

const defaultExportOutro = `
  module.exports = exports.default || {}
  Object.entries(exports).forEach(([key, value]) => { module.exports[key] = value })
`

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
            outro: defaultExportOutro,
            banner
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true,
            exports: 'named',
            banner
        }
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
    ],
    plugins: [
        nodeResolve(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'runtime'
        }),
        commonjs(),
        // Compile TypeScript files
        typescript(),
    ],
};
