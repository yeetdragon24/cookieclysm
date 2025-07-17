if(Game.Objects['Antimatter condenser'].minigame) throw new Error("Iron dungeon prevented from loading by already present Antimatter condenser minigame.");

var M = {};
M.parent = Game.Objects['Antimatter condenser'];
M.parent.minigame = M;

//You minigame
M.launch = function() {
	  
  M.init = function(div) {
    
    M.stats = {
      cps: 0,
      click: 0,
      milk: 0,
      buildings: new Array(20),
      wrinklerSpawn: 0,
      //shiny: 0, (shiny wrinkler)
      //prestige: 0,
      //mone: 0,
    };
    
    M.upgrades = {};
    for (let i in M.stats) M.upgrades[i] = [];
    
    M.effs = {};
    for (let i in M.stats) M.effs = 1;
    
    M.frontendNames = {
      cps: 'CpS',
      click: 'click power',
      milk: 'milk multiplier',
      buildings: new Array(20),
      wrinklerSpawn: 'wrinkler spawn rate',
      //shiny: 'shiny wrinkler rate',
      //prestige: 'prestige multiplier',
      //mone: C.moneName + ' multipler'
    };
    for (let i in M.frontendNames.buildings) M.frontendNames.buildings[i] = `${Game.ObjectsById[i].name} CpS`;
    
    M.icons = {
      cps: 10,
      click: 11,
      milk: 19,
      buildings: [0, 1, 2, 3, 4, 16, 17, 18, 5, 6, 7, 8, 13, 14, 20, 21, 33, 34, 35, 36],
      wrinklerSpawn: [20, 8]
      //shiny: idk,
      //prestige: idk,
      ///mone: idk
    }
    
    M.newUpgrade = function(obj) {
      let name = M.getUpgradeName(obj.type, obj.tier);
      let desc = M.getUpgradeDesc(obj.type);
      let price = (5 ** tier) * Game.cookiesPs * 60;
      let icon = [M.icons[type], obj.tier];
      if (type == 'wrinklerSpawn') [M.icons[2]] = C.icons;
      let upgrade = new Game.Upgrade(name, desc, price, icon);
      upgrade.pool = 'iron';
      upgrade.type = obj.type;
      upgrade.buyFunction = function() {
        M.stats[this.type]++;
      }
      return upgrade;
    }
    
    M.getUpgradeName = (type, tier) => M.frontendNames[type].charAt(0).toUpperCase() + M.frontendNames[type].slice(1) + (tier || romanize(M.stats[type] + 1));
    
    M.getUpgradeDesc = type => `Gain <b>+5% (multiplicative)</b> ${M.frontendNames[type].charAt(0).toUpperCase() + M.frontendNames[type].slice(1)}.`;
    
    M.calcEffs = function() {
      for (let i in M.stats) {
        M.effs[i] = 1.05 ** M.stats[i];
      }
    }
    
    //populate div or something
    
    let str = '';
    
    str += `<style>
    
    </style>`;
  }
  
  

		
	//External
	Game.getIronMult = function(type) {
	  return M.effs[type];
	}
		
	M.save = function() { return ''; } //don't save to vanilla save file
	M.load = function(str) {  } //nothing in vanilla save file so nothing to load from it
	
	M.reset=function(hard)
	{
		if (hard) {
		  for (let i in M.stats) M.stats[i] = 0;
		  for (let i in M.upgrades) M.upgrades[i] = [];
		}
		M.calcMults();
	}
	M.logic=function()
	{
		
	}
		
	M.draw=function()
	{
	  
	}

	

	M.init(l('rowSpecial' + M.parent.id));
}


M.launcher = function(){
	var M = Game.Objects['Antimatter condenser'].minigame;
	
	M.parent.minigameUrl = 'https://yeetdragon24.github.io/';
	M.parent.minigameName = 'Iron dungeon';
	M.parent.minigameLoaded = 1;
	M.parent.switchMinigame(!M.parent.onMinigame);
	
	M.name = M.parent.minigameName;
	M.savePrefix = 'minigameIron';
	M.launch();
	
	Game.LoadMinigames();
}

M.launcher();


M = 0;