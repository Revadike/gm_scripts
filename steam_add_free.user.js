// ==UserScript==
// @name        steam_add_free
// @namespace   steam_add_free
// @description steam_add_free
// @include     https://store.steampowered.com/account/licenses/*
// @grant unsafeWindow
// @updateURL https://github.com/rusania/gm_scipts/raw/master/steam_add_free.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/steam_add_free.user.js
// @version     2019.03.13.1
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @connect     steamdb.info
// @grant GM_xmlhttpRequest
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_addStyle

// ==/UserScript==
$('h2.pageheader').after( '<div id="box" style="margin-top: 10px; margin-bottom: -20px; color: #8f98a0;"></div>');
$('#box').append('<a class="btnv6_blue_hoverfade btn_small_tall" href="javascript:void(0);" onclick="addman();" style="float: right;"><span>Add</span></a>');
$('#box').append('<a class="btnv6_blue_hoverfade btn_small_tall" href="javascript:void(0);" onclick="nocost();" style="float: right;"><span>NoCost</span></a>');
$('#box').append('<a class="btnv6_blue_hoverfade btn_small_tall" href="javascript:void(0);" onclick="free();" style="float: right;"><span>Free</span></a>');
$('#box').append('<a class="btnv6_blue_hoverfade btn_small_tall" href="javascript:void(0);" onclick="err();" style="float: right;"><span>Err</span></a>');
$('#box').append('<a class="btnv6_blue_hoverfade btn_small_tall" href="javascript:void(0);" onclick="userdata();" style="float: right;"><span>USER</span></a>');
$('#box').append('<span id="su"></span>');

var ignoredApps = {};
var ownedApps = {};
var ownedPackages = {};
var wishlist = {};
var success = {};
var error = [];

unsafeWindow.addman = function() {
    var sID = prompt( 'Enter Free subID to add to account:' );
    if ( sID !== null ) {
        $.ajax( {
            type: 'POST',
            dataType: 'text',
            url: '//store.steampowered.com/checkout/addfreelicense',
            data: {
                action: 'add_to_cart',
                sessionid: g_sessionID,
                subid: sID
            },
            success:function(result){
                var r = $(result).find('.add_free_content_success_area p:first,.error');
                if (r.length > 0) {
                    alert($(r).text());
                }
            },
            error:function(xhr,status,error){
                alert(status);
            }
        });
    };
};

unsafeWindow.userdata = function() {
    $.ajax( {
        type: 'GET',
        url: '//store.steampowered.com/dynamicstore/userdata/?l=english',
        success:function(r){
            ignoredApps = r.rgIgnoredApps;
            ownedApps = r.rgOwnedApps;
            ownedPackages = r.rgOwnedPackages;
            wishlist = r.rgWishlist;
            $('#su').append('<p>更新完毕</p>');
        },
        error:function(xhr,status,error){
            alert(status);
        }
    });
};

unsafeWindow.nocost = function(){
    $('#su').empty();
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://steamdb.info/search/?a=sub_keynames&keyname=1&operator=3&keyvalue=0",
        onload: function(response) {
            var a = [];
            $(response.responseText).find('.package').each(function(){
                var b = parseInt($(this).attr('data-subid'));
                var t = $.trim($($(this).find('td')[1]).text());
                if (a.length>50)
                    return false;
                if ($.inArray(b, ownedPackages) > -1)
                    $('#su').append(`<p><span style="color:white;">${t}</span></p>`);
                else
                    a.push(b);
            });

            $.each(a, function (k, v) {
                var j = k;
                var b = v;
                $('#su').append(`<p id="${j}">${j}&#9;${b}&#9;</p>`);
                $.ajax({
                    type: 'POST',
                    dataType: 'text',
                    url: '//store.steampowered.com/checkout/addfreelicense',
                    data: {
                        action: 'add_to_cart',
                        sessionid: g_sessionID,
                        subid: b
                    },
                    success:function(result){
                        var r = $(result).find('.add_free_content_success_area p:first,.error');
                        if (r.length > 0)
                            $(`#${j}`).append($(r).text());
                        else
                            $(`#${j}`).append('Error');
                    },
                    error:function(xhr,status,error){
                        $(`#${j}`).append(status);
                    }
                });

            });
        },
        onerror:  function(response) {
            alert(response.statusText);
        },
        ontimeout:  function(response) {
            alert(response.statusText);
        },
    });
}

unsafeWindow.free = function(){
    GM_setValue("error", JSON.stringify(error));
}

unsafeWindow.free = function(){
    $('#su').empty();
    $('#su').append('<table id="b"></table>');
    //var txt = GM_getValue("error", "[]");
    //error = JSON.parse(txt);
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://steamdb.info/freepackages/",
        onload: function(response) {
            var a = [];
            var j = 1;
            $(response.responseText).find('.package').each(function(){
                var b = parseInt($(this).attr('data-subid'));
                var c = parseInt($(this).attr('data-appid'));
                var m = /Trailer|Demo|Trial/ig.exec($(this).html());
                if (a.length>50)
                    return false;
                if (!m){
                    var t = $.trim($(this).text());
                    if ($.inArray(c, ownedApps) > -1 ||$.inArray(b, ownedPackages) > -1)
                    {
                        //$('#su').append(`<p><span style="color:white;">${t}</span></p>`);
                    }
                    else{
                        a.push(b);
                        //$('#b').append(`<tr><td>${j++}</td><td><a href="https://steamdb.info/sub/${b}/">${t}</a></td><td id="${b}"></td></tr>`);
                    }
                }
            });

            $('#su').append(a.join(','));

            /*
            $.each(a, function (k, v) {
                var j = k;
                var b = v;
                //$('#su').append(`<p id="${j}">${j}&#9;${b}&#9;</p>`);
                $.ajax({
                    type: 'POST',
                    dataType: 'text',
                    url: '//store.steampowered.com/checkout/addfreelicense',
                    data: {
                        action: 'add_to_cart',
                        sessionid: g_sessionID,
                        subid: b
                    },
                    success:function(result){
                        var r = $(result).find('.add_free_content_success_area p:first,.error');
                        if (r.length > 0){
                            $(`#${b}`).append($(r).text());
                            error.push(b);
                        }
                        else
                            $(`#${b}`).append('Error');
                    },
                    error:function(xhr,status,error){
                        $(`#${b}`).append(status);
                    }
                });

            });
            */
        },
        onerror:  function(response) {
            alert(response.statusText);
        },
        ontimeout:  function(response) {
            alert(response.statusText);
        },
    });
}