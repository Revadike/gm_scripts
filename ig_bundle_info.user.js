// ==UserScript==
// @name        ig_bundle_info
// @namespace    http://tampermonkey.net/
// @description ig_bundle_info
// @include     https://www.indiegala.com/*
// @exclude     https://www.indiegala.com/profile?user_id=*
// @exclude     https://www.indiegala.com/ajaxsale?sale_id=*
// @exclude     https://www.indiegala.com/gift?gift_id=*
// @updateURL 	https://github.com/rusania/gm_scipts/raw/master/ig_bundle_info.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/ig_bundle_info.user.js
// @version     2016.09.07
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==

$('.logo-cont').replaceWith('<li class="logo-cont"><a id="info">Info</a></li>');
$('#info').click(function(){
  var items = $('.bundle_page').find('div.bundle-item-cont-responsive');
  items.each(function(){
    var title = $(this).find('h3').text();
    $('.bundle_page').append('<tr><td>'+title+'&lt;&gt;</td></tr>');
  });
});