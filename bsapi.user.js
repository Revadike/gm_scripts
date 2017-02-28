// ==UserScript==
// @name        bsapi
// @namespace   bsapi
// @description bs api
// @include     https://www.bundlestars.com/en/orders/*
// @icon        https://cdn.bundlestars.com/production/brand/favicon.ico
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_addStyle
// @grant GM_xmlhttpRequest
// @grant unsafeWindow
// @updateURL https://github.com/rusania/gm_scipts/raw/master/bsapi.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/bsapi.user.js
// @version     2017.02.28.1
// @grant       none
// ==/UserScript==
var li = $('#navbarBundles').parent().parent();
li.append('<li><a id ="fetch" href="#"><span style="color:green;font-weight:bold;">FETCH</span></a></li>');
li.append('<li><a id ="redeem" href="#"><span style="color:yellow;font-weight:bold;">REDEEM</span></a></li>');

$('#fetch').click(function () {
    $('.key-container.hidden-sm.hidden-xs div a').click();
});

$('#redeem').click(function () {
    if ($('#list').length > 0) {
        $('#list').remove();
    }
    $('.order').append('<table id="list"></table>');
    $('.bundle').each(function () {
        $(this).parent().find('.order-table').each(function (i, e) {
            var title = $(e).find('.title').text();
            var key = $(e).find('.form-control').val();
            var f = '<tr><td>' + (i+1) +'</td><td>' + title + '</td><td>' + key + '</td><td>【' + title.replace(',', '') + '】' + key + '</td></tr>';
            $('#list').append(f);
        });
    });
});
