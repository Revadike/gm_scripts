// ==UserScript==
// @name        bundle_info
// @namespace   http://tampermonkey.net/
// @description bundle games info
// @include     http*://store.steampowered.com/sale/*
// @include     http*://www.sonkwo.com/activity/*
// @include     http*://yuplay.ru/news/*
// @include     http*://yuplay.ru/product/*
// @include     http*://directgames.co.kr/event/event.html
// @include     http*://directgames.co.kr/game/game_page.html?product_code=*
// @include     http*://www.bundlestars.com/en/bundle/*
// @include     http*://www.bundlestars.com/en/orders/*
// @include     http*://www.dailyindiegame.com/superbundle_*
// @include     http*://www.dailyindiegame.com/account_page*
// @include     http*://*otakumaker.com/index.php/account/admin/deal/view/*
// @include     http*://www.indiegala.com/*
// @exclude     http*://www.indiegala.com/profile?user_id=*
// @exclude     http*://www.indiegala.com/ajaxsale?sale_id=*
// @exclude     http*://www.indiegala.com/gift?gift_id=*
// @exclude     http*://www.indiegala.com/successpay*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/bundle_info.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/bundle_info.user.js
// @version     2016.09.26
// @run-at      document-end
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==
$('head').append('<style type="text/css">table{border:solid 1px;border-collapse:collapse;}td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px;font-size:16px;}</style>');
var match = /store.steampowered.com\/sale/.exec(document.URL);
if (match) {
  $('.supernav_container').append('<a class="menuitem" id="btn">INFO</a>');
  $('.game_title_area').after('<table id="info"></table>');
  $('#btn').click(function () {
    $('#info').empty();
    $('#info').append('<tr><td>序号</td><td>游戏</td><td>优惠价</td><td>折扣</td><td>原价</td><td>集合</td></tr>');
    var i = 0;
    $('.sale_page_purchase_item').each(function () {
      var a = $(this).find('a') [1];
      var title = $(a).text();
      var link = $(a).attr('href').replace(/\?.*/, '');
      var discount = $(this).find('.discount_pct').text();
      var del = $(this).find('.discount_original_price').text(); //.replace(/￥/gm, '');
      var p = $(this).find('.discount_final_price').text(); //.replace(/￥/gm, '');
      var pak = '';
      match = /addToCart\((\d+)/.exec($(this).html());
      if (match != null) {
        pak = '<a href="http://steamdb.info/sub/' + match[1] + '/" target="_blank">' + match[1] + '</a>';
      }
      $('#info').append('<tr><td>' + ++i + '</td><td><a href="' + link + '" target="_blank">' + title + '</a></td><td>' + p + '</td><td>' + discount + '</td><td>' + del + '</td><td>' + pak + '</td></tr>');
    });
  });
} //steam sale

match = /sonkwo.com\/activity/.exec(document.URL);
if (match) {
  $('#nav_bar').append('<li><a id="btn">INFO</a></li>');
  $('.zs').before('<table id="info" class="sale-content"></table>');
  $('#btn').click(function () {
    $('#info').empty();
    $('#info').append('<tr><td>序号</td><td>游戏</td><td>优惠价</td><td>折扣</td><td>原价</td></tr>');
    var i = 0;
    $('.sale-content').find('li').each(function () {
      var a = $(this).find('a') [0];
      var title = $(a).attr('title');
      var link = $(a).attr('href');
      var discount = $(this).find('h5').text().replace(/OFF/gm, '');
      var del = $(this).find('p.text-through').text(); //.replace(/￥/gm, '');
      var p = $(this).find('p.text-none').text(); //.replace(/￥/gm, '');
      $('#info').append('<tr><td>' + ++i + '</td><td><a href="' + link + '" target="_blank">' + title + '</a></td><td>' + p + '</td><td>-' + discount + '</td><td>' + del + '</td></tr>');
    });
    i = 0;
    $('.zs').find('li').each(function () {
      var a = $(this).find('a') [0];
      var title = $(a).attr('title');
      var link = $(a).attr('href');
      var discount = $(this).find('h5').text().replace(/OFF/gm, '');
      var del = $(this).find('p.text-through').text().replace(/￥/gm, '');
      var p = $(this).find('p.text-none').text().replace(/￥/gm, '');
      $('#info').append('<tr><td>' + ++i + '</td><td><a href="' + link + '" target="_blank">' + title + '</a></td><td>' + p + '</td><td>-' + discount + '</td><td>' + del + '</td></tr>');
    });
  });
} //sonkwo activity

match = /directgames.co.kr\/event/.exec(document.URL);
if (match) {
  $('.navbar-nav').append('<li class="mega" data-level="1"><a itemprop="url" id="btn">INFO</a></li>');
  $('#system-message-container').append('<div>实时汇率：<span id="ratio">0</ratio></div>');
  $('#system-message-container').append('<table id="info"></table>');
  $('#btn').click(function () {
    $('#info').empty();
    $('#info').append('<tr><td>序号</td><td>游戏</td><td>优惠价</td><td>人民币</td><td>折扣</td></tr>');
    var f = function () {
      var i = 0;
      var r = $('#ratio').text();
      $('.vmproduct').each(function () {
        var a = $(this).find('a') [0];
        var title = $(a).attr('title');
        var link = $(a).attr('href');
        var discount = $($(this).find('div.pull-left') [0]).text();
        var right = $(this).find('div.pull-right') [0];
        var p = $(right).text().replace(/,/gm, '').replace(/ 원/gm, '');
        var p2 = (p * r).toFixed(2);
        $(right).append('<br><span style="color:red; font-weight: bold;">&yen;' + p2 + '</span>');
        $('#info').append('<tr><td>' + ++i + '</td><td><a href="' + link + '" target="_blank">' + title + '</a></td><td>&#8361;' + p + '</td><td>&yen;' + p2 + '</td><td>-' + discount + '</td></tr>');
      });
    };
    getRatio('KRWCNY', f);
  });
} //directgames event

match = /games.co.kr\/game\/game_page/.exec(document.URL);
if (match) {
  $('.navbar-nav').append('<li class="mega" data-level="1"><a itemprop="url" id="btn">INFO</a></li>');
  $('div.PricesalesPrice').append('<span style="color:red; font-weight: bold;" id="cny"></span>');
  $('#productPrice8').append('<div>实时汇率：<span id="ratio">0</ratio></div>');
  $('#btn').click(function () {
    var f = function () {
      $('#cny').empty();
      var r = $('#ratio').text();
      var p = $.trim($('span.PricesalesPrice').text().replace(/,/gm, ''));
      var q = (p * r).toFixed(2);
      $('#cny').append('&yen;' + q);
    };
    getRatio('KRWCNY', f);
  });
} //directgames game_page

match = /ru\/news/.exec(document.URL);
if (match) {
  $($('.navi').children() [0]).append('<li><a id="btn">INFO</a></li>');
  $('.section-main').append('<div>实时汇率：<span id="ratio">0</ratio></div>');
  $('.section-main').append('<table id="info"></table>');
  $('#btn').click(function () {
    $('#info').empty();
    $('#info').append('<tr><td>序号</td><td>游戏</td><td>原价</td><td>优惠价</td><td>人民币</td><td>折扣</td></tr>');
    var f = function () {
      var i = 0;
      var r = $('#ratio').text();
      $('.section-main').find('li').each(function () {
        var m = $(this).children();
        var title = $(m[0]).text();
        var link = $(m[0]).attr('href');
        var del = $(m[1]).text();
        var p = /(\d+) руб/.exec($(this).text()) [1];
        var p2 = (p * r).toFixed(2);
        var discount = ((1 - p / del).toFixed(2)) * 100;
        $('#info').append('<tr><td>' + ++i + '</td><td><a href="' + link + '" target="_blank">' + title + '</a></td><td>&#8381;' + del + '</td><td>&#8381;' + p + '</td><td>&yen;' + p2 + '</td><td>-' + discount + '%</td></tr>');
      });
    };
    getRatio('RUBCNY', f);
  });
} //yuplay news

match = /ru\/product/.exec(document.URL);
if (match) {
  $($('.navi').children() [0]).append('<li><a id="btn">INFO</a></li>');
  $('.good-title').append('<div>实时汇率：<span id="ratio">0</span></div>');
  $('#btn').click(function () {
    var f = function () {
      var r = $('#ratio').text();
      $('.price').each(function () {
        var pr = (/(\d+)\s*<sp/.exec($(this).html())) [1];
        var q = (pr * r).toFixed(2);
        $(this).append('<span style="color:red; font-weight: bold;">&yen;' + q + '</span>');
      });
      var p = $('.list-character p:last-child');
      if (p.html().search('SUB_ID') > 0) {
        var s = p.find('span');
        var url = 'http://steamdb.sinaapp.com/sub/' + s.text() + '/tooltip';
        s.append('<a target="_blank" href="http://steamdb.info/sub/' + s.text() + '/">API</a>');
      }
    };
    getRatio('RUBCNY', f);
  });
} //yuplay product

match = /bundlestars\.com\/en\/bundle/.exec(document.URL);
if (match) {
  var url = document.URL.replace(/en\/bundle/, 'api/products');
  var li = $('#navbarBundles').parent().parent();
  li.append('<li><a target="_blank" href="' + url + '"><span style="color:red;font-weight:bold;">API</span></a></li>');
  li.append('<li><a id="btn">INFO</a></li>');
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
          getGridHead('Bundle Stars ' + data.seo.title);
        }
        if (data.bundles) {
          var k = 0;
          $.each(data.bundles, function (i, item) {
            if (item.price) {
              $('.info').append('<div>[quote][b]支付<b>$' + item.price.USD / 100 + '</b><span id=ag' + i + '></span>获得以下游戏：[/b]<br>( <span id=cur' + i + '></span>)<br><span id=' + i + '></span>[/quote]</div>');
              $('#p').empty();
              $('#p').append(item.price.USD / 100);
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
                  if (game.steam.sub) {
                    addon = 'sub';
                    id = game.steam.packages[0];
                  }
                  getGridContent(id, addon, game.name, '#' + i, ++k);
                }
              });
            }
          });
          $('.g').append(k);
        }
      }
    });
  });
} //bundlestars bundle

match = /bundlestars\.com\/en\/orders/.exec(document.URL);
if (match) {
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
} //bundlestars orders

match = /com\/superbundle_/.exec(document.URL);
if (match) {
  $('#DIG2TableGray').append('<div><a id="btn"><span style="color:white;">INFO</span></a></div>');
  $('#DIG2TableGray').append('<div class="info" style="color:#ffffff"></div>');
  $('#DIG2TableGray').append('<div class="info2" style="color:#ffffff"></div>');
  $('#btn').click(function () {
    $('.info').empty();
    $('.info2').empty();
    var title = $($('.DIG2-TitleOrange') [0]).text();
    var price = $('#price3').val();
    getGridHead('DailyIndieGame ' + title);
    match = /_seconds   = (\d+);/.exec($('body').html());
    if (match) {
      var now = new Date();
      var time = new Date(now.valueOf() + match[1] * 1000);
      $('#time').append('[' + (now.getMonth() + 1) + '.' + now.getDate() + '-' + (time.getMonth() + 1) + '.' + time.getDate() + ']');
    }
    $('#p').append(price);
    $('.info').append('<div>[quote]<span id="g3"></span>[/quote]</div>');
    $('.info').append('<div><span style="color:#32cd32;">[b][color=#32cd32]支付$' + price + '获得1份完整包[/color][/b]</span></div>');
    $('.info').append('<div><span style="color:#b200ff;">[b][color=#b200ff]支付超过均价获得2份完整包[/color][/b]</span></div>');
    var k = 0;
    $('#DIG2TableGray').find('.DIG-content').each(function () {
      var t = $($(this).find('div.DIG2-TitleOrange') [0]).text();
      var steam = $($(this).find('a') [0]).attr('href');
      match = /app\/(\d+)/.exec(steam);
      var id = '0';
      if (match) {
        id = match[1];
      }
      getGridContent(id, 'app', t, '#g3', ++k);
    });
    $('.g').append(k);
  });
} //dailyindiegame bundle

match = /com\/account_page/.exec(document.URL);
if (match) {
  $('<div><a class="DIG2-TitleOrange" id="claim">CLAIM</a></div>').insertBefore('#TableKeys');
  $('<div id="keys"></div>').insertBefore('#TableKeys');
  $('#claim').click(function () {
    $($('#TableKeys').children() [0]).find('tr').each(function () {
      var t = $(this).find('td');
      var name = $(t[2]).text();
      var key = $(t[4]).text();
      var id = '0';
      if (key.search('Reveal key') > 0) {
        // http://www.dailyindiegame.com/DIG2-getkey.php?id=1149728
        // revealKey(2,1149727);
        var match = /\d+,(\d+)/.exec($(t[4]).html());
        if (match != null) {
          var id = match[1];
          var url = 'http://www.dailyindiegame.com/DIG2-getkey.php?id=' + id;
          $.ajax({
            url: url
          }).done(function (data) {
            $('#' + id).empty();
            $('#' + id).append(data);
          });
        }
      }
      $('#keys').append('<tr><td>【' + name + '】<span id="' + id + '">' + key + '</span></td></tr>');
    });
  });
} //dailyindiegame account

match = /admin\/deal\/view/.exec(document.URL);
if (match) {
  $('.em_DealInfoRight').append('<div><a id="btn"><span style="color:red;font-weight:bold;">INFO</span></a></div>');
  $('.em_DealInfoRight').append('<div class="info"></div>');
  $('.em_DealInfoRight').append('<div class="info2"></div>');
  var colors = [
    '#32cd32',
    '#ff6a00',
    '#df0101',
    '#b200ff'
  ];
  var mons = [
    'Month',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  $('#btn').click(function () {
    $('.info').empty();
    $('.info2').empty();
    var match = /(.*) (\d+) ([A-Za-z]+) to (\d+) ([A-Za-z]+)/.exec(document.title);
    getGridHead('OtakuMaker ' + match[1]);
    $('.info').append('<div>[quote]<span id="g3"></span>[/quote]</div>');
    $('#time').append('[' + mons.indexOf(match[3], 0) + '.' + match[2] + '-' + mons.indexOf(match[5], 0) + '.' + match[4] + ']');
    var games = $('.gantry-width-33');
    $('.g').append(games.length);
    var k = 0;
    games.each(function () {
      var title = $(this).find('h3').text();
      var href = $(this).find('a').attr('href');
      match = /app\/(\d+)/.exec(href);
      var id = '0';
      if (match) {
        id = match[1];
      }
      getGridContent(id, 'app', title, '#g3', ++k);
    });
    var i = 0;
    var text = $('.em_DealInfoRight').text();
    match = /([0-9]+) Games Only : \$([0-9.]+)/.exec(text);
    if (match) {
      $('.info').append('<div><span style="color:' + colors[i] + ';">[b][color=' + colors[i++] + ']支付$' + match[2] + '获得1份完整包（' + match[1] + '个KEY）[/color][/b]</span></div>');
      $('#p').append(match[2]);
    }
    var regx = /([0-9]+) BUNDLES .* ([0-9]+) keys .* \$([0-9.]+)/g;
    match = regx.exec(text);
    while (match) {
      $('.info').append('<div><span style="color:' + colors[i] + ';">[b][color=' + colors[i++] + ']支付$' + match[3] + '获得' + match[1] + '份完整包（' + match[2] + '个KEY）[/color][/b]</span></div>');
      match = regx.exec(text);
    }
    $('.info').append('<div>[b]购买后24小时内发KEY至邮箱[/b]</div>');
  });
} //otakumaker deal

match = /indiegala.com/.exec(document.URL);
if (match) {
  $($('.logo-cont') [0]).replaceWith('<li class="logo-cont"><a id="btn">Info</a></li>');
  $('#frame-top').append('<div class="info" style="color:#ffffff"></div>');
  $('#frame-top').append('<div class="info2" style="color:#ffffff"></div>');
  $('#btn').click(function () {
    $('.info').empty();
    $('.info2').empty();
    var items = $('.bundle_page').find('div.bundle-item-cont-responsive');
    var i = 0;
    var bundle = $(document).attr('title').replace(' of Steam games', '');
    getGridHead(bundle);
    var html = $('#frame-top').html();
    var rg = /new Date\( \d+,(\d+)\-\d+,(\d+),\d+,\d+,\d+ \)/g;
    var d = new Array();
    match = rg.exec(html);
    while (match) {
      d.push(match);
      match = rg.exec(html);
    }
    if (d.length > 2) $('#early').append('前' + Math.ceil(eval(d[2][0] + '- new Date()') / 86400000) * 24 + '小时');
    if (d.length > 1) $('#time').append('[' + (new Date().getMonth() + 1) + '.' + new Date().getDate() + '-' + d[1][1] + '.' + d[1][2] + ']');
    $('.g').append(items.length);
    var tiers = $('.bundle_page').find('div.container');
    var k = 0;
    tiers.each(function () {
      var match = />\$([0-9.]+)</.exec($(this).html());
      if (match) {
        $('#p').empty();
        $('#p').append(match[1]);
        $('.info').append('<div>[quote][b]支付<b>$' + match[1] + '</b><span id=ag' + ++i + '></span>获得以下游戏：[/b]<br><span id=' + i + '></span>[/quote]</div>');
        if (i > 1) {
          $('#ag' + i).append('再');
        }
      }
      $(this).find('div.bundle-item-cont-responsive').each(function () {
        var title = $(this).find('h3').text();
        var id = /\d+\/(\d+)\.jpg/.exec($(this).find('img').attr('src')) [1];
        getGridContent(id, 'app', title, '#' + i, ++k);
      });
    });
  });
} //indiegala bundle

var getRatio = function (c, f) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in ("' + c + '")&format=json&env=store://datatables.org/alltableswithkeys',
    onload: function (response) {
      var data = JSON.parse(response.responseText);
      if (data.query.results.rate) {
        $('#ratio').empty();
        $('#ratio').append(data.query.results.rate.Rate);
        f();
      }
    }
  });
}; //KRWCNY,RUBCNY
var getGridHead = function (title) {
  $('.info').append('<div><span id="time"></span>' + title + '上线，<span id="early"></span><span id="p"></span>刀可获完整内容<br>[b]购买地址：<br>' + document.URL + '<br><br>包含<span class="g"></span>款游戏：[/b]</div>');
  $('.info2').append('<div>&lt;FONT size=2 face=黑体&gt;&lt;P&gt;' + title + '&amp;nbsp;慈善包&lt;/P&gt;&lt;P&gt;&lt;FONT color=#ff0000&gt;发货方式为激活码，此站不包含礼物链接&lt;/FONT&gt;&lt;/P&gt;&lt;P&gt;包含<span class="g"></span>款STEAM游戏：&lt;/P&gt;&lt;P&gt;<span class="tb"></span>&lt;/P&gt;&lt;P&gt;&lt;/P&gt;&lt;/FONT&gt;</div>');
}; // grid head
var getGridContent = function (id, addon, name, tier, i) {
  $(tier).append('<div id=' + id + '>[url=http://store.steampowered.com/' + addon + '/' + id + '/]' + name + '[/url]</div>');
  $('.tb').append('<div id=tb_' + id + '>' + i + '.&amp;nbsp;' + name + '</div>');
  $('.tb').append('<div>&lt;BR&gt;&lt;FONT color=#0055ff&gt;&amp;nbsp;&amp;nbsp;http://store.steampowered.com/' + addon + '/' + id + '/&lt;/FONT&gt;&lt;BR&gt;</div>');
  getGameName(id, addon);
  getGameRate(id, addon);
}; // grid content
var getGameName = function (id, addon) {
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
}; //cn name
var getGameRate = function (id, addon) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://store.steampowered.com/' + addon + '/' + id + '/?l=chinese',
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
      match = /DLC/.exec($(response.responseText).find('#category_block').text());
      if (match) {
        $('#' + id).append('[color=#b200ff][b]（需要基础游戏才能运行）[/b][/color]');
        $('#tb_' + id).append('&lt;FONT color=#66c0f4&gt;&amp;nbsp;（需要基础游戏才能运行）&lt;/FONT&gt;');
      }
    }
  });
}; // game rate
