// ==UserScript==
// @name        alds_agiso_filter
// @namespace   http://tampermonkey.net/
// @description alds_agiso_filter
// @include     https://alds.agiso.com/AutoLogistics/AldsCardPwdCategory.aspx
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/alds_agiso_filter.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/alds_agiso_filter.user.js
// @version     2018.04.17.1
// @run-at      document-end
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle(".ta{border:solid 1px;border-collapse:collapse;font-size:16px !important;}");
GM_addStyle(".td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px !important;}");
GM_addStyle(".o{background-color:yellow !important;}");

$('.ulleft').append('<li><a id="list">列表</a></li>');
$('.ulleft').append('<li><a id="save">保存</a></li>');
$('#footer').before('<table class="ta"></table>');
$('#list').click(function(){
    $('.ta').empty();
    $('.ui-row-ltr').each(function(i, v){
        var id = $(v).attr('id');
        var td = $(v).children('td');
        var num = $(td[8]).text();
        var n = Math.ceil(num / 500);
        if (n>1)
            num = '<span style="color:#F00">' + num + '</span>';
        var t = $(v).find('.card_title');
        var title = $(t).text().replace(/\//ig, ' ');
        var tag = $(t).children('.old_card').length ? 'o' : 'n';
        for (var j=1; j<=n; j++){
            var tmp = j>1 ? title + '&nbsp;' + j : title;
            var a = '<a class="down" download="' + tmp + '.json" href="https://alds.agiso.com/AutoLogistics/AldsCardPwdDefine.aspx?method=Get&CardPwdCid=' + id + '&FilterIsUsed=1&rows=500&page=' + j + '">'+ tmp +'</a>';
            $('.ta').append('<tr class="' + tag + '"><td class="td">' + i +  '</td><td class="td">' + id +  '</td><td class="td">' + a + '</td><td class="td">' + $(td[7]).text() + '</td><td class="td">' + num + '</td><td class="td">' + $(td[9]).text() + '</td></tr>');
        }
    });
});

$('#save').click(function(){
    $('.o a').each(function(i, v){
        var k = i;
        setTimeout(function () {
            $('.o a').get(k).click();
        }, k * 1000);
    });
});
