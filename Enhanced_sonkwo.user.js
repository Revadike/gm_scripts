// ==UserScript==
// @name        Enhanced sonkwo Personal
// @namespace   https://greasyfork.org/users/726
// @description 为杉果网站增加若干实用功能
// @author      Deparsoul
// @include     http*://www.sonkwo.com/products/*
// @icon        http://www.sonkwo.com/favicon.ico
// @version     2016.10.06.01
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==
var regexp = /products\/(\d+)/;
var match = regexp.exec(document.URL);
if (match) {
  var id = match[1];
  if (jQuery('#status-tag:contains("已拥有")').length > 0) {
    jQuery('#status-tag').replaceWith('<a id="get_serial_number" class="one-click-buy" title="已拥有" style="width:100px;" target="_blank" href="https://www.sonkwo.com/api/game/get_serial_number.json?game_id=' + id + '">点击提取序列号</a>');
    jQuery('#get_serial_number').click(function () {
      jQuery('#serial_number').slideUp('normal', function () {
        $(this).remove();
      });
      jQuery.getJSON(jQuery(this).attr('href'), function (data) {
        if (data.status == 'success') {
          data = data.data;
          var div = jQuery('<div id="serial_number" style="display:none;margin-top:10px;margin-bottom:10px;"></div>');
          div.appendTo(jQuery('.store-game-info'));
          for (var i = 0; i < data.length; ++i) {
            var d = data[i];
            div.append('<input type="text" style="width:210px;" onClick="this.select();" value="' + d.serial_number + '" /> ' + d.type_desc);
          }
          div.slideDown();
        } else {
          if (data.message) {
            alert('提取失败：' + data.message);
          }
        }
      });
      return false;
    });
  }
  if (jQuery('.store-game-description').text().search('【Steam】本游戏运行需通过') <= 0) {
    jQuery('.platform-section').append(' <span style="color:red;font-weight:bold;">注意：本游戏可能不提供Steam激活，购买前请确认</span>');
  }
  var store = '';
  var name_cn = $('.game-header-left').find('h2').text();
  var name_en = $('.game-header-left').find('p').text();
  var discount = $('.discount').text();
  var list_price = $('.list-price').text();
  var sale_price = $('.sale-price').text();
  var href = document.URL;
  var lowest = '';
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://steamdb.sinaapp.com/sonkwo/' + id + '.dat',
    onload: function (response) {
      var data = null;
      try {
        data = JSON.parse(response.responseText);
      } catch (e) {
      }
      var pv = $('.game-header-left').find('p') [0];
      if (data) {
        if (data.steam) {
          $(pv).wrapInner('<a style="display:inline;" href="' + data.steam + '"></a>');
          jQuery('head').append('<script src="http://steamdb.sinaapp.com/steam_info.js"></script>');
          store = data.steam;
        }
        var label = '';
        var price = '';
        if (data.price_lowest) {
          label += '杉果';
          price += '￥' + data.price_lowest.toFixed(2);
          lowest = '￥' + data.price_lowest.toFixed(2);
        }
        if (data.steam_lowest) {
          if (label) label += ' / ';
          if (price) price += ' / ';
          label += '其他商店';
          price += '$' + data.steam_lowest.toFixed(2);
        }
        if (label && price) {
          label += '低价';
          jQuery('.game-misc-info').append('<div class="info-item"><div class="item-label">' + label + '</div><div class="item-content">' + price + '</div></div>');
        }
      } else {
        var text = $(pv).text();
        $(pv).wrapInner('<a style="display:inline;" target="_blank" href="http://store.steampowered.com/search/?term=' + text + '"><span style="color:red;"></span></a>');
      }
      if (store) {
        name_en = '[url=' + store + ']' + name_en + '[/url]';
      }
      $(pv).append('<br>[tr][td]' + name_en + '<br>' + name_cn + '[/td][td]' + sale_price + '[/td][td]' + discount + '[/td][td]' + lowest + '[/td][td]' + list_price + '[/td][td][url]' + href + '[/url][/td][/tr]')
    }
  });
}
