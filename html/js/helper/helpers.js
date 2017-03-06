// template-helpers.js
// tmodjs helper
// =================================

var UI = require('components');
var template = require('tmodjs-loader/runtime');
var util = require('util');

/**
 * 扩展artempalte模板过滤方法,转换10000变成文字"万"
 * @param {Int} value
 * @return {String}
 */

template.helper('parseNum', function (value) {
  var _val = "";
  if (value > 10000) {
    _val = (parseInt(value) / 10000).toFixed(1) + "万";
  } else {
    _val = value;
  }
  return _val;
});
/**
 * gallery.Do //图片高度
 */
template.helper('imgWH', function (data) {
  //adMaxWidth
  var picWidth = $(window).width()-28,
      _width = data.width,
      _height = data.height,
      style = '';
  picWidth = picWidth > _width ? _width : picWidth;
  var picNowHeight = Math.round(parseInt(_height * picWidth / _width));
  style = 'width:' + picWidth + 'px;height:' + picNowHeight + 'px;';
  return style;
});
/**
 * 评论过滤,将评论中的表情替换成图片
 * @param {String} content
 * @return {String} content
 */

template.helper('parseComment', function (content) {
  var comment = content.replace(/\[(蜡烛|拉花|握手|足球|吃惊|加油|汗|奋斗|委屈|强|流汗|浮云|爱你|伤心|奖杯|赞|啤酒|哭|心|生气|睡觉|闭嘴|微笑|大哭|大笑|鲜花)\]/g,'<img src="../../images/emotion/$1.png"/>');//replace(/\[([^\]]+)\]/g, '<img class="cmtCimg" src="../../images/emotion/$1.png"/>');
  return comment;
});

/**
 * 取余
 */
template.helper('remainder', function (index) {
  return index % 4;
});
/**
 * 过滤美图/奇趣photo协议转news打开新闻
 * @param {String} link
 * @return {String}
 */
template.helper('linkChange', function (link) {
  var _val = link.replace(/photo/gi, 'news');
  return _val;
});

/**
 * 过滤直播人数显示,转换10000变成文字"万人参与"
 * @param {Int} value
 * @return {String} "万人参与"
 */
template.helper('parseNumLive', function (value) {
  var _val = "";
  if (value > 10000) {
    _val = (parseInt(value) / 10000).toFixed(1) + "万人参与";
  } else {
    _val = value;
  }
  return _val;
});

// for search page
template.helper('keyWordTit', function (value) {
  return value;
});


// for newsLive and live
template.helper('parseToDate', function (time) {
  return util.getLocalTime(time, "MM/dd");
});

// for newsLive and live
template.helper('parseToTime', function (time) {
  return util.getLocalTime(time, "HH:mm");
});

// for dirct live
template.helper('parseToMinute', function (time) {
  return util.getLocalTime(time, "mm:ss");
});

//录音秒数固定模式
template.helper('parseToSec', function (time) {
  var ttime;
  var timer = parseInt(time);
  console.log(timer);
  if (timer < 10) {
    ttime = '00:0' + time;
  } else if (timer >= 10 && timer < 60) {
    ttime = '00:' + timer;
  } else {
    ttime = '01:00';
  }
  console.log(ttime);
  return ttime;
});

//for yyyy/MM/dd
template.helper('parseToYear', function (time) {
  return util.getLocalTime(time, 'yyyy/MM/dd');
});

// for newsLive and live
template.helper('scoreRed', function (score) {
  var _score = score.match(/-/g);
  var _vs = score.match(/vs/gi);
  var _text = "";
  var teamName = score.split(" ");
  if (_score) {
    _text = score.replace(/-/g, ':');
  }
  else if (_vs) {
    _text = score.replace(/vs/gi, '<span class="score-red">VS</span>');
  } else {
    _text = score;
  }
  return _text;
});

/**
 * encodeURI
 * @param {String} uri
 * @return {String}
 */
template.helper('encodeURI', function (uri) {
  var _uri = encodeURI(uri);
  return _uri;
});

/**
 * 无图模式 不传入图片，body 添加 ui-nopic
 */
// todo: 考虑使用一张图片
template.helper('noPicMode', function (img, lgThumb) {
  var path = '{noPicMode}';

  if (window.noPicMode || img === '' || img === null) {
    // header 大号占位图
    if (lgThumb === 'lgThumb') {
      if (window.nightMode) {
        return path + 'images/night-lg-thumb.png';
      }

      return path + 'images/lg-thumb.png';
    }
    // 默认占位图
    return path + 'images/thumpHolder.jpg';
  }

  return img;
});


/**
 * link2 2代协议 native 环境
 * link http 协议 browser 环境
 */
template.helper('linkBrowser', function (link2, link) {
  if (window.ENV === 'browser' && window.platform !== 'iOS') {
    return link;
  }

  return link2;
});

/**
 * 搜索helper
 * @type {a|exports|module.exports}
 */
template.helper('starWidth', function (value) {
  var _val = "";
  _val = parseInt(value) * 20 + '%';
  return _val;
});

template.helper("parseBool", function (val) {
  var _val;
  if (typeof val === 'boolean') {
    _val = val.toString();
  }
  return _val;
});


template.helper('markKeyWordTit', function (value) {
  var newStr = value;
  var keyWord = window.sessionStorage.getItem('redWords').split(',');
  for (var len = keyWord.length, i = len - 1; i >= 0; i--) {
    var reg = new RegExp(keyWord[i], 'g');
    newStr = newStr.replace(reg, function (s) {
      return '<span class="hot">' + s + '</span>';
    });
  }
  return newStr;
});

template.helper('keyWordTit', function (value) {
  return keyWord;
});
////标记关键字
//template.helper('markKeyWordTit', function (value) {
//  var newStr = '';
//  var reg = new RegExp(keyWord, 'g');
//  return newStr = value.replace(reg, function (s) {
//    var tmp = '';
//    for (var i = 0; i < s.length; i++) {
//      tmp = '<span class="hot">' + s + '</span>';
//    }
//    return tmp;
//  });
//});
//
//template.helper('keyWordTit', function (value) {
//  return keyWord;
//});
/**
 * 段子频道模板截取内容字符数
 */
template.helper('subContent', function (content) {
  var cont = content.replace(/\s/g, "");
  if (content.length > 48) {
    cont = content.substring(0, 48) + '...';
  }
  return cont;
});
/**
 * 段子频道模板点赞数转义
 */
template.helper('parsePos', function (pos) {
  pos = parseInt(pos);
  if (pos > 10000) {
    var temp = pos / 10000;
    pos = parseFloat(temp).toFixed(1) + '万';
  }
  return pos;
});
template.helper('toJokeCom', function (uri) {
  var _uri = encodeURI(uri) + '&goCmt';
  return _uri;
});
template.helper('redPackShortTime', function (time) {
  return time.split(' ')[0];
  // return time;
});

module.exports = template;
