// ==UserScript==
// @name         sonkwo_fetch_key
// @namespace    http://tampermonkey.net/
// @version      2018.07.12.2
// @description  sonkwo fetch key
// @author       jacky
// @match        https://www.sonkwo.com/products/*
// @match        https://www.sonkwo.com/orders/*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/sonkwo_fetch_key.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/sonkwo_fetch_key.user.js
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       GM_log
// @grant       unsafeWindow
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

GM_addStyle("table{border:solid 1px;border-collapse:collapse !important;}");
GM_addStyle("td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px;font-family:simsun !important;}");
GM_addStyle(".d{font-size:20px;color:white !important;}");

var u = "rusania@gmail.com";
var p = "11111122a";
var access_token = GM_getValue("access_token");

var m = /game_id=(\d+)/.exec(document.URL);
var g = '';
if (m){
    g = m[1];
    setTimeout(function() {
        var h = $("div:contains('已拥有')");
        if (h.length > 0){
            $('.SK-header-nav').append(`<li class="item"><a href="javascript:void(0);" onclick="getKey(${g});">KEY</a>`);
            $('.new-content-left').append('<table class="d" id="g"></table><div class="d" id="m"></div>');
            if (!access_token)
                Login();
        }
    }, 3000);
} else {
    m = /orders\/(\d+)/.exec(document.URL);
    if (m){
        g = m[1];
        setTimeout(function() {
            $('.SK-header-nav').append(`<li class="item"><a href="javascript:void(0);" onclick="getOrder(${g});">KEY</a>`);
            $('.order-list').append('<table class="d" id="g"></table><div class="d" id="m"></div>');
            if (!access_token)
                Login();
        }, 3000);
    }
}

unsafeWindow.Login = function() {
    var data = {
        account: {
            email_or_phone_number_eq: u,
            password: p
        },
        _code: '',
        _key: ''
    };
    $.ajax({
        headers: {
            'Accept': 'application/vnd.sonkwo.v5+json',
            'Origin': 'file://'
        },
        url: '/api/sign_in.json?sonkwo_client=client&sonkwo_version=2.5.1.0517&locale=js',
        method: 'POST',
        async: false,
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
    }).done(function(data){
        if (data.access_token){
            GM_setValue('refresh_token', data.refresh_token);
            GM_setValue('access_token', data.access_token);
        } else {
            $('#m').append(JSON.Stringify(data));
        }
    }).fail(function(data){
        if (data.responseText)
            $('#m').append(JSON.Stringify(data));
        else
            $('#m').append(data.status);
    });
}

unsafeWindow.getOrder = function(g){
    $('#g').empty();
    $('#m').empty();
    if (access_token) {
        $.ajax({
            url: `/api/user_center/orders/${g}.json`,
            data: {
                'locale': 'js',
                'sonkwo_version': 1,
                'sonkwo_client': 'web'
            },
            headers: {
                'Accept': 'application/vnd.sonkwo.v4+json',
                'Authorization': 'Bearer ' + access_token
            },
            method: 'GET',
            async: false
        }).done(function(data){
            if (data.state && data.state=='completed'){
                $.each(data.key_status, function (i, item) {
                    if (item.status=='order.key_status.send')
                        getKey(item.game_id);
                });
            } else {
                $('#m').append(JSON.stringify(data));
            }
        }).fail(function(data){
            if (data.responseText)
                $('#m').append(data.responseText);
            else
                $('#m').append(data.status);
        });
    }
}

unsafeWindow.getKey = function(g){
    access_token = GM_getValue("access_token");
    var resp = '';
    if (access_token) {
        $.ajax({
            url: '/api/game_key.json',
            data: {
                'game_id': g,
                'sonkwo_client': 'client',
                'sonkwo_version': '2.5.1.0517',
                'from': 'client'
            },
            headers: {
                'Accept': 'application/vnd.sonkwo.v5+json',
                'Authorization': 'Bearer ' + access_token
            },
            method: 'GET',
            async: false
        }).done(function(data){
            if (data.game_keys){
                $.each(data.game_keys, function (i, item) {
                    $('#g').append(`<tr><td>${item.id}</td><td>${item.type_desc}</td><td>${item.code}</td></tr>`);
                });
            } else {
                $('#m').append(JSON.stringify(data));
            }
        }).fail(function(data){
            if (data.responseText)
                $('#m').append(data.responseText);
            else
                $('#m').append(data.status);
        });
    }
}