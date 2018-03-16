// ==UserScript==
// @name         stdb_more_info
// @namespace    http://tampermonkey.net/
// @description  try to take over the world!
// @author       jacky
// @match        http*://steamdb.info/app/*
// @match        http*://steamdb.info/sub/*
// @match        http*://steamdb.info/freepackages*
// @match        http*://steamdb.info/search/*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/stdb_more_info.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/stdb_more_info.user.js
// @version     2018.03.16.01
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// ==/UserScript==

if (/freepackages/.exec(document.URL)){
    $('h1').after('<a id="rm">REMOVE</a>');
    $('#rm').click(function(){
        $('.package').each(function(){
            if (/Trailer|Demo|Trial/ig.exec($(this).html())){
                $(this).children('button').click();
            }
        });
    });
} else {
var m = /(sub|app)\/(\d+)/.exec(document.URL);
var p = $('.package');
if (p.length > 0){
    $('.app-links').append('<a id="cmp">Cmp</a>');
    $('.app-links').append('<a id="pkg" target="_target" href="http://167.88.168.94/package.php?id=' + m[2] + '">Pkg</a>');
    p.each(function(){
        var id = $(this).attr('data-subid');
        $(this).append('<td><input type="checkbox" value="' + id + '">sub/' + id + '</td>');
    });

    $('#cmp').click(function(){
        var a = [];
        $(":checkbox").each(function(){
            if ($(this).prop("checked"))
                a.push($(this).val());
        });
        if (a.length > 0)
            window.open('http://167.88.168.94/sub.php?cc=cn&o=1&q=' + a.join(','));
    });
}


$('.app').each(function(){
    var id = $(this).attr('data-appid');
    $(this).append('<td>app/' + id + '</td>');
});
}
