unlockCloneWorld=function() {
	if (!Game.ascensionModes[2]&&Game.Has('Alternate reality')) {
		Game.ascensionModes[2] = {
			name:'Clone world',
			dname:'Clone world',
			desc:'This is a strange copy of a world, where many of your Heavenly Upgrades will not work.'+
			'<div class="line"></div>'+
			'You will be able to earn <b>'+moneName+'</b> in this world.'+
			(Game.Has(moneName+' buff')?'<div class="line"></div>The '+moneName+' that you earn here will be affected by your <b>'+moneName+' multiplier.</b>':''),
			icon:[10,21]
		}
	}
}

function getFuncDef(func){if(func==Game.Logic)console.log(Game.Logic.toString());return func.toString().slice(func.toString().indexOf('{')+1,-1)}

Game.attachTooltip(l('heralds'),function(){
	var str='';
	
	if (!App && !Game.externalDataLoaded) str+=loc("Heralds couldn't be loaded. There may be an issue with our servers, or you are playing the game locally.");
	else
	{
		if (!App && Game.heralds==0) str+=loc("There are no heralds at the moment. Please consider <b style=\"color:#bc3aff;\">donating to our Patreon</b>!");
		else
		{
			str+='<b style="color:#bc3aff;text-shadow:0px 1px 0px #6d0096;">'+loc("%1 herald",Game.heralds)+'</b> '+loc("selflessly inspiring a boost in production for everyone, resulting in %1.",'<br><b style="color:#cdaa89;text-shadow:0px 1px 0px #7c4532,0px 0px 6px #7c4532;"><div style="width:16px;height:16px;display:inline-block;vertical-align:middle;background:url(img/money.png);"></div>'+loc("+%1% cookies per second",Game.heralds)+'</b>');
			str+='<div class="line"></div>';
			if (Game.ascensionMode==1) str+=loc("You are in a <b>Born again</b> run, and are not currently benefiting from heralds.");
			else if (Game.ascensionMode==2) str+='You are in a <b>Clone world</b>, and are not currently benefitting from heralds.';
			else if (Game.Has('Heralds')) str+=loc("You own the <b>Heralds</b> upgrade, and therefore benefit from the production boost.");
			else str+=loc("To benefit from the herald bonus, you need a special upgrade you do not yet own. You will permanently unlock it later in the game.");
		}
	}
	str+='<div class="line"></div><span style="font-size:90%;opacity:0.6;">'+(!App?loc("<b>Heralds</b> are people who have donated to our highest Patreon tier, and are limited to 100.<br>Each herald gives everyone +1% CpS.<br>Heralds benefit everyone playing the game, regardless of whether you donated."):loc("Every %1 current players on Steam generates <b>1 herald</b>, up to %2 heralds.<br>Each herald gives everyone +1% CpS.",[100,100]))+'</span><div class="line"></div>'+tinyIcon([21,29]);
	
	str+='<div style="width:31px;height:39px;background:url(img/heraldFlag.png);position:absolute;top:0px;left:8px;"></div><div style="width:31px;height:39px;background:url(img/heraldFlag.png);position:absolute;top:0px;right:8px;"></div>';
	
	return '<div style="padding:8px;width:300px;text-align:center;" class="prompt" id="tooltipHeralds"><h3>'+loc("Heralds")+'</h3><div class="block">'+str+'</div></div>';
},'this');
Game.LoadSave=new Function('data','ignoreVersionIssues',getFuncDef(Game.LoadSave).replaceAll('Game.ascensionMode!=1','Game.ascensionMode<1'));
Game.Reset=new Function('hard',getFuncDef(Game.Reset).replaceAll('Game.ascensionMode!=1','Game.ascensionMode<1'));
Game.loadLumps=new Function('time',getFuncDef(Game.loadLumps).replaceAll('Game.ascensionMode!=1','Game.ascensionMode<1'));
Game.canLumps=new Function(getFuncDef(Game.canLumps).replaceAll('Game.ascensionMode!=1','Game.ascensionMode<1'));
Game.doLumps=new Function(getFuncDef(Game.doLumps).replaceAll('Game.ascensionMode!=1','Game.ascensionMode<1'));
Game.CalculateGains=new Function(getFuncDef(Game.CalculateGains).replaceAll('Game.ascensionMode!=1','Game.ascensionMode<1'));
Game.Has=new Function('what',getFuncDef(Game.Has).replace('Game.ascensionMode==1','Game.ascensionMode>=1'));
Game.Logic=new Function(getFuncDef(Game.Logic).replace(`(Game.Has('Legacy') && Game.ascensionMode!=1)`,`(Game.Has('Legacy') && Game.ascensionMode<1)`));
Game.Logic=new Function(getFuncDef(Game.Logic).replace(`loc("Your prestige level is currently <b>%1</b>.<br>(CpS +%2%)",[Beautify(Game.prestige),Beautify(Game.prestige)]);`,
`(Game.ascensionMode<2?'Your prestige level is currently <b>'+Game.prestige+'</b>.<br>(CpS +'+Game.prestige+'%)':'You currently have '+mone+' '+moneName+'.');`));
Game.Logic=new Function(getFuncDef(Game.Logic).replace(`loc("Ascending now would grant you no prestige.");`,`loc("Ascending now would grant you no "+(Game.ascensionMode<2?'prestige':moneName)+".");`));
Game.Logic=new Function(getFuncDef(Game.Logic).replace(`loc("Ascending now would grant you<br><b>1 prestige level</b> (+1% CpS)<br>and <b>1 heavenly chip</b> to spend.")`,
`loc("Ascending now would grant you<br><b>1 "+(Game.ascensionMode<2?'prestige levels':moneName)+"</b>"+(Game.ascensionMode<2?' (+1% CpS)<br>and <b>1 heavenly chip</b> to spend':'')+".")`));
Game.Logic=new Function(getFuncDef(Game.Logic).replace(`var chipsOwned=Game.HowMuchPrestige(Game.cookiesReset);`,`var chipsOwned=(Game.ascensionMode<2?Game.HowMuchPrestige(Game.cookiesReset):0);`));
Game.UpdateAscendIntro=new Function(getFuncDef(Game.UpdateAscendIntro).replace(`Game.EarnHeavenlyChips(Game.cookiesEarned);`,
`if (Game.ascensionMode<2)Game.EarnHeavenlyChips(Game.cookiesEarned);else mone+=Game.HowMuchPrestige(Game.cookiesEarned)*moneMult`));