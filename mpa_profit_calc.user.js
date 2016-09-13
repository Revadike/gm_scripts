// ==UserScript==
// @name        mpa_profit_calc
// @namespace    http://tampermonkey.net/
// @description mpa profit calc
// @include     https://*mypayingads.com/module3/position
// @include     https://*mytrafficbux.com/module3/position
// @icon        http://www.mypayingads.com/favicon.ico
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/mpa_profit_calc.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/mpa_profit_calc.user.js
// @version     2016.09.08
// @run-at      document-end
// @grant       none
// ==/UserScript==

$($('.membertopmenu').children()[0]).append('<li><a id="calc">CALC</li>');
$('#calc').click(function(){
    var e1 = 0;
    var e2 = 0;
    $('.divtbody').children().each(function () {
        var p = $(this).children();
        var q = /([0-9.]+)/.exec($(p[3]).text()) [1];
        var r = /([0-9.]+)/.exec($(p[4]).text()) [1];
        var s = /([0-9.]+)/.exec($(p[5]).text()) [1];
        var amount = parseFloat(q);
        var earn = parseFloat(r)+parseFloat(s);
        e1 += amount;
        e2 += earn;
        var percent = (earn / amount).toFixed(2);
        $(p[8]).replaceWith('<div class="divtd textcenter vam"><b>'+percent+'</b></div>');
    });
    $('.floatleft.searchlabel').replaceWith('<div class="floatleft searchlabel">投入：' + e1 + ' 收益：' + e2.toFixed(0) + ' 完成：' + (e2 / e1).toFixed(2) + '</div>');
});