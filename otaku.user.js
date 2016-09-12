// ==UserScript==
// @name        otaku
// @namespace   otaku
// @description otakumaker info
// @include     http*://*otakumaker.com/index.php/account/admin/deal/view/*
// @icon        http://otakumaker.com/templates/rt_acacia/favicon.ico
// @updateURL 	https://github.com/rusania/gm_scipts/raw/master/otaku.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/otaku.user.js
// @version     2016.09.12
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==
$('.em_DealInfoRight').append('<div id="info"></div>');
var match = /([0-9]+) Games Only : \$([0-9.]+)/.exec($('.em_DealInfoRight').text());
if(match!=null){
  $('#info').append('<div>支付$' + match[2] + '获得1份游戏(' + match[1] + '个KEY)</div>');
}
var match = /([0-9]+) BUNDLES instead of 1 \( ([0-9]+) keys Games \): \$([0-9.]+)/.exec($('.em_DealInfoRight').text());
if (match != null) {
  $('#info').append('<div>支付$' + match[3] + '获得' + match[1] + '份游戏(' + match[2] + '个KEY)</div>');
}
else{
  alert(2);
}
$('.gantry-width-33').each(function () {
  var title = $(this).find('h3').text();
  var href = $(this).find('a').attr('href');
  match = /app\/(\d+)/.exec(href);
  var id = '0';
  if (match != null) {
    id = match[1];
  }
  $('#info').append('<div id=' + id + '>' + title + '</div>');
  $('#info').append('<div>' + href + '</div>');
});
