// ==UserScript==
// @name         steam_award_auto
// @namespace    jacky
// @version      2017.11.27.1
// @description  steam_award_auto
// @author       jacky
// @match        http*://store.steampowered.com/SteamAwardNominations/*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/steam_award_auto.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/steam_award_auto.user.js
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// ==/UserScript==

var a = new Array(730, 524220, 550, 25710, 322330, 582160, 227300, 218620, 24010, 252530, 49520, 675010, 620);

var i = 0;
$('.nomination_row').each(function(){
    var c = $(this).find('.younominated_game');
    var app = a[i++];
    if (c.length > 0){
        var t = $.trim(c.text());
    } else {
        $.ajax({
            url: '/promotion/nominategame',
            type: "POST",
            dataType : 'json',
            data: {
                'sessionid': g_sessionID,
                'appid': app,
                'categoryid': i
            },
            success: function( data, status, xhr ){}
        });
    }
});