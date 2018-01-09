// ==UserScript==
// @name        mark_owned_steamcn
// @namespace   http://tampermonkey.net/
// @description mark_owned_steamcn
// @author      jacky
// @include     http*://*steamcn.com/t*
// @include     http*://*steamcn.com/forum.php?mod=viewthread*
// @version     2018.01.07.1
// @run-at      document-end
// @connect     store.steampowered.com
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/mark_owned_steamcn.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/mark_owned_steamcn.user.js
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

GM_addStyle(".o{background-color:#9CCC65 !important;}");
GM_addStyle(".w{background-color:#29B6F6 !important;}");
var txt = GM_getValue("steam_info", "{}");
var r = JSON.parse(txt);
if (r["rgOwnedApps"]===undefined){
    update();
}
else{
    $('#post_reply').replaceWith('<a id="upd">UPD</a>');
    $('#upd').click(function(){
        update();
    });
    $('.steamInfoLink').each(function(){
        var h = $(this).attr('href');
        var m = /(app|sub)\/(\d+)/.exec(h);
        if (m){
            id = parseInt(m[2]);
            if (m[1]=='app') {
                if (r["rgOwnedApps"].indexOf(id) > -1){
                    $(this).css("background","#9CCC65");
                } else if (r["rgWishlist"].indexOf(id) > -1){
                    $(this).css("background","#29B6F6");
                }
            } else {
                if (r["rgOwnedPackages"].indexOf(id) > -1){
                    $(this).css("background","#9CCC65");
                }
            }
        }
    });
}

function update()
{
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://store.steampowered.com/dynamicstore/userdata/?l=english",
        onload: function(response) {
            GM_setValue("steam_info", response.responseText);
            alert("complete");
        }
    });
}