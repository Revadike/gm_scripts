// ==UserScript==
// @name        townian
// @namespace    http://tampermonkey.net/
// @description Townian Auto
// @include     http://worlds.townian.com/world/town.php?town=*
// @include     http://townian.com/world/town.php?town=*
// @updateURL 	https://github.com/rusania/gm_scipts/raw/master/townian.user.js
// @downloadURL https://github.com/rusania/gm_scipts/raw/master/townian.user.js
// @version     2016.09.08
// @run-at      document-end
// @require     http://libs.baidu.com/jquery/1.10.1/jquery.min.js
// @grant       none
// ==/UserScript==

//Embassy
//Requires: Town Hall level 5,
// 9 max 1
var db_embassy = new Array(
      [0, 500, 400, 465, 450, 350, 25, '02:00:00']);

//Port	12	-1  ????money???
//Requires : Embassy level 1,
var db_port = new Array(
      [0, 175, 270, 225, 105, 110, 16, '00:20:00'],
	  [0,262,405,337,157,165,4,'00:30:00'],
	  [5,393,607,506,236,247,4,'00:50:00'],
	  [10]);

//Wall	13	-1
//Requires: Blacksmith level 1,
var db_wall = new Array(
      [0, 110, 330, 260, 230, 70, 20, '00:25:00'],
	  [100,165,495,390,345,105,18,'00:35:00'],
	  [110],
	  []);

//Guard Tower	14	-1
//Requires: Blacksmith level 1,
var db_tower = new Array(
      [0, 115, 250, 295, 265, 75, 10, '00:20:00'],
	  [90,172,375,442,397,112,3,'00:30:00']);

//Workshop
//Requires: Academy level 1, Armory level 5,
var db_work = new Array(
      [0, 250, 225, 255, 145, 180, 6, '00:30:00']);

//Stable  19 stable.php
//Requires: Barracks level 5, Academy level 1, Armory level 7,
var db_stable = new Array(
      [0, 240, 310, 150, 180, 125, 4, '00:20:00'],
	  [0,360,465,225,270,187,2,'00:30:00'],
	  [5]);

//Siege Yard  20 sshop.php
//Requires: Barracks level 10, Academy level 1, Blacksmith level 1, Armory level 10,
var db_yard = new Array(
      [0, 425, 505, 485, 600, 265, 12, '00:30:00'],
	  [0,637,757,727,900,397,4,'00:40:00'],
	  [5]);

function getVar(str)
{
   var m = /<b>(\d+)</.exec(str);
   if (m != null)
      return m[1];
   return 0;
}

function getLv(str)
{
   var m = /Level\s*(\d+)/.exec(str);
   if (m != null)
      return m[1];
   return '';
}

function CanBuild(arr)
{
   for (var i = 0; i < 5; i++)
   {
      if (res[1][i] < arr[i + 1])
         return false;
   }
   return true;
}

function UpgradeCost(arr)
{
   var m = new Array();
   for (var i = 0; i < 5; i++)
   {
      m.push('[' + res[0][i] + ']:' + arr[i + 1]);
   }
   m.push('[pop]:' + arr[6]);
   m.push('[time]:' + arr[7]);
   return '<b>Cost:</b><br>' + m.join(';');
}

function Require(arr)
{
   var m = new Array();
   var n = new Array();
   var ob = new Array(2);
   m.push('buy_.php?'.concat(id));
   for (var i = 0; i < 5; i++)
   {
      f = res[1][i] - arr[i + 1];
      if (f < 0)
      {
         n.push('[' + res[0][i] + ']:' + f);
         f = Math.ceil(Math.abs(f) / 100) * 100;
      }
      else
      {
         f = 0;
      }
      m.push(res[0][i] + '=' + f);
   }
   
   // buy_.php?town=8660&food=500&wood=500&stone=400&iron=500&gold=600
   // buy_.php?town=8660&food=0&wood=0&stone=0&iron=100&gold=100
   ob[0] = m.join('&');
   ob[1] = n.join(';');
   return ob;
}

var el = document.getElementById('footer_home');
if (el != null)
   var id = /town=(\d+)/.exec(el.innerHTML)[0];

var cquequeinfo = document.getElementById('cquequeinfo');

var foodvalue = getVar(document.getElementById('foodvalue').innerHTML);
var woodvalue = getVar(document.getElementById('woodvalue').innerHTML);
var stonevalue = getVar(document.getElementById('stonevalue').innerHTML);
var ironvalue = getVar(document.getElementById('ironvalue').innerHTML);
var goldvalue = getVar(document.getElementById('goldvalue').innerHTML);

var res = new Array(
      ['food', 'wood', 'stone', 'iron', 'gold'],
      [foodvalue, woodvalue, stonevalue, ironvalue, goldvalue]);

// 0
var db_gmill = new Array(
      [0, 70, 120, 80, 80, 65, 2, '00:01:00'],
      [50, 105, 180, 120, 120, 97, 2, '00:02:00'],
      [60, 157, 270, 180, 180, 146, 4, '00:04:00'],
      [75, 236, 405, 270, 270, 219, 4, '00:08:00'],
      [90, 354, 607, 405, 405, 329, 6, '00:16:00'],
      [110, 531, 911, 607, 607, 493, 6, '00:32:00'],
      [135, 797, 1366, 911, 911, 740, 8, '01:04:00'],
      [165, 1196, 2050, 1366, 1366, 1110, 8, '02:08:00'],
      [195, 1794, 3075, 2050, 2050, 1665, 10, '04:16:00'],
      [235, 2691, 4613, 3075, 3075, 2498, 10, '08:32:00'],
      [275, 0, 0, 0, 0, 0, 0, 'max']);

//0,1
var db_lmill = new Array(
      [0, 80, 70, 120, 80, 65, 2, '00:01:00'],
      [50, 120, 105, 180, 120, 97, 2, '00:02:00'],
      [60, 180, 157, 270, 180, 146, 2, '00:04:00'],
      [75, 270, 236, 405, 270, 219, 2, '00:08:00'],
      [90, 405, 354, 607, 405, 329, 4, '00:16:00'],
      [110, 607, 531, 911, 607, 493, 4, '00:32:00'],
      [135, 911, 797, 1366, 911, 740, 4, '01:04:00'],
      [165, 1366, 1196, 2050, 1366, 1110, 4, '02:08:00'],
      [195, 2050, 1794, 3075, 2050, 1665, 6, '04:16:00'],
      [235, 3075, 2691, 4613, 3075, 2498, 6, '08:32:00'],
      [275, 0, 0, 0, 0, 0, 0, 'max']);

//0
var db_smason = new Array(
      [0, 80, 80, 70, 120, 65, 2, '00:01:00'],
      [50, 120, 120, 105, 180, 97, 2, '00:02:00'],
      [60, 180, 180, 157, 270, 146, 2, '00:04:00'],
      [75, 270, 270, 236, 405, 219, 2, '00:08:00'],
      [90, 405, 405, 354, 607, 329, 4, '00:16:00'],
      [110, 607, 607, 531, 911, 493, 4, '00:32:00'],
      [135, 911, 911, 797, 1366, 740, 4, '01:04:00'],
      [165, 1366, 1366, 1196, 2050, 1110, 6, '02:08:00'],
      [195, 2050, 2050, 1794, 3075, 1665, 6, '04:16:00'],
      [235, 3075, 3075, 2691, 4613, 2498, 6, '08:32:00'],
      [275, 0, 0, 0, 0, 0, 0, 'max']);

//0
var db_ifoundry = new Array(
      [0, 120, 80, 80, 70, 65, 2, '00:01:00'],
      [50, 180, 120, 120, 105, 97, 2, '00:02:00'],
      [60, 270, 180, 180, 157, 146, 2, '00:04:00'],
      [75, 405, 270, 270, 236, 219, 4, '00:08:00'],
      [90, 607, 405, 405, 354, 329, 4, '00:16:00'],
      [110, 911, 607, 607, 531, 493, 4, '00:32:00'],
      [135, 1366, 911, 911, 797, 740, 6, '01:04:00'],
      [165, 2050, 1366, 1366, 1196, 1110, 6, '02:08:00'],
      [195, 3075, 2050, 2050, 1794, 1665, 6, '04:16:00'],
	  [235, 4613, 3075, 3075, 2691, 2498, 6,'08:32:00'],
	  [275, 0, 0, 0, 0, 0, 0, 'max']);

// Requires: Farm level 1,
var db_granary = new Array(
      [0, 110, 140, 100, 60, 70, 2, '00:05:00'],
      [2000, 165, 210, 150, 90, 105, 2, '00:10:00'],
      [2600, 247, 315, 225, 135, 157, 2, '00:20:00'],
      [4000, 371, 472, 337, 202, 236, 2, '00:35:00'],
      [6200, 556, 708, 506, 303, 354, 2, '00:55:00'],
      [9200, 835, 1063, 759, 455, 531, 4, '01:20:00'],
      [13000, 1252, 1594, 1139, 683, 797, 4, '01:50:00'],
      [17600, 1879, 2392, 1708, 1025, 1196, 4, '02:25:00'],
	  [23000, 2819, 3588, 2562, 1537, 1794, 4, '03:05:00'],
	  [29200, 4228, 5382, 3844, 2306, 2691, 4, '03:50:00'],
	  [38400, 0, 0, 0, 0, 0, 0, 'max']);

// Requires: Lumber Mill level 1, Stone Mason level 1, Iron Foundry level 1, 
var db_warehouse = new Array(
      [0, 85, 100, 140, 160, 75, 2, '00:05:00'],
      [2000, 127, 150, 210, 240, 112, 2, '00:10:00'],
      [2600, 191, 225, 315, 360, 168, 2, '00:20:00'],
      [4000, 286, 337, 472, 540, 253, 2, '00:35:00'],
      [6200, 430, 506, 708, 810, 379, 4, '00:55:00'],
      [9200, 645, 759, 1063, 1215, 569, 4, '01:20:00'],
      [13000, 968, 1139, 1594, 1822, 854, 4, '01:50:00'],
      [17600, 598, 1708, 2392, 598, 939, 2, '02:25:00'],
	  [23000, 2178, 2562, 3588, 4100, 1922, 6, '03:05:00'],
	  [29200, 3267, 3844, 5382, 6150, 2883, 6, '03:50:00'],
	  [38400, 0, 0, 0, 0, 0, 0, 'max']);

// Requires: Lumber Mill level 1, 
var db_house = new Array(
      [0, 125, 115, 105, 55, 45, 0, '00:05:00'],
      [45, 187, 172, 157, 82, 67, 0, '00:10:00'],
      [75, 281, 258, 236, 123, 101, 0, '00:20:00'],
      [123, 421, 388, 354, 185, 151, 0, '00:35:00'],
      [135, 632, 582, 531, 278, 227, 0, '00:55:00'],
      [222, 949, 873, 797, 417, 341, 0, '01:20:00'],
      [366, 1423, 1309, 1196, 626, 512, 0, '01:50:00'],
      [604, 2135, 1964, 1794, 939, 768, 0, '02:25:00'],
	  [996, 3203, 2947, 2691, 1409, 1153, 0, '03:05:00'],
	  [1644, 4805, 4420, 4036, 2114, 1729, 0, '03:50:00'],
	  [2712, 0, 0, 0, 0, 0, 0, 'max']);

	  // 800,1600,
var db_hall = new Array(
      [0, 0, 0, 0, 0, 0, 0, 'no'],
      [0, 307, 225, 270, 397, 202, 4, '00:30:00'],
      [5, 461, 337, 405, 596, 303, 6, '00:50:00'],
      [10, 691, 506, 607, 894, 455, 8, '01:35:00'],
      [15, 1037, 759, 911, 1341, 683, 10, '02:00:00'],
      [20, 1556, 1139, 1366, 2012, 1025, 12, '02:55:00'],
      [25, 2335, 1708, 2050, 3018, 1537, 14, '03:45:00'],
      [30, 3502, 2562, 3075, 4527, 2306, 16, '4:25:00'],
      [35, 5253, 3844, 4613, 6791, 3459, 18, '05:05:00'],
      [40, 7880, 5766, 6919, 10187, 5189, 20, '06:00:00'],
      [50, 0, 0, 0, 0, 0, 0, 'max']);

// Requires: Granary level 1, Storehouse level 1, 
var db_cache = new Array(
      [0, 95, 120, 110, 90, 80, 2, '00:10:00'],
      [1000, 142, 180, 165, 135, 120, 2, '00:15:00'],
      [1300, 213, 270, 247, 202, 180, 2, '0:25:00'],
      [2000, 320, 405, 371, 303, 270, 4, '00:40:00'],
	  [3100,480,607,556,455,405,4,'01:00:00'],
	  [4600,721,911,835,683,607,4,'01:25:00'],
	  [6500,1082,1366,1252,1025,911,6,'01:55:00'],
	  [8800,1623,2050,1879,1537,1366,6,'02:30:00'],
	  [11500,2434,3075,2819,2306,2050,6,'03:10:00'],
	  [14600,3652,4613,4228,3459,3075,6,'03:55:00'],
	  [19200, 0, 0, 0, 0, 0, 0, 'max']);

//Barracks	15	-1
//Requires: Academy level 1, Blacksmith level 1, Armory level 3,
var db_barracks = new Array(
      [0, 245, 205, 165, 265, 205, 6, '00:30:00'],
      [0, 367, 307, 247, 397, 307, 6, '00:40:00'],
	  [5,551,461,371,596,461,6,'01:00:00'],
	  [10,826,691,556,894,691,6,'01:30:00'],
	  [15,1240,1037,835,1341,1037,8,'02:10:00'],
	  [20,1860,1556,1252,212,1556,8,'03:00:00'],
	  [25,2790,2335,1879,3018,2335,8,'04:00:00'],
	  [30,4186,3502,2819,4527,3502,8,'05:10:00'],
	  [35,6279,5253,4228,6791,5253,10,'06:10:00'],
	  [40,9418,7880,6343,10187,7880,10,'08:00:00'],
	  [50, 0, 0, 0, 0, 0, 0, 'max']);

//Marketplace	10	-1
//Requires: Town Hall level 2, 
var db_market = new Array(
      [0, 165, 265, 360, 180, 185, 28, '00:10:00'],
	  [1,247,397,540,270,277,4,'00:15:00'],
	  [2,371,596,810,405,416,4,'00:25:00'],
	  [3,556,894,1215,607,624,4,'00:40:00'],
	  [4,835,1341,1822,911,936,6,'01:00:00'],
	  [5,1252,2012,2733,1366,1404,6,'01:25:00'],
	  [6,1879,3018,4100,2050,2107,6,'01:55:00'],
	  [7,2819,4527,6150,3075,3160,8,'02:30:00'],
	  [8,4228,6791,9226,4613,4741,8,'03:10:00'],
	  [9,6343,10187,13839,6919,7112,10,'03:55:00'],
	  [10, 0, 0, 0, 0, 0, 0, 'max']);

//Cathedral	11	-1
//Requires: Town Hall level 9,
var db_cathedral = new Array(
      [0, 245, 415, 345, 210, 435, 2, '00:20:00'],
      [1, 367, 622, 517, 315, 652, 2, '00:30:00'],
      [1, 551, 933, 776, 472, 978, 2, '00:50:00'],
      [2, 826, 1400, 1164, 708, 1468, 4, '01:20:00'],
      [2, 1240, 2100, 1746, 1063, 2202, 4, '02:00:00'],
      [2, 1860, 3151, 2619, 1594, 3303, 4, '02:50:00'],
      [3, 2790, 4727, 3929, 2392, 4954, 6, '03:50:00'],
	  [3, 4186, 7090, 5894, 3588, 7432, 6, '05:00:00'],
	  [3, 6279, 10635,8841,5382,11148,6,'06:20:00'],
	  [4,9418,15953,13262,8073,16722,6,'07:50:00'],
	  [4, 0, 0, 0, 0, 0, 0, 'max']);

//Armory
//Requires: Cache level 2
// 1?? err
var db_armory = new Array(
      [0, 165, 105, 255, 225, 135, 2, '00:10:00'],
      [10, 82, 52, 127, 112, 82, 1, '00:15:00'],
      [15, 371, 236, 573, 506, 303, 2, '00:25:00'],
      [25, 556, 354, 860, 759, 455, 2, '00:40:00'],
	  [40,835,531,1290,1139,683,2,'01:00:00'],
	  [60,1252,797,1936,1708,1025,4,'01:25:00'],
	  [85,1879,1196,2904,2562,1537,4,'01:55:00'],
	  [115,2819,1794,4356,3844,2306,4,'02:30:00'],
	  [150,4228,2691,6535,5766,3459,4,'03:10:00'],
	  [190,6343,4036,9803,8649,5189,4,'03:55:00'],
	  [235, 0, 0, 0, 0, 0, 0, 'max']);

//Academy (1)
//Requires: Armory level 1,
// max 1
var db_academy = new Array(
      [0, 600, 1050, 705, 750, 605, 30, '02:00:00']);

//Blacksmith	(1)	17	-1
//Requires: Academy level 1, Armory level 3,
// max 1
var db_black = new Array(
      [0, 800, 450, 1055, 750, 655, 20, '01:45:00']);

var db = new Array(
      ['gmill', 'gmill', 'Farm', db_gmill, 0, -1, 10],
      ['lmill', 'lmill', 'Lumber Mill', db_lmill, 1, -1, 10],
      ['smason', 'smason', 'Stone Mason', db_smason, 2, -1, 10],
      ['ifoundry', 'ifoundry', 'Iron Foundry', db_ifoundry, 3, -1, 10],
      ['granary', 'granary', 'Granary', db_granary, 4, -1, 10],
      ['warehouse', 'warehouse', 'Storehouse', db_warehouse, 5, -1, 10],
      ['cache', 'cache', 'Cache', db_cache, 6, -1, 10],
      ['hall', 'hall', 'Town Hall', db_hall, 7, -1, 10],
      ['house', 'house', 'Hut', db_house, 8, -1, 10],
      ['mstorage', 'wwarehouse', 'Armory', db_armory, 21, -1, 10],
      ['barracs', 'barracks', 'Barracks', db_barracks, 15, -1, 10],
      ['cathedral', 'cathedral', 'Cathedral', db_cathedral, 11, -1, 10],
      ['academy', 'academy', 'Academy', db_academy, 16, -1, 0],
      ['blacksmith', 'blacksmith', 'Blacksmith', db_black, 17, -1, 0]);

// HP	Speed	Attack	Defense	Food	Wood	Stone	Iron	Gold	Time
var db_Spearman = new Array([15, 6, 3, 20, 450, 240, 150, 180, 150, '00:05:00']);
var db_Swordsman = new Array([20, 5, 5, 25, 750, 450, 300, 450, 300, '00:10:00']);
var db_Axe_Master = new Array([25, 4, 7, 40, 725, 550, 450, 525, 425, '00:15:00']);
var db_Bowman = new Array([10, 7, 10, 10, 800, 750, 275, 275, 375, '00:10:00']);
var db_Crossbowman = new Array([15, 8, 12, 20, 700, 750, 300, 625, 575, '00:15:00']);
var db_Knight = new Array([40, 14, 15, 45, 1405, 805, 505, 705, 675, '00:20:00']);
var db_Ranger = new Array([25, 19, 10, 15, 805, 525, 405, 355, 405, '00:20:00']);
var db_Battering_Ram = new Array([75, 3, 30, 20, 900, 900, 1050, 750, 600, '00:45:00']);
var db_Catapult = new Array([50, 2, 50, 0, 1200, 1255, 905, 600, 875, '00:30:00']);
var db_Warship = new Array([500, 29, 250, 30, 1800, 2100, 1500, 1800, 3600, '02:00:00']);
var db_Transport_Ship = new Array([300, 24, 15, 10, 1200, 2400, 900, 1200, 2400, '01:00:00']);
var db_Colonist = new Array([25, 9, 5, 20, 905, 2100, 1555, 1875, 3000, '01:00:00']);
var db_Scout = new Array([35, 23, 10, 15, 955, 750, 450, 450, 625, '00:20:00']);

var db_research = new Array(
      ['Spearman', db_Spearman],
      ['Swordsman', db_Swordsman],
      ['Axe Master', db_Axe_Master],
      ['Bowman', db_Bowman],
      ['Crossbowman', db_Crossbowman],
      ['Knight', db_Knight],
      ['Ranger', db_Ranger],
      ['Battering Ram', db_Battering_Ram],
      ['Catapult', db_Catapult],
      ['Warship', db_Warship],
      ['Transport Ship', db_Transport_Ship],
      ['Colonist', db_Colonist],
      ['Scout', db_Scout]);

for (var i = 0; i < db.length; i++)
{
   var ar = db[i];
   var val = ar[0];
   el = document.getElementById(val);
   if (el != null)
   {
      var lv = getLv(el.innerHTML);
      var div = document.createElement('div');
      div.setAttribute('style', 'background-color:#ffffff');
      var link = document.createElement('a');
      // build.php?town=8660&b=1&subB=0
      // lmill.php?town=8660
      var hr = ar[1].concat('.php?', id);
      var str = ar[2].concat(' - Lv ', lv);
      var msg = 'showTooltip(event,\'No Info\')';
      if (lv != '')
      {
         if (lv == 10)
         {
            str += '(Max)';
         }
         else if (lv >= ar[3].length)
         {
            str += '(No data)';
         }
         else
         {
            msg = 'showTooltip(event,'.concat('\'', UpgradeCost(ar[3][lv]), '\')');
            if (CanBuild(ar[3][lv]))
            {
               str += '(Upgrade)';
               hr = 'build.php?'.concat(id, '&b=', ar[4], '&subB=', ar[5]);
            }
            else
            {
               str += '(Buy)';
               var o = Require(ar[3][lv]);
               hr = o[0];
               msg = 'showTooltip(event,'.concat('\'<b>Require:</b><br>', o[1], '\')');
            }
         }
         
         link.setAttribute('onmouseout', 'hideTooltip()');
         link.setAttribute('onmouseover', msg);
         link.setAttribute('href', hr);
         link.innerHTML = str;
         div.appendChild(link);
         cquequeinfo.appendChild(div);
      }
   }
}
document.getElementById('cquequeinfo') = cquequeinfo;
