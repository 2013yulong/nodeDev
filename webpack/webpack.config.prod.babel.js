// webpack.config.prod.js
// ==========================================
import _ from 'lodash';
import webpack from 'webpack';
import * as config from './webpack.config.js';

let plugins = _.clone(config.plugins);
let addPlugins = [
  // 优化
  new webpack.optimize.DedupePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.CommonsChunkPlugin('common', 'common.bundle.min.js')
];

plugins = plugins.concat(addPlugins);

let loaders = _.clone(config.loaders);
let addLoader = [

];

loaders = loaders.concat(addLoader);

export default {
  devtool: 'cheap-module-source-map',
  entry: config.entry,
  output: config.output,
  module: {
    loaders: loaders
  },
  resolve: config.resolve,
  plugins: plugins
};
