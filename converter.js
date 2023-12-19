if(Converter === undefined) var Converter = {};
if(typeof GameLoader == 'undefined') Game.LoadMod('https://raw.githubusercontent.com/yeetdragon24/cookieclysm/main/GameLoader.js');
Converter.name = 'Converter';
Converter.version = '1.14';
Converter.GameVersion = '2.052';

Converter.launch = function(){
	Converter.init = function(){
		
		GameLoader.NewBuilding('Converter',
			'converter|converters|converted|[X]% stuff|[X]% stuff',
			'stuff.',
			1,
			2,
			{
				base:'building.png', //img
				xV:8,
				yV:32,
				w:128,
				rows:1,
				x:0,
				y:0,
				customBuildingPic:'building.png',
				customIconsPic:iconsURL
			},
			"doesn't matter what you put here",
			function(me){
				var mult = 1;
				mult *= Game.GetTieredCpsMult(me);
				mult *= Game.magicCpS(me.name);
				return me.baseCps * mult;
			},
			function(){
				Game.UnlockTiered(this);
				if(this.amount >= Game.SpecialGrandmaUnlock && Game.Objects['Grandma'].amount > 0) Game.Unlock(this.grandma.name);
			},
			{
				name:'Hypnodrone',
				desc:'Autonomous aerial brand ambassadors to "encourage" more sales!',
				icon:1
			},
			['Kugelblitz', 'Spaghettification']
		);
		
		Game.Objects['Converter'].displayName='<span style="font-size:80%;position:relative;bottom:4px;">Converter</span>'; // Shrink the name since it's so large
		
		
// Upgrades
var last; var i = 0; var order = Converter.getTieredUpgradeOrder();
Game.TieredUpgrade('Converter', '<q>Converter</q>', 'Converter', 1);
last = Game.last;
last.icon[2] = iconsURL;
last.order = order + i / 100;
i++;

Game.TieredUpgrade('Converter', '<q>Converter</q>', 'Converter', 2);
last = Game.last;
last.icon[2] = iconsURL;
last.order = order + i / 100;
i++;

Game.TieredUpgrade('Converter', '<q>Converter</q>', 'Converter', 3);
last = Game.last;
last.icon[2] = iconsURL;
last.order = order + i / 100;
i++;

Game.TieredUpgrade('Converter', '<q>Converter</q>', 'Converter', 4);
last = Game.last;
last.icon[2] = iconsURL;
last.order = order + i / 100;
i++;

Game.TieredUpgrade('Converter', '<q>Converter</q>', 'Converter', 5);
last = Game.last;
last.icon[2] = iconsURL;
last.order = order + i / 100;
i++;

Game.TieredUpgrade('Converter', '<q>Converter</q>', 'Converter', 6);
last = Game.last;
last.icon[2] = iconsURL;
last.order = order + i / 100;
i++;

Game.TieredUpgrade('Converter', '<q>Converter</q>', 'Converter', 7);
last = Game.last;
last.icon[2] = iconsURL;
last.order = order + i / 100;
i++;

Game.TieredUpgrade('Converter', '<q>Converter</q>', 'Converter', 8);
last = Game.last;
last.icon[2] = iconsURL;
last.order = order + i / 100;
i++;

Game.TieredUpgrade('Converter', '<q>Converter</q>', 'Converter', 9);
last = Game.last;
last.icon[2] = iconsURL;
last.order = order + i / 100;
i++;

Game.TieredUpgrade('Converter', '<q>Converter</q>', 'Converter', 10);
last = Game.last;
last.icon[2] = iconsURL;
last.order = order + i / 100;
i++;

Game.TieredUpgrade('Converter', '<q>Converter</q>', 'Converter', 11);
last = Game.last;
last.icon[2] = iconsURL;
last.order = order + i / 100;
i++;

Game.TieredUpgrade('Converter', '<q>Converter</q>', 'Converter', 12);
last = Game.last;
last.icon[2] = iconsURL;
last.order = order + i / 100;
i++;

Game.TieredUpgrade('Converter', '<q>Converter</q>', 'Converter', 13);
last = Game.last;
last.icon[2] = iconsURL;
last.order = order + i / 100;
i++;

Game.TieredUpgrade('Converter', '<q>Converter</q>', 'Converter', 14);
last = Game.last;
last.icon[2] = iconsURL;
last.order = order + i / 100;
i++;

		
		order = Converter.getGrandmaUpgradeOrder();
		last = Game.GrandmaSynergy('Heavy grandmas', 'A dense grandma to convert more cookies.', 'Converter'); last.order = order;
		
		order = Converter.getSynergyUpgradeOrder();
		last = Game.SynergyUpgrade('Daring pilots', "<q>You've never heard of the Millennium Falcon? It's the ship that made the Kessel Run in less than twelve parsecs.</q>", 'Converter', 'Shipment', 'synergy1'); last.icon[2] = iconsURL; last.order = order;
		last = Game.SynergyUpgrade('General relativity', '<q>Space is time. Time is space</q>', 'Converter', 'Time machine', 'synergy2'); last.icon[2] = iconsURL; last.order = order + 0.01;
		
		
		// Achievements
		order = Converter.getAchievementOrder(); i = 0;
		last = Game.TieredAchievement('Single singularity', '', 'Converter', 1); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Penrose diagram', '', 'Converter', 2); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Schwarzschild', '', 'Converter', 3); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Holes in holes', '', 'Converter', 4); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('No-hair theorem', '', 'Converter', 5); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Photon sphere', '', 'Converter', 6); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Information paradox', '', 'Converter', 7); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Gravitaional lensing', '', 'Converter', 8); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Galactic nuclei', '', 'Converter', 9); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Sagittarius A*', '', 'Converter', 10); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Hey now, you\'re a dead star', '', 'Converter', 11); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Incredibly dense', '', 'Converter', 12); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Infinitely dense', '', 'Converter', 13); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.TieredAchievement('Quasi-stellar radio source', '', 'Converter', 14); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		
		last = Game.ProductionAchievement('Relativistic jets', 'Converter', 1); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.ProductionAchievement('Primordial black holes', 'Converter', 2); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		last = Game.ProductionAchievement('Naked singularity', 'Converter', 3); last.icon[2] = iconsURL; last.order = order + i / 100; i++;
		
		last = GameLoader.NewAchievement('M87', 'Reach level <b>10</b> Converters.', [1, 26, iconsURL]);
			Game.Objects['Converter'].levelAchiev10 = last; last.order = order + i / 100; i++;
		
		
		
		Game.customStatsMenu.push(function(){
			GameLoader.AppendStatsVersionNumber(Converter.name, Converter.version);
		});
		
		// Finish up
		Converter.isLoaded = 1;
		if(Converter.postloadHooks){
			for(var i = 0; i < Converter.postloadHooks.length; ++i) Converter.postloadHooks[i]();
		}
		
		if (Game.prefs.popups) Game.Popup(Converter.name + ' loaded!');
		else Game.Notify(Converter.name + ' loaded!', '', '', 1, 1);
	}
	
	
	Converter.getTieredUpgradeOrder = function(){
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
	
	Converter.getGrandmaUpgradeOrder = function(){
		var res = 0;
		for(var i in Game.GrandmaSynergies){
			res = Math.max(Game.Upgrades[Game.GrandmaSynergies[i]].order, res);
		}
		
		return res + 0.01;
	}
	
	Converter.getSynergyUpgradeOrder = function(){
		var res = 0;
		for(var i = 0; i < Game.ObjectsN; i++){
			var me = Game.ObjectsById[i];
			for(var ii in me.synergies){
				res = Math.max(me.synergies[ii].order, res);
			}
		}
		
		return res + 0.01;
	}
	
	Converter.getAchievementOrder = function(){
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
	
	
	ModLanguage('*',{
		
		"%1 Converter": [
			"%1 Converter",
			"%1 Converters"
		],
		"[Converter quote]Inverts the flow of gravity to get the infinitely delicious cookies from an infinitely dense singularity.": "Inverts the flow of gravity to get the infinitely delicious cookies from an infinitely dense singularity.",
		"[Converter business name]Hypnodrone": "Hypnodrone",
		'[Converter business quote]Autonomous aerial brand ambassadors to "encourage" more sales!': 'Autonomous aerial brand ambassadors to "encourage" more sales!',
		
	});
	
	if(GameLoader.ConfirmGameVersion(Converter.name, Converter.version, Converter.GameVersion)) Converter.init();
}


if(!Converter.isLoaded){
	if(GameLoader && GameLoader.isLoaded){
		Converter.launch();
	}
	else{
		if(!GameLoader) var GameLoader = {};
		if(!GameLoader.postLoadHooks) GameLoader.postLoadHooks = [];
		GameLoader.postLoadHooks.push(Converter.launch);
	}
}
