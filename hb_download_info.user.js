// ==UserScript==
// @name        hb_download_info
// @namespace   http://tampermonkey.net/
// @description hb download info
// @include     http*://www.humblebundle.com/*
// @include     http*://www.humblebundle.com/games/*
// @include     http*://www.humblebundle.com/*?key=*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/hb_download_info.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/hb_download_info.user.js
// @version     2018.04.18.1
// @run-at      document-end
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle("table{border:solid 1px;border-collapse:collapse;font-size:16px !important;}");
GM_addStyle("td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px !important;}");
GM_addStyle(".d{font-size:16px;color:white !important;}");

var m = /current_country': "([^"]+)",/.exec(document.body.innerHTML);
if (m) {
    $('.tabs-navbar-item').append('<div class="navbar-item button-title">' + m[1] + '</div>');
}

m = /downloads/.exec(document.URL);
if (m){
    $('#headertext').append('<table id="reg"></table>');
    $('#headertext').append('<div id="info2" class="d"></div>');
    $('#headertext').append('<div><a id="r">LOCK</a></div>');
    $('#headertext').append('<div><a id="btn">INFO</a></div>');
    $('#headertext').append('<div><a id="key">KEYS</a></div>');
    $('#headertext').append('<div><a id="gift">GIFT</a></div>');
    $('#headertext').append('<table id="info"></table>');

    $('#r').click(function () {
        $('#reg').empty();
        $('#info2').empty();
        $('#reg').append('<tr><td>App</td><td>machineName</td><td>app</td><td>sub</td><td>exclusive</td><td>disallowed</td></tr>');
        var m = /key=([0-9A-Z]+)/i.exec(document.URL);
        var url = 'https://www.humblebundle.com/api/v1/order/' + m[1] + '?wallet_data=true&all_tpkds=true';
        $.ajax({
            url: url,
            type: "GET",
            success: function(data){
                $('#info2').append(data.amount_spent + '<br>');
                $('#info2').append(data.gamekey + '<br>');
                $('#info2').append(data.uid + '<br>');
                $('#info2').append(data.created + '<br>');
                $.each(data.tpkd_dict.all_tpks, function (i, item) {
                    var app = '<td></td>';
                    if (item.steam_app_id)
                        app = '<td><a target=_blank href="https://steamdb.info/app/' + item.steam_app_id + '/">' + item.steam_app_id + '</a></td>';
                    var sub = '<td></td>';
                    if (item.steam_package_id)
                        sub = '<td><a target=_blank href="https://steamdb.info/sub/' + item.steam_package_id + '/">' + item.steam_package_id + '</a></td>';
                    var exc = '<td>-</td>';
                    if (item.exclusive_countries.length)
                        exc = '<td title="' + item.exclusive_countries + '">List</td>';
                    var dis = '<td>-</td>';
                    if (item.disallowed_countries.length)
                        dis = '<td title="' + item.disallowed_countries + '">List</td>';
                    $('#reg').append('<tr><td>' + (++i) + '</td><td>' + item.machine_name + '</td>' + app + sub + exc + dis + '</tr>');
                });
            },
            error: function(data){
                alert('error-key');
            }
        });
    });

    $('#btn').click(function () {
        $('#info').empty();
        var i = 0;
        $('.key-redeemer').each(function () {
            var title = $.trim($(this).find('h4').text().replace('In your Steam library.', ''));
            var key = $.trim($(this).find('.keyfield-value').text());
            $('#info').append('<tr><td>' + (++i) + '</td><td>' + title + '</td><td>' + key + '</td></tr>');
        });
    });
    $('#key').click(function () {
        $('.keyfield').click();
    });
    $('#gift').click(function () {
        $('.giftfield').click();
    });
} else {
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
}


