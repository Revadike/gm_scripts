// ==UserScript==
// @name        dig_no_space
// @namespace    http://tampermonkey.net/
// @description dig no space
// @include     http*dailyindiegame.com/superbundle_*.html
// @include     http*dailyindiegame.com/account_page*.html
// @icon        https://www.dailyindiegame.com/digsite-images/icon-fav.png
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/dig_no_space.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/dig_no_space.user.js
// @version     2016.09.14
// @run-at      document-end
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==
if (location.href.search('superbundle') > 0) {
  /*
  $('#DIG2TableGray').find('table').each(function () {
    $(this).removeAttr('cellspacing');
    $(this).removeAttr('cellpadding');
    $(this).removeAttr('width');
  });
  $('#DIG2TableGray').find('br').each(function () {
    $(this).remove();
  });
  var title = $($('.DIG2-TitleOrange') [0]);
  var v = $($('.DIG2contentSmall') [1]).replaceWith(title);
  */
  $('#DIG2TableGray').append('<div><a id="btn"><span style="color:white;">INFO</span></a></div>');
  $('#DIG2TableGray').append('<div id="info" style="color:#ffffff"></div>');
  $('#DIG2TableGray').append('<div id="info2" style="color:#ffffff"></div>');
  $('#btn').click(function () {
    $('#info').empty();
    $('#info2').empty();
    var title = $($('.DIG2-TitleOrange') [0]).text();
    var price = $('#price3').val();
    $('#info').append('<div>DailyIndieGame ' + title + '上线，' + price + '刀可获得完整内容<br>[b]购买地址：<br>' + document.URL + '<br><br>包含<span id="g"></span>款游戏：[/b][quote]<span id="g3"></span>[/quote]</div>');
    $('#info2').append('<div>&lt;FONT size=2 face=黑体&gt;&lt;P&gt;DailyIndieGame ' + title + '&amp;nbsp;慈善包&lt;/P&gt;&lt;P&gt;&lt;FONT color=#ff0000&gt;发货方式为激活码，此站不包含礼物链接&lt;/FONT&gt;&lt;/P&gt;&lt;P&gt;包含<span id="g2"></span>款STEAM游戏：&lt;/P&gt;&lt;P&gt;<span class="tb"></span>&lt;/P&gt;&lt;P&gt;&lt;/P&gt;&lt;/FONT&gt;</div>');
    $('#info').append('<div><span style="color:#32cd32;">[b][color=#32cd32]支付$' + price + '获得1份完整包[/color][/b]</span></div>');
    $('#info').append('<div><span style="color:#b200ff;">[b][color=#b200ff]支付超过均价获得2份完整包[/color][/b]</span></div>');
    var games = $('#DIG2TableGray').find('.DIG-content');
    var k = 0;
    games.each(function () {
      var t = $($(this).find('div.DIG2-TitleOrange') [0]).text();
      var steam = $($(this).find('a') [0]).attr('href');
      match = /app\/(\d+)/.exec(steam);
      var id = '0';
      if (match != null) {
        id = match[1];
      }
      $('#g3').append('<div id=' + id + '>[url=' + steam + ']' + t + '[/url]</div>');
      $('.tb').append('<div id=tb_' + id + '>' + ++k + '.&amp;nbsp;' + t + '</div>');
      $('.tb').append('<div>&lt;BR&gt;&lt;FONT color=#0055ff&gt;&amp;nbsp;&amp;nbsp;' + steam + '&lt;/FONT&gt;&lt;BR&gt;</div>');
      var url = 'http://steamdb.sinaapp.com/app/' + id + '/data.js?v=34';
      GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (response) {
          match = /({.*});/.exec(response.responseText);
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
          match = /集换式卡牌/.exec($(response.responseText).find('#category_block').text());
          if (match) {
            $('#' + id).append('[color=Red][b] 有卡[/b][/color]');
            $('#tb_' + id).append('&lt;FONT color=#ff0000&gt;&amp;nbsp;有卡&lt;/FONT&gt;');
          }
        }
      });
    });
    $('#g').append(k);
  });
} 
else if (location.href.search('account_page') > 0) {
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
}
