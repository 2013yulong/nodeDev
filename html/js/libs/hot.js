// hot.js
// 配合 hot.scss，大屏适配方案
// =================================================

// @via https://github.com/imochen/hotcss.git
// @via https://github.com/amfe/lib-flexible

(function(win, hot) {
  'use strict';

  var doc = window.document;
  var docEle = doc.documentElement;
  var metaEle = doc.querySelector('meta[name="viewport"]');
  var hotEle = doc.querySelector('meta[name="hot"]');
  var dpr = 0;
  var scale = 0;

  var match;
  // 根据已有 meta 标签来设置缩放比例
  if (metaEle) {
    match = metaEle.getAttribute('content').match(/\initial\-scale=([\d\.]+)/);
    if (match) {
      scale = parseFloat(match[1]);
      dpr = parseInt(1 / scale);
    }
  } else if (hotEle) {

  }

})(window, window['hot'] || (window['hot'] = {}));

// TODO: 1px 问题
// TODO: 自定义 meta 设置页面缩放