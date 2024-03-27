/* doesnt work because no
new Game.Object('Converter','converter|converters|converted|[X] extra chamber|[X] extra chambers','Converts living mass into cookies.',21,12,{pic:'you.png',bg:'youBackground.png',xV:8,yV:8,w:64,rows:2,x:0,y:16},500,function(me){
			var mult=1;
			mult*=Game.GetTieredCpsMult(me);
			mult*=Game.magicCpS(me.name);
			return me.baseCps*mult;
		},function(){
			Game.UnlockTiered(this);
			if (this.amount>=Game.SpecialGrandmaUnlock && Game.Objects['Grandma'].amount>0) Game.Unlock(this.grandma.name);
		});
*/
//ripped straight from ccse because i dont want to use ccse

var NewBuilding = function(name, commonName, desc, icon, iconColumn, art, price, cps, buyFunction, foolObject, buildingSpecial){
		var me = new Game.Object(name, commonName, desc, icon, iconColumn, art, price, cps, buyFunction);
		console.log(me.canvas)
		// This is the name, description, and icon used during Business Season
		if(foolObject) Game.foolObjects[name] = foolObject;
		// The name of this building's golden cookie buff and debuff
		if(buildingSpecial) Game.goldenCookieBuildingBuffs[name] = buildingSpecial;
		
		//CCSE.ReplaceBuilding(name);
		
		if(art.customBuildingPic){
			Game.customBuildStore.push(function(){
				l('productIcon' + me.id).style.backgroundImage = 'url(' + art.customBuildingPic + ')';
				l('productIconOff' + me.id).style.backgroundImage = 'url(' + art.customBuildingPic + ')';
			});
		}
		if(art.customIconsPic){
			Game.customBuildings[name].tooltip.push(function(obj, ret){
				if(me.locked) return ret;
				else return ret.replace('background-position', 'background-image:url(' + obj.art.customIconsPic + ');background-position');
			});
		}
		
		
		
		/*if(CCSE.config.Buildings[name]){
			var saved = CCSE.config.Buildings[name];
			me.amount = saved.amount;
			me.bought = saved.bought;
			me.totalCookies = saved.totalCookies;
			me.level = saved.level;
			me.muted = saved.muted;
			me.highest = saved.highest ? saved.highest : 0; // Left this out earlier, can't expect it to be there
			me.free = saved.free ? saved.free : 0; // Left this out earlier, can't expect it to be there
			me.minigameSave = saved.minigameSave;
			
			Game.BuildingsOwned += me.amount;
			
		}else{*/
			var saved = {};
			saved.amount = 0;
			saved.bought = 0;
			saved.totalCookies = 0;
			saved.level = 0;
			saved.muted = 0;
			saved.free = 0;
			saved.highest = 0;
			saved.minigameSave = '';
			/*
			CCSE.config.Buildings[name] = saved;
		}*/
		
		
		Game.BuildStore();
		
		
		me.canvas=l('rowCanvas'+me.id);
		me.ctx=me.canvas.getContext('2d',{alpha:false});
		me.pics=[];
		var icon=[0*64,me.icon*64];
		var muteStr = '<div class="tinyProductIcon" id="mutedProduct'+me.id+'" style="display:none;' + (me.art.customBuildingPic ? 'background-image:url(' + me.art.customBuildingPic + ');' : '') + 'background-position:-'+icon[0]+'px -'+icon[1]+'px;" '+Game.clickStr+'="Game.ObjectsById['+me.id+'].mute(0);PlaySound(Game.ObjectsById['+me.id+'].muted?\'snd/clickOff.mp3\':\'snd/clickOn.mp3\');" '+Game.getDynamicTooltip('Game.mutedBuildingTooltip('+me.id+')','this')+'></div>';
		
		AddEvent(me.canvas,'mouseover',function(me){return function(){me.mouseOn=true;}}(me));
		AddEvent(me.canvas,'mouseout',function(me){return function(){me.mouseOn=false;}}(me));
		AddEvent(me.canvas,'mousemove',function(me){return function(e){var box=this.getBoundingClientRect();me.mousePos[0]=e.pageX-box.left;me.mousePos[1]=e.pageY-box.top;}}(me));
		
		l('buildingsMute').innerHTML+=muteStr;
		
		
		
		Game.recalculateGains = 1;
		return me;
	}
NewBuilding('Converter','converter|converters|converted|[X] extra chamber|[X] extra chambers','Converts living mass into cookies.',21,12,
{pic:'https://raw.githubusercontent.com/yeetdragon24/cookieclysm/main/img/building.png',bg:'img/factoryBackground.png',xV:8,yV:8,w:64,rows:1,x:0,y:16},"this is two years old",
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
			['Kugelblitz', 'Spaghettification']);
//reconnected buildings to their canvases (for some reason adding a new one does that)
for (let i in Game.Objects) {
    if (i!='Cursor') {
		Game.Objects[i].canvas=l('rowCanvas'+Game.Objects[i].id);
		Game.Objects[i].ctx=l('rowCanvas'+Game.Objects[i].id).getContext('2d');
	}
}
var converter=Game.Objects['Converter'];
Game.GrandmaSynergy('Massive grandmas','A large grandma to be converted into more cookies.','Converter');Game.last.order=256;
Game.TieredUpgrade('Alien volunteers','<q>They don\'t know what they are volunteering for.</q>','Converter',1);
Game.TieredUpgrade('Salty electrons','<q>Electrons are now required to be converted as well instead of retaining their structure, and as a result are salty.</q>','Converter',2);
Game.TieredUpgrade('Box hypothesis','<q>(can’t think of one, make new)</q> <span style="right:0;position:absolute;">-Stream Sniper</span>','Converter',3);
Game.TieredUpgrade('Small dough converters','<q>Some... "experiments" have left you with live cookie dough, and you see this as an opportunity.</q>','Converter',4);
Game.TieredUpgrade('Oven explosion','<q>And that\'s how it all ended, for the operator too.</q>','Converter',5);
Game.TieredUpgrade('Cyclotron','<q>These can make particles spin, and make them collide too. Now how can you use this to make more cookies?</q>','Converter',6);
Game.TieredUpgrade('Macrocosmics','<q>According to the theory of nanocosmics, our universe is just a subatomic particle in another universe, maybe even a subatomic particle in a living organism.</q>','Converter',7);
//Game.TieredUpgrade('The Beat','<q>If the matter and antimatter both fall out of The Pulse at any time, you somehow get cookies.</q>','Converter',8);
Game.TieredUpgrade('Probably dust motes','<q>A very large nonessential particle.</q>','Converter',8);
Game.TieredUpgrade('Quantum knotting','<q>Re-entangle quantum particles so more gets converted with less.</q>','Converter',9);
Game.TieredUpgrade('Ig Nobel Prize','<q>Why reward only your actions and make people skeptical, when you can reward all mundane events that happen?</q>this is a real thing I promise','Converter',10);
Game.TieredUpgrade('sqrt(-1)','<q>When there\'s nothing left to convert, convert imaginary things</q>','Converter',11);
Game.TieredUpgrade('Hunger','<q>You\'ve discovered hunger in a tangible form. Put it in your cookies. People who eat them will get hungrier, and need to eat more cookies.</q>','Converter',12);
Game.TieredUpgrade('Cookie fusion','<q>Atoms can now push other atoms to force them to merge, and this somehow creates cookies.</q>','Converter',13);
Game.TieredUpgrade('Consumer enlargement','<q>Not only do they have to eat more, they also can be converted into more.</q>','Converter',14);
Game.TieredUpgrade('Unsweetened quarks','<q>Filler for your cookies. It doesn\'t taste like anything, but they won\'t notice.</q>','Converter',15);

Game.TieredAchievement('','','Converter',1);
Game.TieredAchievement('','','Converter',2);
Game.TieredAchievement('','','Converter',3);
Game.TieredAchievement('','','Converter',4);
Game.TieredAchievement('','','Converter',5);
Game.TieredAchievement('','','Converter',6);
Game.TieredAchievement('','','Converter',7);
Game.TieredAchievement('','','Converter',8);
Game.TieredAchievement('','','Converter',9);
Game.TieredAchievement('','','Converter',10);
Game.TieredAchievement('','','Converter',11);
Game.TieredAchievement('','','Converter',12);
Game.TieredAchievement('','','Converter',13);
Game.TieredAchievement('','','Converter',14);
Game.TieredAchievement('','','Converter',15);
LocalizeUpgradesAndAchievs();
converter.desc='Converts living matter into cookies.'; //right now mod is only english so this avoids loc issues
converter.grandma=Game.Upgrades['Massive grandmas'];
converter.l.childNodes[0].style.background=`url('https://raw.githubusercontent.com/yeetdragon24/cookieclysm/main/img/converterIcon.png')`;
converter.l.childNodes[1].style.background=`url('https://raw.githubusercontent.com/yeetdragon24/cookieclysm/main/img/converterIcon.png')`;
