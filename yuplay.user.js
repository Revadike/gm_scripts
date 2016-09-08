// ==UserScript==
// @name        yuplay
// @namespace    http://tampermonkey.net/
// @description yuplay directg currency
// @include     http://yuplay.ru/product/*
// @include     https://directg.net/game/game_page.html?product_code=*
// @icon        http://yuplay.ru/img/img/favicon.ico
// @updateURL 	https://github.com/rusania/gm_scipts/raw/master/yuplay.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/yuplay.user.js
// @version     2016.09.08
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==
var r = window.location.href.match(/yuplay|directg|kinguin/);
if (r == 'yuplay') {
	var c = 0.0907; //RUB->CNY
	$('.price').each(function () {
		var f = (/(\d+)\s*<sp/).exec($(this).html()) [1];
		var q = (f * c).toFixed(2);
		$(this).append('<span style="color:red; font-weight: bold;">&yen;' + q + '</span>');
	});
	var p = $('.list-character p:last-child');
	if (p.html().search('SUB_ID') > 0) {
		var s = p.find('span');
		var url = 'http://steamdb.sinaapp.com/sub/' + s.text() + '/tooltip';
		s.append('<a target="_blank" href="http://steamdb.info/sub/' + s.text() + '/">API</a>');
		var dl = $('.list-syspower');
		dl.replaceWith('<div style="height:800px;"><iframe src="' + url + '" style="border: none; width: 100%; height: 100%;"></iframe></div>');
	}
} 
else if (r == 'directg') {
	var t = $('.page_top_r').find('img').attr('title');
	$('.game_page_title').empty().append(t);
	var sp = $('.page_top_info');
	r = /([0-9.,]+)원<\/span>/.exec(sp.html()) [1].replace(/,/gm, '');
	var c = 0.0055; //KRW->CNY
	var q = (r * c).toFixed(2);
	sp.append('<span style="color:red; font-weight: bold;">&yen;' + q + '</span>');
}
else if (r== 'kinguin') {
	/*
	var c = 7.25; //EUR->CNY
	$('.new-price').each(function (){
		var f = $(this).find('span')[0].attr('data-no-tax-price');
		var q = (f * c).toFixed(2);
		$(this).parent().append('<span>'+q+'11</span>');
	});
	*/
}