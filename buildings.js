if(typeof CCSE === undefined) Game.LoadMod('https://klattmose.github.io/CookieClicker/CCSE.js');
if (buildings === undefined) var buildings = {};

buildings.isLoaded = 0;

var lafb = 0; // loops amount for building
var lafu = 0; // loops amount for upgrades
var lafa = 0; // loops amount for achievement
var k; // json.[lafb]
var up; // k.upgrades
var u; // u[lafu]
var ach; // k.achievements
var a; // a[lafa]
var last; 
var o = 0; 
var order = buildings.getTieredUpgradeOrder();
var iconsURL;

buildings.MakeBuildingFromJSON = function(json){

  while (buildings.isLoaded==0 && CCSE.isLoaded==0){}
  try {
    while (json[lafb] != undefined){ // loop for more than 1 building

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

      CCSE.NewBuilding(k.name, k.commonName, k.desc, k.icon, k.iconColumn, k.art, k.price, buildings.CpsFunction(me), buildings.BuyFunction(), k.foolObject, k.buildingSpecial)

      Game.Objects[k.name].displayName= '<span style="font-size:'+k.fontSize+'%;position: relative;bottom:4px;">'+k.name+'</span>';

      up = k.upgrades;
    
      while (up[lafu] != undefined){
        u = up[lafu];
        Game.TieredUpgrade(u.name,u.desc,k.name, lafu+1)
        last = Game.last;
        last.icon[2] = iconsURL;
        last.order = order + o / 100;
        o++;
        lafu++;
      } 
    
      up = k.special.upgrades;
      
      u = up.grandma; 
      order = buildings.getGrandmaUpgradeOrder();
      last = Game.GrandmaSynergy(u.name, u.desc, k.name);   
      last.order = order;

      u = up.synergy1;
      order = buildings.getSynergyUpgradeOrder();
      last = Game.SynergyUpgrade(u.name, u.desc, k.name, u.building, 'synergy1'); 
      last.icon[2] = iconsURL;
      last.order = order;
      
      u = up.synergy2;
      last = Game.SynergyUpgrade(u.name, u.desc, k.name, u.building, 'synergy2'); 
      last.icon[2] = iconsURL; 
      last.order = order + 0.01;

      order = buildings.getAchievementOrder(); 
      o = 0;
      ach = k.achievements;
    
      while (ach[lafa] != undefined){
        a = ach[lafa];
        last = Game.TieredAchievement(a.name, a.desc, k.name, lafa+1); 
        last.icon[2] = iconsURL;
        last.order = order + o / 100;
        o++;
      }

      a = k.special.achievements;

      last = Game.ProductionAchievement(a.up0, k.name, 1); 
      last.icon[2] = iconsURL; 
      last.order = order + o / 100; 
      o++;
      last = Game.ProductionAchievement(a.up1, k.name, 2);
      last.icon[2] = iconsURL; 
      last.order = order + o / 100; 
      o++;
      last = Game.ProductionAchievement(a.up2, k.name, 3); 
      last.icon[2] = iconsURL; 
      last.order = order + o / 100; 
      o++;
    
      last = CCSE.NewAchievement(a.name, a.desc, [1, 26, iconsURL]); 
      Game.Objects[k.name].levelAchiev10 = last; 
      last.order = order + o / 100;
      o++;
    
      lafb++;
      lafa = 0;
      lafu = 0;
    }
  }
  catch (e) {return e}
  finally {return 0;}
}

buildings.getTieredUpgradeOrder = function(){
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

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

buildings.isLoaded = 1;
