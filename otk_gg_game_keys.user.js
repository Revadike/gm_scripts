// ==UserScript==
// @name         otk_gg_game_keys
// @namespace    http://tampermonkey.net/
// @version      2017.12.17.1
// @description  otk_gg_game_keys
// @author       You
// @match        https://gogobundle.com/latest/bundles/order/show/*
// @match        https://otakubundle.com/account/order/show/*
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==

$('legend').each(function(){
    if ($(this).text()=='Serials'){
        var t = $(this).next().find('tbody tr');
        var a = [];
        var b = [];

        t.each(function(){
            var d = $(this).find('td');
            var n = $(d[0]).text();
            var s = $(d[1]).text();
            if ($.inArray(n, a) < 0){
                a.push(n);
                b[n]= [];
            }
            b[n].push(s);
        });
        $(this).after('<div id="k"></div>');
        var ks = b[a[0]].length;
        var js = a.length;
        for (i=0; i < ks; i++) {
            var c = [];
            for (j=0; j < js; j++) {
                var k = b[a[j]][i];
                var key = '<div>【' + (j+1) + '】【' + a[j]  +'】' + k + '</div>';
                c.push(k);
                $('#k').append(key);
            }

            if (c.length  > 10){
                c[0] = '<div>ASF格式(1-8)：!redeem ' + c[0];
                c[8] = '<div>ASF格式(9-' + c.length + ')：!redeem ' + c[8];
            } else {
                c[0] = '<div>ASF格式：!redeem ' + c[0];
            }
            var asf = c.join(',') + '</div>';
            $('#k').append(asf);
        }
    }
});