<!--有 pic 字段 ？图片新闻 ：文本新闻-->
<!--isHasTV == 1 为 视频新闻-->
<!--图文新闻-->
<!-- 文字 -->
<!--视频新闻-->
<div class="ui-list{{if pic}}
    ui-list-thumb
  {{else}}
    ui-list-text
  {{/if}}">
  <a href="{{link2 | linkBrowser:link}}">
    {{if pic}}
      <div class="ui-list-img">
        {{if isHasTV == 1}}
          <i class="ui-icon ui-icon-play"></i>
        {{/if}}
        <img class="lazy" data-original="{{pic | noPicMode:''}}" src="../../images/replace.png" alt="{{title}}" />
      </div>
    {{/if}}
    <div class="ui-list-body">
      <div class="ui-list-title">{{title}}</div>
      <div class="ui-list-info">
        {{if newsType == 9}}
          <span class="ui-list-talk">
            {{if commentNum != 0}}
              {{if commentNum}}
                {{commentNum}} 人参与
              {{/if}}
            {{/if}}
          </span>
        {{else}}
          <span class="ui-list-talk">
            <i class="ui-icon ui-icon-talk"></i>
            {{if commentNum != 0}}{{commentNum}}{{/if}}
          </span>
        {{/if}}
        <!--{{if picNum != 0}}-->
          <!--<span class="ui-list-talk"><i class="ui-icon ui-icon-pic"></i>{{picNum}}</span>-->
        <!--{{/if}}-->
        {{if media}}
          <span class="ui-list-origin">{{media}}</span>
        {{/if}}

        {{if newsType == 9}}
          <span class="ui-fr">互动直播</span>
        {{/if}}
        {{if newsType == 10}}
          <span class="ui-fr">专题</span>
        {{/if}}
        {{if newsType == 12}}
          <span class="ui-fr">投票</span>
        {{/if}}
        {{if newsType == 32}}
          <span class="ui-fr">期刊</span>
        {{/if}}
      </div>
    </div>
  </a>
</div>
