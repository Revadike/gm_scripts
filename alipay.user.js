// ==UserScript==
// @name        alipay
// @namespace    http://tampermonkey.net/
// @description alipay auto input
// @include     https://excashier.alipay.com/standard/auth.htm?payOrderId=*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/alipay.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/alipay.user.js
// @version     2016.09.08
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==
var counter = setInterval(function () {
  var btn = $('.switch-tip-btn'); //.click();
  if (btn.length > 0) {
    clearInterval(counter);
    //$(btn[0]).click();
    $('#J_tLoginId').val('test');
    $('#payPasswd_rsainput').val('test');
  }
}, 2000);
