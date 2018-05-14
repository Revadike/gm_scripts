// ==UserScript==
// @name        steam game cards
// @namespace    http://tampermonkey.net/
// @description steam game cards prices
// @include     http*://steamcommunity.com/profiles/*/gamecards/*
// @include     http*://steamcommunity.com/profiles/*/badges/
// @icon        http://steamcommunity.com/favicon.ico
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/steam_game_cards.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/steam_game_cards.user.js
// @version     2018.05.11.1
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==

var m = /badges/.exec(document.URL);
if (m){
    var lv = Math.floor($('.friendPlayerLevelNum').text() / 10) + 1;
    var xp = $('.profile_xp_block_xp').text().replace(/,/, '');
    m = /\d+/.exec(xp);
    if (m){
        xp = 0;
        for(var i=1;i<=lv;i++)
            xp += i * 1000;
        xp -= m[0];
        $('.profile_small_header_text').append('Lvl:&nbsp;' + lv * 10);
        $('.profile_small_header_text').append('&nbsp;Exp:&nbsp;' + xp);
        var cd = Math.ceil(xp/100) - $('.badge_craft_button').length;
        $('.profile_small_header_text').append('&nbsp;Card:&nbsp;' + cd);
    }
} else {
    var match = /sessionid=([a-z0-9]+);/.exec(document.cookie);
    match = /gamecards\/(\d+)/.exec(location.href);
    var id = match[1];
    var collect = $('.badge_cards_to_collect').html();
    var i = 0;
    $('.badge_detail_tasks').before('<table id="bl"></table><br><a id="bua" href="javascript:click();">BUY ALL</a>');
    $('#bua').click(function(){
        var j = 0;
        $('.bu').each(function(){
            var a = $(this);
            j++;
            setTimeout(function () {
                a.click();
            }, j * 3000);
        });
    });
    $('.badge_card_set_card.unowned').each(function () {
        var un = $(this).find('.badge_card_set_text.ellipsis') [0];
        var text = $.trim($(un).text());
        var hash = id + '-' + text;
        if (collect.indexOf(hash.replace(' ', '%20') + '%20%28Trading%20Card%29') > 0){
            hash += ' (Trading Card)';
            text += ' (Trading Card)';
        }
        if (collect.indexOf('%28Foil%29') > 0){
            hash += ' (Foil)';
            text += ' (Foil)';
        }
        // 1=usd,23=cny

        var url = '/market/priceoverview/?country=CN&currency=23&appid=753&market_hash_name=' + hash;
        var lowest = '';
        $.getJSON(url, function (data) {
            if (data.success === true) {
                lowest = data.lowest_price;
                var median = data.median_price;
                i++;
                match = /(\d+)\.(\d+)/.exec(lowest);
                var p = parseInt(match[1], 10) * 100 + parseInt(match[2], 10);
                var da = {
                    sessionid: g_sessionID,
                    currency: 23,
                    appid: 753,
                    market_hash_name: hash,
                    price_total: p,
                    quantity: 1
                };
                $('#bl').append('<tr><td><a target="_blank" href="/market/listings/753/' + hash + '">' + text + '</a></td><td><a class="bu" id="a' + i + '" href="javascript:click();">' + lowest + '</a></td><td id="c' + i + '"></td></tr>');
                var v = '#a' + i;
                var w = '#c' + i;
                $(v).click(function () {
                    $.ajax({
                        url: '/market/createbuyorder/',
                        type: 'POST',
                        async: false,
                        data: da,
                        crossDomain: true,
                        xhrFields: {
                            withCredentials: true
                        }
                    }).done(function (data) {
                        if (data.success === 1)
                        {
                            var buy_orderid = data.buy_orderid;
                            setTimeout(function () {
                                $.ajax({
                                    url: '/market/getbuyorderstatus/',
                                    type: 'GET',
                                    async: false,
                                    data: {
                                        sessionid: g_sessionID,
                                        buy_orderid: buy_orderid
                                    }
                                }).done(function (data) {
                                    if (data.success === 1)
                                        $(w).append(buy_orderid);
                                    //alert(buy_orderid);
                                    else
                                        $(w).append(data);
                                }).fail(function (jqxhr) {
                                    alert(jqxhr);
                                });
                            }, 3000);
                        }
                        else
                        {
                            //$(v).remove();
                            alert(data.message);
                        }
                    }).fail(function (jqxhr) {
                        alert(jqxhr);
                    });
                });
            }
        }).done(function () {
        }).fail(function (jqxhr) {
            alert(jqxhr);
        });
    });
}
