// ==UserScript==
// @name        dota_no_ads
// @namespace    http://tampermonkey.net/
// @description dota video no ads
// @include     http://*.17173.com/news/*
// @include     http://17173.tv.sohu.com/*
// @include     http://news.17173.com/content/*
// @include     http://v.17173.com/live/*
// @updateURL 	https://github.com/rusania/gm_scipts/raw/master/dota_no_ads.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/dota_no_ads.user.js
// @version     2016.09.08
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==

var heads = document.getElementsByTagName("embed");
for (i = 0; i < heads.length; i++)
{
   var flash = heads[i];
   var id = flash.id;
   if (flash.width==1) continue;
   var param = '&debug=1&skipAD=1&skipPT=1&skipPW=1&skipRB=1&skipOTP=1skipBR=1&showFP=0';
   var sr = heads[i].src;
   //var ur = "http://f.v.17173cdn.com/flash/Player_file_out.swf";
	// http://f.v.17173cdn.com/player_f2/MTQ1NDYwNDM.swf
	// http://f.v.17173cdn.com/flash/FilePlayer.swf
	// http://f.v.17173cdn.com/201405151/flash/Player_stream.swf
   //if (sr.match(/v.17173.com/))
   var ur = 'http://f.v.17173cdn.com/201405151/flash/Player_stream.swf';
   if (id == 'MainPlayer')
   {
      heads[i].src = ur + '?cid=' + flash.getAttribute("flashvars") + param;
   }
   else
   {
      var src = flash.src;
      var r = src.match(/([A-Za-z0-9+=]+).swf/);
      if (r)
      {
         //heads[i].setAttribute("width", "100%");
         //heads[i].setAttribute("height", "550");
         heads[i].src = ur + '?cid=' + r[1] + param;
      }
   }

}
