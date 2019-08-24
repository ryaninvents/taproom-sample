const babelrc = {
  babelrc: false,
  presets: ['react-app'],
  plugins: []
}

module.exports = async ({config,mode}) => {
  config.module.rules.forEach((rule) => {
    const matchingLoader = rule.use && rule.use.find(({loader}) => loader === 'babel-loader')
    if (!matchingLoader) return;
    Object.assign(matchingLoader.options, babelrc);
  });
  return config
}