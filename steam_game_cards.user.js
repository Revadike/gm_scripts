// ==UserScript==
// @name        steam_game_cards
// @namespace    http://tampermonkey.net/
// @description steam game cards prices
// @include     http://steamcommunity.com/profiles/*/gamecards/*
// @icon        http://steamcommunity.com/favicon.ico
// @updateURL 	https://github.com/rusania/gm_scipts/raw/master/steam_game_cards.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/steam_game_cards.user.js
// @version     2016.09.08
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==
var match = /sessionid=([a-z0-9]+);/.exec(document.cookie);
var sid = match[1];
var match = /gamecards\/(\d+)/.exec(location.href);
var id = match[1];
var collect = $('.badge_cards_to_collect').html();
var i = 0;
$('.badge_card_set_card.unowned').each(function () {
  var un = $(this).find('.badge_card_set_text.ellipsis') [0];
  var text = $.trim($(un).text());
  var hash = id + '-' + text;
  if (collect.indexOf(hash.replace(' ', '%20') + '%20%28Trading%20Card%29') > 0)
  {
    hash += ' (Trading Card)';
  }
  // 1=usd,23=cny

  var url = '/market/priceoverview/?country=CN&currency=23&appid=753&market_hash_name=' + hash;
  var lowest = '';
  $.getJSON(url, function (data) {
    if (data.success == true) {
      lowest = data.lowest_price;
      var median = data.median_price;
      i++;
      $(un).replaceWith('<div class="badge_card_set_text ellipsis"><div class="badge_card_set_text_qty"><a id="' + i + '" href="javascript:click();">' + lowest + '</a></div><a target="_blank" href="/market/listings/753/' + hash + '">' + text + '</a><div style="clear: right"></div></div>');
      match = /(\d+)\.(\d+)/.exec(lowest);
      var p = parseInt(match[1], 10) * 100 + parseInt(match[2], 10);
      var da = {
        sessionid: sid,
        currency: 23,
        appid: 753,
        market_hash_name: hash,
        price_total: p,
        quantity: 1
      };
      $('#' + i).click(function () {
        $.ajax({
          url: 'https://steamcommunity.com/market/createbuyorder/',
          type: 'POST',
          data: da,
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          }
        }).done(function (data) {
          if (data.success == true)
          {
            var buy_orderid = data.buy_orderid;
            setTimeout(function () {
              $.ajax({
                url: 'http://steamcommunity.com/market/getbuyorderstatus/',
                type: 'GET',
                data: {
                  sessionid: sid,
                  buy_orderid: buy_orderid
                }
              }).done(function (data) {
                if (data.success == true)
                {
                  alert(data.purchase_amount_text);
                } 
                else
                {
                  alert(data.active);
                }
              }).fail(function (jqxhr) {
                alert(jqxhr);
              });
            }, 3000);
          } 
          else
          {
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
