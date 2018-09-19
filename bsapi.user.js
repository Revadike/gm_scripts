// ==UserScript==
// @name        bsapi
// @namespace   bsapi
// @description bs api
// @include     https://www.fanatical.com/en/orders/*
// @icon        https://www.fanatical.com/favicon.ico
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @updateURL https://github.com/rusania/gm_scipts/raw/master/bsapi.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/bsapi.user.js
// @version     2018.09.19.1
// @grant       GM_addStyle
// @grant       GM_setClipboard
// ==/UserScript==

$('#root').before('<li><a id ="fetch" href="#"><span style="color:green;font-weight:bold;">FETCH</span></a></li>');
$('#root').before('<li><a id ="redeem" href="#"><span style="color:yellow;font-weight:bold;">REDEEM</span></a></li>');
$('#root').before('<li><a id ="copy" href="#"><span style="color:blue;font-weight:bold;">COPY</span></a></li>');

$('#fetch').click(function () {
    $('.btn.btn-secondary.btn-block').click();
});

$('#copy').click(function () {
    var txt = '';
    $('#list tr').each(function(){
        $(this).children('td').each(function(){
            txt += $(this).text() + '\t';
        });
        txt += '\n';
    });
    GM_setClipboard(txt);
});

$('#redeem').click(function () {
    if ($('#list').length > 0) {
        $('#list').remove();
    }
    $('h3.mt-4').after('<table id="list"></table>');
    var c = $('.col-8');
    var od = '';
    var dt = '';
    if (c.length > 0){
        od = $(c[0]).text();
        dt = "'" + $(c[1]).text();
    }

    var hr = $('h3.mt-4').nextAll('hr');
    if (hr.length > 0){
        hr.nextAll('dl').each(function (i, e) {
            addgame(i, e, '');
        });

        hr.nextAll('div').each(function () {
            var text = $(this).find('h5').text();
            $('#list').append(`<tr><td>-</td><td>${text}</td><td>${od}</td><td>${dt}</td></tr>`);
            $(this).find('dl').each(function (i, e) {
                addgame(i, e);
            });
        });
    }
});

function addgame(i, e)
{
    var title = $(e).find('.col-md-5').text();
    var key = $(e).find('.form-control').val();
    var f = `<tr><td>${i+1}</td><td>${title}</td><td>${key}</td><td>【${title.replace(',', ' ')}】 ${key}</td></tr>`;
    $('#list').append(f);
}
