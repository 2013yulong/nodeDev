var $ = require('zepto');

if (typeof $ === 'undefined') {
  throw new Error('NewsSDK H5 page requires zepto please');
}
var newsMedia = {
  articleMedia: function(data) {
    //音频
    if ('undefined' != typeof data["audios"] && 'undefined' != typeof data['audios'][0] && typeof data['audios'][0].id != 'undefined') {
      var audioSrc = [],
        audioId = [];
      for (var i = data['audios'].length - 1; i >= 0; i--) {
        // console.info('--0201-'+i);
        audioSrc[i] = data['audios'][i].url; //'http://941ce33b.sohunewsclient.scscdn.sohucs.com/news/2015/01/30/1422608260686.mp3';
        audioId[i] = 'audio' + data['audios'][i].id.toString();
        var audioTime = data['audios'][i].playTime;

        audioTime = (Math.floor(audioTime / 60) < 10 ? '0' + Math.floor(audioTime / 60) : Math.floor(audioTime / 60)) + ': ' + (audioTime % 60 < 10 ? '0' + audioTime % 60 : audioTime % 60);
        var audioDesc = data["audios"][i].description;
        var audioData = '<div class="JsTopAudio audio-controls" data-src="' + audioSrc[i] + '" data-id="' + audioId[i] + '" >' + audioTime + '<i class="soud"></i><span class="desc">' + audioDesc + '</span></div>';
        // $('.article-text').html($('.article-text').html().replace(/<p><sohuaudio_\w+><sohuaudio_\w+\/><\/p>/, "<p class='audioPlay'></p>"));//{{imagetag}}
        $('.audioPlay').append(audioData);
      }
    }
    // },
    // //视频
    // articleVideo : function(data){
    if ('undefined' != typeof(data["tvInfos"]) && 'undefined' != typeof(data['tvInfos'][0])) {
      var $tvInfo = $('.tvInfoPlayer'); //$('#sohu_player');//
      var videoOpenNative = function(element, dataObj) {
        var posInfo = {
            x: 14,
            y: element.offset().top,
            width: element.width(),
            height: element.height(),
          }
          // newsApi.onClickVideo(x, y, width, height);
        mediaApi.playVideo(posInfo, dataObj);
        console.log('video playing');
        console.dir(posInfo);
        console.dir(dataObj);
      };
      var h2w = 0.8; //!!data['pixel'] ? data['pixel'].winH/data['pixel'].winW :
      for (var i = data['tvInfos'].length - 1; i >= 0; i--) {
        $tvInfo.eq(i).removeClass('displayNone'); //console.log('--0621--h2w--:'+h2w);
        // if (!!t.newsMainApp()) {
        var video_poster = data['tvInfos'][i].tvPic; // ? data["tvInfos"][0].tvPic : 'http://k.sohu.com/static/img/holderLogo2.jpg'
        var videoDom = '<div class="video_poster" ><img class="poster" src="' + video_poster + '">' //data-pos='+i+'
          + '<span class="mid_play" ><img src="../../images/video_play.png"></span>' + '</div>';
        $tvInfo.eq(i).append(videoDom); //sohu_play
        // var h2w = 0.775;//console.log(data)
        $tvInfo.eq(i).height(adMaxWidth * h2w);
        $tvInfo.eq(i).data('pos', i);
        //给poster赋值
        // setTimeout(function(){$tvInfo.find('.poster').css('width','auto').css('height',adMaxWidth*h2w);},10);
        if (!$('.noImgMode') && !!$('.video_poster img').attr('src')) {
          setTimeout(function() {
            $tvInfo.eq(i).css('background', '#f1f1f1!important');
          }, 150);
        }
      }
      $tvInfo.on('click', function(e) {
        e.preventDefault();
        var n = $(this).data('pos');
        videoOpenNative($(this), data['tvInfos'][n]);
      });
      // //----1个视频结束
    }
    //视频包框

    var tvAdInfoShowType = data['tvAdInfoShowType'];
    if ('undefined' != typeof(data['tvAdInfos']) && 'undefined' != typeof(data['tvAdInfos'][0]) && 'undefined' != typeof data['tvAdInfos'][0].id && 2 != tvAdInfoShowType) {
      var $adInfo = $('.adInfoPlayer');
      var sohuVideo = commonApi.getPackageInfo('com.sohu.sohuvideo');

      var videoPng = !!sohuVideo ? data['tvAdInfos'][0].iconOpen : data['tvAdInfos'][0].iconDownload;
      var videoLoad = ''; //data['tvAdInfos'][0].download; //"/h5apps/newssdk.sohu.com/images/down.png"
      var $pack = [
        '<div class="authorContainer jumpToSohuTv clkstat" objType="h5_2">',
        '<a href="' + videoLoad + '">',
        '<img src="' + videoPng + '"alt="" class="authorLogo1 al2 left">',
        '</a>',
        '</div>'
      ].join('');
      if (1 == tvAdInfoShowType) {
        for (var i = data['tvAdInfos'].length - 1; i >= 0; i--) {
          $adInfo.eq(i).data('pos', i);
          $adInfo.eq(i).append($pack);
        }
      } else {
        $adInfo.eq(0).data('pos', 0);
        $adInfo.eq(0).append($pack);
      }
      $adInfo.on('click', function(e) {
        e.preventDefault();
        var n = $(this).data('pos');
        var videoPackageName = !!data['tvAdInfos'][n].packageName ? data['tvAdInfos'][n].packageName : 'com.sohu.sohuvideo';
        newsApi.openAdsInfo(videoPackageName, data['tvAdInfos'][n].version, data['tvAdInfos'][n].download);
      });
    }

  },
  audioBind: function() { //audioSrc, audioId
    $(document).on('click', '.JsTopAudio', function(e) {
      e.stopPropagation();
      var $jsTopAudio = $('.JsTopAudio');
      var audioSrc = $jsTopAudio.attr('data-src');
      var audioId = $jsTopAudio.attr('data-id');

      $jsTopAudio.attr('id', audioId); //.attr('data-stat.audiotus','play')
      // if ('undefined' != typeof mediaApi) {// && 'undefined' != typeof mediaApi.jsCallAudioPlay
      mediaApi.jsCallAudioPlay(audioSrc, audioId); //播放完毕时，需返回值。
      // } else {
      //   newsApi.jsCallAudioPlay(audioSrc, audioId);//播放完毕时，需返回值。
      // }
    });
  },
  mediaInit: function() {
    newsMedia.audioBind();
    // newsMedia.videoBind();
    //音频动画播放控制
    window.onAudioStateChanged = function(num, id) {
      console.log(num, id);
      //todo 完善动画
      if (num && id) {
        switch (num) {
          case 1:
            //动画开始播放
            $('#' + id).attr('data-status', 'play');
            break;
          case 2:
            //动画停止播放
            $('#' + id).attr('data-status', 'pause');
            break;
          case 3:
            //动画停止播放
            $('#' + id).attr('data-status', 'pause');
            widgetApi.toast("播放遇到错误", "warn");
            break;
        }
      }
    }
  }
};


module.exports = newsMedia;