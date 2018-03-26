// ==UserScript==
// @name        yuplay_info
// @namespace   http://tampermonkey.net/
// @description yuplay games info
// @include     http*://yuplay.ru/news/*
// @include     http*://yuplay.ru/product/*
// @include     https://yuplay.ru/orders/*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/yuplay_info.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/yuplay_info.user.js
// @version     2018.03.26.1
// @run-at      document-end
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

//GM_addStyle("table{border:solid 1px;border-collapse:collapse !important;}");
//GM_addStyle("td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px;font-size:16px !important;}");

var r = GM_getValue("r", 0.0);
var dt = GM_getValue("dt", 0);

match = /ru\/news\/(\d+)/.exec(document.URL);
if (match) {
    $($('.navi').children() [0]).append('<li><a id="btn">INFO</a></li>');
    $('.section-main').append('<div>实时汇率：<span id="r"></ratio></div>');
    $('.section-main').append('<a target="_blank" href="http://167.88.168.94/yuplay.php?o=html&cc=cn&n='+ match[1] +'">TRY IT</a>');
    $('.section-main').append('<table id="info"></table>');
    $('#btn').click(function () {
        $('#info').empty();
        $('#info').append('<tr><td>序号</td><td>游戏</td><td>原价</td><td>优惠价</td><td>人民币</td><td>折扣</td></tr>');
        var f = function () {
            var i = 0;
            $('.section-main').find('li').each(function () {
                var m = $(this).children();
                var title = $(m[0]).text();
                var link = $(m[0]).attr('href');
                var del = $(m[1]).text();
                var p = /(\d+) руб/.exec($(this).text()) [1];
                var p2 = (p * r).toFixed(2);
                var discount = Math.round(((1 - p / del).toFixed(2)) * 100);
                $('#info').append('<tr><td>' + (++i) + '</td><td><a href="' + link + '" target="_blank">' + title + '</a></td><td>&#8381;' + del + '</td><td>&#8381;' + p + '</td><td>&yen;' + p2 + '</td><td>-' + discount + '%</td></tr>');
            });
        };
        getRatio('RUB', 'CNY', f);
    });
} //yuplay news

match = /ru\/product/.exec(document.URL);
if (match) {
    $($('.navi').children() [0]).append('<li><a id="btn">INFO</a></li>');
    $('.good-title').append('<div>实时汇率：<span id="ratio">0</span></div>');
    $('#btn').click(function () {
        var f = function () {
            $('.ru').remove();
            $('.price').each(function () {
                var pr = (/(\d+)\s*<sp/.exec($(this).html())) [1];
                var q = (pr * r).toFixed(2);
                $(this).append('<span class="ru" style="color:red; font-weight: bold;">&yen;' + q + '</span>');
            });
            var p = $(":contains('SUB_ID') > span");
            if (p.length > 0)
                p.after('<a class="ru" target="_blank" href="http://steamdb.info/sub/' + p.text() + '/">API</a>');
        };
        getRatio('RUB', 'CNY', f);
    });
} //yuplay product

match = /yuplay.ru\/orders/.exec(document.URL);
if (match) {
    $('.orders_id').after('<table id="t"></table>');
    $('.orders_id').after('<div id="b"></div>');
    $('#b').append('<p>' + $.trim($('td.total').text()) + '<br>' + $('.number small').text() + '<br>' + $('.number b').text() + '</p>');
    $('.product-info').each(function(i, v){
        var t = $.trim($(v).find('.name').text());
        var k = $(v).next('.keys').find('input').val();
        $('#t').append('<tr><td>' + i + '</td><td>' + t + '</td><td>' + k + '</td></tr>');
        $('#b').append('<p>' + t + '<br>' + k + '</p>');
    });
}

var getRatio = function (a, b, f) {
    if (Date.now() - dt > 60 * 1 * 60000 || r === 0.0)
    {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://api.fixer.io/latest?base=' + a + '&symbols=' + b,
            onload: function (response) {
                if (response.responseText){
                    var j = JSON.parse(response.responseText);
                    r = j.rates[b];
                    GM_setValue("r", r);
                    GM_setValue("dt", Date.now());
                }
                $('#r').empty();
                $('#r').append(r);
                f();
            }
        });
    } else {
        $('#r').empty();
        $('#r').append(r);
        f();
    }

}; //KRWCNY,RUBCNY