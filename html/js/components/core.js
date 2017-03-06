// core.js
// ==========================================

'use strict';

var $ = require('zepto');
var FastClick = require('FastClick');

if (typeof $ === 'undefined') {
  throw new Error('NewsSDK H5 page requires zepto -.-');
}

var UI = $.UI || {};
var $win = $(window);
var doc = window.document;
var $html = $('html');

// Attach FastClick on touch devices
$(function() {
  FastClick.attach(document.body);
});

// wechat 相关
UI.wechat = {};

// 检测支持的属性
UI.support = {};

// 检测 animationEnd 支持
UI.support.animation = (function() {
  var animationEnd = (function() {
    var element = doc.body || doc.documentElement;
    var animEndEventNames = {
      // firefox 和 o 不用检测
      //MozAnimation: 'animationend',
      //OAnimation: 'oAnimationEnd oanimationend',
      WebkitAnimation: 'webkitAnimationEnd',
      animation: 'animationend'
    };

    for (var name in animEndEventNames) {
      if (element.style[name] !== undefined) {
        return animEndEventNames[name];
      }
    }
  })();

  return animationEnd && {end: animationEnd};
})();

// 检测 transitionEnd 支持
UI.support.transition = (function() {
  var transitionEnd = (function() {
    // https://developer.mozilla.org/en-US/docs/Web/Events/transitionend#Browser_compatibility
    var element = doc.body || doc.documentElement;
    var transEndEventNames = {
      //MozTransition: 'transitionend',
      //OTransition: 'oTransitionEnd otransitionend',
      WebkitTransition: 'webkitTransitionEnd',
      transition: 'transitionend'
    };

    for (var name in transEndEventNames) {
      if (element.style[name] !== undefined) {
        return transEndEventNames[name];
      }
    }
  })();

  return transitionEnd && {end: transitionEnd};
})();


UI.utils = {};

// 解析 data 参数
UI.utils.parseOptions = function(string) {
  if ($.isPlainObject(string)) {
    return string;
  }

  var start = (string ? string.indexOf('{') : -1);
  var options = {};

  if (start != -1) {
    try {
      options = (new Function('',
        'var json = ' + string.substr(start) +
        '; return JSON.parse(JSON.stringify(json));'))();
    } catch (e) {
    }
  }

  return options;
};

// handle multiple browsers for requestAnimationFrame()
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
// https://github.com/gnarf/jquery-requestAnimationFrame
UI.utils.rAF = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
      // if all else fails, use setTimeout
    function(callback) {
      return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
    };
})();


// handle multiple browsers for cancelAnimationFrame()
UI.utils.cancelAF = (function() {
  return window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    function(id) {
      window.clearTimeout(id);
    };
})();


// http://blog.alexmaccaw.com/css-transitions
$.fn.emulateTransitionEnd = function(duration) {
  var called = false;
  var $el = this;

  $(this).one(UI.support.transition.end, function() {
    called = true;
  });

  var callback = function() {
    if (!called) {
      $($el).trigger(UI.support.transition.end);
    }
    $el.transitionEndTimmer = undefined;
  };
  this.transitionEndTimmer = setTimeout(callback, duration);
  return this;
};

// 查询字符串转成js对象
UI.utils.query2obj = function (url) {
  var obj = {};
  var reg = new RegExp("^" + "http");
  var queryString;

  if (reg.test(url)) {
    queryString = url.substring(url.indexOf("?") + 1, url.length);
  } else {
    queryString = url;
  }

  if (queryString) {
    var _arr = queryString.split("&"),
      len = _arr.length;

    for (var i = 0; i < len; i++) {
      var item = _arr[i].split('=');
      var key = item[0];
      var value = item[1];
      obj[key] = value;
    }
    return obj;
  }
};

// 图片预加载
UI.utils.imgLoad = function (url, callback) {
  var img = new Image();
  //img.crossOrigin = 'anonymous';
  img.src = url;

  if (img.complete) {
    callback(img);
  } else {
    img.onload = function () {
      callback(img);
      img.onload = null;
    };
  }
};


// 检测端内和端外环境
(function() {
  var browser = require('./browser');
  // native
  $html.addClass('native');
  window.ENV = 'native';
  require('jsKit');

  if ($.os.android) {
    $html.addClass('android');
  }

  if ($.os.ios) {
    $html.addClass('ios');
  }

  if (window.jsKitClient.hasNativeSupport === false) {
    $html.removeClass('native');
    $html.addClass('browser');
    window.ENV = 'browser';
    UI.wechatShare = browser.wechatShare;
    UI.wrapWechatShareData = browser.wrapWechatShareData;
  }
})();

// UI 版本
// UI.VERSION = '{{VERSION}}';

// exports
module.exports = UI;
