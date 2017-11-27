// ==UserScript==
// @name        gmg_game_info
// @namespace   jacky
// @description gmg_game_info
// @include     http*://www.greenmangaming.com/black-friday/*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/gmg_game_info.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/gmg_game_info.user.js
// @version     2017.10.22.1
// @run-at      document-end
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle("table{border:solid 1px;border-collapse:collapse !important;}");
GM_addStyle("td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px;font-size:16px !important;}");

$('.main').before('<table id="a"></table>');

var i = 0;
$('.prod-info').each(function(){
    var name = $.trim($(this).find('.prod-name').text());
    var price = '';
    var m = /[0-9.,]+/.exec($(this).find('.prev-price').text());
    if (m)
        price = m[0];
    var sale = '';
    m = /[0-9.,]+/.exec($(this).find('.current-price').text());
    if (m)
        sale = m[0];
    var link = $(this).parent().attr('href');
    m = /games\/([^\/]+)/.exec(link);
    if (m)
        link = m[1];
    var dis = $.trim($(this).find('.discount').text());
    $('#a').append('<tr><td>' + (++i) + '</td><td>' + name + '</td><td>' + link + '</td><td>' + price + '</td><td>' + sale + '</td><td>' + dis + '</td></tr>');
});