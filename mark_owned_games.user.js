// ==UserScript==
// @name        mark_owned_games
// @namespace   http://tampermonkey.net/
// @description mark_owned_games
// @author      jacky
// @include     http*://*dailyindiegame.com/*
// @include     https://www.indiegala.com/gift?gift_id=*
// @include     http*://*steamcardexchange.net/index.php?boosterprices
// @include     http*://*steamcardexchange.net/index.php?badgeprices
// @include     http*://*steamcn.com/t*
// @include     http*://*steamcn.com/forum.php?mod=viewthread*
// @include     https://www.indiegala.com/gift?gift_id=*
// @include     http://wtfprice.ru*
// @include     http://167.88.168.94/*
// @exclude     https://steamcn.com/forum.php
// @version     2018.01.14.2
// @run-at      document-end
// @connect     store.steampowered.com
// @connect     steamcardexchange.net
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/mark_owned_games.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/mark_owned_games.user.js
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

// ==Configuration==
const prefix = false; // Prefix (true) instead of suffix (false) position icon.
const wantIgnores = true; // Wether (true) or not (false) you want to display an extra icon for ignored (not interested) apps.
const wantDecommissioned = true; // Wether (true) or not (false) you want to display an extra icon for removed or delisted (decommissioned) apps.
const wantCards = true; // Whether (true) or not (false) you want to display an extra icon for apps with cards.
const linkCardIcon = true; // Link the card icon to SteamCardExchange.net
const ignoredIcon = "&#128683;&#xFE0E;"; // HTML entity code for '🛇' (default).
const ignoredColor = "grey"; // Color of the icon for ignored (not interested) apps.
const wishlistIcon = "&#10084;"; // HTML entity code for '❤' (default).
const wishlistColor = "blue"; // Color of the icon for wishlisted apps.
const ownedIcon = "&#10004;"; // HTML entity code for '✔' (default).
const ownedColor = "green"; // Color of the icon for owned apps and subs.
const unownedIcon = "&#10008;"; // HTML entity code for '✘' (default).
const unownedColor = "red"; // Color of the icon for unowned apps and subs.
const decommissionedIcon = "&#128465;"; // HTML entity code for '🗑' (default).
const decommissionedColor = "initial"; // Color of the icon for removed or delisted apps and subs.
const cardIcon = "&#x1F0A1"; // HTML entity code for '🂡' (default).
const cardColor = "blue"; // Color of the icon for cards.
const userRefreshInterval = 60 * 24; // Number of minutes to wait to refesh cached userdata. 0 = always stay up-to-date.
const decommissionedRefreshInterval = 60 * 24; // Number of minutes to wait to refesh cached userdata. 0 = always stay up-to-date.
const cardRefreshInterval = 60 * 24 * 7; // Number of minutes to wait to refesh cached trading card data. 0 = always stay up-to-date.
// ==/Configuration==

var txt = GM_getValue("steam_info", "{}");
var dt = GM_getValue("last_upd", 0);
var txt2 = GM_getValue("card_info", null);
var dt2 = GM_getValue("card_upd", 0);
var r = JSON.parse(txt);
var r2 = JSON.parse(txt2);
var ignoredApps = r.rgIgnoredApps;
var ownedApps = r.rgOwnedApps;
var ownedPackages = r.rgOwnedPackages;
var wishlist = r.rgWishlist;

$('body').append('<center><div id="ru"></div></center>');
$('#ru').append('<a id="upd" style="cursor: default;" title="'+ (new Date(dt)).toLocaleString() +'">UPDATE</a>');
$('#ru').append('&nbsp;&nbsp;');
$('#ru').append('<a id="card" style="cursor: default;" title="'+ (new Date(dt2)).toLocaleString() +'">CARDS</a>');
$('#ru').append('&nbsp;&nbsp;');
$('#ru').append('<a id="mark" style="cursor: default;">MARK</a>');
$('#ru').append('&nbsp;&nbsp;');
$('#ru').append('<a id="umark" style="cursor: default;">UMARK</a>');
$('#upd').click(function(){update();});
$('#card').click(function(){upcard();});
$('#mark').click(function(){
    $('.ruc').remove();
    var b = $("a[href*='/app/'],[href*='/sub/'],[href*='-appid-']");
    mark(b);
});

$('#umark').click(function(){
    $('.ruc').remove();
});

if (Date.now() - dt > userRefreshInterval * 60000 || ownedApps===undefined)
    update();

if (wantCards && (Date.now() - dt2 >= cardRefreshInterval * 60000 || !r2 || Object.keys(r2).length < 7000))
    upcard();

if (/content_digaccount/.exec(document.URL)){
    $('#TableKeys2 tr').each(function(){
        var m = /(app|sub)\/(\d+)/.exec($(this).html());
        if (m){
            var td = $(this).children('td')[2];
            $(td).wrapInner('<a href="http://store.steampowered.com/' + m[0] +'/" target=_blank></a>');
        }
    });
}

var a = $("a[href*='/app/'],[href*='/sub/'],[href*='-appid-']");
var t = 1;
if (a.length == 0)
    t =15;

setTimeout(function() {
    a = $("a[href*='/app/'],[href*='/sub/'],[href*='-appid-']");
    mark(a);
}, t * 1000);

function update(){
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://store.steampowered.com/dynamicstore/userdata/?l=english",
        onload: function(response) {
            GM_setValue("steam_info", response.responseText);
            GM_setValue("last_upd", Date.now());
            alert("complete");
        }
    });
}

function upcard(){
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://www.steamcardexchange.net/api/request.php?GetBadgePrices_Guest",
        onload: function(response) {
            var json = null;
            try {
                json = {};
                JSON.parse(response.responseText).data.forEach(function(item) {
                    json[item[0][0]] = item[1];
                });
                if (Object.keys(json).length > 7000) { // sanity check
                    GM_setValue("card_info", JSON.stringify(json));
                    GM_setValue("card_upd", Date.now());
                }
                alert("complete");
            } catch(error) {
            }
        }
    });
}

function mark(a){
    a.each(function(i, v){
        var h = $(this).attr('href');
        var m = /(app|sub)(\/|id\-)(\d+)/.exec(h);
        if (m){
            id = parseInt(m[3]);
            var html = '';
            var card = '';
            if (m[1]=='app') {
                if ($.inArray(id, ownedApps) > -1)
                    html = '<span class="ruc" style="color: ' + ownedColor + '; cursor: help;">&nbsp' + ownedIcon + '</span>';
                else {
                    if ($.inArray(id, wishlist) > -1)
                        html = '<span class="ruc" style="color: ' + wishlistColor + '; cursor: help;">&nbsp' + wishlistIcon + '</span>';
                    else
                        html = '<span class="ruc" style="color: ' + unownedColor + '; cursor: help;">&nbsp' + unownedIcon + '</span>';
                }

                if (wantCards && r2.hasOwnProperty(id)){
                    card = '<span class="ruc" style="color: ' + cardColor + '; cursor: help;">&nbsp' + cardIcon + '</span>';
                    $(this).after(card);
                }
            } else {
                if ($.inArray(id, ownedPackages) > -1)
                    html = '<span class="ruc" style="color: ' + ownedColor + '; cursor: help;">&nbsp' + ownedIcon + '</span>';
                else
                    html = '<span class="ruc" style="color: ' + unownedColor + '; cursor: help;">&nbsp' + unownedIcon + '</span>';
            }
            $(this).after(html);
        }
    });
}