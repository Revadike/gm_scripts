// ==UserScript==
// @name         ig_gift_auto
// @namespace    http://tampermonkey.net/
// @version      2018.05.23.1
// @description  ig gift auto
// @author       jacky
// @include       http://steamcn.edu.pl/ig_sale.html
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/ig_gift_auto.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/ig_gift_auto.user.js
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @connect     www.indiegala.com
// @grant       GM_xmlhttpRequest
// @grant       unsafeWindow
// @grant       GM_log
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

$('#btn').after('&#9;<input id="gift" type="button" value="GIFT">');
$('#3').after('<table id="area"></table><div id="area2"></div>');

$('#gift').click(function(){
    var text = $('#in').val();
    var m = /gift_id=([0-9a-f]+)/.exec(text);
    if (m){
        var id = m[1];
        m = /密码：([A-Z0-9]{6})/.exec(text);
        if (m){
            $('#area').empty();
            $('#area2').empty();
            getkey(id, m[1]);
        }
    }
});

unsafeWindow.getkey = function(id, pwd){
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://www.indiegala.com/gift?gift_id=" + id,
        onload: function(response) {
            var m = /gift-validation-token" value="([0-9a-f]+)/.exec(response.responseText);
            var token = m[1];
            var data = `{"gift_id":"${id}","gift_token":"${token}","gift_password":"${pwd}"}`;
            GM_xmlhttpRequest({
                method: "POST",
                data: data,
                url: "https://www.indiegala.com/gift/verify",
                onload: function(response) {
                    var r = JSON.parse(response.responseText);
                    if (r && r.status == 200){
                        var i = 1;
                        var keys = Array();

                        var t = $(r.contents).find('#indie_gala_2 div:first').text();
                        $(r.contents).find('.game-key-string').each(function () {
                            var steam = $(this).find('.game-steam-url');
                            var href = steam.attr('href');
                            var ma = /(app|sub)\/(\d+)/.exec(href);
                            var id = ma[2];
                            var k = $(this).find('.input-block-level')[0];
                            var key = k.value;
                            keys.push(key);
                            $('#area').append('<tr><td><a href="http://store.steampowered.com/'+ ma[0] +'/">' + steam.text() + '</a></td><td id="' + id + '">' + key + '</td><td>' + i + '</td><td>' + t + '</td></tr>');
                            $('#area2').append('<div>【' + (i++) + '】【' + steam.text() + '】&nbsp;<span id="' + id + '">' + key+'</span></div>');
                            var code = '';
                            var m = /serial_n_([A-F0-9]+)/.exec(k.id);
                            if (m){
                                code = m[1];
                                var link = 'https://www.indiegala.com/myserials/syncget?code=' + code + '&cache=false&productId=' + id;
                                if (key.length == 0) {
                                    var gi = id;
                                    GM_xmlhttpRequest({
                                        method: "GET",
                                        url: link,
                                        onload: function(response) {
                                            var data = JSON.parse(response.responseText);
                                            if (data.status == 'success') {
                                                keys.push(key);
                                                $('#' + id).append(data.serial_number);
                                            } else {
                                                $('#' + id).append(response.responseText);
                                            }
                                        },
                                        onerror:  function(response) {
                                            $('#' + id).append(response.statusText);
                                        },
                                        ontimeout:  function(response) {
                                            $('#' + id).append(response.statusText);
                                        }
                                    });
                                }
                            }
                        });
                        var asf = '<div>********************{r}【ASF格式】{r}{r}!redeem&nbsp;' + keys.join(',') + '</div>';
                        $('#area2').append(asf);
                    }
                },
                onerror:  function(response) {
                    alert(response.statusText);
                },
                ontimeout:  function(response) {
                    alert(response.statusText);
                },
            });


        },
        onerror:  function(response) {
            alert(response.statusText);
        },
        ontimeout:  function(response) {
            alert(response.statusText);
        },
    });
}