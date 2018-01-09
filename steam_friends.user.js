// ==UserScript==
// @name        steam_friends
// @namespace   steam_friends
// @description steam_friends
// @include     https://steamcommunity.com/profiles/*/friends*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/steam_friends.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/steam_friends.user.js
// @version     2018.01.07.1
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       GM_log
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

GM_addStyle("table{border:solid 1px;border-collapse:collapse !important;}");
GM_addStyle("td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px;font-family:simsun !important;}");
GM_addStyle("div{font-family:simsun !important;}");

$('.manage_friends_header').before('<div id ="b"></div>');
$('.friendBlock.persona').each(function(k, v){
    var dv= $(this).children('div');
    var ip = $(dv[0]).children(":first");
    var id = ip.attr('data-steamid');
    var nid = '<a target=_blank href="https://steamcommunity.com/profiles//' + id + '">' + id + '</a>';
    var uid = $(v).attr('data-miniprofile');
    uid = '<a target=_blank href="https://steamcommunity.com/miniprofile/' + uid + '">' + uid + '</a>';
    var o = $(dv[2]).clone();
    var stat = $.trim(o.children(":last").text());
    var m = /\d{2} 天|BATTLEGROUNDS/.exec(stat);
    if (m)
        stat = '<span style="color:#ff0000">' + stat + '</span>';
    o.children().remove();
    var nick = $.trim(o.text());
    $('#b').append('<tr><td>'+ k +'</td><td>'+ nid +'</td><td>'+ uid +'</td><td>'+ nick +'</td><td>'+ stat + '</td><td><a id="' + id + '">remove</a></td></tr>');
    $('#' + id).click(function(){
        $.ajax({
            url: '/actions/RemoveFriendAjax',
            type: "POST",
            data: {
                'steamid': id,
                'sessionID': g_sessionID
            },
            success: function( data, status, xhr ){
                if (data==true)
                    $('#' + id).remove();
                else
                    alert(data);
            },
            fail: function( data, status, xhr ){
                alert(status);
            }
        });
    });
});