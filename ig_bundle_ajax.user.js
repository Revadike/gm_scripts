// ==UserScript==
// @name        ig_bundle_ajax
// @namespace   ig_bundle_ajax
// @description ig_bundle_ajax
// @include     https://www.indiegala.com/ajaxsale?sale_id=*
// @include     https://www.indiegala.com/gift?gift_id=*
// @icon        http://www.indiegala.com/favicon.ico
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/ig_bundle_ajax.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/ig_bundle_ajax.user.js
// @version     2017.11.15.1
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       GM_log
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

GM_addStyle("table{border:solid 1px;border-collapse:collapse !important;}");
GM_addStyle("td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px;font-family:simsun !important;}");
GM_addStyle("div{font-family:simsun !important;}");

/*
var body = $('body');
body.append('<button id="ck">CK</button>');
$('#ck').click(function () {
    var x = body.text();
    if (body.text() == 'CK'){
        var y= GM_getValue("cookie", '');
        if (GM_getValue("cookie", '') != '')
            GM_setValue("cookie", '');
    }
});
*/

var how = $('#header-title');
if(how.length == 0)
    how = $('.left');
if (how.length > 0){
    how.after('<table id="area"></table><div id="area2"></div>');
    how.after('<button id="redeem">KEYS</button>');
    how.after('<button id="rest">RESTORE</button>');
    showkey();
    $('#redeem').click(function () {
        showkey();
    });
    $('#rest').click(function () {
        restore();
    });
}

var bk = $('.title-bundle-kind');
if(bk.length > 0){
    var dv = $('#area2');
    if (dv.length == 0)
        dv = $('.title-bundle-kind');
    dv.after('<table id="area_gifts"></table><table id="area_na"></table>');
    dv.after('<button id="gift_btn">GIFTS</button>');
    showgift();
    $('#gift_btn').click(function () {
        showgift();
    });
}

function chgcookie()
{
    var m = /auth="([^=;"]+)"/.exec(document.cookie);
    if (m)
        GM_setValue("cookie", m[1]);
}

function showkey()
{
    $('#area').empty();
    $('#area2').empty();
    var i = 1;
    var keys = Array();
    $('.game-key-string').each(function () {
        var steam = $(this).find('.game-steam-url');
        var href = steam.attr('href');
        var id = /(\d+)/.exec(href) [1];
        var key = $(this).find('.input-block-level').val();
        keys.push(key);
        $('#area').append('<tr><td>' + steam.text() + '</td><td id="' + id + '">' + key + '</td></tr>');
        $('#area2').append('【' + i++ + '】【' + steam.text() + '】' + key+'<br>');
        var code = '';
        var m = /serial_([A-F0-9]+)/.exec($(this).html());
        if (m){
            code = m[1];
            var link = 'https://www.indiegala.com/myserials/syncget?code=' + code + '&cache=false&productId=' + id;
            if (key.length == 0) {
                var input = $(this).find('.info_key_text');
                $.getJSON(link, function (data) {
                    if (data.status == 'success') {
                        $(input).val(data.serial_number);
                        document.getElementById(id).innerHTML = data.serial_number;
                        $('<input value=' + data.entity_id + '/>').insertAfter($(input));
                    } else {
                        alert('redeem error');
                    }
                });
            }
        }
    });
    $('#area2').append('ASF格式：!redeem ' + keys.join(','));
}

function showgift()
{
    $('#area_gifts').empty();
    var gifts = Array();
    var na = Array();
    $('.gift-links-box').each(function () {
        var num = '';
        var m = /link (\d+)/.exec($(this).find('.title-gift').text());
        if (m)
            num = m[1];
        var link = $(this).find('a').attr('href');
        var p = $(this).find('.gift-psw');
        var pwd = '';
        if (p.length == 0){
            na.push(link);
        }
        else {
            pwd = $.trim(p.text());
            var color = link.substr( - 6, 6);
            link = '<tr style="color:#' + color + '"><td>www.indiegala.com' + link + '</td><td>' + pwd + '</td><td>' + num + '</td></tr>';
            gifts.push(link);
            //$('#area_gifts').append('<tr><td>' + num + '</td><td>' + link + '</td><td>' + pwd + '</td></tr>');
        }
    });
    if(na.length > 0){
        var cp = na.length;
        chgcookie();
        document.cookie = 'auth=""';
        $.each(na, function(k, v){
            var i = k;
            $('#area_na').append('<tr><td>' + v + '</td><td id="' + i + '">-</td></tr>');
            $.ajax({
                url: v,
                type: "GET",
                complete: function( data, status, xhr ){
                    $('#' + i).append(status);
                    if (cp-- == 1)
                        restore();
                }
            });
        });
    } else  {
        gifts.sort();
        gifts.forEach(function (e) {
            $('#area_gifts').append(e);
        });
    }
}

function restore(){
    document.cookie = 'auth="' + GM_getValue("cookie", '') + '"';
    setTimeout(function () {
        //alert(GM_getValue("cookie", ''));
        window.location.reload();
    },1000);
}
