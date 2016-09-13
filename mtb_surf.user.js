// ==UserScript==
// @name         mtb_surf
// @namespace    http://tampermonkey.net/
// @description  mtb surf
// @author       jacky
// @match        https://mytrafficbux.com/directory/view
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/mtb_surf.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/mtb_surf.user.js
// @version     2016.09.08
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==
var ptc = $('.ptcboxmiddle') [0];
var a = $(ptc).find('img') [0];
$(a).click();
setTimeout(function () {
  window.location.reload();
}, 18000);
