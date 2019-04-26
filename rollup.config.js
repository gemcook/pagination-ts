const fs = require('fs-extra');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const extensions = ['.mjs', '.js', '.json', '.ts'];
const babelOptions = {
  extensions,
  exclude: '**/node_modules/**',
  runtimeHelpers: true,
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {node: 'current'},
        corejs: 3,
        useBuiltIns: 'usage',
        loose: true,
        modules: false,
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
        regenerator: false,
        useESModules: false,
      },
    ],
    ['@babel/proposal-class-properties', {loose: true}],
    ['@babel/plugin-proposal-private-methods', {loose: true}],
  ],
};

export default [
  {
    input: 'src/index.ts',
    external: [
      '@babel/runtime-corejs3/core-js-stable/parse-int',
      '@babel/runtime-corejs3/core-js-stable/instance/slice',
    ],
    output: {
      file: './lib/index.js',
      format: 'cjs',
    },
    plugins: [
      {
        name: 'rollup hooks',
        buildStart: () => {
          fs.emptyDirSync('./lib');
        },
        buildEnd: err => {
          if (err) {
            return;
          }
          fs.copySync('./src/@types', './lib/@types', {
            dereference: true,
          });
        },
      },
      babel(babelOptions),
      resolve({
        extensions,
      }),
      commonjs({
        include: 'node_modules/**',
      }),
    ],
  },
];
