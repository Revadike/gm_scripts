// ==UserScript==
// @name        macheist
// @namespace    http://tampermonkey.net/
// @description macheist key list
// @include     https://macheist.com/order/games/*
// @icon        https://cdn.macheist.com/common/favicon.png
// @updateURL 	https://github.com/rusania/gm_scipts/raw/master/macheist.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/macheist.user.js
// @version     2016.09.08
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==
var id = '';
var match = /ID:\s*([A-Z0-9]+)/.exec($('.receipt').text());
if (match)
id = match[1];
var help = $('.steamhelp');
help.append('<table id="serial" border="1"></table>');
$('.license').each(function () {
  var g = $(this).find('.name') [0];
  var game = $(g).text();
  var s = $(this).find('.serial') [0];
  var se = $(s).find('td') [0];
  var serial = $(se).text();
  $('#serial').append('<tr><td>' + game + '</td><td>' + serial + '</td><td>' + id + '</td></tr>');
});
