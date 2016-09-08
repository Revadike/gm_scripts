// ==UserScript==
// @name        chili
// @namespace    http://tampermonkey.net/
// @include     http://imgchili.com/show/*
// @updateURL 	https://github.com/rusania/gm_scipts/raw/master/chili.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/chili.user.js
// @version     2016.09.08
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==
var r = document.getElementById("ad").firstChild;
if (r)
	r.click();