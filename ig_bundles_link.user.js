// ==UserScript==
// @name        ig_bundles_link
// @namespace    ig_bundles_link
// @description ig bundles new window links
// @include     https://www.indiegala.com/profile?user_id=*
// @include     https://www.indiegala.com/ajaxprofile_sale_tab?user_id=*
// @icon        http://www.indiegala.com/favicon.ico
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/ig_bundles_link.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/ig_bundles_link.user.js
// @version     2017.11.12.1
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==
var tp = $('#title-p');
if (tp.length > 0){
    $('#title-p').after('<div><a id="ajax">AJAX</a></div>');
    // \"bundles-list\"
    var m = /id=([0-9a-f]+)/.exec(document.URL);
    if (m)
        $('#title-p').after('<div><a href="/ajaxprofile_sale_tab?user_id=' + m[1] + '" target="_blank">URL</a></div>');
}
document.body.innerHTML = document.body.innerHTML.replace(/\\r|\\n|\\t/ig, '');
document.body.innerHTML = document.body.innerHTML.replace(/\\&quot;/ig, '');

var bl = $('#bundles-list');
if (bl.length > 0){
    bl.before('<table id="bl">AA</table>');
    bl.before('<div><a id="ajax">AJAX</a></div>');
    $('.nav-toggle').each(function () {
        var id = $(this).attr('id');
        $("#bl").append('<tr><td>' + id + '</td><td><a href="/ajaxsale?sale_id=' + id + '" target="_blank">' + $(this).text() + '</a></td</tr>');
    });
}

$('#ajax').click(function(){
    $('.nav-toggle').each(function () {
        var match = /#current_sale_(\d+)/.exec($(this).attr('href'));
        var a = '<h4 class="panel-title"><a href="/ajaxsale?sale_id=' + match[1] + '" target="_blank"><font color="red">' + $(this).text() + '</font></a></h4>';
        $(a).insertAfter($(this).parent());
    });

});
