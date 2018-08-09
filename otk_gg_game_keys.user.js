// ==UserScript==
// @name         otk_gg_game_keys
// @namespace    http://tampermonkey.net/
// @version      2018.08.09.1
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
// @grant       GM_setClipboard
// ==/UserScript==

$('legend').each(function(){
    if ($(this).text()=='Serials'){
        var t = $(this).next().find('tbody tr');
        var a = [];
        var b = [];

        $(this).after('<table id="b"></table>');
        $(this).after('<div id="c"></div');
        $(this).after('<a id="p">COPY</a>');
        $('#p').click(function(){
            var txt = '';
            $('#b tr').each(function(){
                $(this).children('td').each(function(){
                    txt += $(this).text() + '\t';
                });
                txt += '\n';
            });
            GM_setClipboard(txt);
        });
        t.each(function(){
            var d = $(this).find('td');
            var n = $(d[0]).text();
            var s = $(d[1]).text();
            var m = /Coupon/.exec(n);
            if (m){
                $('#b').before(`<span style="color:red">${n}：${s}</span>`);
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
        var l = 0;
        var asf = '';
        for (var i=0; i < ks; i++) {
            var c = [];
            for (var j=0; j < js; j++) {
                var k = b[a[j]][i];
                c.push(k);
                var name = a[j];
                l = j+1;
                $('#b').append(`<tr><td>${name}</td><td>${k}</td><td>【${l}】【${name}】 ${k}</td></tr>`);
            }

            /*
            if (c.length > 10) {
                var n = 0;
                var size = 8;
                if (c.length % 9 ==0 || c.length % 8 < 2)
                    size = 9;
                while (n < c.length) {
                    var y = n + 1;
                    var z = n + size;
                    if (z > c.length)
                        z = c.length;
                    asf = c[n];
                    c[n] = `<div>ASF格式(${y}-${z})：{r}!redeem&nbsp;${asf}`;
                    n = z;
                }
            } else {
                asf = c[0];
                c[0] = `<div>ASF格式：{r}!redeem&nbsp;${asf}`;
            }
            */
            l = i+1;
            asf = c.join(',');
            $('#b').append(`<tr><td>${l}</td><td>-</td><td>********************{r}【ASF格式】{r}{r}!redeem ${asf}</td></tr>`);
        }
    }
});