// ==UserScript==
// @name        hb_download_info
// @namespace   http://tampermonkey.net/
// @description hb download info
// @include     http*://www.humblebundle.com/*
// @include     http*://www.humblebundle.com/games/*
// @include     http*://www.humblebundle.com/*?key=*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/hb_download_info.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/hb_download_info.user.js
// @version     2018.09.14.1
// @run-at      document-end
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant       GM_setClipboard
// ==/UserScript==

GM_addStyle("table{border:solid 1px;border-collapse:collapse;font-size:16px !important;}");
GM_addStyle("td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px !important;}");
GM_addStyle(".d{font-size:16px;color:white !important;}");

var m = /country_code: "([^"]+)/.exec(document.head.innerHTML);
if (m) {
    $('.tabs-navbar-item').append('<div class="navbar-item button-title">' + m[1] + '</div>');
}

m = /downloads/.exec(document.URL);
if (m){
    $('.js-cross-promo-whitebox-holder').hide();
    $('.download-mosaic').hide();
    $('.site-footer').hide();
    $('#spiel').hide();
    $('#headertext').append('<table id="reg"></table>');
    $('#headertext').append('<table id="reg2"></table>');
    $('#headertext').append('<div id="info2" class="d"></div>');
    $('#headertext').append('<div><a id="r">LOCK</a></div>');
    $('#headertext').append('<div><a id="btn">INFO</a></div>');
    $('#headertext').append('<div><a id="key">KEYS</a></div>');
    $('#headertext').append('<div><a id="gift">GIFT</a></div>');
    $('#headertext').append('<table id="info"></table>');
    $('#headertext').append('<div id="info3" class-"d"></div>');
    $('#headertext').append('<div><a id="p">COPY</a></div>');

    m = /key=([0-9A-Z]+)/i.exec(document.URL);
    var id = m[1];
    var url = `https://www.humblebundle.com/api/v1/order/${id}?wallet_data=true&all_tpkds=true`;
    $('#info2').append(`<a target=_blank href="${url}">JSON</a><br>`);

    $('#r').click(function () {
        $('#reg').empty();
        $('#reg2').empty();
        $('#info2').empty();
        $('#reg').append('<tr><td>App</td><td>machineName</td><td>app</td><td>sub</td><td>exclusive</td><td>disallowed</td><td>store</td></tr>');

        $.ajax({
            url: url,
            type: "GET",
            success: function(data){
                $('#info2').append(data.amount_spent + '<br>');
                $('#info2').append(data.gamekey + '<br>');
                $('#info2').append(data.uid + '<br>');
                $('#info2').append(data.created + '<br>');
                $('#info2').append(`<a target=_blank href="${url}">JSON</a><br>`);
                $.each(data.tpkd_dict.all_tpks, function (i, item) {
                    var app = '';
                    id = item.steam_app_id;
                    if (id)
                        app = `<a target=_blank href="https://steamdb.info/app/${id}/">${id}</a>`;
                    var sub = '';
                    var region = item.key_type;
                    id = item.steam_package_id;
                    if (item.steam_package_id){
                        sub = `<a target=_blank href="https://steamdb.info/sub/${id}/info">${id}</a>`;
                        region = 'WW,';
                    }
                    var exc = '<td>-</td>';
                    if (item.exclusive_countries.length){
                        id = item.exclusive_countries;
                        exc = `<td title="${id}">List</td>`;
                        region += '+,';
                    }
                    var dis = '<td>-</td>';
                    if (item.disallowed_countries.length){
                        id = item.disallowed_countries;
                        dis = `<td title="${id}">List</td>`;
                        region += '-,';
                    }
                    var j = ++i;
                    id = item.machine_name;
                    var king = item.human_name.replace(/ /g, '+').replace(/[^a-z0-9+]/ig, '');
                    $('#reg').append(`<tr><td>${j}</td><td>${id}</td><td>${app}</td><td>${sub}</td>${exc}${dis}<td><a target=_blank href="http://steamcn.edu.pl/king.php?q=${king}">KING</a></td></tr>`);
                    var key = item.redeemed_key_val ? item.redeemed_key_val : '';
                    var human = item.human_name;
                    $('#reg2').append(`<tr><td>${i}</td><td>${human}</td><td>${key}</td><td></td><td></td><td>${region}${sub}</td></tr>`);
                });
            },
            error: function(data){
                alert('error-key');
            }
        });
    });

    $('#p').click(function(){
        var txt = '';
        $('#reg2 tr').each(function(){
            $(this).children('td').each(function(){
                txt += $(this).text() + '\t';
            });
            txt += '\n';
        });
        GM_setClipboard(txt);
    });

    $('#btn').click(function () {
        $('#info').empty();
        $('#info3').empty();
        var i = 0;
        $('.key-redeemer').each(function () {
            var title = $.trim($(this).find('h4').text().replace('In your Steam library.', ''));
            var key = $.trim($(this).find('.keyfield-value').text().replace('Reveal your Steam key', ''));
            var j = ++i;
            $('#info').append(`<tr><td>${j}</td><td>${title}</td><td>${key}</td></tr>`);
            $('#info3').append(`<p>${title}<br>${key}</p>`);
        });
    });
    $('#key').click(function () {
        $('.keyfield').click();
    });
    $('#gift').click(function () {
        $('.giftfield').click();
    });
}

m = /games|mobile/.exec(document.URL);
if (m){
    $('.base-main-wrapper').before('<div class="d" id="a1"></div>');
    m = /BundleMain.init\(({.*}), {"CHANNEL_PREAMBLE"/.exec(document.body.innerHTML);
    if (m){
        var j = JSON.parse(m[1]);
        if (j) {
            $('#a1').append('<p>' + j.product_human_name + '</p>');
            $('#a1').append('<p>' + j.hero_tile.machine_name + '</p>');
            $('#a1').append('<p>' + j.hero_tile.tile_stamp + '</p>');
            $('#a1').append('<p>' + j.order_form.product_json.start + '</p>');
            $('#a1').append('<p>' + j.order_form.product_json.end + '</p>');
            var f = j.order_form.checkout_tiers;
            f.forEach(function (e) {
                // is_bta
                // is_initial_tier
                // is_fixed
                // is_free
                // top_header_text
                $('#a1').append('<p>' + e.price + '</p>');
            });
            f = j.slideout_data.display_items;
            $('#a1').append('<table id="b"></table>');
            var i = 1;
            for (var k in f)
            {
                if (f[k].availability_icons){
                    var g = [];
                    f[k].availability_icons.delivery_icons.forEach(function (v) {
                        g.push(v.replace('hb-', ''));
                    });
                    $('#b').append('<tr><td>' + (i++) + '</td><td>' + f[k].machine_name + '</td><td>' + f[k].human_name + '</td><td>' +  g.join() +  '</td></tr>');
                }

            }
        }
    }
}

m = /home\/keys/.exec(document.URL);
if (m){
    $('.tabs-navbar-item').append('<div class="navbar-item button-title"><a id="k">KEY</A></div>');
    $('#k').click(function(){
        var l = $('#b').length;
        if (l)
            $('#b').remove();
        $('.container').after('<table id="b"></table>');
        $('.unredeemed-keys-table tbody').find('tr').each(function(){
            var d = $(this).find('td');
            var game = $(d[1]).find('h4').text();
            var a = $(d[1]).find('a');
            var bundle = $(a).text();
            var ke = '';
            m = /key=([A-Za-z0-9]{16})/.exec($(a).attr('href'));
            if (m)
                ke = m[1];
            var serial = $(d[2]).find('.keyfield-value').text().replace('Reveal your Steam key', '');
            $('#b').append(`<tr><td>${game}</td><td>${serial}</td><td>${bundle}</td><td>${ke}</td></tr>`);
        });
    });
}

