/**
 * article.js |  demo
 * getCommentListByCursor.go
 * 评论wiki:http://smc.sohuno.com/wiki/pages/viewpage.action?pageId=2163147
 * 新闻浏览器中JsKit接口wiki:http://smc.sohuno.com/wiki/pages/viewpage.action?pageId=10190924
 * 搜狐新闻客户端Display广告位适配规则&广告位列表wiki:http://confluence.sohuno.com/pages/viewpage.action?pageId=11700691
 */
var $ = require('zepto');
var fastClick = require('FastClick');// 手机点击的200ms
// var lazyload = require('lazyLoad'); //懒加载模块
var util = require('util'); //

function ArticleDo() {
  this.articleDebug = '0'; //apiVersion = 36//debug模式控制器。1则为debug模式
  this.demoJoke = $('.demoJoke');
  // 其他全局变量
}
// //懒加载设置
// var lazyLoadOption = {
//     threshold: windowH * 2,
//     failure_limit: 0,
//     event: 'scroll',
//     // effect: 'fadeIn',
//     // effect_params: [0, 'completeFunction'],
//     data_attribute: 'original',
//     data_srcset_attribute: 'original-srcset',
//     skip_invisible: true,
//     vertical_only: false,
//     check_appear_throttle_time: 0,
//     no_fake_img_loader: false,
//   }

//基本模式设置
ArticleDo.prototype.settings = function() {
  var t = this;
  //使用fastclick提升点击响应速度
  fastClick.attach(document.body);
  // util.settingMode();
  // commonApi.getNetworkInfo(function(data) { //5
  //   t.netType = data.type;
  // });
};

ArticleDo.prototype.demoJokeRender = function(params) {
  var t = this;
  //渲染
  data = require('./relevanceJoke.json');//测试数据
  
  var html = require("./relevanceJoke.tpl")(data);
  if (!util.isEmptyObject(data) && data.recommendNews[0]) { //v4 articles
    t.demoJoke.html(html);
  } else {
    t.demoJoke[0].style.display = 'none';
  }
}
// promise异步请求各个接口 并渲染
ArticleDo.prototype.renderPage = function() {
  var t = this;
  t.demoJokeRender();
//   t.checkFontSize();
//   //设置屏幕高度
//   var getDevice = function() {
//     var deferred = $.Deferred();
//     //commonApi.getDeviceInfo(function(deviceInfo) { //2
//     //--main-
//     //});
//       deferred.resolve();
//     return deferred.promise(); //返回promise对象
//   };

//   //读取设备信息字段
//   var getRequestParam = function() {
//     var deferred = $.Deferred();
//     //----main----
//       deferred.resolve();
//     return deferred.promise();
//   };

//   //读取文章信息
//   var getArticleNeedParam = function() {
//     var deferred = $.Deferred();
//     //---main----
//     deferred.resolve();
//     return deferred.promise();
//   };
//   //请求数据,当前channeld为47或54时为美图/奇趣频道,需要请求美图的接口,其他则请求新闻接口
//   var loadArticleData = function() {
//     //--异步后main--
//   };
//   $.when(getDevice(), getRequestParam(), getArticleNeedParam()).done(function() { //285
//     loadArticleData(); //186
//   });
//   //--懒加载--
//   $('.lazy').lazyload(lazyLoadOption);
};
ArticleDo.prototype.bindEvent = function() {
  var t = this; //此处经手多人，目前时间有限，只根据原版进行修改，需后续改版
    //点击重新加载
  // t.contnoPage.on("click", function(e) {
  //   e.preventDefault();
  //   return false;
  // });
};

ArticleDo.prototype.init = function() {
  var t = this;
  //基本初始配置
  t.settings(); //15
  //渲染页面
  t.renderPage();
  //绑定事件
  t.bindEvent();
};

// init
new ArticleDo().init(); 
// exports
module.exports = ArticleDo;

