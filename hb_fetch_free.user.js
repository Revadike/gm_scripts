// ==UserScript==
// @name        hb_fetch_free
// @namespace   http://tampermonkey.net/
// @description hb fetch free
// @include     http*://www.humblebundle.com/*
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/hb_fetch_free.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/hb_fetch_free.user.js
// @version     2018.03.30.1
// @run-at      document-end
// @require     http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

GM_addStyle("table{border:solid 1px;border-collapse:collapse !important;}");
GM_addStyle("td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px !important;}");
GM_addStyle(".d{font-size:16px;color:white !important;}");

var verify = GM_getValue("uidverify", "");
var uid = GM_getValue("uid", "");
var key = GM_getValue("key", "");
var serial = GM_getValue("serial", "");
var mail= $('.display-name-container').text();

$('.tabs-navbar-item').append('<div class="navbar-item button-title" id="a"></div>');
$('.tabs-navbar-item').append('<div class="navbar-item button-title"><a id="free">FREE</a></div>');

/*
setTimeout(function () {
    auto();
},3000);
*/

$('#free').click(function(){
    auto();
});

function auto()
{
    if (key){
        if (serial){
            $('#a').empty();
            $('#a').append(serial);
        } else {
            fetch_serial(key);
        }
    } else {
        if (uid && verify){
            fetch_mail(uid, verify);
        } else {
            fetch_game();
        }
    }
}

function fetch_game()
{
    var da = {
        email: mail,
        product: 'shopping_cart',
        processor: 'free',
        'p-specops_theline_storefront': '0,USD',
        discount: 0,
        wallet_amount: 0,
        cyoc_total: 0,
        keep_total: 0,
        currency: 'USD',
        amount: 0,
        tax_rate: 0,
        tax_amount: 0,
        cart_contents: 'specops_theline_storefront',
    };

    var url = '/humbler/submit';
    $.ajax({
        url: url,
        type: "POST",
        data: da,
        success: function(data){
            var m = /uidverify=([0-9a-f]+)&s=thanks&uid=([0-9A-Z]+)/.exec(data);
            if (m){
                verify = m[1];
                GM_setValue("verify", verify);
                uid = m[2];
                GM_setValue("uid", uid);
                fetch_mail(uid, verify);
            } else {
                alert(data);
            }
        },
        error: function(xhr, data){
            if (xhr.status == 301){
                alert(xhr.responseText);
            } else {
                alert('error-game');
            }
        }
    });
}

function fetch_serial2(machineName, index)
{
    var da = {
        gift: false,
        keytype: machineName,
        key: key,
        keyindex: index
    };

    var url = '/humbler/redeemkey';
    $.ajax({
        url: url,
        type: "POST",
        data: da,
        success: function(data){
            if (data.success){
                serial = data.key;
                GM_setValue("serial", serial);
                $('#a').append(serial);
            } else {
                alert('error-serial2');
            }
        },
        error: function(xhr, data){
            alert('error-serial2');
        }
    });
}

function fetch_serial(key)
{
    var url = 'https://www.humblebundle.com/api/v1/order/' + key + '?all_tpkds=true';
    $.ajax({
        url: url,
        type: "GET",
        success: function(data){
            $.each(data.tpkd_dict.all_tpks, function (i, item) {
                serial = item.redeemed_key_val;
                if (serial){
                    GM_setValue("serial", serial);
                    $('#a').append(serial);
                } else {
                    fetch_serial2(item.machine_name, item.keyindex);
                }
            });
        },
        error: function(data){
            alert('error-key');
        }
    });
}

function fetch_mail(uid, verify)
{
    var url = '/emailhelper?uid=' + uid + '&uidverify=' + verify;
    $.ajax({
        url: url,
        type: "GET",
        success: function(data){
            var m = /key=([A-Z0-9]{16})/i.exec(data);
            if (m){
                key = m[1];
                GM_setValue("key", key);

                setTimeout(function () {
                    fetch_serial(key);
                },5000);
            }
        },
        error: function(data){
            alert('error-mail');
        }
    });
}