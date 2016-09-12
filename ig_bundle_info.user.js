// ==UserScript==
// @name        ig_bundle_info
// @namespace   ig_bundle_info
// @description ig_bundle_info
// @include     https://www.indiegala.com/*
// @exclude     https://www.indiegala.com/profile?user_id=*
// @exclude     https://www.indiegala.com/ajaxsale?sale_id=*
// @exclude     https://www.indiegala.com/gift?gift_id=*
// @updateURL 	https://github.com/rusania/gm_scipts/raw/master/ig_bundle_info.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/ig_bundle_info.user.js
// @version     2016.09.12
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==
$($('.logo-cont') [0]).replaceWith('<li class="logo-cont"><a id="info">Info</a></li>');
$('#info').click(function () {
  var items = $('.bundle_page').find('div.bundle-item-cont-responsive');
  var i = 1;
  var bundle = $(document).attr('title').replace(' of Steam games', '');
  $('.bundle_page').append('<tr><td>&lt;FONT size=2 face=黑体&gt;&lt;P&gt;' + bundle + '&amp;nbsp;慈善包&lt;/P&gt;&lt;P&gt;包含' + items.length + '款STEAM游戏：&lt;/P&gt;</td></tr>');
  $('.bundle_page').append('<tr><td>&lt;P&gt;</td></tr>');
  items.each(function () {
    var title = $(this).find('h3').text();
    var card = '';
    if ($(this).find('strong').length > 0) {
      card = '有卡';
    }
    var app = /\d+\/(\d+)\.jpg/.exec($(this).find('img').attr('src')) [1];
    $('.bundle_page').append('<tr><td>' + i++ + '.&amp;nbsp;' + title + '&lt;FONT color=#ff0000&gt;&amp;nbsp;' + card + '&lt;/FONT&gt;&lt;BR&gt;&lt;FONT color=#0055ff&gt;&amp;nbsp;&amp;nbsp;http://store.steampowered.com/app/' + app + '/&lt;/FONT&gt;&lt;BR&gt;</td></tr>');
  });
  $('.bundle_page').append('<tr><td>&lt;/P&gt;&lt;/FONT&gt;&lt;P&gt;&lt;/P&gt;</td></tr>');
});
