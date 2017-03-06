// zepto and modules
// ====================================

// zepto modules

var Zepto = require('./zepto');   // core
require('./detect');  // Provides $.os and $.browser information
require('./fx');   // The animate() method
require('./fx_methods'); // Animated show, hide, toggle, and fade*() methods.
require('./assets');  // Experimental support for cleaning up iOS memory after removing image elements from the DOM.
require('./data');  // A full-blown data() method, capable of storing arbitrary objects in memory.
require('./deferred'); // Provides $.Deferred promises API. Depends on the "callbacks" module. When included, $.ajax() supports a promise interface for chaining callbacks.
require('./callbacks'); // Provides $.Callbacks for use in "deferred" module.
require('./selector'); // Experimental jQuery CSS extensions support for functionality such as $('div:first') and el.is(':visible').
require('./touch'); // Fires tap– and swipe–related events on touch devices. This works with both `touch` (iOS, Android) and `pointer` events (Windows Phone).

// 确保 页面加载 完毕,关闭加载动画
Zepto.fn.appendAfterCloseLoading = function (dom, timeout) {
  timeout = timeout || 100;

  this.append(dom);

  if (this.height()) {
    $(document).trigger('append:end');
    newsApi.showLoadingView(false);
  }

  return this;
};

// 拦截 a 链接触发事件
// 修改二代协议,增加 linkTop linkBottomTop
Zepto(document).on('click', 'a', function (event) {
  var href = Zepto(this).attr('href'),
    offset,
    scrollTop,
    top,
    newHref,
    linkBottomTop;

  // 二代协议  非 https http
  if (!/https?:\/\//img.test(href) && /:\/\//.test(href)) {
    offset = Zepto(this).offset();
    scrollTop = Zepto(window).scrollTop();
    top = parseInt(offset.top - scrollTop);
    linkBottomTop = parseInt(offset.height + top);

    newHref = href + '&linkBottomTop=' + linkBottomTop + '&linkTop=' + top + '&noTriggerIOSClick=1';

    // ios 8 增加 js 前缀
    // var https://gist.github.com/irace/3688560
    if (/iPhone OS 8_/.test(navigator.userAgent)) {
      //alert('test ios 8');
      newHref = 'js:' + newHref;
    }

    location.href = newHref;
    return false;
  }
});

// js crash
window.onerror = function (message, source, line, col, error) {
  console.log('message: %o', message);
  console.log('source: %o', source);
  console.log('line: %o', line);
  console.log('col: %o', col);
  console.log('error: %o', error);
};

module.exports = Zepto;
