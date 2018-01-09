// ==UserScript==
// @name        mark_owned_games
// @namespace   http://tampermonkey.net/
// @description mark_owned_games
// @author      jacky
// @include     http*://*dailyindiegame.com/account_digstore.html
// @include     http*://*dailyindiegame.com/account_trades.html
// @include     http*://*dailyindiegame.com/store_updateshowpurchased2.html
// @include     https://www.indiegala.com/gift?gift_id=*
// @include     http*://*steamcardexchange.net/index.php?boosterprices
// @include     http*://*steamcardexchange.net/index.php?badgeprices
// @include     http*://*steamcn.com/t*
// @include     http*://*steamcn.com/forum.php?mod=viewthread*
// @include     http://wtfprice.ru*
// @version     2018.01.09.1
// @run-at      document-end
// @connect     store.steampowered.com
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
const cardRefreshInterval = 60 * 24 * 2; // Number of minutes to wait to refesh cached trading card data. 0 = always stay up-to-date.
// ==/Configuration==

var txt = GM_getValue("steam_info", "{}");
var dt = GM_getValue("last_upd", 0);
var r = JSON.parse(txt);
var ignoredApps = r.rgIgnoredApps;
var ownedApps = r.rgOwnedApps;
var ownedPackages = r.rgOwnedPackages;
var wishlist = r.rgWishlist;

if (Date.now() - dt > userRefreshInterval * 60000 || ownedApps===undefined){
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

var a = $("a[href*='/app/'],[href*='/sub/'],[href*='-appid-']");
var t = 1;
if (a.length == 0)
    t =15;

setTimeout(function() {
    a = $("a[href*='/app/'],[href*='/sub/'],[href*='-appid-']");
    mark(a);
}, t * 1000);

function mark(a){
    a.each(function(i, v){
        var h = $(this).attr('href');
        var m = /(app|sub)(\/|id\-)(\d+)/.exec(h);
        if (m){
            id = parseInt(m[3]);
            var html = '';
            if (m[1]=='app') {
                if ($.inArray(id, ownedApps) > -1)
                    html = '<span style="color: ' + ownedColor + '; cursor: help;">&nbsp' + ownedIcon + '</span>';
                else {
                    if ($.inArray(id, wishlist) > -1)
                        html = '<span style="color: ' + wishlistColor + '; cursor: help;">&nbsp' + wishlistIcon + '</span>';
                    else
                        html = '<span style="color: ' + unownedColor + '; cursor: help;">&nbsp' + unownedIcon + '</span>';
                }
            } else {
                if ($.inArray(id, ownedPackages) > -1)
                    html = '<span style="color: ' + ownedColor + '; cursor: help;">&nbsp' + ownedIcon + '</span>';
                else
                    html = '<span style="color: ' + unownedColor + '; cursor: help;">&nbsp' + unownedIcon + '</span>';
            }
            $(this).after(html);
        }
    });
}