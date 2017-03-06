{{each commentList as item index}}
    {{if index<20}}
        <div class="cmt"  data-pid="{{item.pid}}"  data-ctime="{{item.ctime}}" data-commentid ="{{item.commentId}}">
            <div class="cmtImg prlink" data-pid="{{item.pid}}" data-ctime="{{item.ctime}}" data-commentid ="{{item.commentId}}" data-eghomepage = "{{item.egHomePage}}">
                {{if item.authorimg && item.authorimg !=""}}
                <img data-original="{{item.authorimg}}" src="../../images/head.jpg" class="lazy">
                {{else}}
                <img src="../../images/head.jpg" class="lazy">
                {{/if}}
            </div>
            <div class="cmtT">
                <div class="praise-box">
              <div class="praise-num"><b>
              {{if item.digNum==0}}
              {{else}}
              {{item.digNum}}
              {{/if}}
              </b></div>
              <div id="zan" class="commentBoxAll opt up"></div>
            </div>
                <p class="nm prlink" data-pid="{{item.pid}}" data-ctime="{{item.ctime}}" data-commentid ="{{item.commentId}}" data-eghomepage = "{{item.egHomePage}}">{{item.author}}</p>
            </div>
            <p class="info prlink" data-pid="{{item.pid}}" data-ctime="{{item.ctime}}" data-commentid ="{{item.commentId}}" data-eghomepage = "{{item.egHomePage}}">
                <span class="time ">{{if item.ntime}}{{item.ntime}}{{else}}刚刚{{/if}}</span>
                <span class="addr">{{item.city}}</span>
            </p>
            {{if item.floors && item.floors.length>0}}
            <div class="floors">
              {{each item.floors as item index }}
                {{if index == 5}}
                <div class="cmt-flo-more-btn">展开隐藏评论</div>
                {{/if}}
              {{if index >= 5}}
              <div class="cmt-flo-more">
              {{/if}}
              <div class="cmt-user">
              <p class="info prlink" data-pid="{{item.pid}}" data-ctime="{{item.ctime}}" data-commentid ="{{item.commentId}}" data-eghomepage = "{{item.egHomePage}}">
                <span>{{item.author}}</span>
                {{if item.city && item.city!=""}}
                <span>({{item.city}})</span>
                {{/if}}
                <span class="num">{{index+1}}</span>
              </p>
              <p class="floors-content flcmt cmtC" data-ctime="{{item.ctime}}" data-commentid ="{{item.commentId}}" data-dignum = {{item.digNum}}>
                {{item.content | parseComment}}
              </p>
              <p class="cmtC-add">查看更多</p>
              {{if item.audUrl}}
              <!-- <p class="floors-content flcmt" data-ctime="{{item.ctime}}" data-commentid ="{{item.commentId}}" data-dignum = {{item.digNum}}> -->
                <div class="JsAudio audio-controls vinfo" data-src="{{item.audUrl}}" data-ctime="{{item.ctime}}" data-pid="{{item.pid}}">
                  {{item.audLen | parseToSec}}
                  <i class="soud vcmt"></i>
                </div>
              <!-- </p> -->
              {{/if}}
              {{if item.imageSmall}}
              <P class="cmt-p-img"><span class="flcmt" data-dignum = {{item.digNum}}></span><span class="cmt_img"><img class="comimg" data-big="{{item.imageBig}}"  data-small="{{item.imageSmall}}" src="{{item.imageSmall}}"/></span></P>
              {{/if}}
              </div>
              {{if index >= 5}}
                </div>
              {{/if}}
              {{/each}}
            </div>
            {{/if}}
            <p class="cmtC cmtList">{{item.content | parseComment}}</p>
            <p class="cmtC-add">查看更多</p>
            {{if item.audUrl}}
            <p class="cmtC">
              <span class="cmtList"></span>
              <span class="JsAudio audio-controls vinfo" data-src="{{item.audUrl}}"  data-ctime="{{item.ctime}}" data-pid="{{item.pid}}">
                {{item.audLen | parseToSec}}
                <i class="soud vcmt"></i>
              </span>
            </p>
            {{/if}}
            {{if item.imageSmall}}
             <P class="cmt-p-img"><span class="cmtList"></span><span class="cmt_img"><img class="comimg" data-big="{{item.imageBig}}"  data-small="{{item.imageSmall}}" src="{{item.imageSmall}}"/></span></P>
            {{/if}}

        </div>
    {{/if}}
{{/each}}
