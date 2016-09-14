// ==UserScript==
// @name        otaku
// @namespace   otaku
// @description otakumaker info
// @include     http*://*otakumaker.com/index.php/account/admin/deal/view/*
// @icon        http://otakumaker.com/templates/rt_acacia/favicon.ico
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/otaku.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/otaku.user.js
// @version     2016.09.14
// @run-at      document-end
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==
$('.em_DealInfoRight').append('<div><a id="btn"><span style="color:red;font-weight:bold;">INFO</span></a></div>');
$('.em_DealInfoRight').append('<div id="info"></div>');
$('.em_DealInfoRight').append('<div id="info2"></div>');
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
  $('#info').empty();
  $('#info2').empty();
  var match = /(.*) (\d+) ([A-Za-z]+) to (\d+) ([A-Za-z]+)/.exec(document.title);
  if (match != null) {
    $('#info').append('<div>[' + mons.indexOf(match[3], 0) + '.' + match[2] + '-' + mons.indexOf(match[5], 0) + '.' + match[4] + ']OtakuMaker Bundle新包' + match[1] + '上线<br>[b]购买地址：<br>' + document.URL + '<br><br>包含<span id="g"></span>款游戏：[/b][quote]<span id="g3"></span>[/quote]</div>');
    $('#info2').append('<div>&lt;FONT size=2 face=黑体&gt;&lt;P&gt;OtakuMaker Bundle ' + match[1] + '&amp;nbsp;慈善包&lt;/P&gt;&lt;P&gt;&lt;FONT color=#ff0000&gt;发货方式为激活码，此站不包含礼物链接&lt;/FONT&gt;&lt;/P&gt;&lt;P&gt;包含<span id="g2"></span>款STEAM游戏：&lt;/P&gt;&lt;P&gt;<span class="tb"></span>&lt;/P&gt;&lt;P&gt;&lt;/P&gt;&lt;/FONT&gt;</div>');
  }
  var games = $('.gantry-width-33');
  $('#g').append(games.length);
  $('#g2').append(games.length);
  var k = 0;
  games.each(function () {
    var title = $(this).find('h3').text();
    var steam = $(this).find('a').attr('href');
    match = /app\/(\d+)/.exec(steam);
    var id = '0';
    if (match != null) {
      id = match[1];
    }
    $('#g3').append('<div id=' + id + '>[url=' + steam + ']' + title + '[/url]</div>');
    $('.tb').append('<div id=tb_' + id + '>' + ++k + '.&amp;nbsp;' + title + '</div>');
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
  var i = 0;
  var text = $('.em_DealInfoRight').text();
  match = /([0-9]+) Games Only : \$([0-9.]+)/.exec(text);
  if (match != null) {
    $('#info').append('<div><span style="color:' + colors[i] + ';">[b][color=' + colors[i++] + ']支付$' + match[2] + '获得1份完整包（' + match[1] + '个KEY）[/color][/b]</span></div>');
  }
  var regx = /([0-9]+) BUNDLES .* ([0-9]+) keys .* \$([0-9.]+)/g;
  match = regx.exec(text);
  while (match != null) {
    $('#info').append('<div><span style="color:' + colors[i] + ';">[b][color=' + colors[i++] + ']支付$' + match[3] + '获得' + match[1] + '份完整包（' + match[2] + '个KEY）[/color][/b]</span></div>');
    match = regx.exec(text);
  }
  $('#info').append('<div>[b]购买后24小时内发KEY至邮箱[/b]</div>');
});
