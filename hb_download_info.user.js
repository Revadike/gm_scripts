// ==UserScript==
// @name        hb_download_info
// @namespace   http://tampermonkey.net/
// @description hb download info
// @include     http*://www.humblebundle.com/*
// @include     http*://www.humblebundle.com/games/*
// @include     http*://www.humblebundle.com/*?key=*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/hb_download_info.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/hb_download_info.user.js
// @version     2018.02.08.1
// @run-at      document-end
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle("table{border:solid 1px;border-collapse:collapse !important;}");
GM_addStyle("td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px !important;}");
GM_addStyle(".d{font-size:16px;color:white !important;}");

var m = /current_country': "([^"]+)",/.exec(document.body.innerHTML);
if (m) {
    $('.tabs-navbar-item').append('<div class="navbar-item button-title">' + m[1] + '</div>');
}

m = /downloads/.exec(document.URL);
if (m){
    var r = /var data = ({"keys".*});/.exec(document.body.innerHTML);
    if (r){
        $('#headertext').append('<table id="reg"></table>');
        $('#reg').append('<tr><td>App</td><td>machineName</td><td>exclusive</td><td>disallowed</td></tr>');
        var data = JSON.parse(r[1]);
        $.each(data.keys, function (i, item) {
            var exc = '<td>-</td>';
            if (item.exclusiveCountries.length){
                exc = '<td title="' + item.exclusiveCountries + '">List</td>';
            }
            var dis = '<td>-</td>';
            if (item.disallowedCountries.length){
                dis = '<td title="' + item.disallowedCountries + '">List</td>';
            }
            $('#reg').append('<tr><td>' + item.steamAppId + '</td><td>' + item.machineName + '</td>' + exc + dis+'</tr>');
        });
    }
    /*
	r = /data.countryCode = "([^"]+)";/.exec(document.body.innerHTML);
	if (r)
		$('#headertext').append('<div><b>' + r[1] + '</b></div>');
    */

    $('#headertext').append('<div><a id="btn">INFO</a></div>');
    $('#headertext').append('<div><a id="key">KEYS</a></div>');
    $('#headertext').append('<div><a id="gift">GIFT</a></div>');
    $('#headertext').append('<table id="info"></table>');

    $('#btn').click(function () {
        $('#info').empty();
        var i = 0;
        $('#steam-tab').find('.sr-key').each(function () {
            var title = $.trim($(this).find('.sr-key-heading').text());
            var key = $.trim($(this).find('.keyfield-text').text());
            $('#info').append('<tr><td>' + (++i) + '</td><td>' + title + '</td><td>' + key + '</td></tr>');
        });
    });
    $('#key').click(function () {
        $('.sr-unredeemed-steam-button').find('span').click();
    });
    $('#gift').click(function () {
        $('.sr-unredeemed-gift-button').find('span').click();
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


