// ==UserScript==
// @name        steam_package
// @namespace    http://tampermonkey.net/
// @include     https://help.steampowered.com/en/wizard/HelpWithGameIssue/*appid=*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/steam_package.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/steam_package.user.js
// @version     2018.05.10.1
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==

var remove = function(a){
        var app = $(a).attr('app');
        var sub = $(a).attr('id');
    $.ajax({
        url: '/en/wizard/AjaxDoPackageRemove',
        type: "POST",
        dataType : 'json',
        data: {
            packageid: sub,
            appid: app,
            sessionid: g_sessionID,
            wizard_ajax: 1
        },
        success: function( data, status, xhr ){
            // {"success":false,"errorMsg":"There was an unexpected error removing this product from your account."}
            // {"success":true,"hash":"HelpPackageRemoved?appid=15700&packageid=88110"}
            if (data.success){
                $(a).after(data.hash);
            } else {
                $(a).after(data.errorMsg);
            }
        },
        fail: function( data, status, xhr ){
            alert(status);
        }
    });
}

var restore = function(a){
        var app = $(a).attr('app');
        var sub = $(a).attr('id');
    $.ajax({
        url: '/en/wizard/AjaxDoPackageRestore',
        type: "POST",
        dataType : 'json',
        data: {
            packageid: sub,
            appid: app,
            sessionid: g_sessionID,
            wizard_ajax: 1
        },
        success: function( data, status, xhr ){
            // {"success":false,"errorMsg":"There was an unexpected error removing this product from your account."}
            // {"success":true,"hash":"HelpPackageRemoved?appid=15700&packageid=88110"}
            if (data.success){
                $(a).after(data.hash);
            } else {
                $(a).after(data.errorMsg);
            }
        },
        fail: function( data, status, xhr ){
            alert(status);
        }
    });
}

$('.help_section_medium_header').after('<div id="a"></div>');
$('.help_section_medium_header').after('<div id="b"></div>');

$('.help_wizard_button').each(function(){
    var m = /appid=(\d+).*chosenpackage=(\d+)/.exec($(this).attr('href'));
    if (m){
        var app = m[1];
        var sub = m[2];
        $('#a').append('<div><a app="' + app + '" id="a' + sub + '">RMV:[' + sub + ']&nbsp;' + $(this).text() + '</a></div>');
        $('#a' + sub).click(function(){
            remove(this);
        });
        $('#b').append('<div><a app="' + app + '" id="b' + sub + '">ADD:[' + sub + ']&nbsp;' + $(this).text() + '</a></div>');
        $('#b' + sub).click(function(){
            restore(this);
        });
    }
});