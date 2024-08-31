//Initiating the mod i guess
let hasGodL = Game.hasGod;
let getPlantDescL = Game.Objects['Farm'].minigame ? Game.Objects['Farm'].minigame.getPlantDesc : function() {};
let capniL = 0;
let icons = 'https://yeetdragon24.github.io/cookieclysm/img/iconsheet-v6.png';
let Kaizo = Game.mods['Kaizo Cookies'];
//some roman numeral function i found on stack overflow https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
function romanize(num) { if (isNaN(num)) return NaN; var digits = String(+num).split(""), key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"], roman = "", i = 3; while (i--) roman = (key[+digits.pop() + (i * 10)] || "") + roman; return Array(+digits.join("") + 1).join("M") + roman; }
var tUSA = 884;
var transcendMeterPercent = 0;
//Handling all the mod stuff (base cookieclysm.js
function shadowSave(type) { Game.toSave = false; Game.lastDate = parseInt(Game.time); var str = ''; if (type == 3) str += '\nGame version\n'; str += Game.version + '|'; str += '|'; if (type == 3) str += '\n\nRun details'; str += (type == 3 ? '\n	run start date : ' : '') + parseInt(Game.startDate) + ';' + (type == 3 ? '\n	legacy start date : ' : '') + parseInt(Game.fullDate) + ';' + (type == 3 ? '\n	date when we last opened the game : ' : '') + parseInt(Game.lastDate) + ';' + (type == 3 ? '\n	bakery name : ' : '') + (Game.bakeryName) + ';' + (type == 3 ? '\n	seed : ' : '') + (Game.seed) + ';' + (type == 3 ? '\n	appearance : ' : '') + (Game.YouCustomizer.save()) + '|'; if (type == 3) str += '\n\nPacked preferences bitfield\n	'; var str2 = (Game.prefs.particles ? '1' : '0') + (Game.prefs.numbers ? '1' : '0') + (Game.prefs.autosave ? '1' : '0') + (Game.prefs.autoupdate ? '1' : '0') + (Game.prefs.milk ? '1' : '0') + (Game.prefs.fancy ? '1' : '0') + (Game.prefs.warn ? '1' : '0') + (Game.prefs.cursors ? '1' : '0') + (Game.prefs.focus ? '1' : '0') + (Game.prefs.format ? '1' : '0') + (Game.prefs.notifs ? '1' : '0') + (Game.prefs.wobbly ? '1' : '0') + (Game.prefs.monospace ? '1' : '0') + (Game.prefs.filters ? '1' : '0') + (Game.prefs.cookiesound ? '1' : '0') + (Game.prefs.crates ? '1' : '0') + (Game.prefs.showBackupWarning ? '1' : '0') + (Game.prefs.extraButtons ? '1' : '0') + (Game.prefs.askLumps ? '1' : '0') + (Game.prefs.customGrandmas ? '1' : '0') + (Game.prefs.timeout ? '1' : '0') + (Game.prefs.cloudSave ? '1' : '0') + (Game.prefs.bgMusic ? '1' : '0') + (Game.prefs.notScary ? '1' : '0') + (Game.prefs.fullscreen ? '1' : '0') + (Game.prefs.screenreader ? '1' : '0') + (Game.prefs.discordPresence ? '1' : '0') + ''; str2 = pack3(str2); str += str2 + '|'; if (type == 3) str += '\n\nMisc game data'; str += (type == 3 ? '\n	cookies : ' : '') + parseFloat(Game.cookies).toString() + ';' + (type == 3 ? '\n	total cookies earned : ' : '') + parseFloat(Game.cookiesEarned).toString() + ';' + (type == 3 ? '\n	cookie clicks : ' : '') + parseInt(Math.floor(Game.cookieClicks)) + ';' + (type == 3 ? '\n	golden cookie clicks : ' : '') + parseInt(Math.floor(Game.goldenClicks)) + ';' + (type == 3 ? '\n	cookies made by clicking : ' : '') + parseFloat(Game.handmadeCookies).toString() + ';' + (type == 3 ? '\n	golden cookies missed : ' : '') + parseInt(Math.floor(Game.missedGoldenClicks)) + ';' + (type == 3 ? '\n	background type : ' : '') + parseInt(Math.floor(Game.bgType)) + ';' + (type == 3 ? '\n	milk type : ' : '') + parseInt(Math.floor(Game.milkType)) + ';' + (type == 3 ? '\n	cookies from past runs : ' : '') + parseFloat(Game.cookiesReset).toString() + ';' + (type == 3 ? '\n	elder wrath : ' : '') + parseInt(Math.floor(Game.elderWrath)) + ';' + (type == 3 ? '\n	pledges : ' : '') + parseInt(Math.floor(Game.pledges)) + ';' + (type == 3 ? '\n	pledge time left : ' : '') + parseInt(Math.floor(Game.pledgeT)) + ';' + (type == 3 ? '\n	currently researching : ' : '') + parseInt(Math.floor(Game.nextResearch)) + ';' + (type == 3 ? '\n	research time left : ' : '') + parseInt(Math.floor(Game.researchT)) + ';' + (type == 3 ? '\n	ascensions : ' : '') + parseInt(Math.floor(Game.resets)) + ';' + (type == 3 ? '\n	golden cookie clicks (this run) : ' : '') + parseInt(Math.floor(Game.goldenClicksLocal)) + ';' + (type == 3 ? '\n	cookies sucked by wrinklers : ' : '') + parseFloat(Game.cookiesSucked).toString() + ';' + (type == 3 ? '\n	wrinkles popped : ' : '') + parseInt(Math.floor(Game.wrinklersPopped)) + ';' + (type == 3 ? '\n	santa level : ' : '') + parseInt(Math.floor(Game.santaLevel)) + ';' + (type == 3 ? '\n	reindeer clicked : ' : '') + parseInt(Math.floor(Game.reindeerClicked)) + ';' + (type == 3 ? '\n	season time left : ' : '') + parseInt(Math.floor(Game.seasonT)) + ';' + (type == 3 ? '\n	season switcher uses : ' : '') + parseInt(Math.floor(Game.seasonUses)) + ';' + (type == 3 ? '\n	current season : ' : '') + (Game.season ? Game.season : '') + ';'; var wrinklers = Game.SaveWrinklers(); str += (type == 3 ? '\n	amount of cookies contained in wrinklers : ' : '') + parseFloat(Math.floor(wrinklers.amount)) + ';' + (type == 3 ? '\n	number of wrinklers : ' : '') + parseInt(Math.floor(wrinklers.number)) + ';' + (type == 3 ? '\n	prestige level : ' : '') + parseFloat(Game.prestige).toString() + ';' + (type == 3 ? '\n	heavenly chips : ' : '') + parseFloat(Game.heavenlyChips).toString() + ';' + (type == 3 ? '\n	heavenly chips spent : ' : '') + parseFloat(Game.heavenlyChipsSpent).toString() + ';' + (type == 3 ? '\n	heavenly cookies : ' : '') + parseFloat(Game.heavenlyCookies).toString() + ';' + (type == 3 ? '\n	ascension mode : ' : '') + parseInt(Math.floor(Game.ascensionMode)) + ';' + (type == 3 ? '\n	permanent upgrades : ' : '') + parseInt(Math.floor(Game.permanentUpgrades[0])) + ';' + parseInt(Math.floor(Game.permanentUpgrades[1])) + ';' + parseInt(Math.floor(Game.permanentUpgrades[2])) + ';' + parseInt(Math.floor(Game.permanentUpgrades[3])) + ';' + parseInt(Math.floor(Game.permanentUpgrades[4])) + ';' + (type == 3 ? '\n	dragon level : ' : '') + parseInt(Math.floor(Game.dragonLevel)) + ';' + (type == 3 ? '\n	dragon aura : ' : '') + parseInt(Math.floor(Game.dragonAura)) + ';' + (type == 3 ? '\n	dragon aura 2 : ' : '') + parseInt(Math.floor(Game.dragonAura2)) + ';' + (type == 3 ? '\n	chime type : ' : '') + parseInt(Math.floor(Game.chimeType)) + ';' + (type == 3 ? '\n	volume : ' : '') + parseInt(Math.floor(Game.volume)) + ';' + (type == 3 ? '\n	number of shiny wrinklers : ' : '') + parseInt(Math.floor(wrinklers.shinies)) + ';' + (type == 3 ? '\n	amount of cookies contained in shiny wrinklers : ' : '') + parseFloat(Math.floor(wrinklers.amountShinies)) + ';' + (type == 3 ? '\n	current amount of sugar lumps : ' : '') + parseFloat(Math.floor(Game.lumps)) + ';' + (type == 3 ? '\n	total amount of sugar lumps made : ' : '') + parseFloat(Math.floor(Game.lumpsTotal)) + ';' + (type == 3 ? '\n	time when current sugar lump started : ' : '') + parseFloat(Math.floor(Game.lumpT)) + ';' + (type == 3 ? '\n	time when last refilled a minigame with a sugar lump : ' : '') + parseFloat(Math.floor(Game.lumpRefill)) + ';' + (type == 3 ? '\n	sugar lump type : ' : '') + parseInt(Math.floor(Game.lumpCurrentType)) + ';' + (type == 3 ? '\n	vault : ' : '') + Game.vault.join(',') + ';' + (type == 3 ? '\n	heralds : ' : '') + parseInt(Game.heralds) + ';' + (type == 3 ? '\n	golden cookie fortune : ' : '') + parseInt(Game.fortuneGC) + ';' + (type == 3 ? '\n	CpS fortune : ' : '') + parseInt(Game.fortuneCPS) + ';' + (type == 3 ? '\n	highest raw CpS : ' : '') + parseFloat(Game.cookiesPsRawHighest) + ';' + (type == 3 ? '\n	music volume : ' : '') + parseInt(Math.floor(Game.volumeMusic)) + ';' + (type == 3 ? '\n	cookies sent : ' : '') + parseInt(Math.floor(Game.cookiesSent)) + ';' + (type == 3 ? '\n	cookies received : ' : '') + parseInt(Math.floor(Game.cookiesReceived)) + ';' + '|'; if (type == 3) str += '\n\nBuildings : amount, bought, cookies produced, level, minigame data'; for (var i in Game.Objects) { var me = Game.Objects[i]; if (type == 3) str += '\n	' + me.name + ' : '; if (me.vanilla) { str += me.amount + ',' + me.bought + ',' + parseFloat(Math.floor(me.totalCookies)) + ',' + parseInt(me.level); if (Game.isMinigameReady(me)) str += ',' + me.minigame.save(); else str += ',' + (me.minigameSave || ''); str += ',' + (me.muted ? '1' : '0'); str += ',' + me.highest; str += ';'; } } str += '|'; if (type == 3) str += '\n\nPacked upgrades bitfield (unlocked and bought)\n	'; var toCompress = []; for (var i in Game.UpgradesById) { var me = Game.UpgradesById[i]; if (me.vanilla) toCompress.push(Math.min(me.unlocked, 1), Math.min(me.bought, 1)); }; toCompress = pack3(toCompress.join('')); str += toCompress; str += '|'; if (type == 3) str += '\n\nPacked achievements bitfield (won)\n	'; var toCompress = []; for (var i in Game.AchievementsById) { var me = Game.AchievementsById[i]; if (me.vanilla) toCompress.push(Math.min(me.won)); } toCompress = pack3(toCompress.join('')); str += toCompress; str += '|'; if (type == 3) str += '\n\nBuffs : type, maxTime, time, arg1, arg2, arg3'; for (var i in Game.buffs) { var me = Game.buffs[i]; if (me.type) { if (type == 3) str += '\n	' + me.type.name + ' : '; if (me.type.vanilla) { str += me.type.id + ',' + me.maxTime + ',' + me.time; if (typeof me.arg1 !== 'undefined') str += ',' + parseFloat(me.arg1); if (typeof me.arg2 !== 'undefined') str += ',' + parseFloat(me.arg2); if (typeof me.arg3 !== 'undefined') str += ',' + parseFloat(me.arg3); str += ';'; } } } if (type == 3) str += '\n\nCustom :\n'; str += '|'; str += Game.saveModData(); Game.lastSaveData = str; if (type == 2 || type == 3) { return str; } else if (type == 1) { str = escape(utf8_to_b64(str) + '!END!'); return str; } else { if (Game.useLocalStorage) { str = utf8_to_b64(str) + '!END!'; if (str.length < 10) { } else { str = escape(str); localStorageSet(Game.SaveTo, str); if (App) App.save(str); if (!localStorageGet(Game.SaveTo)) { } else if (document.hasFocus()) { } } } else { var now = new Date(); now.setFullYear(now.getFullYear() + 5); str = utf8_to_b64(str) + '!END!'; Game.saveData = escape(str); str = Game.SaveTo + '=' + escape(str) + '; expires=' + now.toUTCString() + ';'; document.cookie = str; if (App) App.save(str); if (document.cookie.indexOf(Game.SaveTo) < 0) { } else if (document.hasFocus()) { } } } }
var cookieTracker, cpsTracker, shimmerTracker, lumpTracker;
if (typeof C === 'undefined') C = {};
C.version = 0.6;
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

	if (Game.hasBuff('Spirits sniped')) {
		Game.hasGod = function() { };
	} else {
		Game.hasGod = hasGodL;
	}

	if (Game.hasBuff('Famine')) {
		if ((Game.T % (Game.fps / 40) == 0)) { //tf does this do the game runs at 30 fps
			if (Game.ObjectsById[capniL].amount != 0) {
				if (capniL != 19) {
					Game.ObjectsById[capniL].sacrifice(1);
				} else {
					Game.killBuff('Famine');
					Game.Objects['Farm'].minigame.getPlantDesc = getPlantDescL;
					capniL = 0;
				}
			}
			else {
				if (capniL < 19) {
					capniL++;
				} else {
					capniL = 0;
					Game.killBuff('Famine');
				}
			}
		}
	}
	//checkSpace();

	/*======TRANSCEND========*/
	if (C.transcendReady) {
		if (Game.OnAscend == 2) { //it said &&Game.Game.transcendReady which was the reason code wasnt working smh
			if (C.transcendUnlocked) {
				let transcendMeterl = l('ascendInfoCopy').childNodes[0].childNodes[2].childNodes[2].childNodes[0]; //i was not cooking
				transcendMeterPercentT = Math.log10(Game.prestige + 1) - Math.floor(Math.log10(Game.prestige + 1));
				transcendMeterl.style.backgroundPosition = (-Game.T * 0.5 - transcendMeterPercent * 100) + 'px';
				transcendMeterl.style.width = (transcendMeterPercent * 100) + '%';
				transcendMeterPercent += (transcendMeterPercentT - transcendMeterPercent) * 0.1;
				//what i get for using .cloneNode()
				transcendMeterl.style.backgroundPosition = (-Game.T * 0.5 - transcendMeterPercent * 100) + 'px';
				transcendMeterl.style.width = (transcendMeterPercent * 100) + '%';
				l('ascendInfoCopy').childNodes[1].childNodes[2].childNodes[0].innerHTML = Beautify(C.dmone);
				l('ascendInfoCopy').childNodes[0].childNodes[2].childNodes[0].innerHTML = C.transcendPower;
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
			transcendMeterl.style.backgroundPosition = (-Game.T * 0.5 - transcendMeterPercent * 100) + 'px';
			transcendMeterl.style.width = (transcendMeterPercent * 100) + '%';
		}
	}

	C.dmone += (C.mone - C.dmone) * 0.3;
	if (Math.abs(C.dmone - C.mone) < 0.1) C.dmone = C.mone;

	if (Game.T % 3 == 0) calcDynamicTUEffs();

	if (C.toLoad) {
		if (Game.Objects['You'].minigame) {
			C.load(window.CookieclysmLoadStr);
		}
	}
});

//backup stats saving/loading from Kaizo
C.achievsToBackupSave = [];
for (let i in Game.BankAchievements) {
	C.achievsToBackupSave.push(Game.BankAchievements[i]);
}
for (let i in Game.CpsAchievements) {
	C.achievsToBackupSave.push(Game.CpsAchievements[i]);
}
for (let i in Game.Objects) {
	for (let ii in Game.Objects[i].productionAchievs) {
		C.achievsToBackupSave.push(Game.Objects[i].productionAchievs[ii].achiev);
	}
}
C.saveBackupStats = function() {
	let str = '';
	str += Game.cookiesEarned + '_' + Game.cookies + '_' + Game.lumps + '_' + Game.lumpsTotal + '_';
	for (let i in C.achievsToBackupSave) {
		str += C.achievsToBackupSave[i].won;
	}

	return str;
}
C.loadBackupStats = function(str) {
	let strs = str.split('_');
	if (isv(strs[0])) { Game.cookiesEarned = parseFloat(strs[0]); }
	if (isv(strs[1])) { Game.cookies = parseFloat(strs[1]); }
	if (isv(strs[2])) { Game.lumps = parseFloat(strs[2]); }
	if (isv(strs[3])) { Game.lumpsTotal = parseFloat(strs[3]); }
	if (isv(strs[4])) { for (let i in C.achievsToBackupSave) {
		C.achievsToBackupSave[i].won = parseInt(strs[4][i]);
	} }
}
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
		if (upgrades.indexOf(i) != upgrades.length - 1) str += ',';
	}
	str += '/';
	for (let i of achievements) {
		str += i.won;
		if (achievements.indexOf(i) != achievements.length - 1) str += ',';
	}
	str += '/';

	//converter
	let converter = Game.Objects['Converter'];
	str += [
		converter.amount, converter.bought, Math.floor(converter.totalCookies),
		converter.level, Number(converter.muted), converter.highest, converter.free
	].join(',');
	str += '/';

	//transcend
	str += [
		C.mone, C.moneName, C.transcendPower, C.lastTranscendP,
		C.moneSpent, C.transcends, C.transcendModifier,
		Game.ascensionMode
	].join(',');
	str += '/';

	//transcendent upgrade stuff
	str += C.unshackleSlots.join(',');
	str += '/';

	str += C.transcendentUpgrades.map(x => x.tier).join(',');
	str += '/';

	//youpocalypse
	str += C.youWrath;

	//backup
	str += C.saveBackupStats();

	return str;
}
C.load = function(str) {
	let spl = str.split('/');

	let version = spl[0];

	let upgrades = spl[1].split(',');
	for (let i in upgrades) {
		C.upAndAchiev[C.upAndAchiev.indexOf(C.upAndAchiev.filter(x => x.type == 'upgrade')[i])].unlocked = ((parseInt(upgrades[i]) || 0) >>1)&1;
		C.upAndAchiev[C.upAndAchiev.indexOf(C.upAndAchiev.filter(x => x.type == 'upgrade')[i])].owned = (parseInt(upgrades[i]) || 0) & 1;
	}
	let achievements = spl[2].split(',');
	for (let i in achievements) {
		C.upAndAchiev[C.upAndAchiev.indexOf(C.upAndAchiev.filter(x => x.type == 'achievement')[i])].won = parseInt(achievements[i]) || 0;
	}

	let converter = Game.Objects['Converter'];
	[
		converter.amount, converter.bought, converter.totalCookies,
		converter.level, converter.muted, converter.highest, converter.free
	] = spl[3].split(',').map(x => parseFloat(x) || 0);

	let transcendData = spl[4].split(',');
	C.mone = parseFloat(transcendData[0]);
	C.moneName = transcendData[1];
	C.transcendPower = parseFloat(transcendData[2]);
	C.lastTranscendP = parseFloat(transcendData[3]);
	C.moneSpent = parseFloat(transcendData[4]);
	C.transcends = parseFloat(transcendData[5]);
	C.transcendModifier = parseInt(transcendData[6]);
	Game.ascensionMode = parseInt(transcendData[8]);

	C.unshackleSlots = spl[5].split(',').map(x => parseInt(x));
	let tuTiers = spl[6].split(',');
	for (let i in tuTiers) {
		C.transcendentUpgrades[i].tier = tuTiers[i];
	}

	youWrath = parseFloat(spl[7]);

	C.loadBackupStats(spl[8]);
}
C.toLoad = true;

//random variable sets i guess
C.transcendentPink = '#da70d6';

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

/*
upgrades and achievements (C.upAndAchiev)
*/

//Local function so it has to be redefined
var getCookiePrice = function(level) { return 999999999999999999999999999999999999999 * Math.pow(10, (level - 1) / 2); };//idk if its even needed since idk how it works

C.transcendentUpgrade = function(name, desc, price, icon) {
	let upgrade = new Game.Upgrade(name, desc, price, icon);
	upgrade.pool = 'transcendent';
	return upgrade;
}

//fix i have to do because js dumb or some reason idk
let order, pool, power;
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
C.upAndAchiev.push(new Game.Achievement('Armored','Have a <b>100% or more</b> chance for your Shimmering veil to not break.', [7, 10]));

order = 10070;
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'Hard Pasta', desc: 'You should probably cook these. Or should you bake them?', icon: [28, 32], require: 'Box of not cookies', power: 5, price: Math.pow(10, 45) }));

C.upAndAchiev.push(new Game.Upgrade('Alternate reality', 'Unlocks the <b>Clone world</b> mode.<q>Not related to the Cookie Clicker update of the same name.</q>', (15 * Math.pow(10, 15)) - 1, [10, 21])); Game.last.pool = 'prestige'; Game.last.posX = 656; Game.last.posY = 787; Game.PrestigeUpgrades.push(Game.last); Game.last.buyFunction = function() { C.unlockCloneWorld() };
C.upAndAchiev.push(new Game.Upgrade('Cookieclysm', '<q>Related to the Cookie Clicker mod of the same name.</q>', 24, [21, 6])); Game.last.priceFunc = () => { return Game.Objects['You'].amount * Math.pow(10, 45) }; Game.last.buyFunction = function() { youpocCclysmBuy() }; Game.last.pool = 'research';
Game.RequiresConfirmation(Game.last, '<div class="block">' + loc("<b>Warning:</b> purchasing this will have unexpected, and potentially undesirable results!<br><br><br>Purchase anyway?") + '</div>');

order = 255;
C.upAndAchiev.push(Game.GrandmaSynergy('Massive grandmas', 'A large grandma to be converted into more cookies.', 'Converter')); Game.last.order = 255;
converter.grandma = Game.last;
order = 1800;
C.upAndAchiev.push(Game.TieredUpgrade('Alien volunteers', '<q>They don\'t know what they are volunteering for.</q>', 'Converter', 1)); var converterStart = Game.last.id;
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
let converterEnd = Game.last.id;

C.upAndAchiev.push(Game.SynergyUpgrade('Overgrown plants', '<q>Less maintenence required and you can turn the waste into cookies too!</q>', 'Converter', 'Farm', 'synergy1')); Game.last.order = 5000; Game.last.icon[2] = icons;
C.upAndAchiev.push(new Game.Upgrade('Clone sacrifice', `Converts one of your clones into <b>one tenth of its cost</b> worth of cookies, every 30 seconds.<q>${Math.random() < 0.1 ? 'How bad can this possibly be?' : 'What could go wrong?'}</q>`, Game.Tiers['synergy2'].price * Game.Objects['Converter'].basePrice, [5, 29, icons])); Game.last.order = 5000;
Game.last.buyFunction = function() { Game.Notify('Clone sacrifice', `Conversion of your clones into cookies has began following your purchase of <b>Clone Sacrifice</b>.`, [5, 3, icons]); };

order = 2700;
C.upAndAchiev.push(Game.TieredAchievement('Probatter', '', 'Converter', 1)); converterAStart = Game.last.id;
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
C.upAndAchiev.push(Game.ProductionAchievement('Small is never enough', 'Converter', 1));
C.upAndAchiev.push(Game.ProductionAchievement('Limitedly large', 'Converter', 2));
C.upAndAchiev.push(Game.ProductionAchievement('Hexadecimal', 'Converter', 3));
C.upAndAchiev.push(new Game.Achievement('Chubby hadrons', '', [5, 26])); converter.levelAchiev10 = Game.last; Game.last.ddesc = '';
converterAEnd = Game.last.id;

order = 1239.120; //idk but hell hus
//C.upAndAchiev.push(Game.Upgrade(''));

order = 7003;
C.upAndAchiev.push(new Game.Upgrade('Shed', '<b>Doubles</b> your building space.<q>You can\'t live here, but this will be able to shelter quite a few mice.</q>', 500, [0, 0]));
C.upAndAchiev.push(new Game.Upgrade('House', 'Multiplies your max space by <b>10</b>.<q>A nice house for grandmas to bake cookies in.</q>', 500e3, [0, 1]));
C.upAndAchiev.push(new Game.Upgrade('Field', 'Multiplies your max space by <b>10</b>.<q>Now you can farm and dig all you want.</q>', 500e6, [0, 2]));
C.upAndAchiev.push(new Game.Upgrade('Warehouse', 'Multiplies your max space by <b>10</b>.<q>A large empty building, ready to be populated with your cookie-creating machines.</q>', 500e9, [0, 3]));
C.upAndAchiev.push(new Game.Upgrade('Planet', 'Multiplies your max space by <b>10</b>.<q>It\'s about time you got yourself a place large enough to privately run your business.</q>', 500e12, [0, 4]));
C.upAndAchiev.push(new Game.Upgrade('Distant objects', 'Multiplies your max space by <b>10</b>.<q>If very distant objects are moving away from us faster than the speed of light, why not use them to go past the observable universe so you can store more things?</q>', 500e15, [0, 5]));
C.upAndAchiev.push(new Game.Upgrade('Quantum optimazation', 'Multiplies your max space by <b>10</b>.<q>Almost all of an atom is empty. Instead of wasting this space, you squeeze down the subatomic particles until cookies are substantially smaller.</q>', 500e18, [0, 6]));
C.upAndAchiev.push(new Game.Upgrade('More hard drives', 'Multiplies your max space by <b>10</b>.<q>This is a video game, so maybe you can give more space to your buildings by increasing your digital storage space.</q>', 500e21, [0, 7]));

C.upAndAchiev.push(new Game.Upgrade('Box of random stuff we found on the ground', 'Contains... stuff.<q>I don\'t think these are edible.</q>', 400 * Math.pow(10, 15), [0, 0])); Game.last.pool = 'prestige'; Game.last.parents = [Game.Upgrades['Box of maybe cookies'], Game.Upgrades['Box of not cookies'], Game.Upgrades['Box of pastries']]; Game.last.posX = -667; Game.last.posY = -1497;
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'The Running Enchilada', desc: 'Just plain chips, not anything special.', icon: [28, 33], require: 'Box of random stuff we found on the ground', power: 5, price: Math.pow(10, 51) }));
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'Playing card', desc: 'Picking this off the floor makes you feel terrible, but not the worst.', icon: [6, 2], require: 'Box of random stuff we ground on the ground', power: 5, price: Math.pow(10, 54) }));

//C.upAndAchiev.push(new Game.Upgrade('Switchblade and bleach','Makes you look different enough to hide from the cops in a church, somehow giving you <b>+10%</b> cookie production.<q>Oh Ponyboy, your hair... your tuff, tuff, hair...</q>',420,[2,2]));
//C.upAndAchiev.push(new Game.Upgrade('Cookieclysm','Gain <b>+100%</b> cookie production.<q>The beginninng.</q>',1,[2,2]));
//C.upAndAchiev.push(new Game.Upgrade('King of the Afterlife',loc('Prestige is <b>%1</b> more effective.<q>Why worship God when you can buy him for 823,543 heavenly chips?</q>','saudh'),1,[15,12]));

//C.upAndAchiev.push(new Game.Upgrade('Twitter account','Opens up Orteil\'s twitter (X).<q>Too many controversies... we need a cookieversy.</q>',41,[17,4]));Game.last.parents=['Cookieclysm'];
//Game.last.buyFunction=function(){window.open('https://twitter.com/orteil42')}

C.upAndAchiev.push(C.transcendentUpgrade('more', 'Lets you harness your <b style="color:'+C.transcendentPink+'">transcend power</b>. You can also level up this upgrade, giving <b>+%%% ➡ +%%%</b> effect from transcend power.<q>cookies<br>cookies<br>i need more<br>I NEED MORE</q>', 1, [29, 6]));//i did not know that zalgo used zero-width characters but ig you learn something new every day
Game.last.scaling = 'medium'; Game.last.increment = 3;
tUSA = 12292023; //Game.last.id; //transcendent Upgrades Start At
C.upAndAchiev.push(C.transcendentUpgrade('Transcendent kittens', 'Kittens are <b>%%% ➡ %%%</b> more powerful.<q>We are not meow mortals.</q>', 9, [18, 35])); Game.last.parents = [Game.Upgrades['more']]; Game.last.scaling = 'hard'; Game.last.increment = 0.5;

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
	Game.Upgrades[slots[i]].transcendBuy = function() {
		for (let i of this.parents) if (!i.bought) return false;
		var price = this.getPrice();
		if (C.mone >= price && !Game.Has(this.name)) {
			C.mone -= price;
			C.moneSpent += price;
			//this.unlocked=1;
			this.bought = 1;
			C.buildTranscendTree();
			//if (this.buyFunction) this.buyFunction();
			PlaySound('snd/buy' + choose([1, 2, 3, 4]) + '.mp3', 0.75);
			PlaySound('snd/shimmerClick.mp3');
			//PlaySound('snd/buyHeavenly.mp3');

			success = 1;
		}
		if (this.bought) this.buyFunction();
	}
	Game.Upgrades[slots[i]].buyFunction = function() {
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
}

//new effect scaling (not terrible and hopefully balanced [please no mhur v2])

//idle
C.upAndAchiev.push(C.transcendentUpgrade('Eternal engagement', 'Gain <b>+%%% ➡ +%%%</b> offline CpS.<q>You work faster if you\'re being watched.</q>', 14, Game.season == 'cookieclysm' ? [30, 20] : [1, 5, icons])); Game.last.parents = [Game.Upgrades['more']]; Game.last.scaling = 'soft'; Game.last.increment = 1;
C.upAndAchiev.push(C.transcendentUpgrade('Oversweetened rest', 'Your offline CpS gain is increased by <b>+%%% ➡ +%%%</b> per sugar lump, up to 555 sugar lumps.', 25, [1, 2, icons])); Game.last.parents = [Game.Upgrades['Eternal engagement']]; Game.last.scaling = 'medium'; Game.last.increment = 0.05;
C.upAndAchiev.push(C.transcendentUpgrade('Glimmering hope', 'The shimmering veil gains an extra <b>%%% ➡ %%% chance</b> not to break.', 42, [3, 2, icons])); Game.last.parents = [Game.Upgrades['Oversweetened rest']]; Game.last.scaling = 'medium'; Game.last.increment = 0.5;
C.upAndAchiev.push(C.transcendentUpgrade('Dedicated evasion', 'Holobore, Spirit of Asceticism gains a chance to not unslot when clicking a golden cookie.<q>But how long can you evade them for?</q>', 67, [21, 18])); Game.last.scaling = 'soft'; Game.last.increment = 0.01;
C.upAndAchiev.push(C.transcendentUpgrade('Locked in', 'After no activity for 5 minutes, cookie production rapidly increases up to <b>+%%% ➡ +%%%</b>.<q>Can\'t move. Can\'t talk. Can only blink.</q>', 128, [29, 2])); Game.last.scaling = 'hard'; Game.last.increment = 10;
C.upAndAchiev.push(C.transcendentUpgrade('A light in the dark', 'Brightens the Shimmering Veil, giving an additional <b>+%%% ➡ +%%%</b> CpS while the Shimmering Veil is active.', 150, [2, 1, icons])); Game.last.parents = [Game.Upgrades['Glimmering hope']]; Game.last.scaling = 'medium'; Game.last.increment = 2;
C.upAndAchiev.push(C.transcendentUpgrade('Multitasking', 'You can stay <b>Locked in</b> while doing everything except clicking the cookie.<q>You can\'t move, yet you are.</q>', 100000, [12,31])); Game.last.parents = [Game.Upgrades['Locked in']]; Game.last.notTiered = 1;

//active
C.upAndAchiev.push(C.transcendentUpgrade('Dark momentum', 'Every 1000 clicks grants <b>+%%% ➡ +%%% CpS</b>.<br><div class="warning">Resets on ascension.</div><q>This strange force compels you go further, through the pain.</q>', 60, [2, 4, icons])); Game.last.parents = [Game.Upgrades['more']]; Game.last.scaling = 'medium'; Game.last.increment = 0.5;
C.upAndAchiev.push(C.transcendentUpgrade('Emotionless', 'By truly becoming a master of asceticism, Holobore increases its connection with you.<q>Vomitrax looks at you, disgusted, but knowing that you have gone too far.</q>', 99, [1, 1, icons])); Game.last.parents = [Game.Upgrades['Eternal engagement'], Game.Upgrades['Glimmering hope']]; Game.last.scaling = 'hard'; Game.last.increment = 0.2;
Game.Upgrades['Locked in'].parents = [Game.Upgrades['Emotionless']]; Game.Upgrades['Dedicated evasion'].parents = [Game.Upgrades['Emotionless']];
C.upAndAchiev.push(C.transcendentUpgrade('Denser minerals', 'All mouse upgrades are buffed by <b>%%% ➡ %%%</b>.<q>Apply more force to the cookie. Maybe then it\'ll comply.</q>', 150, [0, 1, icons])); Game.last.parents = [Game.Upgrades['Dark momentum']]; Game.last.scaling = 'hard'; Game.last.increment = 0.1;
C.upAndAchiev.push(C.transcendentUpgrade('Flexible', 'Gain <b>%%% ➡ %%%</b> <span style="color:#00FFFF">double click chance</span>.<q>Don\'t limit yourself to two fingers.</q>', 100, [2, 3, icons])); Game.last.parents = [Game.Upgrades['Denser minerals']]; Game.last.scaling = 'hard'; Game.last.increment = 2;
C.upAndAchiev.push(C.transcendentUpgrade('No hesitation', `Reduces the time it takes for a golden cookie to spawn by <b>%%% ➡ %%%</b>.<q>${Math.random() < 0.01 ? 'When you see a chance, you gotta take it and run.' : 'Hesitation is defeat.'}</q>`, 17, [6, 1, icons])); Game.last.parents = [Game.Upgrades['more']]; Game.last.scaling = 'hard'; Game.last.increment = 0.1; 

//general
C.upAndAchiev.push(C.transcendentUpgrade('Useless treasure', 'Turns that useless silver into white chocolate, granting <b>+%%% ➡ +%%% Alchemy lab CpS</b>.<q>Silver found to also be transmutable into white chocolate!</q>', 3, [6, 30])); Game.last.scaling = 'hard'; Game.last.increment = 1000;
C.upAndAchiev.push(C.transcendentUpgrade('Efficient mana', 'Casting spells uses <b>%%% ➡ %%% less magic</b>.<q>Casting spells is a breeze to you now.</q>', 4, [0, 4, icons])); Game.last.parents = [Game.Upgrades['Transcendent kittens']]; Game.last.scaling = 'hard'; Game.last.increment = 0.01;
Game.Upgrades['Useless treasure'].parents = [Game.Upgrades['Efficient mana']];
C.upAndAchiev.push(C.transcendentUpgrade('Cheese', 'Muridal gains some buffs.<q>Swiss cheese, to be exact.</q>', 40, [0, 2, icons])); Game.last.parents = [Game.Upgrades['Efficient mana'], Game.Upgrades['Dark momentum']]; Game.last.scaling = 'medium'; Game.last.increment = 0.1;
C.upAndAchiev.push(C.transcendentUpgrade('Finally, some rest', 'Lengthens Selebrak\'s party blower.<q>More festivity, more regret, more cookies.</q>', 331, [1, 4, icons])); Game.last.parents = [Game.Upgrades['Cheese']]; Game.last.scaling = 'soft'; Game.last.increment = 1;
C.upAndAchiev.push(C.transcendentUpgrade('Fiery storm', 'Wrinklers spawn <b>+%%% ➡ %%%</b> faster.<q>Within this lapis cookie lies the flames of ambition.</q>', 200, [19, 6])); Game.last.parents = [Game.Upgrades['No hesitation']]; Game.last.scaling = 'medium'; Game.last.increment = 66;

let tUEA = Game.last.id; //transcend Upgrades End At

C.getEffects = function(upgrade, tier) {
	upgrade = Game.Upgrades[upgrade];
	if (!upgrade) return;
	return (tier || upgrade.tier) * (upgrade.increment || console.log(`upgrade ${upgrade.name} has no .increment (real)`));
}
C.getPrice = function(upgrade) {
	upgrade = Game.Upgrades[upgrade];
	if (!upgrade) return;
	let price;
	if (upgrade.scaling == 'soft') {
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

if (Kaizo) {
	Game.Upgrades['Glimmering hope'].desc = 'The shimmering veil gains an extra <b>%% ➡ %% chance</b> base health.';
	Game.Upgrades['Glimmering hope'].increment = 20;
	Game.Achievements['Armored'].desc = 'Have <b>1000 or more</b> base health on your Shimmering veil.';

	Game.Upgrades['A light in the dark'].descFunc = function() { return `Your Sparkling Wonder is <b>%%% ➡ %%%</b> more likely to save your Shimmering veil when it collapses. (Total: ${0.1 * (1 + C.getEffects(this.name)/100)})` };
	Game.Upgrades['A light in the dark'].increment = 5;

}

C.transcendentUpgrades = [];
for (let i of C.upAndAchiev) {
	if (!i.order) i.order = 100000;
	if (i.name == 'NOOO MY CPS') i.pool = 'shadow';
	if (i.pool == 'transcendent' /*i.id >= tUSA && i.id <= tUEA*/) { //o7 tUSA, but after 9 months the time has finally come to fix how transcendent upgrades work
		//i.pool = 'transcendent'; //dont question my decisions ok UPDATE: finally they have their unique pool
		if (!i.notTiered) {
			i.getPrice = function() { return C.getPrice(i.name) };
			i.descFunc = function() {
				let decimalDigitsInIncrement = parseFloat((i.increment % 1).toFixed(10)).toString().slice(2).length; //dumb thing i need to prevent round-off error
				return i.desc.replace('%%', Beautify(C.getEffects(i.name), decimalDigitsInIncrement))
							.replace('%%', Beautify(C.getEffects(i.name, i.tier+1), decimalDigitsInIncrement));
			} 
		}
		C.transcendentUpgrades.push(i);
	}
	/*
	if ((i.id >= converterStart && i.id <= converterEnd && i.type == 'upgrade') || (i.id >= converterAStart && i.id <= converterAEnd && i.type == 'achievement')) {
		i.icon[2] = icons;
		if (i.type == 'upgrade') i.order = 1800;
		else if (i.type == 'achievement') i.order = 2700;
	}
	i.order += i.id * 0.001
	*/
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
	var buildingSpace = 50;
	if (Game.Has('Shed')) buildingSpace *= 2;
	if (Game.Has('House')) buildingSpace *= 10;
	if (Game.Has('Vault')) buildingSpace *= 100;

	return buildingSpace;
}
C.getBuildingSpace = function() {
	let buildingSpace = 0;

	let cursorSpace = C.spaceValues[0];
	//if (Game.Has('Thousand fingers')) we'll make it work if cursors need to be nerfed more
	//if (Game.Has('Million fingers')) cursorSpace*=5

	//unfortunately because of the way cursor upgrades work,
	//their tieredUpgrades property only has the fortune
	for (let i in formatLong) {
		if (formatLong[i].slice(1) != 'thousand') {
			if (Game.Has('Million fingers')) {
				cursorSpace *= 1.5;
			}
			if (Game.Has(formatLong[i].slice(1, 2).toUpperCase() + formatLong[i].slice(2) + ' fingers')) {
				cursorSpace *= 2;
			}
		}
	}
	for (let i in Game.ObjectsById) {
		if (i > 0) {
			buildingSpace += C.spaceValues[i] * Game.ObjectsById[i].amount;
		}
	}
	return buildingSpace;
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
C.ignoreSpace = false;
for (let i in Game.Objects) {
	let building = Game.Objects[i];
	building.buy = Function(`
		(${building.buy.toString().replace(`Game.Spend(price);`,
		`Game.Spend(price);\n\t\t\t\tif (!C.ignoreSpace && C.getBuildingSpace() > C.getMaxBuildingSpace()) { PlaySound('snd/buy'+choose([1,2,3,4])+'.mp3',0.75); Game.Popup('Out of space!', Game.mouseX, Game.mouseY); bought--; return false; }`)}).bind(Game.Objects['${i}'])();
	`);
}

C.getSpaceHTML = function() {
	return `<b>Building space: </b>${Beautify(C.getBuildingSpace())}/${Beautify(C.getMaxBuildingSpace())} (${Beautify(Math.floor((C.getBuildingSpace() / C.getMaxBuildingSpace()) * 100))}%)`;
}
Game.UpdateMenu = Function(`
	(${Game.UpdateMenu.toString().replace(`+Game.version+'</div>'+`,`+Game.version+'</div><br><div class="listing">' + C.getSpaceHTML() + '</div>'+`)
		.replace(`var prestigeUpgradesOwned=0;`, `var prestigeUpgradesOwned=0;\n\t\tlet transcendentUpgrades = '';`)
		.replace(`cookieUpgrades+=str2;`, `cookieUpgrades+=str2;\n\t\t\telse if (me.pool == 'transcendent') { transcendentUpgrades += str2; }`)
		.replace(`prestigeUpgrades+'</div>'):'')+\n\t\t\t\t'</div>'\n\t\t\t\t):'')+`,
			`prestigeUpgrades+'</div>'):'')+\n\t\t\t\t'</div>'\n\t\t\t\t):'')+\t\t\t\t'<div class="subsection">'+\n\t\t\t\t'<div class="title">Transcendence</div>'+\n\t\t\t\t'<div id="statsTranscend">'+\n\t\t\t\t\t(transcendentUpgrades != '' ? (\n\t\t\t\t\t'<div class="listing" style="clear:left;"><b>Transcendent upgrades tiers purchased: </b> ' + C.transcendentTiers + '</div>'+\n\t\t\t\t\t'<div class="listing crateBox">'+transcendentUpgrades+'</div>') : '')+`)
	})();
`);


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

C.setTUPos('Dark momentum', 120, -20); //Dark momentum
C.setTUPos('Denser minerals', 365, -50); //Denser minerals
C.setTUPos('Flexible', 440, -100); //flexible
C.setTUPos('No hesitation', -100, 50);

C.setTUPos('Useless treasure', 50, -200); //Useless treasure
C.setTUPos('Efficient mana', 25, -250); //Efficient mana
C.setTUPos('Cheese', 50, -400); //cheese
C.setTUPos('Finally, some rest', 160, -410); //finally, some rest
C.setTUPos('Fiery storm', -100, 150);

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
			
			calcTUEffs();

			setTimeout(function() { l('transcendTransition').remove() }, 501)
		},
			3500);
	}
}
function unlockTranscend(load) { //debug
	C.transcendUnlocked = 1;
	C.onUnlockTranscend();
}

let calcTUEffs = function() {
	if (!Game.Objects['You'].minigame) return false;
	let effs = Game.Objects['You'].minigame.effs;
	effs.cps = 1 + (C.transcendPower * C.getEffects('more') / 100);
	effs.milk = 1 + (C.getEffects('Transcendent kittens') / 100);
}
let calcDynamicTUEffs = function() {
	if (!Game.Objects['You'].minigame) return false;
	let effs = Game.Objects['You'].minigame.effs;
	if (Game.Has('Locked in')) {
		let inactiveTime = Date.now() - (Game.Has('Multitasking') ? Game.lastClick : Game.lastActivity);
		if (inactiveTime > 1000 * 300) {
			let afkTime = (inactiveTime - (1000 * 300)) / 1000 / 60;
			effs.cps *= (C.getEffects('Locked in')/100) - (220 * Math.pow(1.1, -0.2 * afkTime)); //amazing equation, made on desmos
			Game.CalculateGains();
		}
	}
}

eval('Game.LoadSave=' + Game.LoadSave.toString().replace(`if (Game.Has('Fortune #102')) percent+=1;`, `if (Game.Has('Fortune #102')) percent+=1;\n\t\tpercent*=1+(C.getEffects('Eternal engagement')/100);\n\t\tpercent*=1+(Game.lumps*C.getEffects('Oversweetened rest')/100);`));

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

Game.registerHook('check', () => {
	let date = new Date();
	Game.fools = date.getDate() == 1 && date.getMonth() == 3;
});
if (Game.fools) {
	let gcPopFunc = Game.shimmerTypes['golden'].popFunc;
	gcPopFunc = Function(`
		(${gcPopFunc.toString().replace(`var choice=choose(list);`,`var choice=choose(list);\n\t\t\t\t\tif (Math.random() < 0.99) choice = 'blab';`)})();
	`);
}

eval(`Game.mouseCps=` + Game.mouseCps.toString().replaceAll(`add+=Game.cookiesPs*0.01`, `add+=Game.cookiesPs*0.01*(Game.Has('Denser minerals')?C.getEffects('Denser minerals'):1)`));

eval(`Game.shimmerTypes['golden'].getTimeMod=` + Game.shimmerTypes['golden'].getTimeMod.toString().replace(`if (Game.Has('Green yeast digestives')) m*=0.99;`,`if (Game.Has('Green yeast digestives')) m*=0.99;\n\t\t\t\t\tif (Game.Has('No hesitation')) m *= 1 - (C.getEffects('No hesitation')/100);`));

Game.registerHook('click', () => {
	if (!Game.Has('Flexible')) return false;
	let click = function() {
		let amount = amount ? amount : Game.computedMouseCps;
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

eval(`Game.UpdateWrinklers=` + Game.UpdateWrinklers.toString().replace(`chance*=Game.eff('wrinklerSpawn');`, `chance*=Game.eff('wrinklerSpawn'); if (Game.Has('Fiery storm')) { chance *= 1 + (C.getEffects('Fiery storm') / 100); /*chance = 1 - Math.pow(1 - chance, 1 + C.getEffects('Fiery storm') / 100);*/ }`));

C.moneNameThings = {
	'capn': '',
};

Game.registerHook('check', function() {
	//Game.Upgrades['King of the Afterlife'].ddesc='Prestige is <b>'+(Math.pow(3*(Game.Upgrades['King of the Afterlife'].tier+1),2))+'%</b> more effective.<q>Why worship God when you can buy him for 823,543 heavenly chips?</q>';
	//before anything is bought and also just to make sure
	for (var iiii in C.moneNameThings) {
		if (Game.hasDev) {
			if (Game.hasDev(iiii)) C.moneName = C.moneNameThings[iiii];
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
	let nextAvailAscendMode = Object.keys(Game.ascensionMode).length;
	if (!Game.ascensionModes[nextAvailAscendMode]) {
		Game.ascensionModes[nextAvailAscendMode] = {
			name: 'Clone world',
			dname: 'Clone world',
			desc: `This is a strange copy of a world, where many of your Heavenly Upgrades will not work.<div class="line"></div>You will be able to earn <b>${C.moneName}</b> in this world.`,
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
Game.LoadSave = new Function('data', 'ignoreVersionIssues', getFuncDef(Game.LoadSave).replaceAll('Game.ascensionMode!=1', 'Game.ascensionMode<1'));
Game.Reset = new Function('hard', getFuncDef(Game.Reset).replaceAll('Game.ascensionMode!=1', 'Game.ascensionMode<1'));
Game.loadLumps = new Function('time', getFuncDef(Game.loadLumps).replaceAll('Game.ascensionMode!=1', 'Game.ascensionMode<1'));
Game.canLumps = new Function(getFuncDef(Game.canLumps).replaceAll('Game.ascensionMode!=1', 'Game.ascensionMode<1'));
Game.doLumps = new Function(getFuncDef(Game.doLumps).replaceAll('Game.ascensionMode!=1', 'Game.ascensionMode<1'));
Game.CalculateGains = new Function(getFuncDef(Game.CalculateGains).replaceAll('Game.ascensionMode!=1', 'Game.ascensionMode<1'));
Game.Has = new Function('what', getFuncDef(Game.Has).replace('Game.ascensionMode==1', 'Game.ascensionMode>=1'));
Game.Logic = new Function(getFuncDef(Game.Logic).replace(`(Game.Has('Legacy') && Game.ascensionMode!=1)`, `(Game.Has('Legacy') && Game.ascensionMode<1)`));
Game.Logic = new Function(getFuncDef(Game.Logic).replace(`loc("Your prestige level is currently <b>%1</b>.<br>(CpS +%2%)",[Beautify(Game.prestige),Beautify(Game.prestige)]);`,
	`(Game.ascensionMode<2?'Your prestige level is currently <b>'+Beautify(Game.prestige)+'</b>.<br>(CpS +'+Beautify(Game.prestige)+'%)':'You currently have '+C.mone+' '+C.moneName+'.');`));
Game.Logic = new Function(getFuncDef(Game.Logic).replace(`loc("Ascending now would grant you no prestige.");`, `loc("Ascending now would grant you no "+(Game.ascensionMode<2?'prestige':C.moneName)+".");`));
Game.Logic = new Function(getFuncDef(Game.Logic).replace(`loc("Ascending now would grant you<br><b>1 prestige level</b> (+1% CpS)<br>and <b>1 heavenly chip</b> to spend.")`,
	`loc("Ascending now would grant you<br><b>1 "+(Game.ascensionMode<2?'prestige levels':C.moneName)+"</b>"+(Game.ascensionMode<2?' (+1% CpS)<br>and <b>1 heavenly chip</b> to spend':'')+".")`));
Game.Logic = new Function(getFuncDef(Game.Logic).replace(`var chipsOwned=Game.HowMuchPrestige(Game.cookiesReset);`, `var chipsOwned=(Game.ascensionMode<2?Game.HowMuchPrestige(Game.cookiesReset):0);`));
Game.UpdateAscendIntro = new Function(getFuncDef(Game.UpdateAscendIntro).replace(`Game.EarnHeavenlyChips(Game.cookiesEarned);`,
	`if (Game.ascensionMode<2)Game.EarnHeavenlyChips(Game.cookiesEarned);else C.mone+=Math.floor(Game.HowMuchPrestige(Game.cookiesEarned))*C.moneMult`));
Game.Logic = new Function(getFuncDef(Game.Logic).replace(`loc("Ascending now would grant you<br><b>%1 prestige levels</b> (+%2% CpS)<br>and <b>%3 heavenly chips</b> to spend.",[Beautify(ascendNowToGet),Beautify(ascendNowToGet),Beautify(ascendNowToGet)]);`,
	`"Ascending now would grant you<br><b>"+Beautify(ascendNowToGet)+" "+(Game.ascensionMode<2?'prestige levels':C.moneName)+"</b> "+(Game.ascendMode < 2 ? '(+%2% CpS)<br>and <b>%3 heavenly chips</b> to spend.' : '');`
));
Game.Logic = new Function(getFuncDef(Game.Logic).replace('var ascendNowToOwn=Math.floor(Game.HowMuchPrestige(Game.cookiesReset+Game.cookiesEarned));',
	'var ascendNowToOwn=Math.floor(Game.HowMuchPrestige((Game.ascensionMode<2?Game.cookiesReset:0)+Game.cookiesEarned));'
));
//probably a better way to do this but im lazy
Game.Logic = new Function(getFuncDef(Game.Logic).replace('var cookiesToNext=Game.HowManyCookiesReset(ascendNowToOwn+1)-(Game.cookiesEarned+Game.cookiesReset);',
	'var cookiesToNext=Game.HowManyCookiesReset(ascendNowToOwn+1)-(Game.cookiesEarned+0);'
));
Game.Logic = new Function(getFuncDef(Game.Logic).replace(`(EN?'Ascending! ':(loc("Ascending")+' | '))`,`(Game.OnAscend == 1?(EN?'Ascending! ':(loc("Ascending")+' | ')):'Transcending | ')`));
//now that i think about it, all of this code couldve been made in a better well but its too late now i guess

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
	if (Game.OnAscend == 2) C.drawTranscend(Crumbs.getCanvasByScope('transcend'));
});

//youpocalypse
C.youWrath = 0;

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

let updateYoupocalypse = function() {
	if (C.youWrath == 0) {
		if (Game.Has('Clone sacrifice')) {
			if (Game.T % (Game.fps * 30) == 0) {
				sacrificeClone();
				C.youWrath = 1;
				Crumbs.findObject('cloneRed', 'clones').enabled = true;
				return;
			}
		}
	}
	if (C.youWrath >= 1 && C.youWrath < 2) {
		if (Game.T % (Game.fps * 30) == 0) {
			sacrificeClone();
			C.youWrath += 0.01
			l('productName19').style.color = `rgba(255, ${255-((C.youWrath-1)*255)}, ${255-((C.youWrath-1)*255)}, 1)`;
		}
	}
	/*
	if (C.youWrath == 0) {
		if (Game.Objects['You'].amount > 200) {
			Game.Unlock('Cookieclysm');
			C.youWrath = 1;
		}
	}
	*/
}

let sacrificeClone = function() {
	if (Game.Objects['You'].amount > 0) {
		Game.Objects['You'].sacrifice();
		let cash = Game.Objects['You'].getPrice() * 0.1;
		Game.Notify('Sacrifice', `One of your clones has been sacrificed, granting you <b>${Beautify(cash)} cookies</b>. They seem a little angrier...`, [5, 3, icons], 10);
	}
}

let youpocCclysmBuy = function() {
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

let updateDrawBackground = function () {
	Game.DrawBackground = Function(
		`(${
			Game.DrawBackground.toString().replace(`Crumbs.drawObjects();`,`if (Game.OnAscend == 2) C.drawTranscend(Crumbs.getCanvasByScope('transcend'));\n\tCrumbs.drawObjects();`
		)})();
	`);
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

	return '<div style="position:absolute;left:1px;top:1px;right:1px;bottom:1px;background:linear-gradient(125deg,' + (me.pool == 'prestige' ? 'rgba(15,115,130,1) 0%,rgba(15,115,130,0)' : 'rgba(50,40,40,1) 0%,rgba(50,40,40,0)') + ' 20%);mix-blend-mode:screen;z-index:1;"></div><div style="z-index:10;padding:8px 4px;min-width:350px;position:relative;" id="tooltipCrate">' +
		'<div class="icon" style="float:left;margin-left:-8px;margin-top:-8px;' + writeIcon(icon) + '"></div>' +
		(me.bought && context == 'store' ? '' : price) +
		'<div class="name">' + (mysterious ? '???' : me.dname) + ((me.pool == 'transcendent') ? (' ' + romanize(me.tier)) : '') + '</div>' +
		tagsStr +
		'<div class="line"></div><div class="description">' + (mysterious ? '???' : desc) + '</div></div>' +
		(tip != '' ? ('<div class="line"></div><div style="font-size:10px;font-weight:bold;color:#999;text-align:center;padding-bottom:4px;line-height:100%;" class="crateTip">' + tip + '</div>') : '') +
		(Game.sesame ? ('<div style="font-size:9px;">Id: ' + me.id + ' | Order: ' + (me.order) + (me.tier ? ' | Tier: ' + me.tier : '') + ' | Icon: [' + me.icon[0] + ',' + me.icon[1] + ']' + '</div>') : '');
}
