const {rollup} = require('rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const extensions = ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'];

rollup({
  input: 'src/index.ts',
  plugins: [
    babel({
      extensions,
      exclude: '**/node_modules/**',
      runtimeHelpers: true,
    }),
    resolve({
      extensions,
      preferBuiltins: false,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
  ],
})
  .then(bundle => {
    bundle.write({
      format: 'umd',
      file: './lib/index.js',
      name: '@gemcook/pagination-ts',
    });
  })
  .catch(e => {
    console.error(e);
  });
