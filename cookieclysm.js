//Initiating the mod i guess
let hasGodL = Game.hasGod;
let getPlantDescL = Game.Objects['Farm'].minigame ? Game.Objects['Farm'].minigame.getPlantDesc : function() {};
let capniL = 0;
let icons = 'https://yeetdragon24.github.io/cookieclysm/img/iconsheet-c1.1.png';
let Kaizo = Game.mods['Kaizo Cookies'];
//some roman numeral function i found on stack overflow https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
function romanize(num) { if (isNaN(num)) return NaN; var digits = String(+num).split(""), key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"], roman = "", i = 3; while (i--) roman = (key[+digits.pop() + (i * 10)] || "") + roman; return Array(+digits.join("") + 1).join("M") + roman; }
var tUSA = 884;
var transcendMeterPercent = 0;
//Handling all the mod stuff (base cookieclysm.js
function shadowSave(type) { Game.toSave = false; Game.lastDate = parseInt(Game.time); var str = ''; if (type == 3) str += '\nGame version\n'; str += Game.version + '|'; str += '|'; if (type == 3) str += '\n\nRun details'; str += (type == 3 ? '\n	run start date : ' : '') + parseInt(Game.startDate) + ';' + (type == 3 ? '\n	legacy start date : ' : '') + parseInt(Game.fullDate) + ';' + (type == 3 ? '\n	date when we last opened the game : ' : '') + parseInt(Game.lastDate) + ';' + (type == 3 ? '\n	bakery name : ' : '') + (Game.bakeryName) + ';' + (type == 3 ? '\n	seed : ' : '') + (Game.seed) + ';' + (type == 3 ? '\n	appearance : ' : '') + (Game.YouCustomizer.save()) + '|'; if (type == 3) str += '\n\nPacked preferences bitfield\n	'; var str2 = (Game.prefs.particles ? '1' : '0') + (Game.prefs.numbers ? '1' : '0') + (Game.prefs.autosave ? '1' : '0') + (Game.prefs.autoupdate ? '1' : '0') + (Game.prefs.milk ? '1' : '0') + (Game.prefs.fancy ? '1' : '0') + (Game.prefs.warn ? '1' : '0') + (Game.prefs.cursors ? '1' : '0') + (Game.prefs.focus ? '1' : '0') + (Game.prefs.format ? '1' : '0') + (Game.prefs.notifs ? '1' : '0') + (Game.prefs.wobbly ? '1' : '0') + (Game.prefs.monospace ? '1' : '0') + (Game.prefs.filters ? '1' : '0') + (Game.prefs.cookiesound ? '1' : '0') + (Game.prefs.crates ? '1' : '0') + (Game.prefs.showBackupWarning ? '1' : '0') + (Game.prefs.extraButtons ? '1' : '0') + (Game.prefs.askLumps ? '1' : '0') + (Game.prefs.customGrandmas ? '1' : '0') + (Game.prefs.timeout ? '1' : '0') + (Game.prefs.cloudSave ? '1' : '0') + (Game.prefs.bgMusic ? '1' : '0') + (Game.prefs.notScary ? '1' : '0') + (Game.prefs.fullscreen ? '1' : '0') + (Game.prefs.screenreader ? '1' : '0') + (Game.prefs.discordPresence ? '1' : '0') + ''; str2 = pack3(str2); str += str2 + '|'; if (type == 3) str += '\n\nMisc game data'; str += (type == 3 ? '\n	cookies : ' : '') + parseFloat(Game.cookies).toString() + ';' + (type == 3 ? '\n	total cookies earned : ' : '') + parseFloat(Game.cookiesEarned).toString() + ';' + (type == 3 ? '\n	cookie clicks : ' : '') + parseInt(Math.floor(Game.cookieClicks)) + ';' + (type == 3 ? '\n	golden cookie clicks : ' : '') + parseInt(Math.floor(Game.goldenClicks)) + ';' + (type == 3 ? '\n	cookies made by clicking : ' : '') + parseFloat(Game.handmadeCookies).toString() + ';' + (type == 3 ? '\n	golden cookies missed : ' : '') + parseInt(Math.floor(Game.missedGoldenClicks)) + ';' + (type == 3 ? '\n	background type : ' : '') + parseInt(Math.floor(Game.bgType)) + ';' + (type == 3 ? '\n	milk type : ' : '') + parseInt(Math.floor(Game.milkType)) + ';' + (type == 3 ? '\n	cookies from past runs : ' : '') + parseFloat(Game.cookiesReset).toString() + ';' + (type == 3 ? '\n	elder wrath : ' : '') + parseInt(Math.floor(Game.elderWrath)) + ';' + (type == 3 ? '\n	pledges : ' : '') + parseInt(Math.floor(Game.pledges)) + ';' + (type == 3 ? '\n	pledge time left : ' : '') + parseInt(Math.floor(Game.pledgeT)) + ';' + (type == 3 ? '\n	currently researching : ' : '') + parseInt(Math.floor(Game.nextResearch)) + ';' + (type == 3 ? '\n	research time left : ' : '') + parseInt(Math.floor(Game.researchT)) + ';' + (type == 3 ? '\n	ascensions : ' : '') + parseInt(Math.floor(Game.resets)) + ';' + (type == 3 ? '\n	golden cookie clicks (this run) : ' : '') + parseInt(Math.floor(Game.goldenClicksLocal)) + ';' + (type == 3 ? '\n	cookies sucked by wrinklers : ' : '') + parseFloat(Game.cookiesSucked).toString() + ';' + (type == 3 ? '\n	wrinkles popped : ' : '') + parseInt(Math.floor(Game.wrinklersPopped)) + ';' + (type == 3 ? '\n	santa level : ' : '') + parseInt(Math.floor(Game.santaLevel)) + ';' + (type == 3 ? '\n	reindeer clicked : ' : '') + parseInt(Math.floor(Game.reindeerClicked)) + ';' + (type == 3 ? '\n	season time left : ' : '') + parseInt(Math.floor(Game.seasonT)) + ';' + (type == 3 ? '\n	season switcher uses : ' : '') + parseInt(Math.floor(Game.seasonUses)) + ';' + (type == 3 ? '\n	current season : ' : '') + (Game.season ? Game.season : '') + ';'; var wrinklers = Game.SaveWrinklers(); str += (type == 3 ? '\n	amount of cookies contained in wrinklers : ' : '') + parseFloat(Math.floor(wrinklers.amount)) + ';' + (type == 3 ? '\n	number of wrinklers : ' : '') + parseInt(Math.floor(wrinklers.number)) + ';' + (type == 3 ? '\n	prestige level : ' : '') + parseFloat(Game.prestige).toString() + ';' + (type == 3 ? '\n	heavenly chips : ' : '') + parseFloat(Game.heavenlyChips).toString() + ';' + (type == 3 ? '\n	heavenly chips spent : ' : '') + parseFloat(Game.heavenlyChipsSpent).toString() + ';' + (type == 3 ? '\n	heavenly cookies : ' : '') + parseFloat(Game.heavenlyCookies).toString() + ';' + (type == 3 ? '\n	ascension mode : ' : '') + parseInt(Math.floor(Game.ascensionMode)) + ';' + (type == 3 ? '\n	permanent upgrades : ' : '') + parseInt(Math.floor(Game.permanentUpgrades[0])) + ';' + parseInt(Math.floor(Game.permanentUpgrades[1])) + ';' + parseInt(Math.floor(Game.permanentUpgrades[2])) + ';' + parseInt(Math.floor(Game.permanentUpgrades[3])) + ';' + parseInt(Math.floor(Game.permanentUpgrades[4])) + ';' + (type == 3 ? '\n	dragon level : ' : '') + parseInt(Math.floor(Game.dragonLevel)) + ';' + (type == 3 ? '\n	dragon aura : ' : '') + parseInt(Math.floor(Game.dragonAura)) + ';' + (type == 3 ? '\n	dragon aura 2 : ' : '') + parseInt(Math.floor(Game.dragonAura2)) + ';' + (type == 3 ? '\n	chime type : ' : '') + parseInt(Math.floor(Game.chimeType)) + ';' + (type == 3 ? '\n	volume : ' : '') + parseInt(Math.floor(Game.volume)) + ';' + (type == 3 ? '\n	number of shiny wrinklers : ' : '') + parseInt(Math.floor(wrinklers.shinies)) + ';' + (type == 3 ? '\n	amount of cookies contained in shiny wrinklers : ' : '') + parseFloat(Math.floor(wrinklers.amountShinies)) + ';' + (type == 3 ? '\n	current amount of sugar lumps : ' : '') + parseFloat(Math.floor(Game.lumps)) + ';' + (type == 3 ? '\n	total amount of sugar lumps made : ' : '') + parseFloat(Math.floor(Game.lumpsTotal)) + ';' + (type == 3 ? '\n	time when current sugar lump started : ' : '') + parseFloat(Math.floor(Game.lumpT)) + ';' + (type == 3 ? '\n	time when last refilled a minigame with a sugar lump : ' : '') + parseFloat(Math.floor(Game.lumpRefill)) + ';' + (type == 3 ? '\n	sugar lump type : ' : '') + parseInt(Math.floor(Game.lumpCurrentType)) + ';' + (type == 3 ? '\n	vault : ' : '') + Game.vault.join(',') + ';' + (type == 3 ? '\n	heralds : ' : '') + parseInt(Game.heralds) + ';' + (type == 3 ? '\n	golden cookie fortune : ' : '') + parseInt(Game.fortuneGC) + ';' + (type == 3 ? '\n	CpS fortune : ' : '') + parseInt(Game.fortuneCPS) + ';' + (type == 3 ? '\n	highest raw CpS : ' : '') + parseFloat(Game.cookiesPsRawHighest) + ';' + (type == 3 ? '\n	music volume : ' : '') + parseInt(Math.floor(Game.volumeMusic)) + ';' + (type == 3 ? '\n	cookies sent : ' : '') + parseInt(Math.floor(Game.cookiesSent)) + ';' + (type == 3 ? '\n	cookies received : ' : '') + parseInt(Math.floor(Game.cookiesReceived)) + ';' + '|'; if (type == 3) str += '\n\nBuildings : amount, bought, cookies produced, level, minigame data'; for (var i in Game.Objects) { var me = Game.Objects[i]; if (type == 3) str += '\n	' + me.name + ' : '; if (me.vanilla) { str += me.amount + ',' + me.bought + ',' + parseFloat(Math.floor(me.totalCookies)) + ',' + parseInt(me.level); if (Game.isMinigameReady(me)) str += ',' + me.minigame.save(); else str += ',' + (me.minigameSave || ''); str += ',' + (me.muted ? '1' : '0'); str += ',' + me.highest; str += ';'; } } str += '|'; if (type == 3) str += '\n\nPacked upgrades bitfield (unlocked and bought)\n	'; var toCompress = []; for (var i in Game.UpgradesById) { var me = Game.UpgradesById[i]; if (me.vanilla) toCompress.push(Math.min(me.unlocked, 1), Math.min(me.bought, 1)); }; toCompress = pack3(toCompress.join('')); str += toCompress; str += '|'; if (type == 3) str += '\n\nPacked achievements bitfield (won)\n	'; var toCompress = []; for (var i in Game.AchievementsById) { var me = Game.AchievementsById[i]; if (me.vanilla) toCompress.push(Math.min(me.won)); } toCompress = pack3(toCompress.join('')); str += toCompress; str += '|'; if (type == 3) str += '\n\nBuffs : type, maxTime, time, arg1, arg2, arg3'; for (var i in Game.buffs) { var me = Game.buffs[i]; if (me.type) { if (type == 3) str += '\n	' + me.type.name + ' : '; if (me.type.vanilla) { str += me.type.id + ',' + me.maxTime + ',' + me.time; if (typeof me.arg1 !== 'undefined') str += ',' + parseFloat(me.arg1); if (typeof me.arg2 !== 'undefined') str += ',' + parseFloat(me.arg2); if (typeof me.arg3 !== 'undefined') str += ',' + parseFloat(me.arg3); str += ';'; } } } if (type == 3) str += '\n\nCustom :\n'; str += '|'; str += Game.saveModData(); Game.lastSaveData = str; if (type == 2 || type == 3) { return str; } else if (type == 1) { str = escape(utf8_to_b64(str) + '!END!'); return str; } else { if (Game.useLocalStorage) { str = utf8_to_b64(str) + '!END!'; if (str.length < 10) { } else { str = escape(str); localStorageSet(Game.SaveTo, str); if (App) App.save(str); if (!localStorageGet(Game.SaveTo)) { } else if (document.hasFocus()) { } } } else { var now = new Date(); now.setFullYear(now.getFullYear() + 5); str = utf8_to_b64(str) + '!END!'; Game.saveData = escape(str); str = Game.SaveTo + '=' + escape(str) + '; expires=' + now.toUTCString() + ';'; document.cookie = str; if (App) App.save(str); if (document.cookie.indexOf(Game.SaveTo) < 0) { } else if (document.hasFocus()) { } } } }
var cookieTracker, cpsTracker, shimmerTracker, lumpTracker;
if (typeof C === 'undefined') C = {};
C.version = 1.01;
/*
Main logic hook (all other logic stuff should go in here eventually)
*/
Game.registerHook('logic', function() {
	if (cookieTracker > Game.cookies || cpsTracker != Game.cookiesPs || lumpTracker != Game.lumps) {
		shadowSave();
	}
	cookieCount = Game.cookies;
	cpsTracker = Game.cookiesPs;
	lumpTracker = Game.lumps;

	/*if (Game.hasBuff('Spirits sniped')) {
		Game.hasGod = function() { };
	} else {
		Game.hasGod = hasGodL;
	}*/

	if (Game.hasBuff('Famine')) {
		if (true || (Game.T % (Game.fps / 40) == 0)) { //tf does this do the game runs at 30 fps (fixed lol)
            if (capniL > 25) {
                if (capniL == 200 && Game.AscendTimer == 149) capniL = 250;
                if (capniL == 250) {
                    if (Game.AscendTimer > 2) Game.AscendTimer -= 2;
                    else {
                        Game.AscendTimer = 0;
                        Game.removeClass('ascendIntro');
                        Game.GiveUpAscend(1);
                        Crumbs.findObject('bigCookie').enabled = true
                    }
                }
            }
			else if (Game.ObjectsById[capniL].amount != 0) {
				if (capniL != 19) {
					Game.ObjectsById[capniL].sacrifice(1);
				} else {
                    capniL = 200;
					Game.killBuff('Famine');
                    Game.Ascend(1);
					Game.Objects['Farm'].minigame.getPlantDesc = getPlantDescL;
				}
			}
			else {
				if (capniL < 19) {
					capniL++;
				} else {
                    capniL = 200;
					Game.killBuff('Famine');
                    Game.Objects['Farm'].minigame.getPlantDesc = getPlantDescL;
                    Game.Ascend(1)
				}
			}
		}
	}
	//checkSpace();

	/*======TRANSCEND========*/
	if (C.transcendReady) {
		if (Game.OnAscend == 2) { //it said &&Game.Game.transcendReady which was the reason code wasnt working smh
			if (C.transcendUnlocked) {
				let transcendMeterl = C.ascendInfoCopy.childNodes[0].childNodes[2].childNodes[2].childNodes[0]; //i was not cooking
				transcendMeterPercentT = Math.log10(Game.prestige + 1) - Math.floor(Math.log10(Game.prestige + 1));
				transcendMeterl.style.backgroundPosition = (-Game.T * 0.5 - transcendMeterPercent * 100) + 'px';
				transcendMeterl.style.width = (transcendMeterPercent * 100) + '%';
				transcendMeterPercent += (transcendMeterPercentT - transcendMeterPercent) * 0.1;
				//what i get for using .cloneNode()
				transcendMeterl.style.backgroundPosition = (-Game.T * 0.5 - transcendMeterPercent * 100) + 'px';
				transcendMeterl.style.width = (transcendMeterPercent * 100) + '%';
				C.ascendInfoCopy.childNodes[1].childNodes[2].childNodes[0].textContent = Beautify(C.dmone);
				C.ascendInfoCopy.childNodes[0].childNodes[2].childNodes[0].textContent = C.transcendPower;
			}
			C.updateTranscend();
		} else if (Game.OnAscend == 1 && C.transcendUnlocked) {
			let transcendMeterl = l('ascendInfo').childNodes[0].childNodes[2].childNodes[2].childNodes[0];
			l('mone').innerHTML = Beautify(C.mone);//find a beter way to do this then checking every frame
			l('transcendPower').innerHTML = C.transcendPower;//this too
			C.transcendPower = Math.floor(Math.log10(Game.prestige + 1));//also this
			ascendInfoCopy.childNodes[1].childNodes[2].childNodes[0].innerHTML = Math.floor(C.dmone);
			ascendInfoCopy.childNodes[0].childNodes[2].childNodes[0].innerHTML = C.transcendPower;
			ascendInfoCopy.style.margin = 'auto';
            transcendMeterPercentT = Math.log10(Game.prestige + 1) - Math.floor(Math.log10(Game.prestige + 1));
            transcendMeterPercent += (transcendMeterPercentT - transcendMeterPercent) * 0.1;
			transcendMeterl.style.backgroundPosition = (-Game.T * 0.5 - transcendMeterPercent * 100) + 'px';
			transcendMeterl.style.width = (transcendMeterPercent * 100) + '%';
		}
	}

	C.dmone += (C.mone - C.dmone) * 0.3;
	if (Math.abs(C.dmone - C.mone) < 0.1) C.dmone = C.mone;

	if (Game.T % 3 == 0) C.calcDynamicTUEffs();

	if (Cookieclysm.toLoad && Cookieclysm.loaded && Cookieclysm.loadStr) {
		Cookieclysm.toLoad = false;
		C.load(Cookieclysm.loadStr);
	}
	if (Game.Has('Clone sacrifice')) C.updateYoupocalypse();
	if (Game.AscendTimer > 0 && C.bigCookieGone) Game.AscendTimer = Game.AscendDuration;
});

C.save = function() {
	let str = '';
    
	//main
	str += C.version + '/';
	let upgrades = [], achievements = [];
	for (let i of C.upAndAchiev) {
		if (i.type == 'upgrade') upgrades.push(i);
		else achievements.push(i);
	}
	for (let i of upgrades) {
		str += (i.unlocked << 1) | i.bought; //no idea what these bitwise operations do but i stole this from orteil
	}
	str += '/';
	for (let i of achievements) {
		str += i.won;
	}
	str += '/';

	//converter
	let converter = Game.Objects['Converter'];
	str += [
		converter.amount, converter.bought, Math.floor(converter.totalCookies).toPrecision(5),
		converter.level, Number(converter.muted), converter.highest, converter.free
	].join(',');
	str += '/';

	//transcend
	str += [
		C.mone, C.moneName, C.transcendPower, C.lastTranscendP,
		C.moneSpent, C.transcends, C.transcendModifier
	].join(',');
	str += '/';

	//transcendent upgrade stuff
	str += C.unshackleSlots.join(',');
	str += '/';

	str += C.transcendentUpgrades.map(x => x.tier).join(',');
	str += '/';

	//youpocalypse
	str += C.youWrath;
	str += '/';

    //chocolate shop
    str += C.chocolate;

	return str;
}
C.load = function(str) {
	let spl = str.split('/');
	let version = spl[0];

	let upgrades = spl[1].split('');
	for (let i in upgrades) {
		C.upAndAchiev[C.upAndAchiev.indexOf(C.upAndAchiev.filter(x => x.type == 'upgrade')[i])].unlocked = ((parseInt(upgrades[i]) || 0) >>1)&1;
		C.upAndAchiev[C.upAndAchiev.indexOf(C.upAndAchiev.filter(x => x.type == 'upgrade')[i])].bought = (parseInt(upgrades[i]) || 0) & 1;
	}
	let achievements = spl[2].split('');
	for (let i in achievements) {
		C.upAndAchiev[C.upAndAchiev.indexOf(C.upAndAchiev.filter(x => x.type == 'achievement')[i])].won = parseInt(achievements[i]) || 0;
	}

	let converter = Game.Objects['Converter'];
	[
		converter.amount, converter.bought, converter.totalCookies,
		converter.level, converter.muted, converter.highest, converter.free
	] = spl[3].split(',').map(x => parseFloat(x) || 0);
    Game.Objects['Converter'].refresh();

	let transcendData = spl[4].split(',');
	C.mone = parseFloat(transcendData[0]) || 0;
	C.moneName = transcendData[1] || 'Moné';
	C.transcendPower = parseFloat(transcendData[2]) || 0;
	C.lastTranscendP = parseFloat(transcendData[3]) || 0;
	C.moneSpent = parseFloat(transcendData[4]) || 0;
	C.transcends = parseFloat(transcendData[5]) || 0;
	C.transcendModifier = parseInt(transcendData[6]) || 0;

	C.unshackleSlots = spl[5].split(',').map(x => parseInt(x));
	let tuTiers = spl[6].split(',');
	for (let i in tuTiers) {
		C.transcendentUpgrades[i].tier = parseInt(tuTiers[i]) || 0;
	}

	youWrath = parseFloat(spl[7]);

    if (Game.Has('Alternate reality')) Game.Upgrades['Alternate reality'].buyFunction();
    Game.Objects['Converter'].refresh();
    C.unlockSpaceUpgrades();
    Game.upgradesToRebuild = true;
    if (Game.Has('Season switcher')) Game.Unlock('Cataclysmic biscuit');
}

//random variable sets i guess
C.transcendentPink = '#da70d6';
C.cookieclysmPink = '#FF6EC7';
if (new Date().getMonth() == 10) {
	let date = new Date().getDate();
	if (date >= 2 && date <= 11) {
        Game.baseSeason = 'cookieclysm';
	    if (Game.season != 'cookieclysm') Game.Notify('Cookieclysm day!', 'It\'s the time of the year around when Cookieclysm started development! Nothing much happens but it\'s funny to make this a season I guess', [0, 0, icons]);
    }
}
Game.seasons['cookieclysm'] = {
	name: 'Cookieclysm',
	start: 'YeetDragon24\'s suffering has begun!',
	over: 'YeetDragon24\'s suffering is over.',
	trigger: 'Cataclysmic biscuit'
}

//taken from Cookie Clicker v. 2.032
Game.GiveUpAscend = function(bypass) {
    if (!bypass) Game.Prompt('<h3>Give up</h3><div class="block">Are you sure? You\'ll have to start this run over and won\'t gain any heavenly chips!</div>',[['Yes','Game.ClosePrompt();Game.GiveUpAscend(1);'],'No']);
    else
    {
        if (Game.prefs.popups) Game.Popup('Game reset');
        else Game.Notify('Gave up','Let\'s try this again!',[0,5],4);
        Game.Reset();
    }
}

/*
converter (function from CCSE)
*/
Game.BuildStore = Function(`
	(${Game.BuildStore.toString()})();
	Game.Objects['Converter'].l.childNodes[0].style.background = 'url("https://raw.githubusercontent.com/yeetdragon24/cookieclysm/main/img/converterIcon.png")';
	Game.Objects['Converter'].l.childNodes[1].style.background = 'url("https://raw.githubusercontent.com/yeetdragon24/cookieclysm/main/img/converterIcon.png")';
`);
var NewBuilding = function(name, commonName, desc, icon, iconColumn, art, price, cps, buyFunction, foolObject, buildingSpecial) { var me = new Game.Object(name, commonName, desc, icon, iconColumn, art, price, cps, buyFunction); if (foolObject) Game.foolObjects[name] = foolObject; if (buildingSpecial) Game.goldenCookieBuildingBuffs[name] = buildingSpecial; if (art.customBuildingPic) { Game.customBuildStore.push(function() { l('productIcon' + me.id).style.backgroundImage = 'url(' + art.customBuildingPic + ')'; l('productIconOff' + me.id).style.backgroundImage = 'url(' + art.customBuildingPic + ')'; }); } if (art.customIconsPic) { Game.customBuildings[name].tooltip.push(function(obj, ret) { if (me.locked) return ret; else return ret.replace('background-position', 'background-image:url(' + obj.art.customIconsPic + ');background-position'); }); } Game.BuildStore(); me.canvas = l('rowCanvas' + me.id); me.ctx = me.canvas.getContext('2d', { alpha: false }); me.pics = []; var icon = [0 * 64, me.icon * 64]; var muteStr = '<div class="tinyProductIcon" id="mutedProduct' + me.id + '" style="display:none;' + (me.art.customBuildingPic ? 'background-image:url(' + me.art.customBuildingPic + ');' : '') + 'background-position:-' + icon[0] + 'px -' + icon[1] + 'px;" ' + Game.clickStr + '="Game.ObjectsById[' + me.id + '].mute(0);PlaySound(Game.ObjectsById[' + me.id + '].muted?\'snd/clickOff.mp3\':\'snd/clickOn.mp3\');" ' + Game.getDynamicTooltip('Game.mutedBuildingTooltip(' + me.id + ')', 'this') + '></div>'; AddEvent(me.canvas, 'mouseover', function(me) { return function() { me.mouseOn = true; } }(me)); AddEvent(me.canvas, 'mouseout', function(me) { return function() { me.mouseOn = false; } }(me)); AddEvent(me.canvas, 'mousemove', function(me) { return function(e) { var box = this.getBoundingClientRect(); me.mousePos[0] = e.pageX - box.left; me.mousePos[1] = e.pageY - box.top; } }(me)); l('buildingsMute').innerHTML += muteStr; Game.recalculateGains = 1; return me; }
NewBuilding(
	'Converter', 'converter|converters|converted|[X] extra chamber|[X] extra chambers',
	'Converts living mass into cookies.', 21, 5,
	{
		pic: 'https://raw.githubusercontent.com/yeetdragon24/cookieclysm/main/img/building.png',
		bg: 'img/factoryBackground.png', xV: 8, yV: 8, w: 64, rows: 1, x: 0, y: 16
	}, "this is two years old",
	function(me) {
		var mult = 1;
		mult *= Game.GetTieredCpsMult(me);
		mult *= Game.magicCpS(me.name);
		return me.baseCps * mult;
	},
	function() {
		Game.UnlockTiered(this);
        if (this.amount > 125) Game.Unlock('Clone sacrifice');
		if (this.amount >= Game.SpecialGrandmaUnlock && Game.Objects['Grandma'].amount > 0) Game.Unlock(this.grandma.name);
	},
	{
		name: 'Cookieclysm',
		desc: 'It\'s finally released!',
		icon: 1
	}, ['Peer pressure', 'Free will']
);

for (let i in Game.Objects) {
	let me = Game.Objects[i];
	if (i != 'Cursor') {
		me.canvas = l('rowCanvas' + me.id);
		me.ctx = l('rowCanvas' + me.id).getContext('2d');
		AddEvent(me.canvas,'mouseover',function(me){return function(){me.mouseOn=true;}}(me));
		AddEvent(me.canvas,'mouseout',function(me){return function(){me.mouseOn=false;}}(me));
		AddEvent(me.canvas,'mousemove',function(me){return function(e){var box=this.getBounds();me.mousePos[0]=e.pageX-box.left;me.mousePos[1]=e.pageY-box.top;}}(me));
	}
	if (me.minigame && Game.Objects[i].minigame.save) {
		let save = me.minigame.save();
		me.minigame.init(l('rowSpecial' + Game.Objects[i].id));
		me.minigame.load(save);
	}
}
let converter = Game.Objects['Converter'];
converter.desc = 'Converts living matter into cookies.'; //right now mod is only english so this avoids loc issues
converter.unshackleUpgrade = 'Unshackled converters'; //doesnt exist but fixes Game.Has calling undefined for the tooltip
eval(`converter.tooltip = ${converter.tooltip.toString().replace(`var icon=[me.iconColumn,0];`, `var icon=[me.iconColumn,0, '${icons}'];`)}`);
locStrings['%1 converter'] = ['%1 converter', '%1 converters'];
l('mutedProduct20').style.setProperty('background-image', 'url("https://yeetdragon24.github.io/cookieclysm/img/converterIcon.png")')

/*
upgrades and achievements (C.upAndAchiev)
*/

//Local function so it has to be redefined
var getCookiePrice = function(level) { return 999999999999999999999999999999999999999 * Math.pow(10, (level - 1) / 2); };//idk if its even needed since idk how it works

C.transcendentUpgrade = function(name, desc, price, icon, other) {
	let upgrade = new Game.Upgrade(name, desc, price, icon);
	upgrade.pool = 'transcendent';
	for (let i in other) upgrade[i] = other[i];
	return upgrade;
}
C.spaceUpgrade = function(name, power, quote, price, icon) {
    let upgrade = new Game.Upgrade(name, `Multiplies your max space by <b>${power}</b>.${quote}`, price, icon);
    upgrade.power = power;
    C.spaceUpgrades.push(upgrade);
    return upgrade;
}
C.cursorUpgrades = [];
C.cursorUpgrade = function(name, quote, price, power) {
    let icon = [0, 0];
    if (C.cursorUpgrades.length == 0) icon = [1, 6];
    let upgrade = new Game.Upgrade(name, `You have <b>${power} more</b> available cursor ring${power==1?'':'s'}.<q>${quote}</q>`, price, icon);
    upgrade.power = power;
    C.cursorUpgrades.push(upgrade);
    return upgrade;
}

//fix i have to do because js dumb or some reason idk
var order, pool, power;
let oldProto = Game.Upgrade.prototype;
eval(`Game.Upgrade = ${Game.Upgrade.toString().replace(`if (order)`, `if (window.order)`)}`);
Game.Upgrade.prototype = oldProto;
oldProto = Game.Achievement.prototype;
eval(`Game.Achievement = ${Game.Achievement.toString().replace(`if (order)`, `if (window.order)`)}`);
Game.Achievement.prototype = oldProto;

//modified version of Extra Content Mod (ECM) (https://glander.club/asjs/fPgjj9n0/)
C.upAndAchiev = []
//upgrades.push(new Game.Upgrade('SHADOW Dragon claw','NOPE',999,[31,14])); Test
order = 70000;
C.upAndAchiev.push(new Game.Achievement('Put it back', 'Move a God from the God Complex into a slot from the Pantheon.', [11, 8]));
C.upAndAchiev.push(new Game.Achievement('Cutting it close', 'Use the Garden while CaptainCrozier is slotted.', [31, 1]));
C.upAndAchiev.push(new Game.Achievement('NOOO MY CPS', 'Activate the famine.<q>You were warned about this.</q>', [30, 2]));

order = 10000;
C.upAndAchiev.push(new Game.Achievement('Armored','Have a <b>100% or more</b> chance for your Shimmering veil to not break.', [7, 10])); Game.last.order = 10000.44;

order = 10070;
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'Hard Pasta', desc: 'You should probably cook these. Or should you bake them?', icon: [28, 32], require: 'Box of not cookies', power: 5, price: Math.pow(10, 45) }));

order = 510;
C.upAndAchiev.push(new Game.Upgrade('Alternate reality', 'Unlocks the <b>Clone world</b> mode.<q>Not related to the Cookie Clicker update of the same name.</q>', (15 * Math.pow(10, 15)) - 1, [33, 21]));
Game.last.pool = 'prestige'; Game.last.posX = 656; Game.last.posY = 787; Game.PrestigeUpgrades.push(Game.last); Game.last.buyFunction = function() { C.unlockCloneWorld() }; Game.last.parents = [Game.Upgrades['Unshackled idleverses']];
//C.upAndAchiev.push(new Game.Upgrade('Cookieclysm', '<q>Related to the Cookie Clicker mod of the same name.</q>', 24, [21, 6])); Game.last.priceFunc = function() { return Game.Objects['You'].amount * Math.pow(10, 45) }; Game.last.pool = 'research';
//Game.RequiresConfirmation(Game.last, '<div class="block">' + loc("<b>Warning:</b> purchasing this will have unexpected, and potentially undesirable results!<br><br><br>Purchase anyway?") + '</div>');
C.upAndAchiev.push(new Game.Upgrade('Rift', 'Begins the Cookieclysm.<q>It begins.</q>', 300e6, [31, 2])); Game.last.posX = -830; Game.last.posY = -628; Game.last.pool = 'prestige'; Game.last.buyFunction = function() { C.clysmUpgrades.forEach(x => Game.PrestigeUpgrades.push(x)); C.cookieclysm = true; }; Game.last.parents = [Game.Upgrades['Legacy']];
Game.PrestigeUpgrades.push(Game.last);
//C.upAndAchiev.push(new Game.Upgrade('Flaming worm', `Unlocks a <b><span style="color: ${C.transcendentPink}">special wrinkler</span></b>.`, 2, [2, 2, icons])); Game.last.priceFunc = function() { return this.bought ? 300e6 }; Game.last.pool = 'prestige';

//chocolate
C.pantheonBG = 0;
C.pantheonBGs = ['img/BGpantheon.jpg', 'img/pantheonBG.png'];
C.upAndAchiev.push(new Game.Upgrade('Pantheon background switch', '', 0, [5, 6])); Game.last.descFunc = function() { return `Currently: <b>${C.pantheonBG ? 'Palace' : 'Forest'}</b> ${tinyIcon(C.pantheonBG ? [5, 6] : [16, 0])}`; };
Game.last.buyFunction = function() {
    C.pantheonBG = Number(!C.pantheonBG);
    Game.Lock(this.name); Game.Unlock(this.name);
    l('templeBG').style.backgroundImage = `url('img/shadedBorders.png'), url('${C.pantheonBGs[C.pantheonBG]}')`; l('templeBG').style.backgroundSize = C.pantheonBG ? '50%' : '100% 100%, auto';
};
Game.last.iconFunction = function() { return C.pantheonBG ? [5, 6] : [16, 0] }; Game.last.pool = 'toggle';

order = 24000;
C.upAndAchiev.push(new Game.Upgrade('Cataclysmic biscuit', 'Triggers <b>Cookieclysm season</b> for the next 24 hours.<br>Triggering another season will cancel this one.<br>Cost scales with unbuffed CpS and increases with every season switch.<q>please don\'t make me go back</q>', Game.seasonTriggerBasePrice, [0, 0, icons])); Game.last.season='cookieclysm'; Game.last.pool='toggle';
Game.Upgrades['Cataclysmic biscuit'].descFunc=function(){return '<div style="text-align:center;">'+Game.saySeasonSwitchUses()+'<div class="line"></div></div>'+this.desc;};
Game.computeSeasons();

order = 255;
C.upAndAchiev.push(Game.GrandmaSynergy('Massive grandmas', 'A large grandma to be converted into more cookies.', 'Converter'));
converter.grandma = Game.last;
order = 1800;
let converterStart = C.upAndAchiev.length;
C.upAndAchiev.push(Game.TieredUpgrade('Alien volunteers', '<q>They don\'t know what they are volunteering for.</q>', 'Converter', 1)); 
C.upAndAchiev.push(Game.TieredUpgrade('Salty electrons', '<q>Electrons are now required to be converted as well instead of retaining their structure, and as a result are salty.</q>', 'Converter', 2));
C.upAndAchiev.push(Game.TieredUpgrade('Box hypothesis', '<q>(can’t think of one, make new)</q> <span style="right:0;position:absolute;">-Stream Sniper</span>', 'Converter', 3));
C.upAndAchiev.push(Game.TieredUpgrade('Small dough converters', '<q>Some... "experiments" have left you with live cookie dough, and you see this as an opportunity.</q>', 'Converter', 4));
C.upAndAchiev.push(Game.TieredUpgrade('Oven explosion', '<q>And that\'s how it all ended, for the operator too.</q>', 'Converter', 5));
C.upAndAchiev.push(Game.TieredUpgrade('Necromancy', '<q>See that oil? No, it\'s not for electricity. It\'s for cookies.</q>', 'Converter', 6));
//C.upAndAchiev.push(Game.TieredUpgrade('Cyclotron', '<q>These can make particles spin, and make them collide too. Now how can you use this to make more cookies?</q>', 'Converter', 6));
C.upAndAchiev.push(Game.TieredUpgrade('Megacosmics', '<q>According to the theory of nanocosmics, our universe is just a subatomic particle in another universe, maybe even a subatomic particle in a living organism.</q>', 'Converter', 7));
//Game.TieredUpgrade('The Beat','<q>If the matter and antimatter both fall out of The Pulse at any time, you somehow get cookies.</q>','Converter',8);
C.upAndAchiev.push(Game.TieredUpgrade('Probably dust motes', '<q>A very large nonessential particle.</q>', 'Converter', 8));
C.upAndAchiev.push(Game.TieredUpgrade('Quantum knotting', '<q>Re-entangle quantum particles so more gets converted with less.</q>', 'Converter', 9));
C.upAndAchiev.push(Game.TieredUpgrade('Ig Nobel Prize', '<q>Why reward only your actions and make people skeptical, when you can reward all mundane events that happen?</q>', 'Converter', 10));
C.upAndAchiev.push(Game.TieredUpgrade('sqrt(-1)', '<q>When there\'s nothing left to convert, convert imaginary things</q>', 'Converter', 11));
C.upAndAchiev.push(Game.TieredUpgrade('Hunger', '<q>You\'ve discovered hunger in a tangible form. Put it in your cookies. People who eat them will get hungrier, and will need to eat more cookies.</q>', 'Converter', 12));
C.upAndAchiev.push(Game.TieredUpgrade('Cookie fusion', '<q>Atoms can now push other atoms to force them to merge, and this somehow creates cookies.</q>', 'Converter', 13));
C.upAndAchiev.push(Game.TieredUpgrade('Consumer enlargement', '<q>Not only do they have to eat more, they also can be converted into more.</q>', 'Converter', 14));
C.upAndAchiev.push(Game.TieredUpgrade('Unsweetened quarks', '<q>Filler for your cookies. It doesn\'t taste like anything, but they won\'t notice.</q>', 'Converter', 15));

order = 19000;
C.upAndAchiev.push(Game.TieredUpgrade('Fortune #021', '<q>Nothing ever stays exactly the same.</q>', 'Converter', 'fortune')); Game.Tiers['fortune'].upgrades.push(Game.last);

order = 5000;
C.upAndAchiev.push(Game.SynergyUpgrade('Overgrown plants', '<q>Less maintenence required and you can turn the waste into cookies too!</q>', 'Converter', 'Farm', 'synergy1')); Game.last.icon[2] = icons;
C.upAndAchiev.push(Game.SynergyUpgrade('Clone sacrifice', `</q>Converts one of your clones into <b>one tenth of its cost</b> worth of cookies, every 30 seconds.<q>${Math.random() < 0.1 ? 'How bad can this possibly be?' : 'What could go wrong?'}</q>`, 'Converter', 'You', 'synergy2')); Game.last.icon[2] = icons;
Game.last.buyFunction = function() { Game.Notify('Clone sacrifice', `Conversion of your clones into cookies has began following your purchase of <b>Clone Sacrifice</b>.`, [5, 3, icons]); };
Game.last.tier = 'synergy2';

order = 2700;
C.upAndAchiev.push(Game.TieredAchievement('Probatter', '', 'Converter', 1));
C.upAndAchiev.push(Game.TieredAchievement('Normal atoms', '', 'Converter', 2));
C.upAndAchiev.push(Game.TieredAchievement('Matter doesn\'t', '', 'Converter', 3));
C.upAndAchiev.push(Game.TieredAchievement('Organic master', '', 'Converter', 4));
C.upAndAchiev.push(Game.TieredAchievement('Run the simulation', '', 'Converter', 5));
C.upAndAchiev.push(Game.TieredAchievement('Macroorganisms', '', 'Converter', 6));
C.upAndAchiev.push(Game.TieredAchievement('Scientists cookiefied across the plane', '', 'Converter', 7));
C.upAndAchiev.push(Game.TieredAchievement('Cookies matter', '', 'Converter', 8));
C.upAndAchiev.push(Game.TieredAchievement('Expanding edible expidentures', '', 'Converter', 9));
C.upAndAchiev.push(Game.TieredAchievement('A matter of cookies', '', 'Converter', 10));
C.upAndAchiev.push(Game.TieredAchievement('Use a little fuel', '', 'Converter', 11));
C.upAndAchiev.push(Game.TieredAchievement('Socially accepted delicacy', '', 'Converter', 12));
C.upAndAchiev.push(Game.TieredAchievement('Atomic chair', '', 'Converter', 13));
C.upAndAchiev.push(Game.TieredAchievement('What\'s the cookie with you', '', 'Converter', 14));
C.upAndAchiev.push(Game.TieredAchievement('Always within grasp', '', 'Converter', 15));
C.upAndAchiev.push(Game.ProductionAchievement('Small is never enough', 'Converter', 1)); Game.last.buildingTie = Game.Objects['Converter'];
C.upAndAchiev.push(Game.ProductionAchievement('Limitedly large', 'Converter', 2)); Game.last.buildingTie = Game.Objects['Converter'];
C.upAndAchiev.push(Game.ProductionAchievement('Hexadecimal', 'Converter', 3)); Game.last.buildingTie = Game.Objects['Converter'];
C.upAndAchiev.push(new Game.Achievement('Slender baryons', '', [5, 26])); converter.levelAchiev10 = Game.last; Game.last.ddesc = ''; Game.last.icon[2] = icons;
let converterEnd = C.upAndAchiev.length;

order = 1239.120; //idk but hell hus
//C.upAndAchiev.push(Game.Upgrade(''));

order = 7003;
let spaceDesc = (amount) => amount < 5 ** amount >= 2 ? `<b>${['Doubles', 'Triples', 'Quadruples'][amount-2]}</b> your max space.` : `Multiplies your max space by <b>${amount}</b>.`; 
C.spaceUpgrades = [];
C.upAndAchiev.push(C.spaceUpgrade('Shed', 10, '<q>You can\'t live here, but this will be able to shelter quite a few mice.</q>', 500, [7, 0, icons])); 
C.upAndAchiev.push(C.spaceUpgrade('House', 10, '<q>A nice house for grandmas to bake cookies in.</q>', 500e2, [7, 1, icons]));
C.upAndAchiev.push(C.spaceUpgrade('Field', 10,'<q>Now you can farm and dig all you want.</q>', 500e4, [7, 2, icons]));
C.upAndAchiev.push(C.spaceUpgrade('Warehouse', 10, '<q>A large empty building, ready to be populated with your cookie-creating machines.</q>', 500e6, [7, 13, icons]));
//C.upAndAchiev.push(new Game.Upgrade('Farmland', spaceDesc(10) + '<q>More space for your farms, and whatever else you do to make cookies.</q>', 500e8, [7, 4]));
//C.upAndAchiev.push(new Game.Upgrade('Glacial remnants', spaceDesc(10) + '<q>Who would live here? Perfect for preserving cookies.</q>', 500e8, [7, 14, icons]));
C.upAndAchiev.push(C.spaceUpgrade('Planet', 10, '<q>It\'s about time you got yourself a place large enough to run your business with more privacy.</q>', 500e9, [7, 15, icons]));
C.upAndAchiev.push(C.spaceUpgrade('The future', 10, '<q>Running out of space? Make it a problem for future you instead!</q>', 500e12, [7, 16, icons]));
C.upAndAchiev.push(C.spaceUpgrade('Distant objects', 10, '<q>If very distant objects are moving away from us faster than the speed of light, why not use them to go past the observable universe so you can store more things?</q>', 500e15, [7, 17, icons]));
C.upAndAchiev.push(C.spaceUpgrade('Quantum optimazation', 10, '<q>Almost all of an atom is empty space. Instead of wasting this space, you squeeze down the subatomic particles until cookies are substantially smaller.</q>', 500e18, [7, 18, icons]));
//C.upAndAchiev.push(new Game.Upgrade('More hard drives', spaceDesc(10) + '<q>This is a video game, so maybe you can give more space to your buildings by increasing your digital storage space.</q>', 500e21, [7, 19, icons]));
//C.upAndAchiev.push(new Game.Upgrade('Genetic restructuring', spaceDesc(10) + '<q>One way to get more space is to make everything else smaller. Like people. They won\'t notice as long as they have enough cookies.</q>', 500e24, [7, 28, icons]));

order = 510;
C.upAndAchiev.push(new Game.Upgrade('Box of random stuff we found on the ground', 'Contains... stuff.<q>I don\'t think these are edible.</q>', 400 * Math.pow(10, 15), [34, 12])); 
Game.PrestigeUpgrades.push(Game.last); Game.last.pool = 'prestige'; Game.last.parents = [Game.Upgrades['Box of maybe cookies'], Game.Upgrades['Box of not cookies'], Game.Upgrades['Box of pastries']]; Game.last.posX = -667; Game.last.posY = -1497;
order = 10070;
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'The Running Burrito', desc: 'Just plain chips, not anything special.', icon: [6, 5, icons], require: 'Box of random stuff we found on the ground', power: 5, price: Math.pow(10, 51) }));
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'Playing card', desc: 'Picking this off the floor makes you feel terrible, but not the worst.', icon: [6, 2, icons], require: 'Box of random stuff we found on the ground', power: 5, price: Math.pow(10, 54) }));
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'Jealousy', desc: 'It\'s unclear how you got jealousy in a tangible form, but it definitely has a lot of sugar.', icon: [6, 3, icons], require: 'Box of random stuff we found on the ground', power: 5, price: Math.pow(10, 57) }));
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'Pure black and white cookies', desc: 'You didn\'t eat any of these. So why is one missing?', icon: [0, 4], require: 'Box of random stuff we found on the ground', power: 5, price: Math.pow(10, 60) }));
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'Snow', desc: 'Let it snow, let it snow, let it snow', icon: [30, 22], require: 'Box of random stuff we found on the ground', power: 5, price: Math.pow(10, 60) }));
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'American cheese', desc:'Not legally cheese, likely plastic.', icon: [6, 4, icons], require: 'Box of random stuff we found on the ground', power: 5, price: Math.pow(10, 57) }));
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'Eclipse crisps', desc: 'Crispier than 4/8.', icon: [0, 4], require: 'Box of randoms stuff we found on the ground.', power: 5, price: Math.pow(10, 54) }));

//C.upAndAchiev.push(new Game.Upgrade('Switchblade and bleach','Makes you look different enough to hide from the cops in a church, somehow giving you <b>+10%</b> cookie production.<q>Oh Ponyboy, your hair... your tuff, tuff, hair...</q>',420,[2,2]));
//C.upAndAchiev.push(new Game.Upgrade('Cookieclysm','Gain <b>+100%</b> cookie production.<q>The beginninng.</q>',1,[2,2]));
//C.upAndAchiev.push(new Game.Upgrade('King of the Afterlife',loc('Prestige is <b>%1</b> more effective.<q>Why worship God when you can buy him for 823,543 heavenly chips?</q>','saudh'),1,[15,12]));

//C.upAndAchiev.push(new Game.Upgrade('Twitter account','Opens up Orteil\'s twitter (X).<q>Too many controversies... we need a cookieversy.</q>',41,[17,4]));Game.last.parents=['Cookieclysm'];
//Game.last.buyFunction=function(){window.open('https://twitter.com/orteil42')}

order = 100;
C.upAndAchiev.push(C.transcendentUpgrade('more', 'Gain <b>+%%% ➡ +%%%</b> CpS, permanently, multiplied by your transcend power.<q>cookies<br>cookies<br>i need more<br>I NEED MORE</q>', 1, [29, 6]));//i did not know that zalgo used zero-width characters but ig you learn something new every day
Game.last.scaling = 'medium'; Game.last.increment = 3;
tUSA = 12292023; //Game.last.id; //transcendent Upgrades Start At
order = 200;
C.upAndAchiev.push(C.transcendentUpgrade('Transcendent kittens', 'Kittens are <b>%%% ➡ %%%</b> more powerful.<q>We are not meow mortals.</q>', 9, [18, 35], { scaling: 'hard', increment: 0.5 })); Game.last.parents = [Game.Upgrades['more']];

order = 100000
C.upAndAchiev.push(C.transcendentUpgrade('Unshackle slot #1', 'Choosing an Unshackle upgrade to put it this slot allows you to unshackle the building.', 9, [10, 35])); Game.last.parents = [Game.Upgrades['more']];
C.upAndAchiev.push(C.transcendentUpgrade('Unshackle slot #2', 'Choosing an Unshackle upgrade to put it this slot allows you to unshackle the building.', 81, [10, 35])); Game.last.parents = [Game.Upgrades['Unshackle slot #1']];
C.upAndAchiev.push(C.transcendentUpgrade('Unshackle slot #3', 'Choosing an Unshackle upgrade to put it this slot allows you to unshackle the building.', 6561, [10, 35])); Game.last.parents = [Game.Upgrades['Unshackle slot #2']];
let slots = ['Unshackle slot #1', 'Unshackle slot #2', 'Unshackle slot #3'];

for (var i = 0; i < slots.length; i++) {
	Game.Upgrades[slots[i]].notTiered = true;
	Game.Upgrades[slots[i]].descFunc = function(i) {
		return function(context) {
			if (C.unshackleSlots[i] == -1) return this.desc + (context == 'stats' ? '' : '<br><b>' + loc("Click to activate.") + '</b>');
			var upgrade = Game.UpgradesById[C.unshackleSlots[i]];
			return '<div style="text-align:center;">' + 'Current:' + ' ' + tinyIcon(upgrade.icon) + ' <b>' + upgrade.dname + '</b><div class="line"></div></div>' + this.ddesc + (context == 'stats' ? '' : '<br><b>' + 'Click to activate.' + '</b>');
		};
	}(i);

	Game.Upgrades[slots[i]].activateFunction = function() {
		let slot = slots.indexOf(this.name);
		PlaySound('snd/tick.mp3');
		Game.tooltip.hide();
		let list = [];
		for (let i in Game.Objects) {
			let me = Game.Upgrades[Game.Objects[i].unshackleUpgrade];
			if (me && me.bought) {
				let fail = 0;
				for (let ii in C.unshackleSlots) { if (C.unshackleSlots[ii] == me.id) fail = 1; }//check if not already in another permaslot
				if (!fail) list.push(me);
			}
		}
		list.sort(function(a, b) {
			if (a.order > b.order) return 1;
			else if (a.order < b.order) return -1;
			else return 0;
		});
		let upgrades = '';
		for (let i in list) {
			let me = list[i];
			upgrades += Game.crate(me, '', `PlaySound('snd/tick.mp3');Game.PutUpgradeInPermanentSlot(${me.id}, ${slot});`, `upgradeForPermanent${me.id}`);
		}
		let upgrade = C.unshackleSlots[slot];
		Game.SelectingPermanentUpgrade = upgrade;
		Game.Prompt('<id PickUnshackleUpgrade><h3>' + loc("Pick a building to unshackle") + '</h3>' +
			'<div class="line"></div><div style="margin:4px auto;clear:both;width:120px;"><div class="crate upgrade enabled" style="background-position:' + (-slot * 48) + 'px ' + (-10 * 48) + 'px;"></div><div id="upgradeToSlotNone" class="crate upgrade enabled" style="background-position:' + (-0 * 48) + 'px ' + (-7 * 48) + 'px;display:' + (upgrade != -1 ? 'none' : 'block') + ';"></div><div id="upgradeToSlotWrap" style="float:left;display:' + (upgrade == -1 ? 'none' : 'block') + ';">' + (Game.crate(Game.UpgradesById[upgrade == -1 ? 0 : upgrade], '', '', 'upgradeToSlot')) + '</div></div>' +
			'<div class="block crateBox" style="overflow-y:scroll;float:left;clear:left;width:317px;padding:0px;height:250px;">' + upgrades + '</div>' +
			'<div class="block" style="float:right;width:152px;clear:right;height:234px;">' + loc("Here are all the unshackle upgrades you\'ve bought.<div class=\"line\"></div>Pick one to unshackle it!<div class=\"line\"></div>You can reassign this slot anytime you transcend.") + '</div>'
			, [[loc("Confirm"), 'C.unshackleSlots[' + slot + ']=Game.SelectingPermanentUpgrade;C.buildTranscendTree();Game.ClosePrompt();'], loc("Cancel")], 0, 'widePrompt');
	}
	Game.Upgrades[slots[i]].iconFunction = function(i) {
		return function() {
			return C.unshackleSlots[i] == -1 ? this.icon : Game.UpgradesById[C.unshackleSlots[i]].icon;
		}
	}(i);
}

//new effect scaling (not terrible and hopefully balanced [please no mhur v2])
order = 1000;
C.upAndAchiev.push(C.transcendentUpgrade('Eternal engagement', 'Gain <b>+%%% ➡ +%%%</b> offline CpS.<q>You work faster if you\'re being watched.</q>', 14, Game.season == 'cookieclysm' ? [30, 20] : [1, 5, icons], { scaling: 'soft', increment: 1 })); Game.last.parents = [Game.Upgrades['more']];
C.upAndAchiev.push(C.transcendentUpgrade('Oversweetened rest', 'Your offline CpS gain is increased by <b>+%%% ➡ +%%%</b> per unspent sugar lump, up to 555 sugar lumps.<q>Invest, leave, and come back rich.</q>', 25, [1, 2, icons], { scaling: 'medium', increment: 0.05 })); Game.last.parents = [Game.Upgrades['Eternal engagement']];
C.upAndAchiev.push(C.transcendentUpgrade('Glimmering hope', 'The shimmering veil gains an extra <b>%%% ➡ %%% chance</b> not to break.<q>Glimmeringue with a chance to escape.</q>', 42, [3, 2, icons], { scaling: 'medium', increment: 0.5 })); Game.last.parents = [Game.Upgrades['Oversweetened rest']];
C.upAndAchiev.push(C.transcendentUpgrade('Dedicated evasion', 'Holobore, Spirit of Asceticism gains a chance to not unslot when clicking a golden cookie.<q>But how long can you evade them for?</q>', 67, [21, 18], { scaling: 'soft', increment: 0.01 }));
C.upAndAchiev.push(C.transcendentUpgrade('Locked in', 'After no activity for 5 minutes, cookie production rapidly increases up to <b>+%%% ➡ +%%%</b>.<q>Can\'t move. Can\'t talk. Can only blink.</q>', 128, [29, 2], { scaling: 'hard', increment: 10 }));
C.upAndAchiev.push(C.transcendentUpgrade('A light in the dark', 'Brightens the Shimmering Veil, giving an additional <b>+%%% ➡ +%%%</b> CpS while the Shimmering Veil is active.<q>The light at the end of the tunnel.</q>', 150, [2, 1, icons], { scaling: 'medium', increment: 2 })); Game.last.parents = [Game.Upgrades['Glimmering hope']];
C.upAndAchiev.push(C.transcendentUpgrade('Multitasking', 'You can stay <b>Locked in</b> while doing everything except clicking the cookie.<q>You can\'t move, yet you are.</q>', 100000, [12,31])); Game.last.parents = [Game.Upgrades['Locked in']]; Game.last.notTiered = 1;

C.upAndAchiev.push(C.transcendentUpgrade('Dark momentum', 'Every 1000 clicks grants <b>+%%% ➡ +%%% CpS</b>.<br><div class="warning">Resets on ascension.</div><q>To the moon.</q>', 60, [2, 4, icons], { scaling: 'medium', increment: 0.1 })); Game.last.parents = [Game.Upgrades['more']];
C.upAndAchiev.push(C.transcendentUpgrade('Emotionless', '<q>Why are we still here? Just to suffer...</q>', 99, [1, 1, icons], { scaling: 'hard', increment: 0.2 })); Game.last.parents = [Game.Upgrades['Eternal engagement'], Game.Upgrades['Glimmering hope']];
Game.Upgrades['Locked in'].parents = [Game.Upgrades['Emotionless']]; Game.Upgrades['Dedicated evasion'].parents = [Game.Upgrades['Emotionless']];
C.upAndAchiev.push(C.transcendentUpgrade('Denser minerals', 'All mouse upgrades are buffed by <b>%%% ➡ %%%</b>.<q>Glossier than the shiniest Iridyum.</q>', 150, [0, 1, icons], { scaling: 'hard', increment: 0.1 })); Game.last.parents = [Game.Upgrades['Dark momentum']];
C.upAndAchiev.push(C.transcendentUpgrade('Flexible', 'Gain <b>%%% ➡ %%%</b> <span style="color:#00FFFF">double click chance</span>.<q>Don\'t limit yourself to two fingers.</q>', 100, [2, 3, icons], { scaling: 'hard', increment: 2 })); Game.last.parents = [Game.Upgrades['Denser minerals']];
C.upAndAchiev.push(C.transcendentUpgrade('No hesitation', `Reduces the time it takes for a golden cookie to spawn by <b>%%% ➡ %%%</b>.<q>${Math.random() < 0.1 ? 'When you see a chance, you have to take it and run.' : 'Hesitation is defeat.'}</q>`, 17, [6, 1, icons], { scaling: 'hard', increment: 0.1 })); Game.last.parents = [Game.Upgrades['more']];

C.upAndAchiev.push(C.transcendentUpgrade('Useless treasure', 'Turns that useless silver into white chocolate, granting <b>+%%% ➡ +%%% Alchemy lab CpS</b>.<q>Silver found to also be transmutable into white chocolate!</q>', 3, [6, 30], { scaling: 'hard', increment: 1000 }));
C.upAndAchiev.push(C.transcendentUpgrade('Efficient mana', 'Casting spells uses <b>%%% ➡ %%% less magic</b>.<q>Casting spells is a breeze to you now.</q>', 4, [0, 4, icons], { scaling: 'hard', increment: 0.01 })); Game.last.parents = [Game.Upgrades['Transcendent kittens']];
Game.Upgrades['Useless treasure'].parents = [Game.Upgrades['Efficient mana']];
C.upAndAchiev.push(C.transcendentUpgrade('Cheese', 'Muridal gains some bonuses.', 40, [0, 3, icons], { scaling: 'soft', increment: 1 })); Game.last.parents = [Game.Upgrades['Efficient mana']]; Game.last.descFunc = function() { return this.desc + (this.bought ? '<br>These bonuses are increased by <b>+%%% ➡ +%%%</b>.<q>Swiss cheese, to be exact.</q>' : '') };
C.upAndAchiev.push(C.transcendentUpgrade('Finally, some rest', 'Selebrak gains some bonuses.', 331, [1, 4, icons], { scaling: 'soft', increment: 1 })); Game.last.parents = [Game.Upgrades['Cheese']]; Game.last.descFunc = function() { return this.desc + (this.bought ? '<br>These bonuses are increased by <b>+%%% ➡ +%%%</b>.' : '') + '<q>More festivity, more regret, more cookies.</q>'; };
C.upAndAchiev.push(C.transcendentUpgrade('Fiery storm', 'Wrinklers spawn <b>+%%% ➡ +%%%</b> faster.<q>Within this lapis cookie lies the flames of pure ambition.</q>', 200, [19, 6], { scaling: 'medium', increment: 66 })); Game.last.parents = [Game.Upgrades['No hesitation']];
C.upAndAchiev.push(C.transcendentUpgrade('Mone buff', '', 10, [12, 14], { scaling: 'medium', increment: 1 })); Game.last.parents = [Game.Upgrades['more']]; Game.last.descFunc = function() { this.dname = C.moneName + ' buff'; return `Gain <b>+%%% ➡ +%%%</b> more ${C.moneName} from Clone worlds.<br>Every 3 tiers <b>increases the digit cap</b> of the amount of ${C.moneName} you can gain in the clone world by 1.<q>To climb the mountain faster.<br>Current digit cap: ${Math.floor(Game.Upgrades['Mone buff'].tier/3) + 2} ${Beautify((10 ** (Math.floor(Game.Upgrades['Mone buff'].tier/3) + 2)) - 1)}</q>`; };
C.upAndAchiev.push(C.transcendentUpgrade('Puck', 'Skruuia gains some bonuses.', 14, [2, 2, icons], { scaling: 'medium', increment: 5 })); Game.last.parents = [Game.Upgrades['Finally, some rest']]; Game.last.descFunc = function() { return this.desc + (this.bought ? '<br>These bonuses are increased by <b>+%%% ➡ +%%%</b>.' : '') + '<q>Always left at the bottom.</q>'; };
C.upAndAchiev.push(C.transcendentUpgrade('Mutation', 'Mokalsium gains some bonuses.', 10, [26, 1], { scaling: 'medium', increment: 25 })); Game.last.parents = [Game.Upgrades['Cheese']]; Game.last.descFunc = function() { return this.desc + (this.bought ? '<br>These bonuses are increased by <b>+%%% ➡ +%%%</b>.' : '') + '<q>Descending infinitely, into the fiery abyss.</q>'; };


//post-release upgrades
order = 10070
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'RMS Carpathia', desc: 'The RMS <i>Carpathia</i> was a passenger steamship built between 190&zwnj;2 and 190&zwnj;3. The <i>Carpathia</i> is most famous for saving 705 passengers of the RMS <i>Titanic</i> on April 15th, 191&zwnj;2. Unfortunately, the <i>Carpathia</i> was sunk on July 17th, 191&zwnj;8, during World War I. The <i>Carpathia</i> is named after the Carpathian Mountains, found in central Europe.', icon: [0, 4], require: 'Box of randoms stuff we found on the ground.', power: 5, price: Math.pow(10, 48) }));
C.upAndAchiev.push(C.transcendentUpgrade('Brighter gloves', 'Buffs Aura gloves by <b>+%%% ➡ +%%%</b>.<q>Create a world of light.</q>', 30, [3, 3, icons], { scaling: 'soft', increment: 0.2 })); Game.last.parents = [Game.Upgrades['more']];

order = 8000;
C.upAndAchiev.push(C.cursorUpgrade('Mercury', 'Fun to mess with sometimes.', 5e2, 1));
C.upAndAchiev.push(C.cursorUpgrade('Venus', 'Be different like Venus and spin in the wrong direction.', 5e5, 1));
C.upAndAchiev.push(C.cursorUpgrade('Earth', 'Earth is primarily known as the place where cookies were first invented by humans in the 7th century.', 5e8, 1));
C.upAndAchiev.push(C.cursorUpgrade('Mars', 'Mars is primarily known as the place where cookies were first brought by muskrats in the 21st century.', 5e11, 1));
C.upAndAchiev.push(C.cursorUpgrade('Ceres', 'Not a planet, but a dwarf planet.', 5e15, 1));
C.upAndAchiev.push(C.cursorUpgrade('Jupiter', 'Jupiter is pretty large.', 5e18, 1));
C.upAndAchiev.push(C.cursorUpgrade('Saturn', 'People always credit Saturn for its beautiful rings even though all the gas giants have rings.', 5e21, 1));
C.upAndAchiev.push(C.cursorUpgrade('Uranus', 'Uranus is flipped on its side. This would be cool if the planet was not the subject of many unfortunate jokes.', 5e25, 1));
C.upAndAchiev.push(C.cursorUpgrade('Neptune', 'Neptune is more pale greenish-blue than the usual deep blue depiction.', 5e28, 1));
C.upAndAchiev.push(C.cursorUpgrade('Pluto', 'A runt among giants.', 5e31, 1));
C.upAndAchiev.push(C.cursorUpgrade('Haumea', 'The faster it spins, the more oval it becomes.', 5e34, 1));
C.upAndAchiev.push(C.cursorUpgrade('Makemake', 'Time to makemake some cookies.', 5e37, 1));
C.upAndAchiev.push(C.cursorUpgrade('Eris', 'Eris is the Greek goddess of discord.', 5e40, 1));
C.upAndAchiev.push(C.cursorUpgrade('Oort cloud', 'Your cursors reach this far.', 5e46, 1));
C.upAndAchiev.push(C.cursorUpgrade('Cookie planet', 'The one that all the shipments go to.', 5e50, 1));

order = 10500;
C.upAndAchiev.push(new Game.Achievement('Spender', '', [3, 0, icons])); Game.last.descFunc = function() { this.dname = 'Sp&eacute;nder'; return `Spend <b>100</b> ${C.moneName}.`; };
C.upAndAchiev.push(new Game.Achievement('Bezos', '', [3, 0, icons])); Game.last.descFunc = function() { this.dname = 'B&eacute;zos'; return `Spend <b>10000</b> ${C.moneName}.`; }; Game.last.pool = 'shadow';

C.clysmUpgrades = [];
C.upAndAchiev.push(new Game.Upgrade('Strawberry-flavored worm bait', `Wrinklers appear <b>twice</b> as fast and eat <b>+50%</b> more cookies.<br>You can now attract <b><span style="color: ${C.transcendentPink}">super wrinklers</span></b>.<q>According to legend, super wrinklers are large that are capable of traveling through worlds.</q>`, 1e9, [24, 22])); Game.last.pool = 'prestige';
Game.last.parents = [Game.Upgrades['Rift']]; Game.last.posX = -1125; Game.last.posY = -724;
C.clysmUpgrades = [Game.Upgrades['Strawberry-flavored worm bait']]; //use better implementation later

C.getEffects = function(upgrade, tier) {
	upgrade = Game.Upgrades[upgrade];
	if (!upgrade) return;
	return (tier || upgrade.tier) * (upgrade.increment || console.log(`upgrade ${upgrade.name} has no .increment (real)`));
}
C.getPrice = function(upgrade) {
	upgrade = Game.Upgrades[upgrade];
	if (!upgrade) return;
	let price;
	if (upgrade.scaling  == 'soft') {
		price = upgrade.basePrice * ((upgrade.tier + 1) ** 2);
	}
	else if (upgrade.scaling == 'medium') {
		price = upgrade.basePrice * Math.sqrt((upgrade.tier + 1) ** 5);
	}
	else if (upgrade.scaling == 'hard') {
		price = upgrade.basePrice ** (upgrade.tier + 1);
	}
	return price || 444;
}

C.transcendentUpgrades = [];
for (let upgrade in C.upAndAchiev) {
	let i = C.upAndAchiev[upgrade];
	if (!i.order) i.order = 100000;
	if (i.name == 'NOOO MY CPS') i.pool = 'shadow';
	if (i.pool == 'transcendent' /*i.id >= tUSA && i.id <= tUEA*/) { //o7 tUSA, but after 9 months the time has finally come to fix how transcendent upgrades work
		//i.pool = 'transcendent'; //dont question my decisions ok UPDATE: finally they have their unique pool
		if (!i.notTiered) {
			i.getPrice = function() { return C.getPrice(i.name) };
			i.oldDescFunc = i.descFunc;
			i.descFunc = function() {
				let decimalDigitsInIncrement = parseFloat((i.increment % 1).toFixed(10)).toString().slice(2).length; //dumb thing i need to prevent round-off error
				return (i.oldDescFunc ? i.oldDescFunc() : i.desc).replace('%%', Beautify(C.getEffects(i.name), decimalDigitsInIncrement))
																 .replace('%%', Beautify(C.getEffects(i.name, i.tier+1), decimalDigitsInIncrement));
			} 
		}
		C.transcendentUpgrades.push(i);
	}
	if (i.buildingTie == Game.Objects['Converter'] && i != Game.Objects['Converter'].grandma) {
		i.icon[2] = icons;
		i.iconFunction = function() {
			let icon = [].concat(this.icon);
			if ((Game.season == 'cookieclysm' || Game.baseSeason == 'cookieclysm') && !isNaN(parseInt(this.tier))) icon[0] -= 1;
			return icon;
		}
	}
}
LocalizeUpgradesAndAchievs();
C.stylesheet = document.createElement('link');
C.stylesheet.id = 'cookieclysmCss';
C.stylesheet.rel = 'stylesheet';
C.stylesheet.type = 'text/css';
C.stylesheet.href = 'https://yeetdragon24.github.io/cookieclysm/cookieclysmStyles.css';
document.head.appendChild(C.stylesheet);

new Game.buffType('spirit sniped', function(time, power) {
	return {
		name: 'Spirits sniped',
		desc: 'Your god Stream Sniper is angry at your worship of the Pantheon spirits! The Pantheon is not providing any effects!',
		icon: [1, 0, icons],
		time: time * Game.fps,
		power: power,
		add: true
	}
});
new Game.buffType('famine', function(time, power) {
	return {
		name: 'Famine',
		desc: 'Your god Captain Crozier is angry at your usage of the Garden and is punishing you!',
		icon: [2, 0, icons],
		time: time * Game.fps,
		power: power,
		add: true,
		aura: 2
	}
});

/*
building space
*/
C.space = 0;
C.maxSpace  = 50; //neither of these two are used because the things just get pulled from the functions

//C.spaceValues[i] is the space taken up by a single building of id i
C.spaceValues = [
	1, 10, 50, 25, 25, 10, 25, 10, 25, 25, 15,
	25, 25, 10, Math.floor(Math.random() * 15) + 10,
	25, 5, 100, 250, 10, 25
];
C.getMaxBuildingSpace = function() {
	if (C.ignoreSpace) return Number.MAX_VALUE;
	var buildingSpace = 50;
    /*
	if (Game.Has('Shed')) buildingSpace *= 2;
	if (Game.Has('House')) buildingSpace *= 10;
	if (Game.Has('Field')) buildingSpace *= 10;
	if (Game.Has('Warehouse')) buildingSpace *= 10;
	if (Game.Has('Planet')) buildingSpace *= 10;
	if (Game.Has('Distant objects')) buildingSpace *= 10;
	if (Game.Has('Quantum optimazation')) buildingSpace *= 10;
	if (Game.Has('More hard drives')) buildingSpace *= 10;
	if (Game.Has('Genetic restructuring')) buildingSpace *= 10;
    */
   for (let i in C.spaceUpgrades) {
        if (Game.Has(C.spaceUpgrades[i].name)) buildingSpace *= 10;
   }

	return buildingSpace;
}
C.getBuildingSpace = function() {
	let buildingSpace = 0;

	//let cursorSpace = C.spaceValues[0];
	//if (Game.Has('Thousand fingers')) we'll make it work if cursors need to be nerfed more
	//if (Game.Has('Million fingers')) cursorSpace*=5

    /*
	//unfortunately because of the way cursor upgrades work,
	//their tieredUpgrades property only has the fortune
	for (let i in formatLong) {
		if (formatLong[i].slice(1) != 'thousand') {
			if (Game.Has(formatLong[i].slice(1, 2).toUpperCase() + formatLong[i].slice(2) + ' fingers')) {
				cursorSpace *= 2;
			}
		}
		if (i > Object.keys(Game.Tiers).length - 3) break;
	}
	buildingSpace += cursorSpace * Game.Objects['Cursor'].amount;
    */
	for (let i in Game.ObjectsById) {
		if (i > 0 && !Game.ObjectsById[i].muted) {
			 buildingSpace += C.spaceValues[i] * Game.ObjectsById[i].amount;
		}
	}
	return buildingSpace;
}

C.spaceUnlockThresholds = [5, 20, 50, 100, 250, 500, 750, 1000, 1500, 2500, 3000, 4000, 5000, 6000, 7500].slice(0, C.spaceUpgrades.length); //solution to not knowing how to count
C.unlockSpaceUpgrades = function() {
	/* i'm not using these anymore but might as well keep them commented to make balancing a little easier (it didn't make balancing easier)
	if (Game.BuildingsOwned >= 5) Game.Unlock('Shed'); //50 to 100
	if (Game.BuildingsOwned >= 20) Game.Unlock('House'); //100 to 1000
	if (Game.BuildingsOwned >= 50) Game.Unlock('Field'); //1000 to 10,000
	if (Game.BuildingsOwned >= 100) Game.Unlock('Warehouse'); //10,000 to 100,000
	if (Game.BuildingsOwned >= 250) Game.Unlock('Planet'); //100,000 to 1m
	if (Game.BuildingsOwned >= 500) Game.Unlock('Distant objects'); //1m to 10m
	if (Game.BuildingsOwned >= 750) Game.Unlock('Quantum optimazation'); //10m to 100m
	if (Game.BuildingsOwned >= 1000) Game.Unlock('More hard drives'); //100m to 1b
	if (Game.BuildingsOwned >= 1500) Game.Unlock('Genetic restructuring'); //1b to 10b
	*/
	let highest = -1;
	for (let i in C.spaceUnlockThresholds) {
		if (Game.HasUnlocked(C.spaceUpgrades[i].name)) {
			highest = Number(i);
			continue;
		}
		if (Game.BuildingsOwned >= C.spaceUnlockThresholds[i]) Game.Unlock(C.spaceUpgrades[i].name);
	}
	C.nextSpaceUnlock = C.spaceUnlockThresholds[highest + 1] - Game.BuildingsOwned > 0 ? C.spaceUnlockThresholds[highest + 1] : C.spaceUnlockThresholds[highest + 2];
}

C.getMaxCursors = function() {
    return 50 * C.cursorUpgrades.filter(x => x.bought).length;
}

//no longer used
function checkSpace() {
	if (C.getBuildingSpace() > C.getMaxBuildingSpace()) {
		try { var lastClicked = Game.lastClickedEl.childNodes[2].childNodes[1].innerHTML; } catch (err) { if (Game.Objects['Chancemaker'] > 0) Game.Objects['Chancemaker'].sacrifice(); else if (Game.BuildingsOwned > 0) for (let i in Game.Objects) { if (Game.Objects[i].amount > 0) Game.Objects[i].sacrifice(); } else throw new Error("Building space exceeded limit without last input interacting with building."); Game.loop = function() { } }
		for (i in Game.Objects) {
			if (Game.Objects[i].name == lastClicked) {
				for (let i = 0; i < 3; i++) Game.Objects[i].sacrifice();
			}
		}
	}
} 

C.updateSpaceStat = function() {
    if (Game.onMenu == 'stats') l('spaceAmount').innerHTML = C.getSpaceString();
}

document.querySelectorAll('.productButton.productMute').forEach(x => {
	Game.attachTooltip(x, '<div style="width:150px;text-align:center;font-size:11px;" id="tooltipMuteBuilding"><b>Mute</b><br>Disable this building, giving you a little bit of extra space.</div>');
	x.addEventListener('click', Game.CalculateGains);
});
for (let i in Game.Objects) eval(`Game.Objects['${i}'].cps = ` + Game.Objects[i].cps.toString().replace(`return `, `return Number(!this.muted) * `));
Game.mutedBuildingTooltip=function(id) {
	return function(){
		var me=Game.ObjectsById[id];
		return '<div style="width:150px;text-align:center;font-size:11px;" id="tooltipMutedBuilding">'+(EN?('<b>'+cap(me.plural)+(me.level>0?' (lvl.&nbsp;'+me.level+')':'')+'</b><div class="line"></div>Click to unmute '+me.plural+'<br>(re-enable this building)'):('<b>'+loc("Level %1 %2",[Beautify(me.level),me.plural])+'</b><div class="line"></div>'+loc("Click to unmute")))+'</div>';
	}
}
document.querySelectorAll('.tinyProductIcon').forEach(x => x.addEventListener('click', function() {
	if (C.getBuildingSpace() > C.getMaxBuildingSpace()) {
		Game.ObjectsById[parseInt(this.id.slice(12))].mute(1);
		Game.Popup('Out of space!', Game.mouseX, Game.mouseY);
	} else {
		Game.CalculateGains();
	}
}));

C.ignoreSpace = false;
for (let i in Game.Objects) {
    let building = Game.Objects[i];
    if (i == 'Cursor') {
        eval('building.buy = ' + building.buy.toString().replace(`this.bought++;`,
            `this.bought++;\n\t\t\t\tif (this.amount > C.getMaxCursors()) { PlaySound('snd/buy'+choose([1,2,3,4])+'.mp3',0.75); Game.Popup('Next ring not unlocked!', Game.mouseX, Game.mouseY); bought--; this.bought--; this.amount--; this.refresh(); return false; }`));
    }
    else {
        eval('building.buy = ' + building.buy.toString().replace(`this.bought++;`,
            `this.bought++;\n\t\t\t\tif (!C.ignoreSpace && C.getBuildingSpace() > C.getMaxBuildingSpace()) { PlaySound('snd/buy'+choose([1,2,3,4])+'.mp3',0.75); Game.Popup('Out of space!', Game.mouseX, Game.mouseY); bought--; this.bought--; this.amount--; this.refresh(); C.unlockSpaceUpgrades(); C.updateSpaceStat(); return false; }`)
            .replace(`this.refresh();}`, `this.refresh();\n\t\t\t\t\tC.unlockSpaceUpgrades();\n\t\t\t\t\tif (Game.onMenu == 'stats') l('spaceAmount').innerHTML = C.getSpaceString();\n\t\t\t\t}`));
        eval('building.sell = ' + building.sell.toString().replace(`this.refresh();}`, `this.refresh();\n\t\t\t\t\tif (Game.onMenu == 'stats') l('spaceAmount').innerHTML = C.getSpaceString();\n\t\t\t\t}`));
    }
}
eval('Game.Upgrade.prototype.buy = ' + Game.Upgrade.prototype.buy.toString().replace(`var cancelPurchase=0;`, `var cancelPurchase=0; if (this.canBuy() && !this.bought) { if ((this.bought = 1) && C.getBuildingSpace() > C.getMaxBuildingSpace()) { cancelPurchase = 1; Game.Popup('Out of space!', Game.mouseX, Game.mouseY); } else { C.updateSpaceStat(); } this.bought = 0; } else { }`));

C.getSpaceString = function() {
	return `<div class="listing"><b>Building space: </b>${Beautify(C.getBuildingSpace())}/${Beautify(C.getMaxBuildingSpace())} (${Beautify(Math.floor((C.getBuildingSpace() / C.getMaxBuildingSpace()) * 100))}%)</div>
			<div class="listing"><b>Buildings until next upgrade: </b>${isNaN(SimpleBeautify(C.nextSpaceUnlock - Game.BuildingsOwned)) ? 'all upgrades unlocked' : SimpleBeautify(C.nextSpaceUnlock - Game.BuildingsOwned)}</div>`;
}
C.getSpaceHTML = function() {
	return `<span id="spaceAmount">${C.getSpaceString()}</span>`;
}
//don't do this
Game.UpdateMenu = Function(`
	(${Game.UpdateMenu.toString().replace(`+Game.version+'</div>'+`,`+Game.version+'</div><br>' + C.getSpaceHTML() + '<br><div class="listing"><b>Double click chance: </b>' + Beautify(C.getEffects('Flexible')) + '%</div>'+`)
		.replace(`var prestigeUpgradesOwned=0;`, `var prestigeUpgradesOwned=0;\n\t\tlet transcendentUpgrades = '';`)
		.replace(`cookieUpgrades+=str2;`, `cookieUpgrades+=str2;\n\t\t\telse if (me.pool == 'transcendent') { transcendentUpgrades += str2; }`)
		.replace(`prestigeUpgrades+'</div>'):'')+\n\t\t\t\t'</div>'\n\t\t\t\t):'')+`,
			`prestigeUpgrades+'</div>'):'')+\n\t\t\t\t'</div>'\n\t\t\t\t):'')+\t\t\t\t'</div><div class="subsection">'+\n\t\t\t\t(C.mone > 0 || Game.Has('Neuromancy') ? '<div class="title">Transcendence</div>'+\n\t\t\t\t'<div id="statsTranscend">'+\n\t\t\t\t\t'<div class="listing"><div class="icon" style="float:left;background-image:url(\\'https://yeetdragon24.github.io/cookieclysm/img/iconsheet-c0.6.png\\');background-position:-144px 0px;"></div>'+
						'<div style="margin-top:8px;"><span class="title" style="font-size:22px;">Transcend power: <span style="color: ${C.transcendentPink}">'+Beautify(C.transcendPower)+'</span></span> (Giving <b>+' + C.transcendPower * 100 + '% CpS</b> and <b>+' + C.transcendPower + '% prestige multiplier</b>)<br>' + C.moneName + ' owned: <b>'+Beautify(C.mone)+'</b></div>'+
					'</div><div class="listing" style="clear:left;"><b>Transcendent upgrades tiers purchased: </b>' + C.transcendentTiers + '</div>'+\n\t\t\t\t\t(transcendentUpgrades != '' ? (\n\t\t\t\t\t'<div class="listing crateBox">'+transcendentUpgrades+'</div>') : '')+'</div>' : '')+`)
	})();
`);

Game.Objects['Cursor'].buy

/*
transcend (but outside of logic)
*/
C.mone = 0;
C.moneName = 'Moné';
C.transcendPower = 0;
C.lastTranscendP = 0;
C.moneSpent = 0;
C.dmone = 0;
C.moneMult = 1;
C.transcends = 0;
C.unshackleSlots = [-1, -1, -1];
C.transcendModifier = 0;
C.transcendentTiers = 0;
C.transcendModifierTypes = [
	{
		name: 'Regular',
		desc: 'How are you seeing this?<br>A bug, probably.<br>That would not be good.',
		icon: [23, 0], //empty
	},
	{
		name: 'Hell',
		desc: 'You weren\'t careful and ended up in hell.',
		icon: [15, 5],
	},
	{
		name: 'Rift',
		desc: 'Reality was torn open by a powerful force, and you fell in the crack between reality.',
		icon: [30,2],
	}
];

let GU = Game.UpgradePositions; //i can't spell
//wow this is terrible, not as terrible now
C.getPos = function(posX, posY) { return [Game.bounds.width/2 + (posX * 3), Game.bounds.height/2 + (posY * 3)]; }
C.setTUPos = function(name, posX, posY) { GU[Game.Upgrades[name].id] = C.getPos(posX, posY); }

C.setTUPos('more', 0, 0); //more
C.setTUPos('Transcendent kittens', -60, -100); //kittens
C.setTUPos('Unshackle slot #1', 0, 100); //unshackle #1
C.setTUPos('Unshackle slot #2', 65, 165); //unshackle #2
C.setTUPos('Unshackle slot #3', 150, 190); //unshackle #3

C.setTUPos('Eternal engagement', -600, 14); //eternal engagement
C.setTUPos('Oversweetened rest', -800, -224); //Oversweetened rest
C.setTUPos('Glimmering hope', -900, -100); //glimmering hope
C.setTUPos('Dedicated evasion', -1100, 333); //dedicated evasion
C.setTUPos('Locked in', -1400, 0); //locked in
C.setTUPos('A light in the dark', -1400, 120); //a light in the dark
C.setTUPos('Emotionless', -1150, 150); //Emotionless
C.setTUPos('Multitasking', -1420, 50);

C.setTUPos('Dark momentum', 120, -40); //Dark momentum
C.setTUPos('Denser minerals', 365, -50); //Denser minerals
C.setTUPos('Flexible', 440, -100); //flexible
C.setTUPos('No hesitation', -100, 50);

C.setTUPos('Useless treasure', 100, -270); //Useless treasure
C.setTUPos('Efficient mana', 25, -250); //Efficient mana
C.setTUPos('Cheese', 50, -370); //cheese
C.setTUPos('Finally, some rest', 160, -410); //finally, some rest
C.setTUPos('Fiery storm', -400, 180); //fiery storm
C.setTUPos('Mone buff', -180, 210); //Moné buff
C.setTUPos('Puck', 170, -460); //puck
C.setTUPos('Mutation', -50, -620); //mutation

C.setTUPos('Brighter gloves', 120, 40);

Game.Upgrade.prototype.transcendBuy = function() {
	if (this.pool != 'transcendent' /*this.id < tUSA*/) return false;
	//if (transcendDragging) return false; //this was too annoying
	for (let i of this.parents) if (!i.bought) return false;
	let price = this.getPrice();
	if (C.mone >= price) {
		C.mone -= price;
		C.moneSpent += price;
		if (!Game.Has[this.name]) {
			//this.unlocked=1;
			this.bought = 1;
			C.buildTranscendTree();
		}
		if (!this.notTiered) this.tier++;
		//this.ddesc = this.desc.replace('%%', Beautify(C.getEffects(this.name), Math.min(1, (C.getEffects(this.name) % 1).toString().slice(2).length)));
		if (this.buyFunction) this.buyFunction();
		PlaySound(`snd/buy${choose([1, 2, 3, 4])}.mp3`, 0.75);
		PlaySound('snd/shimmerClick.mp3');
		success = 1;
	}
}
Game.registerHook('check', function() {
	let count = 0;
	for (let i of C.transcendentUpgrades) {
		count += i.tier;
	}
	C.transcendentTiers = count;
});

C.transcend = function(bypass) {
	if (!bypass) Game.Prompt('<id Transcend><h3>' + loc("Transcend") + '</h3><div class="block">' + loc("Are you ready to leave everything behind and travel to a higher realm?") + '</div>', [[loc("Yes"), 'Game.ClosePrompt();C.transcend(1);'], loc("No")]);
	else {
		l('game').appendChild(transcendTransition);
		transcendAnimationStyle();
		setTimeout(function() {
			//Game.ascendUpgradesl.innerHTML='';
			C.buildTranscendTree();
			C.transcendOnResize();

			Game.removeClass('ascending');
			Game.OnAscend = 2;
			C.transcends++;
			
			l('transcend').style.removeProperty('display');
			Game.Background.canvas.style.zIndex = '1000000';

			C.mone += C.transcendPower - C.lastTranscendP;
			C.lastTranscendP = C.transcendPower;
			C.transcendOffXT = -Game.bounds.width / 2;
			C.transcendOffYT = -Game.bounds.height / 2;
			if (C.transcendPower - C.lastTranscendP > 1) C.transcendModifier = choose([0, 0, 0, 1]);
			setTimeout(function() { l('transcendTransition').remove() }, 501);
		}, 3500);
	}
}
C.leaveTranscend = function(bypass) {
	if (!bypass) {
		if (Math.seedrandom) Math.seedrandom('prompt ' + Game.resets);
		Game.Prompt('<id Descend><h3>Descend</h3><div class="block">Are you ready to return to reality?' + (Math.random() < (C.transcendModifier != 0 ? 0.8 : 0.3) ? '<div class="line"></div><span class="red">Things might be a little different than what you\'re used to.</span>' : '') + '</div>', [['Yes', 'Game.ClosePrompt();C.leaveTranscend(1);'], 'No']);
	} else {
		l('game').appendChild(transcendTransition);
		transcendAnimationStyle();
		setTimeout(() => {
			//copied from Game.Ascend() and edited
			Game.Notify('Descending', 'Welcome back, ' + Game.bakeryName, [20, 7], 5);
			Game.killShimmers();
			Game.addClass('ascending');
			Game.choiceSelectorOn = -1;
			Game.AscendOffXT = 0;
			Game.AscendOffYT = 0;
			Game.AscendZoomT = 1;
			Game.AscendZoom = 0.2;
			Game.OnAscend = 1;
			PlaySound('snd/choir.mp3', 0.75)
			
			l('transcend').style.display = 'none';
			Game.Background.canvas.style.removeProperty('z-index');
			
			C.calcTUEffs();

			setTimeout(function() { l('transcendTransition').remove() }, 501)
		},
			3500);
	}
}
function unlockTranscend(load) { //debug
	C.transcendUnlocked = 1;
	C.onUnlockTranscend();
}

Game.shimmersL.style.setProperty('z-index', '1000000');
eval('Game.GetHeavenlyMultiplier = ' + Game.GetHeavenlyMultiplier.toString().replace(`if (Game.Has('Heavenly key')) heavenlyMult+=0.25;`, `if (Game.Has('Heavenly key')) heavenlyMult+=0.25;\n\tif (Game.Has('more')) heavenlyMult += C.transcendPower * C.getEffects('more') / 100;`));

eval('Game.Reset = ' + Game.Reset.toString().replaceAll(`me.pool!='prestige'`, `(me.pool!='prestige' && me.pool!='transcendent')`))

C.calcTUEffs = function() {
	if (!Game.Objects['You'].minigame) return false;
	let effs = Game.Objects['You'].minigame.effs;
	effs.cps = 1 + (C.transcendPower * C.getEffects('more') / 100);
	effs.milk = 1 + (C.getEffects('Transcendent kittens') / 100);
    if (Game.Has('Strawberry-flavored worm bait')) {
        effs.wrinklerSpawn = 2;
        effs.wrinklerEat = 1.5;
    }
}
Game.registerHook('reincarnate', C.calcTUEffs);

Game.Objects['Cursor'].minigame = { effs: {} }; //idk nocap rizzibidi
C.calcDynamicTUEffs = function() {
	if (!Game.Objects['You'].minigame) return false;
	let effs = Game.Objects['You'].minigame.effs;
	let boosts = [];
    
	if (Game.Has('Locked in')) {
		let inactiveTime = Date.now() - (Game.Has('Multitasking') ? (Game.lastClick || Date.now()) : Game.lastActivity);
		if (inactiveTime > 1000 * 300) {
			let afkTime = (inactiveTime - (1000 * 300)) / 1000 / 60;
			boosts.push(Math.max(1, (C.getEffects('Locked in')/100) - (220 * Math.pow(1.1, -0.2 * afkTime)))); //amazing equation, made on desmos
			Game.CalculateGains();
		}
	}
    if (Game.Has('Finally, some rest') && Game.hasGod('seasons')) {
        let mult = 1;
        if (Game.season != '') mult += 0.25;
        if (Game.baseSeason != '') mult + 0.25;
        if (Game.monday) mult -= 0.25;
    }

	let totalBoost = 1;
	for (let boost of boosts) {
		totalBoost *= 1 + boost;
	}
	Game.Objects['Cursor'].minigame.effs.cps = totalBoost;
}

eval('Game.LoadSave=' + Game.LoadSave.toString().replace(`if (Game.Has('Fortune #102')) percent+=1;`, `if (Game.Has('Fortune #102')) percent+=1;\n\t\tpercent*=C.calcOfflineMults();`));
C.calcOfflineMults = function() {
    let mult = 1;
    if (Game.Has('Eternal engagement')) mult *= C.getEffects('Eternal engagement')/100;
    if (Game.Has('Oversweetened rest')) mult *= 1 + (Math.min(Game.lumps, 555) * C.getEffects('Oversweetened rest') / 100);
    if (Game.hasDev && Game.hasDev('capn')) mult *= 1 + (Game.Objects['You'].level * 3);
}

eval(`Game.shimmerTypes['golden'].popFunc=` + Game.shimmerTypes['golden'].popFunc.toString().replace(`if (Game.forceUnslotGod('asceticism')) Game.useSwap(1000000);`, `if (Game.Objects['Temple'].minigame.gods['asceticism'].slot>-1) {if (Math.random() < C.getEffects('Relaxed asceticism') &&  Game.forceUnslotGod('asceticism')) { Game.useSwap(1000000); } else { Game.Notify('Not so dedicated','Your <b>Relaxed Asceticism</b> prevented Holobore from being yeeted from your pantheon.',[21,18]); } }`));

eval(`Game.CalculateGains=`+Game.CalculateGains.toString().replace(`else if (godLvl==3) mult*=1.05;`,`else if (godLvl==3) mult*=1.05;\n\t\t\t\tmult*=1+(C.getEffects('Emotionless')/100);`));


if (Kaizo) {
	Game.setVeilMaxHP = Function(`
		(${Game.setVeilMaxHP.toString().replace(`if (decay.isConditional('veil')) { h *= 1000; }`,`if (decay.isConditional('veil')) { h *= 1000; }\n\tif (Game.Has('Glimmering hope')) { h *= 1 + (C.getEffects('Glimmering hope')) }`)})();	
	`);
	Game.collapseVeil = Function(`
		(${Game.collapseVeil.toString().replace(`Math.random() < 0.1`, `Math.random() < 0.1 * (1 + C.getEffects('A light in the dark'))`)}());
	`);
} else {
	//salt, stone, jar, and chunk (will split probably)
	eval(`Game.getVeilDefense=` + Game.getVeilDefense.toString().replace(`if (Game.Has('Glittering edge')) n+=0.1;`, `if (Game.Has('Glittering edge')) n+=0.1;\n\t\t\ n += C.getEffects('Glimmering hope')/100;`));

	//put in check hook somewhere
	Game.registerHook('check', function() { if (Game.getVeilDefense() > 1) Game.Win('Armored'); });

	//hopefully will make high percentages less annoying (maybe make a pref that is default on for this)
	eval(`Game.loseShimmeringVeil=` + Game.loseShimmeringVeil.toString().replace(`Game.Notify(loc(`, `if (Game.getVeilDefense() < 0.7 || Date.now()-Game.lastClick > 4*Game.getVeilDefense()) Game.Notify(loc(`));

	Game.getVeilBoost = function() {
		var n = 0.5;
		if (Game.Has('Reinforced membrane')) n += 0.1;
		if (Game.Has('Delicate touch')) n += 0.05;
		if (Game.Has('Steadfast murmur')) n += 0.05;
		if (Game.Has('Glittering edge')) n += 0.05;
		if (Game.Has('A light in the dark')) n += (C.getEffects('A light in the dark')/100);
        if (Game.hasDev && Game.hasDev('capn')) {
            n += 0.3 * Game.Objects['You'].level;
        }
		return n;
	}
}

Game.Objects['Alchemy lab'].cps = function(me) {
	var mult = 1;
	mult *= Game.GetTieredCpsMult(me);
	mult *= Game.magicCpS(me.name);
	if (Game.Has('Useless treasure')) {
		mult *= C.getEffects('Useless treasure');
	}
	return me.baseCps * mult;
}

C.onFSR = function() {
	let date = new Date();
	Game.fools = date.getDate() == 1 && date.getMonth() == 3;
    if (Game.fools) {
        let gcPopFunc = Game.shimmerTypes['golden'].popFunc;
        gcPopFunc = Function(`
            (${gcPopFunc.toString().replace(`var choice=choose(list);`,`var choice=choose(list);\n\t\t\t\t\tif (Math.random() < 0.99) choice = 'blab'; else choice = choose(C.foolsAllGC());`)})();
        `);
    }
    Game.monday = date.getDay == 1;
    Game.removeHook('check', C.onFSR);
}
Game.registerHook('check', C.onFSR);
C.foolsAllGC = function() {
    return ['frenzy', 'multiply cookies', 'blood frenzy', 'chain cookie', 'cookie storm', 'everything must go', 'dragonflight', 'cursed finger', 'building special', 'free sugar lump', 'dragon harvest'];
}

//Denser minerals: All mouse upgrade are buffed by [0.1% per tier]
eval(`Game.mouseCps=` + Game.mouseCps.toString().replaceAll(`add+=Game.cookiesPs*0.01`, `add += Game.cookiesPs * 0.01 * (Game.Has('Denser minerals') ? C.getEffects('Denser minerals') / 1000 : 1)`));

//no hesitation
eval(`Game.shimmerTypes['golden'].getTimeMod=` + Game.shimmerTypes['golden'].getTimeMod.toString().replace(`if (Game.Has('Green yeast digestives')) m*=0.99;`,`if (Game.Has('Green yeast digestives')) m*=0.99;\n\t\t\t\t\tif (Game.Has('No hesitation')) m *= 1 - (C.getEffects('No hesitation')/100);`));

//flexible
Game.registerHook('click', () => {
	if (!Game.Has('Flexible')) return false;
	let click = function() {
		let amount = Game.computedMouseCps;
		Game.Earn(amount);
		Game.handmadeCookies += amount;
		if (Game.prefs.particles) {
			Game.particleAdd();
			Game.particleAdd(Game.mouseX, Game.mouseY, Math.random() * 4 - 2, Math.random() * -2 - 2, Math.random() * 0.5 + 0.75, 1, 2);
		}
		if (Game.prefs.numbers) Game.particleAdd(Game.mouseX + Math.random() * 8 - 4, Game.mouseY - 8 + Math.random() * 8 - 4, 0, -2, 1, 4, 2, '', '+' + Beautify(amount, 1));
	}
	let power = C.getEffects('Flexible');
	let extraClicks = 0;
	extraClicks += Math.floor(power / 100);
	if (Math.random() < (power % 100) / 100) extraClicks++;
	for (let i = 0; i < extraClicks; i++) {
		setTimeout(click, (300/extraClicks) * i);
	}
});

//eval('Game.Ascend='+Game.Ascend.toString().replace('Game.AscendZoom=0.2;','Game.AscendZoom=0.2;if (Game.ascensionMode==2) mone+=Game.HowMuchPrestige(Game.cookiesEarned)*C.moneMult;'));

//fiery storm
eval(`Game.UpdateWrinklers=` + Game.UpdateWrinklers.toString().replace(`chance*=Game.eff('wrinklerSpawn');`, `chance*=Game.eff('wrinklerSpawn'); if (Game.Has('Fiery storm')) { chance *= 1 + (C.getEffects('Fiery storm') / 100); /*chance = 1 - Math.pow(1 - chance, 1 + C.getEffects('Fiery storm') / 100);*/ }`));


//puck
for (let i = 0; i < 3; i++) Game.wrinklers.push({id:parseInt(i)+14,close:0,sucked:0,phase:0,x:0,y:0,r:0,hurt:0,hp:Game.wrinklerHP,selected:0,type:0,clicks:0});
Game.wrinklerLimit = 17;
Crumbs.initWrinklers();
Game.getWrinklersMax=function() { //later in this file gets assigned to Game.oldWrinklerMax
    var n=10;
    if (Game.Has('Elder spice')) n+=2;
    n+=Math.round(Game.auraMult('Dragon Guts')*2);
    if (Game.Has('Puck') && Game.hasGod && Game.hasGod('scorn')) n += 4 - Game.hasGod('scorn');
    return Math.min(Game.wrinklerLimit,n);
}
C.puckMult = function(mult) { return 1 + ((mult ?? 1) * C.getEffects('Puck') * (Game.hasGod && Game.hasGod('scorn') ?  4 - Game.hasGod('scorn') : 0) * 0.01) };
C.skruuiaT = 0;
new Game.buffType('cookie rain', function(time, pow) {
    return {
        name: 'Cookie rain',
        desc: `Cookie production +${(pow*100)-100}% for ${Game.sayTime(time*Game.fps, -1)}!`,
        time: time * Game.fps,
        icon: [3, 5],
        multCpS: pow,
        aura: 2
    };
});

C.mokalMult = function(mult) { return 1 + ((mult ?? 1) * C.getEffects('Mutation') * (Game.hasGod && Game.hasGod('mother') ?  4 - Game.hasGod('mother') : 0) * 0.01) };

C.updateTemple = function() {
    if (!Game.Objects['Temple'].minigameLoaded) return false;
    let M = Game.Objects['Temple'].minigame;

    let skruuia = M.gods['scorn'];
    skruuia.activeDescFunc = function() {
        if (!Game.Has('Puck')) return `You don't own <span style="color: ${C.transcendentPink};">Puck</span>`;
        let boost = Math.round((C.getEffects('Puck') / 200) * (4 - Game.hasGod('scorn')) * 1000) / 1000;
        return `<b>Puck bonus:</b><br>
            <div style="text-shadow: none;">
            <span class="green">Max wrinklers: +${4 - Game.hasGod('scorn')}</span><br>
            <span class="green">Shiny wrinkler chance: +${boost * 100}%</span><br>
            <span class="green">Gain +${boost * 1000}% CpS for 6 seconds when popping a wrinkler</span><br>
            <span class="green">Wrinklers digest +${boost * 100}% more cookies</span><br>
            <span class="green">Wrinklers explode into 20 times more cookies</span><br>
            <span class="red">Wrinklers spawn much slower</span><br>
            <span class="red">Wrinklers no longer boost each other</span></div>`;
    };
    skruuia.descAfter = `Gain <b>extra bonuses</b> while slotted from <span style="color: ${C.transcendentPink};">Puck</span>.`;

    let mokalsium = M.gods['mother'];
    mokalsium.activeDescFunc = function() {
        if (!Game.Has('Mutation')) return `You don't own <span style="color: ${C.transcendentPink};">Mutation</span>.`;
        let boost = Math.round((C.getEffects('Mutation') / 100) * (4 - Game.hasGod('mother')) * 1000) / 1000;
        return `<b>Mutation bonus:>/b><br>
            <div style="text-shadow: none;">
            <span class="green">Garden mutations are ${boost}% more common</span></div>`;
    }
    mokalsium.descAfter = `Gain <b>extra bonuses while slotted from <span style="color:${C.transcendentPink};">Mutation</span>.`

    let muridal = M.gods['labor'];
    muridal.activeDescFunc = function() {
        if (!Game.Has('Cheese')) return `You don't own <span style="color: ${C.transcendentPink};">Cheese</span>`;
        let boost = Math.round(C.getEffects('Cheese') * (4 - Game.hasGod('Labor'))* 1000) / 1000;
        return `<b>Cheese bonus:</b><br>
            <div style="text-shadow: none;">
            <span class="green">Portal CpS +${boost * 5}%</span><br>
            <span class="red">Clicks have a chance to get rid of portals</span></div>`;
    }
    muridal.descAfter = `Gain <b>extra bonuses while slotted from <span style="color:${C.transcendentPink};">Cheese</span>.`

    let selebrak = M.gods['seasons'];
    selebrak.activeDescFunc = function() {
        if (!Game.Has('Finally, some rest')) return `You don't own <span style="color: ${C.transcendentPink};">Finally, some rest</span>`;
        return `<b>Finally, some rest bonus:</b><br>
        <div style="text-shadow: none;">
        <span class="green">+25% CpS during a season</span><br>
        <span class="green">+25% CpS during an actual season</span><br>
        <span class="red">???</span><br>
        <span class="red">???</span><br>
        ???<br>`;
    }
    selebrak.descAfter = `Gain <b>extra bonuses while slotted from <span style="color:${C.transcendentPink};">Finally, some rest</span>.`;

    hasGodL = Game.hasGod;

    Game.removeHook('check', C.updateTemple);
};
Game.registerHook('check', C.updateTemple);

C.updateGarden = function() {
    if (!Game.Objects['Farm'].minigame) return false;
    let M = Game.Objects['Farm'].minigame;
    eval('M.getPlantDesc = ' + M.getPlantDesc.toString().replace(`var children='';`, `if (Game.hasDev && Game.hasDev('capn')) { Game.gainBuff('famine', 1000); return '<span class="warning">You were warned not to use the garden.</span>'; }var children='';`));

    let chocoroot = M.plants['chocoroot'];
    chocoroot.effsStr += '<span class="green">&bull; +5-7 chocolate</span>';
    eval('chocoroot.onHarvest = ' + chocoroot.onHarvest.toString().replace('var moni=Math.min(Game.cookies*0.03,Game.cookiesPs*60*3);', 'var moni=Math.min(Game.cookies*0.03,Game.cookiesPs*60*3); C.gainChocolate(Math.floor(Math.random() * 3) + 5)'));
    let wchocoroot = M.plants['whiteChocoroot'];
    wchocoroot.effsStr += '<span class="green">&bull; +3-9 chocolate</span>';
    eval('wchocoroot.onHarvest = ' + wchocoroot.onHarvest.toString().replace('var moni=Math.min(Game.cookies*0.03,Game.cookiesPs*60*3);', 'var moni=Math.min(Game.cookies*0.03,Game.cookiesPs*60*3); C.gainChocolate(Math.floor(Math.random() * 7) + 3)'))
    let mold = M.plants['brownMold'];
    mold.effsStr += '<span class="green">&bull; +0-1 chocolate<span>';
    mold.onHarvest = function() { C.gainChocolate(Math.floor(Math.random() * 2)) };

    Game.removeHook('check', C.updateGarden);
}
Game.registerHook('check', C.updateGarden);

C.moneNameThings = {
	'capn': '',
};

Game.registerHook('check', function() {
	//Game.Upgrades['King of the Afterlife'].ddesc='Prestige is <b>'+(Math.pow(3*(Game.Upgrades['King of the Afterlife'].tier+1),2))+'%</b> more effective.<q>Why worship God when you can buy him for 823,543 heavenly chips?</q>';
	//before anything is bought and also just to make sure
	for (var iiii in C.moneNameThings) {
		if (Game.hasDev) {
			if (Game.hasDev(iiii)) C.moneName = C.moneNameThings[iiii];
			else C.moneName = 'Moné';
		} else C.moneName = 'Moné';
	}
	if (l('C.moneName')) l('C.moneName').innerHTML = C.moneName;

	if (l('transcendModIcon')) {
		let tranModIcon = C.transcendModifierTypes[C.transcendModifier].icon;
		l('transcendModIcon').style.backgroundPosition = `${tranModIcon[0] * -48}px ${tranModIcon[1] * -48}px`;

	}
});

//Game.registerHook('reset',function(hard){l('C.transcendPower').innerHTML=C.transcendPower;});

Game.Has = function(what) {
	//console.log(Game.Has.caller);
	var it = Game.Upgrades[what];
	if (what.toLowerCase().includes('unshackled')) {
		if (it && it.buildingTie) return it.bought && C.unshackleSlots.includes(i.id);
	}
	if (it && Game.ascensionMode == 1 && (it.pool == 'prestige' || it.tier == 'fortune')) return 0;
	return (it ? it.bought : 0);
}

/*
	CLONE WORLD
*/
C.unlockCloneWorld = function() {
	let nextAvailAscendMode = 1017; //Object.keys(Game.ascensionModes).length;
	if (!Game.ascensionModes[nextAvailAscendMode]) {
		Game.ascensionModes[nextAvailAscendMode] = {
			name: 'Clone world',
			dname: 'Clone world',
			desc: `This is a strange copy of a world only loosely bound to heaven, where many of your Heavenly Upgrades will not work.<div class="line"></div>You will be able to earn <b>${C.moneName}</b> in this world, instead of heavenly chips.`,
			icon: [10, 21]
		}
	}
}

function getFuncDef(func) { return func.toString().slice(func.toString().indexOf('{') + 1, -1) }

Game.attachTooltip(l('heralds'), function() {
	var str = '';

	if (!App && !Game.externalDataLoaded) str += loc("Heralds couldn't be loaded. There may be an issue with our servers, or you are playing the game locally.");
	else {
		if (!App && Game.heralds == 0) str += loc("There are no heralds at the moment. Please consider <b style=\"color:#bc3aff;\">donating to our Patreon</b>!");
		else {
			str += '<b style="color:#bc3aff;text-shadow:0px 1px 0px #6d0096;">' + loc("%1 herald", Game.heralds) + '</b> ' + loc("selflessly inspiring a boost in production for everyone, resulting in %1.", '<br><b style="color:#cdaa89;text-shadow:0px 1px 0px #7c4532,0px 0px 6px #7c4532;"><div style="width:16px;height:16px;display:inline-block;vertical-align:middle;background:url(img/money.png);"></div>' + loc("+%1% cookies per second", Game.heralds) + '</b>');
			str += '<div class="line"></div>';
			if (Game.ascensionMode == 1) str += loc("You are in a <b>Born again</b> run, and are not currently benefiting from heralds.");
			else if (Game.ascensionMode == 2) str += 'You are in a <b>Clone world</b>, and are not currently benefitting from heralds.';
			else if (Game.Has('Heralds')) str += loc("You own the <b>Heralds</b> upgrade, and therefore benefit from the production boost.");
			else str += loc("To benefit from the herald bonus, you need a special upgrade you do not yet own. You will permanently unlock it later in the game.");
		}
	}
	str += '<div class="line"></div><span style="font-size:90%;opacity:0.6;">' + (!App ? loc("<b>Heralds</b> are people who have donated to our highest Patreon tier, and are limited to 100.<br>Each herald gives everyone +1% CpS.<br>Heralds benefit everyone playing the game, regardless of whether you donated.") : loc("Every %1 current players on Steam generates <b>1 herald</b>, up to %2 heralds.<br>Each herald gives everyone +1% CpS.", [100, 100])) + '</span><div class="line"></div>' + tinyIcon([21, 29]);

	str += '<div style="width:31px;height:39px;background:url(img/heraldFlag.png);position:absolute;top:0px;left:8px;"></div><div style="width:31px;height:39px;background:url(img/heraldFlag.png);position:absolute;top:0px;right:8px;"></div>';

	return '<div style="padding:8px;width:300px;text-align:center;" class="prompt" id="tooltipHeralds"><h3>' + loc("Heralds") + '</h3><div class="block">' + str + '</div></div>';
}, 'this');
eval('Game.LoadSave = ' + Game.LoadSave.toString().replaceAll('Game.ascensionMode!=1', 'Game.ascensionMode<1'));
Game.Reset = new Function('hard', getFuncDef(Game.Reset).replaceAll('Game.ascensionMode!=1', 'Game.ascensionMode<1'));
Game.loadLumps = new Function('time', getFuncDef(Game.loadLumps).replaceAll('Game.ascensionMode!=1', 'Game.ascensionMode<1'));
Game.canLumps = new Function(getFuncDef(Game.canLumps).replaceAll('Game.ascensionMode!=1', 'Game.ascensionMode<1'));
Game.doLumps = new Function(getFuncDef(Game.doLumps).replaceAll('Game.ascensionMode!=1', 'Game.ascensionMode<1'));
Game.CalculateGains = new Function(getFuncDef(Game.CalculateGains).replaceAll('Game.ascensionMode!=1', 'Game.ascensionMode<1'));
Game.Has = new Function('what', getFuncDef(Game.Has).replace('Game.ascensionMode==1', 'Game.ascensionMode>=1'));
Game.Logic = new Function(getFuncDef(Game.Logic).replace(`(Game.Has('Legacy') && Game.ascensionMode!=1)`, `(Game.Has('Legacy') && Game.ascensionMode<1)`));
Game.Logic = new Function(getFuncDef(Game.Logic).replace(`loc("Your prestige level is currently <b>%1</b>.<br>(CpS +%2%)",[Beautify(Game.prestige),Beautify(Game.prestige)]);`,
	`(Game.ascensionMode<2?'Your prestige level is currently <b>'+Beautify(Game.prestige)+'</b>.<br>(CpS +'+Beautify(Game.prestige)+'%)':'You currently have <b>'+Beautify(C.mone)+' '+C.moneName+'</b>.');`));
Game.Logic = new Function(getFuncDef(Game.Logic).replace(`loc("Ascending now would grant you no prestige.");`, `loc("Ascending now would grant you no "+(Game.ascensionMode<2?'prestige':C.moneName)+".");`));
Game.Logic = new Function(getFuncDef(Game.Logic).replace(`loc("Ascending now would grant you<br><b>1 prestige level</b> (+1% CpS)<br>and <b>1 heavenly chip</b> to spend.")`,
	`loc("Ascending now would grant you<br><b>1 "+(Game.ascensionMode<2?'prestige levels':C.moneName)+"</b>"+(Game.ascensionMode<2?' (+1% CpS)<br>and <b>1 heavenly chip</b> to spend':'.'))`));
Game.Logic = new Function(getFuncDef(Game.Logic).replace(`var chipsOwned=Game.HowMuchPrestige(Game.cookiesReset);`, `var maxAmount = (10 ** (Math.floor(Game.Upgrades['Mone buff'].tier/3) + 2)) - 1; var chipsOwned=(Game.ascensionMode<2?Game.HowMuchPrestige(Game.cookiesReset):0);`));
Game.UpdateAscendIntro = new Function(getFuncDef(Game.UpdateAscendIntro).replace(`Game.EarnHeavenlyChips(Game.cookiesEarned);`,
	`if (Game.ascensionMode<2)Game.EarnHeavenlyChips(Game.cookiesEarned);else C.mone+=Math.min((10 ** (Math.floor(Game.Upgrades['Mone buff'].tier/3) + 2)) - 1, Math.floor(Game.HowMuchPrestige(Game.cookiesEarned))*C.moneMult)`));
Game.Logic = new Function(getFuncDef(Game.Logic).replace(`loc("Ascending now would grant you<br><b>%1 prestige levels</b> (+%2% CpS)<br>and <b>%3 heavenly chips</b> to spend.",[Beautify(ascendNowToGet),Beautify(ascendNowToGet),Beautify(ascendNowToGet)]);`,
	`"Ascending now would grant you<br><b>"+Beautify(ascendNowToGet)+" "+(Game.ascensionMode<2?'prestige levels':C.moneName)+"</b> "+(Game.ascendMode < 2 ? '(+%2% CpS)<br>and <b>%3 heavenly chips</b> to spend.' : '');`
));
Game.Logic = new Function(getFuncDef(Game.Logic).replace('var ascendNowToOwn=Math.floor(Game.HowMuchPrestige(Game.cookiesReset+Game.cookiesEarned));',
	'var ascendNowToOwn=Math.min(Game.ascensionMode < 2 ? Infinity : maxAmount, Math.floor(Game.HowMuchPrestige((Game.ascensionMode<2?Game.cookiesReset:0)+Game.cookiesEarned)));'
));
//probably a better way to do this but im lazy
Game.Logic = new Function(getFuncDef(Game.Logic).replace('var cookiesToNext=Game.HowManyCookiesReset(ascendNowToOwn+1)-(Game.cookiesEarned+Game.cookiesReset);',
	'var cookiesToNext=Game.HowManyCookiesReset(ascendNowToOwn+1)-(Game.cookiesEarned+0);'
));
Game.Logic = new Function(getFuncDef(Game.Logic).replace(`(EN?'Ascending! ':(loc("Ascending")+' | '))`,`(Game.OnAscend == 1?(EN?'Ascending! ':(loc("Ascending")+' | ')):'Transcending | ')`));
//now that i think about it, all of this code couldve been made in a better well but its too late now i guess


//Kaizo Compatibility
C.onKaizo = function() { 
    Game.Upgrades['Glimmering hope'].desc = 'The shimmering veil gains an extra <b>%% ➡ %% chance</b> base health.';
    Game.Upgrades['Glimmering hope'].increment = 20;
    Game.Achievements['Armored'].desc = 'Have <b>1000 or more</b> base health on your Shimmering veil.';

    Game.Upgrades['A light in the dark'].descFunc = function() { return `Your Sparkling Wonder is <b>%%% ➡ %%%</b> more likely to save your Shimmering veil when it collapses. (Total: ${0.1 * (1 + C.getEffects(this.name)/100)})` };
    Game.Upgrades['A light in the dark'].increment = 5;
    
}

C.drawTranscend = function(ctx) {
	Game.Background.clearRect(-1000, -1000, l('backgroundCanvas').width * 10, l('backgroundCanvas').height * 10);
	Game.Background.fillStyle = 'black';

	Game.Background.save();

	ctx.globalAlpha = 1;
	ctx.fillRect(-1000, -1000, 10000, 10000);
	ctx.globalAlpha = 0.5;
	ctx.globalCompositeOperation = 'lighter';

	var w = ctx.canvas.width;
	var h = ctx.canvas.height;
	var b = Game.ascendl.getBounds();
	var x = (b.left + b.right) / 2;
	var y = (b.top + b.bottom) / 2;
	ctx.globalAlpha = (0.15 * Math.sin((Math.PI * Game.drawT) / 2800)) + 0.2; 
	var s = 1 * (1 + Math.cos(Game.T * 0.0027) * 0.05);
	ctx.fillPattern(Pic('starbg.jpg'), 0, 0, w, h, 1024 * s, 1024 * s, x * 0.00125 * s, y * 0.00125 * s);
	Timer.track('star layer 1');

	//updateTranscendObjects(ctx);

	Game.Background.restore();
}

let transcendentObjects = [];
let TranscendentObject = function(obj) {
	let object = new Crumbs.object(obj);
	object.baseX = object.x;
	object.baseY = object.y;
	object.baseScaleX = object.scaleX;
	object.baseScaleY = object.scaleY;
	object.behaviors.unshift(new Crumbs.behaviorInstance(function() {
		this.x = (this.baseX + C.transcendOffX) * C.transcendZoom;
		this.y = (this.baseY + C.transcendOffY) * C.transcendZoom;
		this.scaleX = this.baseScaleX * C.transcendZoom;
		this.scaleY = this.baseScaleY * C.transcendZoom;
	}));
}

Game.registerHook('draw', function() {
	if (Game.OnAscend == 2) C.drawTranscend(typeof CrumbsEngineLoaded !== 'undefined' ? Crumbs.getCanvasByScope('transcend') : Game.Background);
});

//youpocalypse
C.youWrath = 0; //i honestly have no idea why i am using youWrath beyond 2

C.cookieclysm = false;
C.cloneSacInterval = 30;

function inRect(x, y, rect) {
	//find out if the point x,y is in the rotated rectangle rect{w,h,r,o} (width,height,rotation in radians,y-origin) (needs to be normalized)
	//I found this somewhere online I guess
	var dx = x + Math.sin(-rect.r) * (-(rect.h / 2 - rect.o)), dy = y + Math.cos(-rect.r) * (-(rect.h / 2 - rect.o));
	var h1 = Math.sqrt(dx * dx + dy * dy);
	var currA = Math.atan2(dy, dx);
	var newA = currA - rect.r;
	var x2 = Math.cos(newA) * h1;
	var y2 = Math.sin(newA) * h1;
	if (x2 > -0.5 * rect.w && x2 < 0.5 * rect.w && y2 > -0.5 * rect.h && y2 < 0.5 * rect.h) return true;
	return false;
}

Game.oldWrinklerMax = Game.getWrinklersMax;
Game.getWrinklersMax = function() {
	return C.bigCookieGone ? 0 : Game.oldWrinklerMax();
}
C.updateYoupocalypse = function() {
	if (C.youWrath == 0) {
		if (Game.Has('Clone sacrifice')) {
			if (Game.T % (Game.fps * C.cloneSacInterval) == 0) {
				if (C.sacrificeClone()) C.youWrath = 1;
				return;
			}
		}
	} else if (C.youWrath >= 1 && C.youWrath < 2) {
		if (Game.T % (Game.fps * C.cloneSacInterval) == 0) {
			if (C.sacrificeClone()) C.youWrath += 0.02;
			l('productName' + Game.Objects['You'].id).style.color = `rgba(255, ${255-((C.youWrath-1)*255)}, ${255-((C.youWrath-1)*255)}, 1)`;
		}
	} else if (Math.round(C.youWrath * 1000) / 1000 == 2) {
		PlaySound('snd/cookieBreak.mp3');
		C.youWrath = 2.9;
	} else if (C.youWrath == 2.9) {
        Crumbs.findObject('bigCookie').enabled = true;
        C.youWrath = 3;
        C.doCookieFalling = true;
        Game.CollectWrinklers();
	}
}

C.sacrificeClone = function() {
	if (Game.Objects['You'].amount > 0) {
		Game.Objects['You'].sacrifice();
		let cash = Game.Objects['You'].getPrice() * 0.1;
		let message = choose(['They don\'t appear happy.', 'I\'m sure it\'s fine.', 'Probably not important.', 'They might not like this.']);
		Game.Notify('Sacrifice', `One of your clones has been sacrificed, granting you <b>${Beautify(cash)} cookies</b>. ${message}`, [5, 3, icons], 10);
		Game.cookies += cash;
		return true;
	} else return false;
}

C.cookieFallingTimer = 0;
C.doCookieFalling = false;
C.bigCookieGone = false;
//preload the sounds so it's not delayed during the animation
if (!Sounds['snd/thud.mp3']) PlaySound('snd/thud.mp3', 0.01);
if (!Sounds['snd/cookieBreak.mp3']) PlaySound('snd/cookieBreak.mp3', 0.01);
Crumbs.findObject('bigCookie').findChild('bigCookieDisplay').behaviors.push({f: function() {if (C.doCookieFalling) [this.x, this.y, this.rotation] = C.cookieFallingAnimation(C.cookieFallingTimer)}})
C.cookieFallingAnimation = function(frame) {
	if (frame > 150) return C.cookieFallingTimer = 0, C.doCookieFalling = false, [0, 2000, 0];
	let x = 0, y = 0, rotation = 0;
	y += 1.5 * Math.max(0, frame - 30) ** 2;
	rotation += (Math.max(0.25 * (frame - 25) ** 1.7, 0) * Math.PI / 180);
	
	Game.milkH = Math.max(-1, Game.milkH - 0.02);
	if (frame == 90) {
		PlaySound('snd/thud.mp3');
	} else if (frame > 90 && frame < 120) {
		Game.wrapper.style.left = Math.floor(Math.random() * Math.sqrt(150 - frame)) + 'px';
		Game.wrapper.style.top = Math.floor(Math.random() * Math.sqrt(150 - frame)) + 'px';
	} else if (frame == 120) {
		Game.wrapper.style.removeProperty('left');
		Game.wrapper.style.removeProperty('top');
	} else if (frame == 150 && !Game.Upgrades['Rift'].bought) {
		C.transcend(1);
		C.toggleBigCookie(0);
		Game.milkH = 0;
		setTimeout(C.afterCookieFall, 3700);
	}
	return C.cookieFallingTimer++, [x, y, rotation];
}
C.toggleBigCookie = function(on) {
	if (on) {
		l('bigCookie').style.removeProperty('display');
		C.bigCookieGone = false;
		Game.Loader.Replace('brokenCookie.png', 'brokenCookie.png');
		Game.Loader.Replace('brokenCookieHalo.png', 'brokenCookieHalo.png');
		Game.Loader.Replace('shineSpoke.png', 'shineSpoke.png');
	} else {
		l('bigCookie').style.display = 'none';
		C.bigCookieGone = true;
		let blank = 'filler.png';
		Game.Loader.Replace('brokenCookie.png', blank);
		Game.Loader.Replace('brokenCookieHalo.png', blank);
		Game.Loader.Replace('shineSpoke.png', blank);
	}
}
C.afterCookieFall = function() {
    let upgrade = Game.Upgrades['Rift'];

    let str = '';
	str += `<div class="icon" id="puck" style="${writeIcon([upgrade.icon[0], upgrade.icon[1]])}"></div>`;
	l('transcendContent').innerHTML = str;

	puck.addEventListener('mouseover', function() {
		l('puck').style.opacity = 0.7;
	});
	puck.addEventListener('mouseout', function() {
		l('puck').style.opacity = 0.5;
	});
	puck.addEventListener('click', function() {
		if (upgrade.buy()) {	
			Game.attachTooltip(l('puck'), '');
			C.leaveTranscend(1);
		}
	});
	Game.attachTooltip(puck, function() { return Game.crateTooltip(upgrade, 'transcend') }, 'this');
    
	C.transcendOffX = C.transcendOffXT = 0;
	C.transcendOffY = C.transcendOffYT = 0;
}

C.bigCookieUpdate = function(ctx, goodBuff) {
	ctx.globalAlpha = 1;
	let s = 256 * Game.BigCookieSize;
	let x = Game.cookieOriginX;
	let y = Game.cookieOriginY;
	let rot = 0;
	ctx.save();
	if (C.doCookieFalling) {
		let position = C.cookieFallingAnimation(C.cookieFallingTimer);
		x += position[0];
		y += position[1];
		rot += position[2];
	}
	if (!C.bigCookieGone) {
		if (Game.prefs.fancy) ctx.drawImage(Pic('cookieShadow.png'), x-s/2, y-s/2+20, s, s);
		ctx.translate(x, y);
		if (Game.season== 'easter') {
			let nestW = 304 * 0.98 * Game.BigCookieSize;
			let nestH = 161 * 0.98 * Game.BigCookieSize;
			ctx.drawImage(Pic('nest.png'), -nestW / 2, -nestH / 2 + 130, nestW, nestH);
		}
		//ctx.rotate(((Game.startDate%360)/360)*Math.PI*2);
		ctx.rotate(rot);
		ctx.drawImage(Pic('perfectCookie.png'), -s / 2, -s / 2, s, s);
		ctx.rotate(-rot);
	}
	if (goodBuff && Game.prefs.particles) {
		ctx.globalCompositeOperation = 'lighter';
		for (let i = 0; i < 1; i++) {
			ctx.globalAlpha = Math.random() * 0.65 + 0.1;
			var size = Math.random() * 30 + 5;
			var a = Math.random() * Math.PI * 2;
			var d = s * 0.9 * Math.random() / 2;
			ctx.drawImage(Pic('glint.png'), -size / 2+Math.sin(a) * d, -size / 2 + Math.cos(a) * d, size, size);
		}
	}
	
	ctx.restore();
	Timer.track('big cookie');
}
eval(`Game.Logic = ` + Game.Logic.toString().replace(`Game.milkH=Math.min(1,Game.milkProgress)*0.35;`, `if ((!C.doCookieFalling) || Game.AscendTimer > 0) Game.milkH=Math.min(1,Game.milkProgress)*0.35;`));

C.getAdjacentWrinklers = function(id) {
	let max = Game.getWrinklersMax(); //formula by limes and helloperson
	return [Game.wrinklers[(id - 1 + max) % max], Game.wrinklers[(id + 1 + max) % max]];
}

Game.ResetWrinklers = function() {
	for (var i in Game.wrinklers) {
		Game.wrinklers[i]={id:parseInt(i),close:parseInt(Game.wrinklers[i].type)==2?2:0,sucked:0,phase:parseInt(Game.wrinklers[i].type)==2?2:0,x:0,y:0,r:0,hurt:0,hp:parseInt(Game.wrinklers[i].type)==2?Game.wrinklers[i].hp:Game.wrinklerHP,selected:0,type:parseInt(Game.wrinklers[i].type)==2?2:0,clicks:0,ants:[]};
	}
}

C.antCookies = 0;
C.antPositions = [
    {x: 20, y: 20, r: (230 * Math.PI) / 180}, //top right
    {x: -20, y: 27, r: (75 * Math.PI) / 180}, //top left
    {x: 30, y: 55, r: (325 * Math.PI) / 180}, //middle right
    {x: -25, y: 60, r: (115 * Math.PI) / 180}, //middle left
    {x: 25, y: 100, r: (235 * Math.PI) / 180}, //bottom right
    {x: -25, y: 105, r: (30 * Math.PI) / 180}, //bottom left
    {x: -7, y: 150, r: (20 * Math.PI) / 180}, //very bottom
]
C.drawAnts = function(wrinkler, ctx, sw, sh) {
    if (C.cookieclysm && Math.random() < 0.05) C.gainAnt(wrinkler.id, -1);
    for (let i in wrinkler.ants) {
        let ant = wrinkler.ants[i];
        let fading = false;
        let yOffset = 0;
        if (ant.life < 45 && ant.life >= 0) {
            fading = true;
            ant.life++;
            yOffset = 45 - ant.life;
            ctx.globalAlpha = ant.life / 45;
            if (ant.life == 45) Game.CalculateGains();
        }
        if (ant.life < 0) {
            fading = true;
            ant.life--;
            yOffset = -ant.life;
            ctx.globalAlpha = 1 - (ant.life / -45);
            if (ant.life <= -45) C.loseAnt(wrinkler.id, i, true);
        }
        ctx.translate(C.antPositions[ant.pos].x * (sw / 100), C.antPositions[ant.pos].y * (sh / 200));
        ctx.rotate(C.antPositions[ant.pos].r);
        ctx.drawImage(Pic(`${icons}`), 384, 0, 48, 48, -24, yOffset - 24, 48*(sh/200),48*(sw/100));
        ctx.rotate(-C.antPositions[ant.pos].r);
        ctx.translate(-(C.antPositions[ant.pos].x * (sw / 100)), -(C.antPositions[ant.pos].y * (sh / 200)));
        if (fading) ctx.globalAlpha = 1;
        if (ant.life == 45) {
            if (Math.random() < 0.001) C.loseAnt(wrinkler.id, i, false);
            ant.cookies += (((Game.cookiesPs/Game.fps)*Game.cpsSucked)) / 20;
        }
    }
}
/*
eval(`Game.SpawnWrinkler = ` + Game.SpawnWrinkler.toString().replace(`if (Math.random()<0.0001) me.type=1;//shiny wrinkler`, `if (Math.random()<0.0001*C.puckMult()) me.type=1;//shiny wrinkler\n\t\t\tif (Game.Has('Flaming worm') && Math.random() < 0.005) { me.super = true; C.getAdjacentWrinklers(me.id).forEach(x => x.hp = 0); }`));
eval(`Game.UpdateWrinklers = ` + Game.UpdateWrinklers.toString().replace(`var d=128*(2-me.close);`, `if (me.super) {\n\t\t\t\t\t\tif (me.hp == Game.wrinklerHP) me.hp = 100 * Math.max(C.transcendPower, 1) + 0.5;\n\t\t\t\t\t}\n\t\t\t\t\tvar d=128*(2-me.close);`)
		.replace(`if (me.type==1) toSuck*=3;`, `if (me.type==1) toSuck*=3;\n\t\t\t\t\tif (me.super) toSuck *= 1.5;\n\t\t\t\t\tif (Game.Has('Puck') && Game.hasGod && Game.hasGod('scorn')) toSuck *= 20;`)
		.replace(`if (Game.prefs.particles)`, `if (Game.prefs.particles && !me.super)`)
		.replace(`Game.Win('Last Chance to See');`, `Game.Win('Last Chance to See')\n\t\t\t\t\tif (me.super) { Game.Win('Magenta worm'); }`)
		.replace(`!(me.hp<=0.5 && me.phase>0)`, `!(me.hp<=0.5 && me.phase>0) && !me.super`)
		.replace(`me.hp-=0.75;`, `if (me.super) { if (Math.random() < 0.2) Game.Popup('<span style="font-size:80%">Blocked!</span>', Game.mouseX, Game.mouseY); else me.hp--; } else { me.hp -= 0.75 }`)
		.replace(`Math.random()<chance`, `Math.random()<chance && !C.bigCookieGone && C.cookieFallingTimer == 0 && !C.getAdjacentWrinklers(me.id).find(x => x.super)`)
        .replace(`if (Game.season=='halloween')`, `if (Game.Has('Puck') && Game.hasGod && Game.hasGod('scorn')) Game.gainBuff('cookie rain', 6, C.puckMult(2));\n\t\t\t\t\t\tif (Game.season=='halloween')`)
        .replace(`(((Game.cookiesPs/Game.fps)*Game.cpsSucked))`, `(Game.Has('Puck') && Game.hasGod && Game.hasGod('scorn')) ? (((Game.cookiesPs/Game.fps)*Game.cpsSucked)) : (Game.cookiesPs/Game.fps)*0.05*C.puckMult()`)
        .replace(`if (Game.Has('Wrinkler doormat')) chance=0.1;`, `if (Game.Has('Wrinkler doormat')) chance=0.1;\n\t\t\t\t\tif (Game.Has('Puck') && Game.hasGod && Game.hasGod('scorn')) chance = Math.pow(Math.max(0,(C.wrinklerT-(Game.fps*60))/((Game.fps*300)-(Game.fps*60))),5)`)
        .replace(`var xBase=0;`, `C.wrinklerT++;\n\t\t\tvar xBase=0;`)
        .replace(`Game.SpawnWrinkler(me);`, `Game.SpawnWrinkler(me);\n\t\t\t\t\t\tC.wrinklerT = 0;`)
);
eval(`Game.DrawWrinklers = ` + Game.DrawWrinklers.toString().replace(`'winterWrinkler.png';`, `'winterWrinkler.png';\n\t\t\t\t\tif (me.super) pic = 'https://yeetdragon24.github.io/cookieclysm/img/superWrinkler2.png'`)
		.replace(`if (Game.prefs.fancy)`, `if (me.super) { sw *= 1.25; sh *= 1.25; }\n\t\t\t\t\tif (Game.prefs.fancy)`)
		.replace(`ctx.fillRect(x-width/2-8-10,y-23,width+16+20,38);`, `ctx.fillRect(x-width/2-8-10,y-23,width+16+20,selected.super ? 38 * 2 : 38);`)
		.replace(`ctx.strokeRect(x-width/2-8-10+1.5,y-23+1.5,width+16+20-3,38-3);`, `ctx.strokeRect(x-width/2-8-10+1.5,y-23+1.5,width+16+20-3,(selected.super ? 38 * 2 : 38)-3);`)
		.replace(`selected.sucked),x+10,y+8);`, `selected.sucked),x+10,y+8);\n\t\t\t\tif (selected.super) {\n\t\t\t\t\tctx.fillText('Health:', x+14, y+24);\n\t\t\t\t\tctx.fillText(Beautify(selected.hp - 0.5, 1), x+10, y+40);\n\t\t\t\t}`)
		.replace(`ctx.drawImage(Pic('icons.png'),27*48,26*48,48,48,x-width/2-16-s/2,y-4-s/2,s,s);`, `ctx.drawImage(Pic('icons.png'),27*48,26*48,48,48,x-width/2-16-s/2,y-4-s/(selected.super ? 5 : 2),s,s);`)
        .replace(`ctx.drawImage(Pic(pic),-sw/2,-10,sw,sh);`, `ctx.drawImage(Pic(pic),-sw/2,-10,sw,sh); C.drawAnts(me, ctx, sw, sh);`)
);
*/
eval(`Game.SpawnWrinkler = ` + Game.SpawnWrinkler.toString().replace(`if (Math.random()<0.0001) me.type=1;//shiny wrinkler`, `if (Math.random()<0.0001*C.puckMult()) me.type=1;//shiny wrinkler\n\t\t\tif (Game.Has('Strawberry-flavored worm bait') && Math.random() < 0.02) { me.super = true; C.getAdjacentWrinklers(me.id).forEach(x => x.running = true); }`)
    .replace(`me.type=0;`, `me.type=0;\n\t\t\tme.super = 0;`));
eval(`Game.UpdateWrinklers = ` + Game.UpdateWrinklers.toString().replace(`if (me.type==0)`, `if (me.super) {\n\t\t\t\t\t\tif (me.hp == Game.wrinklerHP) me.hp = 10 * Math.max(C.transcendPower, 1) + 0.5;\n\t\t\t\t\t}\n\t\t\t\t\telse if (me.type==0)`)
    .replace(`if (me.type==1) toSuck*=3;`, `if (me.type==1) toSuck*=3;\n\t\t\t\t\tif (me.super) toSuck *= 1.5;\n\t\t\t\t\tif (Game.Has('Puck') && Game.hasGod && Game.hasGod('scorn')) toSuck *= 20;`)
    .replace(`if (Game.prefs.particles)`, `if (Game.prefs.particles && !me.super)`)
    .replace(`Game.Win('Last Chance to See');`, `Game.Win('Last Chance to See')\n\t\t\t\t\tif (me.super) { Game.Win('Magenta worm'); }`)
    .replace(`!(me.hp<=0.5 && me.phase>0)`, `!(me.hp<=0.5 && me.phase>0) && !me.super`)
    .replace(`me.hp-=0.75;`, `if (me.super) { if (Math.random() < 0.2) Game.Popup('<span style="font-size:80%">Blocked!</span>', Game.mouseX, Game.mouseY); /* else me.hp--; */ } else { me.hp -= 0.75 }`)
    .replace(`Math.random()<chance`, `Math.random()<chance && !C.bigCookieGone && C.cookieFallingTimer == 0 && !C.getAdjacentWrinklers(me.id).find(x => x.super)`)
    .replace(`if (Game.season=='halloween')`, `if (Game.Has('Puck') && Game.hasGod && Game.hasGod('scorn')) Game.gainBuff('cookie rain', 6, C.puckMult(2));\n\t\t\t\t\t\tif (Game.season=='halloween')`)
    .replace(`(((Game.cookiesPs/Game.fps)*Game.cpsSucked))`, `(Game.Has('Puck') && Game.hasGod && Game.hasGod('scorn')) ? (((Game.cookiesPs/Game.fps)*Game.cpsSucked)) : (Game.cookiesPs/Game.fps)*0.05*C.puckMult()`)
    .replace(`if (Game.Has('Wrinkler doormat')) chance=0.1;`, `if (Game.Has('Wrinkler doormat')) chance=0.1;\n\t\t\t\t\tif (Game.Has('Puck') && Game.hasGod && Game.hasGod('scorn')) chance = Math.pow(Math.max(0,(C.wrinklerT-(Game.fps*60))/((Game.fps*300)-(Game.fps*60))),5)`)
    .replace(`var xBase=0;`, `C.wrinklerT++;\n\t\t\tvar xBase=0;`)
    .replace(`Game.SpawnWrinkler(me);`, `Game.SpawnWrinkler(me);\n\t\t\t\t\t\tC.wrinklerT = 0;`)
    .replace(`me.r=(me.id/max)*360;`, `me.r=(me.id/max)*360;\n\t\t\t\t\tif (me.running) { me.close -= 1 / Game.fps; me.phase = 1; if (me.close < 0) { me.phase = 0; me.running = false; } }`)
);

Crumbs.objectBehaviors.wrinklerSkins = new Crumbs.behavior(function(p) {
    if (Game.wrinklers[this.wId].phase > 0) {
        if (Game.wrinklers[this.wId].super) { this.imgUsing = Game.WINKLERS ? 5 : Game.wrinklers[this.wId].type > 0 ? 7 : 8; return; }
        if (Game.wrinklers[this.wId].type > 0) { this.imgUsing = Game.WINKLERS?5:2; return; }
        if (Game.season == 'christmas') { this.imgUsing = Game.WINKLERS?6:3; return; }
        this.imgUsing = Game.WINKLERS?4:1; return;
    }
    this.imgUsing = 0;
});
Crumbs.objectBehaviors.wrinklerMovement = new Crumbs.behavior(function(p) {
    const me = Game.wrinklers[this.wId];
    const sw = me.super ? 100+2*Math.sin(Game.T*0.15+this.wId*3) : 100+2*Math.sin(Game.T*0.2+this.wId*3);
    const sh = me.super ? 200+5*Math.sin(Game.T*0.15-2+this.wId*3) : 200+5*Math.sin(Game.T*0.2-2+this.wId*3);
    this.scaleX = sw / 100;
    this.scaleY = sh / 200;
    if (me.super) {
        this.scaleX *= 1.25;
        this.scaleY *= 1.25;
    }
    this.x = me.x;
    this.y = me.y;
    this.offsetX = -sw/2 + 50;
    this.rotation = -(me.r)*Math.PI/180;
    this.alpha = me.close;
});

Crumbs.wrinklerSkins = ['img/filler.png', 'img/wrinkler.png', 'img/shinyWrinkler.png', 'img/winterWrinkler.png', 'winkler.png', 'shinyWinkler.png', 'winterWinkler.png', 'https://yeetdragon24.github.io/cookieclysm/img/superWrinkler.png', 'https://yeetdragon24.github.io/cookieclysm/img/superWrinkler2.png'];

Crumbs.onWrinklerClick = function() {
    const me = Game.wrinklers[this.wId];
    if (Game.keys[17] && Game.sesame) { me.type = !me.type; PlaySound('snd/shimmerClick.mp3'); return; }
    Game.playWrinklerSquishSound();
    me.clicks++;
    if (me.clicks >= 50) Game.Win('Wrinkler poker');
    me.hurt = 1;
    me.hp -= 0.75;
    if (Game.prefs.particles && !Game.prefs.notScary && !Game.WINKLERS && !(me.hp <= 0.5 && me.phase > 0) && !me.super) {
        for (let i = 0; i < 3; i++) { Crumbs.spawnWrinklerBits(me.type, me.id, Math.floor(i + Math.floor(3 * (me.id + 1) * Math.random()) + 2)); }
    }
}

for (let i in Game.wrinklers) {
    let w = Crumbs.findObject('wrinkler' + i, 'left');
    w.imgs = Crumbs.wrinklerSkins;
    w.behaviors = [
        new Crumbs.behaviorInstance(Crumbs.objectBehaviors.wrinklerSkins), 
        new Crumbs.behaviorInstance(Crumbs.objectBehaviors.wrinklerMovement), 
        new Crumbs.behaviorInstance(Crumbs.objectBehaviors.wrinklerParticles)
    ];
    w.getComponent('pointerInteractive').onRelease = Crumbs.onWrinklerClick;
}

C.kaizoWrinklerEvals = function() {
    eval(`Crumbs.drawEyeOfTheWrinkler = ` + Crumbs.drawEyeOfTheWrinkler.toString()
        .replace(`ctx.fillRect(x-width/2-8-10,y-23,width+16+20,38);`, `ctx.fillRect(x-width/2-8-10,y-23,width+16+20,selected.super ? 38 * 2 : 38);`)
        .replace(`ctx.strokeRect(x-width/2-8-10+1.5,y-23+1.5,width+16+20-3,38-3);`, `ctx.strokeRect(x-width/2-8-10+1.5,y-23+1.5,width+16+20-3,(selected.super ? 38 * 2 : 38)-3);`)
        .replace(`selected.sucked),x+10,y+8);`, `selected.sucked),x+10,y+8);\n\t\t\t\tif (selected.super) {\n\t\t\t\t\tctx.fillText('Health:', x+14, y+24);\n\t\t\t\t\tctx.fillText(Beautify(selected.hp - 0.5, 1), x+10, y+40);\n\t\t\t\t}`)
    );
}


Game.registerHook('cps', function(cps) {
    let sucking = Game.wrinklers.filter(x => x.phase == 2).length;
    sucking += Game.wrinklers.reduce((a, b) => a + b.ants.length, 0) * 0.05;

    let suckRate=1/20;//each wrinkler eats a twentieth of your CpS
    suckRate*=Game.eff('wrinklerEat');
    suckRate*=1+Game.auraMult('Dragon Guts')*0.2;

    Game.cpsSucked=Math.min(1,sucking*suckRate);

    return cps;
});

Game.wrinklers.forEach(x => x.ants = []);
C.gainAnt = function(wrinkler, pos) {
    if (Game.wrinklers[wrinkler].ants.length >= 3) return false;
    if (pos == -1) pos = choose([0, 1, 2, 3, 4, 5, 6].filter(x => !Game.wrinklers[wrinkler].ants.find(y => y.pos == x)));
    Game.wrinklers[wrinkler].ants.push({pos: pos, life: 0, cookies: 0});
}
C.loseAnt = function(wrinkler, id, disappear) {
    if (disappear) Game.wrinklers[wrinkler].ants.splice(id, 1);
    else {
        Game.wrinklers[wrinkler].ants[id].life = -1;
        Game.Notify('Ant', 'An ant just took <b>' + Beautify(Game.wrinklers[wrinkler].ants[id].cookies) + ' cookies</b> from a wrinkler and left.', [8, 1, icons], 6);
    }
}

C.clysmClicks = 0;
Game.shimmerTypes['clysm'] = {
	reset: function() {
		this.last = '';
	},
	initFunc: function(me) {
		//chime if im not lazy
		let bgPic = 'img/goldCookie.png';
		
		me.x = Math.floor(Math.random() * Math.max(0, (Game.bounds.right - 300) - Game.bounds.left - 128) + Game.bounds.left + 64) - 64;
		me.y = Math.floor(Math.random() * Math.max(0, Game.bounds.bottom - Game.bounds.top - 128) + Game.bounds.top + 64) - 64;
		me.l.style.left = me.x + 'px';
		me.l.style.top = me.y + 'px';
		me.l.style.width = me.l.style.height = '96px';
		me.l.style.backgroundImage = 'url(' + bgPic + ')';
		me.l.style.opacity = '0';
		me.l.style.display = 'block';
		me.l.setAttribute('alt', 'clysm cookie');


		let dur = 13;
		me.dur = dur;
		me.life = Math.ceil(Game.fps * me.dur);
		me.sizeMult = 1;
	},
	updateFunc: function(me) {
		var curve = 1 - Math.pow((me.life / (Game.fps * me.dur)) * 2 - 1, 4);
		me.l.style.opacity = curve;
		//this line makes each golden cookie pulse in a unique way
		if (Game.prefs.fancy) me.l.style.transform = 'rotate(' + (Math.sin(me.id * 0.69) * 24 + Math.sin(Game.T * (0.35 + Math.sin(me.id * 0.97) * 0.15) + me.id/*+Math.sin(Game.T*0.07)*2+2*/) * (3 + Math.sin(me.id * 0.36) * 2)) + 'deg) scale(' + (me.sizeMult * (1 + Math.sin(me.id * 0.53) * 0.2) * curve * (1 + (0.06 + Math.sin(me.id * 0.41) * 0.05) * (Math.sin(Game.T * (0.25 + Math.sin(me.id * 0.73) * 0.15) + me.id)))) + ')';
		me.life--;
		if (me.life <= 0) {
			this.missFunc(me);
			me.die();
		}
	},
	popFunc: function(me) {
		let list = [];

		C.clysmClicks++;

		list.push('ruin', 'ruin', 'lucky');
		list.push('righteous cataclysm', 'building rust');
		if (Math.random() < 0.3) list.push('ascend');
		if (Math.random() < 0.7) list.push('big cookie toggle');

		let choice = choose(list);
		this.last = choice;
		console.log(choice);

		let popup = '', buff;

		if (choice == 'ruin') {
			let moni = Math.min(Game.cookies*0.15,Game.cookiesPs*60*30)+13;//lose 15% of cookies owned (-13), or 30 minutes of cookie production - whichever is lowest
			moni = Math.min(Game.cookies,moni);
			Game.Spend(moni);
			popup = 'Ruin!<br><small>Lost ' + Beautify(moni) + ' cookies</small>';
		} else if (choice == 'lucky') {
			let moni = Math.min(Game.cookies*0.05,Game.cookiesPs*60*5)+13;//add 5% to cookies owned (+13), or 5 minutes of cookie production - whichever is lowest
			Game.Earn(moni);
			popup = 'Lucky!<br><small>+' + Beautify(moni) + ' cookies!</small>';
		} else if (choice == 'righteous cataclysm') {
			if (Game.Objects['Portal'].amount > 0) {
				buff = Game.gainBuff('building buff', 30, Game.Objects['Portal'].amount / 100 + 1, Game.Objects['Portal'].id);
			} else {
				let building = choose(Object.values(Game.Objects));
				buff = Game.gainBuff('building debuff', 30, building.amount / 100 + 1, building.id);
			}
		} else if (choice == 'building rust') {
			let building = choose(Object.values(Game.Objects));
			buff = Game.gainBuff('building debuff', 30, building.amount / 100 + 1, building.id);
		} else if (choice == 'ascend') {
			popup = 'Cataclysm!<br><small>The world breaks apart.</small>';
            Game.SparkleAt(me.x + 48, me.y + 48);
		    PlaySound('snd/shimmerClick.mp3');
            me.die();
			if (Game.bigCookieGone) {
				PlaySound('snd/charging.mp3');
				setTimeout(Game.Ascend, (Game.AscendBreakPoint / 30) * 1000, 1);
			} else Game.Ascend(1);
		} else if (choice == 'big cookie toggle') {
			if (C.bigCookieGone) {
				C.toggleBigCookie(true);    
				popup = 'Cataclysm!<br><small>The big cookie formulates again.</small>';
			} else {
				C.doCookieFalling = true;
				popup = 'Cataclysm!<br><small>The big cookie crumbles beneath your fingers.</small>';
			}
		}
		if (popup == '' && buff && buff.name && buff.desc) popup = buff.dname + '<div style="font-size:65%;">' + buff.desc + '</div>';
		if (popup != '') Game.Popup(popup, me.x + me.l.offsetWidth / 2, me.y);
		Game.SparkleAt(me.x + 48, me.y + 48);
		PlaySound('snd/shimmerClick.mp3');
		if (me.l) me.die();
	},
	missFunc: function(me) {
		console.log('bro missed the clysm cookie');
	},
	spawnsOnTimer: true,
	spawnConditions: function() {
		return Game.Has('Flaming worm');
	},
	spawned: 0, time: 0, minTime: 0, maxTime: 0,
	getTimeMod: function(me, m) {
		return Math.ceil(Game.fps * 60 * m);
	},
	getMinTime: function(me) {
		let m = 10;
		return this.getTimeMod(me, m);
	},
	getMaxTime: function(me) {
		let m = 25;
		return this.getTimeMod(me, m);
	},
	last: ''
}

let youpocCclysmBuy = function() { //no longer used
	C.transcend(1);

	new TranscendentObject({
		imgs: ['https://yeetdragon24.github.io/cookieclysm/img/puck.png'],
		x: 1920, y: 1100, alpha: 1, height: 48, width: 48,
		scaleX: 2, scaleY: 2, id: 'puck', scope: 'transcend',
		behaviors: [
			function() {
				if (this.getComponent('pointerInteractive').hovered) {
					this.alpha = 1;
					l('transcend').style.cursor = 'pointer';
				} else {
					this.alpha = 0.25 * Math.sin(Game.drawT/20) + 0.75;
					l('transcend').style.removeProperty('cursor');
				}
			},
			function() {
				if (this.getComponent('pointerInteractive').click && this.getComponent('pointerInteractive').hovered) {
					this.children[0].enabled = true;
					this.offsetX = (Math.random() - 0.5) * ((this.clicked * 7/130)+2);
					this.offsetY = (Math.random() - 0.5) * ((this.clicked * 7/180)+2);
					this.clicked++;
					if (this.clicked >= 150) {
						this.explodeT = Game.drawT;
						this.children[0].behaviors = [new Crumbs.behaviorInstance(function() {
							this.scaleX = this.scaleY = ((Game.drawT - this.parent.explodeT) * 0.5) + 0.5;
						})];
						this.behaviors = [];
						this.order = -1;
						C.leaveTranscend(1);
						C.transcendModifier = 1;
						setTimeout(function() {
							Crumbs.findObject('puck', 'transcend').die();
							Game.Ascend(1);
							Game.AscendTimer = Game.AscendDuration;
						}, 4000);
					}
				} else {
					this.clicked = 0;
					this.children[0].enabled = false;
					this.children[0].scaleX = this.children[0].scaleY = 0;
					this.offsetX = 0;
					this.offsetY = 0;
				}
			}
		],
		components: [new Crumbs.component.pointerInteractive()],
		init: function() {
			this.spawnChild({
				imgs: ['shineRed.png'], x: 0, y: 0, alpha: 1, height:128, width: 128, scaleX: 0, scaleY: 0, id: 'puckAura', scope: 'transcend',
				behaviors: [
					function() {
						this.scaleX = this.scaleY = (this.parent.clicked / 150) * 0.375 * 2;
						this.rotation = (Game.drawT * Math.PI / 180) * 5;
					}
				],
				enabled: false, auraPoints: 10000 //i'm sorry but it's called puckAura and i need to make fun of the aura meme
			});
		},
		clicked: 0 //draw frames that he's been clicked for, for my own purposes and not a Crumbs thing
	});
}

//Game.registerHook('logic',updateYoupocalypse);

Game.registerHook('reset', (hard) => {
	if (hard) {
		C.youWrath = 0;
		C.mone = 0;
		C.moneName = 'Moné';
		C.transcendPower = 0;
		C.lastTranscendP = 0;
		C.moneSpent = 0;
		dmone = 0;
		C.transcends = 0;
		C.transcendModifier = 0;
	}
});

//quicktime events, maybe implement
var currentQuicktime = {};

QuicktimeEvent = function(sequence, time, condition) {
	this.sequence = sequence;
	this.time = time;
	this.condition = condition;
	this.active = 1;
	Game.Prompt('<id QuicktimeEvent><h3>Quicktime event</h3>' +
		'<div class="block">Type out "<span id="QuicktimeSequence"></span>" within <span id="QuicktimeTime"></span><textarea id="textareaPrompt" style="width:100%;height:32px;"></textarea></div>',
		[['Done', 'console.log(checkQuicktimeEvent());Game.ClosePrompt();']]);
}
checkQuicktimeEvent = function(quicktime, condition) {
	quicktime = quicktime || currentQuicktime;
	let promptText = quicktime.text;
	condition = condition || currentQuicktime.condition;
	if (!promptText) return false;
	condition(promptText == quicktime.sequence);
}
updateQuicktimeEvent = function() {
	//spawn one
	/*
		add stuff here
	*/

	if (currentQuicktime.active) {
		if (currentQuicktime.time <= 0 || !Game.promptOn) {
			Game.ClosePrompt();
			currentQuicktime = { active: 0 };
		} else {
			currentQuicktime.text = l('textareaPrompt').value;
			l('QuicktimeSequence').innerHTML = currentQuicktime.sequence;
			l('QuicktimeTime').innerHTML = Game.sayTime(`${currentQuicktime.time} ${Game.fps}`);
			currentQuicktime.time--;
		}
	}
}
//Game.registerHook('logic',updateQuicktimeEvent);

//silver cookies
Game.shimmerTypes['silver'] = {
	reset: function() {
		this.last = '';
	},
	initFunc: function(me) {
		//chime if im not lazy
		let bgPic = 'img/goldCookie.png';//'https://yeetdragon24.github.io/cookieclysm/img/silverCookie.png';
		let picX = 0, picY = 0;

		//also custom season sprites if im not lazy

		me.x = Math.floor(Math.random() * Math.max(0, (Game.bounds.right - 300) - Game.bounds.left - 128) + Game.bounds.left + 64) - 64;
		me.y = Math.floor(Math.random() * Math.max(0, Game.bounds.bottom - Game.bounds.top - 128) + Game.bounds.top + 64) - 64;
		me.l.style.left = me.x + 'px';
		me.l.style.top = me.y + 'px';
		me.l.style.width = '96px';
		me.l.style.height = '96px';
		me.l.style.backgroundImage = 'url(' + bgPic + ')';
		me.l.style.backgroundPosition = (-picX * 96) + 'px ' + (-picY * 96) + 'px';
		me.l.style.opacity = '0';
		me.l.style.display = 'block';
		me.l.setAttribute('alt', 'silver cookie');


		let dur = 13;
		//dur *= Math.pow(0.95,Game.shimmerTypes['silver'].n-1);//5% shorter for every other onscreen sc
		me.dur = dur;
		me.life = Math.ceil(Game.fps * me.dur);
		me.sizeMult = 1;
	},
	updateFunc: function(me) {
		var curve = 1 - Math.pow((me.life / (Game.fps * me.dur)) * 2 - 1, 4);
		me.l.style.opacity = curve;
		//this line makes each golden cookie pulse in a unique way
		if (Game.prefs.fancy) me.l.style.transform = 'rotate(' + (Math.sin(me.id * 0.69) * 24 + Math.sin(Game.T * (0.35 + Math.sin(me.id * 0.97) * 0.15) + me.id/*+Math.sin(Game.T*0.07)*2+2*/) * (3 + Math.sin(me.id * 0.36) * 2)) + 'deg) scale(' + (me.sizeMult * (1 + Math.sin(me.id * 0.53) * 0.2) * curve * (1 + (0.06 + Math.sin(me.id * 0.41) * 0.05) * (Math.sin(Game.T * (0.25 + Math.sin(me.id * 0.73) * 0.15) + me.id)))) + ')';
		me.life--;
		if (me.life <= 0) {
			this.missFunc(me);
			me.die();
		}
	},
	popFunc: function(me) {
		if (me.spawnLead) {
			Game.silverClicks++;
			Game.silverClicksTotal++;
			for (let i in Game.silverClickThresholds) {
				if (Game.silverClicksTotal > Game.silverClickThresholds[i]) Game.Win(i);
			}
		}

		let list = [];

		let choice = choose(list);
		this.last = choice;
		console.log(choice);

		let popup, buff;

		if (popup == '' && buff && buff.name && buff.desc) popup = buff.dname + '<div style="font-size:65%;">' + buff.desc + '</div>';
		if (popup != '') Game.Popup(popup, me.x + me.l.offsetWidth / 2, me.y);
		Game.DropEgg(0.99);
		Game.SparkleAt(me.x + 48, me.y + 48);
		PlaySound('snd/shimmerClick.mp3');
		me.die();
	},
	missFunc: function(me) {
		let moni = Math.max(Game.cookies * 0.4, Game.cookiesPs * 10 * (Game.T % 10));
		Game.spend(moni);
		Game.Notify('Silver cookie deterioration', `A silver cookie died and deteriorated ${Beautify(moni)} cookies with it!`, [0, 0]);
	},
	spawnsOnTimer: true,
	spawnConditions: function() {
		return false;
		return Game.Has('Useless treasure');
	},
	spawned: 0, time: 0, minTime: 0, maxTime: 0,
	getTimeMod: function(me, m) {
		return Math.ceil(Game.fps * 60 * m);
	},
	getMinTime: function(me) {
		let m = 10;
		return this.getTimeMod(me, m);
	},
	getMaxTime: function(me) {
		let m = 25;
		return this.getTimeMod(me, m);
	},
	last: ''
}

let Dialogue = function(obj) {
	Game.Prompt(`
		<id Dialogue>
		<h3>${tinyIcon(obj.icon)+' '+obj.title}</h3>
		<div class="line"></div>
		<span id="dialogueText" style="text-align:center">${obj.text}</span>
		<br><br>
	`, obj.promptOptions);
}

/*
earlygame fix
*/
C.updateGrimoire = function() {
    if (!Game.Objects['Wizard tower'].minigameLoaded) return false;

    let M = Game.Objects['Wizard tower'].minigame;
    let fthof = M.spells['hand of fate'];

    fthof.failFunc = function(fail) {
        return fail + (0.15 * (Game.shimmerTypes['golden'].n + Object.keys(Game.buffs).length));
    }

    let cbg = M.spells['conjure baked goods'];

    cbg.desc = 'Summon half an hour worth of your CpS, capped at 150% of your cookies owned.';
    cbg.win = function() {
        let val = Math.max(7, Math.min(Game.cookies * 1.5, Game.cookiesPs * 60 * 30));
        Game.Earn(val);
        Game.Notify('Conjure baked goods!',`You magic <b>${Beautify(val)} cookie${(val == 1 ? '' : 's')}</b> out of thin air.`,[21,11],6);
        Game.Popup(`<div style="font-size:80%;">${Beautify(val)} cookie${(val == 1 ? '' : 's')}!</div>`, Game.mouseX, Game.mouseY);
    }
    cbg.fail = function() {
        let buff = Game.gainBuff('clot' ,60 * 15, 0.5);
        let val = Math.min(Game.cookies * 0.15, Game.cookiesPs * 60 * 15) + 13;
        val = Math.min(Game.cookies, val);
        Game.Spend(val);
        Game.Notify(buff.name, buff.desc, buff.icon, 6);
        Game.Popup(`<div style="font-size:80%;">Backfire!<br>Summoning failed! Lost ${Beautify(val)} cookie${(val == 1 ? '' : 's')}!</div>`, Game.mouseX, Game.mouseY);
    }
    Game.removeHook('check', C.updateGrimoire);
}
Game.registerHook('check', C.updateGrimoire);

/*
chocolate
*/
C.chocolate = 0;
C.gainChocolate = function(amount) {
    C.chocolate += amount;
}

eval('Game.shimmerTypes[\'golden\'].initFunc = ' + Game.shimmerTypes['golden'].initFunc.toString().replace(`//set image`, `if (Game.hasDev && Game.hasDev('sniper') && me.spawnLead) {\n\t\t\t\t\t\tme.life = 0; \n\t\t\t\t\t\treturn new Game.shimmer('sniperGold');\n\t\t\t\t\t}\n\t\t\t\t\t//set image`));

let updateDrawBackground = function () {
	const bg = Game.DrawBackground.toString();
	eval(`Game.DrawBackground = ` + Game.DrawBackground.toString().replace(`Crumbs.drawObjects();`,`if (Game.OnAscend == 2) C.drawTranscend(Crumbs.getCanvasByScope('transcend'));\n\tCrumbs.drawObjects();`)
	    /*.replace(bg.slice(bg.toString().indexOf(`if (false)//don't do that`), bg.toString().indexOf(`cookie');\n\t\t\t\t\t\t}`)+17), `C.bigCookieUpdate(ctx, goodBuff);`)*/);
}
updateDrawBackground();

eval('Game.crate = ' + Game.crate.toString().replace(`me.pool=='prestige'`, `me.pool=='prestige' || me.pool=='transcendent'`));

Game.crateTooltip = function(me, context) {
	var tags = [];
	mysterious = 0;
	var neuromancy = 0;
	var price = '';
	if (context == 'stats' && (Game.Has('Neuromancy') || (Game.sesame && me.pool == 'debug'))) neuromancy = 1;

	var ariaText = '';

	if (me.type == 'upgrade') {
		ariaText += 'Upgrade. ';

		if (me.pool == 'prestige') tags.push(loc("[Tag]Heavenly", 0, 'Heavenly'), '#efa438');
		else if (me.pool == 'transcendent') tags.push('Transcendent', C.transcendentPink);
		else if (me.pool == 'tech') tags.push(loc("[Tag]Tech", 0, 'Tech'), '#36a4ff');
		else if (me.pool == 'cookie') tags.push(loc("[Tag]Cookie", 0, 'Cookie'), 0);
		else if (me.pool == 'debug') tags.push(loc("[Tag]Debug", 0, 'Debug'), '#00c462');
		else if (me.pool == 'toggle') tags.push(loc("[Tag]Switch", 0, 'Switch'), 0);
		else tags.push(loc("[Tag]Upgrade", 0, 'Upgrade'), 0);

		if (Game.Has('Label printer')) {
			if (me.tier != 0) {
				if (me.pool == 'transcendent') tags.push(loc("Tier:") + ' ' + romanize(me.tier), Game.Tiers[(me.tier % 15) + 1].color);
				else tags.push(loc("Tier:") + ' ' + loc("[Tier]" + Game.Tiers[me.tier].name, 0, Game.Tiers[me.tier].name), Game.Tiers[me.tier].color);
			}
			if (me.name == 'Label printer' || me.name == 'This upgrade') tags.push(loc("Tier:") + ' ' + loc("[Tier]Self-referential"), '#ff00ea');
		}

		if (me.isVaulted()) tags.push(loc("Vaulted"), '#4e7566');

		if (me.bought > 0) {
			ariaText += 'Owned. ';
			if (me.pool == 'tech') tags.push(loc("Researched"), 0);
			else if (EN && me.kitten) tags.push('Purrchased', 0);
			else tags.push(loc("Purchased"), 0);
		}

		if (me.lasting && me.unlocked) tags.push(loc("Unlocked forever"), '#f2ff87');

		if (neuromancy && me.bought == 0) tags.push(loc("Click to learn!"), '#00c462');
		else if (neuromancy && me.bought > 0) tags.push(loc("Click to unlearn!"), '#00c462');

		var canBuy = (context == 'store' ? me.canBuy() : true);
		var cost = me.getPrice();
		if (me.priceLumps > 0) cost = me.priceLumps;

		if (me.priceLumps == 0 && cost == 0) price = '';
		else {
			price = '<div style="float:right;text-align:right;"><span class="price' +
				(me.priceLumps > 0 ? (' lump') : '') +
				(me.pool == 'prestige' ? (Game.heavenlyChips >= cost ? ' heavenly' : ' heavenly disabled') : '') +
				(me.pool == 'transcendent' ? (C.mone >= cost ? ' transcendent' : ' transcendent disabled') : '') +
				(me.pool == 'chocolate' ? (canBuy ? ' chocolate' : ' chocolate disabled') : '') +
				(context == 'store' ? (canBuy ? '' : ' disabled') : '') +
				'">' + Beautify(Math.round(cost)) + '</span>' + ((me.pool != 'prestige' && me.priceLumps == 0) ? Game.costDetails(cost) : '') + '</div>';

			ariaText += (me.bought ? 'Bought for' : canBuy ? 'Can buy for' : 'Cannot afford the') + ' ' + Beautify(Math.round(cost)) + ' ' + ((me.priceLumps > 0) ? 'sugar lumps' : (me.pool == 'prestige') ? 'heavenly chips' : 'cookies') + '. ';
		}
	}
	else if (me.type == 'achievement') {
		ariaText += 'Achievement. ';
		if (me.pool == 'shadow') tags.push(loc("Shadow Achievement"), '#9700cf');
		else tags.push(loc("Achievement"), 0);
		if (me.won > 0) { tags.push(loc("Unlocked"), 0); ariaText += 'Unlocked. '; }
		else { tags.push(loc("Locked"), 0); mysterious = 1; }

		if (neuromancy && me.won == 0) tags.push(loc("Click to win!"), '#00c462');
		else if (neuromancy && me.won > 0) tags.push(loc("Click to lose!"), '#00c462');
	}

	var tagsStr = '';
	for (var i = 0; i < tags.length; i += 2) {
		if (i % 2 == 0) tagsStr += '<div class="tag" style="background-color:' + (tags[i + 1] == 0 ? '#fff' : tags[i + 1]) + ';">' + tags[i] + '</div>';
	}

	var icon = me.icon;
	if (mysterious) icon = [0, 7];

	if (me.iconFunction) icon = me.iconFunction();

	ariaText += (mysterious ? 'Hidden' : me.dname) + '. ';

	var tip = '';
	if (context == 'store') {
		if (me.pool != 'toggle' && me.pool != 'tech') {
			var purchase = me.kitten ? 'purrchase' : 'purchase';
			if (Game.Has('Inspired checklist')) {
				if (me.isVaulted()) tip = EN ? ('Upgrade is vaulted and will not be auto-' + purchase + 'd.<br>Click to ' + purchase + '. Shift-click to unvault.') : (loc("Upgrade is vaulted and will not be auto-purchased.") + '<br>' + loc("Click to purchase.") + ' ' + loc("%1 to unvault.", loc("Shift-click")));
				else tip = EN ? ('Click to ' + purchase + '. Shift-click to vault.') : (loc("Click to purchase.") + ' ' + loc("%1 to vault.", loc("Shift-click")));
				if (EN) {
					if (Game.keys[16]) tip += '<br>(You are holding Shift.)';
					else tip += '<br>(You are not holding Shift.)';
				}
			}
			else tip = EN ? ('Click to ' + purchase + '.') : loc("Click to purchase.");
		}
		else if (me.pool == 'toggle' && me.choicesFunction) tip = loc("Click to open selector.");
		else if (me.pool == 'toggle') tip = loc("Click to toggle.");
		else if (me.pool == 'tech') tip = loc("Click to research.");
	}

	if (tip != '') ariaText += tip + ' ';

	var desc = me.ddesc;
	if (me.descFunc) desc = me.descFunc(context);
	if (me.bought && context == 'store' && me.displayFuncWhenOwned) desc = me.displayFuncWhenOwned() + '<div class="line"></div>' + desc;
	if (me.unlockAt) {
		if (me.unlockAt.require) {
			var it = Game.Upgrades[me.unlockAt.require];
			desc = '<div style="font-size:80%;text-align:center;">' + (EN ? 'From' : loc("Source:")) + ' ' + tinyIcon(it.icon) + ' ' + it.dname + '</div><div class="line"></div>' + desc;
		}
		else if (me.unlockAt.text) {
			//var it=Game.Upgrades[me.unlockAt.require];
			desc = '<div style="font-size:80%;text-align:center;">' + (EN ? 'From' : loc("Source:")) + ' <b>' + text + '</b></div><div class="line"></div>' + desc;
		}
	}

	if (!mysterious) ariaText += 'Description: ' + desc + ' ';

	if (Game.prefs.screenreader) {
		var ariaLabel = l('ariaReader-' + me.type + '-' + me.id);
		if (ariaLabel) ariaLabel.innerHTML = ariaText.replace(/(<([^>]+)>)/gi, ' ');
	}

	return '<div style="position:absolute;left:1px;top:1px;right:1px;bottom:1px;background:linear-gradient(125deg,' + (me.pool == 'prestige' ? 'rgba(15,115,130,1) 0%,rgba(15,115,130,0)' : me.pool == 'transcendent' ? 'rgba(218, 112, 214, 1) 0%, rgba(218, 112, 214, 0)' : 'rgba(50,40,40,1) 0%,rgba(50,40,40,0)') + ' 20%);mix-blend-mode:screen;z-index:1;"></div><div style="z-index:10;padding:8px 4px;min-width:350px;position:relative;" id="tooltipCrate">' +
		'<div class="icon" style="float:left;margin-left:-8px;margin-top:-8px;' + writeIcon(icon) + '"></div>' +
		(me.bought && context == 'store' ? '' : price) +
		'<div class="name">' + (mysterious ? '???' : me.dname) + ((me.pool == 'transcendent') ? (' ' + romanize(me.tier)) : '') + '</div>' +
		tagsStr +
		'<div class="line"></div><div class="description">' + (mysterious ? '???' : desc) + '</div></div>' +
		(tip != '' ? ('<div class="line"></div><div style="font-size:10px;font-weight:bold;color:#999;text-align:center;padding-bottom:4px;line-height:100%;" class="crateTip">' + tip + '</div>') : '') +
		(Game.sesame ? ('<div style="font-size:9px;">Id: ' + me.id + ' | Order: ' + (me.order) + (me.tier ? ' | Tier: ' + me.tier : '') + ' | Icon: [' + me.icon[0] + ',' + me.icon[1] + ']' + '</div>') : '');
}
