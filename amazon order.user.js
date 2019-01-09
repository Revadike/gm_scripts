// ==UserScript==
// @name         amazon order
// @namespace    http://tampermonkey.net/
// @version      2019.01.08
// @description  amazon order info
// @author       jacky
// @match        https://www.amazon.com/gp/*/your-account/manage-downloads.html*
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle(".b{border:solid 1px;border-collapse:collapse !important;}");
GM_addStyle(".d{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px;font-family:simsun !important;}");
$('.dsv-active-downloads-title').append('<table class="b"></table>');

var t = $('.dsv-whiteBox').find("div[name*='B']");
if (t.length > 0){
    t.each(function(){
        var id = $(this).attr('name');
        var a = $(this).find('a');
        var name = $.trim($(a[0]).text());
        var k = `#orders-${id} tbody tr`;
        var tr = $(this).find(k);
        var key = $.trim($(tr[0]).text());
        var m = /Code: ([A-Z0-9\-]+)/.exec(key);
        if (m)
            key = m[1];
        var info = $.trim($(tr[2]).text());
        m = /Purchased on ([A-Za-z]+ \d+, \d+)/.exec(info);
        if (m)
            info = m[1];
        var order = '';
        a = $(tr[2]).find('a');
        var href = '';
        if (a.length > 0){
            href = $(a[0]).attr('href');
            m = /orderID=([A-Z0-9\-]+)/.exec(href);
            if (m)
                order = m[1];
        }
        $('.b').append(`<tr><td class="d"><a target=_blank href="/dp/${id}/">${name}</a></td><td class="d">${key}</td><td class="d"><a target=_blank href="${href}">#${order}</a></td><td class="d">${info}</td></tr>`);
    });
}