// ==UserScript==
// @name         tb_item_stock
// @namespace    http://tampermonkey.net/
// @version      2018.01.10.01
// @description  tb_item_stock
// @author       jacky
// @match        https://item.taobao.com/item.htm*
// @run-at      document-end
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @updateURL 	https://github.com/rusania/gm_scipts/raw/master/tb_item_stock.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/tb_item_stock.user.js
// @grant       none
// ==/UserScript==

$('.tb-subtitle').append('<a id="b"><span style="color:red;font-weight:bold;">API</span></a>');
$('#b').click(function () {
  $('#J_SpanStock').parent().css('display', 'block');
});
