// ==UserScript==
// @name         nuuvem_library_item
// @namespace    http://tampermonkey.net/
// @description nuuvem library extra info
// @author      jacky
// @match     	https://secure.nuuvem.com/account/library*
// @icon        http://www.nuuvem.com/favicon.ico
// @updateURL 	https://github.com/rusania/gm_scipts/raw/master/nuuvem_library_item.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/nuuvem_library_item.user.js
// @version     2016.09.08
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==

if (/library\/item/.test(document.URL)) {
	$('#product-details').show();
    $('.tt').replaceWith('<table><tr><td>' + $('.tt').text() + '</td><td>' + $('.mod-content-key').text() + '</td><td>' + $('p:first').text() + '</td></tr></table>'); 
}
else {
    var a = '<a id="ck" href="#">Get New Button</a>';
    $('.com-text-tab').append(a);
    $('#ck').click(function(){
        $('.mod-product-banner').each(function () {
            var id = $(this).attr('data-item-id');
            var b = '<a href="/account/library/item/' +id+ '" target="_blank">' +id+ '</a>';
            $(this).append(b);
        });
    });
}