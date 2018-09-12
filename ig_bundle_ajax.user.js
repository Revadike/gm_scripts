// ==UserScript==
// @name        ig_bundle_ajax
// @namespace   ig_bundle_ajax
// @description ig_bundle_ajax
// @include     https://www.indiegala.com/ajaxsale?sale_id=*
// @include     https://www.indiegala.com/gift?gift_id=*
// @icon        http://www.indiegala.com/favicon.ico
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/ig_bundle_ajax.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/ig_bundle_ajax.user.js
<<<<<<< HEAD
// @version     2018.09.12.1
=======
// @version     2018.09.06.1
>>>>>>> 1c2b554ad46809898f489c8a2399c460d88a2c70
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       GM_log
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_setClipboard
// ==/UserScript==

GM_addStyle("table{border:solid 1px;border-collapse:collapse !important;}");
GM_addStyle("td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px;font-family:simsun !important;}");
GM_addStyle("div{font-family:simsun !important;}");

var keys = Array();
var how = $('#header-title');
if(how.length == 0)
    how = $('.left');
if (how.length > 0){
<<<<<<< HEAD
    how.after('<table id="area"></table><div id="area2">');
    how.after('&#9;<button id="cpasf2">CPASF2</button>');
    how.after('&#9;<button id="cpasf">AGISO</button>');
    how.after('&#9;<button id="cpgrid">CPGRID</button>');
=======
    how.after('<table id="area"></table><div id="area2"></div>');
    how.after('<button id="cpasf">COPY ASF</button>');
    how.after('<button id="cpgrid">COPY GRID</button>');
>>>>>>> 1c2b554ad46809898f489c8a2399c460d88a2c70
    how.after('<button id="redeem">KEYS</button>');
    $('#redeem').click(function () {
        showkey();
    });
    $('#cpgrid').click(function () {
        var txt = '';
        $('#area tr').each(function(){
            $(this).children('td').each(function(){
                txt += $(this).text() + '\t';
            });
            txt += '\n';
        });
        GM_setClipboard(txt);
    });
    $('#cpasf').click(function () {
        var txt = '';
<<<<<<< HEAD
        $('#area2 div').each(function(){
            txt += $(this).text() + '\n';
        });
        txt += `********************{r}【ASF格式】{r}{r}!redeem ${keys.join(',')}`;;
        GM_setClipboard(txt);
    });
    $('#cpasf2').click(function () {
        var txt = '';
        $('#area2 div').each(function(){
            txt += $(this).text() + '\n';
        });
        txt += `\n【ASF格式】\n!redeem ${keys.join(',')}`;;
=======
        $('#area2').children('div').each(function(){
            txt += $(this).text() + '\n';
        });
>>>>>>> 1c2b554ad46809898f489c8a2399c460d88a2c70
        GM_setClipboard(txt);
    });
}

var bk = $('.title-bundle-kind');
if(bk.length > 0){
    var dv = $('#area2');
    if (dv.length == 0)
        dv = $('.title-bundle-kind');
    dv.after('<table id="area_gifts"></table><table id="area_na"></table>');
<<<<<<< HEAD
    dv.after('<button id="cpgift">CPGIFT</button>');
=======
    dv.after('<button id="cpgift">COPY GIFT</button>');
>>>>>>> 1c2b554ad46809898f489c8a2399c460d88a2c70
    dv.after('<button id="gift_btn">GIFTS</button>');
    dv.after('<button id="rest">RESTORE</button>');
    showgift();
    $('#gift_btn').click(function () {
        showgift();
    });
    $('#rest').click(function () {
        restore();
    });
    $('#cpgift').click(function () {
        var txt = '';
        $('#area_gifts tr').each(function(){
            $(this).children('td').each(function(){
                txt += $(this).text() + '\t';
            });
            txt += '\n';
        });
        GM_setClipboard(txt);
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
    keys = Array();
    var t = $('#indie_gala_2 div:first').text();
    $('.game-key-string').each(function () {
        var steam = $(this).find('.game-steam-url');
        var href = steam.attr('href');
        var ma = /(app|sub)\/(\d+)/.exec(href);
        var id = ma[2];
        var k = $(this).find('.input-block-level')[0];
        var key = k.value;
        keys.push(key);
        $('#area').append(`<tr><td><a href="http://store.steampowered.com/${ma[0]}/">${steam.text()}</a></td><td class="${id}">${key}</td><td>${i}</td><td>${t}</td></tr>`);
        $('#area2').append(`<div>【${i++}】【${steam.text()}】 <span class="${id}">${key}</span></div>`);
        var code = '';
        var m = /serial_n_([A-F0-9]+)/.exec(k.id);
        if (m){
            code = m[1];
            var link = `https://www.indiegala.com/myserials/syncget?code=${code}&cache=false&productId=${id}`;
            if (key.length == 0) {
                $.getJSON(link, function (data) {
                    if (data.status == 'success') {
                        keys.push(key);
                        k.value = data.serial_number;
                        $('.'+id).append(data.serial_number);
                        $('<input value=' + data.entity_id + '/>').insertAfter($(input));
                    } else {
                        $('.'+id).append(data.status);
                    }
                });
            }
        }
    });
<<<<<<< HEAD
=======
    var asf = `<div>********************{r}【ASF格式】{r}{r}!redeem ${keys.join(',')}</div>`;
    $('#area2').append(asf);
>>>>>>> 1c2b554ad46809898f489c8a2399c460d88a2c70
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
            link = `<tr style="color:#${color}"><td>www.indiegala.com${link}</td><td>${pwd}</td><td>${num}</td></tr>`;
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
            $('#area_na').append(`<tr><td>${v}</td><td id="${i}">-</td></tr>`);
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
        var dt = $('.profile_list').attr('id');
        var s = '';
        var m = /id=(\d+)/.exec(document.URL);
        if (m)
            s = m[1];
        bk.append(`<form id="f" action="http://167.88.168.94/ig_sale.php?c=gift&s=${s}&d=${dt}" method="post" target="_blank"></form>`);
        $('#area_gifts tr').each(function () {
            var t = $(this).find('td');
            var g = '';
            m = /id=([0-9a-f]+)/.exec($(t[0]).text());
            if (m)
                g = m[1];
            var pwd = $(t[1]).text();
            var dx = $(t[2]).text();
            $('#f').append(`<input type="hidden" name="${g}" value="${pwd},${dx}" />`);
        });
        $('#f').append('<input type="submit" value="Submit" />');
        setTimeout(function () {
            $('#f').submit();
        },1000);
    }
}

function restore(){
    var ck = GM_getValue("cookie", '');
    document.cookie = `auth="${ck}"`;
    setTimeout(function () {
        window.location.reload();
    },1000);
}
