// ==UserScript==
// @name        steam_package
// @namespace    http://tampermonkey.net/
// @include     https://help.steampowered.com/en/wizard/HelpWithGameIssue/*appid=*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/steam_package.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/steam_package.user.js
// @version     2018.06.21.1
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==

var m = /appid=(\d+)/.exec(document.URL);
var app = m[1];

var remove = function(a){
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

var hp = $('.help_section_medium_header');
if (hp.length > 0){
    $('.help_section_medium_header').after('<div id="a"></div>');
    $('.help_section_medium_header').after('<div id="b"></div>');
    $('.help_purchase_detail_box').after('<a id="rm">REMOVE</a>');

    $('.help_wizard_button').each(function(){
        var m = /chosenpackage=(\d+)/.exec($(this).attr('href'));
        if (m){
            var sub = m[1];
            $('#a').append('<div><a id="a' + sub + '">RMV:[' + sub + ']&nbsp;' + $(this).text() + '</a></div>');
            $('#a' + sub).click(function(){
                remove(this);
            });
            $('#b').append('<div><a id="b' + sub + '">ADD:[' + sub + ']&nbsp;' + $(this).text() + '</a></div>');
            $('#b' + sub).click(function(){
                restore(this);
            });
        }
    });
} else {

}

$('#rm').click(function(){
    var sub = prompt( 'Enter subID that you want to remove:' );
    if ( sub !== null ) {
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
                    $('#rm').after(data.hash);
                } else {
                    $('#rm').after(data.errorMsg);
                }
            },
            fail: function( data, status, xhr ){
                alert(status);
            }
        });
    };
});