// ==UserScript==
// @name        dig_no_space
// @namespace    http://tampermonkey.net/
// @description dig no space
// @include     http://*dailyindiegame.com/superbundle_*.html
// @include     http://*dailyindiegame.com/account_page*.html
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/dig_no_space.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/dig_no_space.user.js
// @version     2016.09.08
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==
if (location.href.search('superbundle') > 0) {
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
