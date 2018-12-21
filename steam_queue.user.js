// ==UserScript==
// @name        steam_queue
// @namespace    http://tampermonkey.net/
// @include     http*://store.steampowered.com/app/*
// @include		http*://store.steampowered.com/agecheck/app/*
// @include		http*://store.steampowered.com/explore*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/steam_queue.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/steam_queue.user.js
// @version     2018.12.21.1
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==

var m = /back tomorrow to earn more/.exec(document.body.innerHTML);
if (m){

} else {
    m = /agecheck/.exec(location.href);
    if (m) {
        $('#ageYear').val('1988');
        $('#agecheck_form').submit();
        $('.btn_next_in_queue').click();
    }
    else {
        m = /explore/.exec(location.href);
        if (m) {
            $('#refresh_queue_btn').click();
        }
        else {
            $('#next_in_queue_form').submit();
        }
    }

    m = /Site Error/.exec(document.title);
    if (m) {
        m = /\d+/.exec(location.href);
        var url = `/app/${m[0]}`;
        $.ajax({
            url: url,
            type: "POST",
            dataType : 'json',
            data: {
                snr: '',
                appid_to_clear_from_queue: m[0],
                sessionid: g_sessionID,
            },
            success: function( data, status, xhr ){
            },
            fail: function( data, status, xhr ){
                alert(status);
            }
        });
    }
}

