// ==UserScript==
// @name        bsapi
// @namespace    http://tampermonkey.net/
// @description bs api
// @include     https://www.bundlestars.com/en/bundle/*
// @include     https://www.bundlestars.com/en/orders/*
// @icon        https://cdn.bundlestars.com/production/brand/favicon.ico
// @updateURL 	https://github.com/rusania/gm_scipts/raw/master/bsapi.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/bsapi.user.js
// @version     2016.09.08
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==
var regexp = /en\/[a-z]+/;
var match = regexp.exec(location.href);
if (match == 'en/bundle') {
  var url = document.URL.replace(/en\/bundle/, 'api/products');
  var li = $('#navbarBundles').parent().parent();
  li.append('<li><a target="_blank" href="' + url + '"><span style="color:red;font-weight:bold;">API</span></a></li>');
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
        }
        //var f = '<tr><td>' + title + '</td><td>' + key + '</td></tr>';
        var f = '【' + i++ + '】【' + title + '】' + key + '<br>';
        $('#list').append(f);
      });
    });
  });
}
