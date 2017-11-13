// ==UserScript==
// @name        gg_game_info
// @namespace    gg_game_info
// @description gamersgate steam game info
// @include     https://*.gamersgate.com/internal-apis/site/product_list*
// @icon        http://steamcommunity.com/favicon.ico
// @updateURL 	https://github.com/rusania/gm_scipts/raw/master/gg_game_info.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/gg_game_info.user.js
// @version     2017.11.05
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==

$('.stdlist').before('<div id="g"></div>');
var i = 1;
var li = 'https://tryit-forfree.rhcloud.com/gg.php?q=';
$('.ttl').each(function (){
    var id = '';
    var m = /\/(D[^\/]+)/.exec($(this).attr('href'));
    if (m)
        id = m[1];
    var ti = $(this).attr('title');
    $('#g').append('<tr><td>' + i++ + '</td><td>' + id + '</td><td>' + ti + '</td></tr>');
    li += id + ',';
});
$('#g').before(li);