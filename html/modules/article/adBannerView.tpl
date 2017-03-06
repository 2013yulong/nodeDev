{{if !!ad_image.length }}
    <div class="slice ad2" id="ad2">
    {{if !!ad_click.length && 'NULL_AD' != ad_click}}
        <a href="{{ad_click}}">
    {{else}}
        <a>
    {{/if}}
            <div class="infoTitle">
                <b>{{ad_txt}}</b>
                <span class="score-black adSub" style="padding-right: 0;">广告</span>
            </div>
            <p class="img_ad2"><span class="img_new"><img src="{{ad_image}}"/></span></p>
        </a>
    </div>
{{/if}}