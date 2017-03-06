// client-share.js
// 调用客户端分享
// http://smc.sohuno.com/wiki/pages/viewpage.action?pageId=8815030
//  link:
//  pics:
//  title:
//  content
// ===========================================================

function clientShare(data) {
  var link = encodeURIComponent(data.link);
  var pics = encodeURIComponent(data.pics);
  var title = encodeURIComponent(data.title);
  var content = encodeURIComponent(data.content);
  var shareon = data.shareon ? encodeURIComponent(data.shareon) : null;

  var sourceType = 42;
  var protocol = 'share://';

  // 创建一个 iframe 丢到页面中，加载某条链接
  function loadIframe(url) {
    var timer = null;

    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';

    iframe.src = url;

    var callback = function () {
      if (iframe && iframe.readyState && iframe.readyState != 'loaded' && iframe.readyState != 'complete') {
        return;
      }
      // 清理iframe标签
      iframe.onload = iframe.onreadystatechange = iframe.onerror = null;
      iframe.src = '';
      iframe.parentNode.removeChild(iframe);
      iframe = null;

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };

    iframe.onload = iframe.onerror = iframe.onreadystatechange = callback;
    document.getElementsByTagName('body')[0].appendChild(iframe);
    if (typeof alertDom !== 'undefined') {
      alertDom.remove();
      alertDom = null;
    }

    timer = setTimeout(function () {
      callback();
    }, 40);
  }


  if(shareon){
    var shareString = 'shareon=' + shareon;
  }else{
    var shareString = [
      'link=' + link,
      '&pics=' + pics,
      '&title=' + title,
      '&content=' + content,
      '&sourceType=' + sourceType
    ].join('');
  }

  var ua=navigator.userAgent;
  var iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);

  var openLink = protocol + shareString;
  console.log(openLink);
  if(iphone){
    newsApi.newWindow(openLink);
  }else {
    loadIframe(openLink);
  }
}

module.exports = clientShare;
