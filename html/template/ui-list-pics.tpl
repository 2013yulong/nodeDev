<!-- 组图新闻 -->
<div class="ui-list ui-list-pics">
  <a href="{{link2 | linkBrowser:link}}">
    <div class="ui-list-title">{{title}}</div>
    <div class="ui-list-body">
      {{each pics as pic index}}
        <div class="ui-list-imgs">
          <img class="lazy" data-original="{{pic | noPicMode:'lgThumb'}}" src="../../images/replace.png" alt="{{title}}"/>
        </div>
      {{/each}}
    </div>
    <div class="ui-list-info">
      <span class="ui-list-talk"><i class="ui-icon ui-icon-talk"></i>{{commentNum}}</span>
      {{if picNum != 0}}
      <span class="ui-list-talk"><i class="ui-icon ui-icon-pic"></i>{{picNum}}</span>
      {{/if}}
    </div>
  </a>
</div>
