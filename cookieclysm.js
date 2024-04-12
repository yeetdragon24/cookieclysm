//Initiating the mod i guess
hasGodL=Game.hasGod;
getPlantDescL=Game.Objects['Farm'].minigame?Game.Objects['Farm'].minigame.getPlantDesc:(()=>{});
capniL=0;
//some roman numeral function i found on stack overflow https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
function romanize (num) { if (isNaN(num)) return NaN; var digits = String(+num).split(""), key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM", "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC", "","I","II","III","IV","V","VI","VII","VIII","IX"], roman = "", i = 3; while (i--) roman = (key[+digits.pop() + (i * 10)] || "") + roman; return Array(+digits.join("") + 1).join("M") + roman; }
var tUSA=884;
var transcendMeterPercent=0;
//Handling all the mod stuff (base cookieclysm.js
function shadowSave(type){Game.toSave=false; Game.lastDate=parseInt(Game.time); var str=''; if (type==3) str+='\nGame version\n'; str+=Game.version+'|'; str+='|'; if (type==3) str+='\n\nRun details'; str+= (type==3?'\n	run start date : ':'')+parseInt(Game.startDate)+';'+ (type==3?'\n	legacy start date : ':'')+parseInt(Game.fullDate)+';'+ (type==3?'\n	date when we last opened the game : ':'')+parseInt(Game.lastDate)+';'+ (type==3?'\n	bakery name : ':'')+(Game.bakeryName)+';'+ (type==3?'\n	seed : ':'')+(Game.seed)+';'+ (type==3?'\n	appearance : ':'')+(Game.YouCustomizer.save())+ '|'; if (type==3) str+='\n\nPacked preferences bitfield\n	'; var str2= (Game.prefs.particles?'1':'0')+ (Game.prefs.numbers?'1':'0')+ (Game.prefs.autosave?'1':'0')+ (Game.prefs.autoupdate?'1':'0')+ (Game.prefs.milk?'1':'0')+ (Game.prefs.fancy?'1':'0')+ (Game.prefs.warn?'1':'0')+ (Game.prefs.cursors?'1':'0')+ (Game.prefs.focus?'1':'0')+ (Game.prefs.format?'1':'0')+ (Game.prefs.notifs?'1':'0')+ (Game.prefs.wobbly?'1':'0')+ (Game.prefs.monospace?'1':'0')+ (Game.prefs.filters?'1':'0')+ (Game.prefs.cookiesound?'1':'0')+ (Game.prefs.crates?'1':'0')+ (Game.prefs.showBackupWarning?'1':'0')+ (Game.prefs.extraButtons?'1':'0')+ (Game.prefs.askLumps?'1':'0')+ (Game.prefs.customGrandmas?'1':'0')+ (Game.prefs.timeout?'1':'0')+ (Game.prefs.cloudSave?'1':'0')+ (Game.prefs.bgMusic?'1':'0')+ (Game.prefs.notScary?'1':'0')+ (Game.prefs.fullscreen?'1':'0')+ (Game.prefs.screenreader?'1':'0')+ (Game.prefs.discordPresence?'1':'0')+ ''; str2=pack3(str2); str+=str2+'|'; if (type==3) str+='\n\nMisc game data'; str+= (type==3?'\n	cookies : ':'')+parseFloat(Game.cookies).toString()+';'+ (type==3?'\n	total cookies earned : ':'')+parseFloat(Game.cookiesEarned).toString()+';'+ (type==3?'\n	cookie clicks : ':'')+parseInt(Math.floor(Game.cookieClicks))+';'+ (type==3?'\n	golden cookie clicks : ':'')+parseInt(Math.floor(Game.goldenClicks))+';'+ (type==3?'\n	cookies made by clicking : ':'')+parseFloat(Game.handmadeCookies).toString()+';'+ (type==3?'\n	golden cookies missed : ':'')+parseInt(Math.floor(Game.missedGoldenClicks))+';'+ (type==3?'\n	background type : ':'')+parseInt(Math.floor(Game.bgType))+';'+ (type==3?'\n	milk type : ':'')+parseInt(Math.floor(Game.milkType))+';'+ (type==3?'\n	cookies from past runs : ':'')+parseFloat(Game.cookiesReset).toString()+';'+ (type==3?'\n	elder wrath : ':'')+parseInt(Math.floor(Game.elderWrath))+';'+ (type==3?'\n	pledges : ':'')+parseInt(Math.floor(Game.pledges))+';'+ (type==3?'\n	pledge time left : ':'')+parseInt(Math.floor(Game.pledgeT))+';'+ (type==3?'\n	currently researching : ':'')+parseInt(Math.floor(Game.nextResearch))+';'+ (type==3?'\n	research time left : ':'')+parseInt(Math.floor(Game.researchT))+';'+ (type==3?'\n	ascensions : ':'')+parseInt(Math.floor(Game.resets))+';'+ (type==3?'\n	golden cookie clicks (this run) : ':'')+parseInt(Math.floor(Game.goldenClicksLocal))+';'+ (type==3?'\n	cookies sucked by wrinklers : ':'')+parseFloat(Game.cookiesSucked).toString()+';'+ (type==3?'\n	wrinkles popped : ':'')+parseInt(Math.floor(Game.wrinklersPopped))+';'+ (type==3?'\n	santa level : ':'')+parseInt(Math.floor(Game.santaLevel))+';'+ (type==3?'\n	reindeer clicked : ':'')+parseInt(Math.floor(Game.reindeerClicked))+';'+ (type==3?'\n	season time left : ':'')+parseInt(Math.floor(Game.seasonT))+';'+ (type==3?'\n	season switcher uses : ':'')+parseInt(Math.floor(Game.seasonUses))+';'+ (type==3?'\n	current season : ':'')+(Game.season?Game.season:'')+';'; var wrinklers=Game.SaveWrinklers(); str+= (type==3?'\n	amount of cookies contained in wrinklers : ':'')+parseFloat(Math.floor(wrinklers.amount))+';'+ (type==3?'\n	number of wrinklers : ':'')+parseInt(Math.floor(wrinklers.number))+';'+ (type==3?'\n	prestige level : ':'')+parseFloat(Game.prestige).toString()+';'+ (type==3?'\n	heavenly chips : ':'')+parseFloat(Game.heavenlyChips).toString()+';'+ (type==3?'\n	heavenly chips spent : ':'')+parseFloat(Game.heavenlyChipsSpent).toString()+';'+ (type==3?'\n	heavenly cookies : ':'')+parseFloat(Game.heavenlyCookies).toString()+';'+ (type==3?'\n	ascension mode : ':'')+parseInt(Math.floor(Game.ascensionMode))+';'+ (type==3?'\n	permanent upgrades : ':'')+parseInt(Math.floor(Game.permanentUpgrades[0]))+';'+parseInt(Math.floor(Game.permanentUpgrades[1]))+';'+parseInt(Math.floor(Game.permanentUpgrades[2]))+';'+parseInt(Math.floor(Game.permanentUpgrades[3]))+';'+parseInt(Math.floor(Game.permanentUpgrades[4]))+';'+ (type==3?'\n	dragon level : ':'')+parseInt(Math.floor(Game.dragonLevel))+';'+ (type==3?'\n	dragon aura : ':'')+parseInt(Math.floor(Game.dragonAura))+';'+ (type==3?'\n	dragon aura 2 : ':'')+parseInt(Math.floor(Game.dragonAura2))+';'+ (type==3?'\n	chime type : ':'')+parseInt(Math.floor(Game.chimeType))+';'+ (type==3?'\n	volume : ':'')+parseInt(Math.floor(Game.volume))+';'+ (type==3?'\n	number of shiny wrinklers : ':'')+parseInt(Math.floor(wrinklers.shinies))+';'+ (type==3?'\n	amount of cookies contained in shiny wrinklers : ':'')+parseFloat(Math.floor(wrinklers.amountShinies))+';'+ (type==3?'\n	current amount of sugar lumps : ':'')+parseFloat(Math.floor(Game.lumps))+';'+ (type==3?'\n	total amount of sugar lumps made : ':'')+parseFloat(Math.floor(Game.lumpsTotal))+';'+ (type==3?'\n	time when current sugar lump started : ':'')+parseFloat(Math.floor(Game.lumpT))+';'+ (type==3?'\n	time when last refilled a minigame with a sugar lump : ':'')+parseFloat(Math.floor(Game.lumpRefill))+';'+ (type==3?'\n	sugar lump type : ':'')+parseInt(Math.floor(Game.lumpCurrentType))+';'+ (type==3?'\n	vault : ':'')+Game.vault.join(',')+';'+ (type==3?'\n	heralds : ':'')+parseInt(Game.heralds)+';'+ (type==3?'\n	golden cookie fortune : ':'')+parseInt(Game.fortuneGC)+';'+ (type==3?'\n	CpS fortune : ':'')+parseInt(Game.fortuneCPS)+';'+ (type==3?'\n	highest raw CpS : ':'')+parseFloat(Game.cookiesPsRawHighest)+';'+ (type==3?'\n	music volume : ':'')+parseInt(Math.floor(Game.volumeMusic))+';'+ (type==3?'\n	cookies sent : ':'')+parseInt(Math.floor(Game.cookiesSent))+';'+ (type==3?'\n	cookies received : ':'')+parseInt(Math.floor(Game.cookiesReceived))+';'+ '|'; if (type==3) str+='\n\nBuildings : amount, bought, cookies produced, level, minigame data'; for (var i in Game.Objects) { var me=Game.Objects[i]; if (type==3) str+='\n	'+me.name+' : '; if (me.vanilla) { str+=me.amount+','+me.bought+','+parseFloat(Math.floor(me.totalCookies))+','+parseInt(me.level); if (Game.isMinigameReady(me)) str+=','+me.minigame.save(); else str+=','+(me.minigameSave||''); str+=','+(me.muted?'1':'0'); str+=','+me.highest; str+=';'; } } str+='|'; if (type==3) str+='\n\nPacked upgrades bitfield (unlocked and bought)\n	'; var toCompress=[]; for (var i in Game.UpgradesById) { var me=Game.UpgradesById[i]; if (me.vanilla) toCompress.push(Math.min(me.unlocked,1),Math.min(me.bought,1)); }; toCompress=pack3(toCompress.join('')); str+=toCompress; str+='|'; if (type==3) str+='\n\nPacked achievements bitfield (won)\n	'; var toCompress=[]; for (var i in Game.AchievementsById) { var me=Game.AchievementsById[i]; if (me.vanilla) toCompress.push(Math.min(me.won)); } toCompress=pack3(toCompress.join('')); str+=toCompress; str+='|'; if (type==3) str+='\n\nBuffs : type, maxTime, time, arg1, arg2, arg3'; for (var i in Game.buffs) { var me=Game.buffs[i]; if (me.type) { if (type==3) str+='\n	'+me.type.name+' : '; if (me.type.vanilla) { str+=me.type.id+','+me.maxTime+','+me.time; if (typeof me.arg1!=='undefined') str+=','+parseFloat(me.arg1); if (typeof me.arg2!=='undefined') str+=','+parseFloat(me.arg2); if (typeof me.arg3!=='undefined') str+=','+parseFloat(me.arg3); str+=';'; } } } if (type==3) str+='\n\nCustom :\n'; str+='|'; str+=Game.saveModData(); Game.lastSaveData=str; if (type==2 || type==3) { return str; } else if (type==1) { str=escape(utf8_to_b64(str)+'!END!'); return str; } else { if (Game.useLocalStorage) { str=utf8_to_b64(str)+'!END!'; if (str.length<10) { } else { str=escape(str); localStorageSet(Game.SaveTo,str); if (App) App.save(str); if (!localStorageGet(Game.SaveTo)) { } else if (document.hasFocus()) { } } } else { var now=new Date(); now.setFullYear(now.getFullYear()+5); str=utf8_to_b64(str)+'!END!'; Game.saveData=escape(str); str=Game.SaveTo+'='+escape(str)+'; expires='+now.toUTCString()+';'; document.cookie=str; if (App) App.save(str); if (document.cookie.indexOf(Game.SaveTo)<0) { } else if (document.hasFocus()) { } } }}
var cookieTracker, cpsTracker, shimmerTracker, lumpTracker;
Game.registerHook('logic',function(){
	if(cookieTracker>Game.cookies || cpsTracker!=Game.cookiesPs || lumpTracker!=Game.lumps){
		shadowSave();
	}
	cookieCount=Game.cookies;
	cpsTracker=Game.cookiesPs;
	lumpTracker=Game.lumps;
	
	if (Game.hasBuff('Spirits sniped')) {
		Game.hasGod=function(){};
	} else {
		Game.hasGod=hasGodL;
	}
	
	if (Game.hasBuff('Famine')){
		//Game.Popup('Do not use the garden. You have been warned.',screen.width/2,window.innerHeight/2);
		/*for (var i=19;i--;i<0){
			if (Game.objectsById[2].amount>(0+(i==19))) {
				while (Game.objectsById[2].amount>0) Game.objectsById[i].sacrifice(1);
			}
		}*/
		/*
		for (var i in Game.Objects) {
			setTimeout(function(){Game.Objects[i].sacrifice(1)},1000);
		} */
		/*
		for (i in Game.Objects) {
			console.log(i);
			//console.log(i);
			//console.log(Game.Objects[i]);
			for (var j;j<Game.Objects[i].amount;j++){
				console.log(j);
			}
		}*/
		
		if ((Game.T%(Game.fps/40)==0)) { //tf does this do the game runs at 30 fps
			if (Game.ObjectsById[capniL].amount!=0){
				if (capniL!=19){
					Game.ObjectsById[capniL].sacrifice(1);
				} else {
					Game.killBuff('Famine');
					Game.Objects['Farm'].minigame.getPlantDesc=getPlantDescL;
					capniL=0;
				}
			}
			else {
				if (capniL<19) {
					capniL++;
				} else {
					capniL=0;
					Game.killBuff('Famine');
				}
			}
		}
	}
	//checkSpace();
	
	if (Game.OnAscend==2&&Game.transcendReady) { //it said &&Game.Game.transcendReady which was the reason code wasnt working smh
		let transcendMeterl=l('ascendInfoCopy').childNodes[0].childNodes[2].childNodes[2].childNodes[0];
		transcendMeterPercentT=Math.log10(Game.prestige+1)-Math.floor(Math.log10(Game.prestige+1));
		//if (Game.T%10==0) console.log(transcendMeterPercent+' '+transcendMeterPercentT);
		transcendMeterl.style.backgroundPosition=(-Game.T*0.5-transcendMeterPercent*100)+'px';
		transcendMeterl.style.width=(transcendMeterPercent*100)+'%';
		transcendMeterPercent+=(transcendMeterPercentT-transcendMeterPercent)*0.1;
		//what i get for using .cloneNode()
		transcendMeterl.style.backgroundPosition=(-Game.T*0.5-transcendMeterPercent*100)+'px';
		transcendMeterl.style.width=(transcendMeterPercent*100)+'%';
		l('ascendInfoCopy').childNodes[1].childNodes[2].childNodes[0].innerHTML=Math.floor(dmone);
		l('ascendInfoCopy').childNodes[0].childNodes[2].childNodes[0].innerHTML=transcendPower;
	}
	if (Game.OnAscend==1&&Game.transcendReady) {
		let transcendMeterl=l('ascendInfo').childNodes[0].childNodes[2].childNodes[2].childNodes[0];
		l('mone').innerHTML=mone;//find a beter way to do this then checking every frame
		l('transcendPower').innerHTML=transcendPower;//this too
		transcendPower=Math.floor(Math.log10(Game.prestige+1));//also this
		ascendInfoCopy.childNodes[1].childNodes[2].childNodes[0].innerHTML=Math.floor(dmone);
		ascendInfoCopy.childNodes[0].childNodes[2].childNodes[0].innerHTML=transcendPower;
		transcendMeterl.style.backgroundPosition=(-Game.T*0.5-transcendMeterPercent*100)+'px';
		transcendMeterl.style.width=(transcendMeterPercent*100)+'%';
	}
	dmone+=(mone-dmone)*0.3;
	if (Math.abs(1-(mone/dmone))<0.01) dmone=mone;
});

//converter (function from CCSE)
var NewBuilding = function(name, commonName, desc, icon, iconColumn, art, price, cps, buyFunction, foolObject, buildingSpecial){var me = new Game.Object(name, commonName, desc, icon, iconColumn, art, price, cps, buyFunction);if(foolObject) Game.foolObjects[name] = foolObject;if(buildingSpecial) Game.goldenCookieBuildingBuffs[name] = buildingSpecial;if(art.customBuildingPic){Game.customBuildStore.push(function(){l('productIcon' + me.id).style.backgroundImage = 'url(' + art.customBuildingPic + ')';l('productIconOff' + me.id).style.backgroundImage = 'url(' + art.customBuildingPic + ')';});}if(art.customIconsPic){Game.customBuildings[name].tooltip.push(function(obj, ret){if(me.locked) return ret;else return ret.replace('background-position', 'background-image:url(' + obj.art.customIconsPic + ');background-position');});}Game.BuildStore();me.canvas=l('rowCanvas'+me.id);me.ctx=me.canvas.getContext('2d',{alpha:false});me.pics=[];var icon=[0*64,me.icon*64];var muteStr = '<div class="tinyProductIcon" id="mutedProduct'+me.id+'" style="display:none;' + (me.art.customBuildingPic ? 'background-image:url(' + me.art.customBuildingPic + ');' : '') + 'background-position:-'+icon[0]+'px -'+icon[1]+'px;" '+Game.clickStr+'="Game.ObjectsById['+me.id+'].mute(0);PlaySound(Game.ObjectsById['+me.id+'].muted?\'snd/clickOff.mp3\':\'snd/clickOn.mp3\');" '+Game.getDynamicTooltip('Game.mutedBuildingTooltip('+me.id+')','this')+'></div>';AddEvent(me.canvas,'mouseover',function(me){return function(){me.mouseOn=true;}}(me));AddEvent(me.canvas,'mouseout',function(me){return function(){me.mouseOn=false;}}(me));AddEvent(me.canvas,'mousemove',function(me){return function(e){var box=this.getBoundingClientRect();me.mousePos[0]=e.pageX-box.left;me.mousePos[1]=e.pageY-box.top;}}(me));l('buildingsMute').innerHTML+=muteStr;Game.recalculateGains = 1;return me;}
NewBuilding(
	'Converter','converter|converters|converted|[X] extra chamber|[X] extra chambers',
	'Converts living mass into cookies.',21,0,
	{pic:'https://raw.githubusercontent.com/yeetdragon24/cookieclysm/main/img/building.png',
	bg:'img/factoryBackground.png',xV:8,yV:8,w:64,rows:1,x:0,y:16},"this is two years old",
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
	},['Kugelblitz', 'Spaghettification']
);

for (let i in Game.Objects) {
    if (i!='Cursor') {
		Game.Objects[i].canvas=l('rowCanvas'+Game.Objects[i].id);
		Game.Objects[i].ctx=l('rowCanvas'+Game.Objects[i].id).getContext('2d');
	}
	if (Game.Objects[i].minigame) {
		let save=Game.Objects[i].minigame.save();
		Game.Objects[i].minigame.init(l('rowSpecial'+Game.Objects[i].id));
		Game.Objects[i].minigame.load(save);
	}
}
var converter=Game.Objects['Converter'];
converter.desc='Converts living matter into cookies.'; //right now mod is only english so this avoids loc issues
converter.grandma=Game.Upgrades['Massive grandmas'];
//store icon, only replaces once, needs fixing
converter.l.childNodes[0].style.background=`url('https://raw.githubusercontent.com/yeetdragon24/cookieclysm/main/img/converterIcon.png')`;
converter.l.childNodes[1].style.background=`url('https://raw.githubusercontent.com/yeetdragon24/cookieclysm/main/img/converterIcon.png')`;
converter.unshackleUpgrade='Unshackled converters'; //doesnt exist but fixes Game.Has calling undefined for the tooltip

new Game.Achievement('Put it back','Move a God from the God Complex into a slot from the Pantheon.',[11,8]); //Game.last.pool='shadow';
new Game.Achievement('Cutting it close','Use the Garden while CaptainCrozier is slotted.',[31,1]);
new Game.Achievement('NOOO MY CPS','Activate the famine.<q>You were warned about this.</q>',[30,2]); Game.last.pool='shadow'; Game.last.order=1000000


//Local function so it has to be redefined
var getCookiePrice=function(level){return 999999999999999999999999999999999999999*Math.pow(10,(level-1)/2);};//idk if its even needed since idk how it works

//modified version of Extra Content Mod (ECM) (https://glander.club/asjs/fPgjj9n0/) [i probably shouldnt get involved in this but whatever: say no to ecm]
upAndAchiev = []
//upgrades.push(new Game.Upgrade('SHADOW Dragon claw','NOPE',999,[31,14])); Test
order=70000;
upAndAchiev.push(new Game.Achievement('Put it back','Move a God from the God Complex into a slot from the Pantheon.',[11,8]));
upAndAchiev.push(new Game.Achievement('Cutting it close','Use the Garden while CaptainCrozier is slotted.',[31,1]));
upAndAchiev.push(new Game.Achievement('NOOO MY CPS','Activate the famine.<q>You were warned about this.</q>',[30,2]));

order=10070;
upAndAchiev.push(Game.NewUpgradeCookie({name:'Hard Pasta',desc:'You should probably cook these. Or should you bake them?',icon:[28,32],require:'Box of not cookies',power:5,price:Math.pow(10,45)}));

upAndAchiev.push(new Game.Upgrade('Alternate reality','Unlocks the <b>Clone world</b> mode.<q>Not related to the Cookie Clicker update of the same name.</q>',(15*Math.pow(10,15))-1,[10,21]));Game.last.pool='prestige';Game.last.posX=500;Game.last.posY=500;Game.PrestigeUpgrades.push(Game.last);Game.last.buyFunction=()=>unlockCloneWorld;
upAndAchiev.push(new Game.Upgrade('Cookieclysm','Cause mass destruction.<br>Also gain <b>+50% CpS</b>.<q>Related to the Cookie Clicker mod of the same name.</q>',24,[21,6]));Game.last.priceFunc=()=>{return Game.Objects['You'].amount*Math.pow(10,45)};
Game.RequiresConfirmation(Game.last,'<div class="block">'+loc("<b>Warning:</b> purchasing this will have unexpected, and potentially undesirable results!<br><br><br>Purchase anyway?")+'</div>');

locStrings['%1 converter']=['%1 converter','%1 converters'];
order=1800;
upAndAchiev.push(Game.GrandmaSynergy('Massive grandmas','A large grandma to be converted into more cookies.','Converter'));
upAndAchiev.push(Game.TieredUpgrade('Alien volunteers','<q>They don\'t know what they are volunteering for.</q>','Converter',1));var converterStart=Game.last.id;
upAndAchiev.push(Game.TieredUpgrade('Salty electrons','<q>Electrons are now required to be converted as well instead of retaining their structure, and as a result are salty.</q>','Converter',2));
upAndAchiev.push(Game.TieredUpgrade('Box hypothesis','<q>(can’t think of one, make new)</q> <span style="right:0;position:absolute;">-Stream Sniper</span>','Converter',3));
upAndAchiev.push(Game.TieredUpgrade('Small dough converters','<q>Some... "experiments" have left you with live cookie dough, and you see this as an opportunity.</q>','Converter',4));Game.last.icon[1]=4-1;
upAndAchiev.push(Game.TieredUpgrade('Oven explosion','<q>And that\'s how it all ended, for the operator too.</q>','Converter',5));Game.last.icon[1]=5-1;
upAndAchiev.push(Game.TieredUpgrade('Cyclotron','<q>These can make particles spin, and make them collide too. Now how can you use this to make more cookies?</q>','Converter',6));Game.last.icon[1]=6-1;
upAndAchiev.push(Game.TieredUpgrade('Megacosmics','<q>According to the theory of nanocosmics, our universe is just a subatomic particle in another universe, maybe even a subatomic particle in a living organism.</q>','Converter',7));Game.last.icon[1]=7-1;
//Game.TieredUpgrade('The Beat','<q>If the matter and antimatter both fall out of The Pulse at any time, you somehow get cookies.</q>','Converter',8);
upAndAchiev.push(Game.TieredUpgrade('Probably dust motes','<q>A very large nonessential particle.</q>','Converter',8));Game.last.icon[1]=8-1;
upAndAchiev.push(Game.TieredUpgrade('Quantum knotting','<q>Re-entangle quantum particles so more gets converted with less.</q>','Converter',9));Game.last.icon[1]=9-1;
upAndAchiev.push(Game.TieredUpgrade('Ig Nobel Prize','<q>Why reward only your actions and make people skeptical, when you can reward all mundane events that happen?</q>','Converter',10));Game.last.icon[1]=10-1;
upAndAchiev.push(Game.TieredUpgrade('sqrt(-1)','<q>When there\'s nothing left to convert, convert imaginary things</q>','Converter',11));Game.last.icon[1]-=10;
upAndAchiev.push(Game.TieredUpgrade('Hunger','<q>You\'ve discovered hunger in a tangible form. Put it in your cookies. People who eat them will get hungrier, and need to eat more cookies.</q>','Converter',12));Game.last.icon[1]-=10;
upAndAchiev.push(Game.TieredUpgrade('Cookie fusion','<q>Atoms can now push other atoms to force them to merge, and this somehow creates cookies.</q>','Converter',13));Game.last.icon[1]-=10;
upAndAchiev.push(Game.TieredUpgrade('Consumer enlargement','<q>Not only do they have to eat more, they also can be converted into more.</q>','Converter',14));Game.last.icon[1]-=10;
upAndAchiev.push(Game.TieredUpgrade('Unsweetened quarks','<q>Filler for your cookies. It doesn\'t taste like anything, but they won\'t notice.</q>','Converter',15));var converterEnd=Game.last.id;Game.last.icon[1]-=10;

order=2700;
upAndAchiev.push(Game.TieredAchievement('Probatter','','Converter',1));converterAStart=Game.last.id;
upAndAchiev.push(Game.TieredAchievement('Normal atoms','','Converter',2));
upAndAchiev.push(Game.TieredAchievement('Matter doesn\'t','','Converter',3));
upAndAchiev.push(Game.TieredAchievement('Organic master','','Converter',4));Game.last.icon[1]=4-1;
upAndAchiev.push(Game.TieredAchievement('Run the simulation','','Converter',5));Game.last.icon[1]=5-1;
upAndAchiev.push(Game.TieredAchievement('Macroorganisms','','Converter',6));Game.last.icon[1]=6-1;
upAndAchiev.push(Game.TieredAchievement('Scientists cookiefied across the plane','','Converter',7));Game.last.icon[1]=7-1;
upAndAchiev.push(Game.TieredAchievement('Cookies matter','','Converter',8));Game.last.icon[1]=8-1;
upAndAchiev.push(Game.TieredAchievement('Expanding edible expidentures','','Converter',9));Game.last.icon[1]=9-1;
upAndAchiev.push(Game.TieredAchievement('A matter of cookies','','Converter',10));Game.last.icon[1]=10-1;
upAndAchiev.push(Game.TieredAchievement('Use a little fuel','','Converter',11));Game.last.icon[1]-=10;
upAndAchiev.push(Game.TieredAchievement('Socially accepted delicacy','','Converter',12));Game.last.icon[1]-=10;
upAndAchiev.push(Game.TieredAchievement('Atomic chair','','Converter',13));Game.last.icon[1]-=10;
upAndAchiev.push(Game.TieredAchievement('What\'s the cookie with you','','Converter',14));Game.last.icon[1]-=10;
upAndAchiev.push(Game.TieredAchievement('Always within grasp','','Converter',15));Game.last.icon[1]-=10;
upAndAchiev.push(Game.ProductionAchievement('Small is never enough','Converter',1));Game.last.icon[1]=1-1;
upAndAchiev.push(Game.ProductionAchievement('Limitedly large','Converter',2));Game.last.icon[1]=1-1;
upAndAchiev.push(Game.ProductionAchievement('Hexadecimal','Converter',3));Game.last.icon[1]=1-1;
upAndAchiev.push(new Game.Achievement('Chubby hadrons','',[13,26]));converter.levelAchiev10=Game.last;Game.last.icon[1]=1;
converterAEnd=Game.last.id;

order=21000;
upAndAchiev.push(new Game.Upgrade('Shed','<b>Doubles</b> your building space.<q>You can\'t live here, but this will be able to shelter quite a few mice.</q>',500,[0,0]));
upAndAchiev.push(new Game.Upgrade('House','Multiplies your max space by <b>10</b>.<q>A nice house for grandmas to bake cookies in.</q>',500000,[0,1]));
upAndAchiev.push(new Game.Upgrade('Field','Multiplies your max space by <b>10</b>.<q>Now you can farm and dig all you want.</q>',500000000,[0,2]));
upAndAchiev.push(new Game.Upgrade('Warehouse','Multiplies your max space by <b>10</b>.<q>A large empty building, ready to be filled with your cookie-creating machines.</q>',500000000000,[0,3]));
upAndAchiev.push(new Game.Upgrade('Planet','Multiplies your max space by <b>10</b>.<q>It\'s about time you got yourself a place large enough to privately run your business.</q>',500*Math.pow(10,12),[0,4]));
upAndAchiev.push(new Game.Upgrade('Distant objects','Multiplies your max space by <b>10</b>.<q>If very distant objects are moving away from us faster than the speed of light, why not use them to go past the observable universe so you can store more things?</q>',500*Math.pow(10,15),[0,5]));
upAndAchiev.push(new Game.Upgrade('Quantum optimazation','Multiplies your max space by <b>10</b>.<q>Almost all of an atom is empty. Instead of wasting this space, you squeeze down the subatomic particles until cookies are substantially smaller.</q>',500*Math.pow(10,18),[0,6]));
upAndAchiev.push(new Game.Upgrade('More hard drives','Multiplies your max space by <b>10</b>.<q>This is a video game, so maybe you can give more space to your buildings by increasing your digital storage space.</q>',500*Math.pow(10,21),[0,7]));

//upAndAchiev.push(new Game.Upgrade('Switchblade and bleach','Makes you look different enough to hide from the cops in a church, somehow giving you <b>+10%</b> cookie production.<q>Oh Ponyboy, your hair... your tuff, tuff, hair...</q>',420,[2,2]));
//upAndAchiev.push(new Game.Upgrade('Cookieclysm','Gain <b>+100%</b> cookie production.<q>The beginninng.</q>',1,[2,2]));
//upAndAchiev.push(new Game.Upgrade('King of the Afterlife',loc('Prestige is <b>%1</b> more effective.<q>Why worship God when you can buy him for 823,543 heavenly chips?</q>','saudh'),1,[15,12]));

//upAndAchiev.push(new Game.Upgrade('Twitter account','Opens up Orteil\'s twitter (X).<q>Too many controversies... we need a cookieversy.</q>',41,[17,4]));Game.last.parents=['Cookieclysm'];
//Game.last.buyFunction=function(){window.open('https://twitter.com/orteil42')}

upAndAchiev.push(new Game.Upgrade('more','Gain <b>%%%</b> CpS, permanently.<q>cookies<br>cookies<br>i need more<br>I NEED MORE</q>',1,[29,6]));//i did not know that zalgo used zero-width characters but ig you learn something new every day
tUSA=Game.last.id;
upAndAchiev.push(new Game.Upgrade('Unshackle slot #1','Choosing an Unshackle upgrade to put it this slot allows you to unshackle the building.',9,[10,35]));Game.last.notTiered=1;Game.last.parents=[Game.Upgrades['more']];
upAndAchiev.push(new Game.Upgrade('Unshackle slot #2','Choosing an Unshackle upgrade to put it this slot allows you to unshackle the building.',81,[10,35]));Game.last.notTiered=1;Game.last.parents=[Game.Upgrades['Unshackle slot #1']];
upAndAchiev.push(new Game.Upgrade('Unshackle slot #3','Choosing an Unshackle upgrade to put it this slot allows you to unshackle the building.',6561,[10,35]));Game.last.notTiered=1;Game.last.parents=[Game.Upgrades['Unshackle slot #2']];
var slots=['Unshackle slot #1','Unshackle slot #2','Unshackle slot #3'];

for (var i=0;i<slots.length;i++) {
	Game.Upgrades[slots[i]].descFunc=function(i){return function(context){
		if (unshackleSlots[i]==-1) return this.desc+(context=='stats'?'':'<br><b>'+loc("Click to activate.")+'</b>');
		var upgrade=Game.UpgradesById[unshackleSlots[i]];
		return '<div style="text-align:center;">'+'Current:'+' '+tinyIcon(upgrade.icon)+' <b>'+upgrade.dname+'</b><div class="line"></div></div>'+this.ddesc+(context=='stats'?'':'<br><b>'+'Click to activate.'+'</b>');
	};}(i);
	Game.Upgrades[slots[i]].transcendBuy=function() {
		for (let i of this.parents) if (!i.bought) return false;
		var price=this.getPrice();
		if (mone>=price&&!Game.Has(this.name)){
			mone-=price;
			moneSpent+=price;
			//this.unlocked=1;
			this.bought=1;
			buildTranscendTree();
			//if (this.buyFunction) this.buyFunction();
			PlaySound('snd/buy'+choose([1,2,3,4])+'.mp3',0.75);
			PlaySound('snd/shimmerClick.mp3');
			//PlaySound('snd/buyHeavenly.mp3');

			success=1;
		}
		if (this.bought) this.buyFunction();
	}
	Game.Upgrades[slots[i]].buyFunction=function() {
		var slot=slots.indexOf(this.name);
		PlaySound('snd/tick.mp3');
		Game.tooltip.hide();
		var list=[];
		for (var i in Game.Objects)
		{
			var me=Game.Upgrades[Game.Objects[i].unshackleUpgrade];
			if (me&&me.bought)
			{
				var fail=0;
				for (var ii in unshackleSlots) {if (unshackleSlots[ii]==me.id) fail=1;}//check if not already in another permaslot
				if (!fail) list.push(me);
			}
		}
		var sortMap=function(a,b) {
			if (a.order>b.order) return 1;
			else if (a.order<b.order) return -1;
			else return 0;
		}
		list.sort(sortMap);
		var upgrades='';
			for (var i in list)
			{
				var me=list[i];
				upgrades+=Game.crate(me,'','PlaySound(\'snd/tick.mp3\');Game.PutUpgradeInPermanentSlot('+me.id+','+slot+');','upgradeForPermanent'+me.id);
			}
			var upgrade=unshackleSlots[slot];
			Game.SelectingPermanentUpgrade=upgrade;
			Game.Prompt('<id PickUnshackleUpgrade><h3>'+loc("Pick a building to unshackle")+'</h3>'+
			'<div class="line"></div><div style="margin:4px auto;clear:both;width:120px;"><div class="crate upgrade enabled" style="background-position:'+(-slot*48)+'px '+(-10*48)+'px;"></div><div id="upgradeToSlotNone" class="crate upgrade enabled" style="background-position:'+(-0*48)+'px '+(-7*48)+'px;display:'+(upgrade!=-1?'none':'block')+';"></div><div id="upgradeToSlotWrap" style="float:left;display:'+(upgrade==-1?'none':'block')+';">'+(Game.crate(Game.UpgradesById[upgrade==-1?0:upgrade],'','','upgradeToSlot'))+'</div></div>'+
			'<div class="block crateBox" style="overflow-y:scroll;float:left;clear:left;width:317px;padding:0px;height:250px;">'+upgrades+'</div>'+
			'<div class="block" style="float:right;width:152px;clear:right;height:234px;">'+loc("Here are all the unshackle upgrades you\'ve bought.<div class=\"line\"></div>Pick one to unshackle it!<div class=\"line\"></div>You can reassign this slot anytime you transcend.")+'</div>'
			,[[loc("Confirm"),'unshackleSlots['+slot+']=Game.SelectingPermanentUpgrade;buildTranscendTree();Game.ClosePrompt();'],loc("Cancel")],0,'widePrompt');
	}
}


var transcendentUpgrades=[];
for(let i of upAndAchiev){
	if (!i.order) i.order=100000;
	if (i.name=='NOOO MY CPS') i.pool='shadow';
	if (i.name=='more') tUSA=i.id;
	if (i.id>=tUSA) {
		i.pool='prestige'; //dont question my decisions ok
		if (!i.notTiered) i.getPrice=function(){return Math.floor(Math.pow(this.basePrice*(this.tier+1),1.5*(this.priceScaling?this.priceScaling:1)))};
		transcendentUpgrades.push(i);
	}
	if ((i.id>=converterStart&&i.id<=converterEnd&&i.type=='upgrade')||(i.id>=converterAStart&&i.id<=converterAEnd&&i.type=='achievement')) {
		i.icon[1]+=1;
		i.icon[2]='https://yeetdragon24.github.io/cookieclysm/img/iconsheet-v4.png';
	}
}
LocalizeUpgradesAndAchievs();
var cookieclysmCss=document.createElement('style');
cookieclysmCss.type='text/css';
cookieclysmCss.id='cookieclysmCss';
cookieclysmCss.innerHTML='.devIcon{background-image:url(https://raw.githubusercontent.com/yeetdragon24/cookieclysm/main/img/iconSheet-v3.png);}.transcendent.price:before{background:url(\'https://google.com/favicon.ico\')}#ascendInfoCopy:before{}#ascendInfoCopy:after{}.ascendCopy:before{}.ascendCopy:after{}';
document.head.appendChild(cookieclysmCss);

//cps multiplier

/*
new Game.buffType('cclysmCpsMult',function(time,pow){
	return {
		name:'Cookieclysm CpS multiplier',
		desc:'This is used to handle all CpS mults to make sure the display in the building tooltip is accurate.<div class="line"></div>If you\'re seeing this, something bad probably happened. Please contact us.',
		icon:[0,0,'https://yeetdragon24.github.io/cookieclysm/img/iconsheet-v4.png'],
		time:Math.min(time*Game.fps,Game.fps*Math.pow(10,15)),
		add:true,
		multCpS:pow,
		visible:false
	}
});
Game.gainBuff('cclysmCpsMult',1000000000,1);
cclysmCpSBuff=Game.buffs['Cookieclysm CpS multiplier'];
cclysmCpSBuff.l.style.display='none';*/
cclysmCpsMult=function(){
	var mult=1;
	if (transcendModifier==1) {
		Math.seedrandom(`cookieclysm/glitched/${Game.seed}/${Math.floor(Game.T/(30*60))}`);
		mult*=((Math.random()+1)/2);
	}
	if (transcendModifier==2) {
		mult/=((Game.elderWrath+1)/2);
	}
	
	if (Game.Has('more')) {
		let me=Game.Upgrades['more'];
		mult*=Math.pow(3*(me.tier+1),2);
	}
	
	cclysmCpSBuff.multCpS=mult;
}
Game.registerHook('cps',(cps)=>{
	//this allows us to run code whenever cps is recalculated by the game
	//its probably not good practice to not use this the way its intended in case it changes
	//cclysmCpsMult();
	return cps;
});

new Game.buffType('spirit sniped', function(time,power) {
	return {
		name:'Spirits sniped',
		desc:'Your god Stream Sniper is angry at your worship of the Pantheon spirits! The Pantheon is not providing any effects!',
		icon:[1,0,'https://raw.githubusercontent.com/yeetdragon24/cookieclysm/main/img/iconSheet-v3.png'],
		time:time*Game.fps,
		power:power,
		add:true
	}
});
new Game.buffType('famine', function(time,power) {
	return {
		name:'Famine',
		desc:'Your god Captain Crozier is angry at your usage of the Garden and is punishing you!',
		icon:[2,0,'https://raw.githubusercontent.com/yeetdragon24/cookieclysm/main/img/iconSheet-v3.png'],
		time:time*Game.fps,
		power:power,
		add:true,
		aura:2
	}
});
var space=0;
var maxSpace=50;

var spaceValues={
	'Cursor':1,
	'Grandma':10,
	'Farm':50,
	'Mine':25,
	'Factory':25,
	'Bank':10,
	'Temple':25,
	'Wizard Tower':10,
	'Shipment':25,
	'Alchemy lab':25,
	'Portal':15,
	'Time machine':25,
	'Antimatter condenser':25,
	'Prism':10,
	'Chancemaker':Math.floor(Math.random()*15)+10,
	'Fractal engine':25,
	'Javascript console':5,
	'Idleverse':100,
	'Cortex baker':250,
	'You':10,
};
function getMaxBuildingSpace() {
	var buildingSpace=50;
	if (Game.Has('Shed')) buildingSpace*=2;
	if (Game.Has('House')) buildingSpace*=10;
	if (Game.Has('Vault')) buildingSpace*=100;
	
	return buildingSpace;
}
function getBuildingSpace() {
	var buildingSpace=0;
	
	var cursorSpace=1;
	//if (Game.Has('Thousand fingers')) we'll make it work if cursors need to be nerfed more
	//if (Game.Has('Million fingers')) cursorSpace*=5
	
	for (var i in formatLong) {
		if (formatLong[i].slice(1)!='thousand') {
			if (Game.Has('Million fingers')){
				cursorSpace*=1.5;
			}
			if (Game.Has(formatLong[i].slice(1,2).toUpperCase()+formatLong[i].slice(2)+' fingers')){
				cursorSpace*=2;
			}
		}
	}
	buildingSpace+=Game.Objects['Cursor'].amount*cursorSpace;
	buildingSpace+=Game.Objects['Grandma'].amount*5;
	buildingSpace+=Game.Objects['Farm'].amount*50;
	buildingSpace+=Game.Objects['Mine'].amount*25;
	buildingSpace+=Game.Objects['Factory'].amount*25;
	buildingSpace+=Game.Objects['Bank'].amount*10;
	buildingSpace+=Game.Objects['Temple'].amount*25;
	buildingSpace+=Game.Objects['Wizard tower'].amount*10;
	buildingSpace+=Game.Objects['Shipment'].amount*25;
	buildingSpace+=Game.Objects['Alchemy lab'].amount*25;
	buildingSpace+=Game.Objects['Portal'].amount*15;
	buildingSpace+=Game.Objects['Time machine'].amount*25;
	buildingSpace+=Game.Objects['Antimatter condenser'].amount*25;
	buildingSpace+=Game.Objects['Prism'].amount*10;
	buildingSpace+=Game.Objects['Chancemaker'].amount*spaceValues['Chancemaker'];	
	buildingSpace+=Game.Objects['Fractal engine'].amount*25;	
	buildingSpace+=Game.Objects['Javascript console'].amount*5;	
	buildingSpace+=Game.Objects['Idleverse'].amount*100;
	buildingSpace+=Game.Objects['Cortex baker'].amount*250;
	buildingSpace+=Game.Objects['You'].amount*10;
	return buildingSpace;
}
function checkSpace(){
	if (getBuildingSpace()>getMaxBuildingSpace()) {
		try { var lastClicked=Game.lastClickedEl.childNodes[2].childNodes[1].innerHTML; } catch(err) {if (Game.Objects['Chancemaker']>0) Game.Objects['Chancemaker'].sacrifice(); else if (Game.BuildingsOwned>0) for (let i in Game.Objects) {if (Game.Objects[i].amount>0) Game.Objects[i].sacrifice();} else throw new Error("Building space exceeded limit without last input interacting with building.");Game.loop=function(){}}
		for (i in Game.Objects) {
			if (Game.Objects[i].name==lastClicked){
				for (let i=0;i<3;i++) Game.Objects[i].sacrifice();
			}
		}
	}
}

//screw em over (never mind)
spaceDiv=document.createElement('div');
spaceDiv.id="buildingSpace";
spaceDiv.className="listing";
//Game.ShowMenu('stats')
Game.registerHook('logic',function(){
if (Game.onMenu=='stats'&&Game.T%Game.fps==0){
spaceDiv.innerHTML="<br><b>Building space:</b> "+getBuildingSpace()+"/"+getMaxBuildingSpace()+" ("+Math.floor((getBuildingSpace()/getMaxBuildingSpace())*100)+"%)";
document.getElementById('menu').childNodes[2].appendChild(spaceDiv);
}});
//Game.ShowMenu();

//transcendence
var mone=0;
var moneName='Moné';
var transcendPower=0;
var lastTranscendP=0;
var moneSpent=0;
var dmone=0;
var moneMult=1;
var transcends=0;
var unshackleSlots=[-1,-1,-1];
var transcendModifier=0;
var transcendModifierTypes={
	0:{
		name:'Regular',
		desc:'This doesn\'t show up in game, but is just here to prevent errors because i\'m lazy.',
		icon:[23,0] //empty
	},
	1:{
		name:'Glitched',
		desc:'Things seem a little strange, as you\'ve returned to a reality that\'s not quite built right.',
		icon:[28,12]
	},
	2:{
		name:'Corrupted',
		desc:'A strange force has taken over this reality, and it is angered by your presence.',
		icon:[18,6]
	}
}
transcendModTooltip=function() {
	return 'tooltip but '+Beautify(Game.cookies);
}

GU=Game.UpgradePositions;
Game.registerHook('check',function(){
	let h=window.innerHeight;let w=window.innerWidth;
	GU[tUSA+0]=[h/2,w/2];
	GU[tUSA+1]=[(h/2)+100,w/2];
	GU[tUSA+2]=[(h/2)+100+65,(w/2)+65];
	GU[tUSA+3]=[(h/2)+100+90,(w/2)+150];
});
Game.Upgrade.prototype.transcendBuy=function(){
	if (this.id<tUSA) return false;
	for (let i of this.parents) if (!i.bought) return false;
	var price=this.getPrice();
	if (mone>=price){
		mone-=price;
		moneSpent+=price;
		if (!Game.Has[this.name]) {
			//this.unlocked=1;
			this.bought=1;
			buildTranscendTree();
		}
		this.tier++;
		this.ddesc=this.desc.replace('%%',Beautify(Math.pow(3*(this.tier+1),2)));
		if (this.buyFunction) this.buyFunction();
		PlaySound('snd/buy'+choose([1,2,3,4])+'.mp3',0.75);
		PlaySound('snd/shimmerClick.mp3');
		//PlaySound('snd/buyHeavenly.mp3');
		success=1;
	}
}
function transcend(bypass) {
	if (!bypass) Game.Prompt('<id Transcend><h3>'+loc("Transcend")+'</h3><div class="block">'+loc("Are you ready to leave everything behind and travel to a higher realm?")+'</div>',[[loc("Yes"),'Game.ClosePrompt();transcend(1);'],loc("No")]);
	else {
		l('game').appendChild(transcendTransition);
		transcends++;
		Game.killBuffs();
		setTimeout(function(){
			//Game.ascendUpgradesl.innerHTML='';
			buildTranscendTree();
			Game.removeClass('ascending');
			Game.OnAscend=2;
			l('backgroundCanvas').style.zIndex=90000;
			l('transcend').style.display='block';
			mone+=transcendPower-lastTranscendP;
			lastTranscendP=transcendPower;
			if (transcendPower-lastTranscendP>1) transcendModifier=choose([0,0,0,1,1,2,2]);
			setTimeout(function(){l('transcendTransition').remove()},501)
		},3500);
	}
}
var leaveTranscend=function(bypass) { //i love writing inconsistent code!!!
	if (!bypass) {
	if (Math.seedrandom) Math.seedrandom('prompt '+Game.resets);
		Game.Prompt('<id Descend><h3>Descend</h3><div class="block">Are you ready to return to reality?'+(Math.random()<0.3?'<div class="line"></div><span class="red">Things might be a little different than what you\'re used to.</span>':'')+'</div>',[['Yes','Game.ClosePrompt();leaveTranscend(1);'],'No']);
	} else {
		l('game').appendChild(transcendTransition);
			setTimeout(()=>{
				//copied from Game.Ascend() and edited
				Game.Notify('Descending','Welcome back, '+Game.bakeryName,[20,7],5);
				//Game.addClass('ascendIntro');
				//trigger the ascend animation (was breaking things because idk what it did)
				//Game.AscendTimer=1;
				Game.killShimmers();
				Game.addClass('ascending');
				Game.choiceSelectorOn=-1;
				Game.AscendOffX=0;
				Game.AscendOffY=0;
				Game.AscendOffXT=0;
				Game.AscendOffYT=0;
				Game.AscendZoomT=1;
				Game.AscendZoom=0.2;
				Game.OnAscend=1;
				l('backgroundCanvas').style.zIndex='';
				//Game.jukebox.reset();
				//PlayCue('preascend');
				l('transcend').style.display='none';
				setTimeout(function(){l('transcendTransition').remove()},501)
			},
		3500);
		setTimeout(()=>{PlaySound('snd/choir.mp3',0.75)},4500);
	}
}
function unlockTranscend(load) { //debug
	if (Game.prestige<Math.pow(10,15)) Game.prestige=Math.pow(10,15);
	if (load) loadTranscend();
}
/* newer and better cps mult system, still figuring it out (its below upgrades now)
new Game.buffType('cclysmCpsMult',function(time,pow){
	return {
		name:'Cookieclysm CpS multiplier',
		desc:'This is used to handle all CpS mults to make sure the display in the building tooltip is accurate.<div class="line"></div>If you\'re seeing this, something bad probably happened. Please contact us.';
		icon:[0,0,'https://yeetdragon24.github.io/cookieclysm/img/iconsheet-v4.png'],
		time:Math.min(time*Game.fps,Game.fps*Math.pow(10,15)),
		add:true,
		multCpS:pow,
		visible:false
	}
});
Game.gainBuff('cclysmCpsMult',1000000000,1);
Game.registerHook('check',()=>{
	let buff=Game.buffs['Cookieclysm CpS multiplier'];
	if (transcendModifier==1) {
		Math.seedrandom(`cookieclysm/glitched/${Game.seed}/${Math.floor(Game.T/(30*60))}`);
		buff.multCpS*((Math.random()+1)/2);
	}
	if (transcendModifier==2) {
		return cps/((Game.elderWrath+1)/2);
	}
});*/

Game.registerHook('cps',function(cps){
	if (transcendModifier==1) {
		Math.seedrandom(`cookieclysm/glitched/${Game.seed}/${Math.floor(Game.T/(30*60))}`);
		return cps*((Math.random()+1)/2);
	}
	if (transcendModifier==2) {
		return cps/((Game.elderWrath+1)/2);
	}
	else return cps;
});

//eval('Game.Ascend='+Game.Ascend.toString().replace('Game.AscendZoom=0.2;','Game.AscendZoom=0.2;if (Game.ascensionMode==2) mone+=Game.HowMuchPrestige(Game.cookiesEarned)*moneMult;'));

moneNameThings={
	'capn':'',
};
Game.registerHook('check',function(){
	//Game.Upgrades['King of the Afterlife'].ddesc='Prestige is <b>'+(Math.pow(3*(Game.Upgrades['King of the Afterlife'].tier+1),2))+'%</b> more effective.<q>Why worship God when you can buy him for 823,543 heavenly chips?</q>';
	//before anything is bought and also just to make sure
	for (var iii of transcendentUpgrades) {
		if (!i.notTiered) iii.ddesc=iii.desc.replace('%%',Math.pow(3*(iii.tier+1),2));
	} //tf am i doing the game only runs check if Game.OnAscend==0
	for (var iiii in moneNameThings) {
		if (Game.hasDev) {
			if (Game.hasDev(iiii)) moneName=moneNameThings[iiii];
		} else moneName="Moné";
	}
	if (l('moneName')) l('moneName').innerHTML=moneName;
	
	if (l('transcendModIcon')) {
		let tranModIcon=transcendModifierTypes[transcendModifier].icon;
		l('transcendModIcon').style.backgroundPosition=`${tranModIcon[0]*-48}px ${tranModIcon[1]*-48}px`;
		
	}
});
//Game.registerHook('reset',function(hard){l('transcendPower').innerHTML=transcendPower;});

Game.Has=function(what) {
	//console.log(Game.Has.caller);
	var it=Game.Upgrades[what];
	if (what.toLowerCase().indexOf('unshackled')>-1) {
		if (it&&it.buildingTie) return it.bought&&unshackleSlots.indexOf(i.id)>-1;
	} 
	if (it && Game.ascensionMode==1 && (it.pool=='prestige' || it.tier=='fortune')) return 0;
	return (it?it.bought:0);
}

//youpocalypse
var youWrathD=0;
var youWrath=0;
var preventAscend=0;
var preventingAscend=0;
var bigCookieGone=0;

function inRect(x,y,rect) {
	//find out if the point x,y is in the rotated rectangle rect{w,h,r,o} (width,height,rotation in radians,y-origin) (needs to be normalized)
	//I found this somewhere online I guess
	var dx = x+Math.sin(-rect.r)*(-(rect.h/2-rect.o)),dy=y+Math.cos(-rect.r)*(-(rect.h/2-rect.o));
	var h1 = Math.sqrt(dx*dx + dy*dy);
	var currA = Math.atan2(dy,dx);
	var newA = currA - rect.r;
	var x2 = Math.cos(newA) * h1;
	var y2 = Math.sin(newA) * h1;
	if (x2 > -0.5 * rect.w && x2 < 0.5 * rect.w && y2 > -0.5 * rect.h && y2 < 0.5 * rect.h) return true;
	return false;
}

function updateYoupocalypse() {
	if (Game.OnAscend>0) return false;
	if (youWrath==0) {
		if (Game.Objects['You'].amount>=100) {
			Game.Notify('Your clones are angry...','After realizing they were only created to produce more cookies for you, they start trying to sabotage your production.',[35,0]);
			youWrath=1;
		}
	} else if (youWrath==1) {
		if (youWrathD>=0.95) {
			if (!Game.Has('Cookieclysm')&&!Game.HasUnlocked('Cookieclysm')) {
				Game.Notify('You\'ve unlocked a new upgrade','The anger of your clones has weakened space-time enough for you to cause irreversible damage.',[35,17]);
				Game.Unlock('Cookieclysm');
			}
		}
		if (Game.Has('Cookieclysm')) {
			youWrath=2;
			preventAscend=1;
		}
		if (Game.Objects['You'].amount>420) {
			youWrath=2;
		}
	} else if (youWrath==2) {
		if (Game.AscendTimer==149&&preventAscend) {
			preventingAscend=1;
			var blank='filler.png';
			Game.Loader.Replace('brokenCookie.png',blank);
			Game.Loader.Replace('brokenCookieHalo.png',blank);
			Game.Loader.Replace('shineSpoke.png',blank);
		}
		if (preventingAscend&&Game.AscendTimer>0) {
			Game.AscendTimer-=2;
			if (Game.AscendTimer<4) {
				Game.AscendTimer=0;
				Game.Loader.Replace('perfectCookie.png','filler.png');
				Game.Loader.Replace('cookieShadow.png','filler.png');
				l('bigCookie').style.display='none';
				Game.removeClass('ascendIntro');
			}
		}
	}
	if (!preventAscend&&!bigCookieGone) {
		Game.Loader.Replace('brokenCookie.png','brokenCookie.png');
		Game.Loader.Replace('brokenCookieHalo.png','brokenCookieHalo.png');
		Game.Loader.Replace('shineSpoke.png','shineSpoke.png');
	}
	youWrathD+=((youWrath)-youWrathD)*0.001;
}
Game.registerHook('logic',updateYoupocalypse);

//going to the dark side
eval('Game.UpdateWrinklers='+Game.UpdateWrinklers.toString().replace(
`if (me.type==1) pic=Game.WINKLERS?'shinyWinkler.png':'shinyWrinkler.png';`,
`if (me.type==1) pic=Game.WINKLERS?'shinyWinkler.png':'shinyWrinkler.png';if (me.type==2) pic='shinyWinkler.png'`
));

Game.registerHook('reset',(hard)=>{
	if (hard) {
		youWrath=0;
		preventAscend=0;
		preventingAscend=0;
		bigCookieGone=0;
		mone=0;
		moneName='Moné';
		transcendPower=0;
		lastTranscendP=0;
		moneSpent=0;
		dmone=0;
		transcends=0;
		transcendModifier=0;
	}
});

//its a large function and i only need to change 2 parts but i have to have the whole thing
Game.DrawBackground=function(){
	Timer.clean();
	//background
	if (!Game.Background)//init some stuff
	{
		Game.Background=l('backgroundCanvas').getContext('2d');
		Game.Background.canvas.width=Game.Background.canvas.parentNode.offsetWidth;
		Game.Background.canvas.height=Game.Background.canvas.parentNode.offsetHeight;
		Game.LeftBackground=l('backgroundLeftCanvas').getContext('2d');
		Game.LeftBackground.canvas.width=Game.LeftBackground.canvas.parentNode.offsetWidth;
		Game.LeftBackground.canvas.height=Game.LeftBackground.canvas.parentNode.offsetHeight;
			//preload ascend animation bits so they show up instantly
			Game.LeftBackground.globalAlpha=0;
			Game.LeftBackground.drawImage(Pic('brokenCookie.png'),0,0);
			Game.LeftBackground.drawImage(Pic('brokenCookieHalo.png'),0,0);
			Game.LeftBackground.drawImage(Pic('starbg.jpg'),0,0);
		
		window.addEventListener('resize',function(event)
		{
			Game.Background.canvas.width=Game.Background.canvas.parentNode.offsetWidth;
			Game.Background.canvas.height=Game.Background.canvas.parentNode.offsetHeight;
			Game.LeftBackground.canvas.width=Game.LeftBackground.canvas.parentNode.offsetWidth;
			Game.LeftBackground.canvas.height=Game.LeftBackground.canvas.parentNode.offsetHeight;
		});
	}
	
	var ctx=Game.LeftBackground;
	
	if (Game.OnAscend==1)
	{
		Timer.clean();
		//starry background on ascend screen
		var w=Game.Background.canvas.width;
		var h=Game.Background.canvas.height;
		var b=Game.ascendl.getBounds();
		var x=(b.left+b.right)/2;
		var y=(b.top+b.bottom)/2;
		Game.Background.globalAlpha=0.5;
		var s=1*Game.AscendZoom*(1+Math.cos(Game.T*0.0027)*0.05);
		Game.Background.fillPattern(Pic('starbg.jpg'),0,0,w,h,1024*s,1024*s,x+Game.AscendOffX*0.25*s,y+Game.AscendOffY*0.25*s);
		Timer.track('star layer 1');
		if (Game.prefs.fancy)
		{
			//additional star layer
			Game.Background.globalAlpha=0.5*(0.5+Math.sin(Game.T*0.02)*0.3);
			var s=2*Game.AscendZoom*(1+Math.sin(Game.T*0.002)*0.07);
			//Game.Background.globalCompositeOperation='lighter';
			Game.Background.fillPattern(Pic('starbg.jpg'),0,0,w,h,1024*s,1024*s,x+Game.AscendOffX*0.25*s,y+Game.AscendOffY*0.25*s);
			//Game.Background.globalCompositeOperation='source-over';
			Timer.track('star layer 2');
			
			x=x+Game.AscendOffX*Game.AscendZoom;
			y=y+Game.AscendOffY*Game.AscendZoom;
			//wispy nebula around the center
			Game.Background.save();
			Game.Background.globalAlpha=0.5;
			Game.Background.translate(x,y);
			Game.Background.globalCompositeOperation='lighter';
			Game.Background.rotate(Game.T*0.001);
			s=(600+150*Math.sin(Game.T*0.007))*Game.AscendZoom;
			Game.Background.drawImage(Pic('heavenRing1.jpg'),-s/2,-s/2,s,s);
			Game.Background.rotate(-Game.T*0.0017);
			s=(600+150*Math.sin(Game.T*0.0037))*Game.AscendZoom;
			Game.Background.drawImage(Pic('heavenRing2.jpg'),-s/2,-s/2,s,s);
			Game.Background.restore();
			Timer.track('nebula');
			
			//Game.Background.drawImage(Pic('shadedBorders.png'),0,0,w,h);
			//Timer.track('border');
		}
	}
	else if (Game.OnAscend==0)
	{
	
		var goodBuff=0;
		var badBuff=0;
		for (var i in Game.buffs)
		{
			if (Game.buffs[i].aura==1) goodBuff=1;
			if (Game.buffs[i].aura==2) badBuff=1;
		}
		
		if (Game.drawT%5==0)
		{
			if (false && Game.bgType!=0 && Game.ascensionMode!=1)
			{
				//l('backgroundCanvas').style.background='url('+Game.resPath+'img/shadedBordersSoft.png) 0px 0px,url('+Game.resPath+'img/bgWheat.jpg) 50% 50%';
				//l('backgroundCanvas').style.backgroundSize='100% 100%,cover';
			}
			else
			{
				l('backgroundCanvas').style.background='transparent';
				Game.defaultBg='bgBlue';
				Game.bgR=0;
				
				if (Game.season=='fools') Game.defaultBg='bgMoney';
				if (Game.elderWrathD<1 || Game.prefs.notScary)
				{
					Game.bgR=0;
					Game.bg=Game.defaultBg;
					Game.bgFade=Game.defaultBg;
				}
				else if (Game.elderWrathD>=1 && Game.elderWrathD<2)
				{
					Game.bgR=(Game.elderWrathD-1)/1;
					Game.bg=Game.defaultBg;
					Game.bgFade='grandmas1';
				}
				else if (Game.elderWrathD>=2 && Game.elderWrathD<3)
				{
					Game.bgR=(Game.elderWrathD-2)/1;
					Game.bg='grandmas1';
					Game.bgFade='grandmas2';
				}
				else if (Game.elderWrathD>=3)// && Game.elderWrathD<4)
				{
					Game.bgR=(Game.elderWrathD-3)/1;
					Game.bg='grandmas2';
					Game.bgFade='grandmas3';
				}
				
				if (Game.bgType!=0 && Game.ascensionMode!=1)
				{
					Game.bgR=0;
					Game.bg=Game.BGsByChoice[Game.bgType].pic;
					Game.bgFade=Game.bg;
				}
				
				Game.Background.fillPattern(Pic(Game.bg+'.jpg'),0,0,Game.Background.canvas.width,Game.Background.canvas.height,512,512,0,0);
				if (Game.bgR>0)
				{
					Game.Background.globalAlpha=Game.bgR;
					Game.Background.fillPattern(Pic(Game.bgFade+'.jpg'),0,0,Game.Background.canvas.width,Game.Background.canvas.height,512,512,0,0);
				}
				Game.Background.globalAlpha=1;
				Game.Background.drawImage(Pic('shadedBordersSoft.png'),0,0,Game.Background.canvas.width,Game.Background.canvas.height);
			}
			
		}
		Timer.track('window background');
		
		//clear
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
		/*if (Game.AscendTimer<Game.AscendBreakpoint) ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
		else
		{
			ctx.globalAlpha=0.05;
			ctx.fillStyle='#000';
			ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
			ctx.globalAlpha=1;
			OldCanvasDrawImage.apply(ctx,[ctx.canvas,Math.random()*4-2,Math.random()*4-2-4]);
			ctx.globalAlpha=1;
		}*/
		Timer.clean();
		
		var showDragon=0;
		if (Game.hasBuff('Dragonflight') || Game.hasBuff('Dragon Harvest')) showDragon=1;
		
		Game.cookieOriginX=Math.floor(ctx.canvas.width/2);
		Game.cookieOriginY=Math.floor(ctx.canvas.height*0.4);
		
		if (Game.AscendTimer==0)
		{	
			if (Game.prefs.particles)
			{
				//falling cookies
				var pic='';
				var opacity=1;
				if (Game.elderWrathD<=1.5 || Game.prefs.notScary)
				{
					if (Game.cookiesPs>=1000) pic='cookieShower3.png';
					else if (Game.cookiesPs>=500) pic='cookieShower2.png';
					else if (Game.cookiesPs>=50) pic='cookieShower1.png';
					else pic='';
				}
				if (pic!='')
				{
					if (Game.elderWrathD>=1 && !Game.prefs.notScary) opacity=1-((Math.min(Game.elderWrathD,1.5)-1)/0.5);
					ctx.globalAlpha=opacity;
					var y=(Math.floor(Game.T*2)%512);
					ctx.fillPattern(Pic(pic),0,0,ctx.canvas.width,ctx.canvas.height+512,512,512,0,y);
					ctx.globalAlpha=1;
				}
				//snow
				if (Game.season=='christmas')
				{
					var y=(Math.floor(Game.T*2.5)%512);
					ctx.globalAlpha=0.75;
					ctx.globalCompositeOperation='lighter';
					ctx.fillPattern(Pic('snow2.jpg'),0,0,ctx.canvas.width,ctx.canvas.height+512,512,512,0,y);
					ctx.globalCompositeOperation='source-over';
					ctx.globalAlpha=1;
				}
				//hearts
				if (Game.season=='valentines')
				{
					var y=(Math.floor(Game.T*2.5)%512);
					ctx.globalAlpha=1;
					ctx.fillPattern(Pic('heartStorm.png'),0,0,ctx.canvas.width,ctx.canvas.height+512,512,512,0,y);
					ctx.globalAlpha=1;
				}
				Timer.track('left background');
				
				Game.particlesDraw(0);
				ctx.globalAlpha=1;
				Timer.track('particles');
				
				//big cookie shine
				var s=512;
				
				var x=Game.cookieOriginX;
				var y=Game.cookieOriginY;
				
				var r=Math.floor((Game.T*0.5)%360);
				ctx.save();
				ctx.translate(x,y);
				ctx.rotate((r/360)*Math.PI*2);
				var alphaMult=1;
				if (Game.bgType==2 || Game.bgType==4) alphaMult=0.5;
				var pic='shine.png';
				if (goodBuff) {pic='shineGold.png';alphaMult=1;}
				else if (badBuff) {pic='shineRed.png';alphaMult=1;}
				if (goodBuff && Game.prefs.fancy) ctx.globalCompositeOperation='lighter';
				ctx.globalAlpha=0.5*alphaMult;
				ctx.drawImage(Pic(pic),-s/2,-s/2,s,s);
				ctx.rotate((-r*2/360)*Math.PI*2);
				ctx.globalAlpha=0.25*alphaMult;
				ctx.drawImage(Pic(pic),-s/2,-s/2,s,s);
				ctx.restore();
				Timer.track('shine');
		
				if (Game.ReincarnateTimer>0)
				{
					ctx.globalAlpha=1-Game.ReincarnateTimer/Game.ReincarnateDuration;
					ctx.fillStyle='#000';
					ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
					ctx.globalAlpha=1;
				}
				
				if (showDragon)
				{
					//big dragon
					var s=300*2*(1+Math.sin(Game.T*0.013)*0.1);
					var x=Game.cookieOriginX-s/2;
					var y=Game.cookieOriginY-s/(1.4+0.2*Math.sin(Game.T*0.01));
					ctx.drawImage(Pic('dragonBG.png'),x,y,s,s);
				}
				
				//big cookie
				if (false)//don't do that
				{
					ctx.globalAlpha=1;
					var amount=Math.floor(Game.cookies).toString();
					var digits=amount.length;
					var space=0;
					for (var i=0;i<digits;i++)
					{
						var s=16*(digits-i);
						var num=parseInt(amount[i]);
						if (i>0) space-=s*(1-num/10)/2;
						if (i==0 && num>1) space+=s*0.1;
						for (var ii=0;ii<num;ii++)
						{
							var x=Game.cookieOriginX;
							var y=Game.cookieOriginY;
							var spin=Game.T*(0.005+i*0.001)+i+(ii/num)*Math.PI*2;
							x+=Math.sin(spin)*space;
							y+=Math.cos(spin)*space;
							ctx.drawImage(Pic('perfectCookie.png'),x-s/2,y-s/2,s,s);
						}
						space+=s/2;
					}
				}
				else
				{
					ctx.globalAlpha=1;
					var s=256*Game.BigCookieSize;
					var x=Game.cookieOriginX;
					var y=Game.cookieOriginY;
					ctx.save();
					if (Game.prefs.fancy) ctx.drawImage(Pic('cookieShadow.png'),x-s/2,y-s/2+20,s,s);
					ctx.translate(x,y);
					if (Game.season=='easter')
					{
						var nestW=304*0.98*Game.BigCookieSize;
						var nestH=161*0.98*Game.BigCookieSize;
						ctx.drawImage(Pic('nest.png'),-nestW/2,-nestH/2+130,nestW,nestH);
					}
					//ctx.rotate(((Game.startDate%360)/360)*Math.PI*2);
					ctx.drawImage(Pic('perfectCookie.png'),-s/2,-s/2,s,s);
					
					if (goodBuff && Game.prefs.particles)//sparkle
					{
						ctx.globalCompositeOperation='lighter';
						for (var i=0;i<1;i++)
						{
							ctx.globalAlpha=Math.random()*0.65+0.1;
							var size=Math.random()*30+5;
							var a=Math.random()*Math.PI*2;
							var d=s*0.9*Math.random()/2;
							ctx.drawImage(Pic('glint.png'),-size/2+Math.sin(a)*d,-size/2+Math.cos(a)*d,size,size);
						}
					}
					
					ctx.restore();
					Timer.track('big cookie');
				}
			}
			else//no particles
			{
				//big cookie shine
				var s=512;
				var x=Game.cookieOriginX-s/2;
				var y=Game.cookieOriginY-s/2;
				ctx.globalAlpha=0.5;
				ctx.drawImage(Pic('shine.png'),x,y,s,s);
				
				if (showDragon)
				{
					//big dragon
					var s=300*2*(1+Math.sin(Game.T*0.013)*0.1);
					var x=Game.cookieOriginX-s/2;
					var y=Game.cookieOriginY-s/(1.4+0.2*Math.sin(Game.T*0.01));
					ctx.drawImage(Pic('dragonBG.png'),x,y,s,s);
				}
			
				//big cookie
				ctx.globalAlpha=1;
				var s=256*Game.BigCookieSize;
				var x=Game.cookieOriginX-s/2;
				var y=Game.cookieOriginY-s/2;
				if (Game.prefs.fancy) ctx.drawImage(Pic('cookieShadow.png'),x,y+20,s,s);
				ctx.drawImage(Pic('perfectCookie.png'),x,y,s,s);
			}
			
			//cursors
			if (Game.prefs.cursors)
			{
				ctx.save();
				ctx.translate(Game.cookieOriginX,Game.cookieOriginY);
				var pic=Pic('cursor.png');
				var fancy=Game.prefs.fancy;
				
				if (showDragon) ctx.globalAlpha=0.25;
				var amount=Game.Objects['Cursor'].amount;
				//var spe=-1;
				for (var i=0;i<amount;i++)
				{
					var n=Math.floor(i/50);
					//var a=((i+0.5*n)%50)/50;
					var w=0;
					if (fancy) w=(Math.sin(Game.T*0.025+(((i+n*12)%25)/25)*Math.PI*2));
					if (w>0.997) w=1.5;
					else if (w>0.994) w=0.5;
					else w=0;
					w*=-4;
					if (fancy) w+=Math.sin((n+Game.T*0.01)*Math.PI/2)*4;
					var x=0;
					var y=(140/* *Game.BigCookieSize*/+n*16+w)-16;
					
					var rot=7.2;//(1/50)*360
					if (i==0 && fancy) rot-=Game.T*0.1;
					if (i%50==0) rot+=7.2/2;
					ctx.rotate((rot/360)*Math.PI*2);
					ctx.drawImage(pic,0,0,32,32,x,y,32,32);
					//ctx.drawImage(pic,32*(i==spe),0,32,32,x,y,32,32);
					
					/*if (i==spe)
					{
						y+=16;
						x=Game.cookieOriginX+Math.sin(-((r-5)/360)*Math.PI*2)*y;
						y=Game.cookieOriginY+Math.cos(-((r-5)/360)*Math.PI*2)*y;
						if (Game.CanClick && ctx && Math.abs(Game.mouseX-x)<16 && Math.abs(Game.mouseY-y)<16) Game.mousePointer=1;
					}*/
				}
				ctx.restore();
				Timer.track('cursors');
			}
		}
		else
		{
			var tBase=Math.max(0,(Game.AscendTimer-Game.AscendBreakpoint)/(Game.AscendDuration-Game.AscendBreakpoint));
			//big crumbling cookie
			//var t=(3*Math.pow(tBase,2)-2*Math.pow(tBase,3));//S curve
			var t=Math.pow(tBase,0.5);
			
			var shake=0;
			if (Game.AscendTimer<Game.AscendBreakpoint) {shake=Game.AscendTimer/Game.AscendBreakpoint;}
			//else {shake=1-t;}

			ctx.globalAlpha=1;
			
			var x=Game.cookieOriginX;
			var y=Game.cookieOriginY;
			
			x+=(Math.random()*2-1)*10*shake;
			y+=(Math.random()*2-1)*10*shake;
			
			var s=1;
			if (tBase>0)
			{
				ctx.save();
				ctx.globalAlpha=1-Math.pow(t,0.5);
				ctx.translate(x,y);
				ctx.globalCompositeOperation='lighter';
				ctx.rotate(Game.T*0.007);
				s=0.5+Math.pow(tBase,0.6)*1;
				var s2=(600)*s;
				ctx.drawImage(Pic('heavenRing1.jpg'),-s2/2,-s2/2,s2,s2);
				ctx.rotate(-Game.T*0.002);
				s=0.5+Math.pow(1-tBase,0.4)*1;
				s2=(600)*s;
				ctx.drawImage(Pic('heavenRing2.jpg'),-s2/2,-s2/2,s2,s2);
				ctx.restore();
			}
			
			s=256;//*Game.BigCookieSize;
			
			ctx.save();
			ctx.translate(x,y);
			ctx.rotate((t*(-0.1))*Math.PI*2);
			
			var chunks={0:7,1:6,2:3,3:2,4:8,5:1,6:9,7:5,8:0,9:4};
			s*=t/2+1;
			/*ctx.globalAlpha=(1-t)*0.33;
			for (var i=0;i<10;i++)
			{
				var d=(t-0.2)*(80+((i+2)%3)*40);
				ctx.drawImage(Pic('brokenCookie.png'),256*(chunks[i]),0,256,256,-s/2+Math.sin(-(((chunks[i]+4)%10)/10)*Math.PI*2)*d,-s/2+Math.cos(-(((chunks[i]+4)%10)/10)*Math.PI*2)*d,s,s);
			}
			ctx.globalAlpha=(1-t)*0.66;
			for (var i=0;i<10;i++)
			{
				var d=(t-0.1)*(80+((i+2)%3)*40);
				ctx.drawImage(Pic('brokenCookie.png'),256*(chunks[i]),0,256,256,-s/2+Math.sin(-(((chunks[i]+4)%10)/10)*Math.PI*2)*d,-s/2+Math.cos(-(((chunks[i]+4)%10)/10)*Math.PI*2)*d,s,s);
			}*/
			ctx.globalAlpha=1-t;
			for (var i=0;i<10;i++)
			{
				var d=(t)*(80+((i+2)%3)*40);
				var x2=(Math.random()*2-1)*5*shake;
				var y2=(Math.random()*2-1)*5*shake;
				ctx.drawImage(Pic('brokenCookie.png'),256*(chunks[i]),0,256,256,-s/2+Math.sin(-(((chunks[i]+4)%10)/10)*Math.PI*2)*d+x2,-s/2+Math.cos(-(((chunks[i]+4)%10)/10)*Math.PI*2)*d+y2,s,s);
			}
			var brokenHalo=1-Math.min(t/(1/3),1/3)*3;
			if (Game.AscendTimer<Game.AscendBreakpoint) brokenHalo=Game.AscendTimer/Game.AscendBreakpoint;
			ctx.globalAlpha=brokenHalo;
			ctx.drawImage(Pic('brokenCookieHalo.png'),-s/1.3333,-s/1.3333,s*1.5,s*1.5);
			
			ctx.restore();
			
			//flares
			var n=9;
			var t=Game.AscendTimer/Game.AscendBreakpoint;
			if (Game.AscendTimer<Game.AscendBreakpoint)
			{
				ctx.save();
				ctx.translate(x,y);
				for (var i=0;i<n;i++)
				{
					if (Math.floor(t/3*n*3+i*2.7)%2)
					{
						var t2=Math.pow((t/3*n*3+i*2.7)%1,1.5);
						ctx.globalAlpha=(1-t)*(Game.drawT%2==0?0.5:1);
						var sw=(1-t2*0.5)*96;
						var sh=(0.5+t2*1.5)*96;
						ctx.drawImage(Pic('shineSpoke.png'),-sw/2,-sh-32-(1-t2)*256,sw,sh);
					}
					ctx.rotate(Math.PI*2/n);
				}
				ctx.restore();
			}
			
			
			//flash at breakpoint
			if (tBase<0.1 && tBase>0)
			{
				ctx.globalAlpha=1-tBase/0.1;
				ctx.fillStyle='#fff';
				ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
				ctx.globalAlpha=1;
			}
			if (tBase>0.8)
			{
				ctx.globalAlpha=(tBase-0.8)/0.2;
				ctx.fillStyle='#000';
				ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
				ctx.globalAlpha=1;
			}
		}
		
		//milk and milk accessories
		if (Game.prefs.milk)
		{
			var width=ctx.canvas.width;
			var height=ctx.canvas.height;
			var x=Math.floor((Game.T*2-(Game.milkH-Game.milkHd)*2000+480*2)%480);//Math.floor((Game.T*2+Math.sin(Game.T*0.1)*2+Math.sin(Game.T*0.03)*2-(Game.milkH-Game.milkHd)*2000+480*2)%480);
			var y=(Game.milkHd)*height;//(((Game.milkHd)*ctx.canvas.height)*(1+0.05*(Math.sin(Game.T*0.017)/2+0.5)));
			var a=1;
			if (Game.AscendTimer>0)
			{
				y*=1-Math.pow((Game.AscendTimer/Game.AscendBreakpoint),2)*2;
				a*=1-Math.pow((Game.AscendTimer/Game.AscendBreakpoint),2)*2;
			}
			else if (Game.ReincarnateTimer>0)
			{
				y*=1-Math.pow(1-(Game.ReincarnateTimer/Game.ReincarnateDuration),2)*2;
				a*=1-Math.pow(1-(Game.ReincarnateTimer/Game.ReincarnateDuration),2)*2;
			}
			
			if (Game.TOYS)
			{
				//golly
				if (!Game.Toy)
				{
					Game.toys=[];
					Game.toysType=choose([1,2]);
					Game.Toy=function(x,y)
					{
						this.id=Game.toys.length;
						this.x=x;
						this.y=y;
						this.xd=Math.random()*10-5;
						this.yd=Math.random()*10-5;
						this.r=Math.random()*Math.PI*2;
							this.rd=Math.random()*0.1-0.05;
							var v=Math.random();var a=0.5;var b=0.5;
							if (v<=a) v=b-b*Math.pow(1-v/a,3); else v=b+(1-b)*Math.pow((v-a)/(1-a),3);
						this.s=(Game.toysType==1?64:48)*(0.1+v*1.9);
						if (Game.toysType==2) this.s=(this.id%10==1)?96:48;
						this.st=this.s;this.s=0;
							var cookies=[[10,0]];
							for (var i in Game.Upgrades)
							{
								var cookie=Game.Upgrades[i];
								if (cookie.bought>0 && cookie.pool=='cookie') cookies.push(cookie.icon);
							}
						this.icon=choose(cookies);
						this.dragged=false;
						this.l=document.createElement('div');
						this.l.innerHTML=this.id;
						this.l.style.cssText='cursor:pointer;border-radius:'+(this.s/2)+'px;opacity:0;width:'+this.s+'px;height:'+this.s+'px;background:#999;position:absolute;left:0px;top:0px;z-index:10000000;transform:translate(-1000px,-1000px);';
						l('sectionLeft').appendChild(this.l);
						AddEvent(this.l,'mousedown',function(what){return function(){what.dragged=true;};}(this));
						AddEvent(this.l,'mouseup',function(what){return function(){what.dragged=false;};}(this));
						Game.toys.push(this);
						return this;
					}
					for (var i=0;i<Math.floor(Math.random()*15+(Game.toysType==1?5:30));i++)
					{
						new Game.Toy(Math.random()*width,Math.random()*height*0.3);
					}
				}
				ctx.globalAlpha=0.5;
				for (var i in Game.toys)
				{
					var me=Game.toys[i];
					ctx.save();
					ctx.translate(me.x,me.y);
					ctx.rotate(me.r);
					if (Game.toysType==1) ctx.drawImage(Pic('smallCookies.png'),(me.id%8)*64,0,64,64,-me.s/2,-me.s/2,me.s,me.s);
					else ctx.drawImage(Pic('icons.png'),me.icon[0]*48,me.icon[1]*48,48,48,-me.s/2,-me.s/2,me.s,me.s);
					ctx.restore();
				}
				ctx.globalAlpha=1;
				for (var i in Game.toys)
				{
					var me=Game.toys[i];
					//psst... not real physics
					for (var ii in Game.toys)
					{
						var it=Game.toys[ii];
						if (it.id!=me.id)
						{
							var x1=me.x+me.xd;
							var y1=me.y+me.yd;
							var x2=it.x+it.xd;
							var y2=it.y+it.yd;
							var dist=Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2))/(me.s/2+it.s/2);
							if (dist<(Game.toysType==1?0.95:0.75))
							{
								var angle=Math.atan2(y1-y2,x1-x2);
								var v1=Math.sqrt(Math.pow((me.xd),2)+Math.pow((me.yd),2));
								var v2=Math.sqrt(Math.pow((it.xd),2)+Math.pow((it.yd),2));
								var v=((v1+v2)/2+dist)*0.75;
								var ratio=it.s/me.s;
								me.xd+=Math.sin(-angle+Math.PI/2)*v*(ratio);
								me.yd+=Math.cos(-angle+Math.PI/2)*v*(ratio);
								it.xd+=Math.sin(-angle-Math.PI/2)*v*(1/ratio);
								it.yd+=Math.cos(-angle-Math.PI/2)*v*(1/ratio);
								me.rd+=(Math.random()*1-0.5)*0.1*(ratio);
								it.rd+=(Math.random()*1-0.5)*0.1*(1/ratio);
								me.rd*=Math.min(1,v);
								it.rd*=Math.min(1,v);
							}
						}
					}
					if (me.y>=height-(Game.milkHd)*height+8)
					{
						me.xd*=0.85;
						me.yd*=0.85;
						me.rd*=0.85;
						me.yd-=1;
						me.xd+=(Math.random()*1-0.5)*0.3;
						me.yd+=(Math.random()*1-0.5)*0.05;
						me.rd+=(Math.random()*1-0.5)*0.02;
					}
					else
					{
						me.xd*=0.99;
						me.rd*=0.99;
						me.yd+=1;
					}
					me.yd*=(Math.min(1,Math.abs(me.y-(height-(Game.milkHd)*height)/16)));
					me.rd+=me.xd*0.01/(me.s/(Game.toysType==1?64:48));
					if (me.x<me.s/2 && me.xd<0) me.xd=Math.max(0.1,-me.xd*0.6); else if (me.x<me.s/2) {me.xd=0;me.x=me.s/2;}
					if (me.x>width-me.s/2 && me.xd>0) me.xd=Math.min(-0.1,-me.xd*0.6); else if (me.x>width-me.s/2) {me.xd=0;me.x=width-me.s/2;}
					me.xd=Math.min(Math.max(me.xd,-30),30);
					me.yd=Math.min(Math.max(me.yd,-30),30);
					me.rd=Math.min(Math.max(me.rd,-0.5),0.5);
					me.x+=me.xd;
					me.y+=me.yd;
					me.r+=me.rd;
					me.r=me.r%(Math.PI*2);
					me.s+=(me.st-me.s)*0.5;
					if (Game.toysType==2 && !me.dragged && Math.random()<0.003) me.st=choose([48,48,48,48,96]);
					if (me.dragged)
					{
						me.x=Game.mouseX;
						me.y=Game.mouseY;
						me.xd+=((Game.mouseX-Game.mouseX2)*3-me.xd)*0.5;
						me.yd+=((Game.mouseY-Game.mouseY2)*3-me.yd)*0.5
						me.l.style.transform='translate('+(me.x-me.s/2)+'px,'+(me.y-me.s/2)+'px) scale(50)';
					}
					else me.l.style.transform='translate('+(me.x-me.s/2)+'px,'+(me.y-me.s/2)+'px)';
					me.l.style.width=me.s+'px';
					me.l.style.height=me.s+'px';
					ctx.save();
					ctx.translate(me.x,me.y);
					ctx.rotate(me.r);
					if (Game.toysType==1) ctx.drawImage(Pic('smallCookies.png'),(me.id%8)*64,0,64,64,-me.s/2,-me.s/2,me.s,me.s);
					else ctx.drawImage(Pic('icons.png'),me.icon[0]*48,me.icon[1]*48,48,48,-me.s/2,-me.s/2,me.s,me.s);
					ctx.restore();
				}
			}
			
			var pic=Game.Milk.pic;
			if (Game.milkType!=0 && Game.ascensionMode!=1) pic=Game.AllMilks[Game.milkType].pic;
			ctx.globalAlpha=0.95*a;
			ctx.fillPattern(Pic(pic),0,height-y,width+480,1,480,480,x,0);
			
			ctx.fillStyle='#000';
			ctx.fillRect(0,height-y+480,width,Math.max(0,(y-480)));
			ctx.globalAlpha=1;
			
			Timer.track('milk');
		}
		
		if (Game.AscendTimer>0)
		{
			ctx.drawImage(Pic('shadedBordersSoft.png'),0,0,ctx.canvas.width,ctx.canvas.height);
		}
		
		if (Game.AscendTimer==0)
		{
			Game.DrawWrinklers();Timer.track('wrinklers');
			
			//shimmering veil
			if (Game.Has('Shimmering veil [off]'))
			{
				ctx.globalAlpha=1;
				ctx.globalCompositeOperation='lighter';
				var s=300+Math.sin(Game.T*0.037)*20;
				var x=Game.cookieOriginX;
				var y=Game.cookieOriginY;
				ctx.save();
				ctx.translate(x,y);
				ctx.rotate(-Game.T*0.01);
				ctx.drawImage(Pic('shimmeringVeil.png'),-s/2,-s/2,s,s);
				ctx.restore();
				if (Game.prefs.particles)//sparkles
				{
					for (i=0;i<6;i++)
					{
						var t=Game.T+i*15;
						var r=(t%30)/30;
						var a=(Math.floor(t/30)*30*6-i*30)*0.01;
						var size=32*(1-Math.pow(r*2-1,2));
						var xx=x+Math.sin(a)*(110+r*16);
						var yy=y+Math.cos(a)*(110+r*16);
						ctx.drawImage(Pic('glint.png'),xx-size/2,yy-size/2,size,size);
					}
				}
				ctx.globalCompositeOperation='source-over';
			}
			
			Game.DrawSpecial();Timer.track('evolvables');
			
			Game.particlesDraw(2);Timer.track('text particles');
			
			//shiny border during frenzies etc
			ctx.globalAlpha=1;
			var borders='shadedBordersSoft.png';
			if (goodBuff) borders='shadedBordersGold.png';
			else if (badBuff) borders='shadedBordersRed.png';
			if (goodBuff && Game.prefs.fancy) ctx.globalCompositeOperation='lighter';
			ctx.drawImage(Pic(borders),0,0,ctx.canvas.width,ctx.canvas.height);
			if (goodBuff && Game.prefs.fancy) ctx.globalCompositeOperation='source-over';
		}
	}
	else if (Game.OnAscend==2) {
		//l('backgroundCanvas').style.zIndex=90000; //make it appear behind the upgrades which are at z index 10mil
		Game.Background.clearRect(-1000, -1000, l('backgroundCanvas').width*10, l('backgroundCanvas').height*10);
		Game.Background.fillStyle='black';
		
		Game.Background.save();
		
		Game.Background.globalAlpha=1;
		Game.Background.fillRect(-1000, -1000, 10000, 10000);
		Game.Background.globalAlpha=0.5;
		//Game.Background.translate(screen.width/2,window.innerHeight/2);
		
		Game.Background.globalCompositeOperation='lighter';
		
		/*
		Game.Background.rotate(Game.T*0.001);
		s=(600+150*Math.sin(Game.T*0.007));
		Game.Background.drawImage(Pic('heavenRing1.jpg'),-s/2,-s/2,s,s);
		Game.Background.rotate(-Game.T*0.0017);
		s=(600+150*Math.sin(Game.T*0.0037));
		Game.Background.drawImage(Pic('heavenRing2.jpg'),-s/2,-s/2,s,s);
		Game.Background.rotate(Game.T*0.0013);
		s=(600+150*Math.sin(Game.T*0.0054));
		Game.Background.drawImage(Pic('heavenRing1.jpg'),-s/4,-s/4,s/2,s/2);
		Game.Background.rotate(-Game.T*0.0021);
		s=(600+150*Math.sin(Game.T*0.0019));
		Game.Background.drawImage(Pic('heavenRing2.jpg'),-s/4,-s/4,s/2,s/2);
		s=(600+150*Math.sin(Game.T*0.0054));
		Game.Background.drawImage(Pic('heavenRing1.jpg'),-s,-s,s*2,s*2);
		Game.Background.rotate(-Game.T*0.0021);
		s=(600+150*Math.sin(Game.T*0.0019));
		Game.Background.drawImage(Pic('heavenRing2.jpg'),-s,-s,s*2.4,s*2.4);*/
		var w=Game.Background.canvas.width;
		var h=Game.Background.canvas.height;
		var b=Game.ascendl.getBounds();
		var x=(b.left+b.right)/2;
		var y=(b.top+b.bottom)/2;
		Game.Background.globalAlpha=((Math.cos(Game.T/5000))+1)/10;
		var s=1*(1+Math.cos(Game.T*0.0027)*0.05);
		Game.Background.fillPattern(Pic('starbg.jpg'),0,0,w,h,1024*s,1024*s,x*0.00125*s,y*0.00125*s);
		Timer.track('star layer 1');
		
		Game.Background.restore();
	}
};
Game.crateTooltip=function(me,context)
		{
			var tags=[];
			mysterious=0;
			var neuromancy=0;
			var price='';
			if (context=='stats' && (Game.Has('Neuromancy') || (Game.sesame && me.pool=='debug'))) neuromancy=1;
			
			var ariaText='';
			
			if (me.type=='upgrade')
			{
				ariaText+='Upgrade. ';
				
				if (me.pool=='prestige') tags.push(loc("[Tag]Heavenly",0,'Heavenly'),'#efa438');
				else if (me.pool=='tech') tags.push(loc("[Tag]Tech",0,'Tech'),'#36a4ff');
				else if (me.pool=='cookie') tags.push(loc("[Tag]Cookie",0,'Cookie'),0);
				else if (me.pool=='debug') tags.push(loc("[Tag]Debug",0,'Debug'),'#00c462');
				else if (me.pool=='toggle') tags.push(loc("[Tag]Switch",0,'Switch'),0);
				else tags.push(loc("[Tag]Upgrade",0,'Upgrade'),0);
				
				if (Game.Has('Label printer'))
				{
					if (me.tier!=0) {
						if (me.id<tUSA) tags.push(loc("Tier:")+' '+loc("[Tier]"+Game.Tiers[me.tier].name,0,Game.Tiers[me.tier].name),Game.Tiers[me.tier].color);
						else tags.push(loc("Tier:")+' '+romanize(me.tier),Game.Tiers[(me.tier%15)+1].color);
					}
					if (me.name=='Label printer' || me.name=='This upgrade') tags.push(loc("Tier:")+' '+loc("[Tier]Self-referential"),'#ff00ea');
				}
				
				if (me.isVaulted()) tags.push(loc("Vaulted"),'#4e7566');
				
				if (me.bought>0)
				{
					ariaText+='Owned. ';
					if (me.pool=='tech') tags.push(loc("Researched"),0);
					else if (EN && me.kitten) tags.push('Purrchased',0);
					else tags.push(loc("Purchased"),0);
				}
				
				if (me.lasting && me.unlocked) tags.push(loc("Unlocked forever"),'#f2ff87');
				
				if (neuromancy && me.bought==0) tags.push(loc("Click to learn!"),'#00c462');
				else if (neuromancy && me.bought>0) tags.push(loc("Click to unlearn!"),'#00c462');
				
				var canBuy=(context=='store'?me.canBuy():true);
				var cost=me.getPrice();
				if (me.priceLumps>0) cost=me.priceLumps;
				
				if (me.priceLumps==0 && cost==0) price='';
				else
				{
					price='<div style="float:right;text-align:right;"><span class="price'+
						(me.priceLumps>0?(' lump'):'')+
						(me.pool=='prestige'?(((mone>=cost&&me.id>=tUSA)||(Game.heavenlyChips>=cost||(me.id<tUSA&&me.bought)))?(me.id>=tUSA?' transcendent':' heavenly'):(me.id>=tUSA?' transcendent disabled':' heavenly disabled')):'')+
						(context=='store'?(canBuy?'':' disabled'):'')+
					'">'+Beautify(Math.round(cost))+'</span>'+((me.pool!='prestige' && me.priceLumps==0)?Game.costDetails(cost):'')+'</div>';
					
					ariaText+=(me.bought?'Bought for':canBuy?'Can buy for':'Cannot afford the')+' '+Beautify(Math.round(cost))+' '+((me.priceLumps>0)?'sugar lumps':(me.pool=='prestige')?'heavenly chips':'cookies')+'. ';
				}
			}
			else if (me.type=='achievement')
			{
				ariaText+='Achievement. ';
				if (me.pool=='shadow') tags.push(loc("Shadow Achievement"),'#9700cf');
				else tags.push(loc("Achievement"),0);
				if (me.won>0) {tags.push(loc("Unlocked"),0);ariaText+='Unlocked. ';}
				else {tags.push(loc("Locked"),0);mysterious=1;}
				
				if (neuromancy && me.won==0) tags.push(loc("Click to win!"),'#00c462');
				else if (neuromancy && me.won>0) tags.push(loc("Click to lose!"),'#00c462');
			}
			
			var tagsStr='';
			for (var i=0;i<tags.length;i+=2)
			{
				if (i%2==0) tagsStr+='<div class="tag" style="background-color:'+(tags[i+1]==0?'#fff':tags[i+1])+';">'+tags[i]+'</div>';
			}
			
			var icon=me.icon;
			if (mysterious) icon=[0,7];
			
			if (me.iconFunction) icon=me.iconFunction();
			
			ariaText+=(mysterious?'Hidden':me.dname)+'. ';
			
			var tip='';
			if (context=='store')
			{
				if (me.pool!='toggle' && me.pool!='tech')
				{
					var purchase=me.kitten?'purrchase':'purchase';
					if (Game.Has('Inspired checklist'))
					{
						if (me.isVaulted()) tip=EN?('Upgrade is vaulted and will not be auto-'+purchase+'d.<br>Click to '+purchase+'. Shift-click to unvault.'):(loc("Upgrade is vaulted and will not be auto-purchased.")+'<br>'+loc("Click to purchase.")+' '+loc("%1 to unvault.",loc("Shift-click")));
						else tip=EN?('Click to '+purchase+'. Shift-click to vault.'):(loc("Click to purchase.")+' '+loc("%1 to vault.",loc("Shift-click")));
						if (EN){
							if (Game.keys[16]) tip+='<br>(You are holding Shift.)';
							else tip+='<br>(You are not holding Shift.)';
						}
					}
					else tip=EN?('Click to '+purchase+'.'):loc("Click to purchase.");
				}
				else if (me.pool=='toggle' && me.choicesFunction) tip=loc("Click to open selector.");
				else if (me.pool=='toggle') tip=loc("Click to toggle.");
				else if (me.pool=='tech') tip=loc("Click to research.");
			}
			
			if (tip!='') ariaText+=tip+' ';
			
			var desc=me.ddesc;
			if (me.descFunc) desc=me.descFunc(context);
			if (me.bought && context=='store' && me.displayFuncWhenOwned) desc=me.displayFuncWhenOwned()+'<div class="line"></div>'+desc;
			if (me.unlockAt)
			{
				if (me.unlockAt.require)
				{
					var it=Game.Upgrades[me.unlockAt.require];
					desc='<div style="font-size:80%;text-align:center;">'+(EN?'From':loc("Source:"))+' '+tinyIcon(it.icon)+' '+it.dname+'</div><div class="line"></div>'+desc;
				}
				else if (me.unlockAt.text)
				{
					//var it=Game.Upgrades[me.unlockAt.require];
					desc='<div style="font-size:80%;text-align:center;">'+(EN?'From':loc("Source:"))+' <b>'+text+'</b></div><div class="line"></div>'+desc;
				}
			}
			
			if (!mysterious) ariaText+='Description: '+desc+' ';
			
			if (Game.prefs.screenreader)
			{
				var ariaLabel=l('ariaReader-'+me.type+'-'+me.id);
				if (ariaLabel) ariaLabel.innerHTML=ariaText.replace(/(<([^>]+)>)/gi,' ');
			}
			
			return '<div style="position:absolute;left:1px;top:1px;right:1px;bottom:1px;background:linear-gradient(125deg,'+(me.pool=='prestige'?'rgba(15,115,130,1) 0%,rgba(15,115,130,0)':'rgba(50,40,40,1) 0%,rgba(50,40,40,0)')+' 20%);mix-blend-mode:screen;z-index:1;"></div><div style="z-index:10;padding:8px 4px;min-width:350px;position:relative;" id="tooltipCrate">'+
			'<div class="icon" style="float:left;margin-left:-8px;margin-top:-8px;'+writeIcon(icon)+'"></div>'+
			(me.bought && context=='store'?'':price)+
			'<div class="name">'+(mysterious?'???':me.dname)+((me.id>=tUSA)?(' '+romanize(me.tier)):'')+'</div>'+
			tagsStr+
			'<div class="line"></div><div class="description">'+(mysterious?'???':desc)+'</div></div>'+
			(tip!=''?('<div class="line"></div><div style="font-size:10px;font-weight:bold;color:#999;text-align:center;padding-bottom:4px;line-height:100%;" class="crateTip">'+tip+'</div>'):'')+
			(Game.sesame?('<div style="font-size:9px;">Id: '+me.id+' | Order: '+(me.order)+(me.tier?' | Tier: '+me.tier:'')+' | Icon: ['+me.icon[0]+','+me.icon[1]+']'+'</div>'):'');
		}
