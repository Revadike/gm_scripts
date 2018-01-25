// ==UserScript==
// @name         otk_gg_game_keys
// @namespace    http://tampermonkey.net/
// @version      2018.01.25.2
// @description  otk_gg_game_keys
// @author       jacky
// @match        http*://*gogobundle.com/*/order/show/*
// @include      http*://*gogobundle.com/*/order/show/*
// @match        http*://*otakubundle.com/*/order/show/*
// @include      http*://*otakubundle.com/*/order/show/*
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/otk_gg_game_keys.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/otk_gg_game_keys.user.js
// @grant       none
// ==/UserScript==

$('legend').each(function(){
    if ($(this).text()=='Serials'){
        var t = $(this).next().find('tbody tr');
        var a = [];
        var b = [];

        $(this).after('<div id="c"></div>');
        $(this).after('<div id="k"></div>');
        t.each(function(){
            var d = $(this).find('td');
            var n = $(d[0]).text();
            var s = $(d[1]).text();
            var m = /Coupon/.exec(n);
            if (m){
                $('#k').append('<span style="color:red">' + n + '：' + s + '</span>');
            } else {
                if ($.inArray(n, a) < 0){
                    a.push(n);
                    b[n]= [];
                }
                b[n].push(s);
            }
        });

        var ks = b[a[0]].length;
        var js = a.length;
        for (i=0; i < ks; i++) {
            var c = [];
            for (j=0; j < js; j++) {
                var k = b[a[j]][i];
                var key = '<div>【' + (j+1) + '】【' + a[j]  +'】&nbsp;' + k + '</div>';
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