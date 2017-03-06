// webpack.config.dev.js
// ==========================================
import _ from 'lodash';
import webpack from 'webpack';
import * as config from './webpack.config.js';

// import SplitByNamePlugin from 'split-by-name-webpack-plugin';

let output = _.clone(config.output, true);

output.filename = '[name].bundle.js';
output.chunkFilename = '[name].chunk.js';
output.publicPath = '../../.build/js/';

// loaders
let loaders = _.clone(config.loaders);
let addLoader = [

];
loaders = loaders.concat(addLoader);


// plugins
let plugins = _.clone(config.plugins);
let addPlugins = [
];

export default {
  devtool: 'cheap-module-source-map',
  entry: config.entry,
  output: output,
  resolve: config.resolve,
  plugins: config.plugins,
  watch: true, // 监听
  progress: true,
  colors: true,
  module: {
    loaders: loaders
  }
};
