// ==UserScript==
// @name         giveaway_auto
// @namespace    http://tampermonkey.net/
// @version      2018.04.07.1
// @description  giveaway su auto
// @author       jacky
// @icon        https://giveaway.su/favicon.ico
// @match        https://giveaway.su/giveaway/view/*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/giveaway_auto.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/giveaway_auto.user.js
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       GM_log
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

setTimeout(function () {
    $('#actions').find('.btn-default').click();
},5000);

