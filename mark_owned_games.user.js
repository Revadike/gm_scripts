// ==UserScript==
// @name        dig mark owned games
// @namespace   http://tampermonkey.net/
// @description mark owned games
// @author      jacky
// @match       http*://*dailyindiegame.com/account_digstore.html
// @match       http*://*dailyindiegame.com/store_updateshowpurchased2.html
// @version     2017.03.01.1
// @run-at      document-end
// @connect     store.steampowered.com
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

$('head').append('<style type="text/css">.o{background-color:#9CCC65};.w{background-color:#29B6F6}</style>');

function mark(r, tr){
    var steam = $($(tr).find('a') [0]).attr('href');
    match = /app\/(\d+)/.exec(steam);
    var id = -1;
    if (match) {
        id = parseInt(match[1]);
        if (r["rgOwnedApps"].indexOf(id) > -1){
            $(tr).css("background","#9CCC65");
        } else if (r["rgWishlist"].indexOf(id) > -1){
            $(tr).css("background","#29B6F6");
        }
    }
}
GM_xmlhttpRequest({
    method: "GET",
    url: "http://store.steampowered.com/dynamicstore/userdata/?l=english",
    onload: function(response) {
        var r = JSON.parse(response.responseText);
        $('#TableKeys tr').each(function(i, tr){
            mark(r, tr);
        });
        $('#TableKeys').prev().prev().each(function(i, tr){
            mark(r, tr);
        });
    }
});