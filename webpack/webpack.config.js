// make.webpack.config.js
// ====================================

import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import banner from './banner.js';
import pkg from '../package.json';

// 路径
const ROOT = path.join(__dirname);
const PROJECT_ROOT = path.join(ROOT, '..');
const JS = path.join(PROJECT_ROOT, 'html/js/');
const MODULES = path.join(PROJECT_ROOT, 'html/modules/');
const HELPER = path.join(JS, 'helper/');
const COMPONENTS = path.join(JS, 'components/');
const LIB_ROOT = path.join(JS, 'libs/');

// 别名引用
const alias = {
  zepto: LIB_ROOT + '/zepto',
  FastClick: LIB_ROOT + 'fastclick.js',
  //template: PROJECT_ROOT + '/template.js',
  underscore: LIB_ROOT + 'underscore.js',
  // jskit
  // jsKit: '/h5apps/jskit.sohu.com/jskit'
  jsKit: LIB_ROOT + 'jsKit.js',
  'iscroll-lite': LIB_ROOT + 'iscroll-lite.js',
  'iscroll': LIB_ROOT + 'iscroll.js',
  'iscroll-probe': LIB_ROOT + 'iscroll-probe.js',
  lazyLoad: LIB_ROOT + 'zepto.lazyload.js',
  uiLazyLoad: LIB_ROOT + 'ui-lazy-load.js',
  // qrcode
  //qrcode:LIB_ROOT + 'jquery.qrcode.min.js',
  // barcode
  //barcode:LIB_ROOT + 'barcode.js',

  //newsDetail
  newsMedia: JS + 'newsDetail/newsMedia',
  articleRouter: JS + 'newsDetail/articleRouter',
  articleAd: JS + 'newsDetail/articleAd',

  // helper
  //initdata: HELPER + 'initdata.js',
  interface: HELPER + 'interface.js',
  newslite: HELPER + 'newslite.js',
  util: HELPER + 'util.js',
  helpers: HELPER + 'helpers.js',
  adCommon : HELPER + 'adCommon.js',

  // components
  components: COMPONENTS + 'index.js',
  ClientShare: COMPONENTS + 'client-share.js',
  open: COMPONENTS + 'open.js'
};

// 入口
let entry = {};

// 自动处理 webpack entry
(function(dir) {
  fs.readdirSync(dir).map((item)=> {
    if (item === '.DS_Store') return;

    entry[item] = dir + '/' + item + '/' + item + '.js';
  });
})(MODULES);


// 公共入口
// browser
entry.common = ['zepto', 'FastClick', 'components', 'helpers', 'lazyLoad'];

entry.common.concat(['jsKit', 'interface', 'newslite', 'util', 'adCommon']);


// 出口
const output = {
  path: PROJECT_ROOT + '/dist/js',
  filename: '[name].bundle.min.js',
  publicPath: '../../js/',
  chunkFilename: '[name].chunk.min.js'
};


// loaders
const loaders = [
  {
    test: /\.tpl$/,
    loader: 'tmodjs',
    query: {
      escape: false
    }
  }
];

// 浏览器环境替换 cdn 链接 helpers.js
if (process.env.PLATFORM === 'browser') {
  loaders.push(
    {
      test: /\.js$/,
      loader: 'string-replace',
      query: {
        multiple: [
          { search: '{noPicMode}', replace: pkg.cdn }
        ]
      }
    }
  )
}

if (process.env.PLATFORM === 'native') {
  loaders.push(
    {
      test: /\.js$/,
      loader: 'string-replace',
      query: {
        multiple: [
          { search: '{noPicMode}', replace: '../../' }
        ]
      }
    }
  )
}


const modulesDirectories = ['node_modules', MODULES];

const extensions = ['', '.js', '.json', '.scss', '.tpl'];

const root = PROJECT_ROOT;

// banner
const jsBanner = banner.jsBanner;

// 插件
const plugins = [
  // banner
  new webpack.BannerPlugin(jsBanner),

  // common
  new webpack.optimize.CommonsChunkPlugin('common', 'common.bundle.js')

  // set global vars
  //new webpack.DefinePlugin({
  //  __PLATFORM__: process.env.PLATFORM,
  //  __CDNPATH__: pkg.cdn
  //})
];

// DEBUG 压缩代码
const DEBUG = process.env.DEBUG === 'true';

if (DEBUG) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    })
  );
}


const context = JS;

module.exports = {
  context,
  entry,
  output,
  resolve: {
    modulesDirectories,
    extensions,
    alias,
    root
  },
  loaders,
  plugins
};
