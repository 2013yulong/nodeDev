<!--视频新闻-->
<div class="ui-list ui-list-tv">
  <a href="{{link2 | linkBrowser:link}}">
    <div class="ui-list-img">
      <i class="ui-icon ui-icon-play"></i>
      <img class="lazy" data-original="{{pic | noPicMode:'lgThumb'}}" src="../../images/sm-thumb.png" alt="{{title}}" />
    </div>
    <div class="ui-list-body">
      <div class="ui-list-title">{{title}}</div>
      <div class="ui-list-info">
          <i class="ui-icon ui-icon-talk"></i>
          {{commentNum}}
      </div>
    </div>
  </a>
</div>
