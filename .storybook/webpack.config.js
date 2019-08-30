const webpackDev = require('@shopify/slate-tools/tools/webpack/config/dev');
const webpackProd = require('@shopify/slate-tools/tools/webpack/config/prod');

const babelrc = {
  babelrc: false,
  presets: ['react-app'],
  plugins: []
}

function applyBabelrcIfAppropriate(rule) {
  const matchingLoader = rule.use && rule.use.find(({loader}) => loader === 'babel-loader');
  if (!matchingLoader) return;
  Object.assign(matchingLoader.options, babelrc);
}

function isCssRule(rule) {
  const matchingLoader = rule.use && rule.use.find(({loader}) => loader === 'css-loader');
  return Boolean(matchingLoader);
}

module.exports = async ({config, mode}) => {
  let newRules;
  if (mode === 'production') {
    newRules = webpackProd.module.rules.filter(isCssRule);
  } else {
    newRules = webpackDev.module.rules.filter(isCssRule);
  }
  config.module.rules = [
    ...config.module.rules,
    ...newRules
  ];
  config.module.rules.forEach((rule, index) => {
    applyBabelrcIfAppropriate(rule);
  });
  return config
}