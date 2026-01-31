//Initiating the mod i guess
let hasGodL = Game.hasGod;
let getPlantDescL = Game.Objects['Farm'].minigame ? Game.Objects['Farm'].minigame.getPlantDesc : function() {};
let capniL = 0;
let Kaizo = Game.mods['Kaizo Cookies'];
//some roman numeral function i found on stack overflow https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
// function romanize(num) { if (isNaN(num)) return NaN; var digits = String(+num).split(""), key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"], roman = "", i = 3; while (i--) roman = (key[+digits.pop() + (i * 10)] || "") + roman; return Array(+digits.join("") + 1).join("M") + roman; }
var tUSA = 884;
var transcendMeterPercent = 0;
//Handling all the mod stuff (base cookieclysm.js
function shadowSave(type) { Game.toSave = false; Game.lastDate = parseInt(Game.time); var str = ''; if (type == 3) str += '\nGame version\n'; str += Game.version + '|'; str += '|'; if (type == 3) str += '\n\nRun details'; str += (type == 3 ? '\n	run start date : ' : '') + parseInt(Game.startDate) + ';' + (type == 3 ? '\n	legacy start date : ' : '') + parseInt(Game.fullDate) + ';' + (type == 3 ? '\n	date when we last opened the game : ' : '') + parseInt(Game.lastDate) + ';' + (type == 3 ? '\n	bakery name : ' : '') + (Game.bakeryName) + ';' + (type == 3 ? '\n	seed : ' : '') + (Game.seed) + ';' + (type == 3 ? '\n	appearance : ' : '') + (Game.YouCustomizer.save()) + '|'; if (type == 3) str += '\n\nPacked preferences bitfield\n	'; var str2 = (Game.prefs.particles ? '1' : '0') + (Game.prefs.numbers ? '1' : '0') + (Game.prefs.autosave ? '1' : '0') + (Game.prefs.autoupdate ? '1' : '0') + (Game.prefs.milk ? '1' : '0') + (Game.prefs.fancy ? '1' : '0') + (Game.prefs.warn ? '1' : '0') + (Game.prefs.cursors ? '1' : '0') + (Game.prefs.focus ? '1' : '0') + (Game.prefs.format ? '1' : '0') + (Game.prefs.notifs ? '1' : '0') + (Game.prefs.wobbly ? '1' : '0') + (Game.prefs.monospace ? '1' : '0') + (Game.prefs.filters ? '1' : '0') + (Game.prefs.cookiesound ? '1' : '0') + (Game.prefs.crates ? '1' : '0') + (Game.prefs.showBackupWarning ? '1' : '0') + (Game.prefs.extraButtons ? '1' : '0') + (Game.prefs.askLumps ? '1' : '0') + (Game.prefs.customGrandmas ? '1' : '0') + (Game.prefs.timeout ? '1' : '0') + (Game.prefs.cloudSave ? '1' : '0') + (Game.prefs.bgMusic ? '1' : '0') + (Game.prefs.notScary ? '1' : '0') + (Game.prefs.fullscreen ? '1' : '0') + (Game.prefs.screenreader ? '1' : '0') + (Game.prefs.discordPresence ? '1' : '0') + ''; str2 = pack3(str2); str += str2 + '|'; if (type == 3) str += '\n\nMisc game data'; str += (type == 3 ? '\n	cookies : ' : '') + parseFloat(Game.cookies).toString() + ';' + (type == 3 ? '\n	total cookies earned : ' : '') + parseFloat(Game.cookiesEarned).toString() + ';' + (type == 3 ? '\n	cookie clicks : ' : '') + parseInt(Math.floor(Game.cookieClicks)) + ';' + (type == 3 ? '\n	golden cookie clicks : ' : '') + parseInt(Math.floor(Game.goldenClicks)) + ';' + (type == 3 ? '\n	cookies made by clicking : ' : '') + parseFloat(Game.handmadeCookies).toString() + ';' + (type == 3 ? '\n	golden cookies missed : ' : '') + parseInt(Math.floor(Game.missedGoldenClicks)) + ';' + (type == 3 ? '\n	background type : ' : '') + parseInt(Math.floor(Game.bgType)) + ';' + (type == 3 ? '\n	milk type : ' : '') + parseInt(Math.floor(Game.milkType)) + ';' + (type == 3 ? '\n	cookies from past runs : ' : '') + parseFloat(Game.cookiesReset).toString() + ';' + (type == 3 ? '\n	elder wrath : ' : '') + parseInt(Math.floor(Game.elderWrath)) + ';' + (type == 3 ? '\n	pledges : ' : '') + parseInt(Math.floor(Game.pledges)) + ';' + (type == 3 ? '\n	pledge time left : ' : '') + parseInt(Math.floor(Game.pledgeT)) + ';' + (type == 3 ? '\n	currently researching : ' : '') + parseInt(Math.floor(Game.nextResearch)) + ';' + (type == 3 ? '\n	research time left : ' : '') + parseInt(Math.floor(Game.researchT)) + ';' + (type == 3 ? '\n	ascensions : ' : '') + parseInt(Math.floor(Game.resets)) + ';' + (type == 3 ? '\n	golden cookie clicks (this run) : ' : '') + parseInt(Math.floor(Game.goldenClicksLocal)) + ';' + (type == 3 ? '\n	cookies sucked by wrinklers : ' : '') + parseFloat(Game.cookiesSucked).toString() + ';' + (type == 3 ? '\n	wrinkles popped : ' : '') + parseInt(Math.floor(Game.wrinklersPopped)) + ';' + (type == 3 ? '\n	santa level : ' : '') + parseInt(Math.floor(Game.santaLevel)) + ';' + (type == 3 ? '\n	reindeer clicked : ' : '') + parseInt(Math.floor(Game.reindeerClicked)) + ';' + (type == 3 ? '\n	season time left : ' : '') + parseInt(Math.floor(Game.seasonT)) + ';' + (type == 3 ? '\n	season switcher uses : ' : '') + parseInt(Math.floor(Game.seasonUses)) + ';' + (type == 3 ? '\n	current season : ' : '') + (Game.season ? Game.season : '') + ';'; var wrinklers = Game.SaveWrinklers(); str += (type == 3 ? '\n	amount of cookies contained in wrinklers : ' : '') + parseFloat(Math.floor(wrinklers.amount)) + ';' + (type == 3 ? '\n	number of wrinklers : ' : '') + parseInt(Math.floor(wrinklers.number)) + ';' + (type == 3 ? '\n	prestige level : ' : '') + parseFloat(Game.prestige).toString() + ';' + (type == 3 ? '\n	heavenly chips : ' : '') + parseFloat(Game.heavenlyChips).toString() + ';' + (type == 3 ? '\n	heavenly chips spent : ' : '') + parseFloat(Game.heavenlyChipsSpent).toString() + ';' + (type == 3 ? '\n	heavenly cookies : ' : '') + parseFloat(Game.heavenlyCookies).toString() + ';' + (type == 3 ? '\n	ascension mode : ' : '') + parseInt(Math.floor(Game.ascensionMode)) + ';' + (type == 3 ? '\n	permanent upgrades : ' : '') + parseInt(Math.floor(Game.permanentUpgrades[0])) + ';' + parseInt(Math.floor(Game.permanentUpgrades[1])) + ';' + parseInt(Math.floor(Game.permanentUpgrades[2])) + ';' + parseInt(Math.floor(Game.permanentUpgrades[3])) + ';' + parseInt(Math.floor(Game.permanentUpgrades[4])) + ';' + (type == 3 ? '\n	dragon level : ' : '') + parseInt(Math.floor(Game.dragonLevel)) + ';' + (type == 3 ? '\n	dragon aura : ' : '') + parseInt(Math.floor(Game.dragonAura)) + ';' + (type == 3 ? '\n	dragon aura 2 : ' : '') + parseInt(Math.floor(Game.dragonAura2)) + ';' + (type == 3 ? '\n	chime type : ' : '') + parseInt(Math.floor(Game.chimeType)) + ';' + (type == 3 ? '\n	volume : ' : '') + parseInt(Math.floor(Game.volume)) + ';' + (type == 3 ? '\n	number of shiny wrinklers : ' : '') + parseInt(Math.floor(wrinklers.shinies)) + ';' + (type == 3 ? '\n	amount of cookies contained in shiny wrinklers : ' : '') + parseFloat(Math.floor(wrinklers.amountShinies)) + ';' + (type == 3 ? '\n	current amount of sugar lumps : ' : '') + parseFloat(Math.floor(Game.lumps)) + ';' + (type == 3 ? '\n	total amount of sugar lumps made : ' : '') + parseFloat(Math.floor(Game.lumpsTotal)) + ';' + (type == 3 ? '\n	time when current sugar lump started : ' : '') + parseFloat(Math.floor(Game.lumpT)) + ';' + (type == 3 ? '\n	time when last refilled a minigame with a sugar lump : ' : '') + parseFloat(Math.floor(Game.lumpRefill)) + ';' + (type == 3 ? '\n	sugar lump type : ' : '') + parseInt(Math.floor(Game.lumpCurrentType)) + ';' + (type == 3 ? '\n	vault : ' : '') + Game.vault.join(',') + ';' + (type == 3 ? '\n	heralds : ' : '') + parseInt(Game.heralds) + ';' + (type == 3 ? '\n	golden cookie fortune : ' : '') + parseInt(Game.fortuneGC) + ';' + (type == 3 ? '\n	CpS fortune : ' : '') + parseInt(Game.fortuneCPS) + ';' + (type == 3 ? '\n	highest raw CpS : ' : '') + parseFloat(Game.cookiesPsRawHighest) + ';' + (type == 3 ? '\n	music volume : ' : '') + parseInt(Math.floor(Game.volumeMusic)) + ';' + (type == 3 ? '\n	cookies sent : ' : '') + parseInt(Math.floor(Game.cookiesSent)) + ';' + (type == 3 ? '\n	cookies received : ' : '') + parseInt(Math.floor(Game.cookiesReceived)) + ';' + '|'; if (type == 3) str += '\n\nBuildings : amount, bought, cookies produced, level, minigame data'; for (var i in Game.Objects) { var me = Game.Objects[i]; if (type == 3) str += '\n	' + me.name + ' : '; if (me.vanilla) { str += me.amount + ',' + me.bought + ',' + parseFloat(Math.floor(me.totalCookies)) + ',' + parseInt(me.level); if (Game.isMinigameReady(me)) str += ',' + me.minigame.save(); else str += ',' + (me.minigameSave || ''); str += ',' + (me.muted ? '1' : '0'); str += ',' + me.highest; str += ';'; } } str += '|'; if (type == 3) str += '\n\nPacked upgrades bitfield (unlocked and bought)\n	'; var toCompress = []; for (var i in Game.UpgradesById) { var me = Game.UpgradesById[i]; if (me.vanilla) toCompress.push(Math.min(me.unlocked, 1), Math.min(me.bought, 1)); }; toCompress = pack3(toCompress.join('')); str += toCompress; str += '|'; if (type == 3) str += '\n\nPacked achievements bitfield (won)\n	'; var toCompress = []; for (var i in Game.AchievementsById) { var me = Game.AchievementsById[i]; if (me.vanilla) toCompress.push(Math.min(me.won)); } toCompress = pack3(toCompress.join('')); str += toCompress; str += '|'; if (type == 3) str += '\n\nBuffs : type, maxTime, time, arg1, arg2, arg3'; for (var i in Game.buffs) { var me = Game.buffs[i]; if (me.type) { if (type == 3) str += '\n	' + me.type.name + ' : '; if (me.type.vanilla) { str += me.type.id + ',' + me.maxTime + ',' + me.time; if (typeof me.arg1 !== 'undefined') str += ',' + parseFloat(me.arg1); if (typeof me.arg2 !== 'undefined') str += ',' + parseFloat(me.arg2); if (typeof me.arg3 !== 'undefined') str += ',' + parseFloat(me.arg3); str += ';'; } } } if (type == 3) str += '\n\nCustom :\n'; str += '|'; str += Game.saveModData(); Game.lastSaveData = str; if (type == 2 || type == 3) { return str; } else if (type == 1) { str = escape(utf8_to_b64(str) + '!END!'); return str; } else { if (Game.useLocalStorage) { str = utf8_to_b64(str) + '!END!'; if (str.length < 10) { } else { str = escape(str); localStorageSet(Game.SaveTo, str); if (App) App.save(str); if (!localStorageGet(Game.SaveTo)) { } else if (document.hasFocus()) { } } } else { var now = new Date(); now.setFullYear(now.getFullYear() + 5); str = utf8_to_b64(str) + '!END!'; Game.saveData = escape(str); str = Game.SaveTo + '=' + escape(str) + '; expires=' + now.toUTCString() + ';'; document.cookie = str; if (App) App.save(str); if (document.cookie.indexOf(Game.SaveTo) < 0) { } else if (document.hasFocus()) { } } } }
var cookieTracker, cpsTracker, shimmerTracker, lumpTracker;
if (typeof C === 'undefined') var C = {};
else {
    Game.Notify(`Mod identifier already in use! Cookieclysm is only compatible with ${Cookieclysm.compatibleMods.join(', ')}`);
    Game.WriteSave = function() { };
}
C.version = '1.0.4';
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

	if (Game.hasBuff('Famine')) {
        if (Game.ObjectsById[capniL].amount != 0) {
            if (capniL != 19) {
                Game.ObjectsById[capniL].sacrifice(Math.min(Game.ObjectsById[capniL].amount, Math.max(1, Math.floor(Game.ObjectsById[capniL].amount * 0.04))));
            } else {
				// Game.GiveUpAscend(1); too harsh
                Game.killBuff('Famine');
				capniL = 0;
            }
        }
        else {
            capniL++;
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
			l('mone').textContent = Beautify(C.mone);//find a beter way to do this then checking every frame
			l('transcendPower').textContent = C.transcendPower;//this too
			C.transcendPower = Math.floor(Math.log10(Game.prestige + 1));//also this
			ascendInfoCopy.childNodes[1].childNodes[2].childNodes[0].textContent = Math.floor(C.dmone);
			ascendInfoCopy.childNodes[0].childNodes[2].childNodes[0].textContent = C.transcendPower;
			ascendInfoCopy.style.margin = 'auto';
            transcendMeterPercentT = Math.log10(Game.prestige + 1) - Math.floor(Math.log10(Game.prestige + 1));
            transcendMeterPercent += (transcendMeterPercentT - transcendMeterPercent) * 0.1;
			transcendMeterl.style.backgroundPosition = (-Game.T * 0.5 - transcendMeterPercent * 100) + 'px';
			transcendMeterl.style.width = (transcendMeterPercent * 100) + '%';
		}
	}

	C.dmone += (C.mone - C.dmone) * 0.3;
	if (Math.abs(C.dmone - C.mone) < 0.1) C.dmone = C.mone;

	if (Game.mods['Cookieclysm'].loadStr) {
		try {
		    C.load(Game.mods['Cookieclysm'].loadStr);
        } catch (error) {
            Game.Prompt('<noClose><h3>Error</h3><div class="line"></div><div>For some reason, your save could not be loaded.<div class="line"></div>Check the browser console if you need your save file.</div><br>', [], 0, 'widePrompt');
            console.warn('=========================\nSave file: (right-click and click "copy object")');
            console.warn(Game.WriteSave(1));
            console.warn('=========================');
            Game.Loop = function() { };
        }
	}
	// if (Game.Has('Clone sacrifice')) C.updateYoupocalypse();
	if (Game.AscendTimer > 0 && Game.AscendTimer < 75 && C.bigCookieGone) Game.AscendTimer = Game.AscendBreakpoint;

	if (C.doCookieFalling) C.cookieFallingAnimation();
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
		str += (i.unlocked << 1) | i.bought;
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

	//cookieclysm
	str += [
        C.cookieclysm
    ].join(',');
	str += '/';

    //chocolate shop
    str += C.chocolate;

	return str;
}
C.load = function(str) {
    console.log(str);
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

	let clysmData = spl[7].split(',');
	if (parseFloat(version) != version) {
		//only newer versions
	    C.youWrath = parseFloat(clysmData[0]) || 0;
	}

    if (Game.Has('Alternate reality')) Game.Upgrades['Alternate reality'].buyFunction(); //fix later
    Game.Objects['Converter'].refresh();
    // C.unlockSpaceUpgrades();
    Game.upgradesToRebuild = true;
    if (Game.Has('Season switcher')) Game.Unlock('Cataclysmic biscuit');

    Game.mods['Cookieclysm'].toLoad = false;
    Game.mods['Cookieclysm'].loadStr = '';
}

//random variable sets i guess

//this NEEDS to be early on in the file
C.images = {
    icons: Game.mods['Cookieclysm'].dir + '/img/icons.png',
    superWrinkler: Game.mods['Cookieclysm'].dir + '/img/superWrinkler2.png',
    superWrinklerShiny: Game.mods['Cookieclysm'].dir + '/img/superWrinkler.png',
    transcendLink: Game.mods['Cookieclysm'].dir + '/img/transcendLink.png',
    converterStore: Game.mods['Cookieclysm'].dir + '/img/converterIcon.png',
    converter: Game.mods['Cookieclysm'].dir + '/img/building.png',
    riftBorders: Game.mods['Cookieclysm'].dir + '/img/riftBorders.png',
};

C.transcendentPink = '#da70d6';
C.cookieclysmPink = '#FF6EC7';
if (new Date().getMonth() == 10) {
	let date = new Date().getDate();
	if (date >= 2 && date <= 11) {
        Game.baseSeason = 'cookieclysm';
	    if (Game.season != 'cookieclysm') Game.Notify('Cookieclysm day!', 'It\'s the time of the year around when Cookieclysm started development! Nothing much happens but it\'s funny to make this a season I guess', [0, 0, C.images.icons]);
    }
}
Game.seasons['cookieclysm'] = {
	name: 'Cookieclysm',
	start: 'YeetDragon24\'s suffering has begun!',
	over: 'YeetDragon24\'s suffering is over.',
	trigger: 'Cataclysmic biscuit'
};

function inRect(n,r,o){var s=n+-(Math.sin(-o.r)*(o.h/2-o.o)),t=r+-(Math.cos(-o.r)*(o.h/2-o.o)),c=Math.sqrt(s*s+t*t),h=Math.atan2(t,s)-o.r,i=Math.cos(h)*c,$=Math.sin(h)*c;return!!(i>-.5*o.w)&&!!(i<.5*o.w)&&!!($>-.5*o.h)&&!!($<.5*o.h)}

//https://stackoverflow.com/questions/34810995/how-is-version-number-comparison-working-correctly-in-javascript
function compare(a, b){return a.localeCompare(b,undefined,{numeric:true,sensitivity:'base'})}

//taken from Cookie Clicker v. 2.032
Game.GiveUpAscend = function(bypass) {
    if (!bypass) Game.Prompt('<h3>Give up</h3><div class="block">Are you sure? You\'ll have to start this run over and won\'t gain any heavenly chips!</div>',[['Yes','Game.ClosePrompt();Game.GiveUpAscend(1);'],'No']);
    else {
        if (Game.prefs.popups) Game.Popup('Game reset');
        else Game.Notify('Gave up','Let\'s try this again!',[0,5],4);
        Game.Reset();
    }
}

/*
converter (function from CCSE) (make it not stolen from CCSE later)
*/
var NewBuilding = function(name, commonName, desc, icon, iconColumn, art, price, cps, buyFunction, foolObject, buildingSpecial) { var me = new Game.Object(name, commonName, desc, icon, iconColumn, art, price, cps, buyFunction); if (foolObject) Game.foolObjects[name] = foolObject; if (buildingSpecial) Game.goldenCookieBuildingBuffs[name] = buildingSpecial; if (art.customBuildingPic) { Game.customBuildStore.push(function() { l('productIcon' + me.id).style.backgroundImage = 'url(' + art.customBuildingPic + ')'; l('productIconOff' + me.id).style.backgroundImage = 'url(' + art.customBuildingPic + ')'; }); } if (art.customIconsPic) { Game.customBuildings[name].tooltip.push(function(obj, ret) { if (me.locked) return ret; else return ret.replace('background-position', 'background-image:url(' + obj.art.customIconsPic + ');background-position'); }); } Game.BuildStore(); me.canvas = l('rowCanvas' + me.id); me.ctx = me.canvas.getContext('2d', { alpha: false }); me.pics = []; var icon = [0 * 64, me.icon * 64]; var muteStr = '<div class="tinyProductIcon" id="mutedProduct' + me.id + '" style="display:none;' + (me.art.customBuildingPic ? 'background-image:url(' + me.art.customBuildingPic + ');' : '') + 'background-position:-' + icon[0] + 'px -' + icon[1] + 'px;" ' + Game.clickStr + '="Game.ObjectsById[' + me.id + '].mute(0);PlaySound(Game.ObjectsById[' + me.id + '].muted?\'snd/clickOff.mp3\':\'snd/clickOn.mp3\');" ' + Game.getDynamicTooltip('Game.mutedBuildingTooltip(' + me.id + ')', 'this') + '></div>'; AddEvent(me.canvas, 'mouseover', function(me) { return function() { me.mouseOn = true; } }(me)); AddEvent(me.canvas, 'mouseout', function(me) { return function() { me.mouseOn = false; } }(me)); AddEvent(me.canvas, 'mousemove', function(me) { return function(e) { var box = this.getBoundingClientRect(); me.mousePos[0] = e.pageX - box.left; me.mousePos[1] = e.pageY - box.top; } }(me)); l('buildingsMute').innerHTML += muteStr; Game.recalculateGains = 1; return me; }
NewBuilding('Converter',
    'converter|converters|converted|[X] extra chamber|[X] extra chambers',
	'Converts living mass into cookies.', 21, 5,
	{
		pic: C.images.converter,
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
eval(`Game.BuildStore = ` + Game.BuildStore.toString().replace(`me.l=l('product'+me.id);`, `me.l=l('product'+me.id); Game.Objects['Converter'].l.childNodes[0].style.background = Game.Objects['Converter'].l.childNodes[1].style.background = 'url("${C.images.converterStore}")';`));

let converter = Game.Objects['Converter'];
converter.desc = 'Converts living matter into cookies.'; //right now mod is only english so this avoids loc issues
converter.unshackleUpgrade = 'Unshackled converters'; //doesnt exist but fixes Game.Has calling undefined for the tooltip
eval(`converter.tooltip = ${converter.tooltip.toString().replace(`var icon=[me.iconColumn,0];`, `var icon=[me.iconColumn, 0, '${C.images.icons}'];`)}`);
locStrings['%1 converter'] = ['%1 converter', '%1 converters'];
l('mutedProduct20').style.setProperty('background-image', `url("${C.images.converter}")`);
Game.BuildStore();

/*
upgrades and achievements (C.upAndAchiev)
*/

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
    let upgrade = new Game.Upgrade(name, `You have <b>${power} more</b> available cursor ring${power == 1 ? '' : 's'}.<q>${quote}</q>`, price, [9, C.cursorUpgrades.length, C.images.icons]);
    upgrade.power = power;
    C.cursorUpgrades.push(upgrade);
    return upgrade;
}
C.clysmUpgrades = [];
C.clysmUpgrade = function(name, desc, price, icon) {
    let upgrade = new Game.Upgrade(name, desc, price, icon);
    C.clysmUpgrades.push(upgrade);
    Game.PrestigeUpgrades.push(upgrade);
    upgrade.pool = 'prestige';
    return upgrade;
}
C.mutuallyExclusive = function(upgradeA, upgradeB) {
    Game.Upgrades[upgradeA].mutuallyExclusive = upgradeB;
    Game.Upgrades[upgradeB].mutuallyExclusive = upgradeA;
}

//fix i have to do because scope binding
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
C.upAndAchiev.push(new Game.Achievement('NOOO MY CPS', 'Activate the famine.<q>You were warned about this.</q>', [30, 2])); Game.last.pool = 'shadow';

order = 10000;
C.upAndAchiev.push(new Game.Achievement('Armored','Have a <b>100% or more</b> chance for your Shimmering veil to not break.', [7, 10])); Game.last.order = 10000.44;

order = 10070;
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'Hard Pasta', desc: 'You should probably cook these. Or should you bake them?', icon: [28, 32], require: 'Box of not cookies', power: 5, price: Math.pow(10, 45) }));

order = 510;
C.upAndAchiev.push(new Game.Upgrade('Alternate reality', 'Unlocks the <b>Clone world</b> mode.<q>Not related to the Cookie Clicker update of the same name.</q>', (15 * Math.pow(10, 15)) - 1, [33, 21]));
Game.last.pool = 'prestige'; Game.last.posX = 656; Game.last.posY = 787; Game.PrestigeUpgrades.push(Game.last); Game.last.buyFunction = function() { C.unlockCloneWorld() }; Game.last.parents = [Game.Upgrades['Unshackled idleverses']];
//C.upAndAchiev.push(new Game.Upgrade('Cookieclysm', '<q>Related to the Cookie Clicker mod of the same name.</q>', 24, [21, 6])); Game.last.priceFunc = function() { return Game.Objects['You'].amount * Math.pow(10, 45) }; Game.last.pool = 'research';
//Game.RequiresConfirmation(Game.last, '<div class="block">' + loc("<b>Warning:</b> purchasing this will have unexpected, and potentially undesirable results!<br><br><br>Purchase anyway?") + '</div>');
C.upAndAchiev.push(new C.clysmUpgrade('Rift', 'Begins the Cookieclysm.<q>The tear in reality created by the anger of your clones.</q>', 300e6, [31, 2])); Game.last.posX = -830; Game.last.posY = -628; Game.last.buyFunction = function() { C.cookieclysm = true; };
//C.upAndAchiev.push(new Game.Upgrade('Flaming worm', `Unlocks a <b><span style="color: ${C.transcendentPink}">special wrinkler</span></b>.`, 2, [2, 2, C.images.icons])); Game.last.priceFunc = function() { return this.bought ? 300e6 }; Game.last.pool = 'prestige';
// Game.last.parents = [Game.Upgrades['Legacy']];

//chocolate (???)
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
C.upAndAchiev.push(new Game.Upgrade('Cataclysmic biscuit', 'Triggers <b>Cookieclysm season</b> for the next 24 hours.<br>Triggering another season will cancel this one.<br>Cost scales with unbuffed CpS and increases with every season switch.<q>please don\'t make me go back</q>', Game.seasonTriggerBasePrice, [0, 0, C.images.icons])); Game.last.season='cookieclysm'; Game.last.pool='toggle';
Game.Upgrades['Cataclysmic biscuit'].descFunc=function(){return '<div style="text-align:center;">'+Game.saySeasonSwitchUses()+'<div class="line"></div></div>'+this.desc;};
Game.computeSeasons();
Game.computeSeasonPrices();

order = 255;
C.upAndAchiev.push(Game.GrandmaSynergy('Massive grandmas', 'A large grandma to be converted into more cookies.', 'Converter'));
converter.grandma = Game.last;
order = 1800;
let converterStart = C.upAndAchiev.length;
C.upAndAchiev.push(Game.TieredUpgrade('Alien volunteers', '<q>They don\'t know what they are volunteering for.</q>', 'Converter', 1)); 
C.upAndAchiev.push(Game.TieredUpgrade('Salty electrons', '<q>Electrons are now required to be converted as well instead of retaining their structure, and as a result are salty.</q>', 'Converter', 2));
C.upAndAchiev.push(Game.TieredUpgrade('Box hypothesis', '<q>Can’t think of one, make new <span style="display:none">-Stream Sniper</span></q>', 'Converter', 3));
C.upAndAchiev.push(Game.TieredUpgrade('Small dough converters', '<q>Some... "experiments" have left you with live cookie dough, and you see this as an opportunity.</q>', 'Converter', 4));
C.upAndAchiev.push(Game.TieredUpgrade('Oven explosion', '<q>And that\'s how it all ended.</q>', 'Converter', 5));
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
C.upAndAchiev.push(Game.SynergyUpgrade('Overgrown plants', '<q>Less maintenence required and you can turn the waste into cookies too!</q>', 'Converter', 'Farm', 'synergy1')); Game.last.icon[2] = C.images.icons;
C.upAndAchiev.push(Game.SynergyUpgrade('Clone sacrifice', `</q><br>Converts one of your clones into <b>one tenth of its cost</b> worth of cookies, every 30 seconds.<q>${Math.random() < 0.1 ? 'How bad can this possibly be?' : 'What could go wrong?'}</q>`, 'Converter', 'You', 'synergy2')); Game.last.icon[2] = C.images.icons;
Game.last.buyFunction = function() { Game.Notify('Clone sacrifice', `Conversion of your clones into cookies has began following your purchase of <b>Clone Sacrifice</b>.`, [5, 3, C.images.icons]); };
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
C.upAndAchiev.push(new Game.Achievement('Slender baryons', '', [5, 26, C.images.icons])); converter.levelAchiev10 = Game.last; Game.last.ddesc = '';
let converterEnd = C.upAndAchiev.length;

order = 7003;
let spaceDesc = (amount) => amount < 5 ** amount >= 2 ? `<b>${['Doubles', 'Triples', 'Quadruples'][amount-2]}</b> your max space.` : `Multiplies your max space by <b>${amount}</b>.`; 
C.spaceUpgrades = [];
C.upAndAchiev.push(C.spaceUpgrade('Shed', 5, '<q>You can\'t live here, but this will be able to shelter quite a few mice.</q>', 500, [7, Game.Tiers[1].iconRow, C.images.icons])); 
C.upAndAchiev.push(C.spaceUpgrade('House', 2, '<q>A nice house for grandmas to bake cookies in.</q>', 500e2, [7, Game.Tiers[2].iconRow, C.images.icons]));
C.upAndAchiev.push(C.spaceUpgrade('Field', 5,'<q>Now you can farm and dig all you want.</q>', 500e4, [7, Game.Tiers[3].iconRow, C.images.icons]));
C.upAndAchiev.push(C.spaceUpgrade('Warehouse', 2, '<q>A large empty building, ready to be populated with your cookie-creating machines.</q>', 500e6, [7, Game.Tiers[4].iconRow, C.images.icons]));
//C.upAndAchiev.push(new Game.Upgrade('Farmland', spaceDesc(10) + '<q>More space for your farms, and whatever else you do to make cookies.</q>', 500e8, [7, 4]));
//C.upAndAchiev.push(new Game.Upgrade('Glacial remnants', spaceDesc(10) + '<q>Who would live here? Perfect for preserving cookies.</q>', 500e8, [7, 14, C.images.icons]));
C.upAndAchiev.push(C.spaceUpgrade('Planet', 5, '<q>It\'s about time you got yourself a place large enough to run your business with more privacy.</q>', 500e9, [7, Game.Tiers[5].iconRow, C.images.icons]));
C.upAndAchiev.push(C.spaceUpgrade('The future', 2, '<q>Running out of space? Make it a problem for future you instead!</q>', 500e12, [7, Game.Tiers[6].iconRow, C.images.icons]));
C.upAndAchiev.push(C.spaceUpgrade('Distant objects', 5, '<q>If very distant objects are moving away from us faster than the speed of light, why not use them to go past the observable universe so you can store more things?</q>', 500e15, [7, Game.Tiers[7].iconRow, C.images.icons]));
C.upAndAchiev.push(C.spaceUpgrade('Quantum optimazation', 2, '<q>Almost all of an atom is empty space. Instead of wasting this space, you squeeze down the subatomic particles until cookies are substantially smaller.</q>', 500e18, [7, Game.Tiers[8].iconRow, C.images.icons]));
//C.upAndAchiev.push(new Game.Upgrade('More hard drives', spaceDesc(10) + '<q>This is a video game, so maybe you can give more space to your buildings by increasing your digital storage space.</q>', 500e21, [7, 19, C.images.icons]));
//C.upAndAchiev.push(new Game.Upgrade('Genetic restructuring', spaceDesc(10) + '<q>One way to get more space is to make everything else smaller. Like people. They won\'t notice as long as they have enough cookies.</q>', 500e24, [7, 28, C.images.icons]));

order = 550;
C.upAndAchiev.push(new Game.Upgrade('Box of random stuff we found on the ground', 'Contains... stuff.<q>I don\'t think these are edible.</q>', 400 * Math.pow(10, 12), [34, 12])); 
Game.PrestigeUpgrades.push(Game.last); Game.last.pool = 'prestige'; Game.last.parents = [Game.Upgrades['Box of maybe cookies'], Game.Upgrades['Box of not cookies'], Game.Upgrades['Box of pastries']]; Game.last.posX = -667; Game.last.posY = -1497;
order = 10070;
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'The Running Burrito', desc: 'Just plain chips, not anything special.', icon: [6, 5, C.images.icons], require: 'Box of random stuff we found on the ground', power: 5, price: Math.pow(10, 51) }));
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'Playing card', desc: 'Picking this off the floor makes you feel terrible, but not the worst.', icon: [6, 2, C.images.icons], require: 'Box of random stuff we found on the ground', power: 5, price: Math.pow(10, 54) }));
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'Jealousy', desc: 'It\'s unclear how you got jealousy in a tangible form, but it definitely has a lot of sugar.', icon: [6, 3, C.images.icons], require: 'Box of random stuff we found on the ground', power: 5, price: Math.pow(10, 57) }));
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'Pure black and white cookies', desc: 'You didn\'t eat any of these. So why is one missing?', icon: [0, 4], require: 'Box of random stuff we found on the ground', power: 5, price: Math.pow(10, 60) }));
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'Snow', desc: 'Let it snow, let it snow, let it snow', icon: [30, 22], require: 'Box of random stuff we found on the ground', power: 5, price: Math.pow(10, 60) }));
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'American cheese', desc:'Not legally cheese, likely plastic.', icon: [6, 4, C.images.icons], require: 'Box of random stuff we found on the ground', power: 5, price: Math.pow(10, 57) }));
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'Eclipse crisps', desc: 'Crispier than 4/8.', icon: [0, 4], require: 'Box of random stuff we found on the ground', power: 5, price: Math.pow(10, 54) }));

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
C.upAndAchiev.push(C.transcendentUpgrade('Transcendent kittens', 'Kittens are <b>%%% ➡ %%%</b> more powerful.<q>We are not meow mortals.</q>', 9, [18, 35], { scaling: 'hard', increment: 0.5 }));

order = 100000
C.upAndAchiev.push(C.transcendentUpgrade('Unshackle slot #1', 'Choosing an Unshackle upgrade to put it this slot allows you to unshackle the building.', 9, [10, 35]));
C.upAndAchiev.push(C.transcendentUpgrade('Unshackle slot #2', 'Choosing an Unshackle upgrade to put it this slot allows you to unshackle the building.', 81, [10, 35]));
C.upAndAchiev.push(C.transcendentUpgrade('Unshackle slot #3', 'Choosing an Unshackle upgrade to put it this slot allows you to unshackle the building.', 6561, [10, 35]));

//new effect scaling (not terrible and hopefully balanced [please no mhur v2])
order = 1000;
C.upAndAchiev.push(C.transcendentUpgrade('Eternal engagement', 'Gain <b>+%%% ➡ +%%%</b> offline CpS.<q>You work faster if you\'re being watched.</q>', 14, Game.season == 'cookieclysm' ? [30, 20] : [1, 5, C.images.icons], { scaling: 'soft', increment: 1 }));
C.upAndAchiev.push(C.transcendentUpgrade('Oversweetened rest', 'Your offline CpS gain is increased by <b>+%%% ➡ +%%%</b> per unspent sugar lump, up to 555 sugar lumps.<q>Invest, leave, and come back rich.</q>', 25, [1, 2, C.images.icons], { scaling: 'medium', increment: 0.05 }));
C.upAndAchiev.push(C.transcendentUpgrade('Glimmering hope', 'The shimmering veil gains an extra <b>%%% ➡ %%% chance</b> not to break.<q>Glimmeringue with a chance to escape.</q>', 42, [3, 2, C.images.icons], { scaling: 'medium', increment: 0.5 }));
C.upAndAchiev.push(C.transcendentUpgrade('Dedicated evasion', 'Holobore, Spirit of Asceticism gains a chance to not unslot when clicking a golden cookie.<q>But how long can you evade them for?</q>', 67, [21, 18], { scaling: 'soft', increment: 0.01 }));
C.upAndAchiev.push(C.transcendentUpgrade('Locked in', 'After no activity for 5 minutes, cookie production rapidly increases up to <b>+%%% ➡ +%%%</b>.<q>Can\'t move. Can\'t talk. Can only blink.</q>', 128, [29, 2], { scaling: 'hard', increment: 10 }));
C.upAndAchiev.push(C.transcendentUpgrade('A light in the dark', 'Brightens the Shimmering Veil, giving an additional <b>+%%% ➡ +%%%</b> CpS while the Shimmering Veil is active.<q>The light at the end of the tunnel.</q>', 150, [2, 1, C.images.icons], { scaling: 'medium', increment: 2 }));
C.upAndAchiev.push(C.transcendentUpgrade('Multitasking', 'You can stay <b>Locked in</b> while doing everything except clicking the cookie.<q>You can\'t move, yet you are.</q>', 100000, [12,31])); Game.last.parents = [Game.Upgrades['Locked in']]; Game.last.notTiered = 1;

C.upAndAchiev.push(C.transcendentUpgrade('Dark momentum', 'Every 1000 clicks grants <b>+%%% ➡ +%%% CpS</b>.<br><div class="warning">Resets on ascension.</div><q>To the moon.</q>', 60, [2, 4, C.images.icons], { scaling: 'medium', increment: 0.1 }));
C.upAndAchiev.push(C.transcendentUpgrade('Emotionless', '<q>Why are we still here? Just to suffer...</q>', 99, [1, 1, C.images.icons], { scaling: 'hard', increment: 0.2 }));
C.upAndAchiev.push(C.transcendentUpgrade('Denser minerals', 'All mouse upgrades are buffed by <b>%%% ➡ %%%</b>.<q>Glossier than the shiniest Iridyum.</q>', 150, [0, 1, C.images.icons], { scaling: 'hard', increment: 0.1 }));
C.upAndAchiev.push(C.transcendentUpgrade('Flexible', 'Gain <b>%%% ➡ %%%</b> <span style="color:#00FFFF">double click chance</span>.<q>Don\'t limit yourself to two fingers.</q>', 100, [2, 3, C.images.icons], { scaling: 'hard', increment: 2 }));
C.upAndAchiev.push(C.transcendentUpgrade('No hesitation', `Reduces the time it takes for a golden cookie to spawn by <b>%%% ➡ %%%</b>.<q>${Math.random() < 0.1 ? 'When you see a chance, you have to take it and run.' : 'Hesitation is defeat.'}</q>`, 17, [0, 6, C.images.icons], { scaling: 'hard', increment: 0.1 }));

C.upAndAchiev.push(C.transcendentUpgrade('Useless treasure', 'Turns that useless silver into white chocolate, granting <b>+%%% ➡ +%%% Alchemy lab CpS</b>.<q>Silver found to also be transmutable into white chocolate!</q>', 3, [6, 30], { scaling: 'hard', increment: 1000 }));
C.upAndAchiev.push(C.transcendentUpgrade('Efficient mana', 'Casting spells uses <b>%%% ➡ %%% less magic</b>.<q>Casting spells is a breeze to you now.</q>', 4, [0, 4, C.images.icons], { scaling: 'hard', increment: 0.01 }));
C.upAndAchiev.push(C.transcendentUpgrade('Cheese', 'Muridal gains some bonuses.', 40, [0, 3, C.images.icons], { scaling: 'soft', increment: 1 })); Game.last.descFunc = function() { return this.desc + (this.bought ? '<br>These bonuses are increased by <b>+%%% ➡ +%%%</b>.<q>Swiss cheese, to be exact.</q>' : '') };
C.upAndAchiev.push(C.transcendentUpgrade('Finally, some rest', 'Selebrak gains some bonuses.', 331, [1, 4, C.images.icons], { scaling: 'soft', increment: 1 })); Game.last.descFunc = function() { return this.desc + (this.bought ? '<br>These bonuses are increased by <b>+%%% ➡ +%%%</b>.' : '') + '<q>More festivity, more regret, more cookies.</q>'; };
C.upAndAchiev.push(C.transcendentUpgrade('Fiery storm', 'Wrinklers spawn <b>+%%% ➡ +%%%</b> faster.<q>Within this lapis cookie lies the flames of pure ambition.</q>', 200, [19, 6], { scaling: 'medium', increment: 66 }));
C.upAndAchiev.push(C.transcendentUpgrade('Mone buff', '', 10, [12, 14], { scaling: 'medium', increment: 1 })); Game.last.descFunc = function() { this.dname = C.moneName + ' buff'; return `Gain <b>+%%% ➡ +%%%</b> more ${C.moneName} from Clone worlds.<br>Every 3 tiers <b>increases the digit cap</b> of the amount of ${C.moneName} you can gain in the clone world by 1.<q>To climb the mountain faster.<br>Current digit cap: ${Math.floor(Game.Upgrades['Mone buff'].tier/3) + 2} ${Beautify((10 ** (Math.floor(Game.Upgrades['Mone buff'].tier/3) + 2)) - 1)}</q>`; };
C.upAndAchiev.push(C.transcendentUpgrade('Puck', 'Skruuia gains some bonuses.', 14, [2, 2, C.images.icons], { scaling: 'medium', increment: 5 })); Game.last.descFunc = function() { return this.desc + (this.bought ? '<br>These bonuses are increased by <b>+%%% ➡ +%%%</b>.' : '') + '<q>Always left at the bottom.</q>'; };
C.upAndAchiev.push(C.transcendentUpgrade('Mutation', 'Mokalsium gains some bonuses.', 10, [26, 1], { scaling: 'medium', increment: 25 })); Game.last.descFunc = function() { return this.desc + (this.bought ? '<br>These bonuses are increased by <b>+%%% ➡ +%%%</b>.' : '') + '<q>Descending infinitely, into the fiery abyss.</q>'; };


//post-release upgrades
order = 10070
C.upAndAchiev.push(Game.NewUpgradeCookie({ name: 'RMS Carpathia', desc: 'The RMS <i>Carpathia</i> was a passenger steamship built between 190&zwnj;2 and 190&zwnj;3. The <i>Carpathia</i> is most famous for saving 705 passengers of the RMS <i>Titanic</i> on April 15th, 191&zwnj;2. Unfortunately, the <i>Carpathia</i> was sunk on July 17th, 191&zwnj;8, during World War I. The <i>Carpathia</i> is named after the Carpathian Mountains, found in central Europe.', icon: [0, 4], require: 'Box of random stuff we found on the ground', power: 5, price: Math.pow(10, 48) }));
C.upAndAchiev.push(C.transcendentUpgrade('Brighter gloves', 'Buffs Aura gloves by <b>+%%% ➡ +%%%</b>.<q>Create a world of light.</q>', 30, [3, 3, C.images.icons], { scaling: 'soft', increment: 0.2 }));

order = 8000;
C.upAndAchiev.push(C.cursorUpgrade('Mercury', 'Fun to mess with sometimes.', 5e2, 1));
C.upAndAchiev.push(C.cursorUpgrade('Venus', 'Be different like Venus and spin in the wrong direction.', 5e5, 1));
C.upAndAchiev.push(C.cursorUpgrade('Earth', 'Earth is primarily known as the place where cookies were first invented by humans in the 7th century.', 5e8, 1));
C.upAndAchiev.push(C.cursorUpgrade('Mars', 'Mars\' largest moon, Phobos, is on an unstable orbit and will eventually break up and form a ring.', 5e11, 1));
C.upAndAchiev.push(C.cursorUpgrade('Ceres', 'Not a planet, but a dwarf planet.', 5e15, 1));
C.upAndAchiev.push(C.cursorUpgrade('Jupiter', 'Jupiter is pretty large.', 5e18, 1));
C.upAndAchiev.push(C.cursorUpgrade('Saturn', 'People always credit Saturn for its beautiful rings even though all the gas giants have rings.', 5e21, 1));
C.upAndAchiev.push(C.cursorUpgrade('Uranus', 'Uranus is flipped on its side. This would be cool if the planet was not the subject of many unfortunate jokes.', 5e25, 1));
C.upAndAchiev.push(C.cursorUpgrade('Neptune', 'Neptune is more pale greenish-blue than the usual deep blue depiction.', 5e28, 1));
C.upAndAchiev.push(C.cursorUpgrade('Pluto', 'A runt among giants.', 5e32, 1));
C.upAndAchiev.push(C.cursorUpgrade('Haumea', 'The faster it spins, the more oval it becomes.', 5e35, 1));
C.upAndAchiev.push(C.cursorUpgrade('Makemake', 'Time to makemake some cookies.', 5e38, 1));
C.upAndAchiev.push(C.cursorUpgrade('Eris', 'Eris is the Greek goddess of discord.', 5e41, 1));
C.upAndAchiev.push(C.cursorUpgrade('Planet X', 'Does it exist?', 5e44, 1));
C.upAndAchiev.push(C.cursorUpgrade('Oort cloud', 'The edge of the solar system. Will your cursors reach this far?', 5e47, 1));
C.upAndAchiev.push(C.cursorUpgrade('Cookie planet', 'The one that all the shipments go to.', 5e51, 1));
order = 254;
C.upAndAchiev.push(new Game.Upgrade('Ring gloves', 'You have <b>3 more</b> available cursor rings.', 555555555555555, [9, 16, C.images.icons])); Game.last.pool = 'prestige'; Game.PrestigeUpgrades.push(Game.last);
Game.last.posX = -127 - (23*1.75); Game.last.posY = -415 - (216*1.75); Game.last.parents = [Game.Upgrades['Luminous gloves']];
C.upAndAchiev.push(C.transcendentUpgrade('Lord of the Rings', 'Gain <b>+%% ➡ +%%</b> available cursor rings.<q>One Ring to bring them all, and in the darkness click them.</q>', 3, [2, 6, C.images.icons], { scaling: 'hard', increment: 1 })); Game.last.parents = [Game.Upgrades['Brighter gloves']];

order = 10500;
C.upAndAchiev.push(new Game.Achievement('Spender', 'Spend 100 moné.', [3, 0, C.images.icons])); Game.last.descFunc = function() { this.dname = 'Sp&eacute;nder'; return `Spend <b>100</b> ${C.moneName}.`; };
C.upAndAchiev.push(new Game.Achievement('Bezos', 'Spend 10,000 moné.', [3, 0, C.images.icons])); Game.last.descFunc = function() { this.dname = 'B&eacute;zos'; return `Spend <b>10,000</b> ${C.moneName}.`; }; Game.last.pool = 'shadow';

order = 510;
C.upAndAchiev.push(C.clysmUpgrade('Strawberry-flavored worm bait', `You can now attract <b><span style="color: ${C.cookieclysmPink}">super wrinklers</span></b>.<q>These massive beasts use interdimensional travel to pursue their prey.</q>`, 1e9, [10, 0, C.images.icons]));
Game.last.parents = [Game.Upgrades['Rift']]; Game.last.posX = -1125; Game.last.posY = -724;

order = 21025;
C.upAndAchiev.push(new Game.Achievement('Youpocalypse', 'Trigger the Youpocalypse for the first time.', [10, 1, C.images.icons]));

order = 510;
C.upAndAchiev.push(C.clysmUpgrade('Ants', '<b>Ants</b> can appear on wrinklers. Click them to take back the cookies they steal.', 600e6, [8, 0, C.images.icons])); //Ants exist from this upgrade
C.upAndAchiev.push(C.clysmUpgrade('Red ants', '<b>Red ants</b> will be able to appear. Red ants return their stolen cookies automatically.<q>Are they truly friendly, or do they have their own sinister agenda?</q>', 600e6, [8, 1, C.images.icons]));
C.upAndAchiev.push(C.clysmUpgrade('Aphids', 'Ants can infest farms. Each ant makes farms <b>5%</b> less efficient.<q>They aren\'t really aphids, but they definitely are voracious.</q>', 600e6, [8, 1, C.images.icons]));
C.upAndAchiev.push(C.clysmUpgrade('Antfestation', 'Each ant increases the chances of another ant appearing.<q>Ants can leave chemical trails signaling for others to follow.</q>', 600e6, [8, 0, C.images.icons]));
C.upAndAchiev.push(C.clysmUpgrade('Red ants #2', 'Red ants are <b>50%</b> more common. Ants have a <b>5%</b> chance to instantly leave wrinklers.<q>Natural selection.</q>', 600e6, [8, 1, C.images.icons]));

C.upAndAchiev.push(C.clysmUpgrade('Some bees', '<b>Bees</b> can appear on wrinklers instead of ants<br>Bees will never leave their spot on a wrinkler.<q>Don\'t let them get past you!</q>', 600e6, [8, 0, C.images.icons]));
C.upAndAchiev.push(C.clysmUpgrade('Cataclysm', '<b>Clysm cookies</b> will be able to appear and provide positive and negative effects.<q>Quite cataclysmic. Possibly even catastrophic.</q>', 600e6, [10, 2, C.images.icons]));

C.upAndAchiev.push(C.clysmUpgrade('Barons', '<span style="display:none">rockefeller</span>Unlocks the <b>Barons</b> upgrades.<q>Capitalize more than ever before.</q>', 600e6, [18, 33]));
C.upAndAchiev.push(C.clysmUpgrade('Captains', '<span style="display:none">Vanderbilt</span>Unlocks the <b>Captains</b> upgrades.<q>Pushing society forward with monumental advancements in industry</q>', 600e6, [12, 33]));

C.upAndAchiev.push(C.clysmUpgrade('G. C. Organ', 'Banks gain <b>+50% cps</b> for every stock you are investing in.<q>A banker so great, he can even bypass bank caps.</q>', 600e6, [1, 33]));
C.upAndAchiev.push(C.clysmUpgrade('Oil', 'You are <b>5%</b> less efficient.<br>Mines are <b>five times/b> as efficient.<q>Powering your factories.</q>', 600e6, [13, 33]));
C.upAndAchiev.push(C.clysmUpgrade('Rail', 'You are <b>5%</b> less efficient.<br>Shipments are <b>five times</b> as efficient.<q>Transporting your cookies.</q>', 600e6, [25, 21]));
C.upAndAchiev.push(C.clysmUpgrade('Steel', 'You are <b>5%</b> less efficient.<br>Factories are <b>five times</b> as efficient.<q>Building your infrastructure.</q>', 600e6, [33, 12]));
C.upAndAchiev.push(C.clysmUpgrade('Banking', 'Unlock the oil, rail, and steel stocks in the stock market.<q>Abusing your influence turns out to be quite profitable.</q>', 600e6, [15, 17]));
//cheap labor: you are 5% cheaper, angier faster and sacrificed faster

C.upAndAchiev.push(C.clysmUpgrade('Industrialization', 'Factories gain <b>+1% CpS</b> for each factory you own.', 600e6, [16, 7]));
C.upAndAchiev.push(C.clysmUpgrade('Market expansion', 'Gain <b>+0.5%</b> CpS for every idleverse you own.', 600e6, [11, 33]));
C.upAndAchiev.push(C.clysmUpgrade('Job availability', 'You are <b>25%</b> cheaper.<q>Cheap labor is the key to a better and more efficient future.</q>', 600e6, [18, 0]));
C.upAndAchiev.push(C.clysmUpgrade('Dogma of Dough', 'Your cookies in bank is capped to <b>10 days</b> of production.<br>Buildings are <b>15%</b> cheaper while you are at the cap.<q>You can\'t possibly be greedy if you impose this on yourself.</q>', 600e6, [22, 12]));
//divide:
//	-Greed: increase cap to 1000 (?) days, can still stay as a captain
//  -Avarice: increase cap to 1000 years (?) merges into robber baron path (add sb reference)
//  -modesty: 

C.upAndAchiev.push(C.clysmUpgrade('Bug bites', 'Ants can infest you. Each ant makes you <b>5%</b> less efficient.<q>Your clones are too itchy to make cookies.</q>', 600e6, [8, 0, C.images.icons]));
C.upAndAchiev.push(C.clysmUpgrade('Features', 'Ants can infest Javascript consoles. Each ant makes Javascript consoles <b>5%</b> less efficient.<q>100% intended, of course.</q>', 600e6, [8, 0, C.images.icons]));

order = 6001;
C.upAndAchiev.push(new Game.Achievement('Transcendent explorer', 'Buy <b>5</b> tiers of transcendent upgrades.', [10, 3, C.images.icons]));
C.upAndAchiev.push(new Game.Achievement('Transcendent warrior', 'Buy <b>55</b> tiers of transcendent upgrades.',[10, 3, C.images.icons]));
C.upAndAchiev.push(new Game.Achievement('Transcendent conqueror', 'Buy <b>555</b> tiers of transcendent upgrades.', [10, 3, C.images.icons]));


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
	if (i.order == Game.AchievementsById[Game.AchievementsN - 1].order) i.order = 100000;
	if (i.pool == 'transcendent' /*i.id >= tUSA && i.id <= tUEA*/) { //after 9 months the time has finally come to fix how transcendent upgrades work
		//i.pool = 'transcendent'; //dont question my decisions ok UPDATE: finally they have their own pool
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
		i.icon[2] = C.images.icons;
		i.iconFunction = function() {
			let icon = this.icon.slice(0) || [];
			if ((Game.season == 'cookieclysm' || Game.baseSeason == 'cookieclysm') && !isNaN(parseInt(this.tier))) icon[0] -= 1;
			return icon;
		}
	}
}
LocalizeUpgradesAndAchievs();
for (var i in Game.UnlockAt){Game.Upgrades[Game.UnlockAt[i].name].unlockAt=Game.UnlockAt[i];}

new Game.buffType('spirit sniped', function(time, power) {
	return {
		name: 'Spirits sniped',
		desc: 'Your god Stream Sniper is angry at your worship of the Pantheon spirits! The Pantheon is not providing any effects!',
		icon: [1, 0, C.images.icons],
		time: time * Game.fps,
		power: power,
		add: true
	}
});
new Game.buffType('famine', function(time, power) {
	return {
		name: 'Famine',
		desc: 'Your god Captain Crozier is angry at your usage of the Garden and is punishing you!',
		icon: [2, 0, C.images.icons],
		time: time * Game.fps,
		power: power,
		add: true,
		aura: 2 //:cold_face:
	}
});
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


/*
building space (and cursor rings)
*/

C.ignoreSpace = false; //testing
C.spaceValues = [ //the space taken up by a single building of id i
	1, 10, 30, 25, 25, 10, 25, 10, 25, 25, 15,
	25, 25, 10, Math.floor(Math.random() * 15) + 10,
	25, 5, 100, 250, 10, 25
];

C.getMaxBuildingSpace = function() {
	if (C.ignoreSpace) return Number.MAX_VALUE;
	let buildingSpace = 50;
    C.spaceUpgrades.forEach(function(upgrade) { if (Game.Has(upgrade.name)) buildingSpace *= upgrade.power; });
    return buildingSpace;
}
C.getBuildingSpace = function() {
	let buildingSpace = 0;
	for (let i in Game.ObjectsById) {
		if (i > 0 && !Game.ObjectsById[i].muted) {
			 buildingSpace += C.spaceValues[i] * Game.ObjectsById[i].amount;
		}
	}
	return buildingSpace;
}

C.spaceUnlockThresholds = [5, 20, 50, 100, 250, 500, 750, 1000, 1500, 2500, 3000, 4000, 5000, 6000, 7500];
C.unlockSpaceUpgrades = function() {
	let highest = -1;
	for (let i = 0; i < C.spaceUpgrades.length; i++) {
		if (Game.HasUnlocked(C.spaceUpgrades[i].name)) {
			highest = i;
			continue;
		}
		if (C.spaceUpgrades[i] && Game.BuildingsOwned - Game.Objects['Cursor'].amount >= C.spaceUnlockThresholds[i]) {
            Game.Unlock(C.spaceUpgrades[i].name);
        }
	}
	C.nextSpaceUnlock = C.spaceUnlockThresholds[highest + 1] - Game.BuildingsOwned > 0 ? C.spaceUnlockThresholds[highest + 1] : C.spaceUnlockThresholds[highest + 2];
}

C.getMaxCursors = function() {
    return 50 * (C.cursorUpgrades.filter(x => x.bought).length + 1);
}
C.unlockCursorUpgrades = function() {
    for (let i = 0; i < C.cursorUpgrades.length; i++) {
        if (C.cursorUpgrades[i].unlocked || Game.Objects['Cursor'].amount >= 50 * (i + 1)) Game.Unlock(C.cursorUpgrades[i].name);
        else break;
    }
} 

document.querySelectorAll('.productButton.productMute').forEach(function(button) {
	Game.attachTooltip(button, '<div style="width:150px;text-align:center;font-size:11px;" id="tooltipMuteBuilding"><b>Mute</b><br>Disable this building, giving you a little bit of extra space.</div>');
	button.addEventListener('click', function() { Game.recalculateGains = 1; });
});
for (let i in Game.Objects) eval(`Game.Objects['${i}'].cps = ` + Game.Objects[i].cps.toString().replace(`return `, `return Number(!this.muted) * `));
Game.mutedBuildingTooltip = function(id) {
	return function() {
		var me=Game.ObjectsById[id];
		return '<div style="width:150px;text-align:center;font-size:11px;" id="tooltipMutedBuilding">'+(EN?('<b>'+cap(me.plural)+(me.level>0?' (lvl.&nbsp;'+me.level+')':'')+'</b><div class="line"></div>Click to unmute '+me.plural+'<br>(enable this building)'):('<b>'+loc("Level %1 %2",[Beautify(me.level),me.plural])+'</b><div class="line"></div>'+loc("Click to unmute")))+'</div>';
	}
}
document.querySelectorAll('.tinyProductIcon').forEach(x => x.addEventListener('click', function() {
	if (C.getBuildingSpace() > C.getMaxBuildingSpace()) {
		Game.ObjectsById[parseInt(this.id.replace('mutedProduct', ''))].mute(1);
		Game.Popup('Out of space!', Game.mouseX, Game.mouseY);
		return;
	}
	Game.recalculateGains = 1;
}));

for (let i in Game.Objects) {
    let building = Game.Objects[i];
    if (i == 'Cursor') {
        eval('building.buy = ' + building.buy.toString().replace(`this.bought++;`,
            `this.bought++;\n\t\t\t\tif (this.amount > C.getMaxCursors()) { PlaySound('snd/buy'+choose([1,2,3,4])+'.mp3',0.75); Game.Popup('Next ring not unlocked!', Game.mouseX, Game.mouseY); bought--; this.bought--; this.amount--; this.refresh(); return false; }`)
            .replace('success=1;', 'success=1; C.unlockCursorUpgrades();'));
    }
    else {
        eval('building.buy = ' + building.buy.toString().replace(`this.bought++;`,
            `this.bought++;\n\t\t\t\tif (!C.ignoreSpace && C.getBuildingSpace() > C.getMaxBuildingSpace()) { PlaySound('snd/buy'+choose([1,2,3,4])+'.mp3',0.75); Game.Popup('Out of space!', Game.mouseX, Game.mouseY); bought--; this.bought--; this.amount--; this.refresh(); C.unlockSpaceUpgrades(); return false; }`)
            .replace(`this.refresh();}`, `this.refresh();\n\t\t\t\t\tC.unlockSpaceUpgrades();\n\t\t\t\t\tif (Game.onMenu == 'stats') l('spaceAmount').innerHTML = C.getSpaceString();\n\t\t\t\t}`));
        eval('building.sell = ' + building.sell.toString().replace(`this.refresh();}`, `this.refresh();\n\t\t\t\t\tif (Game.onMenu == 'stats') l('spaceAmount').innerHTML = C.getSpaceString();\n\t\t\t\t}`));
    }
}

C.getSpaceHTML = function() {
	return `<span id="spaceAmount">
			<div class="listing"><b>Maximum cursor rings: </b>${C.getMaxCursors() / 50}</div>
			<div class="listing"><b>Building space: </b>${Beautify(C.getBuildingSpace())}/${Beautify(C.getMaxBuildingSpace())} (${Beautify(Math.floor((C.getBuildingSpace() / C.getMaxBuildingSpace()) * 100))}%)</div>
			<div class="listing"><b>Buildings until next upgrade: </b>${isNaN(SimpleBeautify(C.nextSpaceUnlock - Game.BuildingsOwned)) ? 'all upgrades unlocked' : SimpleBeautify(C.nextSpaceUnlock - Game.BuildingsOwned)}</div>
			</span>`;
}

/*
transcend (but outside of logic) (other transcend stuff)
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
C.transcendentTiers = 0;
C.transcendModifier = 0;
C.transcendModifierTypes = [
	{
		name: 'Regular',
		desc: 'How are you seeing this?<br>A bug, probably.<br>That would not be good.',
		icon: [23, 0], //empty icon
        ascendUpgrades: Game.PrestigeUpgrades,
	},
    {
		name: 'Rift',
		desc: 'You ventured too far and fell into the cracks between reality.',
		icon: [30, 2],
        ascendUpgrades: C.clysmUpgrades,
	},
	{
		name: 'Hell',
		desc: 'Unfortunately, you weren\'t careful enough and ended up in hell.',
		icon: [15, 5],
	},
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
C.setTUPos('A light in the dark', -1300, 20); //a light in the dark
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
C.setTUPos('Lord of the Rings', 240, 65);

C.initUnshackleSlots = function() {
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
            Object.values(Game.Objects).forEach(function(me) {
                for (let slot of C.unshackleSlots) { if (slot == me.id) return; } //check if not already in another permaslot
                list.push(me);
            });
            list.sort((a, b) => a.order - b.order);
            let upgrades = list.reduce(me => Game.crate(me, '', `PlaySound('snd/tick.mp3');Game.PutUpgradeInPermanentSlot(${me.id}, ${slot});`, `upgradeForPermanent${me.id}`), '');
            let upgrade = C.unshackleSlots[slot];
            Game.SelectingPermanentUpgrade = upgrade;
            Game.Prompt('<id PickUnshackleUpgrade><h3>' + loc("Pick a building to unshackle") + '</h3>' +
                '<div class="line"></div><div style="margin:4px auto;clear:both;width:120px;"><div class="crate upgrade enabled" style="background-position:' + (-slot * 48) + 'px ' + (-10 * 48) + 'px;"></div><div id="upgradeToSlotNone" class="crate upgrade enabled" style="background-position:' + (-0 * 48) + 'px ' + (-7 * 48) + 'px;display:' + (upgrade != -1 ? 'none' : 'block') + ';"></div><div id="upgradeToSlotWrap" style="float:left;display:' + (upgrade == -1 ? 'none' : 'block') + ';">' + (Game.crate(Game.UpgradesById[upgrade == -1 ? 0 : upgrade], '', '', 'upgradeToSlot')) + '</div></div>' +
                '<div class="block crateBox" style="overflow-y:scroll;float:left;clear:left;width:317px;padding:0px;height:250px;">' + upgrades + '</div>' +
                '<div class="block" style="float:right;width:152px;clear:right;height:234px;">' + loc("Here are all the unshackle upgrades you\'ve bought.<div class=\"line\"></div>Pick one to unshackle it!<div class=\"line\"></div>You can reassign this slot anytime you transcend.") + '</div>'
                , [[loc("Confirm"), 'C.unshackleSlots[' + slot + ']=Game.SelectingPermanentUpgrade;C.buildTranscendTree();Game.ClosePrompt();'], loc("Cancel")], 0, 'widePrompt');
        }
        Game.Upgrades[slots[i]].iconFunction = function(i) { return function() { return C.unshackleSlots[i] == -1 ? this.icon : Game.UpgradesById[C.unshackleSlots[i]].icon; } }(i);
    }
}
C.initUnshackleSlots();

C.initTUParents = function() {
    Game.Upgrades['Transcendent kittens'].parents = [Game.Upgrades['more']];
        Game.Upgrades['Efficient mana'].parents = [Game.Upgrades['Transcendent kittens']];
            Game.Upgrades['Useless treasure'].parents = [Game.Upgrades['Efficient mana']];
            Game.Upgrades['Cheese'].parents = [Game.Upgrades['Efficient mana']];
                Game.Upgrades['Finally, some rest'].parents = [Game.Upgrades['Cheese']];
                    Game.Upgrades['Puck'].parents = [Game.Upgrades['Finally, some rest']];
                Game.Upgrades['Mutation'].parents = [Game.Upgrades['Cheese']];
    Game.Upgrades['Unshackle slot #1'].parents = [Game.Upgrades['more']];
        Game.Upgrades['Unshackle slot #2'].parents = [Game.Upgrades['Unshackle slot #1']];
            Game.Upgrades['Unshackle slot #3'].parents = [Game.Upgrades['Unshackle slot #2']];
    Game.Upgrades['Eternal engagement'].parents = [Game.Upgrades['more']];
        Game.Upgrades['Oversweetened rest'].parents = [Game.Upgrades['Eternal engagement']];
            Game.Upgrades['Glimmering hope'].parents = [Game.Upgrades['Oversweetened rest']];
                Game.Upgrades['A light in the dark'].parents = [Game.Upgrades['Glimmering hope']];
        Game.Upgrades['Emotionless'].parents = [Game.Upgrades['Eternal engagement'], Game.Upgrades['Glimmering hope']];
            Game.Upgrades['Locked in'].parents = [Game.Upgrades['Emotionless']];
                Game.Upgrades['Multitasking'].parents = [Game.Upgrades['Locked in']];
            Game.Upgrades['Dedicated evasion'].parents = [Game.Upgrades['Emotionless']];
    Game.Upgrades['Dark momentum'].parents = [Game.Upgrades['more']];
        Game.Upgrades['Denser minerals'].parents = [Game.Upgrades['Dark momentum']];
            Game.Upgrades['Flexible'].parents = [Game.Upgrades['Denser minerals']];
    Game.Upgrades['No hesitation'].parents = [Game.Upgrades['more']];
    Game.Upgrades['Mone buff'].parents = [Game.Upgrades['more']];
    Game.Upgrades['Brighter gloves'].parents = [Game.Upgrades['more']];
	Game.Upgrades['Fiery storm'].parents = [Game.Upgrades['more']];
}
C.initTUParents();

Game.Upgrade.prototype.transcendBuy = function() {
	if (this.pool != 'transcendent') return false;
	for (let i of this.parents) if (!i.bought) return false;
	let price = this.getPrice();
	if (C.mone >= price) {
		C.mone -= price;
		C.moneSpent += price;
		if (!Game.Has[this.name]) {
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
C.updateTUTiers = function() {
    let count = 0;
	for (let i of C.transcendentUpgrades) {
		count += i.tier;
	}
	C.transcendentTiers = count;
    if (C.transcendentTiers >= 5) Game.Win('Transcendent explorer');
    if (C.transcendentTiers >= 55) Game.Win('Transcendent warrior');
    if (C.transcendentTiers >= 555) Game.Win('Transcendent conqueror');
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

			// Game.removeClass('ascending');
			Game.OnAscend = 2;
			
            if (C.transcends == 0) {
                // C.transcendModifier = 1; //first time go to rift
            }

			l('transcend').style.removeProperty('display');
			Game.Background.canvas.style.zIndex = '1000000';

			C.mone += C.transcendPower - C.lastTranscendP;
			C.lastTranscendP = C.transcendPower;
			C.transcendOffXT = Game.bounds.width * -0.5;
			C.transcendOffYT = Game.bounds.height * -0.5;
			// if (C.transcendPower - C.lastTranscendP > 1) C.transcendModifier = choose(C.transcendModifierPool());
			
            C.transcends++;

            setTimeout(function() { l('transcendTransition').remove() }, 501);
		}, 3500);
	}
}
C.leaveTranscend = function(bypass) {
	if (!bypass) {
		if (Math.seedrandom) Math.seedrandom('prompt ' + Game.resets);
		Game.Prompt(`
            <id Descend>
            <h3>Descend</h3>
            <div class="block">Are you ready to return to reality?${
                (
                    false /* Math.random() < (C.transcendModifier != 0 ? 0.8 : 0.3) */ ?  `<div class="line"></div><span class="red">Things might be a little different than what you\'re used to.</span>`
                    : ''
                )
        }</div>`, [['Yes', 'Game.ClosePrompt();C.leaveTranscend(1);'], 'No']);
	} else {
		l('game').appendChild(transcendTransition);
		transcendAnimationStyle();
		setTimeout(function() {
			//copied from Game.Ascend() and edited
			Game.Notify('Descending', 'Welcome back, ' + Game.bakeryName, [20, 7], 5);
			Game.killShimmers();
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
		}, 3500);
	}
}

Game.shimmersL.style.setProperty('z-index', '1000000');
eval('Game.GetHeavenlyMultiplier = ' + Game.GetHeavenlyMultiplier.toString().replace(`if (Game.Has('Heavenly key')) heavenlyMult+=0.25;`, `if (Game.Has('Heavenly key')) heavenlyMult+=0.25;\n\tif (Game.Has('more')) heavenlyMult += C.transcendPower * C.getEffects('more') / 100;`));

eval('Game.Reset = ' + Game.Reset.toString().replaceAll(`me.pool!='prestige'`, `(me.pool!='prestige' && me.pool!='transcendent')`))

C.calcTUEffs = function() {
	if (!Game.Objects['You'].minigame) return false;
	let effs = Game.Objects['You'].minigame.effs;
	effs.cps = 1 + (C.transcendPower * C.getEffects('more') / 100);
	effs.milk = 1 + (C.getEffects('Transcendent kittens') / 100);
}

C.calcDynamicTUEffs = function(cps) {    
	if (Game.Has('Locked in')) {
		let inactiveTime = Date.now() - (Game.Has('Multitasking') ? (Game.lastClick || Date.now()) : Game.lastActivity);
		if (inactiveTime > 1000 * 300) {
			let afkTime = (inactiveTime - (1000 * 300)) / 1000 / 60;
			cps *= Math.max(1, (C.getEffects('Locked in')/100) - (220 * Math.pow(1.1, -0.2 * afkTime))); //amazing equation, made on desmos
		}
	}
    if (Game.Has('Finally, some rest') && Game.hasGod('seasons')) {
        let mult = 1;
        if (Game.season != '') mult += 0.25;
        if (Game.baseSeason != '') mult + 0.25;
        if (Game.monday) mult *= 0.75;
		cps *= mult;
    }

	return cps;
}

eval('Game.LoadSave=' + Game.LoadSave.toString().replace(`if (Game.Has('Fortune #102')) percent+=1;`, `if (Game.Has('Fortune #102')) percent+=1;\n\t\tpercent*=C.calcOfflineMults();`)
    .replace('Game.loadModData();', 'Game.loadModData(); Cookieclysm.toLoad = true;'));
C.calcOfflineMults = function() {
    let mult = 1;
    if (Game.Has('Eternal engagement')) mult *= C.getEffects('Eternal engagement')/100;
    if (Game.Has('Oversweetened rest')) mult *= 1 + (Math.min(Game.lumps, 555) * C.getEffects('Oversweetened rest') / 100);
    if (Game.hasDev && Game.hasDev('capn')) mult *= 1 + (Game.Objects['You'].level * 3);
}

//Relaxed asceticism
eval(`Game.shimmerTypes['golden'].popFunc=` + Game.shimmerTypes['golden'].popFunc.toString().replace(`if (Game.forceUnslotGod('asceticism')) Game.useSwap(1000000);`, `if (Game.Objects['Temple'].minigame.gods['asceticism'].slot>-1) {if (Math.random() < C.getEffects('Relaxed asceticism') &&  Game.forceUnslotGod('asceticism')) { Game.useSwap(1000000); } else { Game.Notify('Not so dedicated','Your <b>Relaxed Asceticism</b> prevented Holobore from being yeeted from your pantheon.',[21,18]); } }`));

//Emotionless
eval(`Game.CalculateGains=`+Game.CalculateGains.toString().replace(`else if (godLvl==3) mult*=1.05;`,`else if (godLvl==3) mult*=1.05;\n\t\t\t\tmult*=1+(C.getEffects('Emotionless')/100);`));



//Glimmering hope
eval(`Game.getVeilDefense=` + Game.getVeilDefense.toString().replace(`if (Game.Has('Glittering edge')) n+=0.1;`, `if (Game.Has('Glittering edge')) n+=0.1;\n\t\t\ n += C.getEffects('Glimmering hope')/100;`));
Game.registerHook('check', function() { if (Game.getVeilDefense() > 1) Game.Win('Armored'); });
//hopefully will make high percentages less annoying (maybe make a pref that is default on for this)
eval(`Game.loseShimmeringVeil=` + Game.loseShimmeringVeil.toString().replace(`Game.Notify(loc(`, `if (Game.getVeilDefense() < 0.7 || Date.now()-Game.lastClick > 4*Game.getVeilDefense()) Game.Notify(loc(`));

//A light in the dark
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

//move to kazio.js eventually
if (Kaizo) {
    eval('Game.setVeilMaxHP = ' + Game.setVeilMaxHP.toString().replace(`if (decay.isConditional('veil')) { h *= 1000; }`,`if (decay.isConditional('veil')) { h *= 1000; }\n\tif (Game.Has('Glimmering hope')) { h *= 1 + (C.getEffects('Glimmering hope')) }`));
	eval('Game.collapseVeil = ' + Game.collapseVeil.toString().replace(`Math.random() < 0.1`, `Math.random() < 0.1 * (1 + C.getEffects('A light in the dark'))`));
}

//Useless treasure
Game.Objects['Alchemy lab'].cps = function(me) {
	var mult = 1;
	mult *= Game.GetTieredCpsMult(me);
	mult *= Game.magicCpS(me.name);
	if (Game.Has('Useless treasure')) {
		mult *= C.getEffects('Useless treasure');
	}
	return me.baseCps * mult;
}

//Finally, some rest
C.onFSR = function() {
	let date = new Date();
	Game.fools = date.getDate() == 1 && date.getMonth() == 3;
    if (Game.fools) {
        eval(`Game.shimmerTypes['golden'].popFunc = ` + Game.shimmerTypes['golden'].popFunc.toString().replace(`var choice=choose(list);`,`var choice=choose(list);\n\t\t\t\t\tif (Math.random() < 0.99) choice = 'blab'; else choice = choose(C.foolsAllGC);`));
    }
    Game.monday = date.getDay == 1;
}
C.onFSR();
C.foolsAllGC = ['frenzy', 'multiply cookies', 'blood frenzy', 'chain cookie', 'cookie storm', 'everything must go', 'dragonflight', 'cursed finger', 'building special', 'free sugar lump', 'dragon harvest'];

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

//fiery storm
eval(`Game.UpdateWrinklers=` + Game.UpdateWrinklers.toString().replace(`chance*=Game.eff('wrinklerSpawn');`, `chance*=Game.eff('wrinklerSpawn'); if (Game.Has('Fiery storm')) { chance *= 1 + (C.getEffects('Fiery storm') / 100); /*chance = 1 - Math.pow(1 - chance, 1 + C.getEffects('Fiery storm') / 100);*/ }`));


//puck
for (let i = 0; i < 3; i++) Game.wrinklers.push({id:parseInt(i)+14,close:0,sucked:0,phase:0,x:0,y:0,r:0,hurt:0,hp:Game.wrinklerHP,selected:0,type:0,clicks:0});
Game.wrinklerLimit = 17;
Crumbs.initWrinklers();

eval('Game.getWrinklersMax = ' + Game.getWrinklersMax.toString().replace(`return`, `if (Game.Has('Puck') && Game.hasGod?.('scorn')) n += 4 - Game.hasGod('scorn'); return`))

C.puckMult = function(mult) { return 1 + ((mult ?? 1) * C.getEffects('Puck') * (Game.hasGod?.('scorn') ?  4 - Game.hasGod('scorn') : 0) * 0.01); };
C.skruuiaT = 0;

C.mokalMult = function(mult) { return 1 + ((mult ?? 1) * C.getEffects('Mutation') * (Game.hasGod && Game.hasGod('mother') ?  4 - Game.hasGod('mother') : 0) * 0.01) };



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

eval(`Game.Has = ` + Game.Has.toString().replace(`if`, `if (what?.toLowerCase().includes('unshackled') && it?.buildingTie) return it.bought && C.unshackleSlots.includes(i.id); if`));


/*
	CLONE WORLD
*/
C.unlockCloneWorld = function() {
	let nextAvailAscendMode = 1017; //number chosen by stream sniper
	if (!Game.ascensionModes[nextAvailAscendMode]) {
		Game.ascensionModes[nextAvailAscendMode] = {
			name: 'Clone world',
			dname: 'Clone world',
			desc: `This is a strange copy of the world, where many of your Heavenly Upgrades will not work. Many things will reflect their state in the real world.<div class="line"></div>You will be able to earn <b>${C.moneName}</b> in this world, instead of heavenly chips.`,
			icon: [10, 21]
		}
	}
}


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

eval('Game.LoadSave = ' + Game.LoadSave.toString().replaceAll('Game.ascensionMode!=1', 'Game.ascensionMode != 1 && Game.ascensionMode != 1017'));
eval('Game.Reset = ' + Game.Reset.toString().replaceAll('Game.ascensionMode!=1', 'Game.ascensionMode != 1 && Game.ascensionMode != 1017'));
eval('Game.loadLumps = ' + Game.loadLumps.toString().replaceAll('Game.ascensionMode!=1', 'Game.ascensionMode != 1 && Game.ascensionMode != 1017'));
eval('Game.canLumps = ' + Game.canLumps.toString().replaceAll('Game.ascensionMode!=1', 'Game.ascensionMode != 1 && Game.ascensionMode != 1017'));
eval('Game.doLumps = ' + Game.doLumps.toString().replaceAll('Game.ascensionMode!=1', 'Game.ascensionMode != 1 && Game.ascensionMode != 1017'));
eval('Game.CalculateGains = ' + Game.CalculateGains.toString().replaceAll('Game.ascensionMode!=1', 'Game.ascensionMode != 1 && Game.ascensionMode != 1017'))
eval('Game.Has = ' + Game.Has.toString().replace('Game.ascensionMode==1', 'Game.ascensionMode>=1'));
eval('Game.Logic = ' + Game.Logic.toString().replace(`(Game.Has('Legacy') && Game.ascensionMode!=1)`, `(Game.Has('Legacy') && Game.ascensionMode != 1 && Game.ascensionMode != 1017)`)
    //legacy tooltip
    .replace(`loc("Your prestige level is currently <b>%1</b>.<br>(CpS +%2%)",[Beautify(Game.prestige),Beautify(Game.prestige)]);`, `(Game.ascensionMode != 1017?'Your prestige level is currently <b>'+Beautify(Game.prestige)+'</b>.<br>(CpS +'+Beautify(Game.prestige)+'%)':'You currently have <b>'+Beautify(C.mone)+' '+C.moneName+'</b>.');`)
    .replace(`"Ascending now would grant you no prestige."`, `"Ascending now would grant you no "+(Game.ascensionMode != 1017?'prestige':C.moneName)+"."`)
    .replace(`"Ascending now would grant you<br><b>1 prestige level</b> (+1% CpS)<br>and <b>1 heavenly chip</b> to spend."`, `"Ascending now would grant you<br><b>1 "+(Game.ascensionMode != 1017 ? 'prestige levels' : C.moneName)+"</b>"+(Game.ascensionMode != 1017 ? ' (+1% CpS)<br>and <b>1 heavenly chip</b> to spend':'.')`)
    .replace(`chipsOwned=Game.HowMuchPrestige(Game.cookiesReset);`, `maxAmount = (10 ** (Math.floor(Game.Upgrades['Mone buff'].tier/3) + 2)) - 1; var chipsOwned=Game.ascensionMode != 1017 ? Game.HowMuchPrestige(Game.cookiesReset) : 0;`)
    //split this into multiple replaces later
    .replace(`loc("Ascending now would grant you<br><b>%1 prestige levels</b> (+%2% CpS)<br>and <b>%3 heavenly chips</b> to spend.",[Beautify(ascendNowToGet),Beautify(ascendNowToGet),Beautify(ascendNowToGet)]);`, `"Ascending now would grant you<br><b>"+Beautify(ascendNowToGet)+" "+(Game.ascensionMode != 1017 ? 'prestige levels' : C.moneName)+"</b> "+(Game.ascensionMode != 1017 ? '(+'+Beautify(ascendNowToGet)+'% CpS)<br>and <b>'+Beautify(ascendNowToGet)+' heavenly chips</b> to spend.' : '');`)
    .replace('ascendNowToOwn=Math.floor(Game.HowMuchPrestige(Game.cookiesReset+Game.cookiesEarned));', 'ascendNowToOwn=Math.min(Game.ascensionMode < 2 ? Infinity : maxAmount, Math.floor(Game.HowMuchPrestige((Game.ascensionMode != 1017?Game.cookiesReset:0)+Game.cookiesEarned)));')
    .replace('ToNext=Game.HowManyCookiesReset(ascendNowToOwn+1)-(Game.cookiesEarned+Game.cookiesReset);', 'ToNext=Game.HowManyCookiesReset(ascendNowToOwn+1)-(Game.cookiesEarned+(Game.ascensionMode != 1017?Game.cookiesReset:0));')
    .replace(`(EN?'Ascending! ':(loc("Ascending")+' | '))`,`(Game.OnAscend == 1?(EN?'Ascending! ':(loc("Ascending")+' | ')):'Transcending | ')`)
);
eval('Game.UpdateAscendIntro = ' + Game.UpdateAscendIntro.toString()
    .replace(`Game.EarnHeavenlyChips(Game.cookiesEarned);`, `if (Game.ascensionMode != 1017)Game.EarnHeavenlyChips(Game.cookiesEarned);else C.mone+=Math.min((10 ** (Math.floor(Game.Upgrades['Mone buff'].tier/3) + 2)) - 1, Math.floor(Game.HowMuchPrestige(Game.cookiesEarned))*C.moneMult)`)
);
//now that i think about it, all of this code couldve been made in a better well but its too late now i guess
//it's never too late for anything


C.reset = function(hard) {
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

        C.toggleBigCookie(1);
	}

	C.calcTUEffs();
	C.unlockSpaceUpgrades();
};


/*
youpocalypse
*/
C.youWrath = 0; //i honestly have no idea why i am using youWrath beyond 2



/*
cookieclysm
*/

C.cookieclysm = false;

C.cookieFallingTimer = 0;
C.doCookieFalling = false;
C.bigCookieGone = false;

C.cookieFallingAnimation = function() {
    C.cookieFallingTimer++;
    if (C.cookieFallingTimer >= 150) {
        Game.removeHook('logic', C.cookieFallingAnimation);
        C.brokenCookieReset();
        C.toggleBigCookie(0);
        C.doCookieFalling = false;
        C.afterCookieExplode();
    }
}

//makes the big cookie a broken big cookie
C.toggleBrokenCookie = function(on) {
    if (on) {
        // Game.CollectWrinklers();
        Crumbs.findObject('bigCookie').children.slice(2).forEach(function(o) { if (o) { o.enabled = false; } });
        Crumbs.findObject('brokenCookie').enabled = true;
    }
    else {
        Crumbs.findObject('bigCookie').children.slice(2).forEach(function(o) { if (o) { o.enabled = true; } });
        Crumbs.findObject('brokenCookie').enabled = false;
    }
}

//makes the big cookie disappear entirely
C.toggleBigCookie = function(on) {
	if (on) {
		l('bigCookie').style.removeProperty('display');
		C.bigCookieGone = false;
        Game.Loader.Replace('shineSpoke.png', 'shineSpoke.png');
		Crumbs.findObject('bigCookie', 'left').enabled = true;
	} else {
		l('bigCookie').style.display = 'none';
		C.bigCookieGone = true;
        Crumbs.findObject('bigCookie', 'left').enabled = false;
		Game.Loader.Replace('shineSpoke.png', Game.Loader.blank);
	}
}

C.afterCookieExplode = function() {
    C.transcend(1);
    setTimeout(function() {
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
                setTimeout(function() {
                    Game.OnAscend = 0;
                    l('ascendInfoCopy').style.removeProperty('display');
                }, 3700);
            }
        });
        Game.attachTooltip(puck, function() { return Game.crateTooltip(upgrade, 'transcend') }, 'this');
        
        C.transcendOffX = C.transcendOffXT = 0;
        C.transcendOffY = C.transcendOffYT = 0;



        l('ascendInfoCopy').style.display = 'none';
    }, 3700);
}

//change ascend tree behavior for the clysm upgrades
eval('Game.BuildAscendTree = ' + Game.BuildAscendTree.toString()
    .replace(`str+='<div class="crate upgrade heavenly ghosted" id="heavenlyUpgrade'+me.id+'" style="position:absolute;left:'+me.posX+'px;top:'+me.posY+'px;'+writeIcon(me.icon)+'"></div>';`, `str += Game.crate(me, 'ascend','','heavenlyUpgrade' + me.id, 'opacity:0.2;');`)
    .replace(`|| Game.Has('Neuromancy')`, `|| Game.Has('Neuromancy') || me.parents.some(x => x.parents.canBePurchased)`)
    .replace(`if (me.showIf`, `if (me.junction && me.parents.some(x => x.bought)) me.canBePurchased = true; else if (me.showIf`)
    .replace(`me.showIf && !me.showIf()`, `(me.showIf && !me.showIf()) || (me.mutuallyExclusive && Game.Has(me.mutuallyExclusive))`)
    //disable this next one if using ascendCalibrator
    // .replace(`me.parents[ii]!=-1 && (me.canBePurchased || ghosted)`, `me.parents[ii]!=-1 && (me.canBePurchased || ghosted) && (me.parents[ii].bought || me.parents[ii].parents.some(x => x.bought)) && (!Game.Has(me.parents[ii].mutuallyExclusive))`)

    //rift
    .replace(`var str='';`, `var str=''; let upgrades = C.transcendModifierTypes[C.transcendModifier].ascendUpgrades;`)
    .replace(`str+='<div class="crate`, `if (C.transcendModifier == 0) str+='<div class="crate`)
    .replaceAll('Game.PrestigeUpgrades', 'upgrades')
);

C.initClysmHUs = function() {
    Game.Upgrades['Strawberry-flavored worm bait'].parents = [Game.Upgrades['Rift']];

    Game.Upgrades['Ants'].parents = [Game.Upgrades['Strawberry-flavored worm bait']];
    Game.Upgrades['Cataclysm'].parents = [Game.Upgrades['Ants']];
    Game.Upgrades['Red ants'].parents = [Game.Upgrades['Cataclysm']];
        C.mutuallyExclusive('Antfestation', 'Aphids')

        //jump path
        Game.Upgrades['Antfestation'].parents = [Game.Upgrades['Red ants']];

        //"something bad" path
        Game.Upgrades['Aphids'].parents = [Game.Upgrades['Red ants']]; Game.Upgrades['Aphids'].showIf = function() { };
        Game.Upgrades['Bug bites'].parents = [Game.Upgrades['Aphids']];
        Game.Upgrades['Features'].parents = [Game.Upgrades['Bug bites']];
        Game.Upgrades['Some bees'].parents = [Game.Upgrades['Features']];
    //final upgrades of both paths (they converge)
    Game.Upgrades['Red ants #2'].parents = [Game.Upgrades['Antfestation'], Game.Upgrades['Some bees']];
    Game.Upgrades['Red ants #2'].junction = true;
    
    C.mutuallyExclusive('Barons', 'Captains');
    Game.Upgrades['Barons'].parents = [Game.Upgrades['Red ants #2']];
        Game.Upgrades['G. C. Organ'].parents = [Game.Upgrades['Barons']]; Game.Upgrades['G. C. Organ'].showIf = function() { };
            Game.Upgrades['Oil'].parents = [Game.Upgrades['G. C. Organ']];
            Game.Upgrades['Rail'].parents = [Game.Upgrades['G. C. Organ']];
            Game.Upgrades['Steel'].parents = [Game.Upgrades['G. C. Organ']];
        Game.Upgrades['Banking'].parents = [Game.Upgrades['Oil'], Game.Upgrades['Rail'], Game.Upgrades['Steel']];
    Game.Upgrades['Captains'].parents = [Game.Upgrades['Red ants #2']];
        Game.Upgrades['Industrialization'].parents = [Game.Upgrades['Captains']]; Game.Upgrades['Industrialization'].showIf = function() { };
        Game.Upgrades['Market expansion'].parents = [Game.Upgrades['Industrialization']];
        Game.Upgrades['Job availability'].parents = [Game.Upgrades['Market expansion']];
        Game.Upgrades['Dogma of Dough'].parents = [Game.Upgrades['Job availability']];

    //conveniencemaxxing: `{${C.clysmUpgrades.reduce((a, b) => a + (`${b.id}:[${b.posX},${b.posY}],`), '')}}`
    Object.entries(
        {877:[0,0],960:[-6,-376],961:[-7,-614],962:[-14,-1133],963:[273,-1211],964:[-265,-1479],965:[-179,-1859],966:[204,-1826],967:[-8,-852],968:[-31,-2381],969:[-477,-2085],970:[-31,-2581],971:[-219,-2729],972:[-31,-2799],973:[177,-2729],974:[-31,-3061],975:[-809,-2205],976:[-1025,-2447],977:[-1117,-2735],978:[-1117,-3071],979:[441,-1402],980:[413,-1681],}
    ).forEach(x => { Game.UpgradesById[x[0]].posX = x[1][0]; Game.UpgradesById[x[0]].posY = x[1][1]; }); 
}
C.initClysmHUs();

//clysm upgrade effects

//G. C. Organ
eval(`Game.Objects['Bank'].cps = ` + Game.Objects['Bank'].cps.toString().replace(`var mult=1;`, `var mult=1; mult *= 1 + (0.5 * Object.values(Game.Objects['Bank'].minigame?.goods || {}).filter(good => good.stock > 0).length);`))
//Oil, rail, and steel clone debuffs
eval(`Game.Objects['You'].cps = ` + Game.Objects['You'].cps.toString().replace(`var mult=1;`, `var mult=1; if (Game.Has('Oil')) mult *= 0.95; if (Game.Has('Rail')) mult *= 0.95; if (Game.Has('Steel')) mult *= 0.95; `));

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
		C.clysmClicks++;

        let list = [];
		let choice = choose(list);
		this.last = choice;
		console.log(choice);

		let popup = '', buff;

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
	spawnConditions: function() { return false; },
	spawned: 0, time: 0, minTime: 0, maxTime: 0,
	getTimeMod: function(me, m) { return Math.ceil(Game.fps * 60 * m); },
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



/*
ants
*/

C.antCookies = 0;


C.getAdjacentWrinklers = function(id) {
	let max = Game.getWrinklersMax();
	return [Game.wrinklers[(id - 1 + max) % max], Game.wrinklers[(id + 1 + max) % max]]; //formula by limes and helloperson
}

Game.ResetWrinklers = function() {
    for (let i = 0; i < Game.wrinklers.length; i++) {
        let me = Game.wrinklers[i];
        Game.wrinklers[i] = {
            id: i, close: 0, sucked: me.super ? me.sucked : 0,
            phase: me.super ? 1 : 0, x: 0, y: 0, r: 0,
            hurt: 0, hp: Game.wrinklerHP, selected: 0,
            type: 0, clicks: me.super ? me.clicks : 0,
			crumbsObj: me.crumbsObj, super: me.super
        };
    }
}

C.antCPSCalculation = function(cps) {
    let sucking = Game.wrinklers.filter(x => x.phase == 2).length;
    sucking += Game.wrinklers.flatMap(wrinkler => wrinkler.crumbsObj?.getChildren('ant') || [])
                             .filter(child => child.enabled)
                             .reduce((a, b) => a + 0.05 * (b.type + 1), 0);
    let suckRate=1/20;//each wrinkler eats a twentieth of your CpS
    suckRate*=Game.eff('wrinklerEat');
    suckRate*=1+Game.auraMult('Dragon Guts')*0.2;

    Game.cpsSucked=Math.min(1,sucking*suckRate);

    return cps;
};

C.spawnAnt = function(wrinkler) {
    let ant = C.findFreeAntSlot(wrinkler);
    if (!ant) return;
    ant.life = 1;
    ant.positions = choose(C.antPositions.filter(pos => ant.parent.getChildren('ant').every(a => a.positions != pos)));
    ant.cookies = 0;
    ant.enabled = true;
    ant.type = 0;
    if (Game.Has('Red ants') && Math.random() < 0.1) ant.type = 1;
    else if (Game.Has('Some bees') && Math.random() < 0.1) ant.type = 2;
}
C.loseAnt = function(wrinkler, id, real) {
    let ant = C.getAnt(wrinkler, id);
    if (real) {
        ant.enabled = false; //real
        return;
    }
    ant.life = -1;
    let message = `An ant just took <b>${Beautify(ant.cookies)}cookies</b> from a wrinkler.`;
    if (ant.type = 1) {
		let money = ant.cookies / 2;
        message = `A red ant just gave you <b>${Beautify(money)}<b> cookies from a wrinkler.`;
        Game.Earn(money);
    }
    Game.Notify('Ant', message, [8, 1, C.images.icons], 6);
}
C.getAnt = function(wrinkler, id) {
	return Game.wrinklers[wrinkler].crumbsObj.getChildren('ant')[id];
}
C.findFreeAntSlot = function(wrinkler) {
    return Game.wrinklers[wrinkler].crumbsObj.getChildren('ant')[Game.wrinklers[wrinkler].crumbsObj.getChildren('ant').findIndex(ant => !ant.enabled)];
}
C.killAnt = function(ant) { 
    if (ant.type == 2) return;
    if (ant.life != -1) return;
    let money = ant.cookies * 0.5;
    Game.Notify('Ant', `Recovered ${Beautify(money)} cookies from the ant.`);
    Game.Earn(money);
    C.loseAnt(ant.parent.wId, ant.aId, true);
}

C.wrinklerAntDeath = function(w) {
    if (w.getChildren('ant').some(ant => ant.enabled)) {
        Game.Notify('Ants', 'Killing the wrinkler killed all ants on it.', [8, 1, C.images.icons]);
        w.getChildren('ant').forEach(ant => C.loseAnt(w.wId, ant.aId, true));
    }
}

C.getAntChance = function() {
    let chance = 0.0004;
    if (Game.Has('Antfestation')) {
        chance *= Game.wrinklers.flatMap(wrinkler => wrinkler.crumbsObj?.getChildren('ant') || []).filter(child => child.enabled).length;
    }
    return chance;
}

eval(`Game.SpawnWrinkler = ` + Game.SpawnWrinkler.toString()
    /* puck */.replace(`if (Math.random()<0.0001) me.type=1;//shiny wrinkler`, `if (Math.random()<0.0001*C.puckMult()) me.type=1;//shiny wrinkler`)
    /* super wrinkler */.replace(`\n\t\t\tif (Game.Has('Strawberry-flavored worm bait') && Math.random() < 0.02) { me.super = true; C.getAdjacentWrinklers(me.id).forEach(x => x.running = true); }`)
    /* super wrinkler */.replace(`me.type=0;`, `me.type=0;\n\t\t\tme.super = 0;`));


eval(`Game.UpdateWrinklers = ` + Game.UpdateWrinklers.toString()
    //puck
    .replace(`if (Game.season=='halloween')`, `if (Game.Has('Puck') && Game.hasGod && Game.hasGod('scorn')) Game.gainBuff('cookie rain', 6, C.puckMult(2));\n\t\t\t\t\t\tif (Game.season=='halloween')`)
    .replace(`(((Game.cookiesPs/Game.fps)*Game.cpsSucked))`, `(Game.Has('Puck') && Game.hasGod && Game.hasGod('scorn')) ? (((Game.cookiesPs/Game.fps)*Game.cpsSucked)) : (Game.cookiesPs/Game.fps)*0.05*C.puckMult()`)
    .replace(`if (Game.Has('Wrinkler doormat')) chance=0.1;`, `if (Game.Has('Wrinkler doormat')) chance=0.1;\n\t\t\t\t\tif (Game.Has('Puck') && Game.hasGod && Game.hasGod('scorn')) chance = Math.pow(Math.max(0,(C.wrinklerT-(Game.fps*60))/((Game.fps*300)-(Game.fps*60))),5)`)
    .replace(`var xBase=0;`, `C.wrinklerT++;\n\t\t\tvar xBase=0;`)
    .replace(`Game.SpawnWrinkler(me);`, `Game.SpawnWrinkler(me);\n\t\t\t\t\t\tC.wrinklerT = 0;`)

    //super wrinkler
    .replace(`if (me.type==0)`, `if (me.super) {\n\t\t\t\t\t\tif (me.hp == Game.wrinklerHP) me.hp = 10 * Math.max(C.transcendPower, 1) + 0.5;\n\t\t\t\t\t}\n\t\t\t\t\telse if (me.type==0)`)
    .replace(`if (me.type==1) toSuck*=3;`, `if (me.type==1) toSuck*=3;\n\t\t\t\t\tif (me.super) toSuck *= 1.5;\n\t\t\t\t\tif (Game.Has('Puck') && Game.hasGod && Game.hasGod('scorn')) toSuck *= 20;`)
    .replace(`if (Game.prefs.particles)`, `if (Game.prefs.particles && !me.super)`)
    // .replace(`Game.Win('Last Chance to See');`, `Game.Win('Last Chance to See')\n\t\t\t\t\tif (me.super) { Game.Win('Magenta worm'); }`)
    .replace(`!(me.hp<=0.5 && me.phase>0)`, `!(me.hp<=0.5 && me.phase>0) && !me.super`)
    .replace(`me.hp-=0.75;`, `if (me.super) { if (Math.random() < 0.2) Game.Popup('<span style="font-size:80%">Blocked!</span>', Game.mouseX, Game.mouseY); } else { me.hp -= 0.75 }`)
    .replace(`me.r=(me.id/max)*360;`, `me.r=(me.id/max)*360;\n\t\t\t\t\tif (me.running) { me.close -= 1 / Game.fps; me.phase = 1; if (me.close < 0) { me.phase = 0; me.running = false; } }`)

    //cookieclysm
    .replace(`Math.random()<chance`, `Math.random()<chance && !C.bigCookieGone && C.cookieFallingTimer == 0 && !C.getAdjacentWrinklers(me.id).find(x => x.super)`)
    .replace(`Game.wrinklersPopped++;`, `Game.wrinklersPopped++; C.wrinklerAntDeath(me.crumbsObj);`)
    .replace(`var d=128*(2-me.close);`, `if(!me.super && Math.random() < C.getAntChance()) C.spawnAnt(me.id); var d=128*(2-me.close);`)
);

eval(`Crumbs.drawEyeOfTheWrinkler = ` + Crumbs.drawEyeOfTheWrinkler.toString()
        .replace(`ctx.fillRect(x-width/2-8-10,y-23,width+16+20,38);`, `ctx.fillRect(x-width/2-8-10,y-23,width+16+20,selected.super ? 38 * 2 : 38);`)
        .replace(`ctx.strokeRect(x-width/2-8-10+1.5,y-23+1.5,width+16+20-3,38-3);`, `ctx.strokeRect(x-width/2-8-10+1.5,y-23+1.5,width+16+20-3,(selected.super ? 38 * 2 : 38)-3);`)
        .replace(`selected.sucked),x+10,y+8);`, `selected.sucked),x+10,y+8);\n\t\t\t\tif (selected.super) {\n\t\t\t\t\tctx.fillText('Health:', x+14, y+24);\n\t\t\t\t\tctx.fillText(Beautify(selected.hp - 0.5, 1), x+10, y+40);\n\t\t\t\t}`)
);



/*
chocolate
*/
C.chocolate = 0;
C.gainChocolate = function(amount) {
    C.chocolate += amount;
}

/*
misc
*/

eval('Game.UpdateMenu = ' + Game.UpdateMenu.toString()
	//building space
    .replace(`+Game.version+'</div>'+`,`+Game.version+'</div><br>' + C.getSpaceHTML() + `)

	//transcend
    .replace(`var prestigeUpgradesOwned=0;`, `var prestigeUpgradesOwned=0;\n\t\tlet transcendentUpgrades = '';`)
    .replace(`cookieUpgrades+=str2;`, `cookieUpgrades+=str2;\n\t\t\telse if (me.pool == 'transcendent') { transcendentUpgrades += str2; }`)
    .replace(`prestigeUpgrades+'</div>'):'')+\n\t\t\t\t'</div>'\n\t\t\t\t):'')+`,
			`prestigeUpgrades+'</div>'):'')+\n\t\t\t\t'</div>'\n\t\t\t\t):'')+\t\t\t\t'</div><div class="subsection">'+\n\t\t\t\t(C.mone > 0 || Game.Has('Neuromancy') ? '<div class="title">Transcendence</div>'+\n\t\t\t\t'<div id="statsTranscend">'+\n\t\t\t\t\t'<div class="listing"><div class="icon" style="float:left;background-image:url(\\'https://yeetdragon24.github.io/cookieclysm/img/iconsheet-c0.6.png\\');background-position:-144px 0px;"></div>'+
						'<div style="margin-top:8px;"><span class="title" style="font-size:22px;">Transcend power: <span style="color: ${C.transcendentPink}">'+Beautify(C.transcendPower)+'</span></span> (Giving <b>+' + C.transcendPower * 100 + '% CpS</b> and <b>+' + C.transcendPower + '% prestige multiplier</b>)<br>' + C.moneName + ' owned: <b>'+Beautify(C.mone)+'</b></div>'+
					'</div><div class="listing" style="clear:left;"><b>Transcendent upgrades tiers purchased: </b>' + C.transcendentTiers + '</div>'+\n\t\t\t\t\t(transcendentUpgrades != '' ? (\n\t\t\t\t\t'<div class="listing crateBox">'+transcendentUpgrades+'</div>') : '')+'</div>' : '')+`)
    
	//clysm
	.replaceAll(`me.pool=='prestige'`, `me.pool=='prestige' && !me.clysm`)
    .replace(`me.pool!='unused'`, `me.pool!='unused' && !me.clysm`)
);





//minigame checks
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
C.updateTemple = function() {
    if (!Game.Objects['Temple'].minigameLoaded) return false;
    let M = Game.Objects['Temple'].minigame;

    let skruuia = M.gods['scorn'];
    skruuia.activeDescFunc = function() {
        if (!Game.Has('Puck')) return ''; //`You don't own <span style="color: ${C.transcendentPink};">Puck</span>`;
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
        if (!Game.Has('Mutation')) return '';
        let boost = Math.round((C.getEffects('Mutation') / 100) * (4 - Game.hasGod('mother')) * 1000) / 1000;
        return `<b>Mutation bonus:>/b><br>
            <div style="text-shadow: none;">
            <span class="green">Garden mutations are ${boost}% more common</span></div>`;
    }
    mokalsium.descAfter = `Gain <b>extra bonuses</b> while slotted from <span style="color:${C.transcendentPink};">Mutation</span>.`

    let muridal = M.gods['labor'];
    muridal.activeDescFunc = function() {
        if (!Game.Has('Cheese')) return '';
        let boost = Math.round(C.getEffects('Cheese') * (4 - Game.hasGod('Labor')) * 1000) / 1000;
        return `<b>Cheese bonus:</b><br>
            <div style="text-shadow: none;">
            <span class="green">Portal CpS +${boost * 5}%</span><br>
            <span class="red">Clicks have a chance to get rid of portals</span></div>`;
    }
    muridal.descAfter = `Gain <b>extra bonuses</b> while slotted from <span style="color:${C.transcendentPink};">Cheese</span>.`

    let selebrak = M.gods['seasons'];
    selebrak.activeDescFunc = function() {
        if (!Game.Has('Finally, some rest')) return '';
        return `<b>Finally, some rest bonus:</b><br>
        <div style="text-shadow: none;">
        <span class="green">+25% CpS during a season</span><br>
        <span class="green">+25% CpS during an actual season</span><br>
        <span class="red">???</span><br>
        <span class="red">???</span><br>
        ???<br>`;
    }
    selebrak.descAfter = `Gain <b>extra bonuses</b> while slotted from <span style="color:${C.transcendentPink};">Finally, some rest</span>.`;

    hasGodL = Game.hasGod;

    Game.removeHook('check', C.updateTemple);
};
C.updateGarden = function() {
    if (!Game.Objects['Farm'].minigame) return false;
    let M = Game.Objects['Farm'].minigame;

	AddEvent(l('rowSpecial2'), 'click', function() { if (Game.hasDev('capn')) Game.gainBuff('famine', 1000) });

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


//mod hooks
Game.registerHook('check', [
	C.updateGrimoire,
	C.updateTemple,
	C.updateGarden,

	C.updateTUTiers,
]);

Game.registerHook('cps', [
	C.calcDynamicTUEffs,
	
	C.antCPSCalculation,
])

Game.registerHook('reset', C.reset);

//stolen from cursedsliver (with permission)
Game.updateLog = //declaring a new log text
'<div class="section">Cookieclysm</div>'+

'<div class="selectable">'+
    '<div class="listing">Cookieclysm is a Cookie Clicker content mod by YeetDragon24. It attempts to expand the game by adding content with gameplay value that increases playtime. The mod is currently not complete and many planned parts of the mod are incomplete.</div>'+
    //'<div class="listing">'+loc('You can find a non-comprehensive changelog of the mod <a href="%1" target="_blank" class="highlightHover">here</a>, but we recommend against spoiling yourself with that information.', 'https://docs.google.com/document/d/1uicVSbhYwOjKJSPHEt7dpqKpriPGsWJeyZl1BVeltXA/edit?usp=sharing')+'</div>'+
    '<div class="listing block" style="margin:8px 32px;font-size:11px;line-height:110%;color:rgb(255, 200, 200);background-color:#da70d6">'+
        'Developing this mod took a lot of time, and it would be nice to have your support! Here\'s how:'+
        '<br><br>&bull; join our <a href="https://discord.gg/bR4qKSJuCS" target="_blank" class="highlightHover smallWhiteButton">Discord server</a>! Feedback is welcome and encouraged!'+
        '<br><br>&bull; like, favorite, and (if you want) give an award to our steam workshop entry (mod for steam currently not released)'+ //insert link to entry here
        '<br><br>&bull; share our mod with anyone who you think will like it!'+ //other monetization methods here; replace this bullet point
    '</div>'+
'</div>'+

'<div class="subsection clysmCreditsBox">'+
    '<div class="kaizoCreditsTitle">Programmers</div>'+
    '<div class="titleLine"></div>'+
    '<div class="ClysmPersonBox" style="font-size: 20px; padding-left: 24px;">'+tinyIcon([0,0,C.images.icons],"display: inline-block; transform: translateX(-12px) scale(0.6);")+'yeetdragon24</div>'+
    '<div class="ClysmPersonBox" style="font-size: 20px;">Artur</div>'+
    '<div class="titleLine"></div>'+
    '<div class="ClysmPersonBox" style="padding-left: 24px;">'+'<div style="display:inline-block;width:48px;height:48px;background:url(\'https://cursedsliver.github.io/asdoindwalk/cursed.gif\');margin:-16px;transform:scale(0.6) translateX(-24px);"></div>'+'CursedSliver <span class="noteSpan">(Crumbs Engine dev)</span></div>'+'</div>'+

'<div class="subsection clysmCreditsBox">'+
    '<div class="kaizoCreditsTitle">Design</div>'+
    '<div class="titleLine"></div>'+
    '<div class="ClysmPersonBox" style="padding-left: 24px;">'+tinyIcon([0,0,C.images.icons],"display: inline-block; transform: translateX(-12px) scale(0.6);")+'yeetdragon24</div>'+
    '<div class="ClysmPersonBox" style="padding-left: 24px;">'+tinyIcon([1,0,C.images.icons],"display: inline-block; transform: translateX(-12px) scale(0.6);")+'Stream Sniper</div>'+
    '<div class="ClysmPersonBox" style="padding-left: 24px;">'+'<div style="display:inline-block;width:48px;height:48px;background:url(\'https://cursedsliver.github.io/asdoindwalk/cursed.gif\');margin:-16px;transform:scale(0.6) translateX(-24px);"></div>'+'CursedSliver</div>'+'</div>'+
'</div>'+

'<div class="subsection clysmCreditsBox">'+
    '<div class="kaizoCreditsTitle">Artists</div>'+
    '<div class="titleLine"></div>'+
    '<div class="ClysmPersonBox" style="padding-left: 32px;">'+'<div style="display:inline-block;width:48px;height:48px;background:url(\'https://yeetdragon24.github.io/cookieclysm/img/hooge.png\');background-size: contain; margin:-16px;transform:scale(0.6) translateX(-24px);"></div>'+'hoogebrain</div>'+
    '<div class="ClysmPersonBox" style="padding-left: 32px;">'+tinyIcon([2,0,C.images.icons],"display: inline-block; transform: translateX(-12px) scale(0.6);")+'CaptainCrozier</div>'+
    '<div class="titleLine"></div>'+
    '<div class="ClysmPersonBox">colinnnnnnnnnnnnnnnnnnnnnnnnnnnn</div>'+
    '<div class="ClysmPersonBox">'+tinyIcon([0,0,C.images.icons],"display: inline-block; transform: translateX(-12px) scale(0.6);")+'yeetdragon24</div>'+
'</div>'+

'<div class="subsection clysmCreditsBox">'+
    '<div class="kaizoCreditsTitle">Playtesters/QA</div>'+
    '<div class="titleLine"></div>'+
    '<div class="ClysmPersonBox">FantasTies</div>'+
    '<div class="ClysmPersonBox">Garchmop</div>'+
    '<div class="titleLine"></div>'+
    '<div class="ClysmPersonBox">Sourdough</div>'+
    '<div class="ClysmPersonBox" style="padding-left: 24px;">'+'<div style="display:inline-block;width:48px;height:48px;background:url(\'https://cursedsliver.github.io/asdoindwalk/cursed.gif\');margin:-16px;transform:scale(0.6) translateX(-24px);"></div>'+'CursedSliver</div>'+'</div>'+
'</div>'+
/* figure out who to put here
'<div class="subsection clysmCreditsBox">'+
    '<div class="kaizoCreditsTitle">Special Thanks</div>'+
    '<div class="titleLine"></div>'+
    '<div class="ClysmPersonBox">Fififoop</div>'+
    '<div class="ClysmPersonBox">hz</div>'+
    '<div class="ClysmPersonBox">Lookas</div>'+
    '<div class="ClysmPersonBox">Dragoon</div>'+
    '<div class="titleLine"></div>'+
    '<div style="margin: 2px auto; font-variant: small-caps; font-family: \'Merriweather\', Georgia,serif; font-size: 13px; text-shadow:0px -2px 6px rgba(255,255,200,0.6),0px 1px 0px rgba(100,100,100,1),0px 2px 4px rgba(0,0,0,1); ">And of course, to everyone who gave us valuable advice and improvements!</div>'+
'</div>'+

'<div style="width: 100%; text-align: center; color: rgba(255, 255, 255, 0.01)">        </div>'+
*/
Game.updateLog; 

//Kaizo Compatibility
C.onKaizo = function() { 
    Game.Upgrades['Glimmering hope'].desc = 'The shimmering veil gains an extra <b>%% ➡ %% chance</b> base health.';
    Game.Upgrades['Glimmering hope'].increment = 20;
    Game.Achievements['Armored'].desc = 'Have <b>1000 or more</b> base health on your Shimmering veil.';

    Game.Upgrades['A light in the dark'].descFunc = function() { return `Your Sparkling Wonder is <b>%%% ➡ %%%</b> more likely to save your Shimmering veil when it collapses. (Total: ${0.1 * (1 + C.getEffects(this.name)/100)})` };
    Game.Upgrades['A light in the dark'].increment = 5;
    
}

eval(`Game.shimmerTypes[\'golden\'].initFunc = ` + Game.shimmerTypes['golden'].initFunc.toString().replace(`//set image`, `if (Game.hasDev && Game.hasDev('sniper') && me.spawnLead) {\n\t\t\t\t\t\tme.life = 0; \n\t\t\t\t\t\treturn new Game.shimmer('sniperGold');\n\t\t\t\t\t}\n\t\t\t\t\t//set image`));

C.updateDrawBackground = function() {
	eval(`Game.DrawBackground = ` + Game.DrawBackground.toString().replace(`Crumbs.drawObjects();`,`if (Game.OnAscend == 2) C.drawTranscend(Crumbs.getCanvasByScope('transcend'));\n\tCrumbs.drawObjects();`));
}
// C.updateDrawBackground();
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

        var locked = me.mutuallyExclusive ? Game.Has(me.mutuallyExclusive) : false;

        if (locked) price = '<div style="float:right;text-align:right;"><span class="price heavenly disabled">Locked</span></div>';
		else if (me.priceLumps == 0 && cost == 0) price = '<div';
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

	var desc = '';
	if (me.bought && context == 'store' && me.displayFuncWhenOwned) desc += me.displayFuncWhenOwned() + '<div class="line"></div>';
	if (me.unlockAt) {
		if (me.unlockAt.require) {
			var it = Game.Upgrades[me.unlockAt.require];
			desc += '<div style="font-size:80%;text-align:center;">' + (EN ? 'From' : loc("Source:")) + ' ' + tinyIcon(it.icon) + ' ' + it.dname + '</div><div class="line"></div>';
		}
		else if (me.unlockAt.text) {
			//var it=Game.Upgrades[me.unlockAt.require];
			desc += '<div style="font-size:80%;text-align:center;">' + (EN ? 'From' : loc("Source:")) + ' <b>' + text + '</b></div><div class="line"></div>';
		}
	}
    if (me.mutuallyExclusive) desc += `<div style="font-size:80%;text-align:center;">Mutually exclusive with ${tinyIcon(Game.Upgrades[me.mutuallyExclusive].icon)} ${Game.Upgrades[me.mutuallyExclusive].dname}</div><div class="line"></div>`;
    desc += me.descFunc ? me.descFunc() : me.ddesc;

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