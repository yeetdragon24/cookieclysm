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
NewBuilding = function(name, commonName, desc, icon, iconColumn, art, price, cps, buyFunction, foolObject, buildingSpecial){
		var me = new Game.Object(name, commonName, desc, icon, iconColumn, art, price, cps, buyFunction);
		
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
{pic:'https://raw.githubusercontent.com/yeetdragon24/cookieclysm/main/img/converterIcon.png',bg:'img/factoryBackground.png',xV:8,yV:8,w:64,rows:2,x:0,y:16},"this is two years old",
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
var converter=Game.Objects['Converter'];
upAndAchiev.push(Game.GrandmaSynergy('Massive grandmas','A large grandma to be converted into more cookies.','Converter'));Game.last.order=256;
converter.desc='Converts living matter into cookies.'; //right now mod is only english so this avoids loc issues
converter.grandma=Game.Upgrades['Massive grandmas'];
converter.l.childNodes[0].style.background=`url('https://raw.githubusercontent.com/yeetdragon24/cookieclysm/main/img/converterIcon.png')`;
converter.l.childNodes[1].style.background=`url('https://raw.githubusercontent.com/yeetdragon24/cookieclysm/main/img/converterIcon.png')`;