// ==UserScript==
// @name        steam_add_free
// @namespace   steam_add_free
// @description steam_add_free
// @include     https://store.steampowered.com/account/licenses/*
// @grant unsafeWindow
// @updateURL https://github.com/rusania/gm_scipts/raw/master/steam_add_free.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/steam_add_free.user.js
// @version     2018.05.14.1
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant GM_xmlhttpRequest
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_addStyle

// ==/UserScript==
$('h2.pageheader').after( '<div id="sflhbox" style="margin-top: 10px; margin-bottom: -20px; color: #8f98a0;"></div>');
$('#sflhbox').append('<a class="btnv6_blue_hoverfade btn_small_tall" href="javascript:sflh_addman();void(0);" style="float: right;"><span>Add sub manually...</span></a>');

unsafeWindow.sflh_addman = function( ) {
    var sID = prompt( 'Enter Free subID to add to account:' );
    if ( sID !== null ) {
        $.ajax( {
            type: 'POST',
            dataType: 'text',
            url: '//store.steampowered.com/checkout/addfreelicense',
            data: {
                action: 'add_to_cart',
                sessionid: g_sessionID,subid: sID
            },
            success:function(result){
                var r = $(result).find('.add_free_content_success_area p:first,.error');
                if (r.length > 0) {
                    alert($(r).text());
                }
            },
           error:function(xhr,status,error){
               alert(status);
           }
        });
    };
};