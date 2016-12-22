// ==UserScript==
// @name        ig_game_info
// @namespace    http://tampermonkey.net/
// @description ig_game_info
// @include     https://www.indiegala.com/ajaxsale?sale_id=*
// @include     https://www.indiegala.com/gift?gift_id=*
// @icon        http://www.indiegala.com/favicon.ico
// @updateURL 	https://github.com/rusania/gm_scipts/raw/master/ig_game_info.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/ig_game_info.user.js
// @version     2016.12.22
// @run-at      document-end
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==
$('head').append('<style type="text/css">table{border:solid 1px;border-collapse:collapse;}td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px;font-size:16px;}</style>');
$('.contain').append('<button id="info">INFO</button>');
$('.contain').append('<div id="a2"></div>');

$('#info').click(function () {
    $('#a2').empty();
    $('.title_game').each(function(){
        var h = $(this).find('.game-steam-url').attr('href');
        var m = /app\/(\d+)|sub\/(\d+)/.exec(h);
        var t = $(this).text();
        var i = m[1];
        var r = m[0];
        $('#a2').append('<tr id="' + i + '"><td>' + t + '</td><td>' + i + '</td></tr>');

        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://tryit-forfree.rhcloud.com/game_info.php?id=' + r,
            onload: function (response) {
                var d = JSON.parse(response.responseText);
                $('#' + i).append('<td>' + d.price.eu.p + '</td>');
                $('#' + i).append('<td>' + d.review.en + '</td>');
                $('#' + i).append('<td>' + d.info.metac + '</td>');
            }
        });
    });
});