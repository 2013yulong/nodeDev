// browser.js
// 端外环境 替换 jsKit Api
// ===============================

var $ = require('zepto');
var UI = require('./core');

var jsKitClient = {};
jsKitClient.onDeviceReady = $;

var commonApi = {};

commonApi.getNetworkInfo = function (callback) {
  var data = {
    type: ''
  };

  callback && callback(data);

  return data;
};

commonApi.getRequestParam = function () {
  return {
    platform: ''
  };
};

commonApi.getAppInfo = function () {
  return {
    platform: ''
  };
};


var widgetApi = {};
widgetApi.toast = function (val, type) {

};


var jsKitStorage = {};
jsKitStorage.getItem = function () {
  return false;
};

jsKitStorage.setItem = function () {
  return false;
};

var newsApi = {};
newsApi.showLoadingView = function() {

};


// 是否是微信，引入微信 sdk
(function () {
  function isWeChatBrowser() {
    //截至2014年2月12日,这个方法不能测试 windows phone 中的微信浏览器
    return (/MicroMessenger/i).test(window.navigator.userAgent);
  }

  if (isWeChatBrowser()) {
    $('html').addClass('wechat');
  }
})();


// 是否是 sohu 端内 外链，引入 二代协议
(function () {
  function isSohuBrowser() {
    return (/SohuNews/i).test(window.navigator.userAgent);
  }

  if (isSohuBrowser()) {
    window.platform = 'iOS';
  }
})();

// export
window.jsKitClient = jsKitClient;
window.commonApi = commonApi;
window.widgetApi = widgetApi;
window.jsKitStorage = jsKitStorage;
window.newsApi = newsApi;

// TODO: 简单满足 special.js 需求，后续添加完成
