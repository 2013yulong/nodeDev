var $ = require('zepto');

var adCommon = {

  //广告加载曝光
  loadAdFuc: function (data, type, lc, rc, channelId, token ,u) {
    var deferred = $.Deferred();
    for (var len = data.articles.length, i = len - 1; i >= 0; i--) {
      var templateType = data.articles[i]["templateType"];
      var isHasSponsorships = data.articles[i]['isHasSponsorships'];
      var adType = false;
      if(data.articles[i].adType){
        if(templateType == 3 || templateType == 21){
          adType = true;
        }
      }
      if (templateType == 12 || templateType == 13 || templateType == 14
        || (templateType == 3 && adType) || (templateType == 21 && adType) || templateType == 22 || templateType == 23 || isHasSponsorships == 1) {
        //加载曝光
        var newsId = data.articles[i]['newsId'];
        var temdata = window.sessionStorage.getItem(newsId);
        //var lc = lc;//this.lcTime;
        //var rc = rc;//this.times ;
        var team = {'lc': lc, 'rc': rc}
        var adback = adApi.adLoad(data.articles[i], team, 0);
        //服务端加载曝光
        this.adExposure(data.articles[i],'load', channelId, token, lc, rc ,u);
        //存储广告数据(缓存、构造方法)
        if (adback) {
          if (!temdata) {
            window.sessionStorage.setItem(newsId, JSON.stringify(data.articles[i]));
          }
          data.articles[i].adback = adback;
        }
      }
    }
    deferred.resolve();
    return deferred.promise();
  },
//广告显示曝光
  showAdFuc: function (className,channelId, token, lc, rc ,u) {

    var _this = this;
    var show_fuc = function (container) {
      var doc = document;
      if (container) {
        var t = container.offset().top,
          b = t + container[0].offsetHeight,
          t_side = doc.documentElement.scrollTop || doc.body.scrollTop,
          b_side = t_side + (doc.documentElement.clientHeight || doc.body.clientHeight);
        if (t >= t_side && b <= b_side) {
          container.attr("name", "exposure");//避免重复显示曝光
          var id = container.attr("id")
          var temp = JSON.parse(window.sessionStorage.getItem(id));
          var team = {'lc': lc, 'rc': rc}
          adApi.adShow(temp,team,0);
          _this.adExposure(temp, 'show', channelId, token, lc, rc ,u);
        }
      }
    }
    $("." + className).each(function () {
      if ($(this).attr('name')) {
        if ($(this).attr('name') != "exposure") {//避免重复曝光
          show_fuc($(this));
        }
      } else {
        $(this).attr("name", "loadad");
        show_fuc($(this));
      }
    });
  },

//信息流显示曝光
  explogFuc: function (className,loglist, token, lc, rc) {
    var show_fuc = function (container) {
      var doc = document;
      if (container) {
        var t = container.offset().top,
          b = t + container[0].offsetHeight,
          t_side = doc.documentElement.scrollTop || doc.body.scrollTop,
          b_side = t_side + (doc.documentElement.clientHeight || doc.body.clientHeight);
        if (t >= t_side && b <= b_side) {
          container.attr("log-stat", "expo");//避免重复显示曝光
          var id = container.attr("id")
          loglist.push(id);
        }
      }
    }
    $("." + className).each(function () {
      if ($(this).attr('log-stat')) {
        if ($(this).attr('log-stat') != "expo") {//避免重复曝光
          show_fuc($(this));
        }
      } else {
        $(this).attr("log-stat", "load");
        show_fuc($(this));
      }
    });
    return loglist;
  },

//服务端曝光方法
  adExposure: function (data, type, channelId, token, lc, rc) {
    //todo
    var objLabel = '';
    var adid = (data.isHasSponsorships == 1) ? data.sponsorships.data.adid : data.data.adid;
    var position = (data.isHasSponsorships == 1) ? data.sponsorships.position : data.position;
    var adposition = (data.isHasSponsorships == 1) ? data.sponsorships.abposition : data.abposition;
    var ua = (navigator.userAgent || navigator.vendor || window.opera);
    var p = '';
    if (ua != null) {
      p = (/android/i.test(ua.toLowerCase())) ? 'a' : 'ios';
    }
    var apid = '';
    var tempId = '';
    if (data.adp_type) {
      tempId = data.adp_type;
    } else if (data.sponsorships && data.sponsorships.adp_type) {
      tempId = data.sponsorships.adp_type;
    }
    if (tempId) {
      switch (tempId) {
        case 10 :
          apid = '12355';
          objLabel = (data.adType == 1) ? 1 : 11;
          break;
        case 15 :
          apid = '12451';
          objLabel = (data.adType == 1) ? 5 : 51;
          break;
        case 16 :
          apid = '12452';
          break;
        case 11 :
          apid = '12433';
          objLabel = (data.adType == 1) ? 1 : 11;
          break;
        case 12 :
          apid = '12434';
          break;
        case 13 :
          apid = '12442';
          break;
        case 14 :
          apid = '12441';
          objLabel = (data.adType == 1) ? 1 : 11;
          break;

      }
    }
    var team = {};
    team = commonApi.getNetworkInfo();
    //var param = {
    //  statType: type,
    //  objFrom: 'news',
    //  objFromId: channelId,//this.request_param.channelId,
    //  objType: "ad_" + data.templateType,
    //  objLabel: objLabel,
    //  objId: adid,
    //  token: token,//this.token,
    //  p: p,
    //  u: 5,
    //  reposition: position,
    //  adposition: adposition,
    //  position: position,
    //  lc: lc,//this.lcTime,
    //  rc: Number(rc) + 1,//this.times
    //  newschn: channelId,//this.request_param.channelId,
    //  appchn: '',
    //  scope: '',
    //  apid: apid,
    //  ad_gbcode: '',
    //  net: team.type,
    //  v: commonApi.getAppInfo().version,
    //  t: new Date().getTime(),
    //  h: '',//渠道
    //  gbcode: team.gbcode
    //}
    var url = 'http://pic.k.sohu.com//img8/wb/tj/c.gif?statType=' + type + '&objFrom=news&objFromId=' + channelId + '&objType=' + ("ad_" + data.templateType) + '&objLabel=' + objLabel
      + '&objId=' + adid + '&token=' + token +'&p=' + p +'&u=5&reposition=' + position + '&adposition=' + adposition + '&position=' + position +'&lc='+ lc + '&rc=' + (Number(rc) + 1) + '&newschn='+ channelId
      + '&apid=' + apid + '&net=' + team.type +'&v=' + commonApi.getAppInfo().version + '&t=' + new Date().getTime() + '&gbcode=' + team.gbcode +'&c=' + commonApi.getPrivateInfo().cid;
    ;
    $.ajax({
      type: "get",
      url: url,
      cache: false,
      success: function () {
        // console.log("ok");
      },
      error: function () {
        // console.log("error");
      }
    });
  },

};

module.exports = adCommon;


