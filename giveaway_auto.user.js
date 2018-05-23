// ==UserScript==
// @name         giveaway_auto
// @namespace    http://tampermonkey.net/
// @version      2018.05.23.1
// @description  giveaway su auto
// @author       jacky
// @icon        https://giveaway.su/favicon.ico
// @match        https://giveaway.su/giveaway/view/*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/giveaway_auto.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/giveaway_auto.user.js
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @connect     store.steampowered.com
// @connect     steamcommunity.com
// @grant       GM_xmlhttpRequest
// @grant       unsafeWindow
// @grant       GM_log
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

setTimeout(function () {
    $('.giveaway-actions').after('<div id="a"></div>');
    $('#actions').find('tr').each(function(){
        var id = $(this).attr('data-action-id');
        var title = $.trim($(this).text());
        var color = '#FFFFFF';
        if (/Steam group/.exec(title)){
            color = '#00FF7F';
            unkown(id, 4);
        }
        if(/game/.exec(title)){
            var x = '8B';
            var y = '00';
            var z = '00';
            var i = 0;
            if (/follow/i.exec(title)){
                y = '8B';
                i += 1;
            }
            if (/wishlist/i.exec(title)){
                z = '8B';
                i += 2;
            }
            unkown(id, i);
            color = `#${x}${y}${z}`;
        }
        if (/Steam curator/.exec(title)){
            color = '#836FFF';
            unkown(id, 5);
        }
        var a = $(this).find("a:last").get(0).click();
        $('#a').append(`<p>${id}&#9;<span style="color:${color};">${title}</span></p>`);
    });
    setTimeout(function () {
        $('#actions').find('.btn-default').click();
    },5000);
},5000);

unsafeWindow.wish = function(id, sid){
    var data = `appid=${id}&sessionid=${sid}`;
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://store.steampowered.com/api/addtowishlist",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: data,
        onload: function(response) {
            if (/true/.exec(response.responseText))
                alert('wish done');
        },
        onerror:  function(response) {
            alert(response.statusText);
        },
        ontimeout:  function(response) {
            alert(response.statusText);
        },
    });
}

unsafeWindow.follow = function(id, sid){
    var data = `appid=${id}&sessionid=${sid}`;
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://store.steampowered.com/explore/followgame/",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: data,
        onload: function(response) {
            if (/true/.exec(response.responseText))
                alert('follow done');
        },
        onerror:  function(response) {
            alert(response.statusText);
        },
        ontimeout:  function(response) {
            alert(response.statusText);
        },
    });
}

unsafeWindow.clan = function(id, sid){
    var data = `clanid=${id}&sessionid=${sid}&follow=1`;
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://store.steampowered.com/curators/ajaxfollow",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: data,
        onload: function(response) {
            if (/success":1/.exec(response.responseText))
                alert('curators done');
        },
        onerror:  function(response) {
            alert(response.statusText);
        },
        ontimeout:  function(response) {
            alert(response.statusText);
        },
    });
}

unsafeWindow.group = function(id, sid){
    var data = `action=join&sessionID=${sid}`;
    GM_xmlhttpRequest({
        method: "POST",
        url: "https://steamcommunity.com/groups/" + id,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: data,
        onload: function(response) {
            if (/'true'/.exec(response.responseText))
                alert('follow done');
        },
        onerror:  function(response) {
            alert(response.statusText);
        },
        ontimeout:  function(response) {
            alert(response.statusText);
        },
    });
}

unsafeWindow.unkown = function(id, i){
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://giveaway.su/action/redirect/" + id,
        onload: function(response) {
            var m = /g_sessionID = "([0-9a-f]+)"/.exec(response.responseText);
            var sid = m[1];
            var id = '';
            if (i < 4){
                m = /app\/(\d+)/.exec(response.responseText);
                id= m[1];
                if (i==1){
                    follow(id, sid);
                }
                if (i==2){
                    wish(id, sid);
                }
                if (i==3){
                    wish(id, sid);
                    follow(id, sid);
                }
            }
            if (i==4){
                if (/'join_group_form'/.exec(response.responseText)){
                    m = /groups\/([^\/#"]+)/.exec(response.responseText);
                    group(m[1], sid);
                }
            }
            if (i==5){
                m = /clanid":(\d+)/.exec(response.responseText);
                clan(m[1], sid);
            }
        },
        onerror:  function(response) {
            alert(response.statusText);
        },
        ontimeout:  function(response) {
            alert(response.statusText);
        },
    });
}
