// ==UserScript==
// @name         stdb_more_info
// @namespace    http://tampermonkey.net/
// @description  try to take over the world!
// @author       jacky
// @match        http*://steamdb.info/app/*
// @match        http*://steamdb.info/sub/*
// @match        http*://steamdb.info/search/*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/stdb_more_info.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/stdb_more_info.user.js
// @version     2017.11.27.1
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// ==/UserScript==

$('.package').each(function(){
    var id = $(this).attr('data-subid');
    $(this).append('<td>sub/' + id + '</td>');
});

$('.app').each(function(){
    var id = $(this).attr('data-appid');
    $(this).append('<td>app/' + id + '</td>');
});