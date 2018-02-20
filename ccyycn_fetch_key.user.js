// ==UserScript==
// @name         ccyycn_fetch_key
// @namespace    http://tampermonkey.net/
// @version      2018.02.20.2
// @description  ccyycn_fetch_key
// @author       jacky
// @match        http://bundle.ccyycn.com/order/id/*
// @match        http://bundle.ccyycn.com/bundle/*
// @match        http://bundle.ccyycn.com/*.html*
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       GM_log
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

GM_addStyle("table{border:solid 1px;border-collapse:collapse !important;}");
GM_addStyle("td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px;font-family:simsun !important;}");

var m = /order\/id/.exec(document.URL);
if (m) {
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
}else{
    $('.carousel.slide').before('<div style="font-family:simsun;margin-left:150px;font-size:20px;" id="b"></div>');
    $('.row.games').each(function(){
        var t = $($(this).find('span')[0]).text();
        $('#b').append('<p>' + t + '</p>');
        $(this).find('.games-box').each(function(i, v){
            var g = $($(v).find('h4')[0]).text();
            var h = $(v).find("input[value*='/app/'],[value*='/sub/']").val();
            if (h)
                g = '<a target="_blank" href="' + h + '">' + g + '</a>';
            $('#b').append( (i+1) + '.&nbsp;' + g + '<br>');
        });

    });
}