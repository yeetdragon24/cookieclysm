if(typeof CCSE == 'undefined') Game.LoadMod('https://klattmose.github.io/CookieClicker/CCSE.js');


var lafb = 0; // loops amount for building
var lafu = 0; // loops amount for upgrades
var lafa = 0; // loops amount for achievments
var k; // json.[lafb]
var up; // k.upgrades
var u; // u[lafu]
var CpsFunction; // possibilty for unique cps function
var BuyFunction; // possibilty for unique buy function

function MakeBuildingFromJSON(json){

  while (json[lafb] != "undefined"){ // loop for more than 1 building

    k = json[lafb]; // current building

    // default function
    if (k.CpsFunction === "default") CpsFunction() = function(me) {var mult=1; mult*=Game.GetTieredCpsMult(me); mult*=Game.magicCpS(me.name); return me.baseCps*mult;};
    // custom function
    else {CpsFunction() = new Function("me",body);}

    // default function
    if (k.buyFunction === "default") BuyFunction() = function() {Game.UnlockTiered(this);if (this.amount >= Game.SpecialGrandmaUnlock && Game.Objects['Grandma'].amount>0) Game.Unlock(this.grandma.name);}
    // custom function
    else (BuyFunction() = new Function(body));


    CCSE.NewBuilding(k.name, k.commonName, k.desc, k.icon, k.iconColumn, k.art, k.price, CpsFunction(me), BuyFunction(), k.foolObject, k.buildingSpecial)

    Game.Objects[k.name].displayName='<span style="font-size:100%;position:relative;bottom:4px;">'+k.name+'</span>';

    up = k.upgrades;

    while (up[lafu] != "undefined"){
      u = up[lafu];
      if (lafu >= 15){
         if (Game.Tiers.hasOwnProperty(lafu)){
           Game.TieredUpgrade(u.name,u.desc,k.name,u.tier)
         } 
      }
      else {
        Game.TieredUpgrade(u.name,u.desc,k.name,u.tier)
      }
      lafu++;
    } 
    while ()
  lafb++;
  }
  return "Success";
}
