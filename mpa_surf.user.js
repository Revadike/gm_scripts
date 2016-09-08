// ==UserScript==
// @name        mpa_surf
// @namespace    http://tampermonkey.net/
// @description mpa surf tip
// @include     http*://*mypayingads.com/traffic/surf
// @icon        http://www.mypayingads.com/favicon.ico
// @updateURL 	https://github.com/rusania/gm_scipts/raw/master/mpa_surf.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/mpa_surf.user.js
// @version     2016.09.08
// @run-at      document-end
// @grant       none
// ==/UserScript==

var counter = setInterval(function () {
  var t = $('#credittopframe').text();
  if (t.length == 0) {
    clearInterval(counter);
    $('.mainImage').each(function () {
      var match = /chk_(\d+)/.exec($(this).attr('id'));
      if (match) {
        var id = match[1];
        var counter2 = setInterval(function () {
          t = $('#credittopframe').text();
          if (t.length > 10) {
            clearInterval(counter2);
            match = /(\d+) ads/.exec($('.link3').html());
            if (match) {
              var limit = match[1];
              if (limit > 15) {
                alert('surf limit');
              } 
              else {
                $('.link4') [0].click();
              }
            }
          }
        }, 3000);
        checkImage(id);
      }
    });
  }
}, 2000);