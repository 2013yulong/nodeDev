var $ = require('zepto');
// var articleRouter = require('articleRouter');
var util = require('util');

if (typeof $ === 'undefined') {
  throw new Error('NewsSDK H5 page requires zepto please');
}
// articleAd(t.cid, t.netType, t.channelId)
// console.log('-news ad file-');
var newsArticleAd = function (cid, netType, channelId) {
  var adArray = {};
  window.reAdArray = {};
  return articleAd = {
    //埋点
    buryPoint: function (statType, adArticleLocal) {
      var t = this,
        reAdArrayIs = typeof( reAdArray[adArticleLocal]) != 'undefined' && !!reAdArray[adArticleLocal],
        ad_txtIs = reAdArrayIs && typeof( reAdArray[adArticleLocal].ad_txt) != 'undefined',
        positionIs = reAdArrayIs && typeof( reAdArray[adArticleLocal].position) != 'undefined';
      
      var statType = statType,//load show   clk
        objLabel = ad_txtIs ? 7 : 21,
        objId = adArray[adArticleLocal].adId,
        channelId = channelId,
        refresh = '',
        apid = adArray[adArticleLocal].itemspaceid,
        position = positionIs ? reAdArray[adArticleLocal].position : '',
        netType = netType,
        time = Date.now(),
        gbcode = adArray[adArticleLocal].gbcode;
      
      if (adArticleLocal == '12791' || adArticleLocal == '12434') {
        objLabel = ad_txtIs ? 2 : 21;
      }
      var appP = 'a';
      var appVersion = '';
      var appPlatform = '';
      var appProductId = commonApi.getRequestParam().productId;
      commonApi.getAppInfo( function(data) {
        appVersion = data.version;
        appPlatform = data.platform;
        if (appPlatform != 'Android') {
          appP = 'ios';
        }
      });
      var buryPara = {
        p: appP, //ios -->ios
        c: cid,
        u: appProductId,//主线1 | skd | 视频合作是 5
        statType: statType,
        objFrom: 'news',
        objLabel: objLabel,
        objId: objId,
        objType: 'ad_' + apid,
        objFromId: channelId,
        reposition: '',
        adposition: '',
        // "lc": "",
        // "rc": refresh,
        newschn: channelId,
        appchn: '',
        scope: '',
        apid: apid,
        ad_gbcode: '',
        position: position,
        net: netType,
        v: appVersion,//主线版本
        // h: '',
        t: time, //毫秒数
        gbcode: gbcode,
        newsCate:newsCateStr
      };
      var buryParameter = util.json2url(buryPara);
      var buryUrl = '//pic.k.sohu.com/img8/wb/tj/c.gif';
      // console.log('--0303--adArticleLocal:'+ adArticleLocal+statType + buryParameter)
      $.ajax({
        type: 'GET',
        url: buryUrl,
        data: buryPara,
        dataType: 'json',
        success: function () {
          // console.log("--0303-- Bury ok" + adArticleLocal);
        },
        error: function (err) {
          console.log(err);
        }
      });
    },
    //传送广告位  t.adSlider
    putArticleAd: function (adSlider, adControlInfos, widthHeight, subId, newsId) {
      var t = this;
      var adLableN = adControlInfos.adInfos.length;
      for (var i = 0; i < adLableN; i++) {
        // adControlInfos.adInfos[i].itemspaceid='12232' ----1
        var regExp = eval('/' + adControlInfos.adInfos[i].itemspaceid + '/');
        if (regExp.test('12232-12237-12434|12791-12233-13371|12716-12238')) {
          adControlInfos.adInfos[i].adps = widthHeight[adControlInfos.adInfos[i].itemspaceid];
          
          adControlInfos.adInfos[i].filterInfo.subId = subId;
          adControlInfos.adInfos[i].newsId = newsId;
          adControlInfos.adInfos[i].gbcode = adControlInfos.gbcode;
          adControlInfos.adInfos[i].appid = 'newssdk';
          adControlInfos.adInfos[i].turn = '1';
          
          adArray[adControlInfos.adInfos[i].itemspaceid] = adControlInfos.adInfos[i];
          if ('12233' == adControlInfos.adInfos[i].itemspaceid) {
            adSlider.push(adControlInfos.adInfos[i]);
            // window.ad12232 = t.adBig12233;
            // console.info('--0215--t.adBig12233='+ JSON.stringify(adControlInfos.adInfos[i]));//.adInfos[i]
          }
          else if ('13371' == adControlInfos.adInfos[i].itemspaceid || '12716' == adControlInfos.adInfos[i].itemspaceid) {
            adSlider.push(adControlInfos.adInfos[i]);
          }
          else if ('12238' == adControlInfos.adInfos[i].itemspaceid) {
            adSlider.push(adControlInfos.adInfos[i]);
          }
          else {
            adApi.adArticle(adControlInfos.adInfos[i], adControlInfos.adInfos[i].itemspaceid, newsCateStr);console.info(adControlInfos.adInfos[i].itemspaceid);
          }
        }
      }
    },
    //show上报
    adShowReport: function (element, adArticleLocal) {
      var adLable = false;
      var isElement = typeof (element) != 'undefined' && !!$(element).html();
      
      $(window).on('scroll', function () {
        if (isElement) {
          if ((document.body.scrollTop > $(element).offset().top - window.screen.height + 95) && !adLable && adArticleLocal != '12434' && adArticleLocal != '12791') {
            adApi.adArticleShow(adArray[adArticleLocal], reAdArray[adArticleLocal], 0, adArticleLocal, newsCateStr);
            adLable = true;
            console.log('--show上报--' + adArticleLocal);
            articleAd.buryPoint('show', adArticleLocal);//埋点
          }
        }
      });
    },
    //click上报
    adClickReport: function (element, adArticleLocal) {
      if (typeof( reAdArray[adArticleLocal].ad_click) != 'undefined' && !!reAdArray[adArticleLocal].ad_click) {
        $(document).on("click", element, function (e) {
          adApi.adArticleClick(adArray[adArticleLocal], reAdArray[adArticleLocal], 0, adArticleLocal, newsCateStr);
          console.log('--click上报--' + adArticleLocal);
          articleAd.buryPoint('clk', adArticleLocal);//埋点
          // console.log('---1214-- reAdArray--'+ JSON.stringify( reAdArray[adArticleLocal]) + adArticleLocal);
          // console.log('---1214-- adArray--'+ JSON.stringify( adArray[adArticleLocal]) + adArticleLocal);
        });
      }
    },
    landArticleAd: function (reJsonStr, adArticleLocal) {//模板渲染后的数据 , adView
      if (typeof(reJsonStr) != 'undefined' && !!reJsonStr && typeof(reJsonStr.ad_txt) != 'undefined') {
        if (adArticleLocal == '12232') {//banner 12232 ad2-->位置 0
          reAdArray[adArticleLocal] = reJsonStr;
          // window.adReJsonStr=reAdArray[adArticleLocal];
          var adHtml = compileTemplate('adBannerView', reJsonStr);
          
          if (!!reJsonStr.ad_txt) {
            $('.middle1').removeClass('displayNone');
            $('#adBanner').html(adHtml);
            articleAd.adShowReport('#ad2', adArticleLocal);
            
            if (!!$('#ad2>a').attr('href')) {
              articleAd.adClickReport('#ad2', adArticleLocal);
            }
          } else {
            $('#adBanner').hide();
          }
        }
        else if (adArticleLocal == '12237') {//list relevance  12237  ad3 1
          // console.info('---ad-ad3-relevance'+ reJsonStr.ad_txt);
          reAdArray[adArticleLocal] = reJsonStr;
          if (!!reJsonStr.ad_txt) {
            var adHtml = compileTemplate('adRelevanceView', reJsonStr);
            $('#adRelevance').removeClass('displayNone').html(adHtml);
            $('.middle2').removeClass('displayNone');
            articleAd.adShowReport('#ad3', adArticleLocal);
            if (!!$('#ad3 > a').attr('href')) {
              articleAd.adClickReport('#ad3', adArticleLocal);
            }
            
          } else {
            $('#adRelevance').hide();
          }
        }
        else if (adArticleLocal == '12434' || adArticleLocal == '12791') {//top sponsorship ad1 'itemspaceid':'12791'|'12434' //正式|测试  冠名2
          // console.log('---ad-ad1-ad_txt'+ reJsonStr.ad_txt);//JSON.stringify(reJsonStr));
          if (!!reJsonStr.ad_image) {
            var href = !!reJsonStr.ad_click ? (' href=' + reJsonStr.ad_click) : '';
            // var img = '<img src="' + reJsonStr.ad_image + '" />' ;//
            var img = '<img src="' + reJsonStr.ad_image + '" />';//
            var ad1Html = '<div id="ad1"><sapn class="ad1">' + img + '</span></div>';
            $('#articleTitleContainer').append(ad1Html);
            articleAd.adShowReport('#ad1',adArticleLocal);
            if (!!reJsonStr.ad_image) {
              adApi.adArticleShow(adArray[adArticleLocal], reAdArray[adArticleLocal], 0, adArticleLocal, newsCateStr);
              console.log(adArticleLocal + '-ad1-show上报--' + reAdArray[adArticleLocal]);
              articleAd.buryPoint('show', adArticleLocal);//埋点
            }
            // t.adClickReport('#ad1',adArticleLocal);
          }
        }
      }
      articleAd.buryPoint('load', adArticleLocal);//埋点
      // newsApi.showLoadingView( false);
    },
    articleAdInit: function () {
      //获取广告
      window.setArticleAd = function (reJsonStr, adArticleLocal) {
        if (!!reJsonStr) {
          reAdArray[adArticleLocal] = reJsonStr;
          articleAd.landArticleAd(reJsonStr, adArticleLocal);
        }else{
          console.log('there is no this ad from BigData');
          articleAd.buryPoint('load', adArticleLocal);
        }
        console.log('--ad new--');console.log(adArticleLocal);console.log(reJsonStr)
      };
      window.newsArticleInit = 'bG9uZw go';
      console.log(newsArticleInit);
    }
  }
};


module.exports = newsArticleAd;
