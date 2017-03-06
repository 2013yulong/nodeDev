// video-ad.js
// lite 版视频播放器，用于广告视频播放
// =====================================

'use strict';

var $ = require('zepto');
var UI = require('./core');

var $doc = $(document);

var VideoAd = function(element, options) {
  this.$ele = $(element);
  this.options = $.extend({}, VideoAd.DEFAULT, options);
  this.video = this.$ele[0];
  this.isInit = false;   // 是否初始化过
  this.active = this.options.active;   // 是否正在播放
  this.isPlayed = false; // 是否播放过
  this.isFullscreen = false; // 是否全屏
  this.time = 0; // 正在播放的时间
  this.notVersion = ['4.2.1'];
  this.init();
};

// 默认配置
VideoAd.DEFAULT = {
  active: false,
  type: 'video/mp4'
};


var DEFAULT = {
  loader: '<div class="ui-video-ad-loader"><div class="ui-loader"></div></div>',
  fullscreenTep: [
    '<header class="ui-video-ad-title"></header>',
    '<div class="ui-video-ad-control">',
    '<div class="ui-video-ad-control-box">',
    '<div class="ui-video-ad-control-play"></div>',
    '<div class="ui-video-ad-control-time">00:00</div>',
    '<div class="ui-video-ad-bar">',
    '<div class="ui-video-ad-progress"></div>',
    '<div class="ui-video-ad-buffer"></div>',
    '</div>',
    '<div class="ui-video-ad-control-duration">00:00</div>',
    '<div class="ui-video-ad-control-exit"></div>',
    '</div>',
    '</div>'
  ].join('')
};

var classSet = {
  parent: '.ui-video-ad',
  progress: '.ui-video-ad-progress',
  buffer: '.ui-video-ad-buffer',
  fullscreen: 'ui-video-ad-fullscreen',
  title: '.ui-video-ad-title'
};

// 初始化
VideoAd.prototype.init = function() {
  this.addPoster();
};


// 添加 Poster
VideoAd.prototype.addPoster = function() {
  // 是否初始化过
  if (this.isInit) {
    return;
  }

  var _this = this;
  var poster = this.options.poster;
  var eleWidth = this.$ele.width();
  this.$ele.append(DEFAULT.loader);
  this.$ele.addClass('ui-video-ad-waiting');
  this.$loader = this.$ele.find('.ui-video-ad-loader');

  UI.utils.imgLoad(poster, function(img) {
    var scale = eleWidth / img.width;

    _this.width = eleWidth;
    _this.height = parseInt(img.height * scale);

    // 设置父级宽高
    _this.$ele.css({
      width: _this.width,
      height: _this.height
    });

    _this.toggleLoader(false);
    _this.addVideo();
  });
};


// 添加 video
VideoAd.prototype.addVideo = function() {
  if (this.isInit) {
    return;
  }

  var _this = this;
  var $ele = this.$ele;
  var source = this.options.source;
  var video = [
    '<img class="ui-video-ad-poster" src="'+ this.options.poster +'" />',
    '<div class="ui-video-ad-player"></div>',
    '<video preload="none" -webkit-playsinline="true" x-webkit-airplay="true" width="1" height="1"',
    'poster="' + this.options.poster + '"',
    '>',
    '<source src="' + this.options.source + '" type="' + this.options.type + '" />',
    '您的 App 不支持 Video 标签</video>',
    '<div class="ui-video-ad-bar ui-video-ad-sm">',
    '<div class="ui-video-ad-progress"></div>',
    '<div class="ui-video-ad-buffer"></div>',
    '</div>'
  ].join('');

  $ele.append(video);

  this.$player = $ele.find('.ui-video-ad-player');
  this.$poster = $ele.find('.ui-video-ad-poster');
  this.$video = $ele.find('video');
  this.video = this.$video[0];
  this.$smBar = $ele.find('.ui-video-ad-sm');
  this.$smProgress = this.$smBar.find('.ui-video-ad-progress');
  this.$smBuffer = this.$smBar.find('.ui-video-ad-buffer');

  this.progress();
  this.events();
  this.isInit = true;
  this.toggleLoader(false);
};


// 切换 loader
VideoAd.prototype.toggleLoader = function(bool) {
  bool ? this.$ele.addClass('ui-video-ad-waiting')
    : this.$ele.removeClass('ui-video-ad-waiting');
};


// 是否播放过
VideoAd.prototype.played = function() {
  if (this.isPlayed) {
    return;
  }

  this.toggleLoader(true);

  this.$video.css({
    width: this.width,
    height: this.height
  });

  this.$poster.remove();
  this.isPlayed = true;
};

// 播放
VideoAd.prototype.play = function() {
  this.played();
  this.video.startTime = this.time;
  this.video.play();
  this.active = true;

  if (this.isFullscreen) {
    this.hideControl();
  }

  console.log('play');
};

// 暂停
VideoAd.prototype.pause = function() {
  this.video.pause();
  this.active = false;
  this.time = this.video.currentTime;

  if (this.isFullscreen) {
    this.showControl();
  }

  $(this).trigger('close:videoAd:ui');
};

// 进度条
VideoAd.prototype.progress = function(duration, currentTime) {
  var bufferPercentage = getPercentage(getEnd(this.video), duration);
  var progressPercentage = getPercentage(currentTime, duration);
  var $time;
  var $duration;

  this.$smBuffer.css('width', bufferPercentage);
  this.$smProgress.css('width', progressPercentage);

  // 是否全屏
  if (this.isFullscreen) {
    this.$lgBuffer.css('width', bufferPercentage);
    this.$lgProgress.css('width', progressPercentage);

    $time = this.$control.find('.ui-video-ad-control-time');
    $duration = this.$control.find('.ui-video-ad-control-duration');

    $time.html(transformTime(currentTime));
    $duration.html(transformTime(duration));
  }

  /**
   * 转换时分秒
   * @param time
   * @returns {string}
   */
  function transformTime(time) {
    var h = parseInt(time / 3600);
    var m = parseInt((time - h * 3600) / 60);
    var s = parseInt(time - h * 3600) % 60;

    if (m < 9) {
      m = '0' + m;
    }

    if (s < 9) {
      s = '0' + s;
    }

    return m + ':' + s;
  }

  /**
   * 获取视频已经下载的时长
   * @param video
   * @returns {number}
   */
  function getEnd(video) {
    var end = 0;
    try {
      end = video.buffered.end(0) || 0;
      end = parseInt(end * 1000 + 1) / 1000;
    } catch(e) {

    }
    return end;
  }

  /**
   * 进度条百分比
   * @param number
   * @param total
   * @returns {string}
   */
  function getPercentage(number, total) {
    return parseInt(number / total * 100) + '%';
  }
};

// 绑定事件
VideoAd.prototype.events = function() {
  var _this = this;

  // 点击播放按钮
  this.$ele.on('click.videoAd.ui', function() {
    _this.active ? _this.pause() : _this.play();
  });

  // 获取时间
  this.$video.on({
    // 获取视频总时长
    durationchange: function() {
      if (_this.video.readyState > 0) {
        _this.duration = _this.video.duration;
      }
    },
    // 进度条更新
    timeupdate: function() {
      _this.progress(_this.duration, _this.video.currentTime);
    },

    // 等待数据
    waiting: function() {
      _this.toggleLoader(true);
    },

    // 设置 error
    error: function() {
      _this.$parent.addClass('ui-video-ad-error');
    },

    // 播放
    canplaythrough: function() {
      _this.toggleLoader(false);
    },
    pause: function() {
      _this.$ele.removeClass('ui-active');
      _this.toggleLoader(false);
    },

    play: function() {
      var $this = $(this);
      var id = $this.parents('.ad_id').attr('id');
      var network = commonApi.getNetworkInfo().type;

      $(this).trigger('open:videoAd:ui');

      _this.$ele.addClass('ui-active');
      _this.toggleLoader(false);

      if (network === 'none') {
        _this.pause();
        widgetApi.toast("暂时无法连接网络", "warn");
        return;
      }

      // 非 wifi 和无网络
      if (network !== 'wifi' && network !== 'none') {
        if ($.isNoWifi) return;
        _this.pause();
        widgetApi.showNotifyDialog('非WiFi网络下播放视频将会消耗很多流量', '', 'warn', '继续播放', '取消', {videoId: id});
      }
    },

    // 播放结束
    ended: function() {
      _this.video.startTime = 0;
      _this.video.currentTime = 0;
      _this.time = 0;
      _this.toggleLoader(false);
      _this.pause();
      _this.showControl();
    }
  });
};

// 隐藏控制条
VideoAd.prototype.hideControl = function() {
  this.$ele.addClass('ui-video-ad-hide-control');
  this.controlBar = false;
};

// 显示控制条
VideoAd.prototype.showControl = function() {
  this.$ele.removeClass('ui-video-ad-hide-control');
  this.controlBar = true;
};

// 全屏
VideoAd.prototype.enterFullscreen = function() {
  var _this = this;
  var title = this.options.title;
  var $ele = this.$ele;
  var $play;
  var $exit;
  var timer;

  //this.played();
  if (!this.isPlayed) {
    this.$poster.remove();
    this.isPlayed = true;
  }

  // native 横竖屏切换
  if (window.channelApi) {
    channelApi.fullScreen(true);
  }
  // 添加 window 对象存储 全屏的对象
  window.$videoFullscreen = this.$ele;

  $ele.addClass(classSet.fullscreen);

  if (!this.fullscreened) {
    $ele.append(DEFAULT.fullscreenTep);
    $ele.find(classSet.title).html(title);
  }

  this.$control = $ele.find('.ui-video-ad-control');
  this.$lgBuffer = this.$control.find('.ui-video-ad-buffer');
  this.$lgProgress = this.$control.find('.ui-video-ad-progress');
  $play = $ele.find('.ui-video-ad-control-play');
  $exit = $ele.find('.ui-video-ad-control-exit');

  // 设置 video 宽高
  var widthAndHeight = {
    width: '100%',
    height: '100%'
  };

  this.$ele.css(widthAndHeight);
  this.$video.css(widthAndHeight);

  // 绑定事件
  this.$control.on('click', function(event) {
    event.stopPropagation();
  });

  $play.on('click', function() {
    _this.play();
  });

  $exit.on('click', function() {
    _this.exitFullscreen();
  });

  // 定时隐藏控制条
  clearTimeout(timer);
  timer = setTimeout(function() {
    _this.hideControl();
  }, 2000);

  this.fullscreened = true;
  this.isFullscreen = true;
};


// 退出全屏
VideoAd.prototype.exitFullscreen = function() {

  // native 横竖屏切换
  if (window.channelApi) {
    channelApi.fullScreen(false);
  }
  //添加 window 对象存储 全屏的对象
  window.$videoFullscreen = null;

  var widthAndHeight = {
    width: this.width,
    height: this.height
  };

  this.$ele.css(widthAndHeight);
  this.$video.css(widthAndHeight);

  this.isFullscreen = false;
  this.$ele.removeClass('ui-video-ad-fullscreen');
};


// native 返回按键退出全屏
function exitFullscreen() {
  if (!window.$videoFullscreen) {
    return;
  }

  window.$videoFullscreen.videoAd('exitFullscreen');
}

/**
 * 新的 webview 或退出 webview 执行下
 */
function videoAdPause() {
  $('[data-ui-video-ad]').pause();
}


window.exitFullscreen = exitFullscreen;
window.videoAdPause = videoAdPause;

// VideoAd Plugin
function plugin(option) {
  return this.each(function() {
    var $this = $(this);
    var data = $this.data('ui.video-ad');
    //var options = typeof option === 'object' && option;
    var options = $.extend({}, UI.utils.parseOptions($this.data('ui-video-ad')),
      $.isPlainObject(option) && option);

    if (!data) {
      $this.data('ui.video-ad', (data = new VideoAd(this, options)));
    }

    if (typeof option == 'string') {
      data[option]();
    }
  });
}



// add VideoAd plugin
$.fn.videoAd = plugin;

// Init
$(function() {
  $('[data-ui-video-ad]').videoAd();
});


VideoAd.VERSION = '1.0.0';
// exports
module.exports = VideoAd;

// TODO: 添加自定义事件
//      错误后刷新
