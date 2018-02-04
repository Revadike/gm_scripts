// ==UserScript==
// @name        hb_download_info
// @namespace   http://tampermonkey.net/
// @description hb download info
// @include     http*://www.humblebundle.com/*
// @include     http*://www.humblebundle.com/*?key=*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/hb_download_info.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/hb_download_info.user.js
// @version     2018.02.04.2
// @run-at      document-end
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle("table{border:solid 1px;border-collapse:collapse !important;}");
GM_addStyle("td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px;font-size:16px !important;}");


var m = /current_country': "([^"]+)",/.exec(document.body.innerHTML);
if (m) {
    $('.navbar-unlock-timer').append('<div id="cd"></div>');
    $('#cd').after(m[1]);
}

m = /key==/.exec(document.URL);
if (m){
	var r = /var data = ({"keys".*});/.exec(document.body.innerHTML);
	if (r){
		$('#headertext').append('<table id="reg"></table>');
		$('#reg').append('<tr><td>App</td><td>machineName</td><td>exclusive</td><td>disallowed</td></tr>');
		var data = JSON.parse(r[1]);
		$.each(data.keys, function (i, item) {
			var exc = '<td>-</td>';
			if (item.exclusiveCountries.length){
				exc = '<td title="' + item.exclusiveCountries + '">List</td>';
			}
			var dis = '<td>-</td>';
			if (item.disallowedCountries.length){
				dis = '<td title="' + item.disallowedCountries + '">List</td>';
			}
			$('#reg').append('<tr><td>' + item.steamAppId + '</td><td>' + item.machineName + '</td>' + exc + dis+'</tr>');
		});
	}
	r = /data.countryCode = "([^"]+)";/.exec(document.body.innerHTML);
	if (r)
		$('#headertext').append('<div><b>' + r[1] + '</b></div>');

	$('#headertext').append('<div><a id="btn">INFO</a></div>');
	$('#headertext').append('<div><a id="key">KEYS</a></div>');
	$('#headertext').append('<div><a id="gift">GIFT</a></div>');
	$('#headertext').append('<table id="info"></table>');

	$('#btn').click(function () {
		$('#info').empty();
		var i = 0;
		$('#steam-tab').find('.sr-key').each(function () {
			var title = $.trim($(this).find('.sr-key-heading').text());
			var key = $.trim($(this).find('.keyfield-text').text());
			$('#info').append('<tr><td>' + (++i) + '</td><td>' + title + '</td><td>' + key + '</td></tr>');
		});
	});
	$('#key').click(function () {
		$('.sr-unredeemed-steam-button').find('span').click();
	});
	$('#gift').click(function () {
		$('.sr-unredeemed-gift-button').find('span').click();
	});
}


