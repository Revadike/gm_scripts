// ==UserScript==
// @name        dig_game_keys
// @namespace    http://tampermonkey.net/
// @version      2018.01.10.1
// @description  dig game keys
// @author       jacky
// @include     http*://*dailyindiegame.com/superbundle_*
// @include     http*://*dailyindiegame.com/account_*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/dig_game_keys.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/dig_game_keys.user.js
// @run-at      document-end
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle(".zd{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px;font-size:16px !important;}");

$('#form2 select').append('<option value="300">Games per page: 300</option>');
$('<div><a class="DIG2-TitleOrange" id="claim">CLAIM</a></div>').insertBefore('#TableKeys');
$('<div id="keys"></div>').insertBefore('#TableKeys');
$('#claim').click(function () {
    $('#keys').empty();
    var ar = new Array();
    $($('#TableKeys').children() [0]).find('tr').each(function () {
        var t = $(this).find('td');
        var num = $(t[0]).text();
        var bundle = $(t[1]).text();
        if (bundle==='Source')
            return;
        var name = $(t[2]).text();
        var key = $.trim($(t[4]).text());
        var id = '0';
        var i = num % 6;
        ar.push(key);
        $('#keys').append('<tr><td class="zd">' + bundle + '</td><td class="zd">' + i + '</td><td class="zd">' + num + '</td><td class="zd">【' + name + '】&nbsp<span id="' + id + '">' + key + '</span></td></tr>');
        if (i==0){
            i = 6;
            $('#keys').append('<tr><td class="zd">' + Math.floor(num / 6) + '</td><td class="zd">-</td><td class="zd">-</td><td class="zd">ASF格式：!redeem ' + ar.join(',') + '</td></tr>');
            ar = new Array();
        }

        if (key.search('Reveal key') > -1) {
            // http://www.dailyindiegame.com/DIG2-getkey.php?id=1149728
            // revealKey(2,1149727);
            var match = /\d+,(\d+)/.exec($(t[4]).html());
            if (match != null) {
                id = match[1];
                var url = 'http://www.dailyindiegame.com/DIG2-getkey.php?id=' + id;
                $.ajax({
                    url: url
                }).done(function (data) {
                    $('#' + id).empty();
                    $('#' + id).append(data);
                });
            }
        }
    });
});