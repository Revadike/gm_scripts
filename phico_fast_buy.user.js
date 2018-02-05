// ==UserScript==
// @name         phico_fast_buy
// @namespace    http://tampermonkey.net/
// @version      2018.02.05.2
// @description  phicomm fast buy
// @author       jacky
// @match        https://mall.phicomm.com/*
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @run-at      document-end
// @grant       GM_log
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

var txt = GM_getValue('bo', '{"k2p":0,"x3":0,"t1":0,"dc1":0}');
var r = JSON.parse(txt);
var x = 'x3';
var id = 17;
var pay = ['alipay','wxpay','jdpay'];

$('.about').append('<a id="x3">X3</a>');
$('.about').append('<a id="t1">T1</a>');
$('.about').append('<a id="dc1">DC1</a>');
$('.about').append('<a id="to">定时</a>');
$('.about').append('<a id="tc">关闭</a>');
$('.login_reg').after('<div id="mg"></div>');

$('#x3').click(function(){
    x = 'x3';
    id = 17;
    fadd(id);
});

$('#t1').click(function(){
    x = 't1';
    id = 13;
    fadd(id);
});

$('#dc1').click(function(){
    x = 'dc1';
    id = 24;
    fadd(id);
});

$('#fa').click(function(){

});

function fadd(id)
{
    if (r[x] > 2)
        mg(x + ' 已购');
    else{
        mg(x + ' 正在购买');
        var url = '/index.php/cart-fastbuy-' + id + '-1.html';
        $.ajax({
            url: url,
            type: "GET",
            success: function(data){
                if (data.redirect)
                    fast(data.redirect);
                else
                    alert('error-1');
            },
            error: function(data){
                alert('error-2');
            }
        });
    }
}

var tm = null;
$('#to').click(function(){
    tm = setInterval(function(){
        fadd(id);
    }, 5000);
});
$('#tc').click(function(){
    clearInterval(tm);
    mg('关闭');
});

function fast(url)
{
    $.ajax({
        url: url,
        type: "GET",
        success: function(data){
            if (data.error){
                mg(data.error);
            }
            else {
                var m = /ame="cart_md5" value="([^"]+)/.exec(data);
                var cart_md5 = m[1];
                m = /ame="addr_id" value="([^"]+)/.exec(data);
                var addr_id = m[1];
                m = /ame="dlytype_id" value="([^"]+)/.exec(data);
                var dlytype_id = m[1];
                var payapp_id = pay[2];
                var da = {
                    cart_md5: cart_md5,
                    addr_id: addr_id,
                    dlytype_id: dlytype_id,
                    payapp_id: pay[2],
                    invoice_type: '',
                    invoice_title: '',
                    memo: ''
                };
                check(da);
            }
        },
        error: function(data){
            alert('error-3');
        }
    });
}

function mg(txt)
{
    $('#mg').empty();
    $('#mg').append(new Date(Date.now()).toLocaleString() + ' ' + txt);
}

function check(da)
{
    var url = 'https://mall.phicomm.com/order-create-is_fastbuy.html';
    //var url = 'https://mall.phicomm.com/checkout-check-is_fastbuy.html';
    $.ajax({
        url: url,
        type: "POST",
        data: da,
        success: function(data){
            //  {"success":"\u64cd\u4f5c\u6210\u529f","redirect":"\/checkout.html","data":{"member_addrs":{"56048":{"addr_id":"56048","uid":"0","member_id":"437681","name":"\u6731\u541b","province":"887","city":"\u5e38\u5dde\u5e02","area":"mainland:\u6c5f\u82cf\u7701\/\u5e38\u5dde\u5e02\/\u6b66\u8fdb\u533a:932","addr":"\u6a2a\u6797\u9547\u9547\u653f\u5e9c\u5317\u95e8\u6797\u5357\u8def14\u53f7","zip":null,"tel":null,"mobile":"13606117175","email":null,"day":"\u4efb\u610f\u65e5\u671f","time":"\u4efb\u610f\u65f6\u95f4\u6bb5","is_default":"true","updatetime":"1516864097","aid":"97854","selected":"true"}},"dlytypes":{"1":{"dt_id":"1","dt_name":"\u7b2c\u4e09\u65b9\u5feb\u9012","detail":"","has_cod":"false","selected":"true"}},"paymentapps":{"newchinapay":{"name":"\u4e2d\u56fd\u94f6\u8054\u652f\u4ed8","version":"v2.8.1","platform_allow":["pc","mobile","app"],"app_id":"newchinapay","display_name":"\u94f6\u8054\u652f\u4ed8","order_num":0,"app_class":"ectools_payment_applications_newchinapay","description":"\u652f\u4ed8\u65b9\u5f0f\u63cf\u8ff0","pay_fee":0,"status":"true","preferential_money":0},"alipay":{"name":"\u652f\u4ed8\u5b9d\u5373\u65f6\u5230\u8d26","version":"v4.8","platform_allow":["pc","mobile","app"],"app_id":"alipay","display_name":"\u652f\u4ed8\u5b9d\u652f\u4ed8","order_num":"2","app_class":"ectools_payment_applications_alipay","description":"\u652f\u4ed8\u5b9d\u652f\u4ed8\u63cf\u8ff0","pay_fee":0,"status":"true","preferential_money":0},"wxpay":{"name":"\u5fae\u4fe1\u516c\u4f17\u53f7\u652f\u4ed8","version":"","platform_allow":["pc","mobile"],"app_id":"wxpay","display_name":"\u5fae\u4fe1\u652f\u4ed8","order_num":"3","app_class":"wechat_payment_applications_wxpay","description":"\u5fae\u4fe1\u652f\u4ed8\u63cf\u8ff0","pay_fee":0,"status":"true","preferential_money":0},"jdpay":{"name":"\u4eac\u4e1c\u652f\u4ed8","version":"V2.0","platform_allow":["pc","mobile","app"],"app_id":"jdpay","display_name":"\u4eac\u4e1c\u652f\u4ed8","order_num":"10","app_class":"ectools_payment_applications_jdpay","description":null,"pay_fee":null,"status":"true","preferential_money":"5.00","selected":"true"}},"cart_md5":"b0a3d87c0f6ad7bfa1e51cf9d29da88e","total":{"cost_protect":"0.00","cost_freight":"0.00","cost_tax":"0.00","cost_payment":"0.00","order_total":"744.00","payment_promotion_discount_amount":"5.00","cart_amount":"749.00","member_discount_amount":"0.00","order_promotion_discount_amount":"0.00","goods_promotion_discount_amount":"0.00","promotion_discount_amount":"0.00","gain_score":"749"}}}
            if (data.success){
                r[x]++;
                GM_setValue("bo", JSON.stringify(r));
                mg(x + ' ' + data.success);
                window.open(data.redirect);
            }
            else
                alert(JSON.stringify(data));
        },
        error: function(data){
            alert('error-4');
        }
    });
}
/*
    setTimeout(function () {
        document.location.href = 'https://mall.phicomm.com/m/cart-fastbuy-17-1.html';
    },5000);

*/