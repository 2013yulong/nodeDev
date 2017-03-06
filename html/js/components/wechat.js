// wechat.js
// =============================================================

var $ = require('zepto');
var UI = require('./core');

/**
 * 包装微信分享数据
 * http://api.k.sohu.com/api/share/shareon.go?type=special&on=all&termId=123323
 * 设置格式为 服务端一致
 * var shareData = {
    link: '',
    pics: '',
    title: '',
   content: ''
  };
 */
var wrapShareData = function (data) {
  var result = {};
  $.each(['Weibo', 'Default', 'WeiXinChat', 'WeiXinMoments', 'QQChat', 'QQZone'], function (index, item) {
    result[item] = {
      title: data.title,
      pics: [data.pics],
      content: data.content,
      link: data.link
    };
  });
  return result;
};

/**
 * wechat 分享
 * @param data
 * data => http://api.k.sohu.com/api/share/shareon.go?type=special&on=all&termId=123323
 */
var wechatShare = function (data) {
  var $script = require('scriptjs');
  $script('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', function () {
    $.ajax({
      url: '/api/usercenter/getWeiXinJsSign.go',
      method: 'GET',
      cache: false,
      success: function (signData) {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: signData.appId, // 必填，公众号的唯一标识
          timestamp: signData.timestamp, // 必填，生成签名的时间戳
          nonceStr: signData.nonceStr, // 必填，生成签名的随机串
          signature: signData.signature, // 必填，签名，见附录1
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

        wx.ready(function () {
          // 朋友圈
          wx.onMenuShareTimeline({
            title: data.WeiXinMoments.title,
            link: data.WeiXinMoments.link,
            imgUrl: data.WeiXinMoments.pics[0],
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });

          // 分享给朋友
          wx.onMenuShareAppMessage({
            title: data.WeiXinChat.title,
            desc: data.WeiXinChat.content,
            link: data.WeiXinChat.link,
            imgUrl: data.WeiXinChat.pics[0],
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });

          // 分享到 QQ
          wx.onMenuShareQQ({
            title: data.QQChat.title,
            desc: data.QQChat.content,
            link: data.QQChat.link,
            imgUrl: data.QQChat.pics[0],
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });

          // 分享到微博
          wx.onMenuShareWeibo({
            title: data.Weibo.title,
            desc: data.Weibo.content,
            link: data.Weibo.link,
            imgUrl: data.Weibo.pics[0],
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });

          // 分享到 QQ 空间
          wx.onMenuShareQZone({
            title: data.QQZone.title,
            desc: data.QQZone.content,
            link: data.QQZone.link,
            imgUrl: data.QQZone.pics[0],
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });

        });

        wx.error(function (res) {
          // alert(res);
        });
      }
    });
  });
};

UI.wechat.wrapShareData = wrapShareData;
UI.wechat.share = wechatShare;

module.exports = {
  wrapShareData: wrapShareData,
  wechatShare: wechatShare
};
