/* eslint-disable */

// Configuration file for all things Slate.
// For more information, visit https://github.com/Shopify/slate/wiki/Slate-Configuration

const path = require('path');
const envCi = require('env-ci');

const config = {
  'cssVarLoader.liquidPath': ['src/snippets/css-variables.liquid'],
  'webpack.extend': {
    resolve: {
      alias: {
        jquery: path.resolve('./node_modules/jquery'),
        'lodash-es': path.resolve('./node_modules/lodash-es'),
      },
    },
  },
  'ssl.cert': path.resolve('./localhost.crt'),
  'ssl.key': path.resolve('./localhost.key')
};

const {isCi} = envCi();

if (isCi) {
  config['paths.slateRc'] = path.resolve('./.circleci/.slaterc');
  config['cli.promptSettings'] = false;
}

module.exports = config;