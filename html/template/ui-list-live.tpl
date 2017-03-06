<!-- 直播 -->
<div class="ui-list ui-list-live">
  <a href="{{link2 | linkBrowser:link}}">
    <div class="ui-list-title">{{title}}</div>
    <div class="ui-list-img">
      <i class="ui-icon ui-icon-play"></i>
      <img class="lazy" data-original="{{pic | noPicMode:'lgThumb'}}" src="../../images/sm-thumb.png" alt="{{title}}" />
    </div>
    <div class="ui-list-info">
      {{commentNum}}
        <!--22万人参加-->
        <!--<span class="ui-fr">直播</span>-->
    </div>
  </a>
</div>
