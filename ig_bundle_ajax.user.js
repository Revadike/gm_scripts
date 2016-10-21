// ==UserScript==
// @name        ig_bundle_ajax
// @namespace   ig_bundle_ajax
// @description ig_bundle_ajax
// @include     https://www.indiegala.com/ajaxsale?sale_id=*
// @include     https://www.indiegala.com/gift?gift_id=*
// @icon        http://www.indiegala.com/favicon.ico
// @version     2016.10.11.1
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==
var how = $('#how-activate');
how.parent().append('<div id="area"></div>');
how.append('<button id="redeem">KEYS</button>');
$('#redeem').click(function () {
  $('#area').replaceWith('<table id="area"></table><div id="area2"></div>');
  var i = 1;
  $('.game-key-string').each(function () {
    var steam = $(this).find('.game-steam-url');
    var href = steam.attr('href');
    var id = /(\d+)/.exec(href) [1];
    var code = /serial_([A-F0-9]+)/.exec($(this).html()) [1];
    var link = 'https://www.indiegala.com/myserials/syncget?code=' + code + '&cache=false&productId=' + id;
    var key = $(this).find('.input-block-level').val();
    $('#area').append('<tr><td>' + steam.text() + '</td><td id="' + id + '">' + key + '</td></tr>');
    $('#area2').append('【' + i++ + '】【' + steam.text() + '】' + key+'<br>');
    if (key.length == 0) {
      var input = $(this).find('.info_key_text');
      $.getJSON(link, function (data) {
        if (data.status == 'success') {
          $(input).val(data.serial_number);
          document.getElementById(id).innerHTML = data.serial_number;
          $('<input value=' + data.entity_id + '/>').insertAfter($(input));
        } else {
          alert('redeem error');
        }
      });
    }
  });
});
$('.title-bundle-kind').append('<button id="gift_btn">GIFTS</button>');
$('.title-bundle-kind').append('<div id="area_gifts"></div>');
$('#gift_btn').click(function () {
  $('#area_gifts').replaceWith('<table id="area_gifts"></table>');
  var gifts = Array();
  $('.gift-links-box').each(function () {
    var num = $(this).find('.title-gift').text();
    var date = $.trim($(this).find('.info-gift').text());
    var link = $(this).find('a').attr('href');
    var color = link.substr( - 6, 6);
    link = '<tr><td title="' + date + '"style="color:#' + color + ';font-family:simsun">https://www.indiegala.com' + link + '</td></tr>';
    gifts.push(link);
    //$('#area_gifts').append('<tr><td>' + num + '</td><td>' + link + '</td><td>' + date + '</td></tr>');
  });
  gifts.sort();
  gifts.forEach(function (e) {
    $('#area_gifts').append(e);
  });
});
