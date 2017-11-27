// ==UserScript==
// @name        steam_redeam_keys
// @namespace   steam_redeam_keys
// @description steam_redeam_keys
// @include     https://store.steampowered.com/account/registerkey
// @updateURL 	https://github.com/rusania/gm_scripts/raw/master/steam_redeam_keys.user.js
// @downloadURL https://github.com/rusania/gm_scripts/raw/master/steam_redeam_keys.user.js
// @version     2017.11.21.1
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       GM_log
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

GM_addStyle("table{border:solid 1px;border-collapse:collapse !important;}");
GM_addStyle("td{border:solid 1px;border-collapse:collapse;padding-left:5px;padding-right:5px;font-family:simsun !important;}");
GM_addStyle("div{font-family:simsun !important;}");

var le = $('.leftcol');
if(le.length > 0) {
    le.append('<div><textarea id="ks" rows="12" cols="12" maxlength="1080"></textarea></div>');
    le.append('<div><input id="btn" type="button" value="REDEAM" /></div>');
    le.append('<table id ="re"></table>');
    $('#btn').click(function(){
        regkey();
    });
}

function regkey()
{
    $('#re').empty();
    var text = $('#ks').val();
    var ks = Array();
    var re = /[A-Z0-9]{5}\-[A-Z0-9]{5}-[A-Z0-9]{5}/ig;
    var m = re.exec(text);
    while (m) {
        ks.push(m[0]);
        m = re.exec(text);
    }
    $.each(ks, function(k, v){
        var i = k;
        $('#re').append('<tr><td>' + i + '</td><td>' + v + '</td><td id="g' + i + '"></td><td id="s' + i + '"></td><td id="r' + i + '"></td></tr>');
        $.ajax({
            url: '/account/ajaxregisterkey/',
            type: "POST",
            dataType : 'json',
            data: {
                'product_key': v,
                'sessionid': g_sessionID
            },
            success: function( data, status, xhr ){
                var sErrorMessage = '';
                var strGameName = '';
                var sub = '';
                if ( data.purchase_receipt_info && data.purchase_receipt_info.line_items && data.purchase_receipt_info.line_items[0] && data.purchase_receipt_info.line_items[0].line_item_description ){
                    strGameName = data.purchase_receipt_info.line_items[0].line_item_description;
                    sub = data.purchase_receipt_info.line_items[0].packageid;
                    sub = '<a target="_blank" href="https://steamdb.info/sub/' + sub + '/">' +  sub +'</a>';
                }

                if (data.success == 1){
                    sErrorMessage = '激活成功';
                } else if ( data.purchase_result_details !== undefined && data.purchase_receipt_info ){
                    sErrorMessage = '发生了一个意外错误。';
                    switch ( data.purchase_result_details )
                    {
                        case 14:
                            sErrorMessage = '您输入的产品代码无效。';
                            break;

                        case 15:
                            sErrorMessage = '您输入的产品代码已经被另一个 Steam 帐户激活，该代码无法再次使用。';
                            break;

                        case 53:
                            sErrorMessage = '该帐户或互联网地址最近的激活尝试过多。';
                            break;

                        case 13:
                            sErrorMessage = '抱歉，本产品在此国家/地区不能购买。';
                            break;

                        case 9:
                            sErrorMessage = '该 Steam 帐户已拥有此特惠中包含的产品。';
                            break;

                        case 24:
                            sErrorMessage = '您输入的产品代码在激活之前需要先拥有另一产品。';
                            break;

                        case 36:
                            sErrorMessage = '您所输入的产品代码需要您首先在 PlayStation®3 系统上玩过此游戏后才能注册。';
                            break;

                        case 50: // User entered wallet code
                            sErrorMessage = '您所输入的代码来自 Steam 礼物卡或 Steam 钱包充值码。';
                            break;

                        case 4:
                        default:
                            sErrorMessage = '发生了一个意外错误。您的产品代码尚未兑换。';
                            break;
                    }
                }
                $('#g'+i).append(strGameName);
                $('#s'+i).append(sub);
                $('#r'+i).append(sErrorMessage);
            },
            fail: function( data, status, xhr ){
                $('#r'+i).append(status);
            }
        });
    });
}
