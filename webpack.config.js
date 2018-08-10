/* eslint-disable */
module.exports = function(env) {
  return require(`./config/webpack.config.${env && env.dev ? 'dev' : 'prod'}.js`);
};
