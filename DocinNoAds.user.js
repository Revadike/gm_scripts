// ==UserScript==
// @name        docin
// @namespace    http://tampermonkey.net/
// @description DocinNoAds
// @include     http://www.docin.com/p-*.html
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/docin.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/docin.user.js
// @version     2016.09.08
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==

var v = document.getElementById("DocinViewer");
v.innerHTML = v.innerHTML.replace("&amp;aid=5", "");
var player = document.getElementById('player');
// productId=188013574&channel=0&loadurl=file.vonibo.com&aid=5&sgid1=1&sgid3=3
var ver = player.getAttribute("flashvars");
var arr = ver.split('&');
if (arr != null && arr.length > 4) {
	var id = arr[0].split('=')[1];
	var url = arr[2].split('=')[1];
	var link = document.createElement('a');
	// http://file.vonibo.com/docin_188013574.docin
	var file = 'http://' + url + '/docin_' + id + '.docin';
	link.setAttribute('href', file);
	link.innerHTML = '下载SWF';
	document.getElementById('downdiv').appendChild(link);
	
	arr.splice(3, 1);
	player.setAttribute('flashvars', arr.join('&'));
}
document.getElementById("DocinViewer") = v;