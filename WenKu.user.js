// ==UserScript==
// @name        wenku
// @namespace    http://tampermonkey.net/
// @description WenKu Download
// @include     http://wenku.baidu.com/view/*.html
// @updateURL 	https://github.com/rusania/gm_scipts/raw/master/wenku.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/wenku.user.js
// @version     2016.09.08
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==

var src = document.body.innerHTML;
var m = (/'docId'\s*:\s*'([a-f0-9]+)'/i).exec(src);
var docId = m[1];
m = (/'totalPageNum'\s*:\s*'([0-9]+)'/).exec(src);
var pageNum = m[1];
m = (/'docType'\s*:\s*'([a-z]+)'/).exec(src);
var docType = m[1];
var step = 5;
var addon = 'http://ai.wenku.baidu.com/play/';
if (docType == 'txt') {
	step = 50;
	addon = 'http://txt.wenku.baidu.com/play/';
}
var up = document.getElementById("uploadDoc-0");
if (up != null)
	up = up.parentNode;
if (up != null) {
	// http://ai.wenku.baidu.com/play/56b888fc770bf78a652954a1?pn=1&rn=5
	// http://txt.wenku.baidu.com/play/b2761b33f111f18583d05ad6?pn=1&rn=50
	var offset = 1;
	while (offset <= pageNum) {
		var href = addon + docId + '?pn=' + offset + '&rn=' + step;
		var div = document.createElement('div');
		var link = document.createElement('a');
		link.setAttribute('href', href);
		link.innerHTML = '分段下载(' + offset + '+)';
		div.appendChild(link);
		up.appendChild(div);
		offset += step;
	}
	document.getElementById("uploadDoc-0").parentNode = up;
}
