
{{if gallery.length>0}}
   {{each gallery as item key}}
        <p class="hasImg">
            <span class="img_new lazy" data-src="{{item.pic}}" data-width="{{item.width}}" data-height="{{item.height}}" style="{{item | imgWH }}">
            	<img data-original="{{item.pic}}" onclick="magnifyImage('{{item.pic}}','')" class="hasImg_image hasImg_image_1 lazy"/>
            </span>
        </p>
        <p class="imgDesc">{{item.abstract}}</p>
   {{/each}}
{{/if}}
{{content}}
{{if !!from}}
<div class="originFrom" id="origin_from">来源：{{from}}</div>
{{/if}}
