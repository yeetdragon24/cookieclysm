if(typeof CCSE == 'undefined') Game.LoadMod('https://klattmose.github.io/CookieClicker/CCSE.js');
if (buildings === undefined) var buildings = {};
buildings.name = 'Black Hole Inverter';
buildings.version = '1.14';
buildings.GameVersion = '2.052';

buildings.isLoaded = false;

var lafb = 0; // loops amount for building
var lafu = 0; // loops amount for upgrades
var lafa = 0; // loops amount for achievments
var k; // json.[lafb]
var up; // k.upgrades
var u; // u[lafu]
var ach; // k.achievments
var a; // a[lafa]
var last; 
var o = 0; 
var order = buildings.getTieredUpgradeOrder();
var iconsURL;

buildings.launch = function(){
buildings.makeBuildingFromJSON = function({json = undefined,json_url = undefined} = {}){

  while (buildings.isLoaded==false && CCSE.isLoaded==0){} // waits till CCSE and Buildings is loaded

  if (json === undefined) {
    try {
    const response = fetch(json_url);
    json = response.json();
    }
    catch (e) {json = undefined}
  }
  
  try {
    while (typeof json[lafb] != 'undefined'){ // loop for more than 1 building

      k = json[lafb]; // current building

      iconsURL = k.art.customIconsPic; // current building icon

    // default function
      if (k.CpsFunction === "default") buildings.CpsFunction() = function(me) {var mult=1; mult*=Game.GetTieredCpsMult(me); mult*=Game.magicCpS(me.name); return me.baseCps*mult;};
    // custom function
      else {buildings.CpsFunction() = new Function("me",k.CpsFunction);}

    // default function
      if (k.buyFunction === "default") buildings.BuyFunction() = function() {Game.UnlockTiered(this);if (this.amount >= Game.SpecialGrandmaUnlock && Game.Objects['Grandma'].amount>0) Game.Unlock(this.grandma.name);}
    // custom function
      else (buildings.BuyFunction() = new Function(k.buyFunction));

      // Makes the building
      CCSE.NewBuilding(k.name, k.commonName, k.desc, k.icon, k.iconColumn, k.art, k.price, buildings.CpsFunction(me), buildings.BuyFunction(), k.foolObject, k.buildingSpecial)
      // draws the text
      Game.Objects[k.name].displayName= '<span style="font-size:'+k.fontSize+'%;position: relative;bottom:4px;">'+k.name+'</span>';

      // stuff
      up = k.upgrades;
      // Makes the upgrades
      while (typeof up[lafu] != 'undefined'){
        u = up[lafu];
        Game.TieredUpgrade(u.name,u.desc,k.name, lafu+1)
        last = Game.last;
        last.icon[2] = iconsURL;
        last.order = order + o / 100;
        o++;
        lafu++;
      } 
    
      up = k.special.upgrades;
      // grandma upgrades
      u = up.grandma; 
      order = buildings.getGrandmaUpgradeOrder();
      last = Game.GrandmaSynergy(u.name, u.desc, k.name);   
      last.order = order;
      // synergy 1 upgrade
      u = up.synergy1;
      order = buildings.getSynergyUpgradeOrder();
      last = Game.SynergyUpgrade(u.name, u.desc, k.name, u.building, 'synergy1'); 
      last.icon[2] = iconsURL;
      last.order = order;
      // synergy 2 upgrade
      u = up.synergy2;
      last = Game.SynergyUpgrade(u.name, u.desc, k.name, u.building, 'synergy2'); 
      last.icon[2] = iconsURL; 
      last.order = order + 0.01;
      // achievement code preparation
      order = buildings.getAchievementOrder(); 
      o = 0;
      ach = k.achievements;
      // achievements
      while (typeof ach[lafa] != 'undefined'){
        a = ach[lafa];
        last = Game.TieredAchievement(a.name, a.desc, k.name, lafa+1); 
        last.icon[2] = iconsURL;
        last.order = order + o / 100;
        o++;
      }
      // special achievements
      a = k.special.achievements;
      // production achievements
      for (var i = 1; i < 5; i++){
      last = Game.ProductionAchievement(a[i], k.name, i); 
      last.icon[2] = iconsURL; 
      last.order = order + o / 100; 
      o++;
      }
      
      // level 10 achievement
      last = CCSE.NewAchievement(a.name, a.desc, [1, 26, iconsURL]); 
      Game.Objects[k.name].levelAchiev10 = last; 
      last.order = order + o / 100;
      o++;
      // preperation for next building
      lafb++;
      lafa = 0;
      lafu = 0;
    }
  }
  // catch error
  catch (e) {
    console.log(e)
    return buildings.int2strtoint(1);
  }
  // 0 = success || 2 = no error but no buildings were created
  finally {
    if (lafb > 0){ 
      return buildings.int2strtoint(0);
    }
    else {
      return buildings.int2strtoint(2);
    }
  }
}

buildings.getTieredUpgradeOrder = function(){
  function isNumber(n) {return !isNaN(parseFloat(n)) && isFinite(n);}
  var res = 0;
  for(var i = 0; i < Game.ObjectsN; i++){
    var me = Game.ObjectsById[i];
    for(var ii in me.tieredUpgrades){
      if(isNumber(ii)) res = Math.max(me.tieredUpgrades[ii].order, res);
    }
  }
  return res + 0.01;
}
  buildings.getGrandmaUpgradeOrder = function(){
    var res = 0;
    for(var i in Game.GrandmaSynergies){
      res = Math.max(Game.Upgrades[Game.GrandmaSynergies[i]].order, res);
    }
    return res + 0.01;
  }

  buildings.getSynergyUpgradeOrder = function(){
    var res = 0;
    for(var i = 0; i < Game.ObjectsN; i++){
      var me = Game.ObjectsById[i];
      for(var ii in me.synergies){
        res = Math.max(me.synergies[ii].order, res);
      }
    }
    return res + 0.01;
  }

  buildings.getAchievementOrder = function(){
    var res = 0;
    for(var i = 0; i < Game.ObjectsN-1; i++){
      var me = Game.ObjectsById[i];
      for(var ii in me.tieredAchievs){
        res = Math.max(me.tieredAchievs[ii].order, res);
      }
      for(var ii in me.productionAchievs){
        res = Math.max(me.productionAchievs[ii].achiev.order, res);
      }
      if(me.levelAchiev10) res = Math.max(me.levelAchiev10.order, res);
    }
    return res + 0.01;
  }

  buildings.int2strtoint = function(str) {
    return parseInt(parseInt(str).toString())
  }

  buildings.isLoaded = true;

  ModLanguage('*',{

    "%1 black hole inverter": [
      "%1 black hole inverter",
      "%1 black hole inverters"
    ],
    "[Black hole inverter quote]Inverts the flow of gravity to get the infinitely delicious cookies from an infinitely dense singularity.": "Inverts the flow of gravity to get the infinitely delicious cookies from an infinitely dense singularity.",
    "[Black hole inverter business name]Hypnodrone": "Hypnodrone",
    '[Black hole inverter business quote]Autonomous aerial brand ambassadors to "encourage" more sales!': 'Autonomous aerial brand ambassadors to "encourage" more sales!',

  });
}

building.start = function(){
  if(CCSE.ConfirmGameVersion(buildings.name, buildings.version, buildings.GameVersion)) buildings.init();
  if(!buildings.isLoaded){
  if(CCSE && CCSE.isLoaded){
    buildings.launch();
  }
  else{
    if(!CCSE) var CCSE = {};
    if(!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
    CCSE.postLoadHooks.push(buildings.launch);
  }
}
}

// example
// b = buildings.makeBuildingFromJSON({json_url:"https://example.com/buildings.json"});
// or
// json = {use template}
// b = buildings.makeBuildingFromJSON({json:json});
//
// code 0: success
// code 1: error, check logs  
// code 2: no buildings were created
//
// use buildings.int2strtoint(str);
