// ==UserScript==
// @name        gamehag_auto
// @namespace   http://tampermonkey.net/
// @version     2018.09.4.1
// @description gamehag auto
// @author      jacky
// @match       https://gamehag.com/giveaway/*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/gamehag_auto.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/gamehag_auto.user.js
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @connect     store.steampowered.com
// @connect     steamcommunity.com
// @connect     twitter.com
// @connect     tweeterid.com
// @connect     twitch.tv
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       unsafeWindow
// ==/UserScript==

GM_addStyle("table{border:solid 1px;border-collapse:collapse !important;}");
GM_addStyle("td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px !important;}");
var csrf = '';
var m = /csrf-token" content="([0-9A-Za-z]+)"/.exec(document.head.innerHTML);
if (m)
    csrf = m[1];
$('.element-list').after('<div id="a"><table id="b"></table></div>');

var a = [];
var b = [];
$('.single-giveaway-task').each(function(i, v){
    var d = $(v).find('a');
    var title = $(d[0]).text();
    var id = 0;
    var m = /\d+/.exec($(d[0]).attr('href'));
    if (m)
        id = m[0];
    var icon = 0;
    d = $(v).find('.task-icon');
    if (d)
        icon = $(d[0]).html();
    a.push(id);
    var action = '<td></td><td></td>';
    action = `<td><a href="javascript:void(0);" onclick="verify(\'${id}\');">${id}</a></td><td id="m_${id}"></td>`;
    $('#b').append(`<tr><td>${id}</td><td>${icon}&nbsp;${title}</td>${action}</tr>`);
});

if (a.length > 0){
    $('.element-list').after('<div><a id="c">LINKS</a></div>');
    $('#c').click(function(){
        $.each(a, function(i,v){
            $.ajax({
                url: `/giveaway/click/${v}`,
                type: 'GET',
            }).done(function (data) {
            }).fail(function (jqxhr) {

            });
        });
    });
}

unsafeWindow.verify = function(c){
    var da = {
        task_id: c
    };
    var url = '/api/v1/giveaway/sendtask';
    var id = `#m_${c}`;
    $(id).empty();
    $.ajax({
        url: url,
        type: 'POST',
        data: da,
        headers: {
            'X-CSRF-TOKEN': csrf,
        },
    }).done(function (data) {
        $(id).append(data.message);
    }).fail(function (data) {
        if (data.responseJSON)
            $(id).append(data.responseJSON.message);
    });
}