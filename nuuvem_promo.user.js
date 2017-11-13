// ==UserScript==
// @name        nuuvem_promo
// @namespace   nuuvem_promo
// @description nuuvem promo info
// @include     https://www.nuuvem.com/catalog/price/promo*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/nuuvem_promo.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/nuuvem_promo.user.js
// @version     2017.09.07.01
// @run-at      document-end
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle("table{border:solid 1px;border-collapse:collapse !important;}");
GM_addStyle("td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px;font-size:16px !important;}");

$('#catalog').before('<div id="g"><a id="btn">BTN</a>&nbsp;<a id="info">INFO</a></div>');
// {&quot;current_page&quot;:1,&quot;total_pages&quot;:59,&quot;total_count&quot;:1173}"

$('#btn').click(function(){
    var pg = $('#catalog').attr('data-pager');
    var r = /total_pages":(\d+),"total_count":(\d+)/.exec(pg);
    if (r){
        var pages = r[1];
        var games = r[2];
        $('#g').append(games);
        for(var i=1;i<=pages;i++)
            $('#g').append('&nbsp;&nbsp;&nbsp;<a target=_blank href="/catalog/price/promo/page/' + i + '.html">' + i + '</a>');
    }
});

$('#g').append('<table id="tb"></table>');
$('#info').click(function(){
    var ar = new Array();
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
        var r = [id, sku, title, href, price, sale, time, drm];
        ar.push(r);
    });
    $('#g').append(JSON.stringify(ar));
});