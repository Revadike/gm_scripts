// ==UserScript==
// @name        ig_bundle_info
// @namespace   ig_bundle_info
// @description ig_bundle_info
// @include     https://www.indiegala.com/*
// @exclude     https://www.indiegala.com/profile?user_id=*
// @exclude     https://www.indiegala.com/ajaxsale?sale_id=*
// @exclude     https://www.indiegala.com/gift?gift_id=*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/ig_bundle_info.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/ig_bundle_info.user.js
// @version     2016.09.13
// @run-at      document-end
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==
$($('.logo-cont') [0]).replaceWith('<li class="logo-cont"><a id="btn">Info</a></li>');
$('#btn').click(function () {
  var items = $('.bundle_page').find('div.bundle-item-cont-responsive');
  var i = 0;
  var bundle = $(document).attr('title').replace(' of Steam games', '');
  $('.bundle_page').append('<div id="info" style="color:#ffffff"></div>');
  $('.bundle_page').append('<div id="info2" style="color:#ffffff"></div>');
  $('#info').append('<div>&lt;FONT size=2 face=黑体&gt;&lt;P&gt;' + bundle + '&amp;nbsp;慈善包&lt;/P&gt;&lt;P&gt;&lt;FONT color=#ff0000&gt;发货方式为激活码，不包含礼物链接&lt;/FONT&gt;&lt;/P&gt;&lt;P&gt;包含' + items.length + '款STEAM游戏：&lt;/P&gt;&lt;P&gt;<div id="tb"></div>&lt;/P&gt;&lt;/FONT&gt;&lt;P&gt;&lt;/P&gt;</div>');
  $('#info2').append('<div>' + bundle + ' 慈善包上线，前24小时<span id="price"></span>刀可获得完整内容<br>[b]购买地址：<br>' + document.URL + '<br><br>包含' + items.length + '款STEAM游戏：[/b]</div>');
  var tiers = $('.bundle_page').find('div.container');
  var j = 0;
  tiers.each(function () {
    var match = />\$([0-9.]+)</.exec($(this).html());
    if (match) {
      $('#price').empty();
      $('#price').append(match[1]);
      $('#info2').append('<div>[quote][b]支付<b>$' + match[1] + '</b><span id=ag' + ++j + '></span>获得以下游戏：[/b]<br><span id=' + j + '></span>[/quote]</div>');
      if (j > 1) {
        $('#ag' + j).append('再');
      }
    }
    items = $(this).find('div.bundle-item-cont-responsive');
    items.each(function () {
      var title = $(this).find('h3').text();
      var id = /\d+\/(\d+)\.jpg/.exec($(this).find('img').attr('src')) [1];
      $('#tb').append('<div id=tb_' + id + '>' + ++i + '.&amp;nbsp;' + title + '</div>');
      var steam = 'http://store.steampowered.com/app/' + id + '/';
      $('#tb').append('<div>&lt;BR&gt;&lt;FONT color=#0055ff&gt;&amp;nbsp;&amp;nbsp;' + steam + '&lt;/FONT&gt;&lt;BR&gt;</div>');
      $('#' + j).append('<div id=' + id + '>[url=' + steam + ']' + title + '[/url]</div>');
      var url = 'http://steamdb.sinaapp.com/app/' + id + '/data.js?v=34';
      GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (response) {
          var match = /({.*});/.exec(response.responseText);
          if (match) {
            var data = JSON.parse(match[1]);
            if (data.name_cn) {
              $('#' + id).append(' (' + data.name_cn + ')');
              $('#tb_' + id).append(' (' + data.name_cn + ')');
            }
          }
        }
      });
      GM_xmlhttpRequest({
        method: 'GET',
        url: steam + '?l=chinese',
        onload: function (response) {
          var res = $(response.responseText).find('span.game_review_summary');
          if (res.length > 0) {
            var review = $(res[0]).text();
            $('#' + id).append('[color=DeepSkyBlue][b] ' + review + '[/b][/color]');
            $('#tb_' + id).append('&lt;FONT color=#66c0f4&gt;&amp;nbsp;' + review + '&lt;/FONT&gt;');
          }
          var match = /集换式卡牌/.exec($(response.responseText).find('#category_block').text());
          if (match) {
            $('#' + id).append('[color=Red][b] 有卡[/b][/color]');
            $('#tb_' + id).append('&lt;FONT color=#ff0000&gt;&amp;nbsp;有卡&lt;/FONT&gt;');
          }
        }
      });
    });
  });
});
