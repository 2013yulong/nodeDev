/*! newssdk.sohu.com v: 0.0.12 | Copyright © 2017 Sohu.com, Inc. All Rights Reserved | Date - 2017-03-04 23:03:97  */
webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * article.js |  demo
	 * getCommentListByCursor.go
	 * 评论wiki:http://smc.sohuno.com/wiki/pages/viewpage.action?pageId=2163147
	 * 新闻浏览器中JsKit接口wiki:http://smc.sohuno.com/wiki/pages/viewpage.action?pageId=10190924
	 * 搜狐新闻客户端Display广告位适配规则&广告位列表wiki:http://confluence.sohuno.com/pages/viewpage.action?pageId=11700691
	 */
	var $ = __webpack_require__(1);
	var fastClick = __webpack_require__(12);// 手机点击的200ms
	// var lazyload = require('lazyLoad'); //懒加载模块
	var util = __webpack_require__(13); //

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
	  data = __webpack_require__(27);//测试数据
	  
	  var html = __webpack_require__(28)(data);
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



/***/ },

/***/ 27:
/***/ function(module, exports) {

	module.exports = {
	  "id": 130249165, "recommendNews": [{
	    "newsId": 130254702,
	    "title": "油价迎今年第一涨!明天0点 90号汽油上调",
	    "newsType": 3,
	    "commentCount": 0,
	    "newsHotCount": 66666,
	    "pics": ["../../images/app_icon.jpg"],
	    "link": "news://newsId=130254702&tracker=type:relevance,engine:getui_1.0_v4&token=1461667539462",
	    "media": "重庆晨报",
	    "content": "alababy is alabaobao alababy is alabaobao alababy is alabaobao alababy is alabaobao alababy is alabaobao alababy is alabaobao alababy is alabaobao alababy is alabaobao alababy is alabaobao ",
	    "hotComment": [
	      {
	        "pid": "6118356668574511222",
	        "from": 6,
	        "commentId": 1116280783,
	        "content": "加快建设中国的最前哨",
	        "author": "水墨星空2316",
	        "floors": [],
	        "passport": "OGI-_TYBGD2QYU2ML-OPPUNCBFOS@wechat.sohu.com",
	        "spaceLink": null,
	        "linkStyle": 0,
	        "authorimg": "http://wx.qlogo.cn/mmopen/3aqJHMXkEEzOvLQiccXL2aNiaetribqKbmtw18Uw7R0ZWVyzNQKfaPONFMByvvwD5W8oMr8SFPTe6WJtbObekMzk0OPiarziajVlZ/0",
	        "gen": "1",
	        "city": "北京市",
	        "digNum": 8,
	        "ctime": "1461752416000",
	        "ntime": "22小时前"
	      }
	    ]
	  }, {
	    "newsId": 129618961,
	    "title": "突破地板价:90号汽油或上调1毛3",
	    "newsType": 3,
	    "commentCount": 202,
	    "newsHotCount": 655,
	    "pics": ["http://n1.itc.cn/img7/adapt/wb/recom/2016/04/23/146137755107234128_124_1000.JPEG"],
	    "link": "news://newsId=129618961&tracker=type:relevance,engine:getui_1.0_v4&token=1461667539462",
	    "media": "驱动之家",
	    "content": "驱动之家驱动之家驱动之家驱动之家驱",
	    "hotComment": [
	      {
	        "pid": "6092366876753965141",
	        "from": 6,
	        "commentId": 1116121155,
	        "content": "赞同",
	        "author": "永暑礁",
	        "floors": [],
	        "passport": "whq168@sohu.com",
	        "spaceLink": null,
	        "linkStyle": 0,
	        "authorimg": "http://edc3f09a7c333.cdn.sohucs.com/s_mini/pic/2016/03/21/87657879577822080",
	        "gen": "1",
	        "city": "安徽省宣城市",
	        "digNum": 11,
	        "ctime": "1461648661000",
	        "ntime": "2016/04/26"
	      }
	    ]
	  }, {
	    "newsId": 130253446,
	    "title": "汽油价格明天上调 沭阳车主晚上可以把油箱加满",
	    "newsType": 3,
	    "commentCount": 0,
	    "newsHotCount": 123,
	    "pics": ["http://n1.itc.cn/img7/adapt/wb/recom/2016/04/26/146166190619617344_124_1000.JPEG"],
	    "link": "news://newsId=130253446&tracker=type:relevance,engine:getui_1.0_v4&token=1461667539462",
	    "media": "沭阳网",
	    "content": "沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳网沭阳a1",
	    "hotComment": []
	  }, {
	    "newsId": 130206769,
	    "title": "国内成品油价格即将上调",
	    "newsType": 3,
	    "commentCount": 0,
	    "newsHotCount": 6,
	    "pics": ["http://n1.itc.cn/img7/adapt/wb/sohulife/2016/04/26/146165025832220570_124_1000.JPEG"],
	    "link": "news://newsId=130206769&tracker=type:relevance,engine:getui_1.0_v4&token=1461667539462",
	    "media": "全诺财经",
	    "content": "全诺财经全诺财经全诺财经全诺财经全诺财经全诺财经全诺财经全诺财经全诺财经全诺财经全诺财",
	    "hotComment": []
	  }, {
	    "newsId": 130206383,
	    "title": "油价调整最新消息 突破地板价油价格或迎上调",
	    "newsType": 3,
	    "commentCount": 1,
	    "newsHotCount": 6,
	    "pics": ["http://n1.itc.cn/img7/adapt/wb/sohulife/2016/04/26/146165018770254737_124_1000.JPEG"],
	    "link": "news://newsId=130206383&tracker=type:relevance,engine:getui_1.0_v4&token=1461667539462",
	    "media": "综投网",
	    "content": "综投网综投网综投网综投网综投网综投网综投网综投网综投网综投网综投网综投网综投网综投网综投网综投网综投网综投网综投网综投网",
	    "hotComment": []
	  }], "newsHotCount": 25, "sogouHotWords": [{
	    "hotWord": "今日油价上调多少",
	    "encodeUrl": "https://m.sogou.com/web/searchList.jsp?keyword=%E4%BB%8A%E6%97%A5%E6%B2%B9%E4%BB%B7%E4%B8%8A%E8%B0%83%E5%A4%9A%E5%B0%91&pid=sogou-wsse-6754e06e46dfa419-0011"
	  }, {
	    "hotWord": "2015年汽油93号油价表",
	    "encodeUrl": "https://m.sogou.com/web/searchList.jsp?keyword=2015%E5%B9%B4%E6%B1%BD%E6%B2%B993%E5%8F%B7%E6%B2%B9%E4%BB%B7%E8%A1%A8&pid=sogou-wsse-6754e06e46dfa419-0011"
	  }, {
	    "hotWord": "今日油价调整最新消息",
	    "encodeUrl": "http://m.sogou.com/web/searchList.jsp?keyword=%E4%BB%8A%E6%97%A5%E6%B2%B9%E4%BB%B7%E8%B0%83%E6%95%B4%E6%9C%80%E6%96%B0%E6%B6%88%E6%81%AF&pid=sogou-wsse-6754e06e46dfa419-0001"
	  }], "adControlInfos": [{
	    "sdk": "sohu",
	    "newsId": 130249165,
	    "gbcode": "1156110000",
	    "adInfos": [{
	      "adId": 9,
	      "itemspaceid": 12232,
	      "filterInfo": {
	        "sv": "Android5.5.2",
	        "cid": 5941160840853368846,
	        "appchn": 2057,
	        "debugloc": "1156110000",
	        "subid": 0,
	        "newschn": 0,
	        "position": 0,
	        "adsrc": 21,
	        "adp_type": 4
	      }
	    }, {
	      "adId": 14,
	      "itemspaceid": 12237,
	      "filterInfo": {
	        "sv": "Android5.5.2",
	        "cid": 5941160840853368846,
	        "appchn": 2057,
	        "debugloc": "1156110000",
	        "subid": 0,
	        "newschn": 0,
	        "position": 0,
	        "adsrc": 1,
	        "adp_type": 5
	      }
	    }, {
	      "adId": 10,
	      "itemspaceid": 12233,
	      "filterInfo": {
	        "sv": "Android5.5.2",
	        "cid": 5941160840853368846,
	        "appchn": 2057,
	        "debugloc": "1156110000",
	        "subid": 0,
	        "newschn": 0,
	        "position": 0,
	        "adsrc": 1,
	        "adp_type": 6
	      }
	    }]
	  }], "ctx": "engine:getui_1.0_v4,ts:1461667539", "token": "554c51c8bcb04bb8aa3b5e69c95f0a67"
	};


/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('html/modules/article/relevanceJoke',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,recommendNews=$data.recommendNews,$value=$data.$value,$index=$data.$index,$string=$utils.$string,$out='';$out+=' <div class="gallery relevance-joke"> <h3>相关</h3> ';
	$each(recommendNews,function($value,$index){
	$out+=' <div class="slice short" data-newsId="';
	$out+=$string($value.newsId);
	$out+='"> <a href="';
	$out+=$string($value.link);
	$out+='"> <p class="content"> <span class="words" data-remainText="';
	$out+=$string($value.remainText);
	$out+='"> ';
	$out+=$string($value.content);
	$out+=' </span> <span class="img-icon"></span>  <span class="btn"></span>  </p> </a> ';
	if($value.pics[0]){
	$out+=' <p class="pic"><img src="';
	$out+=$string($value.pics[0]);
	$out+='"></p> ';
	}
	$out+=' ';
	if($value.hotComment && $value.hotComment[0]){
	$out+=' <p class="cmt cmt-joke"> <span class="name">';
	$out+=$string($value.hotComment[0].author);
	$out+='：</span> ';
	$out+=$string($value.hotComment[0].content);
	$out+=' </p> ';
	}
	$out+=' <p class="switch"> <span class="text">展开</span> <span class="btn"></span> </p> <div class="bottom"> <span class="good_essay"> <span class="good_1">+1</span> <span class="evaluate_cont">';
	$out+=$string($value.newsHotCount);
	$out+='</span> <span class="good_count"></span> </span> <span class="cmt-link"> <a href="';
	$out+=$string($value.link);
	$out+='&newstype=62&goCmt"><i></i>';
	$out+=$string($value.commentCount);
	$out+='</a> </span> <span class="right"> <span class="joke">段子</span> <span class="more"></span> </span> </div> <div class="more-op"> <div class="mask"></div> <div class="panel"> <div class="btn btn4"> <div class="pic"></div> <div class="word collect">举报</div> </div> <div class="btn btn1"> <div class="pic"></div> <div class="word collect">收藏</div> </div> <div class="btn btn2"> <div class="pic"></div> <div class="word collect">分享</div> </div> <div class="btn btn3"> <div class="pic"></div> <div class="word collect">不感兴趣</div> </div> <div class="close"></div> </div> </div> </div> ';
	});
	$out+=' </div>  ';
	return new String($out);
	});

/***/ }

});