// ==UserScript==
// @name         cubic_game_keys
// @namespace    http://tampermonkey.net/
// @version      2018.01.14.1
// @description  cubic_game_keys
// @author       jacky
// @match        https://cubicbundle.com/profile*
// @run-at       document-end
// @require      http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @updateURL 	 https://github.com/rusania/gm_scripts/raw/master/cubic_game_keys.user.js
// @downloadURL  https://github.com/rusania/gm_scripts/raw/master/cubic_game_keys.user.js
// @grant        none
// ==/UserScript==

$('#col-main').before('<table id="b" class="table"></table>');

var b_tmp = '';
var t_tmp = '';
var i = 1;
$('.table tr').each(function(){
    var td = $(this).children('td');
    if (td.length > 0){
        var b = $(td[1]).text();
        var t = $(td[2]).text();
        var k = $(td[4]).text();

        if (b){
            b_tmp = b;
            t_tmp = t;
        }

        if (t_tmp == t)
            i = 1;

        $('#b').append('<tr><td>' + t + '</td><td>' + k + '</td><td>' + (i++) + '</td><td>' + b_tmp + '</td><td>【' + t +'】&nbsp' + k + '</td></tr>');
    }
});