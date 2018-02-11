// ==UserScript==
// @name         nuuvem_library_item
// @namespace    http://tampermonkey.net/
// @description nuuvem library extra info
// @author      jacky
// @match     	https://secure.nuuvem.com/account/library*
// @icon        http://www.nuuvem.com/favicon.ico
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/nuuvem_library_item.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/nuuvem_library_item.user.js
// @version     2018.02.09.1
// @run-at      document-end
// @require     https://code.jquery.com/jquery-3.3.1.min.js
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle("table{border:solid 1px;border-collapse:collapse !important;}");
GM_addStyle("td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px !important;}");

if (/library\/item/.exec(document.URL)) {
    $('#product-details').show();
    var t = $('.tt').text();
    var s = $('p:first').text();
    $('.tt').replaceWith('<table id="k"></table>');
    $('.mod-content-key').each(function(){
        $('#k').append('<tr><td>' + t + '</td><td>' + $(this).text() + '</td><td>' + s + '</td></tr>');
    });

}
else {
    var a = '<a id="ck" href="#">Get New Button</a>';
    $('.com-text-tab').append(a);
    $('#ck').click(function(){
        if ($('#k').length > 0)
            $('#k').empty();
        else
            $('.bl-content').before('<table id="k"></table>');
        var i = 1;
        $('.mod-product-banner, .mod-product').each(function () {
            var id = $(this).attr('data-item-id');
            var t = $(this).find('.bl-info').text();
            var b = '<a href="/account/library/item/' +id+ '?terms_accepted_by_user=true" target="_blank">' +id+ '</a>';
            $('#k').append('<tr><td>' + (i++) + '</td><td>' + t + '</td><td>' + b + '</td></tr>');
        });
    });
}