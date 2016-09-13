// ==UserScript==
// @name        bsapi
// @namespace   bsapi
// @description bs api
// @include     https://www.bundlestars.com/en/bundle/*
// @include     https://www.bundlestars.com/en/orders/*
// @icon        https://cdn.bundlestars.com/production/brand/favicon.ico
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/bsapi.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/bsapi.user.js
// @version     2016.09.13
// @run-at      document-end
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==
var regexp = /en\/[a-z]+/;
var match = regexp.exec(location.href);
if (match == 'en/bundle') {
  var url = document.URL.replace(/en\/bundle/, 'api/products');
  var li = $('#navbarBundles').parent().parent();
  li.append('<li><a target="_blank" href="' + url + '"><span style="color:red;font-weight:bold;">API</span></a></li>');
  li.append('<li><a id="btn"><span style="font-weight:bold;">INFO</span></a></li>');
  $('#btn').click(function () {
    if ($('.product-bg-color').find('.info').length > 0) {
      $('.info').remove();
      $('.info2').remove();
    }
    $('.product-bg-color').append('<div class="info"></div>');
    $('.product-bg-color').append('<div class="info2"></div>');
    GM_xmlhttpRequest({
      method: 'GET',
      url: url,
      onload: function (response) {
        var data = JSON.parse(response.responseText);
        if (data.seo) {
          $('.info').append('<div>Bundle Stars ' + data.seo.title + ' 慈善包上线，<span id="price"></span>刀可获得完整内容<br>[b]购买地址：<br>' + document.URL + '<br><br>包含<span id="g"></span>款游戏：[/b]</div>');
          $('.info2').append('<div>&lt;FONT size=2 face=黑体&gt;&lt;P&gt;Bundle Stars ' + data.seo.title + '&amp;nbsp;慈善包&lt;/P&gt;&lt;P&gt;&lt;FONT color=#ff0000&gt;发货方式为激活码，此站不包含礼物链接&lt;/FONT&gt;&lt;/P&gt;&lt;P&gt;包含<span id="g2"></span>款STEAM游戏：&lt;/P&gt;&lt;P&gt;<span class="tb"></span>&lt;/P&gt;&lt;P&gt;&lt;/P&gt;&lt;/FONT&gt;</div>');
        }
        if (data.bundles) {
          var k = 0;
          $.each(data.bundles, function (i, item) {
            if (item.price) {
              $('.info').append('<div>[quote][b]支付<b>$' + item.price.USD / 100 + '</b><span id=ag' + i + '></span>获得以下游戏：[/b]<br>( <span id=cur' + i + '></span>)<br><span id=' + i + '></span>[/quote]</div>');
              $('#price').empty();
              $('#price').append(item.price.USD / 100);
              if (i > 0) {
                $('#ag' + i).append('再');
              }
              $.each(item.price, function (key, price) {
                $('#cur' + i).append(key + ':' + price / 100 + ' ');
              });
            }
            if (item.games) {
              $.each(item.games, function (j, game) {
                if (game.steam) {
                  var id = game.steam.id;
                  var addon = 'app';
                  // game.steam.sub
                  var steam = 'http://store.steampowered.com/' + addon + '/' + id + '/';
                  $('#' + i).append('<div id=' + id + '>[url=' + steam + ']' + game.name + '[/url]</div>');
                  $('.tb').append('<div id=tb_' + id + '>' + ++k + '.&amp;nbsp;' + game.name + '</div>');
                  $('.tb').append('<div>&lt;BR&gt;&lt;FONT color=#0055ff&gt;&amp;nbsp;&amp;nbsp;' + steam + '&lt;/FONT&gt;&lt;BR&gt;</div>');
                  //$('#' + i).append('<div>' + steam + '</div>');
                  var url = 'http://steamdb.sinaapp.com/' + addon + '/' + id + '/data.js?v=34';
                  GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    onload: function (response) {
                      var match = /({.*});/.exec(response.responseText);
                      if (match) {
                        var data = JSON.parse(match[1]);
                        if (data.name_cn) {
                          $('#' + id).append(' (' + data.name_cn + ')');
                          $('#tb_' + id).append(' (' + data.name_cn + ')');
                        }
                      }
                    }
                  });
                  GM_xmlhttpRequest({
                    method: 'GET',
                    url: steam + '?l=chinese',
                    onload: function (response) {
                      var res = $(response.responseText).find('span.game_review_summary');
                      if (res.length > 0) {
                        var review = $(res[0]).text();
                        $('#' + id).append('[color=DeepSkyBlue][b] ' + review + '[/b][/color]');
                        $('#tb_' + id).append('&lt;FONT color=#66c0f4&gt;&amp;nbsp;' + review + '&lt;/FONT&gt;');
                      }
                      var match = /集换式卡牌/.exec($(response.responseText).find('#category_block').text());
                      if (match) {
                        $('#' + id).append('[color=Red][b] 有卡[/b][/color]');
                        $('#tb_' + id).append('&lt;FONT color=#ff0000&gt;&amp;nbsp;有卡&lt;/FONT&gt;');
                      }
                    }
                  });
                }
              });
            }
          });
          $('#g').append(k);
          $('#g2').append(k);
        }
      }
    });
  });
} 
else if (match == 'en/orders') {
  var li = $('#navbarBundles').parent().parent();
  li.append('<li><a id ="redeem" href="#"><span style="color:red;font-weight:bold;">REDEEM</span></a></li>');
  $('#redeem').click(function () {
    if ($('#list').length > 0) {
      $('#list').remove();
    }
    $('.order').append('<table id="list"></table>');
    $('.bundle').each(function () {
      var i = 1;
      $(this).parent().find('.order-table').each(function () {
        var title = $(this).find('.title').text();
        var key = $(this).find('.form-control').val();
        if (key == undefined) {
          var a = $(this).find('a');
          setTimeout(function () {
            a.click();
          }, 2000);
        } //var f = '<tr><td>' + title + '</td><td>' + key + '</td></tr>';

        var f = '【' + i++ + '】【' + title + '】' + key + '<br>';
        $('#list').append(f);
      });
    });
  });
}
