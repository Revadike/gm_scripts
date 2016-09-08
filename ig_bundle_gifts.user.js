// ==UserScript==
// @name        ig_bundles_link
// @namespace    http://tampermonkey.net/
// @description ig bundles new window links
// @include     https://www.indiegala.com/profile?user_id=*
// @icon        http://www.indiegala.com/favicon.ico
// @updateURL 	https://github.com/rusania/gm_scipts/raw/master/ig_bundles_link.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/ig_bundles_link.user.js
// @version     2016.09.08
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==
$('.nav-toggle').each(function () {
  var match = /#current_sale_(\d+)/.exec($(this).attr('href'));
  var a = '<h4 class="panel-title"><a href="/ajaxsale?sale_id=' + match[1] + '" target="_blank"><font color="red">' + $(this).text() + '</font></a></h4>';
  $(a).insertAfter($(this).parent());
});
