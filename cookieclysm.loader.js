Game.registerMod('cookieclysm',{
	init:function(){
		LoadFiles=function(){
			//bad structure, dont do this
			let dir='https://yeetdragon24.github.io/cookieclysm/';
			LoadScript(dir+'cookieclysm.js');
			//LoadScript(dir+'youMinigame.js');
			//LoadScript(dir+'sniperGold.js');
			LoadScript(dir+'transcensions.js');
			LoadScript(dir+'wizardPortal.js');
		}
		SwitchSave=function(){
			Game.WriteSave();
			Game.SaveTo='cclysmGame';
		}
		WipeCookieclysm=function(){
			delete localStorage['cclysmGame'];
		}
		var cclysm=this;
		if (!localStorage['cclysmGame']) {
			Game.Prompt('<id CheckCclysm><h3>Cookieclysm</h3><div class="block">Some features of Cookieclysm require the game to be saved in a different location. The save that is normally used will not be updated while Cookieclysm is loaded, and Cookieclysm will load the seperate save.<div class="line"></div>The new save location will use current save data, so you will start Cookieclysm where you left off in the current save.<div class="line"></div>Clicking "Got it" will save the game, and move over to the new save location.</div>',[['Got it','SwitchSave();LoadFiles();Game.ClosePrompt();'],['No','delete Game.mods[\'cookieclysm\'];Game.ClosePrompt();']]);
		} else LoadFiles();
		
	},
	save:function(){
		if (typeof upAndAchiev=='undefined') return '';
		var str='';
		for (let i of upAndAchiev) {
			if (i.type=='upgrade') str+=''+parseInt(i.unlocked)+parseInt(i.bought);
			else str+=''+parseInt(i.won);
		}
		str+=';';
		var me=Game.Objects['Converter'];
		str+=me.amount+','+me.bought+','+parseFloat(Math.floor(me.totalCookies))+','+parseInt(me.level);
		if (Game.isMinigameReady(me)) str+=','+me.minigame.save(); else str+=','+(me.minigameSave||'');
		str+=','+(me.muted?'1':'0');
		str+=','+me.highest;
		//str+=';';
		return str;
	},
	load:function(str,real){
		return false;
		if (!real) return false;
		str=str.split(';');
		var upAndCheevo=str[0];
		for (let i in upAndCheevo) {
			if (upAndCheevo.length==2) {
				upAndAchiev[i].unlocked=parseInt(upAndCheevo[i].charAt(0));
				upAndAchiev[i].bought=parseInt(upAndCheevo[i].charAt(1));
			} else {
				upAndAchiev[i].won=parseInt(upAndCheevo[i]);
			}
		}
	}
});
