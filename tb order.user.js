// ==UserScript==
// @name         tb order
// @namespace    http://tampermonkey.net/
// @version      2017.02.15.1
// @description  tb order info
// @author       jacky
// @match        https://trade.taobao.com/trade/detail/trade_order_detail.htm?biz_order_id=*
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==

var html = $('body').html();
$('#detail-panel').append('<table><tr id="se"></tr></table>');
var m = /"title":"([^"]+)/.exec(html);
if (m)
    $('#se').append('<td>'+m[1]+'</td>');
m = /id":"(\d+)/.exec(html);
if (m)
    $('#se').append('<td>\''+m[1]+'</td>');
m = /nick":"([^"]+)/.exec(html);
if (m)
    $('#se').append('<td>'+m[1]+'</td>');
m = /实收款","value":"([0-9.]+)/.exec(html);
if (m)
    $('#se').append('<td>'+m[1]+'</td>');
m = /创建时间:","value":"([^"]+)/.exec(html);
if (m)
    $('#se').append('<td>'+m[1]+'</td>');
m = /成交时间:","value":"([^"]+)/.exec(html);
if (m)
    $('#se').append('<td>'+m[1]+'</td>');
m = /标记："\},\{"type":"text","value":"([^"]+)/.exec(html);
if (m)
    $('#se').append('<td>'+m[1]+'</td>');