// ==UserScript==
// @name        bsapi
// @namespace   bsapi
// @description bs api
// @include     https://www.fanatical.com/en/orders/*
// @icon        https://cdn.bundlestars.com/production/brand/favicon.ico
// @updateURL https://github.com/rusania/gm_scipts/raw/master/bsapi.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/bsapi.user.js
// @version     2017.11.30.1
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// ==/UserScript==
$('#root').before('<ul id="m"></ul>');
$('#m').append('<li><a id ="fetch" href="#"><span style="color:green;font-weight:bold;">FETCH</span></a></li>');
$('#m').append('<li><a id ="redeem" href="#"><span style="color:yellow;font-weight:bold;">REDEEM</span></a></li>');
// <div ng-if="order.status === 'COMPLETE' || order.status === 'complete'" ng-hide="game.key" class="key ng-scope ng-hide"><!-- ngIf: !legacy --><a ng-click="redeemSerial(order._id, item._id, game)" ng-if="!legacy" class="ng-scope">Reveal Key</a><!-- end ngIf: !legacy --><!-- ngIf: legacy --></div>

$('#fetch').click(function () {
    $('.btn.btn-secondary.btn-block').click();
});

$('#redeem').click(function () {
    if ($('#b').length > 0)
        $('#b').empty();
    else
        $('.mt-4').after('<table id="b"></table>');

    var h = $('h5');
    if (h.length > 0){
        $('h5').each(function(){
            $(this).parent().find('.order-item').each(function (i, e) {
                var title = $(e).find('.d-flex.flex-column').text();
                var key = $(e).find('.form-control').val();
                var f = '<tr><td>' + (i+1) +'</td><td>' + title + '</td><td>' + key + '</td><td>【' + title.replace(',', '') + '】' + key + '</td></tr>';
                $('#b').append(f);
            });
        });
    } else {
        $('.order-item').each(function (i, e) {
            var title = $(e).find('.d-flex.flex-column').text();
            var key = $(e).find('.form-control').val();
            var f = '<tr><td>' + (i+1) +'</td><td>' + title + '</td><td>' + key + '</td><td>【' + title.replace(',', '') + '】' + key + '</td></tr>';
            $('#b').append(f);
        });
    }
});
