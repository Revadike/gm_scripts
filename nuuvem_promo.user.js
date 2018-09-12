// ==UserScript==
// @name        nuuvem_promo
// @namespace   http://tampermonkey.net/
// @description nuuvem promo info
// @include     https://www.nuuvem.com/catalog/*promo*
// @include     https://www.nuuvem.com/promo*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/nuuvem_promo.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/nuuvem_promo.user.js
// @version     2018.09.12.1
// @run-at      document-end
// @require     https://code.jquery.com/jquery-3.3.1.min.js
// @grant       GM_addStyle
// @grant       GM_setClipboard
// ==/UserScript==

GM_addStyle("table{border:solid 1px;border-collapse:collapse !important;}");
GM_addStyle("td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px;font-size:16px !important;}");

$('#catalog').before('<a id="btn">BTN</a>&nbsp;<a id="info">INFO</a>&nbsp;<a id="cpitem">CPITEM</a>&nbsp;<a id="cpsale">CPSALE</a><div id="g">');
$('#nvm-content').after('<div id="item"></div><div id="sale"></div><table id="tb"></table>');
// {&quot;current_page&quot;:1,&quot;total_pages&quot;:59,&quot;total_count&quot;:1173}"

var pages = 0;
var games = 0;

$('#cpitem').click(function () {
    var txt = $('#item').text();
    GM_setClipboard(txt);
});

$('#cpsale').click(function () {
    var txt = $('#sale').text();
    GM_setClipboard(txt);
});

$('#btn').click(function(){
    $('#g').empty();
    var pg = $('#catalog').attr('data-pager');
    var r = /total_pages":(\d+),"total_count":(\d+)/.exec(pg);
    if (r){
        pages = r[1];
        games = r[2];
        for(var i=2;i<=pages;i++){
            var k = i;
            fetch(k);
        }
    }
});

function fetch(i)
{
    $('#g').append(`<td id=${i}>${i}</td>`)
    var url = `/catalog/price/promo/page/${i}.html`;
    setTimeout(function () {
        $.ajax({
            url: url,
            type: "GET",
            success: function( data, status, xhr ){
                $('#'+i).css('color', 'green');
                $('.products-dock--main').append(data);
            },
            fail: function( data, status, xhr ){
                $('#'+i).css('color', 'red');
            }
        });

    },i * 1000);
}

$('#info').click(function(){
    $('#item').empty();
    $('#sale').empty();
    var ar = new Array();
    var ar2 = new Array();
    $('.product-card--grid').each(function(){
        var p = $(this).find('.product-card__cover')[0];
        var id = $(p).attr('data-product-id');
        var sku = $(p).attr('data-product-sku');
        var a = $(this).find('a')[0];
        var title = $(a).attr('title');
        var href = $(a).attr('href');

        p = $(a).find('.product-price')[0];
        var dp = $(p).attr('data-price');
        var price = 0;
        var sale = 0;
        var time = '';
        // {"iv":6,"c":"49","e":"2017-09-13T14:59:59.000-03:00","v":649}
        r = /e":(null|"[^"]+"),"v":(\d+)/.exec(dp);
        if (r){
            time = r[1];
            sale = r[2];
        }
        var bp = $(p).attr('data-base-price');
        // {"iv":9,"c":"99","e":null,"v":999}
        r = /e":(null|"[^"]+"),"v":(\d+)/.exec(bp);
        if (r)
            price = r[2];
        var pc = Math.round(((sale / price - 1).toFixed(2)) * 100);
        price = (price / 100).toFixed(2);
        sale = (sale / 100).toFixed(2);

        var drm = $(a).find('.product-drm-info li span').text();
        $('#tb').append('<tr><td>'+ id +'</td><td>'+ sku +'</td><td>'+ title +'</td><td>'+ href +'</td><td>'+ price +'</td><td>'+ sale +'</td><td>'+ pc +'</td><td>'+ time +'</td><td>'+ drm +'</td></tr>');
        var r = [id, sku, title, href, price, sale, drm];
        ar.push(r);
        var r2 = [sku,price,sale];
        ar2.push(r2.join());
    });
    $('#item').append(JSON.stringify(ar));
    $('#sale').append(ar2.join(';'));
});