// ==UserScript==
// @name         ccyycn_fetch_key
// @namespace    http://tampermonkey.net/
// @version      2018.02.18.1
// @description  ccyycn_fetch_key
// @author       jacky
// @match        http://bundle.ccyycn.com/order/id/*
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

$('h2').before('<table id="k"></table>');
var i = 1;
    var t = '';
    var k = '';
$('.col-xs-12 .row').each(function(){
    var c = $(this).attr('class');
    if (c=='row'){
        t = $(this).text();
    }
    else{
        k = $(this).text();
        $('#k').append('<tr><td>' + (i++) + '</td><td>' + t + '</td><td>'  + k +  '</td></tr>');
    }


});
