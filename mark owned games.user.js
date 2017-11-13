// ==UserScript==
// @name        mark_owned_games
// @namespace   mark_owned_games
// @description mark owned games
// @author      jacky
// @include     http*://*dailyindiegame.com/account_digstore.html
// @include     http*://*dailyindiegame.com/store_updateshowpurchased2.html
// @include     http*://*dailyindiegame.com/account_trades.html
// @include     http*://*steamcardexchange.net/index.php?boosterprices
// @include     http*://*steamcardexchange.net/index.php?badgeprices
// @include     http://wtfprice.ru*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/mark_owned_games.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/mark_owned_games.user.js
// @version     2017.09.28.1
// @run-at      document-end
// @connect     store.steampowered.com
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
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
    var match = /dailyindiegame/.exec(document.URL);
    if (match){
        $('#DIG2TableGray').before('<input type="button" id="upd" value="upd" />');
        $('#DIG2TableGray').before('<input type="button" id="hide" value="hide" />');
        $('#upd').click(function(){
            update();
        });
        dig();
    } else {
        match = /steamcardexchange/.exec(document.URL);
        if (match){
            $('#navbar-menu').append('<div class="navbar-menu-item" id="mark"><a class="item-link">Mark</a></div>');
            $('#mark').click(function(){
                sce();
            });
        } else {
            match = /wtfprice.ru/.exec(document.URL);
            if (match){

                $('#top-panel').append('<span><a id="upd">Update</a></span>');
                $('#upd').click(function(){
                    update();
                });


                $('#top-panel').append('<span><a id="mark">Mark</a></span>');
                $('#mark').click(function(){
                    wtf();
                });
            }
        }
    }

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

function mark(r, tr, re){
    var a = $(tr).find('a') [0];
    var steam = $(a).attr('href');
    match = re.exec(steam);
    var id = -1;
    if (match) {
        id = parseInt(match[1]);
        var b = '<a target="_blank" href="http://steamcommunity.com/market/search?q=&category_753_Game%5B0%5D=tag_app_' + id + '&category_753_item_class%5B0%5D=tag_item_class_2&category_753_item_class%5B1%5D=tag_item_class_5&appid=753#p1_price_asc"></a>';
        var td = $(tr).find('.time')[0];
        $(td).wrapInner(b);
        if (r["rgOwnedApps"].indexOf(id) > -1){
            $(tr).css("background","#9CCC65");
        } else if (r["rgWishlist"].indexOf(id) > -1){
            $(tr).css("background","#29B6F6");
        }
    }
}

function mark_2(r, tr, id){
    id = parseInt(id);
    var td = $(tr).find('td')[0];
    var b = '<a target="_blank" href="https://tryit-forfree.rhcloud.com/package.php?id=' + id +'">'+ $(td).text() +'</a>';
    $(td).replaceWith(b);

    if (r["rgOwnedApps"].indexOf(id) > -1){
        $(tr).css("background","#9CCC65");
    } else if (r["rgWishlist"].indexOf(id) > -1){
        $(tr).css("background","#29B6F6");
    }
}

function dig(){
    $('#TableKeys tr').each(function(i, tr){
        mark(r, tr, /app\/(\d+)/);
    });
    $('#TableKeys').prev().prev().each(function(i, tr){
        mark(r, tr, /app\/(\d+)/);
    });
}

function sce(){
    $('tr[role="row"]').each(function(i, tr){
        mark(r, tr, /appid\-(\d+)/);
    });
}

function wtf(){
    $('#tbody tr').each(function(i, tr){
        mark_2(r, tr, $(tr).attr('id'));
    });
}
