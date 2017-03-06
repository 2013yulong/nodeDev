<!-- 相关段子 begin -->
<div class="gallery relevance-joke">
  <h3>相关</h3>
  {{each recommendNews}}
  <div class="slice short" data-newsId="{{$value.newsId}}">
    <a href="{{$value.link}}">
      <p class="content">
        <span class="words" data-remainText="{{$value.remainText}}">
          {{$value.content}}
        </span>
        <span class="img-icon"></span>
        <!--111{if $value.remainText} 需求变更，该按钮一直显示-->
        <span class="btn"></span>
        <!--{/if}-->
      </p>
    </a>
    {{if $value.pics[0]}}
    <p class="pic"><img src="{{$value.pics[0]}}"></p>
    {{/if}}
    {{if $value.hotComment && $value.hotComment[0]}}
    <p class="cmt cmt-joke">
      <span class="name">{{$value.hotComment[0].author}}：</span>
      {{$value.hotComment[0].content}}
    </p>
    {{/if}}
    <p class="switch">
      <span class="text">展开</span>
      <span class="btn"></span>
    </p>
    <div class="bottom">
      <span class="good_essay">
        <span class="good_1">+1</span>
        <span class="evaluate_cont">{{$value.newsHotCount}}</span>
        <span class="good_count"></span>
      </span>
      <span class="cmt-link">
        <a href="{{$value.link}}&newstype=62&goCmt"><i></i>{{$value.commentCount}}</a>
      </span>
      <span class="right">
        <span class="joke">段子</span>
        <span class="more"></span>
      </span>
    </div>
    <div class="more-op">
      <div class="mask"></div>
      <div class="panel">
        <div class="btn btn4">
          <div class="pic"></div>
          <div class="word collect">举报</div>
        </div>
        <div class="btn btn1">
          <div class="pic"></div>
          <div class="word collect">收藏</div>
        </div>
        <div class="btn btn2">
          <div class="pic"></div>
          <div class="word collect">分享</div>
        </div>
        <div class="btn btn3">
          <div class="pic"></div>
          <div class="word collect">不感兴趣</div>
        </div>
        <div class="close"></div>
      </div>
    </div>
  </div>
  {{/each}}
</div>
<!-- 相关段子 end -->
