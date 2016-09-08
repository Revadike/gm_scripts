// ==UserScript==
// @name        steam_queue
// @namespace    http://tampermonkey.net/
// @include     http*://store.steampowered.com/app/*
// @include		http*://store.steampowered.com/agecheck/app/*
// @include		http*://store.steampowered.com/explore*
// @updateURL 	https://github.com/rusania/gm_scipts/raw/master/steam_queue.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/steam_queue.user.js
// @version     2016.09.08
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==
var match = /agecheck/.exec(location.href);
if (match) {
  $('#ageYear').val('1988');
  $('#agecheck_form').submit();
} 
else {
  match = /explore/.exec(location.href);
  if (match) {
    $('#refresh_queue_btn').click();
  } 
  else {
    $('#next_in_queue_form').submit();
  }
}
