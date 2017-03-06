// open-client.js
// ===================================

var $ = require('zepto');
var UI = require('./core');

function detect(ua, platform){
  var os = this.os = {}, browser = this.browser = {},
    webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
    android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
    osx = !!ua.match(/\(Macintosh\; Intel /),
    ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
    iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
    win = /Win\d{2}|Windows/.test(platform),
    wp = ua.match(/Windows Phone ([\d.]+)/),
    touchpad = webos && ua.match(/TouchPad/),
    kindle = ua.match(/Kindle\/([\d.]+)/),
    silk = ua.match(/Silk\/([\d._]+)/),
    blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
    bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
    rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
    playbook = ua.match(/PlayBook/),
    chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
    firefox = ua.match(/Firefox\/([\d.]+)/),
    firefoxos = ua.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
    ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
    webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
    safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/)

  // Todo: clean this up with a better OS/browser seperation:
  // - discern (more) between multiple browsers on android
  // - decide if kindle fire in silk mode is android or not
  // - Firefox on Android doesn't specify the Android version
  // - possibly devide in os, device and browser hashes

  if (browser.webkit = !!webkit) browser.version = webkit[1]

  if (android) os.android = true, os.version = android[2]
  if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
  if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
  if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
  if (wp) os.wp = true, os.version = wp[1]
  if (webos) os.webos = true, os.version = webos[2]
  if (touchpad) os.touchpad = true
  if (blackberry) os.blackberry = true, os.version = blackberry[2]
  if (bb10) os.bb10 = true, os.version = bb10[2]
  if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
  if (playbook) browser.playbook = true
  if (kindle) os.kindle = true, os.version = kindle[1]
  if (silk) browser.silk = true, browser.version = silk[1]
  if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
  if (chrome) browser.chrome = true, browser.version = chrome[1]
  if (firefox) browser.firefox = true, browser.version = firefox[1]
  if (firefoxos) os.firefoxos = true, os.version = firefoxos[1]
  if (ie) browser.ie = true, browser.version = ie[1]
  if (safari && (osx || os.ios || win)) {
    browser.safari = true
    if (!os.ios) browser.version = safari[1]
  }
  if (webview) browser.webview = true

  os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
  (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)))
  os.phone  = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
  (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
  (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))));

  return {
    os: os,
    browser: browser
  };
}

// 使用 iframe 跳转
function loadIframe(url, timeout, callback) {
  var timer = null;

  var iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = url;

  document.body.appendChild(iframe);

  var cleanIframe = function () {
    if (iframe && iframe.readyState && iframe.readyState != 'loaded' && iframe.readyState != 'complete') {
      return;
    }

    // 清理 iframe 标签
    iframe.onload = iframe.onreadystatechange = iframe.onerror = null;
    iframe.src = '';
    iframe.parentNode.removeChild(iframe);
    iframe = null;

    callback();

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  timer = setTimeout(function () {
    cleanIframe();
  }, 2000);
}

var openClient = function(scheme, callback) {
  // scheme
  var config = {
    schemeIOS: 'sohunewsiphone://pr/',
    schemeAdr: 'sohunews://pr/',
    downloadURL: 'http://3g.k.sohu.com',
    storePage: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.sohu.newsclient&g_f=9917',
    timeout: 200
  };

  var ua = navigator.userAgent;
  var device = detect(ua, navigator.platform);
  var os = device.os;
  var browser = device.browser;
  // ios & adr 走不同的协议
  var protocol = os.ios ? config.schemeIOS + scheme : config.schemeAdr + scheme;

  // 不能唤起的 apps
  //var weiboUA = /__weibo__/.test(ua);
  var wechatUA = /MicroMessenger/.test(ua);
  //var sogouUA = /Sogou/.test(ua);

  // 不是 phone 直接跳转 store
  if (!os.phone) {
    window.location.href = config.downloadURL;
  }

  // safari 用 iframe 不能打开应用，直接跳转 url
  if (browser.safari) {
    window.location.href = protocol;
  }

  loadIframe(protocol, config.timeout, function() {
    if (wechatUA) {
      window.location.href = config.storePage;
    } else {
      window.location.href = config.downloadURL;
    }
  });
};

UI.openClient = openClient;
module.exports = openClient;

// TODO: 接入 wechat 开放平台
// bug 会打开 app ，也会触发 跳转页面

// 逻辑：
// 安卓：微信 => 应用宝
//      其余平台 => http://3g.k.sohu.com/
// ios: 微信 => app store => 微信 不能 直接跳转 app store 只有转 应用宝
// ios: 其余 => http://3g.k.sohu.com/
