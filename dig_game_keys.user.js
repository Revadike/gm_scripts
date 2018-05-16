// ==UserScript==
// @name        dig_game_keys
// @namespace    http://tampermonkey.net/
// @version      2018.05.16.1
// @description  dig game keys
// @author       jacky
// @include     http*://*dailyindiegame.com/superbundle_*
// @include     http*://*dailyindiegame.com/account_*
// @include     http://www.dailyindiegame.com/account_digstore.html
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/dig_game_keys.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/dig_game_keys.user.js
// @run-at      document-end
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==


var m = /digstore/.exec(document.URL);
if (m){
    var a = $("a:not(.db)[href*='/app/'],[href*='/sub/'],[href*='-appid-']");
    a.each(function(){
        $(this).after('<form name="formsearch" method="post" target=_blank action="account_tradesXT.html"><input name="search" type="hidden" value="'+ $(this).text() +'"><input type="submit" name="button" value="SEARCH"></form>');
    });
}
else {
    m = /transactionhistory/.exec(document.URL);
    if (m){
        $('<div id="po"></div>').insertBefore('#TableKeys');
        var x = [];
        var y = [];
        $('#TableKeys tbody tr').each(function(){
            m = /\s+(\d+)\s*DIG\s*trade: (.*)/.exec($(this).text());
            if (m){
                 if ($.inArray(m[2], x) < 0){
                     x.push(m[2]);
                     y[m[2]] = [];
                 }
                y[m[2]].push(parseInt(m[1]));
            }
        });
        $.each(x, function(k,v){
            var p = 0;
            $.each(y[v], function(r,w){
                p += w;
            });
            $('#po').append(`<p>${v}&#9;${p}</p>`);
        });
    }

    GM_addStyle(".zd{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px;font-size:16px !important;}");

    $('#form2 select').append('<option value="300">Games per page: 300</option>');
    $('<div><a class="DIG2-TitleOrange" id="bundle">BUNDLE</a></div>').insertBefore('#TableKeys');
    $('#bundle').after('<div><a class="DIG2-TitleOrange" id="single">SINGLE</a></div>');
    $('<div id="keys"></div>').insertBefore('#TableKeys');
    $('#bundle').click(function () {
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
        $('#keys').append('<tr><td class="zd">' + bundle + '</td><td class="zd">' + i + '</td><td class="zd">' + num + '</td><td class="zd">' + name + '</td><td class="zd">' + key + '</td><td class="zd">【' + name + '】&nbsp<span id="' + id + '">' + key + '</span></td></tr>');
        if (i==0){
            i = 6;
            $('#keys').append('<tr><td class="zd">' + Math.floor(num / 6) + '</td><td class="zd">-</td><td class="zd">-</td><td class="zd">-</td><td class="zd">-</td><td class="zd">********************{r}【ASF格式】{r}{r}!redeem&nbsp;' + ar.join(',') + '</td></tr>');
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

$('#single').click(function () {
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
        ar.push(key);
        $('#keys').append('<tr><td class="zd">' + key + '</td></tr>');
        if (key.search('Reveal key') > -1) {
            // http://www.dailyindiegame.com/DIG2-getkey.php?id=1149728
            // revealKey(2,1149727);
            var match = /\d+,(\d+)/.exec($(t[4]).html());
            if (match != null) {
                var id = match[1];
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
    $('#keys').append('<tr><td><a download="serial.csv" id="download-link" href="data:text/csv;charset=utf-8,' + ar.join("%0A") + '" target="_blank">Download</a></td></tr>');
});
}