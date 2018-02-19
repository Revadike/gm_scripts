// ==UserScript==
// @name         sonkwo_fetch_key
// @namespace    http://tampermonkey.net/
// @version      2018.02.18.1
// @description  sonkwo fetch key
// @author       jacky
// @match        https://www.sonkwo.com/products/*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/sonkwo_fetch_key.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/sonkwo_fetch_key.user.js
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       GM_log
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

GM_addStyle("table{border:solid 1px;border-collapse:collapse !important;}");
GM_addStyle("td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px;font-family:simsun !important;}");
GM_addStyle(".d{font-size:16px;color:white !important;}");

var u = "rusania@gmail.com";
var p = "11111122a";
var g = '';
var m = /game_id=(\d+)/.exec(document.URL);
if (m)
    g = m[1];

var txt = GM_getValue("sk", "{}");
var r = JSON.parse(txt);
var token = r[u];

setTimeout(function() {
    var h = $("div:contains('已拥有')");
    if (h.length > 0){
        $('.SK-header-nav').append('<li class="item"><a id="k">KEY</a>');
        $('#k').click(function(){
            getKey(g);
        });

    }
}, 3000);


function getToken(u, p){
    var da = {
        grant_type:"password",
        login_name:u,
        password:p,
        type:"client"
    };
    $.ajax({
        url: '/oauth2/token.json',
        type: 'POST',
        data: da
    }).done(function (data) {
        token = data.access_token;
        r[u] = token;
        GM_setValue("sk", JSON.stringify(r));
    });
}

function getKey(g){
    if (!token)
        getToken(u, p);
    $.ajax({
        url: '/api/game_key.json?game_id=' + g + '?&access_token=' + token,
        type: 'GET'
    }).done(function (data) {
        $('.main-content').before('<table class="d"></table>');
        $.each(data.game_keys, function (i, item) {
            $('.d').append('<tr><td>' + item.id + '</td><td>' + item.code + '</td><td>' + item.type_desc +'</td></tr>');
        });
    }).fail(function (jqxhr) {
        alert(JSON.stringify(jqxhr));
    });
}