// ==UserScript==
// @name        btcc_calc
// @namespace    http://tampermonkey.net/
// @description btcc calc
// @include     https://pay.btcc.com/wallet*
// @icon        https://pay.btcc.com/pay.ico
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/btcc_calc.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/btcc_calc.user.js
// @version     2016.09.08
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==
var counter = setInterval(function () {
  var list = $('.list-unstyled').find('span');
  if (list.length > 0) {
    clearInterval(counter);
    var btc = /[0-9.-]+/.exec($(list[0]).text());
    var cny = /[0-9.-]+/.exec($(list[3]).text());
    var rate = (cny / btc).toFixed(2);
    $(list[3]).parent().parent().append('<li><span class="ng-binding">&yen; ' + rate + '</span><label class="ng-scope" translate="">成交价格</label></li>');
    $('#transactions').find('.green.ng-binding').each(function () {
      var b = /[0-9.-]+/.exec($(this).text());
      var c = (b * rate).toFixed(2);
      $(this).append('<br>&yen; ' + c);
    });
  }
}, 3000);