// ==UserScript==
// @name        bl2_dlc_add_to_cart
// @namespace    http://tampermonkey.net/
// @include     http*://store.steampowered.com/cart*
// @updateURL 	https://github.com/rusania/gm_scipts/raw/master/bl2_dlc_add_to_cart.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/bl2_dlc_add_to_cart.user.js
// @version     2018.01.23.1
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

GM_addStyle("table{border:solid 1px;border-collapse:collapse !important;}");
GM_addStyle("td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px;font-family:simsun !important;}");
GM_addStyle("div{font-family:simsun !important;}");

var match = /sessionid=([a-z0-9]+);/.exec(document.cookie);
var sid = match[1];
$('.supernav_container').append('<a class="menuitem supernav" href="/cart/" data-tooltip-type="selector" data-tooltip-content=".submenu_myli">快速</a>');
$('.supernav_container').append('<div class="submenu_myli" style="display: none;"><div>');
$('.submenu_myli').append('<a class="submenuitem myli" subs="36555,36556,35221,34972,33298,31174" app="49520">无主2</a>');
$('.submenu_myli').append('<a class="submenuitem myli" subs="15373" app="206440">去月球</a>');
// <span style="color:red; font-weight: bold;"></span>
$('.myli').click(function () {
    addme($(this).attr('subs').split(','), $(this).attr('app'));
});

$('.pageheader').after('<table id="b"></table>');
$('.cart_row').each(function(){
    var l = '';
    var m = /"type":"([^"]+)","id":"?(\d+)/.exec($(this).attr('onmouseover'));
    if (m)
        l = m[1] + '/' + m[2];
    var p = '';
    var ds = '';
    var pv = $(this).find('.with_discount').children('div');
    if (pv.length > 1){
        var p1 = $(pv[0]).text().replace(/¥\s*/, '');
        p = $(pv[1]).text().replace(/¥\s*/, '');
        ds = (p / p1).toFixed(2);
    }
    var ps = $(this).find('.package_contents');
    var ic = '';
    var t = $(this).find('.cart_item_desc').text();
    if (ps.length > 0)
        ic = ps.text().replace(/包含 \d+ 件物品：\s*/, '');
    $('#b').append('<tr><td>' + l + '</td><td>' + t + '</td><td></td><td>' + ds + '</td><td></td><td>' + p + '</td><td></td><td>' + ic + '</td></tr>');
});

// onclick="javascipt:addme();"
function addme(subs, app) {
    var da = {
        action: 'add_to_cart',
        sessionid: sid,
        'subid[]': subs
    };
    $.ajax({
        url: '/cart/',
        method: 'POST',
        beforeSend: function (request)
        {
            request.setRequestHeader('Referer', 'http://store.steampowered.com/app/' + app);
        },
        dataType: 'json',
        data: da,
        success: function (d) {
            alert(d);
        },
        error: function () {
            alert('fail');
        }
    });
}
