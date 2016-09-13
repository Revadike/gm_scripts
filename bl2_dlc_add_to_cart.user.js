// ==UserScript==
// @name        bl2_dlc_add_to_cart
// @namespace    http://tampermonkey.net/
// @include     http*://store.steampowered.com/cart*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/bl2_dlc_add_to_cart.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/bl2_dlc_add_to_cart.user.js
// @version     2016.09.08
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==
var match = /sessionid=([a-z0-9]+);/.exec(document.cookie);
var sid = match[1];
$('.supernav_container').append('<a class="menuitem supernav" href="/cart/" data-tooltip-type="selector" data-tooltip-content=".submenu_myli">快速</a>');
$('.supernav_container').append('<div class="submenu_myli" style="display: none;"><div>');
$('.submenu_myli').append('<a class="submenuitem myli" subs="36555,36556,35221,34972,33298,31174" app="49520">无主2</a>');
$('.submenu_myli').append('<a class="submenuitem myli" subs="15373" app="206440">去月球</a>');
// <span style="color:red; font-weight: bold;"></span>
$('.myli').click(function () {
  addme($(this).attr('subs').split(','), $(this).attr('app'));
});
// onclick="javascipt:addme();"
function addme(subs, app) {
  var da = {
    action: 'add_to_cart',
    sessionid: sid,
    'subid[]': subs
  };
  $.ajax({
    url: '/cart/',
    method: 'POST',
    beforeSend: function (request)
    {
      request.setRequestHeader('Referer', 'http://store.steampowered.com/app/' + app);
    },
    dataType: 'json',
    data: da,
    success: function (d) {
      alert(d);
    },
    error: function () {
      alert('fail');
    }
  });
}
