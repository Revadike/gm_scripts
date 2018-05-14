// ==UserScript==
// @name        steam_booster_pack
// @namespace    http://tampermonkey.net/
// @description steam_booster_pack
// @include     https://steamcommunity.com/profiles/*/inventory/
// @icon        http://steamcommunity.com/favicon.ico
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/steam_booster_pack.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/steam_booster_pack.user.js
// @version     2018.05.11.1
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==

$('.profile_small_header_text').append('<a id="unpack">UNPACK</a>');

$('#unpack').click(function(){
    var url = 'https://steamcommunity.com/inventory/76561198104311295/753/6?l=english&count=100';
        $.getJSON(url, function (data) {
            if (data.success) {
                var k = new Array();
                data.assets.forEach(function(v){
                    k[v.classid] = v.assetid;
                });
                data.descriptions.forEach(function(v){
                    if (v.type == 'Booster Pack'){
                        $.ajax({
                            url: '/profiles/76561198104311295/ajaxunpackbooster/',
                            type: "POST",
                            dataType : 'json',
                            data: {
                                'appid': v.market_fee_app,
                                'communityitemid': k[v.classid],
                                'sessionid': g_sessionID
                            },
                            success: function( data, status, xhr ){
                                $('.profile_small_header_text').append(v.market_fee_app);
                            } ,
                            fail: function( data, status, xhr ){
                                $('.profile_small_header_text').append(status);
                            }
                            });
                    }
                });
            }
        }).done(function () {
        }).fail(function (jqxhr) {
            alert(jqxhr);
        });
});