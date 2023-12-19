if(GameLoader === undefined) var GameLoader = {};
if(!GameLoader.postLoadHooks) GameLoader.postLoadHooks = [];
GameLoader.name = 'GameLoader';
GameLoader.version = '2.035';
GameLoader.Steam = (typeof Steam !== 'undefined');
GameLoader.GameVersion = GameLoader.Steam ? '2.052' : '2.052';

GameLoader.launch = function(){
	GameLoader.loading = 1;
	
	GameLoader.init = function(){
		GameLoader.init = 0;
		GameLoader.InitNote();
		GameLoader.InitializeConfig();
		GameLoader.AddGameLoaderStyles();
		
		// Define more parts of GameLoader
		GameLoader.Backup = {};
		GameLoader.collapseMenu = {};
		if(!Game.customMinigame) Game.customMinigame = {};
		for(var key in Game.Objects) if(!Game.customMinigame[key]) Game.customMinigame[key] = {};
		
		
		// Build a list of functions to feed to requestAnimationFrame
		GameLoader.playlist = [];
		GameLoader.track = 0;
		
		GameLoader.playlist.push(function(){
			GameLoader.ReplaceMainGame();
			requestAnimationFrame(GameLoader.playlist[GameLoader.track++]);
		});
		GameLoader.playlist.push(function(){
			GameLoader.MinigameReplacer(GameLoader.ReplaceGrimoire, 'Wizard tower');
			requestAnimationFrame(GameLoader.playlist[GameLoader.track++]);
		});
		GameLoader.playlist.push(function(){
			GameLoader.MinigameReplacer(GameLoader.ReplacePantheon, 'Temple');
			requestAnimationFrame(GameLoader.playlist[GameLoader.track++]);
		});
		GameLoader.playlist.push(function(){
			GameLoader.MinigameReplacer(GameLoader.ReplaceGarden, 'Farm');
			requestAnimationFrame(GameLoader.playlist[GameLoader.track++]);
		});
		GameLoader.playlist.push(function(){
			GameLoader.MinigameReplacer(GameLoader.ReplaceMarket, 'Bank');
			requestAnimationFrame(GameLoader.playlist[GameLoader.track++]);
		});
		
		
		GameLoader.playlist.push(function(){
			GameLoader.ReplaceBuildingsStart();
			requestAnimationFrame(GameLoader.playlist[GameLoader.track++]);
		});
		GameLoader.playlist.push(GameLoader.ReplaceBuildings); // We'll call the next one from here
		GameLoader.playlist.push(function(){
			GameLoader.ReplaceBuildingsFinish();
			requestAnimationFrame(GameLoader.playlist[GameLoader.track++]);
		});
		
		
		GameLoader.playlist.push(function(){
			GameLoader.ReplaceUpgradesStart();
			requestAnimationFrame(GameLoader.playlist[GameLoader.track++]);
		});
		GameLoader.playlist.push(GameLoader.ReplaceUpgrades); // We'll call the next one from here
		GameLoader.playlist.push(function(){
			GameLoader.ReplaceUpgradesFinish();
			requestAnimationFrame(GameLoader.playlist[GameLoader.track++]);
		});
		
		
		GameLoader.playlist.push(function(){
			GameLoader.ReplaceAchievementsStart();
			requestAnimationFrame(GameLoader.playlist[GameLoader.track++]);
		});
		GameLoader.playlist.push(GameLoader.ReplaceAchievements); // We'll call the next one from here
		
		
		GameLoader.playlist.push(GameLoader.finalize);
		
		requestAnimationFrame(GameLoader.playlist[GameLoader.track++]);
	}
	
	GameLoader.finalize = function(){
		// Load any custom save data and inject save functions
		if(!Game.modSaveData[GameLoader.name]) GameLoader.load();
		
		
		// Inject menu functions
		Game.customOptionsMenu.push(function(){
			GameLoader.AppendCollapsibleOptionsMenu(GameLoader.name, GameLoader.GetMenuString());
		});
		
		Game.customStatsMenu.push(function(){
			GameLoader.AppendStatsVersionNumber(GameLoader.name, GameLoader.version);
		});
		
		Game.customInfoMenu.push(function(){
			GameLoader.PrependCollapsibleInfoMenu(GameLoader.name, GameLoader.updateLog);
		});
		
		Game.registerHook('reset', GameLoader.reset);
		
		//l('versionNumber').innerHTML = 'Game ' + l('versionNumber').innerHTML + '<br>GameLoader v. ' + GameLoader.version;
		var versionNumber = l('versionNumber');
		var versionDiv = document.createElement('p');
		versionDiv.id = 'GameLoaderversionNumber';
		versionDiv.innerHTML = 'GameLoader v. ' + GameLoader.version;
		var textDiv = document.createElement('span');
		textDiv.id = 'GameLoaderversionGame';
		textDiv.innerHTML = 'Game ';
		versionNumber.appendChild(versionDiv);
		versionNumber.insertBefore(textDiv, versionNumber.firstChild);
		
		// Announce completion, set the isLoaded flag, and run any functions that were waiting for this to load
		GameLoader.Note.title = 'GameLoader loaded!';
		GameLoader.Note.life = Game.fps;
		GameLoader.isLoaded = 1;
		GameLoader.loading = 0;
		
		if(GameLoader.postLoadHooks) for(var i in GameLoader.postLoadHooks) GameLoader.postLoadHooks[i]();
		if(GameLoader.Steam){
			Game.loadModData = GameLoader.GameLoadModData;
			GameLoader.LaunchOtherMods();
			if(GameLoader.gameHasLoadedSave) Game.loadModData();
		}
		
		GameLoader.applyPref('showVersionNo');
	}
	
	
	/*=====================================================================================
	Update history
	=======================================================================================*/
	{	GameLoader.updateLog = '<div class="subsection"><div class="listing">Cookie Clicker Script Extender is a modding framework intended to make modding this game easier and more accessible.</div>' +
			'<div class="listing">GameLoader is written and maintained by Klattmose (<a href="https://github.com/klattmose" target="_blank">GitHub</a>, <a href="https://www.reddit.com/user/klattmose/" target="_blank">reddit</a>)</div>' +
			'<div class="listing">Further documentation can be found <a href="https://klattmose.github.io/CookieClicker/GameLoader-POCs/" target="_blank">here</a>.</div>' +
			'<div class="listing">If you have a bug report or a suggestion, create an issue <a href="https://github.com/klattmose/klattmose.github.io/issues" target="_blank">here</a>.</div></div>' +
			'<div class="subsection"><div class="title">GameLoader version history</div>' +
			
			'</div><div class="subsection update small"><div class="title">05/16/2023</div>' + 
			'<div class="listing">&bull; Can now give ids to Headers</div>' +
			
			'</div><div class="subsection update small"><div class="title">03/13/2023</div>' + 
			'<div class="listing">&bull; Added option to hide the GameLoader version in the lower left of the screen</div>' +
			'<div class="listing">&bull; Added some hooks for the YouCustomizer functions</div>' +
			'<div class="listing">&bull; Fixed compatibility with Frozen Cookies</div>' +
			
			'</div><div class="subsection update small"><div class="title">01/07/2022</div>' + 
			'<div class="listing">&bull; Added hook for Game.resize</div>' +
			'<div class="listing">&bull; Added hook for Garden.logic (for plant aging)</div>' +
			
			'</div><div class="subsection update small"><div class="title">10/04/2021</div>' +
			'<div class="listing">&bull; Fixed bug that was preventing custom buildings, upgrades, and achievements from being saved in some circumstances</div>' +
			
			'</div><div class="subsection update small"><div class="title">09/26/2021</div>' +
			'<div class="listing">&bull; Steam version: Will now initialize before other mods</div>' +
			'<div class="listing">&bull; Fixed getting permanent upgrades on a Born Again ascension</div>' +
			'<div class="listing">&bull; Fixed breaking Game.NewUpgradeCookie</div>' +
			'<div class="listing">&bull; Reset custom upgrades, achievements, etc. managed by GameLoader on game reset even if the mod generating them isn\'t loaded</div>' +
			
			'</div><div class="subsection update small"><div class="title">09/18/2021</div>' +
			'<div class="listing">&bull; Steam version: Custom links in the menu will now open in a browser rather than Steam</div>' +
			'<div class="listing">&bull; Fixed some upgrade descriptions breaking in localization</div>' +
			'<div class="listing">&bull; Added hooks for Game.crate and Game.crateTooltip</div>' +
			'<div class="listing">&bull; Changed Game.Loader.Load injection to detect \'/\' instead of \'http\'</div>' +
			
			'</div><div class="subsection update small"><div class="title">09/10/2021</div>' +
			'<div class="listing">&bull; Added PasswordBox and CheckBox to MenuHelper</div>' +
			'<div class="listing">&bull; Added function to append custom CSS styles</div>' +
			'<div class="listing">&bull; Fixed bug in custom Background selector</div>' +
			
			'</div><div class="subsection update small"><div class="title">09/09/2021</div>' +
			'<div class="listing">&bull; Steam version: Added hooks for Steam.modsPopup</div>' +
			'<div class="listing">&bull; Added support for custom images for the Pantheon and Grimoire</div>' +
			'<div class="listing">&bull; Added support for custom Golden cookie sound selector options</div>' +
			'<div class="listing">&bull; Added support for custom Milk selector options</div>' +
			'<div class="listing">&bull; Added support for custom Background selector options</div>' +
			
			'</div><div class="subsection update small"><div class="title">09/01/2021</div>' +
			'<div class="listing">&bull; Vaulting for custom upgrades no longer depends on mod load order</div>' +
			'<div class="listing">&bull; Setting custom upgrades as Permanent will no longer break the game if the Stats menu is opened without the mod loaded</div>' +
			'<div class="listing">&bull; Added some functions for commonly used menu items</div>' +
			
			'</div><div class="subsection update small"><div class="title">02/06/2021</div>' +
			'<div class="listing">&bull; Halved the loading time with this one weird trick!</div>' +
			'<div class="listing">&bull; The trick is called optimization</div>' +
			'<div class="listing">&bull; And learning about prototype functions</div>' +
			
			'</div><div class="subsection update small"><div class="title">10/31/2020</div>' +
			'<div class="listing">&bull; Updated to use the new modding API</div>' +
			'<div class="listing">&bull; The GameLoader.save object (where the mod save data is stored) is now named GameLoader.config. The new GameLoader.save is a function that will get called by Cookie Clicker when it decides it\'s time to save.</div>' +
			
			'</div><div class="subsection update small"><div class="title">06/20/2020</div>' +
			'<div class="listing">&bull; Added hooks for the new stock market minigame</div>' +
			'<div class="listing">&bull; Added hook for the new function Game.ClickSpecialPic</div>' +
			
			'</div><div class="subsection update small"><div class="title">10/22/2019</div>' +
			'<div class="listing">&bull; Added hook for the new function Game.auraMult</div>' +
			
			'</div><div class="subsection update small"><div class="title">05/14/2019 - parallel processing</div>' +
			'<div class="listing">&bull; Won\'t freeze the game while GameLoader is loading</div>' +
			'<div class="listing">&bull; Also has a progress meter for feedback</div>' +
			'<div class="listing">&bull; Bug fixes</div>' +
			
			'</div><div class="subsection update"><div class="title">05/11/2019 - take two</div>' +
			'<div class="listing">&bull; You know that moment where you do something and then immediately realize a better way to do it?</div>' +
			'<div class="listing">&bull; Changed the method for injecting code to standardized functions rather than calling "eval" willy-nilly</div>' +
			'<div class="listing">&bull; Added function for creating seasons</div>' +
			'<div class="listing">&bull; Created this update log, and put the version number in the lower left corner</div>' +
			'<div class="listing">&bull; With apologies for pretending to be a game update</div>' +
			
			'</div><div class="subsection update"><div class="title">05/05/2019 - initial release</div>' +
			'<div class="listing">&bull; Added a bunch of mod hooks to the game</div>' +
			'<div class="listing">&bull; Added functions to ease the creation of content like achievements and buildings</div>' +
			'<div class="listing">&bull; Added a save system to manage game objects created through GameLoader</div>' +
			'<div class="listing">&bull; Further documentation <a href="https://klattmose.github.io/CookieClicker/GameLoader-POCs/" target="_blank">here</a></div>' +
			'</div><div class="subsection"></div><div class="section">Cookie Clicker</div>';
	}
	
	
	/*=====================================================================================
	The heart of the mod. Functions to inject code into functions.
	=======================================================================================*/
	GameLoader.InjectCodeIntoFunction = function(functionName, alterFunctionCode, code, preEvalScript, hasPrototype){
		// preEvalScript is to set variables that are used in the function but aren't declared in the function
		if(preEvalScript) eval(preEvalScript);
		
		var originalFunction = eval(functionName);
		if (originalFunction === null) {
			console.warn(`GameLoader: ${ functionName } is not found. Could not inject ${ code }`);
			return;
		} else if (typeof originalFunction !== "function") {
			console.warn(`GameLoader: ${ functionName } is not a function. Could not inject ${ code }`);
			return;
		}
		
		//console.log(functionName);
		eval(functionName + " = " + alterFunctionCode(originalFunction.toString()));
		if(hasPrototype) {
			var alteredFunction = eval(functionName);
			alteredFunction.prototype = originalFunction.prototype;
		}
		
		GameLoader.functionsAltered++;
		if(!GameLoader.isLoaded) GameLoader.UpdateNote();
		//if(eval(functionName + ".toString()").indexOf(code) == -1) console.log("Error injecting code into function " + functionName + ". Could not inject " + code);
	}
	
	GameLoader.SliceCodeIntoFunction = function(functionName, pos, code, preEvalScript, hasPrototype){
		var alterFunctionCode = function(temp){
			return temp.slice(0, pos) + code + temp.slice(pos);
		}
		GameLoader.InjectCodeIntoFunction(functionName, alterFunctionCode, code, preEvalScript, hasPrototype);
	}
	
	GameLoader.SpliceCodeIntoFunction = function(functionName, row, code, preEvalScript, hasPrototype){
		var alterFunctionCode = function(temp){
			temp = temp.split("\n");
			i = row < 0 ? temp.length + row : row;
			temp.splice(i, 0, code);
			return temp.join("\n");
		}
		GameLoader.InjectCodeIntoFunction(functionName, alterFunctionCode, code, preEvalScript, hasPrototype);
	}
	
	GameLoader.ReplaceCodeIntoFunction = function(functionName, targetString, code, mode, preEvalScript, hasPrototype){
		var alterFunctionCode = function(temp){
			switch(mode){
				case -1: // Insert before targetString
					return temp.replace(targetString, code + "\n" + targetString);
				case 0: // Replace targetString. Regex will work
					return temp.replace(targetString, code);
				case 1: // Insert after targetString
					return temp.replace(targetString, targetString + "\n" + code);
				default:
					throw new Error("mode must be either, -1, 0, or 1");
			}
		}
		GameLoader.InjectCodeIntoFunction(functionName, alterFunctionCode, code, preEvalScript, hasPrototype);
	}
	
	GameLoader.GetProgressHTML = function(progress){
		return `<div style="text-align: center; font-weight: bold; color: white;">${ progress }%</div>`;
	}

	GameLoader.InitNote = function(){
		if(GameLoader.Steam) GameLoader.iconURL = GameLoader.GetModPath('GameLoader') + '/CCSEicon.png';
		else GameLoader.iconURL = 'https://klattmose.github.io/CookieClicker/img/CCSEicon.png';
		
		GameLoader.functionsTotal = (
			141
			+ (GameLoader.Steam ? 7 : 0)
			+ Game.ObjectsN      * 18 - 1 + 3
			+ Game.UpgradesN     * 1  + 25
			+ Game.AchievementsN * 1
		); // Needs to be manually updated
		GameLoader.functionsAltered = 0;
		GameLoader.progress = 0;
		
		Game.Notify('GameLoader is initializing', GameLoader.GetProgressHTML(0), [0, 0, GameLoader.iconURL], 6, 1);
		GameLoader.Note = Game.NotesById[Game.noteId - 1];
		GameLoader.Note.life = 600000; // 10 minutes, just to be sure
	}
	
	GameLoader.UpdateNote = function(){
		GameLoader.Note.life = 600000;
		var progress = Math.min(Math.floor(GameLoader.functionsAltered / GameLoader.functionsTotal * 100), 100);
		if(progress != GameLoader.progress){
			GameLoader.progress = progress;
			GameLoader.Note.desc = GameLoader.GetProgressHTML(GameLoader.progress);
			Game.UpdateNotes();
		}
	}
	
	
	/*=====================================================================================
	Do all replacing in one function
	Actually don't, it locks up the browser for as long as it's running
	Also declare hook arrays in the close vicinity of the functions they get used in
	=======================================================================================*/
	GameLoader.ReplaceMainGame = function(){
		// Temporary variable for storing function strings
		// Slightly more efficient than nesting functions
		// Doubt it really matters
		var temp = '';
		var pos = 0;
		var proto;
		var obj;
		
		
		// Game.UpdateMenu
		if(!Game.customMenu) Game.customMenu = [];
		if(!Game.customOptionsMenu) Game.customOptionsMenu = [];
		if(!Game.customStatsMenu) Game.customStatsMenu = [];
		if(!Game.customInfoMenu) Game.customInfoMenu = [];
		
		GameLoader.ReplaceCodeIntoFunction('Game.UpdateMenu', "l('menu').innerHTML=str;", `
			if(Game.onMenu == 'prefs'){
				// Game.UpdateMenu injection point 0
				for(var i in Game.customOptionsMenu) Game.customOptionsMenu[i]();
			}
			else if(Game.onMenu == 'stats'){
				// Game.UpdateMenu injection point 1
				for(var i in Game.customStatsMenu) Game.customStatsMenu[i]();
			}
			else if(Game.onMenu == 'log'){
				// Game.UpdateMenu injection point 2
				for(var i in Game.customInfoMenu) Game.customInfoMenu[i]();
			}
			
			// Any that don't want to fit into a label
			// Game.UpdateMenu injection point 3
			for(var i in Game.customMenu) Game.customMenu[i]();
		`, 1);
		
		
		// Code specific to the Steam version
		// Might move to their own function maybe
		if(GameLoader.Steam){
			// Steam.modsPopup
			// This function has several functions defined within it
			if(!Game.customModsPopup) Game.customModsPopup = [];
			if(!Game.customModsPopupCheckModDependencies) Game.customModsPopupCheckModDependencies = []; // Return okay to have no effect
			if(!Game.customModsPopupUpdateModList) Game.customModsPopupUpdateModList = [];
			if(!Game.customModsPopupUpdateModOptions) Game.customModsPopupUpdateModOptions = [];
			GameLoader.SliceCodeIntoFunction('Steam.modsPopup', -1, `
				// Steam.modsPopup injection point 0
				for(var i in Game.customModsPopup) Game.customModsPopup[i](selectedMod, mods);
			`);
			GameLoader.ReplaceCodeIntoFunction('Steam.modsPopup', "return okay;",
				`// Steam.modsPopup injection point 1
				for(var i in Game.customModsPopupCheckModDependencies) okay = Game.customModsPopupCheckModDependencies[i](okay, mod, loadedMods, selectedMod, mods);
				`, -1);
			GameLoader.ReplaceCodeIntoFunction('Steam.modsPopup', "updateModOptions();",
				`// Steam.modsPopup injection point 2
				for(var i in Game.customModsPopupUpdateModList) Game.customModsPopupUpdateModList[i](selectedMod, mods);
				`, -1);
			GameLoader.ReplaceCodeIntoFunction('Steam.modsPopup', 'else el.innerHTML=loc("Select a mod.");',
				`// Steam.modsPopup injection point 3
				for(var i in Game.customModsPopupUpdateModOptions) Game.customModsPopupUpdateModOptions[i](selectedMod, mods);
				`, 1);
			
			// Steam.workshopPopup
			if(!Game.customWorkshopPopup) Game.customWorkshopPopup = [];
			if(!Game.customWorkshopPopupUpdateModDisplay) Game.customWorkshopPopupUpdateModDisplay = [];
			if(!Game.customWorkshopPopupUpdatePublishedModsPopup) Game.customWorkshopPopupUpdatePublishedModsPopup = [];
			GameLoader.SliceCodeIntoFunction('Steam.workshopPopup', -1, `
				// Steam.customWorkshopPopup injection point 0
				for(var i in Game.customWorkshopPopup) Game.customWorkshopPopup[i](selectedMod, selectedModPath);
			`);
			GameLoader.ReplaceCodeIntoFunction('Steam.workshopPopup', "Game.UpdatePrompt();",
				`// Steam.customWorkshopPopup injection point 1
				for(var i in Game.customWorkshopPopupUpdateModDisplay) Game.customWorkshopPopupUpdateModDisplay[i](selectedMod, el);
				`, 1);
			GameLoader.ReplaceCodeIntoFunction('Steam.workshopPopup', "else l('modDisplay').innerHTML=`<div style=\"font-size:11px;margin:8px;\">(${loc(\"none\")})</div>`;",
				`// Steam.customWorkshopPopup injection point 2
				for(var i in Game.customWorkshopPopupUpdatePublishedModsPopup) Game.customWorkshopPopupUpdatePublishedModsPopup[i](response);
				`, 1);
		}
		
		
		/*
		New modding api works
		// Game.LoadSave
		if(!Game.customLoad) Game.customLoad = [];
		if(!(Game.LoadSave.toString().indexOf('Game.customLoad') > 0)){
			GameLoader.ReplaceCodeIntoFunction('Game.LoadSave', 'if (Game.prefs.showBackupWarning==1)',
					`// Game.LoadSave injection point 0
					for(var i in Game.customLoad) Game.customLoad[i](); `, -1);
		}*/
		
		
		// Game.WriteSave
		// This section only exists to support custom seasons
		GameLoader.ReplaceCodeIntoFunction('Game.WriteSave', '(Game.season?', '((Game.season)?', 0);
		GameLoader.ReplaceCodeIntoFunction('Game.WriteSave', '(Game.seasonT)', '((Game.season)?Game.seasonT:-1)', 0);
		
		
		// Game.Reset
		if(!Game.customReset) Game.customReset = [];
		GameLoader.SliceCodeIntoFunction('Game.Reset', -1, `
			// Game.Reset injection point 0
			for(var i in Game.customReset) Game.customReset[i](hard);
		`);
		
		
		// randomFloor
		// Gonna just replace it and try to keep up with any changes (however unlikely)
		// function randomFloor(x) {if ((x%1)<Math.random()) return Math.floor(x); else return Math.ceil(x);}
		// Return ret to have no effect
		if(!Game.customRandomFloor) Game.customRandomFloor = [];
		randomFloor = function(x){
			var ret;
			if ((x%1)<Math.random()) ret = Math.floor(x);
			else ret = Math.ceil(x);
			// randomFloor injection point 0
			for(var i in Game.customRandomFloor) ret = Game.customRandomFloor[i](x, ret);
			return ret;
		}
		
		
		// Beautify
		// Return ret to have no effect
		if(!Game.customBeautify) Game.customBeautify = [];
		GameLoader.ReplaceCodeIntoFunction('Beautify', "return negative?'-'+output:output+decimal;",
	`var ret = negative?'-'+output:output+decimal;
	// Beautify injection point 0
	for(var i in Game.customBeautify) ret = Game.customBeautify[i](value, floats, ret);
	return ret;`, 0);
		
		
		// Game.Loader.Load
		// To allow for images from outside the dashnet domain
		GameLoader.ReplaceCodeIntoFunction('Game.Loader.Load', 'img.src=this.domain', "img.src=(assets[i].indexOf('/')>=0?'':this.domain)", 0);
		
		
		// Game.resize
		if(!Game.customResize) Game.customResize = [];
		GameLoader.SliceCodeIntoFunction('Game.resize', -1, `
			// Game.resize injection point 0
			for(var i in Game.customResize) Game.customResize[i]();
		`);
		
		
		// -----     Tooltips block     ----- //
		
		// Game.tooltip.draw
		if(!Game.customTooltipDraw) Game.customTooltipDraw = [];
		GameLoader.SliceCodeIntoFunction('Game.tooltip.draw', -1, `
			// Game.tooltip.draw injection point 0
			for(var i in Game.customTooltipDraw) Game.customTooltipDraw[i](from, text, origin);
		`);
		
		
		// Game.tooltip.update
		if(!Game.customTooltipUpdate) Game.customTooltipUpdate = [];
		GameLoader.SliceCodeIntoFunction('Game.tooltip.update', -1, `
			// Game.tooltip.update injection point 0
			for(var i in Game.customTooltipUpdate) Game.customTooltipUpdate[i]();
		`);
		
		
		// Game.crate
		// Return ret to have no effect
		if(!Game.customCrate) Game.customCrate = [];
		GameLoader.ReplaceCodeIntoFunction('Game.crate', 'return (Game', "var ret = (Game", 0);
		GameLoader.SliceCodeIntoFunction('Game.crate', -1, `
			// Game.crate injection point 0
			for(var i in Game.customCrate) ret = Game.customCrate[i](me, context, forceClickStr, id, ret, style);
			return ret;
		`);
		
		
		// Game.crateTooltip
		// Return ret to have no effect
		if(!Game.customCrateTooltip) Game.customCrateTooltip = [];
		GameLoader.ReplaceCodeIntoFunction('Game.crateTooltip', 'return', "var ret = ", 0);
		GameLoader.SliceCodeIntoFunction('Game.crateTooltip', -1, `
			// Game.crateTooltip injection point 0
			for(var i in Game.customCrateTooltip) ret = Game.customCrateTooltip[i](me, context, ret);
			return ret;
		`);
		
		
		// -----     Ascension block     ----- //
		
		// Game.HowMuchPrestige
		// Return ret to have no effect
		if(!Game.customHowMuchPrestige) Game.customHowMuchPrestige = [];
		GameLoader.ReplaceCodeIntoFunction('Game.HowMuchPrestige', 'return', "var ret = ", 0);
		GameLoader.SliceCodeIntoFunction('Game.HowMuchPrestige', -1, `
			// Game.HowMuchPrestige injection point 0
			for(var i in Game.customHowMuchPrestige) ret = Game.customHowMuchPrestige[i](cookies, ret);
			return ret;
		`);
		
		
		// Game.HowManyCookiesReset
		// Return ret to have no effect
		if(!Game.customHowManyCookiesReset) Game.customHowManyCookiesReset = [];
		GameLoader.ReplaceCodeIntoFunction('Game.HowManyCookiesReset', 'return', "var ret = ", 0);
		GameLoader.SliceCodeIntoFunction('Game.HowManyCookiesReset', -1, `
			// Game.HowManyCookiesReset injection point 0
			for(var i in Game.customHowManyCookiesReset) ret = Game.customHowManyCookiesReset[i](chips, ret);
			return ret;
		`);
		
		
		// Game.GetHeavenlyMultiplier
		// Functions should return a value to multiply the heavenlyMult by
		if(!Game.customHeavenlyMultiplier) Game.customHeavenlyMultiplier = [];
		GameLoader.ReplaceCodeIntoFunction('Game.GetHeavenlyMultiplier', 'return heavenlyMult;', `
			// Game.GetHeavenlyMultiplier injection point 0
			for(var i in Game.customHeavenlyMultiplier) heavenlyMult *= Game.customHeavenlyMultiplier[i]();`, -1);
		
		
		// Game.UpdateAscensionModePrompt
		if(!Game.customUpdateAscensionModePrompt) Game.customUpdateAscensionModePrompt = [];
		GameLoader.SliceCodeIntoFunction('Game.UpdateAscensionModePrompt', -1, `
			// Game.UpdateAscensionModePrompt injection point 0
			for(var i in Game.customUpdateAscensionModePrompt) Game.customUpdateAscensionModePrompt[i]();
		`);
		
		
		// Game.Reincarnate
		// Only runs when bypass == 1 (i.e. passed the confirmation prompt)
		if(!Game.customReincarnate) Game.customReincarnate = [];
		GameLoader.SliceCodeIntoFunction('Game.Reincarnate', -2, `
				// Game.Reincarnate injection point 0
				if(bypass == 1) for(var i in Game.customReincarnate) Game.customReincarnate[i]();
			`);
		
		
		// Game.Ascend
		// Only runs when bypass == 1 (i.e. passed the confirmation prompt)
		if(!Game.customAscend) Game.customAscend = [];
		GameLoader.SliceCodeIntoFunction('Game.Ascend', -2, `
				// Game.Ascend injection point 0
				if(bypass == 1) for(var i in Game.customAscend) Game.customAscend[i]();
			`);
		
		
		// Game.UpdateAscend
		// Runs every frame while on the Ascension tree
		if(!Game.customUpdateAscend) Game.customUpdateAscend = [];
		GameLoader.SliceCodeIntoFunction('Game.UpdateAscend', -1, `
			// Game.UpdateAscend injection point 0
			for(var i in Game.customUpdateAscend) Game.customUpdateAscend[i]();
		`);
		
		
		// Game.BuildAscendTree
		if(!Game.customBuildAscendTree) Game.customBuildAscendTree = [];
		GameLoader.SliceCodeIntoFunction('Game.BuildAscendTree', -1, `
			// Game.BuildAscendTree injection point 0
			for(var i in Game.customBuildAscendTree) Game.customBuildAscendTree[i](justBought);
		`);
		
		
		// -----     Sugar Lumps block     ----- //
		
		// Game.lumpTooltip
		// Return str to have no effect
		if(!Game.customLumpTooltip) Game.customLumpTooltip = [];
		GameLoader.ReplaceCodeIntoFunction('Game.lumpTooltip', 'return',
			`// Game.lumpTooltip injection point 0
			for(var i in Game.customLumpTooltip) str = Game.customLumpTooltip[i](str, phase);`, -1);
		
		
		// Game.computeLumpTimes
		if(!Game.customComputeLumpTimes) Game.customComputeLumpTimes = [];
		GameLoader.SliceCodeIntoFunction('Game.computeLumpTimes', -1, `
			// Game.computeLumpTimes injection point 0
			for(var i in Game.customComputeLumpTimes) Game.customComputeLumpTimes[i]();
		`);
		
		
		// Game.gainLumps
		if(!Game.customGainLumps) Game.customGainLumps = [];
		GameLoader.SliceCodeIntoFunction('Game.gainLumps', -1, `
			// Game.gainLumps injection point 0
			for(var i in Game.customGainLumps) Game.customGainLumps[i](total);
		`);
		
		
		// Game.clickLump
		if(!Game.customClickLump) Game.customClickLump = [];
		GameLoader.SliceCodeIntoFunction('Game.clickLump', -1, `
			// Game.clickLump injection point 0
			for(var i in Game.customClickLump) Game.customClickLump[i]();
		`);
		
		
		// Game.harvestLumps
		if(!Game.customHarvestLumps) Game.customHarvestLumps = [];
		GameLoader.ReplaceCodeIntoFunction('Game.harvestLumps', 'total=Math.floor(total);',
			`// Game.harvestLumps injection point 0`, -1);
		GameLoader.ReplaceCodeIntoFunction('Game.harvestLumps', "Game.Win('Maillard reaction');",
			`// Game.harvestLumps injection point 1`, 1);
		GameLoader.SliceCodeIntoFunction('Game.harvestLumps', -1, `
			// Game.harvestLumps injection point 2
			for(var i in Game.customHarvestLumps) Game.customHarvestLumps[i](amount, silent);
		`);
		
		
		// Game.computeLumpType
		// Functions should push things to types
		if(!Game.customComputeLumpType) Game.customComputeLumpType = [];
		GameLoader.ReplaceCodeIntoFunction('Game.computeLumpType', '//caramelized',
				`// Game.computeLumpType injection point 0
				for(var i in Game.customComputeLumpType) Game.customComputeLumpType[i](types);`, 1);
		
		
		// Game.canLumps
		// Return ret to have no effect
		if(!Game.customCanLumps) Game.customCanLumps = [];
		GameLoader.SpliceCodeIntoFunction('Game.canLumps', 2, 'var ret;');
		GameLoader.ReplaceCodeIntoFunction('Game.canLumps', 'return true;', 'ret = true;', 0);
		GameLoader.ReplaceCodeIntoFunction('Game.canLumps', 'return false',
			`else ret = false;
			// Game.canLumps injection point 0
			for(var i in Game.customCanLumps) ret = Game.customCanLumps[i](ret);
			return ret;`, 0);
		
		
		// Game.getLumpRefillMax
		// Return ret to have no effect
		if(!Game.customLumpRefillMax) Game.customLumpRefillMax = [];
		GameLoader.ReplaceCodeIntoFunction('Game.getLumpRefillMax', 'return', 'var ret =', 0);
		GameLoader.SliceCodeIntoFunction('Game.getLumpRefillMax', -1,
			`// Game.getLumpRefillMax injection point 0
			for(var i in Game.customLumpRefillMax) ret = Game.customLumpRefillMax[i](ret);
			return ret;
		`);
		
		
		// Game.refillLump
		if(!Game.customRefillLump) Game.customRefillLump = [];
		GameLoader.SliceCodeIntoFunction('Game.refillLump', -1, `
			// Game.refillLump injection point 0
			for(var i in Game.customRefillLump) Game.customRefillLump[i]();
		`);
		
		
		// Game.doLumps
		// Runs every logic frame when lumps matter
		if(!Game.customDoLumps) Game.customDoLumps = [];
		GameLoader.ReplaceCodeIntoFunction('Game.doLumps', 'var icon=', '// Game.doLumps injection point 0', -1);
		GameLoader.SliceCodeIntoFunction('Game.doLumps', -1, `
			// Game.doLumps injection point 1
			for(var i in Game.customDoLumps) Game.customDoLumps[i]();
		`);
		
		
		// -----     Economics block     ----- //
		
		// Game.CalculateGains
		// I really think this is what he meant it to be
		// The original just has Game.customCps doing the same thing as Game.customCpsMult
		//eval('Game.CalculateGains = ' + Game.CalculateGains.toString().replace(
		//	'for (var i in Game.customCps) {mult*=Game.customCps[i]();}',
		//	'for (var i in Game.customCps) {Game.cookiesPs += Game.customCps[i]();}'));
		
		
		// Game.dropRateMult
		// Return 1 to have no effect
		if(!Game.customDropRateMult) Game.customDropRateMult = [];
		GameLoader.ReplaceCodeIntoFunction('Game.dropRateMult', 'return',
			`// Game.dropRateMult injection point 0
			for(var i in Game.customDropRateMult) rate *= Game.customDropRateMult[i]();`, -1);
		
		
		// -----     Shimmers block     ----- //
		
		// Game.shimmer
		// Runs when a shimmer (Golden cookie or reindeer) gets created
		// You can push a function that pops it immediately, but it will mess up any FtHoF predictor you use
		if(!Game.customShimmer) Game.customShimmer = [];
		GameLoader.SliceCodeIntoFunction('Game.shimmer', -1, `
			// Game.shimmer injection point 0
			for(var i in Game.customShimmer) Game.customShimmer[i](this);
		`, 0, 1);
		
		// Game.updateShimmers
		// Runs every logic frame when shimmers matter
		if(!Game.customUpdateShimmers) Game.customUpdateShimmers = [];
		GameLoader.SliceCodeIntoFunction('Game.updateShimmers', -1, `
			// Game.updateShimmers injection point 0
			for(var i in Game.customUpdateShimmers) Game.customUpdateShimmers[i]();
		`);
		
		
		// Game.killShimmers
		// Runs when we want to remove all shimmers
		if(!Game.customKillShimmers) Game.customKillShimmers = [];
		GameLoader.SliceCodeIntoFunction('Game.killShimmers', -1, `
			// Game.killShimmers injection point 0
			for(var i in Game.customKillShimmers) Game.customKillShimmers[i]();
		`);
		
		
		// Game.shimmerTypes
		if(!Game.customShimmerTypesAll) Game.customShimmerTypesAll = {};
		
		if(!Game.customShimmerTypesAll.initFunc) Game.customShimmerTypesAll.initFunc = [];
		GameLoader.customShimmerTypesAllinitFunc = function(me){
			for(var i in Game.customShimmerTypesAll.initFunc) Game.customShimmerTypesAll.initFunc[i](me);
		}
		
		if(!Game.customShimmerTypesAll.durationMult) Game.customShimmerTypesAll.durationMult = [];
		GameLoader.customShimmerTypesAlldurationMult = function(me){
			var dur = 1;
			for(var i in Game.customShimmerTypesAll.durationMult) dur *= Game.customShimmerTypesAll.durationMult[i](me);
			return dur;
		}
		
		if(!Game.customShimmerTypesAll.updateFunc) Game.customShimmerTypesAll.updateFunc = [];
		GameLoader.customShimmerTypesAllupdateFunc = function(me){
			for(var i in Game.customShimmerTypesAll.updateFunc) Game.customShimmerTypesAll.updateFunc[i](me);
		}
		
		if(!Game.customShimmerTypesAll.popFunc) Game.customShimmerTypesAll.popFunc = [];
		GameLoader.customShimmerTypesAllpopFunc = function(me){
			for(var i in Game.customShimmerTypesAll.popFunc) Game.customShimmerTypesAll.popFunc[i](me);
		}
		
		if(!Game.customShimmerTypesAll.spawnConditions) Game.customShimmerTypesAll.spawnConditions = [];
		GameLoader.customShimmerTypesAllspawnConditions = function(ret){
			for(var i in Game.customShimmerTypesAll.spawnConditions) ret = Game.customShimmerTypesAll.spawnConditions[i](ret);
			return ret;
		}
		
		if(!Game.customShimmerTypesAll.getTimeMod) Game.customShimmerTypesAll.getTimeMod = [];
		GameLoader.customShimmerTypesAllgetTimeMod = function(me){
			var m = 1;
			for(var i in Game.customShimmerTypesAll.getTimeMod) m *= Game.customShimmerTypesAll.getTimeMod[i](me);
			return m;
		}
		
		
		// In these, "me" refers to the shimmer itself, and "this" to the shimmer's type object
		// I put this in a separate function to call them when a new type is defined
		if(!Game.customShimmerTypes) Game.customShimmerTypes = {};
		GameLoader.Backup.customShimmerTypes = {};
		for(var key in Game.shimmerTypes){
			GameLoader.ReplaceShimmerType(key);
		}
		
		GameLoader.SliceCodeIntoFunction("Game.playGoldenCookieChime", -1, "else GameLoader.PlayShimmerSpawnSound('golden')", 0);
		GameLoader.ReplaceCodeIntoFunction("Game.shimmerTypes['golden'].initFunc", "Game.chimeType!=0", "GameLoader.config.chimeType != 'No sound'", 0);
		GameLoader.ReplaceCodeIntoFunction("Game.shimmerTypes['reindeer'].initFunc", "Game.chimeType!=0", "GameLoader.config.chimeType != 'No sound'", 0);
		
		
		// Game.shimmerTypes['golden'].popFunc
		// customListPush functions should push strings to list
		// customEffectDurMod functions should return a multiplier to the effect's duration
		// customMult functions should return a multiplier to the effect's magnitude (for Lucky, Chain Cookie, and Cookie Storm drops)
		// customBuff functions should return a a buff (result from Game.gainBuff). Return buff for no effect
		if(!Game.customShimmerTypes['golden'].customListPush) Game.customShimmerTypes['golden'].customListPush = [];
		if(!Game.customShimmerTypes['golden'].customEffectDurMod) Game.customShimmerTypes['golden'].customEffectDurMod = [];
		if(!Game.customShimmerTypes['golden'].customMult) Game.customShimmerTypes['golden'].customMult = [];
		if(!Game.customShimmerTypes['golden'].customBuff) Game.customShimmerTypes['golden'].customBuff = [];
		GameLoader.ReplaceCodeIntoFunction("Game.shimmerTypes['golden'].popFunc", 'var list=[];',
					`// Game.shimmerTypes['golden'].popFunc injection point 1
					for(var i in Game.customShimmerTypes['golden'].customListPush) Game.customShimmerTypes['golden'].customListPush[i](me, list);`, 1);
		GameLoader.ReplaceCodeIntoFunction("Game.shimmerTypes['golden'].popFunc", 'var buff=0;',
					`// Game.shimmerTypes['golden'].popFunc injection point 2
					for(var i in Game.customShimmerTypes['golden'].customEffectDurMod) effectDurMod *= Game.customShimmerTypes['golden'].customEffectDurMod[i](me);
					for(var i in Game.customShimmerTypes['golden'].customMult) mult *= Game.customShimmerTypes['golden'].customMult[i](me);
					for(var i in Game.customShimmerTypes['golden'].customBuff) buff = Game.customShimmerTypes['golden'].customBuff[i](me, buff, choice, effectDurMod, mult);`, 1);
		
		
		// Game.shimmerTypes['reindeer'].popFunc
		// customDropRateMult should return a multiplier to the fail rate for reindeer drops
		// Game.customDropRateMult is already taken into account. This is for reindeer specific functions
		// Return 1 to have no effect. Return 0 for a guarantee*
		if(!Game.customShimmerTypes['reindeer'].customDropRateMult) Game.customShimmerTypes['reindeer'].customDropRateMult = [];
		GameLoader.ReplaceCodeIntoFunction("Game.shimmerTypes['reindeer'].popFunc", 'if (Math.random()>failRate)',
					`// Game.shimmerTypes['reindeer'].popFunc injection point 1
					for(var i in Game.customShimmerTypes['reindeer'].customDropRateMult) failRate *= Game.customShimmerTypes['reindeer'].customDropRateMult[i](me);`, -1);
		
		
		// -----     Particles block       ----- //
		// Game.particleAdd
		temp = Game.particleAdd.toString();
		temp = temp.replaceAll("pic='icons.png';", `if (me.picPos.length == 3) {pic=me.picPos[2];me.picId = 0;}
						else pic='icons.png';`)
		eval('Game.particleAdd=' + temp);
		
		
		// -----     Notifications block   ----- //
		// -----     Prompts block         ----- //
		// -----     Menu block            ----- //
		// These start to get into the basic appearance of the game, and stray away from the gameplay itself
		// If someone has an idea they want to try that requires hooks into these functions, I can add them then
		
		
		// -----     Buildings block     ----- //
		
		// Game.Object
		// Alter this function so creating new buildings doesn't break the minigames
		GameLoader.ReplaceCodeIntoFunction('Game.Object', `str+='<div class="row" id="row'+this.id+'"><div class="separatorBottom"></div>';`,
				`{
					var div = document.createElement('div');
					div.id = 'row'+this.id;
					div.classList.add('row');
					str += '<div class="separatorBottom"></div>';
				}`, 0);
		GameLoader.ReplaceCodeIntoFunction('Game.Object', `str+='<div class="rowSpecial" id="rowSpecial'+this.id+'"></div>';`,
				`div.innerHTML = str;`, 1);
		GameLoader.ReplaceCodeIntoFunction('Game.Object', `l('rows').innerHTML=l('rows').innerHTML+str;`,
				`l('rows').appendChild(div);`, 0);
		
		
		// Game.DrawBuildings
		// Runs every draw frame if we're not ascending
		if(!Game.customDrawBuildings) Game.customDrawBuildings = [];
		GameLoader.SliceCodeIntoFunction('Game.DrawBuildings', -1, `
			// Game.DrawBuildings injection point 0
			for(var i in Game.customDrawBuildings) Game.customDrawBuildings[i]();
		`);
		
		
		// Game.modifyBuildingPrice
		// Functions should return a value to multiply the price by
		// Return 1 to have no effect
		if(!Game.customModifyBuildingPrice) Game.customModifyBuildingPrice = [];
		GameLoader.ReplaceCodeIntoFunction('Game.modifyBuildingPrice', 'return', `
			// Game.modifyBuildingPrice injection point 0
			for(var i in Game.customModifyBuildingPrice) price *= Game.customModifyBuildingPrice[i](building, price);`, -1);
		
		
		// Game.storeBulkButton
		if(!Game.customStoreBulkButton) Game.customStoreBulkButton = [];
		GameLoader.SliceCodeIntoFunction('Game.storeBulkButton', -1, `
			// Game.storeBulkButton injection point 0
			for(var i in Game.customStoreBulkButton) Game.customStoreBulkButton[i]();
		`);
		
		
		// Game.BuildStore
		if(!Game.customBuildStore) Game.customBuildStore = [];
		GameLoader.SliceCodeIntoFunction('Game.BuildStore', -1, `
			// Game.BuildStore injection point 0
			for(var i in Game.customBuildStore) Game.customBuildStore[i]();
		`);
		
		
		// Game.RefreshStore
		if(!Game.customRefreshStore) Game.customRefreshStore = [];
		GameLoader.SliceCodeIntoFunction('Game.RefreshStore', -1, `
			// Game.RefreshStore injection point 0
			for(var i in Game.customRefreshStore) Game.customRefreshStore[i]();
		`);
		
		
		// Game.scriptLoaded
		if(!Game.customScriptLoaded) Game.customScriptLoaded = [];
		if(!Game.customMinigameOnLoad) Game.customMinigameOnLoad = {};
		for(key in Game.Objects) if(!Game.customMinigameOnLoad[key]) Game.customMinigameOnLoad[key] = [];
		
		GameLoader.SliceCodeIntoFunction('Game.scriptLoaded', -1, `
			// Game.scriptLoaded injection point 0
			for(var i in Game.customScriptLoaded) Game.customScriptLoaded[i](who, script); // Who knows, maybe those arguments might be needed
			for(var i in Game.customMinigameOnLoad[who.name]) Game.customMinigameOnLoad[who.name][i](who, script);
		`);
		
		
		// -----     Upgrades block     ----- //
		
		// Game.storeBuyAll
		if(!Game.customStoreBuyAll) Game.customStoreBuyAll = [];
		GameLoader.SliceCodeIntoFunction('Game.storeBuyAll', -1, `
			// Game.storeBuyAll injection point 0
			for(var i in Game.customStoreBuyAll) Game.customStoreBuyAll[i]();
		`);
		
		
		// Game.CountsAsUpgradeOwned
		// Return ret to have no effect
		if(!Game.customCountsAsUpgradeOwned) Game.customCountsAsUpgradeOwned = [];
		GameLoader.SpliceCodeIntoFunction('Game.CountsAsUpgradeOwned', 2, 'var ret;');
		GameLoader.ReplaceCodeIntoFunction('Game.CountsAsUpgradeOwned', /return/g, 'ret =', 0);
		GameLoader.SliceCodeIntoFunction('Game.CountsAsUpgradeOwned', -1, `
			// Game.CountsAsUpgradeOwned injection point 0
			for(var i in Game.customCountsAsUpgradeOwned) ret = Game.customCountsAsUpgradeOwned[i](pool, ret);
			return ret;
		`);
		
		
		// Game.Unlock
		if(!Game.customUnlock) Game.customUnlock = [];
		GameLoader.SliceCodeIntoFunction('Game.Unlock', -1, `
			// Game.Unlock injection point 0
			for(var i in Game.customUnlock) Game.customUnlock[i](what);
		`);
		
		
		// Game.Lock
		if(!Game.customLock) Game.customLock = [];
		GameLoader.SliceCodeIntoFunction('Game.Lock', -1, `
			// Game.Lock injection point 0
			for(var i in Game.customLock) Game.customLock[i](what);
		`);
		
		
		// Game.RebuildUpgrades
		if(!Game.customRebuildUpgrades) Game.customRebuildUpgrades = [];
		GameLoader.SliceCodeIntoFunction('Game.RebuildUpgrades', -1, `
			// Game.RebuildUpgrades injection point 0
			for(var i in Game.customRebuildUpgrades) Game.customRebuildUpgrades[i]();
		`);
		
		
		// Game.GetTieredCpsMult
		// Functions should return a value to multiply mult by (Return 1 to have no effect)
		if(!Game.customGetTieredCpsMult) Game.customGetTieredCpsMult = [];
		GameLoader.ReplaceCodeIntoFunction('Game.GetTieredCpsMult', 'return', `
			// Game.GetTieredCpsMult injection point 0
			for(var i in Game.customGetTieredCpsMult) mult *= Game.customGetTieredCpsMult[i](me);`, -1);
		
		
		// Game.UnlockTiered
		if(!Game.customUnlockTiered) Game.customUnlockTiered = [];
		GameLoader.SliceCodeIntoFunction('Game.UnlockTiered', -1, `
			// Game.UnlockTiered injection point 0
			for(var i in Game.customUnlockTiered) Game.customUnlockTiered[i](me);
		`);
		
		
		// Game.SetResearch
		if(!Game.customSetResearch) Game.customSetResearch = [];
		GameLoader.SliceCodeIntoFunction('Game.SetResearch', -1, `
			// Game.SetResearch injection point 0
			for(var i in Game.customSetResearch) Game.customSetResearch[i](what, time);
		`);
		
		
		// Game.DropEgg
		// Functions should return a value to multiply failRate by (Return 1 to have no effect)
		if(!Game.customDropEgg) Game.customDropEgg = [];
		GameLoader.SpliceCodeIntoFunction('Game.DropEgg', 2,
			`// Game.DropEgg injection point 0
			for(var i in Game.customDropEgg) failRate *= Game.customDropEgg[i]();`);
		
		
		// Game.PermanentSlotIcon
		// Functions should return an upgrade id. Return id for no effect.
		if(!Game.customPermanentUpgradeId) Game.customPermanentUpgradeId = [];
		Game.customPermanentUpgradeId.push(GameLoader.GetPermanentUpgrade);
		GameLoader.SpliceCodeIntoFunction('Game.PermanentSlotIcon', 2,
			`// Game.PermanentSlotIcon injection point 0
			var id = Game.permanentUpgrades[slot];
			for(var i in Game.customPermanentUpgradeId) id = Game.customPermanentUpgradeId[i](slot, id);`,
			'Game.PermanentSlotIcon=' + Game.PermanentSlotIcon.toString().replaceAll('Game.permanentUpgrades[slot]','id'));
		
		
		// Game.AssignPermanentSlot
		GameLoader.ReplaceCodeIntoFunction('Game.AssignPermanentSlot', 'if (!fail)',
			'for (var ii in GameLoader.config.permanentUpgrades) {if (GameLoader.config.permanentUpgrades[ii]==me.name) fail=1;}', -1);
		GameLoader.ReplaceCodeIntoFunction('Game.AssignPermanentSlot', 'var upgrade=Game.permanentUpgrades[slot];',
			'for(var i in Game.customPermanentUpgradeId) upgrade = Game.customPermanentUpgradeId[i](slot, upgrade);', 1);
		GameLoader.ReplaceCodeIntoFunction('Game.AssignPermanentSlot', 'Game.BuildAscendTree();',
			'GameLoader.RectifyPermanentUpgrades();Game.BuildAscendTree();', 0);
		
		
		// Game.PutUpgradeInPermanentSlot
		if(!Game.customPutUpgradeInPermanentSlot) Game.customPutUpgradeInPermanentSlot = [];
		GameLoader.SliceCodeIntoFunction('Game.PutUpgradeInPermanentSlot', -1, `
			// Game.PutUpgradeInPermanentSlot injection point 0
			for(var i in Game.customPutUpgradeInPermanentSlot) Game.customPutUpgradeInPermanentSlot[i](upgrade, slot);
		`);
		
		
		// Game.loseShimmeringVeil
		if(!Game.customLoseShimmeringVeil) Game.customLoseShimmeringVeil = [];
		GameLoader.SliceCodeIntoFunction('Game.loseShimmeringVeil', -1, `
			// Game.loseShimmeringVeil injection point 0
			for(var i in Game.customLoseShimmeringVeil) Game.customLoseShimmeringVeil[i](context);
		`);
		
		
		// Game.listTinyOwnedUpgrades
		if(!Game.customListTinyOwnedUpgrades) Game.customListTinyOwnedUpgrades = [];
		GameLoader.ReplaceCodeIntoFunction('Game.listTinyOwnedUpgrades', 'return', `
			// Game.listTinyOwnedUpgrades injection point 0
			for(var i in Game.customListTinyOwnedUpgrades) str = Game.customListTinyOwnedUpgrades[i](arr, str);`, -1);
		
		
		// Game.TieredUpgrade
		GameLoader.ReplaceCodeIntoFunction('Game.TieredUpgrade', 'new Game.Upgrade', 'GameLoader.NewUpgrade', 0);
		
		
		// Game.SynergyUpgrade
		GameLoader.ReplaceCodeIntoFunction('Game.SynergyUpgrade', 'new Game.Upgrade', 'GameLoader.NewUpgrade', 0);
		
		
		// Game.GrandmaSynergy
		GameLoader.ReplaceCodeIntoFunction('Game.GrandmaSynergy', 'new Game.Upgrade', 'GameLoader.NewUpgrade', 0);
		
		
		// Game.NewUpgradeCookie
		GameLoader.ReplaceCodeIntoFunction('Game.NewUpgradeCookie', 'new Game.Upgrade', 'GameLoader.NewUpgrade', 0, GameLoader.Steam ?
			`var strCookieProductionMultiplierPlus=loc("Cookie production multiplier <b>+%1%</b>.",'[x]');
			var getStrCookieProductionMultiplierPlus=function(x)
			{return strCookieProductionMultiplierPlus.replace('[x]',x);}` : 0);
		GameLoader.ReplaceCodeIntoFunction('Game.NewUpgradeCookie', 'return upgrade;', 'Game.cookieUpgrades.push(upgrade);', -1, GameLoader.Steam ?
			`var strCookieProductionMultiplierPlus=loc("Cookie production multiplier <b>+%1%</b>.",'[x]');
			var getStrCookieProductionMultiplierPlus=function(x)
			{return strCookieProductionMultiplierPlus.replace('[x]',x);}` : 0);
		
		
		// Game.getVeilDefense
		// Return 0 for no effect
		if(!Game.customGetVeilDefense) Game.customGetVeilDefense = [];
		GameLoader.ReplaceCodeIntoFunction('Game.getVeilDefense', 'return', `
			// Game.getVeilDefense injection point 0
			for(var i in Game.customGetVeilDefense) n += Game.customGetVeilDefense[i](n);`, -1);
		
		
		// Game.getVeilBoost
		// Return 0 for no effect
		if(!Game.customGetVeilBoost) Game.customGetVeilBoost = [];
		GameLoader.ReplaceCodeIntoFunction('Game.getVeilBoost', 'return', `
			// Game.getVeilBoost injection point 0
			for(var i in Game.customGetVeilBoost) n += Game.customGetVeilBoost[i](n);`, -1);
		
		
		// -----     Seasons block     ----- //
		
		// Game.computeSeasons
		GameLoader.ReplaceCodeIntoFunction('Game.computeSeasons', `Game.Notify(Game.seasons[this.season].start+'<div class="line"></div>','',this.icon,4);`, `
					// Game.computeSeasons injection point 0
					for(var i in Game.customUpgrades[this.name].buyFunction) Game.customUpgrades[this.name].buyFunction[i](this);`, 1);
		
		
		// Game.getSeasonDuration
		// Just rewrote it instead of doing the eval replace thing
		// Functions should return a multiplier to the season duration
		// Return 1 to have no effect
		if(!Game.customGetSeasonDuration) Game.customGetSeasonDuration = [];
		Game.getSeasonDuration = function(){
			var ret = Game.fps*60*60*24;
			// Game.getSeasonDuration injection point 0
			for(var i in Game.customGetSeasonDuration) ret *= Game.customGetSeasonDuration[i]();
			return ret;
		}
		
		
		// -----     Achievements block     ----- //
		
		// Game.Win
		if(!Game.customWin) Game.customWin = [];
		GameLoader.SliceCodeIntoFunction('Game.Win', -1, `
			// Game.Win injection point 0
			for(var i in Game.customWin) Game.customWin[i](what);
		`);
		
		
		// Game.TieredAchievement
		GameLoader.ReplaceCodeIntoFunction('Game.TieredAchievement', 'new Game.Achievement', 'GameLoader.NewAchievement', 0);
		
		
		// Game.ProductionAchievement
		GameLoader.ReplaceCodeIntoFunction('Game.ProductionAchievement', 'new Game.Achievement', 'GameLoader.NewAchievement', 0);
		
		
		// Game.BankAchievement
		GameLoader.ReplaceCodeIntoFunction('Game.BankAchievement', 'new Game.Achievement', 'GameLoader.NewAchievement', 0);
		
		
		// Game.CpsAchievement
		GameLoader.ReplaceCodeIntoFunction('Game.CpsAchievement', 'new Game.Achievement', 'GameLoader.NewAchievement', 0);
		
		
		// -----     Buffs block     ----- //
		
		// Game.gainBuff
		if(!Game.customGainBuff) Game.customGainBuff = [];
		GameLoader.ReplaceCodeIntoFunction('Game.gainBuff', 'return', `
			// Game.gainBuff injection point 0
			for(var i in Game.customGainBuff) Game.customGainBuff[i](buff);`, -1);
		
		
		// Game.updateBuffs
		// executed every logic frame
		if(!Game.customUpdateBuffs) Game.customUpdateBuffs = [];
		GameLoader.SliceCodeIntoFunction('Game.updateBuffs', -1, `
			// Game.updateBuffs injection point 0
			for(var i in Game.customUpdateBuffs) Game.customUpdateBuffs[i]();
		`);
		
		
		for(var i in Game.buffTypes){
			var buff = Game.buffTypes[i];
			if(buff.name == 'building buff'){
				GameLoader.ReplaceCodeIntoFunction('Game.buffTypes[' + i + '].func',
					'icon:[obj.iconColumn,14],',
					'icon:[obj.iconColumn,14,(obj.art.customIconsPic ? obj.art.customIconsPic : 0)],', 0);
			}
			else if(buff.name == 'building debuff'){
				GameLoader.ReplaceCodeIntoFunction('Game.buffTypes[' + i + '].func',
					'icon:[obj.iconColumn,15],',
					'icon:[obj.iconColumn,15,(obj.art.customIconsPic ? obj.art.customIconsPic : 0)],', 0);
			}
		}
		
		
		// -----     GRANDMAPOCALYPSE block     ----- //
		
		// I need this because this gets used once and if I leave it out the game breaks
		function inRect(x,y,rect)
		{
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
		
		// Game.UpdateGrandmapocalypse
		// executed every logic frame
		if(!Game.customUpdateGrandmapocalypse) Game.customUpdateGrandmapocalypse = [];
		GameLoader.SliceCodeIntoFunction('Game.UpdateGrandmapocalypse', -1, `
			// Game.UpdateGrandmapocalypse injection point 0
			for(var i in Game.customUpdateGrandmapocalypse) Game.customUpdateGrandmapocalypse[i]();
		`);
		
		
		// Game.getWrinklersMax
		// Functions should return a value to add to n. Return 0 to have no effect
		if(!Game.customGetWrinklersMax) Game.customGetWrinklersMax = [];
		GameLoader.ReplaceCodeIntoFunction('Game.getWrinklersMax', 'return', `
			// Game.getWrinklersMax injection point 0
			for(var i in Game.customGetWrinklersMax) n += Game.customGetWrinklersMax[i](n);`, -1);
		
		
		// Game.SpawnWrinkler
		if(!Game.customSpawnWrinkler) Game.customSpawnWrinkler = [];
		GameLoader.ReplaceCodeIntoFunction('Game.SpawnWrinkler', 'return me', `
			// Game.SpawnWrinkler injection point 0
			for(var i in Game.customSpawnWrinkler) Game.customSpawnWrinkler[i](me);`, -1);
		
		
		// Game.UpdateWrinklers
		// customWrinklerSpawnChance functions should return a multiplier to chance. (Return 1 to have no effect)
		if(!Game.customUpdateWrinklers) Game.customUpdateWrinklers = [];
		if(!Game.customWrinklerSpawnChance) Game.customWrinklerSpawnChance = [];
		if(!Game.customWrinklerPop) Game.customWrinklerPop = [];
		GameLoader.ReplaceCodeIntoFunction('Game.UpdateWrinklers', 'if (Math.random()<chance)', `
					// Game.UpdateWrinklers injection point 0
					for(var i in Game.customWrinklerSpawnChance) chance *= Game.customWrinklerSpawnChance[i]();`, -1);
		GameLoader.ReplaceCodeIntoFunction('Game.UpdateWrinklers', 'Game.Earn(me.sucked);', `
					// Game.UpdateWrinklers injection point 1
					for(var i in Game.customWrinklerPop) Game.customWrinklerPop[i](me);`, -1);
		GameLoader.SliceCodeIntoFunction('Game.UpdateWrinklers', -1, `
			// Game.UpdateWrinklers injection point 2
			for(var i in Game.customUpdateWrinklers) Game.customUpdateWrinklers[i]();
		`, inRect.toString());
		
		
		// Game.DrawWrinklers
		if(!Game.customDrawWrinklers) Game.customDrawWrinklers = [];
		GameLoader.SliceCodeIntoFunction('Game.DrawWrinklers', -1, `
			// Game.DrawWrinklers injection point 0
			for(var i in Game.customDrawWrinklers) Game.customDrawWrinklers[i]();
		`);
		
		
		// Game.SaveWrinklers
		// Return ret to have no effect
		if(!Game.customSaveWrinklers) Game.customSaveWrinklers = [];
		GameLoader.ReplaceCodeIntoFunction('Game.SaveWrinklers', 'return', `
			// Game.SaveWrinklers injection point 0
			var ret =`, 0);
		GameLoader.SliceCodeIntoFunction('Game.SaveWrinklers', -1, `
			// Game.SaveWrinklers injection point 1
			for(var i in Game.customSaveWrinklers) ret = Game.customSaveWrinklers[i](ret);
			return ret;
		`);
		
		
		// Game.LoadWrinklers
		if(!Game.customLoadWrinklers) Game.customLoadWrinklers = [];
		GameLoader.SliceCodeIntoFunction('Game.LoadWrinklers', -1, `
			// Game.LoadWrinklers injection point 0
			for(var i in Game.customLoadWrinklers) Game.customLoadWrinklers[i](amount, number, shinies, amountShinies);
		`);
		
		
		// -----     Special things and stuff block     ----- //
		
		// Game.UpdateSpecial
		// customSpecialTabs functions should push a string to Game.specialTabs (or not)
		if(!Game.customSpecialTabs) Game.customSpecialTabs = [];
		GameLoader.ReplaceCodeIntoFunction('Game.UpdateSpecial', 'if (Game.specialTabs.length==0)',
			`// Game.UpdateSpecial injection point 0
			for(var i in Game.customSpecialTabs) Game.customSpecialTabs[i]();`, -1);
		
		
		// Game.UpgradeSanta
		if(!Game.customUpgradeSanta) Game.customUpgradeSanta = [];
		GameLoader.SliceCodeIntoFunction('Game.UpgradeSanta', -1, `
			// Game.UpgradeSanta injection point 0
			for(var i in Game.customUpgradeSanta) Game.customUpgradeSanta[i]();
		`);
		
		
		// Game.hasAura
		// Return ret to have no effect
		if(!Game.customHasAura) Game.customHasAura = [];
		GameLoader.SpliceCodeIntoFunction('Game.hasAura', 2, 'var ret;');
		GameLoader.ReplaceCodeIntoFunction('Game.hasAura', /return/g, 'ret =', 0);
		GameLoader.SliceCodeIntoFunction('Game.hasAura', -1, `
			// Game.hasAura injection point 0
			for(var i in Game.customHasAura) ret = Game.customHasAura[i](what, ret);
			return ret;
		`);
		
		
		// Game.auraMult
		// Return 1 to have no effect
		if(!Game.customAuraMult) Game.customAuraMult = [];
		GameLoader.ReplaceCodeIntoFunction('Game.auraMult', 'return', `
			// Game.auraMult injection point 0
			for(var i in Game.customAuraMult) n *= Game.customAuraMult[i](what);
			return`, 0);
		
		
		// Game.SelectDragonAura
		// Actually no. This function is not conducive to customization. Seems like 2 auras is all we get.
		// customCurrentDragonAura functions should return an array index for currentAura (Return currentAura to do nothing)
		// customDragonAuraShow functions should return 1 to show that aura in the picker, 0 to not (Return show to do nothing)
		/*if(!Game.customCurrentDragonAura) Game.customCurrentDragonAura = [];
		if(!Game.customDragonAuraShow) Game.customDragonAuraShow = [];
		temp = Game.SelectDragonAura.toString();
		eval('Game.SelectDragonAura = ' + temp.replace('if (!update)',
			`for(var i in Game.customCurrentDragonAura) currentAura = Game.customCurrentDragonAura[i](slot, update, currentAura);
			if (!update)`).replace('if (i==0 || i!=otherAura)',
					`var show = (i==0 || i!=otherAura);
					for(var i in Game.customDragonAuraShow) show = Game.customDragonAuraShow[i](slot, update, i, show);
					if (show)`));*/
		
		
		// Game.DescribeDragonAura
		if(!Game.customDescribeDragonAura) Game.customDescribeDragonAura = [];
		GameLoader.SliceCodeIntoFunction('Game.DescribeDragonAura', -1, `
			// Game.DescribeDragonAura injection point 0
			for(var i in Game.customDescribeDragonAura) Game.customDescribeDragonAura[i](aura);
		`);
		
		
		// Game.UpgradeDragon
		if(!Game.customUpgradeDragon) Game.customUpgradeDragon = [];
		GameLoader.SliceCodeIntoFunction('Game.UpgradeDragon', -1, `
			// Game.UpgradeDragon injection point 0
			for(var i in Game.customUpgradeDragon) Game.customUpgradeDragon[i]();
		`);
		
		
		// Game.ClickSpecialPic
		if(!Game.customClickSpecialPic) Game.customClickSpecialPic = [];
		GameLoader.SliceCodeIntoFunction('Game.ClickSpecialPic', -1, `
			// Game.ClickSpecialPic injection point 0
			for(var i in Game.customClickSpecialPic) Game.customClickSpecialPic[i]();
		`);
		
		
		// Game.ToggleSpecialMenu
		// customToggleSpecialMenu functions should return a string for l('specialPopup').innerHTML (Return str for no effect)
		// str.replace('background:url(img/dragon.png?v='+Game.version+');background-position:-384px 0px;', <your pic here>)
		// Pics are 96px by 96px
		if(!Game.customToggleSpecialMenu) Game.customToggleSpecialMenu = [];
		GameLoader.ReplaceCodeIntoFunction('Game.ToggleSpecialMenu', "l('specialPopup').innerHTML=str;",
			`// Game.ToggleSpecialMenu injection point 0
			for(var i in Game.customToggleSpecialMenu) str = Game.customToggleSpecialMenu[i](str);`, -1);
		
		
		// Game.DrawSpecial
		// customDrawSpecialPic functions should alter the picframe object
		// Pics are 96px by 96px
		if(!Game.customDrawSpecial) Game.customDrawSpecial = [];
		if(!Game.customDrawSpecialPic) Game.customDrawSpecialPic = [];
		GameLoader.ReplaceCodeIntoFunction('Game.DrawSpecial', "if (hovered || selected)",
			`// Game.DrawSpecial injection point 0
				var picframe = {pic:pic, frame:frame};
				for(var j in Game.customDrawSpecialPic) Game.customDrawSpecialPic[j](picframe, Game.specialTabs[i]);
				pic = picframe.pic; frame = picframe.frame;`, -1);
		GameLoader.SliceCodeIntoFunction('Game.DrawSpecial', -1, `
			// Game.DrawSpecial injection point 1
			for(var i in Game.customDrawSpecial) Game.customDrawSpecial[i]();
		`);
		
		
		// -----     Visual Effects block     ----- //
		
		// Game.DrawBackground
		// Game.customDrawBackground functions get called in the same block that creates the cookie rain and seasonal backgrounds
		// If you want a hook somewhere else, let me know
		if(!Game.customDrawBackground) Game.customDrawBackground = [];
		GameLoader.ReplaceCodeIntoFunction('Game.DrawBackground', "Timer.track('left background');",
			`// Game.DrawBackground injection point 0
			for(var i in Game.customDrawBackground) Game.customDrawBackground[i]();`, -1);
		
		// Setup for custom Milk Selector options
		GameLoader.ReplaceCodeIntoFunction('Game.DrawBackground', "if (Game.milkType!=0 && Game.ascensionMode!=1) pic=Game.AllMilks[Game.milkType].pic;",
															'if (GameLoader.config.milkType!="Automatic" && Game.ascensionMode!=1) pic=GameLoader.GetSelectedMilk().milk.pic;', 0);
		
		// Setup for custom Background Selector options
		temp = Game.DrawBackground.toString();
		temp = temp.replace("Game.bg+'.jpg'", 'Game.bg');
		temp = temp.replace("Game.bgFade+'.jpg'", 'Game.bgFade');
		temp = temp.replace("Game.BGsByChoice[Game.bgType]", 'choice');
		temp = temp.replace("if (Game.bgType!=0 && Game.ascensionMode!=1)",
						`Game.bg += '.jpg';
						Game.bgFade += '.jpg';
						
						if (Game.ascensionMode!=1)
						{
							let choice = GameLoader.GetSelectedBackground();
							if(choice.name != loc('Automatic'))`);
		temp = temp.replace("Game.Background.fillPattern(Pic(Game.bg)",
							`}
						Game.Background.fillPattern(Pic(Game.bg)`);
		eval('Game.DrawBackground = ' + temp);
		for(var i in Game.BGsByChoice) Game.BGsByChoice[i].pic += '.jpg';
		
		
		// -----     Debug block     ----- //
		
		// Game.OpenSesame
		// Game.customOpenSesame functions should add HTML strings to the debug menu
		if(!Game.customOpenSesame) Game.customOpenSesame = [];
		GameLoader.ReplaceCodeIntoFunction('Game.OpenSesame', "str+='</div>';",
			`// Game.OpenSesame injection point 0
			for(var i in Game.customOpenSesame) str += Game.customOpenSesame[i]();`, -1);
		
		
		// -----     YouCustomizer block     ----- //
		
		// Game.YouCustomizer.render
		if(!Game.customYouCustomizerRender) Game.customYouCustomizerRender = [];
		GameLoader.SliceCodeIntoFunction('Game.YouCustomizer.render', -1, `
			// Game.YouCustomizer.render injection point 0
			for(var i in Game.customYouCustomizerRender) Game.customYouCustomizerRender[i]();
		`);
		
		
		// Game.YouCustomizer.getGeneValue
		// Return retVal to have no effect
		temp = Game.YouCustomizer.getGeneValue.toString();
		temp = temp.replace('var gene=', 'var retVal;\r\nvar gene=');
		temp = temp.replaceAll('return', 'retVal =');
		eval('Game.YouCustomizer.getGeneValue = ' + temp);
		if(!Game.customYouCustomizerGetGeneValue) Game.customYouCustomizerGetGeneValue = [];
		GameLoader.SliceCodeIntoFunction('Game.YouCustomizer.getGeneValue', -1, `
			// Game.YouCustomizer.getGeneValue injection point 0
			for(var i in Game.customYouCustomizerGetGeneValue) retVal = Game.customYouCustomizerGetGeneValue[i](id, retVal);
			return retVal;
		`);
		
		
		// Game.YouCustomizer.offsetGene
		if(!Game.customYouCustomizerOffsetGene) Game.customYouCustomizerOffsetGene = [];
		GameLoader.SliceCodeIntoFunction('Game.YouCustomizer.offsetGene', -1, `
			// Game.YouCustomizer.offsetGene injection point 0
			for(var i in Game.customYouCustomizerOffsetGene) Game.customYouCustomizerOffsetGene[i](gene,off);
		`);
		
		
		// Game.YouCustomizer.randomize
		if(!Game.customYouCustomizerRandomize) Game.customYouCustomizerRandomize = [];
		GameLoader.ReplaceCodeIntoFunction('Game.YouCustomizer.randomize', "Game.YouCustomizer.render();",
			`// Game.YouCustomizer.randomize injection point 0
			for(var i in Game.customYouCustomizerRandomize) str = Game.customYouCustomizerRandomize[i]();`, -1);
		
		
		// Game.YouCustomizer.renderPortrait
		if(!Game.customYouCustomizerRenderPortrait) Game.customYouCustomizerRenderPortrait = [];
		GameLoader.SliceCodeIntoFunction('Game.YouCustomizer.renderPortrait', -1, `
			// Game.YouCustomizer.renderPortrait injection point 0
			for(var i in Game.customYouCustomizerRenderPortrait) Game.customYouCustomizerRenderPortrait[i]();
		`);
		
		
		// Game.YouCustomizer.prompt
		if(!Game.customYouCustomizerPrompt) Game.customYouCustomizerPrompt = [];
		if(!Game.customYouCustomizerMakeCustomizerSelector) Game.customYouCustomizerMakeCustomizerSelector = [];
		temp = Game.YouCustomizer.prompt.toString();
		temp = temp.replace('return', 'var retVal =');
		temp = temp.replace('}', `
			// Game.YouCustomizer.prompt injection point 0
			for(var i in Game.customYouCustomizerMakeCustomizerSelector) retVal = Game.customYouCustomizerMakeCustomizerSelector[i](gene,text,retVal);
			return retVal;
		}`);
		eval('Game.YouCustomizer.prompt = ' + temp);
		GameLoader.SliceCodeIntoFunction('Game.YouCustomizer.prompt', -1, `
			// Game.YouCustomizer.prompt injection point 1
			for(var i in Game.customYouCustomizerPrompt) Game.customYouCustomizerPrompt[i]();
		`);
		
		
		// -----     Gifting block     ----- //
		// Game.promptGiftRedeem
		// Game.promptGiftSend
			// Submit an issue to the GitHub page with where you want a hook
			// Until that happens, these functions won't either
		
	}
	
	if(!GameLoader.customReplaceShimmerType) GameLoader.customReplaceShimmerType = [];
	GameLoader.ReplaceShimmerType = function(key){
		var temp = '';
		var pos = 0;
		var proto;
		var escKey = key.replace(/'/g, "\\'");
		
		if(!Game.customShimmerTypes[key]) Game.customShimmerTypes[key] = {};
		GameLoader.Backup.customShimmerTypes[key] = {};
		
		
		// Game.shimmerTypes[key].initFunc
		// durationMult functions should return a value to multiply the duration by
		if(!Game.customShimmerTypes[key].initFunc) Game.customShimmerTypes[key].initFunc = [];
		if(!Game.customShimmerTypes[key].durationMult) Game.customShimmerTypes[key].durationMult = [];
		Game.customShimmerTypes[key].initFunc.push(GameLoader.customShimmerTypesAllinitFunc);
		Game.customShimmerTypes[key].durationMult.push(GameLoader.customShimmerTypesAlldurationMult);
		GameLoader.ReplaceCodeIntoFunction("Game.shimmerTypes['" + escKey + "'].initFunc", 'me.dur=dur;',
					`// Game.shimmerTypes['` + escKey + `'].initFunc injection point 0
					for(var i in Game.customShimmerTypes['` + escKey + `'].durationMult) dur *= Game.customShimmerTypes['` + escKey + `'].durationMult[i](me);`, -1);
		GameLoader.SliceCodeIntoFunction("Game.shimmerTypes['" + escKey + "'].initFunc", -1, `
					// Game.shimmerTypes['` + escKey + `'].initFunc injection point 1
					for(var i in Game.customShimmerTypes['` + escKey + `'].initFunc) Game.customShimmerTypes['` + escKey + `'].initFunc[i](me);
				`);
		//GameLoader.ReplaceCodeIntoFunction("Game.shimmerTypes['" + escKey + "'].initFunc", 'Game.chimeType==1 && ', '', 0);
		
		
		// Game.shimmerTypes[key].updateFunc
		if(!Game.customShimmerTypes[key].updateFunc) Game.customShimmerTypes[key].updateFunc = [];
		Game.customShimmerTypes[key].updateFunc.push(GameLoader.customShimmerTypesAllupdateFunc);
		GameLoader.SliceCodeIntoFunction("Game.shimmerTypes['" + escKey + "'].updateFunc", -1, `
					// Game.shimmerTypes['` + escKey + `'].updateFunc injection point 0
					for(var i in Game.customShimmerTypes['` + escKey + `'].updateFunc) Game.customShimmerTypes['` + escKey + `'].updateFunc[i](me);
				`);
		
		
		// Game.shimmerTypes[key].popFunc
		if(!Game.customShimmerTypes[key].popFunc) Game.customShimmerTypes[key].popFunc = [];
		Game.customShimmerTypes[key].popFunc.push(GameLoader.customShimmerTypesAllpopFunc);
		GameLoader.SliceCodeIntoFunction("Game.shimmerTypes['" + escKey + "'].popFunc", -1, `
					// Game.shimmerTypes['` + escKey + `'].popFunc injection point 0
					for(var i in Game.customShimmerTypes['` + escKey + `'].popFunc) Game.customShimmerTypes['` + escKey + `'].popFunc[i](me);
				`);
		
		
		// Game.shimmerTypes[key].spawnConditions
		// Return ret to have no effect
		if(!Game.customShimmerTypes[key].spawnConditions) Game.customShimmerTypes[key].spawnConditions = [];
		Game.customShimmerTypes[key].spawnConditions.push(GameLoader.customShimmerTypesAllspawnConditions);
		GameLoader.SpliceCodeIntoFunction("Game.shimmerTypes['" + escKey + "'].spawnConditions", 2, 'var ret;');
		GameLoader.ReplaceCodeIntoFunction("Game.shimmerTypes['" + escKey + "'].spawnConditions", /return/g, 'ret =', 0);
		GameLoader.SliceCodeIntoFunction("Game.shimmerTypes['" + escKey + "'].spawnConditions", -1, `
					// Game.shimmerTypes['` + escKey + `'].spawnConditions injection point 0
					for(var i in Game.customShimmerTypes['` + escKey + `'].spawnConditions) ret = Game.customShimmerTypes['` + escKey + `'].spawnConditions[i](ret);
					return ret;
				`);
		
		
		// Game.shimmerTypes[key].getTimeMod
		// Functions should return a multiplier to the shimmer's spawn time (higher takes longer to spawn)
		// Return 1 to have no effect
		if(!Game.customShimmerTypes[key].getTimeMod) Game.customShimmerTypes[key].getTimeMod = [];
		Game.customShimmerTypes[key].getTimeMod.push(GameLoader.customShimmerTypesAllgetTimeMod);
		GameLoader.ReplaceCodeIntoFunction("Game.shimmerTypes['" + escKey + "'].getTimeMod", 'return', `
					// Game.shimmerTypes['` + escKey + `'].getTimeMod injection point 0
					for(var i in Game.customShimmerTypes['` + escKey + `'].getTimeMod) m *= Game.customShimmerTypes['` + escKey + `'].getTimeMod[i](me);`, -1);
		
		
		for(var i in GameLoader.customReplaceShimmerType) GameLoader.customReplaceShimmerType[i](key);
	}
	
	if(!GameLoader.customReplaceBuilding) GameLoader.customReplaceBuilding = [];
	GameLoader.ReplaceBuildingsStart = function(){
		if(!Game.customBuildingsAll) Game.customBuildingsAll = {};
		
		if(!Game.customBuildingsAll.switchMinigame) Game.customBuildingsAll.switchMinigame = [];
		GameLoader.customBuildingsAllswitchMinigame = function(obj, on){
			for(var i in Game.customBuildingsAll.switchMinigame) Game.customBuildingsAll.switchMinigame[i](obj, on);
		}
		
		if(!Game.customBuildingsAll.getSellMultiplier) Game.customBuildingsAll.getSellMultiplier = [];
		GameLoader.customBuildingsAllgetSellMultiplier = function(obj, giveBack){
			for(var i in Game.customBuildingsAll.getSellMultiplier) giveBack = Game.customBuildingsAll.getSellMultiplier[i](obj, giveBack);
			return giveBack;
		}
		
		if(!Game.customBuildingsAll.buy) Game.customBuildingsAll.buy = [];
		GameLoader.customBuildingsAllbuy = function(obj, amount){
			for(var i in Game.customBuildingsAll.buy) Game.customBuildingsAll.buy[i](obj, amount);
		}
		
		if(!Game.customBuildingsAll.sell) Game.customBuildingsAll.sell = [];
		GameLoader.customBuildingsAllsell = function(obj, amount, bypass){
			for(var i in Game.customBuildingsAll.sell) Game.customBuildingsAll.sell[i](obj, amount, bypass);
		}
		
		if(!Game.customBuildingsAll.sacrifice) Game.customBuildingsAll.sacrifice = [];
		GameLoader.customBuildingsAllsacrifice = function(obj, amount){
			for(var i in Game.customBuildingsAll.sacrifice) Game.customBuildingsAll.sacrifice[i](obj, amount);
		}
		
		if(!Game.customBuildingsAll.buyFree) Game.customBuildingsAll.buyFree = [];
		GameLoader.customBuildingsAllbuyFree = function(obj, amount){
			for(var i in Game.customBuildingsAll.buyFree) Game.customBuildingsAll.buyFree[i](obj, amount);
		}
		
		if(!Game.customBuildingsAll.getFree) Game.customBuildingsAll.getFree = [];
		GameLoader.customBuildingsAllgetFree = function(obj, amount){
			for(var i in Game.customBuildingsAll.getFree) Game.customBuildingsAll.getFree[i](obj, amount);
		}
		
		if(!Game.customBuildingsAll.getFreeRanks) Game.customBuildingsAll.getFreeRanks = [];
		GameLoader.customBuildingsAllgetFreeRanks = function(obj, amount){
			for(var i in Game.customBuildingsAll.getFreeRanks) Game.customBuildingsAll.getFreeRanks[i](obj, amount);
		}
		
		if(!Game.customBuildingsAll.tooltip) Game.customBuildingsAll.tooltip = [];
		GameLoader.customBuildingsAlltooltip = function(obj, ret){
			for(var i in Game.customBuildingsAll.tooltip) ret = Game.customBuildingsAll.tooltip[i](obj, ret);
			return ret;
		}
		
		if(!Game.customBuildingsAll.levelTooltip) Game.customBuildingsAll.levelTooltip = [];
		GameLoader.customBuildingsAlllevelTooltip = function(obj, ret){
			for(var i in Game.customBuildingsAll.levelTooltip) ret = Game.customBuildingsAll.levelTooltip[i](obj, ret);
			return ret;
		}
		
		if(!Game.customBuildingsAll.refresh) Game.customBuildingsAll.refresh = [];
		GameLoader.customBuildingsAllrefresh = function(obj){
			for(var i in Game.customBuildingsAll.refresh) Game.customBuildingsAll.refresh[i](obj);
		}
		
		if(!Game.customBuildingsAll.rebuild) Game.customBuildingsAll.rebuild = [];
		GameLoader.customBuildingsAllrebuild = function(obj){
			for(var i in Game.customBuildingsAll.rebuild) Game.customBuildingsAll.rebuild[i](obj);
		}
		
		if(!Game.customBuildingsAll.mute) Game.customBuildingsAll.mute = [];
		GameLoader.customBuildingsAllmute = function(obj, val){
			for(var i in Game.customBuildingsAll.mute) Game.customBuildingsAll.mute[i](obj, val);
		}
		
		if(!Game.customBuildingsAll.draw) Game.customBuildingsAll.draw = [];
		GameLoader.customBuildingsAlldraw = function(obj){
			for(var i in Game.customBuildingsAll.draw) Game.customBuildingsAll.draw[i](obj);
		}
		
		if(!Game.customBuildingsAll.buyFunction) Game.customBuildingsAll.buyFunction = [];
		GameLoader.customBuildingsAllbuyFunction = function(obj){
			for(var i in Game.customBuildingsAll.buyFunction) Game.customBuildingsAll.buyFunction[i](obj);
		}
		
		if(!Game.customBuildingsAll.cpsMult) Game.customBuildingsAll.cpsMult = [];
		GameLoader.customBuildingsAllcpsMult = function(obj){
			var mult = 1;
			for(var i in Game.customBuildingsAll.cpsMult) mult *= Game.customBuildingsAll.cpsMult[i](obj);
			return mult;
		}
		
		
		if(!Game.customBuildings) Game.customBuildings = {};
		GameLoader.Backup.customBuildings = {};
		GameLoader.i = 0;
	}
	
	GameLoader.ReplaceBuildings = function(){
		var time = Date.now();
		
		for(var i = GameLoader.i; i < Game.ObjectsN; i++){
			GameLoader.ReplaceBuilding(Game.ObjectsById[i].name);
			if(Date.now() > time + 500 / Game.fps) break;
		}
		
		GameLoader.i = i + 1;
		if(GameLoader.i < Game.ObjectsN){
			// Didn't do all of them. Wait for priority and go again
			requestAnimationFrame(GameLoader.ReplaceBuildings);
		}else{
			// Continue on
			requestAnimationFrame(GameLoader.playlist[GameLoader.track++]);
		}
	}
	
	GameLoader.ReplaceBuildingsFinish = function(){
		
		// -----     Individual Buildings block     ----- //
		
		var obj = Game.Objects['Cursor'];
		// Cursor.cps
		// cpsAdd Functions should return a value to add per non cursor building (Return 0 to have no effect)
		if(!Game.customBuildings[obj.name].cpsAdd) Game.customBuildings[obj.name].cpsAdd = [];
		if(!Game.customBuildings[obj.name].cpsMult) Game.customBuildings[obj.name].cpsMult = [];
		GameLoader.ReplaceCodeIntoFunction("Game.Objects['Cursor'].cps", 'var mult=1;', `
			// Cursor.cps injection point 1
			for(var i in Game.customBuildings['` + obj.name + `'].cpsAdd) add += Game.customBuildings['` + obj.name + `'].cpsAdd[i](me);`, -1);
		
		
		obj = Game.Objects['Grandma'];
		// Grandma.art.pic
		// Functions should push an image name (sans the .png part) into list
		if(!Game.customGrandmaPicture) Game.customGrandmaPicture = [];
		GameLoader.ReplaceCodeIntoFunction("Game.Objects['Grandma'].art.pic", 'return', `
			// Grandma.art.pic injection point 0
			for(var j in Game.customGrandmaPicture) Game.customGrandmaPicture[j](i, list);`, -1);
		
		
		// Grandma.cps
		// cpsAdd Functions should return a value to add before multiplying (Return 0 to have no effect)
		if(!Game.customBuildings[obj.name].cpsAdd) Game.customBuildings[obj.name].cpsAdd = [];
		if(!Game.customBuildings[obj.name].cpsMult) Game.customBuildings[obj.name].cpsMult = [];
		GameLoader.ReplaceCodeIntoFunction("Game.Objects['Grandma'].cps", 'return', `
			// Grandma.cps injection point 1
			for(var i in Game.customBuildings['` + obj.name + `'].cpsAdd) add += Game.customBuildings['` + obj.name + `'].cpsAdd[i](me);`, -1);
		
	}
	
	GameLoader.ReplaceBuilding = function(key){
		// A lot of Copy/Paste happened, hence why I did so many functions.
		// Also, I may not have fully tested each one.
		var temp = '';
		var pos = 0;
		var proto;
		var escKey = key.replace(/'/g, "\\'");
		var obj = Game.Objects[key];
		
		if(!Game.customBuildings[key]) Game.customBuildings[key] = {};
		GameLoader.Backup.customBuildings[key] = {};
		
		// this.switchMinigame
		if(!Game.customBuildings[key].switchMinigame) Game.customBuildings[key].switchMinigame = [];
		Game.customBuildings[key].switchMinigame.push(GameLoader.customBuildingsAllswitchMinigame);
		GameLoader.SliceCodeIntoFunction("Game.Objects['" + escKey + "'].switchMinigame", -1, `
				// Game.Objects['` + escKey + `'].switchMinigame injection point 0
				for(var i in Game.customBuildings[this.name].switchMinigame) Game.customBuildings[this.name].switchMinigame[i](this, on);
			`);
		
		
		// this.getSellMultiplier
		// Return ret to have no effect
		if(!Game.customBuildings[key].getSellMultiplier) Game.customBuildings[key].getSellMultiplier = [];
		Game.customBuildings[key].getSellMultiplier.push(GameLoader.customBuildingsAllgetSellMultiplier);
		GameLoader.ReplaceCodeIntoFunction("Game.Objects['" + escKey + "'].getSellMultiplier", 'return', `
				// Game.Objects['` + escKey + `'].getSellMultiplier injection point 0
				for(var i in Game.customBuildings[this.name].getSellMultiplier) giveBack = Game.customBuildings[this.name].getSellMultiplier[i](this, giveBack);`, -1);
		
		
		// this.buy
		if(!Game.customBuildings[key].buy) Game.customBuildings[key].buy = [];
		Game.customBuildings[key].buy.push(GameLoader.customBuildingsAllbuy);
		GameLoader.SliceCodeIntoFunction("Game.Objects['" + escKey + "'].buy", -1, `
				// Game.Objects['` + escKey + `'].buy injection point 0
				for(var i in Game.customBuildings[this.name].buy) Game.customBuildings[this.name].buy[i](this, amount);
			`);
		
		
		// this.sell
		if(!Game.customBuildings[key].sell) Game.customBuildings[key].sell = [];
		Game.customBuildings[key].sell.push(GameLoader.customBuildingsAllsell);
		GameLoader.SliceCodeIntoFunction("Game.Objects['" + escKey + "'].sell", -1, `
				// Game.Objects['` + escKey + `'].sell injection point 0
				for(var i in Game.customBuildings[this.name].sell) Game.customBuildings[this.name].sell[i](this, amount, bypass);
			`);
		
		
		// this.sacrifice
		if(!Game.customBuildings[key].sacrifice) Game.customBuildings[key].sacrifice = [];
		Game.customBuildings[key].sacrifice.push(GameLoader.customBuildingsAllsacrifice);
		GameLoader.SliceCodeIntoFunction("Game.Objects['" + escKey + "'].sacrifice", -1, `
				// Game.Objects['` + escKey + `'].sacrifice injection point 0
				for(var i in Game.customBuildings[this.name].sacrifice) Game.customBuildings[this.name].sacrifice[i](this, amount);
			`);
		
		
		// this.buyFree
		if(!Game.customBuildings[key].buyFree) Game.customBuildings[key].buyFree = [];
		Game.customBuildings[key].buyFree.push(GameLoader.customBuildingsAllbuyFree);
		GameLoader.SliceCodeIntoFunction("Game.Objects['" + escKey + "'].buyFree", -1, `
				// Game.Objects['` + escKey + `'].buyFree injection point 0
				for(var i in Game.customBuildings[this.name].buyFree) Game.customBuildings[this.name].buyFree[i](this, amount);
			`, 'var price = Game.Objects["' + escKey + '"].basePrice');
		
		
		// this.getFree
		if(!Game.customBuildings[key].getFree) Game.customBuildings[key].getFree = [];
		Game.customBuildings[key].getFree.push(GameLoader.customBuildingsAllgetFree);
		GameLoader.SliceCodeIntoFunction("Game.Objects['" + escKey + "'].getFree", -1, `
				// Game.Objects['` + escKey + `'].getFree injection point 0
				for(var i in Game.customBuildings[this.name].getFree) Game.customBuildings[this.name].getFree[i](this, amount);
			`);
		
		
		// this.getFreeRanks
		if(!Game.customBuildings[key].getFreeRanks) Game.customBuildings[key].getFreeRanks = [];
		Game.customBuildings[key].getFreeRanks.push(GameLoader.customBuildingsAllgetFreeRanks);
		GameLoader.SliceCodeIntoFunction("Game.Objects['" + escKey + "'].getFreeRanks", -1, `
				// Game.Objects['` + escKey + `'].getFreeRanks injection point 0
				for(var i in Game.customBuildings[this.name].getFreeRanks) Game.customBuildings[this.name].getFreeRanks[i](this, amount);
			`);
		
		
		// this.tooltip
		// Return ret to have no effect
		if(!Game.customBuildings[key].tooltip) Game.customBuildings[key].tooltip = [];
		Game.customBuildings[key].tooltip.push(GameLoader.customBuildingsAlltooltip);
		GameLoader.ReplaceCodeIntoFunction("Game.Objects['" + escKey + "'].tooltip", 'return', 'var ret =', 0);
		GameLoader.SliceCodeIntoFunction("Game.Objects['" + escKey + "'].tooltip", -1, `
				// Game.Objects['` + escKey + `'].tooltip injection point 0
				for(var i in Game.customBuildings[this.name].tooltip) ret = Game.customBuildings[this.name].tooltip[i](this, ret);
				return ret;
			`);
		
		
		// this.levelTooltip
		// Return ret to have no effect
		if(!Game.customBuildings[key].levelTooltip) Game.customBuildings[key].levelTooltip = [];
		Game.customBuildings[key].levelTooltip.push(GameLoader.customBuildingsAlllevelTooltip);
		GameLoader.ReplaceCodeIntoFunction("Game.Objects['" + escKey + "'].levelTooltip", 'return', 'var ret =', 0);
		GameLoader.SliceCodeIntoFunction("Game.Objects['" + escKey + "'].levelTooltip", -1, `
				// Game.Objects['` + escKey + `'].levelTooltip injection point 0
				for(var i in Game.customBuildings[this.name].levelTooltip) ret = Game.customBuildings[this.name].levelTooltip[i](this, ret);
				return ret;
			`);
		
		
		// this.levelUp
		// Haha no. This is like four functions that return each other
		// I'm not dealing with it unless I have to.
		
		
		// this.refresh
		if(!Game.customBuildings[key].refresh) Game.customBuildings[key].refresh = [];
		Game.customBuildings[key].refresh.push(GameLoader.customBuildingsAllrefresh);
		GameLoader.SliceCodeIntoFunction("Game.Objects['" + escKey + "'].refresh", -1, `
				// Game.Objects['` + escKey + `'].refresh injection point 0
				for(var i in Game.customBuildings[this.name].refresh) Game.customBuildings[this.name].refresh[i](this);
			`);
		
		
		// this.rebuild
		if(!Game.customBuildings[key].rebuild) Game.customBuildings[key].rebuild = [];
		Game.customBuildings[key].rebuild.push(GameLoader.customBuildingsAllrebuild);
		GameLoader.SliceCodeIntoFunction("Game.Objects['" + escKey + "'].rebuild", -1, `
				// Game.Objects['` + escKey + `'].rebuild injection point 0
				for(var i in Game.customBuildings[this.name].rebuild) Game.customBuildings[this.name].rebuild[i](this);
			`);
		
		
		// this.mute
		if(!Game.customBuildings[key].mute) Game.customBuildings[key].mute = [];
		Game.customBuildings[key].mute.push(GameLoader.customBuildingsAllmute);
		GameLoader.SliceCodeIntoFunction("Game.Objects['" + escKey + "'].mute", -1, `
				// Game.Objects['` + escKey + `'].mute injection point 0
				for(var i in Game.customBuildings[this.name].mute) Game.customBuildings[this.name].mute[i](this, val);
			`);
		
		
		// this.draw
		if(!Game.customBuildings[key].draw) Game.customBuildings[key].draw = [];
		Game.customBuildings[key].draw.push(GameLoader.customBuildingsAlldraw);
		if(key == 'Cursor'){ // Because cursors are special
			Game.Objects[key].draw = function(){
				// Game.Objects['Cursor'].draw injection point 0
				for(var i in Game.customBuildings[this.name].draw) Game.customBuildings[this.name].draw[i](this);
			}
		}
		else{
			GameLoader.SliceCodeIntoFunction("Game.Objects['" + escKey + "'].draw", -1, `
				// Game.Objects['` + escKey + `'].draw injection point 0
				for(var i in Game.customBuildings[this.name].draw) Game.customBuildings[this.name].draw[i](this);
			`);
		}
		
		
		
		// this.buyFunction
		if(!Game.customBuildings[key].buyFunction) Game.customBuildings[key].buyFunction = [];
		Game.customBuildings[key].buyFunction.push(GameLoader.customBuildingsAllbuyFunction);
		GameLoader.SliceCodeIntoFunction("Game.Objects['" + escKey + "'].buyFunction", -1, `
				// Game.Objects['` + escKey + `'].buyFunction injection point 0
				for(var i in Game.customBuildings[this.name].buyFunction) Game.customBuildings[this.name].buyFunction[i](this);
			`);
		
		
		// this.cps
		// cpsMult Functions should return a value to multiply the price by (Return 1 to have no effect)
		if(!Game.customBuildings[obj.name].cpsMult) Game.customBuildings[obj.name].cpsMult = [];
		Game.customBuildings[key].cpsMult.push(GameLoader.customBuildingsAllcpsMult);
		GameLoader.ReplaceCodeIntoFunction("Game.Objects['" + escKey + "'].cps", 'return', `
				// Game.Objects['` + escKey + `'].cps injection point 0
				for(var i in Game.customBuildings[this.name].cpsMult) mult *= Game.customBuildings[this.name].cpsMult[i](me);
		`, -1);
		
		
		for(var i in GameLoader.customReplaceBuilding) GameLoader.customReplaceBuilding[i](key, obj);
	}
	
	if(!GameLoader.customReplaceUpgrade) GameLoader.customReplaceUpgrade = [];
	GameLoader.ReplaceUpgradesStart = function(){
		if(!Game.customUpgradesAll) Game.customUpgradesAll = {};
		
		if(!Game.customUpgradesAll.getPrice) Game.customUpgradesAll.getPrice = [];
		GameLoader.customUpgradesAllgetPrice = function(me){
			var ret = 1
			for(var i in Game.customUpgradesAll.getPrice) ret *= Game.customUpgradesAll.getPrice[i](me);
			return ret;
		}
		
		if(!Game.customUpgradesAll.click) Game.customUpgradesAll.click = [];
		GameLoader.customUpgradesAllclick = function(me, e){
			for(var i in Game.customUpgradesAll.click) Game.customUpgradesAll.click[i](me, e);
		}
		
		if(!Game.customUpgradesAll.buy) Game.customUpgradesAll.buy = [];
		GameLoader.customUpgradesAllbuy = function(me, bypass, success){
			for(var i in Game.customUpgradesAll.buy) Game.customUpgradesAll.buy[i](me, bypass, success);
		}
		
		if(!Game.customUpgradesAll.earn) Game.customUpgradesAll.earn = [];
		GameLoader.customUpgradesAllearn = function(me){
			for(var i in Game.customUpgradesAll.earn) Game.customUpgradesAll.earn[i](me);
		}
		
		if(!Game.customUpgradesAll.unearn) Game.customUpgradesAll.unearn = [];
		GameLoader.customUpgradesAllunearn = function(me){
			for(var i in Game.customUpgradesAll.unearn) Game.customUpgradesAll.unearn[i](me);
		}
		
		if(!Game.customUpgradesAll.unlock) Game.customUpgradesAll.unlock = [];
		GameLoader.customUpgradesAllunlock = function(me){
			for(var i in Game.customUpgradesAll.unlock) Game.customUpgradesAll.unlock[i](me);
		}
		
		if(!Game.customUpgradesAll.lose) Game.customUpgradesAll.lose = [];
		GameLoader.customUpgradesAlllose = function(me){
			for(var i in Game.customUpgradesAll.lose) Game.customUpgradesAll.lose[i](me);
		}
		
		if(!Game.customUpgradesAll.toggle) Game.customUpgradesAll.toggle = [];
		GameLoader.customUpgradesAlltoggle = function(me){
			for(var i in Game.customUpgradesAll.toggle) Game.customUpgradesAll.toggle[i](me);
		}
		
		if(!Game.customUpgradesAll.buyFunction) Game.customUpgradesAll.buyFunction = [];
		GameLoader.customUpgradesAllbuyFunction = function(me){
			for(var i in Game.customUpgradesAll.buyFunction) Game.customUpgradesAll.buyFunction[i](me);
		}
		
		if(!Game.customUpgradesAll.descFunc) Game.customUpgradesAll.descFunc = [];
		GameLoader.customUpgradesAlldescFunc = function(me, desc){
			for(var i in Game.customUpgradesAll.descFunc) desc = Game.customUpgradesAll.descFunc[i](me, desc);
			return desc;
		}
		
		
		if(!Game.customUpgrades) Game.customUpgrades = {};
		GameLoader.Backup.customUpgrades = {};
		GameLoader.i = 0;
	}
	
	GameLoader.ReplaceUpgrades = function(){
		var time = Date.now();
		
		for(var i = GameLoader.i; i < Game.UpgradesN; i++){
			GameLoader.ReplaceUpgrade(Game.UpgradesById[i].name);
			if(Date.now() > time + 500 / Game.fps) break;
		}
		
		GameLoader.i = i + 1;
		if(GameLoader.i < Game.UpgradesN){
			// Didn't do all of them. Wait for priority and go again
			requestAnimationFrame(GameLoader.ReplaceUpgrades);
		}else{
			// Continue on
			requestAnimationFrame(GameLoader.playlist[GameLoader.track++]);
		}
	}
	
	GameLoader.ReplaceUpgradesFinish = function(){
		// this.getPrice
		// Functions should return a value to multiply the price by (Return 1 to have no effect)
		GameLoader.ReplaceCodeIntoFunction("Game.Upgrade.prototype.getPrice", 'return Math', `
			// Game.Upgrade.prototype.getPrice injection point 0
			if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].getPrice) price *= Game.customUpgrades[this.name].getPrice[i](this);`, -1);
		
		// this.click
		GameLoader.SliceCodeIntoFunction("Game.Upgrade.prototype.click", -1, `
				// Game.Upgrade.prototype.click injection point 0
				if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].click) Game.customUpgrades[this.name].click[i](this, e);
			`);
		
		// this.buy
		GameLoader.ReplaceCodeIntoFunction("Game.Upgrade.prototype.buy", 'return success', `
			// Game.Upgrade.prototype.buy injection point 0
			if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].buy) Game.customUpgrades[this.name].buy[i](this, bypass, success);`, -1);
		
		// this.earn
		GameLoader.SliceCodeIntoFunction("Game.Upgrade.prototype.earn", -1, `
				// Game.Upgrade.prototype.earn injection point 0
				if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].earn) Game.customUpgrades[this.name].earn[i](this);
			`);
		
		// this.unearn
		GameLoader.SliceCodeIntoFunction("Game.Upgrade.prototype.unearn", -1, `
				// Game.Upgrade.prototype.unearn injection point 0
				if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].unearn) Game.customUpgrades[this.name].unearn[i](this);
			`);
		
		// this.unlock
		GameLoader.SliceCodeIntoFunction("Game.Upgrade.prototype.unlock", -1, `
				// Game.Upgrade.prototype.unlock injection point 0
				if(Game.customUpgrades[this.name]) if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].unlock) Game.customUpgrades[this.name].unlock[i](this);
			`);
		
		// this.lose
		GameLoader.SliceCodeIntoFunction("Game.Upgrade.prototype.lose", -1, `
				// Game.Upgrade.prototype.lose injection point 0
				if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].lose) Game.customUpgrades[this.name].lose[i](this);
			`);
		
		// this.toggle
		GameLoader.SliceCodeIntoFunction("Game.Upgrade.prototype.toggle", -1, `
				// Game.Upgrade.prototype.toggle injection point 0
				if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].toggle) Game.customUpgrades[this.name].toggle[i](this);
			`);
		
		// this.isVaulted
		GameLoader.SpliceCodeIntoFunction("Game.Upgrade.prototype.isVaulted", 2, `
				// Game.Upgrade.prototype.isVaulted injection point 0
				if (GameLoader.config.vault.indexOf(this.name)!=-1) return true;
			`);
		
		// this.vault
		GameLoader.ReplaceCodeIntoFunction("Game.Upgrade.prototype.vault", 'Game.vault', `
				if(this.GameLoader) GameLoader.config.vault.push(this.name);
                else `, -1);
		
		// this.unvault
		GameLoader.ReplaceCodeIntoFunction("Game.Upgrade.prototype.unvault", 'Game.vault', `
				if(this.GameLoader) GameLoader.config.vault.splice(GameLoader.config.vault.indexOf(this.name),1);
                else `, -1);
		
		
		// Golden cookie sound selector custom options
		GameLoader.ReplaceCodeIntoFunction("Game.Upgrades['Golden cookie sound selector'].olddescFunc", "this.choicesFunction()[Game.chimeType]", "GameLoader.GetSelectedShimmerSound()", 0);
		//GameLoader.ReplaceCodeIntoFunction("Game.Upgrades['Golden cookie sound selector'].olddescFunc", "'+icon[2]+'", "'+choice.icon[2]+'", 0);
		
		// Game.Upgrades['Golden cookie sound selector'].choicesFunction
		if(!Game.customUpgrades['Golden cookie sound selector'].choicesFunction) Game.customUpgrades['Golden cookie sound selector'].choicesFunction = [];
		GameLoader.ReplaceCodeIntoFunction("Game.Upgrades['Golden cookie sound selector'].choicesFunction", "return choices;",
			`// Game.customUpgrades['Golden cookie sound selector'].choicesFunction injection point 0
			for(var i in Game.customUpgrades['Golden cookie sound selector'].choicesFunction) Game.customUpgrades['Golden cookie sound selector'].choicesFunction[i](choices);
			GameLoader.OverrideShimmerSoundSelector(choices);`, -1);
		
		/*Game.customUpgrades['Golden cookie sound selector'].choicesFunction.push(function(choices){
			choices[1].default = 'snd/chime.mp3';
			choices[1].shimmerTypes = {golden:'snd/chime.mp3', reindeer:'snd/jingle.mp3'};
		});*/
		
		GameLoader.ReplaceCodeIntoFunction("Game.Upgrades['Golden cookie sound selector'].choicesPick", "Game.chimeType=id;",
			'GameLoader.SetSelectedShimmerSound(id);', 0);
		
		
		// Milk selector custom options
		GameLoader.ReplaceCodeIntoFunction("Game.Upgrades['Milk selector'].olddescFunc", "this.choicesFunction()[Game.milkType]", "GameLoader.GetSelectedMilk()", 0);
		
		// Game.Upgrades['Milk selector'].choicesFunction
		if(!Game.customUpgrades['Milk selector'].choicesFunction) Game.customUpgrades['Milk selector'].choicesFunction = [];
		GameLoader.ReplaceCodeIntoFunction("Game.Upgrades['Milk selector'].choicesFunction", "return choices;",
			`// Game.customUpgrades['Milk selector'].choicesFunction injection point 0
			for(var i in Game.customUpgrades['Milk selector'].choicesFunction) Game.customUpgrades['Milk selector'].choicesFunction[i](choices);
			GameLoader.OverrideMilkSelector(choices);`, -1);
		
		Game.customUpgrades['Milk selector'].choicesFunction.push(function(choices){
			if(!GameLoader.Steam) for(var i in choices) choices[i].milk = Game.AllMilks[i];
			choices[0].milk = Game.Milk;
		});
		
		GameLoader.ReplaceCodeIntoFunction("Game.Upgrades['Milk selector'].choicesPick", "Game.milkType=id;",
			'GameLoader.SetSelectedMilk(id);', 0);
		
		
		// Background selector custom options
		GameLoader.ReplaceCodeIntoFunction("Game.Upgrades['Background selector'].olddescFunc", "this.choicesFunction()[Game.bgType]", "GameLoader.GetSelectedBackground()", 0);
		
		// Game.Upgrades['Background selector'].choicesFunction
		if(!Game.customUpgrades['Background selector'].choicesFunction) Game.customUpgrades['Background selector'].choicesFunction = [];
		GameLoader.ReplaceCodeIntoFunction("Game.Upgrades['Background selector'].choicesFunction", "return choices;",
			`// Game.customUpgrades['Background selector'].choicesFunction injection point 0
			for(var i in Game.customUpgrades['Background selector'].choicesFunction) Game.customUpgrades['Background selector'].choicesFunction[i](choices);
			GameLoader.OverrideBackgroundSelector(choices);`, -1);
		
		GameLoader.ReplaceCodeIntoFunction("Game.Upgrades['Background selector'].choicesPick", "Game.bgType=id;",
			'GameLoader.SetSelectedBackground(id);', 0);
		
		
		// Game.Upgrades['Jukebox'].choicesFunction
		// Return str to have no effect
		if(!Game.customUpgrades['Jukebox'].choicesFunction) Game.customUpgrades['Jukebox'].choicesFunction = [];
		GameLoader.ReplaceCodeIntoFunction("Game.Upgrades['Jukebox'].choicesFunction", "return",
			`// Game.customUpgrades['Jukebox'].choicesFunction injection point 0
			for(var i in Game.customUpgrades['Jukebox'].choicesFunction) str = Game.customUpgrades['Jukebox'].choicesFunction[i](str);`, -1);
		
		
		// Permanent upgrades are tricky
		var slots=['Permanent upgrade slot I','Permanent upgrade slot II','Permanent upgrade slot III','Permanent upgrade slot IV','Permanent upgrade slot V'];
		for (var i=0;i<slots.length;i++)
		{
			GameLoader.SpliceCodeIntoFunction("Game.Upgrades['" + slots[i] + "'].olddescFunc", 1,
				`// ` + slots[i] + ` olddescFunc injection point 0
				var id = Game.permanentUpgrades[` + i + `];
				for(var i in Game.customPermanentUpgradeId) id = Game.customPermanentUpgradeId[i](` + i + `, id);`,
				'Game.Upgrades["' + slots[i] + '"].olddescFunc=' + Game.Upgrades[slots[i]].olddescFunc.toString().replaceAll('Game.permanentUpgrades[i]','id'));
		}
	}
	
	GameLoader.ReplaceUpgrade = function(key){
		var temp = '';
		var pos = 0;
		var proto;
		var escKey = key.replace(/'/g, "\\'");
		var upgrade = Game.Upgrades[key];
		
		if(!Game.customUpgrades[key]) Game.customUpgrades[key] = {};
		GameLoader.Backup.customUpgrades[key] = {};
		
		
		// this.getPrice
		// Functions should return a value to multiply the price by (Return 1 to have no effect)
		if(!Game.customUpgrades[key].getPrice) Game.customUpgrades[key].getPrice = [];
		Game.customUpgrades[key].getPrice.push(GameLoader.customUpgradesAllgetPrice);
		
		
		// this.click
		if(!Game.customUpgrades[key].click) Game.customUpgrades[key].click = [];
		Game.customUpgrades[key].click.push(GameLoader.customUpgradesAllclick);
		
		
		// this.buy
		if(!Game.customUpgrades[key].buy) Game.customUpgrades[key].buy = [];
		Game.customUpgrades[key].buy.push(GameLoader.customUpgradesAllbuy);
		
		
		// this.earn
		if(!Game.customUpgrades[key].earn) Game.customUpgrades[key].earn = [];
		Game.customUpgrades[key].earn.push(GameLoader.customUpgradesAllearn);
		
		
		// this.unearn
		if(!Game.customUpgrades[key].unearn) Game.customUpgrades[key].unearn = [];
		Game.customUpgrades[key].unearn.push(GameLoader.customUpgradesAllunearn);
		
		
		// this.unlock
		if(!Game.customUpgrades[key].unlock) Game.customUpgrades[key].unlock = [];
		Game.customUpgrades[key].unlock.push(GameLoader.customUpgradesAllunlock);
		
		
		// this.lose
		if(!Game.customUpgrades[key].lose) Game.customUpgrades[key].lose = [];
		Game.customUpgrades[key].lose.push(GameLoader.customUpgradesAlllose);
		
		
		// this.toggle
		if(!Game.customUpgrades[key].toggle) Game.customUpgrades[key].toggle = [];
		Game.customUpgrades[key].toggle.push(GameLoader.customUpgradesAlltoggle);
		
		
		// this.buyFunction
		if(!Game.customUpgrades[key].buyFunction) Game.customUpgrades[key].buyFunction = [];
		Game.customUpgrades[key].buyFunction.push(GameLoader.customUpgradesAllbuyFunction);
		if(upgrade.buyFunction){
			//upgrade.oldbuyFunction = upgrade.buyFunction;
			GameLoader.SliceCodeIntoFunction("Game.Upgrades['" + escKey + "'].buyFunction", -1, `
				// Game.Upgrades['` + escKey + `'].buyFunction injection point 0
				if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].buyFunction) Game.customUpgrades[this.name].buyFunction[i](this);
			`);
			
			/* This broke Frozen Cookies
			upgrade.buyFunction = function(){
				upgrade.oldbuyFunction();
				// Game.Upgrades[this.name].buyFunction injection point 0
				if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].buyFunction) Game.customUpgrades[this.name].buyFunction[i](this);
			}*/
		}else{
			upgrade.buyFunction = function(){
				// Game.Upgrades[this.name].buyFunction injection point 0
				if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].buyFunction) Game.customUpgrades[this.name].buyFunction[i](this);
			}
			GameLoader.functionsAltered++;
		}
		
		
		// this.descFunc
		// Far too disparate for my desired consistency
		if(!Game.customUpgrades[key].descFunc) Game.customUpgrades[key].descFunc = [];
		Game.customUpgrades[key].descFunc.push(GameLoader.customUpgradesAlldescFunc);
		if(upgrade.descFunc){
			//eval('upgrade.olddescFunc = ' + upgrade.descFunc.toString());
			upgrade.olddescFunc = upgrade.descFunc;
			upgrade.descFunc = function(){
				var desc = this.olddescFunc();
				if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].descFunc) desc = Game.customUpgrades[this.name].descFunc[i](this, desc);
				return desc;
			}
		}else{
			upgrade.descFunc = function(){
				var desc = this.ddesc ? this.ddesc : this.desc;
				// Game.Upgrades['` + escKey + `'].descFunc injection point 0
				if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].descFunc) desc = Game.customUpgrades[this.name].descFunc[i](this, desc);
				return desc;
			}
		}
		
		for(var i in GameLoader.customReplaceUpgrade) GameLoader.customReplaceUpgrade[i](key, upgrade);
	}
	
	if(!GameLoader.customReplaceAchievement) GameLoader.customReplaceAchievement = [];
	GameLoader.ReplaceAchievementsStart = function(){
		if(!Game.customAchievementsAll) Game.customAchievementsAll = {};
		
		if(!Game.customAchievementsAll.click) Game.customAchievementsAll.click = [];
		GameLoader.customAchievementsAllclick = function(me){
			for(var i in Game.customAchievementsAll.click) Game.customAchievementsAll.click[i](me);
		}
		
		if(!Game.customAchievements) Game.customAchievements = {};
		GameLoader.Backup.customAchievements = {};
		GameLoader.i = 0;
	}
	
	GameLoader.ReplaceAchievements = function(){
		var time = Date.now();
		
		for(var i = GameLoader.i; i < Game.AchievementsN; i++){
			GameLoader.ReplaceAchievement(Game.AchievementsById[i].name);
			if(Date.now() > time + 500 / Game.fps) break;
		}
		
		GameLoader.i = i + 1;
		if(GameLoader.i < Game.AchievementsN){
			// Didn't do all of them. Wait for priority and go again
			requestAnimationFrame(GameLoader.ReplaceAchievements);
		}else{
			// Continue on
			requestAnimationFrame(GameLoader.playlist[GameLoader.track++]);
		}
	}
	
	GameLoader.ReplaceAchievement = function(key){
		var escKey = key.replace(/'/g, "\\'");
		var achievement = Game.Achievements[key];
		
		if(!Game.customAchievements[key]) Game.customAchievements[key] = {};
		GameLoader.Backup.customAchievements[key] = {};
		
		
		// this.click
		if(!Game.customAchievements[key].click) Game.customAchievements[key].click = [];
		Game.customAchievements[key].click.push(GameLoader.customAchievementsAllclick);
		GameLoader.SliceCodeIntoFunction("Game.Achievements['" + escKey + "'].click", -1, `
				// Game.Achievements['` + escKey + `'].click injection point 0
				if(Game.customAchievements[this.name]) for(var i in Game.customAchievements[this.name].click) Game.customAchievements[this.name].click[i](this);
			`);
		
		
		for(var i in GameLoader.customReplaceAchievement) GameLoader.customReplaceAchievement[i](key, achievement);
	}
	
	GameLoader.AddGameLoaderStyles = function(){
		GameLoader.AddStyles(`input.checkbox {
		  margin: 4px;
		  border: 3px solid transparent;
		  border-image: url(img/frameBorder.png) 3 round;
		  border-radius: 2px;
		  box-shadow: 0px 0px 1px 2px rgba(0,0,0,0.5), 0px 2px 4px rgba(0,0,0,0.25), 0px 0px 6px 1px rgba(0,0,0,0.5) inset;
		  transition: opacity 0.1s ease-out;
		  vertical-align: middle;
		  min-width: 2rem;
		  min-height: 2rem;
		  text-align: center;

		  background: #000 url(img/darkNoise.jpg);
		  background-image: url(img/shadedBordersSoft.png),url(img/darkNoise.jpg);
		  background-size: 100% 100%,auto;
		  background-color: #000;

		  text-shadow: 0px 1px 1px #000;
		  color: #ccc;
		  line-height: 100%;

		  display: inline-block;
		  font-size: 12px;
		  text-decoration: none;
		  -webkit-appearance: none;

		  position: relative;
		}

		input.checkbox:checked:after {
		  content: '\\01F36A';
		  font-size: 1.25rem;
		  margin: auto;
		  position: absolute;
		  top: 50%;
		  left: 50%;
		  transform: translate(-50%,-50%);
		  text-align: center;
		}`);
	}
	
	
	/*=====================================================================================
	Menu functions
	=======================================================================================*/
	GameLoader.AppendOptionsMenu = function(inp, style = 1){
		// Accepts inputs of either string or div
		// Choose div class based on given style. A style of 0 will have no class.
		var divClass;
		switch (style) {
			case 1:
				divClass = "block";
				break;
			case 2:
				divClass = "framed";
				break;
		}

		var template = document.createElement('template');
		template.innerHTML = '<div ' + (divClass ? `class="${ divClass }" ` : '') + 'style="padding:0px;margin:8px 4px;"><div class="subsection" style="padding:0px;"></div></div>';
		var div = template.content;
		var div2 = div.children[0].children[0];
		
		if(typeof inp == 'string'){
			div2.innerHTML = inp;
		}
		else{
			div2.appendChild(inp);
		}
		
		var menu = l('menu');
		if(menu){
			var padding = menu.childNodes;
			padding = padding[padding.length - 1];
			if(padding){
				menu.insertBefore(div, padding);
			} else {
				menu.appendChild(div);
			}
		}
	}
	
	GameLoader.AppendCollapsibleOptionsMenu = function(title, body){
		// Title must be a string. Body may be either string or div
		var titleDiv = document.createElement('div');
		titleDiv.className = 'title';
		titleDiv.textContent = title + ' ';
		
		if(GameLoader.collapseMenu[title] === undefined) GameLoader.collapseMenu[title] = 0;
		
		// Stolen wholesale from Cookie Monster
		var span = document.createElement('span');
		span.style.cursor = 'pointer';
		span.style.display = 'inline-block';
		span.style.height = '14px';
		span.style.width = '14px';
		span.style.borderRadius = '7px';
		span.style.textAlign = 'center';
		span.style.backgroundColor = '#C0C0C0';
		span.style.color = 'black';
		span.style.fontSize = '13px';
		span.style.verticalAlign = 'middle';
		span.textContent = (GameLoader.collapseMenu[title] ? '+' : '-');
		span.addEventListener("click", function(){
			GameLoader.ToggleCollabsibleMenu(title);
			Game.UpdateMenu();
		}) ;
		titleDiv.appendChild(span);
		
		var bodyDiv;
		if(typeof body == 'string'){
			bodyDiv = document.createElement('div');
			bodyDiv.innerHTML = body;
		}
		else{
			bodyDiv = body;
		}
		
		var div = document.createElement('div');
		div.appendChild(titleDiv);
		if(!GameLoader.collapseMenu[title]) div.appendChild(bodyDiv);
		
		GameLoader.AppendOptionsMenu(div);
	}
	
	GameLoader.ToggleCollabsibleMenu = function(title) {
		if(GameLoader.collapseMenu[title] == 0){
			GameLoader.collapseMenu[title]++;
		}
		else{
			GameLoader.collapseMenu[title]--;
		}
	}
	
	GameLoader.AppendStatsGeneral = function(inp){
		// Accepts inputs of either string or div
		var div;
		if(typeof inp == 'string'){
			div = document.createElement('div');
			div.innerHTML = inp;
		}
		else{
			div = inp;
		}
		
		var general = l('statsGeneral');
		if(general) general.appendChild(div);
	}
	
	GameLoader.AppendStatsSpecial = function(inp){
		// Accepts inputs of either string or div
		var div;
		if(typeof inp == 'string'){
			div = document.createElement('div');
			div.innerHTML = inp;
		}
		else{
			div = inp;
		}
		
		var special = l('statsSpecial');
		if(!special){
			subsections = l('menu').getElementsByClassName('subsection');
			
			special = document.createElement('div');
			special.className = 'subsection';
			special.innerHTML = '<div class="title">' + loc('Special') + '</div>';
			l('menu').insertBefore(special, subsections[1]);
		}
		
		if(special) special.appendChild(div);
	}
	
	GameLoader.AppendStatsVersionNumber = function(modName, versionString){
		var general = l('statsGeneral');
		var str = '<b>' + modName + ':</b> ' + versionString;
		var div = document.createElement('div');
		div.className = 'listing';
		div.innerHTML = str;
		
		if(general) general.parentNode.appendChild(div);
	}
	
	GameLoader.GetMenuString = function(){
		var str = '<div class="listing">' +
			GameLoader.MenuHelper.ActionButton("GameLoader.ExportSave();", 'Export custom save') +
			GameLoader.MenuHelper.ActionButton("GameLoader.ImportSave();", 'Import custom save') +
			'<label>Back up data added by mods and managed by GameLoader</label></div>';
		
		str += '<div class="listing">' + GameLoader.MenuHelper.CheckBox(GameLoader.config, 'showVersionNo', 'showVersionNoButton', 'Version Number ON', 'Version Number OFF', 'GameLoader.togglePref') + '<label>Show the version number of GameLoader in the bottom left of the screen.</label></div>';
		
		return str;
	}
	
	GameLoader.PrependCollapsibleInfoMenu = function(title, body){
		// Title must be a string. Body may be either string or div
		var titleDiv = document.createElement('div');
		titleDiv.className = 'title';
		titleDiv.textContent = title + ' ';
		
		if(GameLoader.collapseMenu[title + 'info'] === undefined) GameLoader.collapseMenu[title + 'info'] = 0;
		
		// Stolen wholesale from Cookie Monster
		var span = document.createElement('span');
		span.style.cursor = 'pointer';
		span.style.display = 'inline-block';
		span.style.height = '14px';
		span.style.width = '14px';
		span.style.borderRadius = '7px';
		span.style.textAlign = 'center';
		span.style.backgroundColor = '#C0C0C0';
		span.style.color = 'black';
		span.style.fontSize = '13px';
		span.style.verticalAlign = 'middle';
		span.textContent = (GameLoader.collapseMenu[title + 'info'] ? '+' : '-');
		span.onclick = function(){GameLoader.ToggleCollabsibleMenu(title + 'info'); Game.UpdateMenu();};
		titleDiv.appendChild(span);
		
		var bodyDiv;
		if(typeof body == 'string'){
			bodyDiv = document.createElement('div');
			bodyDiv.innerHTML = body;
		}
		else{
			bodyDiv = body;
		}
		
		var div = document.createElement('div');
		div.appendChild(titleDiv);
		div.classList.add('subsection');
		if(!GameLoader.collapseMenu[title + 'info']) div.appendChild(bodyDiv);
		
		
		var menu = l('menu');
		if(menu){
			var about = menu.getElementsByClassName('subsection')[0];
			if(about){
				about.parentNode.insertBefore(div, about);
			}
		}
	}
	
	GameLoader.MenuHelper = {
		
		ActionButton: (action, text) =>
			'<a class="smallFancyButton option"' +
			`${ Game.clickStr }="${ action } PlaySound('snd/tick.mp3');">${ text }</a>`,
		
		Header: (text, id) =>
			'<div class="listing optionHeader" ' + (id ? `id="${ id }" ` : '') + `style="padding: 5px 16px; opacity: 0.7; font-size: 17px; font-family: Kavoon, Georgia, serif;">${ text }</div>`,

		InputBox: (id, width, value, onChange) =>
			`<input type="text" id="${ id }" class="option" style="width:${ width }px;" value="${ value }" onChange="${ onChange }">`,
		
		PasswordBox: (id, width, value, onChange) =>
			`<input type="password" id="${ id }" class="option" style="width:${ width }px;" value="${ value }" onChange="${ onChange }">`,
		
		SearchBox: (id, width, value, onChange, placeholder = 'Search') =>
			`<input type="search" id="${ id }" class="option" style="width:${ width }px;" value="${ value }" onChange="${ onChange }" placeholder="${ placeholder }">`,
		
		TinyIcon: (icon) =>
			'<div class="icon" style="vertical-align:middle;display:inline-block;margin:-16px;transform:scale(0.5);' +
			(icon[2] ? `background-image:url(${ icon[2] });` : '') +
			`background-position:${ -icon[0] * 48 }px ${ -icon[1] * 48 }px;"></div>`,
		
		Slider: (slider, leftText, rightText, startValueFunction, callback = '', min = 0, max = 100, step = 1) => {
			var value = startValueFunction();
			rightText = rightText.replace('[$]', value);
			return `<div class="sliderBox"><div style="float:left;" class="smallFancyButton">${ leftText }</div>` +
				`<div style="float:right;" class="smallFancyButton" id="${ slider }RightText">${ rightText }</div>` +
				`<input type="range" id="${ slider }" class="slider" style="clear:both;" min="${ min }" max="${ max }" step="${ step }"` +
				` value="${ value }" onchange="${ callback }" oninput="${ callback }" onmouseup="PlaySound('snd/tick.mp3');"></div>`
		},

		ToggleButton: (config, prefName, button, on, off, callback, invert) => {
			var invert = invert ? 1 : 0;
			if(!callback) callback = '';
			else callback += `('${ prefName }', '${ button }', '${ on.replace("'","\\'") }', '${ off.replace("'","\\'") }', '${ invert }');`;
			callback += "PlaySound('snd/tick.mp3');";
			var className = `smallFancyButton prefButton option${ (config[prefName]^invert) ? '' : ' off' }`;
			return `<a id="${ button }" class="${ className }" ${ Game.clickStr }="${ callback }">${ config[prefName] ? on : off }</a>`;
		},
		
		CheckBox: (config, prefName, button, on, off, callback, invert) => {
			var invert = invert ? 1 : 0;
			if(!callback) callback = '';
			else callback += `('${ prefName }', '${ button }', '${ on.replace("'","\\'") }', '${ off.replace("'","\\'") }', '${ invert }');`;
			callback += "PlaySound('snd/tick.mp3');";
			var checked = config[prefName] ? ' checked="checked"' : '';
			var className = `checkbox checkbox${ (config[prefName]^invert) ? 'on' : ' off' }`;
			return `<input type="checkbox" id="${ button }" class="${ className }" ${ checked } ${ Game.clickStr }="${ callback }">` +
				`<label id="${ button }_label" for="${ button }">${ config[prefName] ? on : off }</label>`;
		}
		
	}
	
	GameLoader.togglePref = function(prefName, button, on, off, invert){
		if (GameLoader.config[prefName]){
			l(button).removeAttribute('checked');
			l(button + '_label').innerHTML = off;
			GameLoader.config[prefName] = 0;
		}else{
			l(button).setAttribute('checked','checked')
			l(button + '_label').innerHTML = on;
			GameLoader.config[prefName] = 1;
		}
		GameLoader.applyPref(prefName);
	}
	
	
	/*=====================================================================================
	Minigames
	=======================================================================================*/
	GameLoader.MinigameReplacer = function(func, objKey){
		if(!Game.customMinigameOnLoad) Game.customMinigameOnLoad = {};
		if(!Game.customMinigameOnLoad[objKey]) Game.customMinigameOnLoad[objKey] = [];
		
		var me = Game.Objects[objKey];
		if(me.minigameLoaded) func(me, 'minigameScript-' + me.id);
		Game.customMinigameOnLoad[objKey].push(func);
	}
	
	GameLoader.ReplaceGrimoire = function(){
		GameLoader.functionsTotal += 11;
		var objKey = "Wizard tower";
		var M = Game.Objects[objKey].minigame;
		var preEvalScript = "var M = Game.Objects['" + objKey + "'].minigame;";
		
		
		// M.computeMagicM
		if(!Game.customMinigame[objKey].computeMagicM) Game.customMinigame[objKey].computeMagicM = [];
		GameLoader.SliceCodeIntoFunction('M.computeMagicM', -1, `
			// M.computeMagicM injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].computeMagicM) Game.customMinigame['` + objKey + `'].computeMagicM[i]();
		`, preEvalScript);
		
		
		// M.getFailChance
		// functions should return a value to multiply failChance by (Return 1 for no effect)
		if(!Game.customMinigame[objKey].getFailChance) Game.customMinigame[objKey].getFailChance = [];
		GameLoader.ReplaceCodeIntoFunction('M.getFailChance', 'return', `
			// M.getFailChance injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].getFailChance) failChance *= Game.customMinigame['` + objKey + `'].getFailChance[i](spell);`, -1,
			preEvalScript);
		
		
		// M.castSpell
		// I'm open to suggestions
		
		
		// M.getSpellCost
		// functions should return a value to multiply out by (Return 1 for no effect)
		if(!Game.customMinigame[objKey].getSpellCost) Game.customMinigame[objKey].getSpellCost = [];
		GameLoader.ReplaceCodeIntoFunction('M.getSpellCost', 'return', `
			// M.getSpellCost injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].getSpellCost) out *= Game.customMinigame['` + objKey + `'].getSpellCost[i](spell);`, -1,
			preEvalScript);
		
		
		// M.getSpellCostBreakdown
		// functions should return a string value (Return str for no effect)
		if(!Game.customMinigame[objKey].getSpellCostBreakdown) Game.customMinigame[objKey].getSpellCostBreakdown = [];
		GameLoader.ReplaceCodeIntoFunction('M.getSpellCostBreakdown', 'return', `
			// M.getSpellCostBreakdown injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].getSpellCostBreakdown) str = Game.customMinigame['` + objKey + `'].getSpellCostBreakdown[i](spell, str);`, -1,
			preEvalScript);
		
		
		// M.spellTooltip
		// functions should return a string value (Return str for no effect)
		if(!Game.customMinigame[objKey].spellTooltip) Game.customMinigame[objKey].spellTooltip = [];
		GameLoader.ReplaceCodeIntoFunction('M.spellTooltip', 'background-position', `' + (me.icon[2]?'background-image:url('+me.icon[2]+');':'') + 'background-position`, 0, preEvalScript);
		GameLoader.ReplaceCodeIntoFunction('M.spellTooltip', 'return str', `
			// M.spellTooltip injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].spellTooltip) str = Game.customMinigame['` + objKey + `'].spellTooltip[i](id, str);`, -1,
			preEvalScript);
		
		
		// M.refillTooltip
		// functions should return a string value (Return str for no effect)
		if(!Game.customMinigame[objKey].refillTooltip) Game.customMinigame[objKey].refillTooltip = [];
		GameLoader.ReplaceCodeIntoFunction('M.refillTooltip', 'return', 'var str = ', 0,
			preEvalScript);
		GameLoader.SliceCodeIntoFunction('M.refillTooltip', -1, `
			// M.refillTooltip injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].refillTooltip) str = Game.customMinigame['` + objKey + `'].refillTooltip[i](id, str);
			return str;
		`, preEvalScript);
		
		
		// M.spells['hand of fate'].win
		// functions should push a value to choices
		if(!Game.customMinigame[objKey].fateWin) Game.customMinigame[objKey].fateWin = [];
		GameLoader.ReplaceCodeIntoFunction('M.spells["hand of fate"].win', 'newShimmer.force',
					`// M.spells["hand of fate"].win injection point 0
					for(var i in Game.customMinigame['` + objKey + `'].fateWin) Game.customMinigame['` + objKey + `'].fateWin[i](choices);`, -1,
			preEvalScript);
		
		
		// M.spells['hand of fate'].fail
		// functions should push a value to choices
		if(!Game.customMinigame[objKey].fateFail) Game.customMinigame[objKey].fateFail = [];
		GameLoader.ReplaceCodeIntoFunction('M.spells["hand of fate"].fail', 'newShimmer.force',
					`// M.spells["hand of fate"].fail injection point 0
					for(var i in Game.customMinigame['` + objKey + `'].fateFail) Game.customMinigame['` + objKey + `'].fateFail[i](choices);`, -1,
			preEvalScript);
		
		
		// M.launch
		if(M.launch.toString().indexOf('// M.launch injection point 0') == -1){
			GameLoader.SliceCodeIntoFunction('M.launch', -1, `
	// M.launch injection point 0
	for(var i in Game.customMinigameOnLoad['` + objKey + `']) Game.customMinigameOnLoad['` + objKey + `'][i](M.parent);
`, preEvalScript);
		}
	}
	
	GameLoader.ReplaceMarket = function(){
		GameLoader.functionsTotal += 24;
		var objKey = "Bank";
		var M = Game.Objects[objKey].minigame;
		var preEvalScript = "var M = Game.Objects['" + objKey + "'].minigame;";
		
		
		// M.goodTooltip
		// functions should return a string value (Return str for no effect)
		if(!Game.customMinigame[objKey].goodTooltip) Game.customMinigame[objKey].goodTooltip = [];
		GameLoader.ReplaceCodeIntoFunction('M.goodTooltip', 'return str', `
			// M.goodTooltip injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].goodTooltip) str = Game.customMinigame['` + objKey + `'].goodTooltip[i](id, str);`, -1,
			preEvalScript);
		
		
		// M.tradeTooltip
		// functions should return a string value (Return str for no effect)
		if(!Game.customMinigame[objKey].tradeTooltip) Game.customMinigame[objKey].tradeTooltip = [];
		GameLoader.ReplaceCodeIntoFunction('M.tradeTooltip', 'return str', `
			// M.tradeTooltip injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].tradeTooltip) str = Game.customMinigame['` + objKey + `'].tradeTooltip[i](id, n, str);`, -1,
			preEvalScript);
		
		
		// M.goodDelta
		// functions should return a value to multiply val by (Return 1 for no effect)
		if(!Game.customMinigame[objKey].goodDelta) Game.customMinigame[objKey].goodDelta = [];
		GameLoader.ReplaceCodeIntoFunction('M.goodDelta', 'return', `
			// M.goodDelta injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].goodDelta) val *= Game.customMinigame['` + objKey + `'].goodDelta[i](id, back);`, -1,
			preEvalScript);
		
		
		// M.getGoodMaxStock
		// functions should return an int value (Return ret for no effect)
		if(!Game.customMinigame[objKey].getGoodMaxStock) Game.customMinigame[objKey].getGoodMaxStock = [];
		GameLoader.ReplaceCodeIntoFunction('M.getGoodMaxStock', 'return', 'var ret = ', 0,
			preEvalScript);
		GameLoader.SliceCodeIntoFunction('M.getGoodMaxStock', -1, `
			// M.getGoodMaxStock injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].getGoodMaxStock) ret = Game.customMinigame['` + objKey + `'].getGoodMaxStock[i](good, ret);
			return ret;
		`, preEvalScript);
		
		
		// M.getGoodPrice
		// functions should return a value to multiply val by (Return 1 for no effect)
		if(!Game.customMinigame[objKey].getGoodPrice) Game.customMinigame[objKey].getGoodPrice = [];
		GameLoader.ReplaceCodeIntoFunction('M.getGoodPrice', 'return good.val;',
			`var val = good.val;
			// M.getGoodPrice injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].getGoodPrice) val *= Game.customMinigame['` + objKey + `'].getGoodPrice[i](good);
			return val;`, 0,
			preEvalScript);
		
		
		// M.buyGood
		// functions that run when a good is purchased
		if(!Game.customMinigame[objKey].buyGood) Game.customMinigame[objKey].buyGood = [];
		GameLoader.ReplaceCodeIntoFunction('M.buyGood', 'return true', `
			// M.buyGood injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].buyGood) Game.customMinigame['` + objKey + `'].buyGood[i](id, n);`, -1,
			preEvalScript);
		
		
		// M.sellGood
		// functions that run when a good is sold
		if(!Game.customMinigame[objKey].sellGood) Game.customMinigame[objKey].sellGood = [];
		GameLoader.ReplaceCodeIntoFunction('M.sellGood', 'return true', `
			// M.sellGood injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].sellGood) Game.customMinigame['` + objKey + `'].sellGood[i](id, n);`, -1,
			preEvalScript);
		
		
		// M.getRestingVal
		// functions should return a number value (Return ret for no effect)
		if(!Game.customMinigame[objKey].getRestingVal) Game.customMinigame[objKey].getRestingVal = [];
		GameLoader.ReplaceCodeIntoFunction('M.getRestingVal', 'return', 'var ret = ', 0,
			preEvalScript);
		GameLoader.ReplaceCodeIntoFunction('M.getRestingVal', '}', `
			// M.getRestingVal injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].getRestingVal) ret = Game.customMinigame['` + objKey + `'].getRestingVal[i](id, ret);
			return ret;
		`, -1, preEvalScript);
		
		
		// M.updateGoodStyle
		if(!Game.customMinigame[objKey].updateGoodStyle) Game.customMinigame[objKey].updateGoodStyle = [];
		GameLoader.SliceCodeIntoFunction('M.updateGoodStyle', -1, `
			// M.updateGoodStyle injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].updateGoodStyle) Game.customMinigame['` + objKey + `'].updateGoodStyle[i](id, me);
		`, preEvalScript);
		
		
		// M.officeTooltip
		// functions should return a string value (Return str for no effect)
		if(!Game.customMinigame[objKey].officeTooltip) Game.customMinigame[objKey].officeTooltip = [];
		GameLoader.ReplaceCodeIntoFunction('M.officeTooltip', 'return str', `
			// M.officeTooltip injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].officeTooltip) str = Game.customMinigame['` + objKey + `'].officeTooltip[i](me, str);`, -1,
			preEvalScript);
		
		
		// M.getMaxBrokers
		// functions should return an int value (Return ret for no effect)
		if(!Game.customMinigame[objKey].getMaxBrokers) Game.customMinigame[objKey].getMaxBrokers = [];
		GameLoader.ReplaceCodeIntoFunction('M.getMaxBrokers', 'return', 'var ret = ', 0,
			preEvalScript);
		GameLoader.ReplaceCodeIntoFunction('M.getMaxBrokers', '}', `
			// M.getMaxBrokers injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].getMaxBrokers) ret = Game.customMinigame['` + objKey + `'].getMaxBrokers[i](ret);
			return ret;
		`, -1, preEvalScript);
		
		
		// M.getBrokerPrice
		// functions should return an int value (Return ret for no effect)
		if(!Game.customMinigame[objKey].getBrokerPrice) Game.customMinigame[objKey].getBrokerPrice = [];
		GameLoader.ReplaceCodeIntoFunction('M.getBrokerPrice', 'return', 'var ret = ', 0,
			preEvalScript);
		GameLoader.ReplaceCodeIntoFunction('M.getBrokerPrice', '}', `
			// M.getBrokerPrice injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].getBrokerPrice) ret = Game.customMinigame['` + objKey + `'].getBrokerPrice[i](ret);
			return ret;
		`, -1, preEvalScript);
		
		
		// M.brokersTooltip
		// functions should return a string value (Return str for no effect)
		if(!Game.customMinigame[objKey].brokersTooltip) Game.customMinigame[objKey].brokersTooltip = [];
		GameLoader.ReplaceCodeIntoFunction('M.brokersTooltip', 'return str', `
			// M.brokersTooltip injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].brokersTooltip) str = Game.customMinigame['` + objKey + `'].brokersTooltip[i](str);`, -1,
			preEvalScript);
		
		
		// M.loanTooltip
		// functions should return a string value (Return str for no effect)
		if(!Game.customMinigame[objKey].loanTooltip) Game.customMinigame[objKey].loanTooltip = [];
		GameLoader.ReplaceCodeIntoFunction('M.loanTooltip', 'return str', `
			// M.loanTooltip injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].loanTooltip) str = Game.customMinigame['` + objKey + `'].loanTooltip[i](id, loan, str);`, -1,
			preEvalScript);
		
		
		// M.takeLoan
		// Will be added if given a specific request
		
		
		// M.getOppSlots
		// functions should return a value to add to slots (Return 0 for no effect)
		if(!Game.customMinigame[objKey].getOppSlots) Game.customMinigame[objKey].getOppSlots = [];
		GameLoader.ReplaceCodeIntoFunction('M.getOppSlots', 'return', `
			// M.getOppSlots injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].getOppSlots) slots += Game.customMinigame['` + objKey + `'].getOppSlots[i]();`, -1,
			preEvalScript);
		
		
		// M.oppTooltip
		// functions should return a string value (Return str for no effect)
		if(!Game.customMinigame[objKey].oppTooltip) Game.customMinigame[objKey].oppTooltip = [];
		GameLoader.ReplaceCodeIntoFunction('M.oppTooltip', 'return str', `
			// M.oppTooltip injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].oppTooltip) str = Game.customMinigame['` + objKey + `'].oppTooltip[i](str);`, -1,
			preEvalScript);
		
		
		// M.refillTooltip
		// functions should return a string value (Return str for no effect)
		if(!Game.customMinigame[objKey].refillTooltip) Game.customMinigame[objKey].refillTooltip = [];
		GameLoader.ReplaceCodeIntoFunction('M.refillTooltip', 'return', 'var str = ', 0,
			preEvalScript);
		GameLoader.SliceCodeIntoFunction('M.refillTooltip', -1, `
			// M.refillTooltip injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].refillTooltip) str = Game.customMinigame['` + objKey + `'].refillTooltip[i](id, str);
			return str;
		`, preEvalScript);
		
		
		// M.tick
		if(!Game.customMinigame[objKey].tick) Game.customMinigame[objKey].tick = [];
		GameLoader.SliceCodeIntoFunction('M.tick', -1, `
		// M.tick injection point 0
		for(var i in Game.customMinigame['` + objKey + `'].tick) Game.customMinigame['` + objKey + `'].tick[i]();
	`, preEvalScript);
		
		
		// M.launch
		if(M.launch.toString().indexOf('// M.launch injection point 0') == -1){
			GameLoader.SliceCodeIntoFunction('M.launch', -1, `
	// M.launch injection point 0
	for(var i in Game.customMinigameOnLoad['` + objKey + `']) Game.customMinigameOnLoad['` + objKey + `'][i](M.parent);
`, preEvalScript);
		}
	}
	
	GameLoader.ReplacePantheon = function(){
		GameLoader.functionsTotal += 12;
		var objKey = "Temple";
		var M = Game.Objects[objKey].minigame;
		var preEvalScript = "var M = Game.Objects['" + objKey + "'].minigame;";
		
		
		// M.godTooltip
		// functions should return a string value (Return str for no effect)
		if(!Game.customMinigame[objKey].godTooltip) Game.customMinigame[objKey].godTooltip = [];
		GameLoader.ReplaceCodeIntoFunction('M.godTooltip', 'background-position', `' + (me.icon[2]?'background-image:url('+me.icon[2]+');':'') + 'background-position`, 0, preEvalScript);
		GameLoader.ReplaceCodeIntoFunction('M.godTooltip', 'return str', `
			// M.godTooltip injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].godTooltip) str = Game.customMinigame['` + objKey + `'].godTooltip[i](id, str);`, -1,
			preEvalScript);
		
		
		// M.slotTooltip
		// functions should return a string value (Return str for no effect)
		if(!Game.customMinigame[objKey].slotTooltip) Game.customMinigame[objKey].slotTooltip = [];
		GameLoader.ReplaceCodeIntoFunction('M.slotTooltip', 'background-position', `' + (me.icon[2]?'background-image:url('+me.icon[2]+');':'') + 'background-position`, 0, preEvalScript);
		GameLoader.ReplaceCodeIntoFunction('M.slotTooltip', 'return str', `
			// M.slotTooltip injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].slotTooltip) str = Game.customMinigame['` + objKey + `'].slotTooltip[i](id, str);`, -1,
			preEvalScript);
		
		
		// M.useSwap
		if(!Game.customMinigame[objKey].useSwap) Game.customMinigame[objKey].useSwap = [];
		GameLoader.SliceCodeIntoFunction('M.useSwap', -1, `
			// M.useSwap injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].useSwap) Game.customMinigame['` + objKey + `'].useSwap[i](n);
		`, preEvalScript);
		
		
		// M.slotGod
		if(!Game.customMinigame[objKey].slotGod) Game.customMinigame[objKey].slotGod = [];
		GameLoader.SliceCodeIntoFunction('M.slotGod', -1, `
			// M.slotGod injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].slotGod) Game.customMinigame['` + objKey + `'].slotGod[i](god, slot);
		`, preEvalScript);
		
		
		// M.dragGod
		if(!Game.customMinigame[objKey].dragGod) Game.customMinigame[objKey].dragGod = [];
		GameLoader.SliceCodeIntoFunction('M.dragGod', -1, `
			// M.dragGod injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].dragGod) Game.customMinigame['` + objKey + `'].dragGod[i](what);
		`, preEvalScript);
		
		
		// M.dropGod
		if(!Game.customMinigame[objKey].dropGod) Game.customMinigame[objKey].dropGod = [];
		GameLoader.SliceCodeIntoFunction('M.dropGod', -1, `
			// M.dropGod injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].dropGod) Game.customMinigame['` + objKey + `'].dropGod[i]();
		`, preEvalScript);
		
		
		// M.hoverSlot
		if(!Game.customMinigame[objKey].hoverSlot) Game.customMinigame[objKey].hoverSlot = [];
		GameLoader.SliceCodeIntoFunction('M.hoverSlot', -1, `
			// M.hoverSlot injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].hoverSlot) Game.customMinigame['` + objKey + `'].hoverSlot[i](what);
		`, preEvalScript);
		
		
		// Game.hasGod
		// Game.forceUnslotGod
		
		
		// M.refillTooltip
		// functions should return a string value (Return str for no effect)
		if(!Game.customMinigame[objKey].refillTooltip) Game.customMinigame[objKey].refillTooltip = [];
		GameLoader.ReplaceCodeIntoFunction('M.refillTooltip', 'return', 'var str = ', 0,
			preEvalScript);
		GameLoader.SliceCodeIntoFunction('M.refillTooltip', -1, `
			// M.refillTooltip injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].refillTooltip) str = Game.customMinigame['` + objKey + `'].refillTooltip[i](id, str);
			return str;
		`, preEvalScript);
		
		
		// M.launch
		if(M.launch.toString().indexOf('// M.launch injection point 0') == -1){
			GameLoader.SliceCodeIntoFunction('M.launch', -1, `
	// M.launch injection point 0
	for(var i in Game.customMinigameOnLoad['` + objKey + `']) Game.customMinigameOnLoad['` + objKey + `'][i](M.parent);
`, preEvalScript);
		}
	}
	
	GameLoader.ReplaceGarden = function(){
		GameLoader.functionsTotal += 33;
		var objKey = "Farm";
		var M = Game.Objects[objKey].minigame;
		var preEvalScript = "var M = Game.Objects['" + objKey + "'].minigame;";
		var temp = '';
		
		
		// M.logic (plantAging)
		// return age to have no effect
		if(!Game.customMinigame[objKey].plantAging) Game.customMinigame[objKey].plantAging = [];
		temp = M.logic.toString();
		temp = temp.replace('tile[1]+=', 'var age = ');
		temp = temp.replace('tile[1]=Math.max(tile[1],0);', 
								`// M.logic injection point 0
								for(var i in Game.customMinigame['` + objKey + `'].plantAging) age = Game.customMinigame['` + objKey + `'].plantAging[i](age, tile, x, y);
								tile[1] += age;
								tile[1]=Math.max(tile[1],0);`);
		eval('M.logic=' + temp);
		
		
		// M.getUnlockedN
		if(!Game.customMinigame[objKey].getUnlockedN) Game.customMinigame[objKey].getUnlockedN = [];
		GameLoader.ReplaceCodeIntoFunction('M.getUnlockedN', 'return',
			`// M.getUnlockedN injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].getUnlockedN) Game.customMinigame['` + objKey + `'].getUnlockedN[i]();`, -1,
			preEvalScript);
		
		
		// M.dropUpgrade
		if(!Game.customMinigame[objKey].dropUpgrade) Game.customMinigame[objKey].dropUpgrade = [];
		GameLoader.SliceCodeIntoFunction('M.dropUpgrade', -1,
			`// M.dropUpgrade injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].dropUpgrade) Game.customMinigame['` + objKey + `'].dropUpgrade[i](upgrade, rate);
		`, preEvalScript);
		
		
		// M.computeMatures
		if(!Game.customMinigame[objKey].computeMatures) Game.customMinigame[objKey].computeMatures = [];
		GameLoader.SliceCodeIntoFunction('M.computeMatures', -1,
			`// M.computeMatures injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].computeMatures) Game.customMinigame['` + objKey + `'].computeMatures[i](mult);
		`, preEvalScript);
		
		
		// M.getMuts
		// functions should push mutations to muts
		if(!Game.customMinigame[objKey].getMuts) Game.customMinigame[objKey].getMuts = [];
		GameLoader.ReplaceCodeIntoFunction('M.getMuts', 'return',
			`// M.getMuts injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].getMuts) Game.customMinigame['` + objKey + `'].getMuts[i](neighs, neighsM, muts);`, -1,
			preEvalScript);
		
		
		// M.computeBoostPlot
		// You're going to have to use MAXIMUM EFFORT
		if(!Game.customMinigame[objKey].computeBoostPlot) Game.customMinigame[objKey].computeBoostPlot = [];
		GameLoader.SliceCodeIntoFunction('M.computeBoostPlot', -1,
			`// M.computeBoostPlot injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].computeBoostPlot) Game.customMinigame['` + objKey + `'].computeBoostPlot[i]();
		`, preEvalScript);
		
		
		// M.computeEffs
		// functions should change effs (or not, I'm a comment, not a cop)
		if(!Game.customMinigame[objKey].computeEffs) Game.customMinigame[objKey].computeEffs = [];
		GameLoader.ReplaceCodeIntoFunction('M.computeEffs', 'M.effs=effs;',
			`// M.computeEffs injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].computeEffs) Game.customMinigame['` + objKey + `'].computeEffs[i](effs);`, -1,
			preEvalScript);
		
		
		// M.tools TODO
		
		
		// M.getCost TODO
		
		
		// M.getPlantDesc
		// Return ret for no effect
		if(!Game.customMinigame[objKey].getPlantDesc) Game.customMinigame[objKey].getPlantDesc = [];
		GameLoader.ReplaceCodeIntoFunction('M.getPlantDesc', 'return', 'var ret = ', 0,
			preEvalScript);
		GameLoader.SliceCodeIntoFunction('M.getPlantDesc', -1,
				`// M.getPlantDesc injection point 0
				for(var i in Game.customMinigame['` + objKey + `'].getPlantDesc) ret = Game.customMinigame['` + objKey + `'].getPlantDesc[i](me, ret);
				return ret;
			`, preEvalScript);
		
		
		// M.soilTooltip
		// Return str for no effect
		if(!Game.customMinigame[objKey].soilTooltip) Game.customMinigame[objKey].soilTooltip = [];
		GameLoader.ReplaceCodeIntoFunction('M.soilTooltip', 'return str;',
				`// M.soilTooltip injection point 0
				for(var i in Game.customMinigame['` + objKey + `'].soilTooltip) str = Game.customMinigame['` + objKey + `'].soilTooltip[i](id, str);`, -1,
			preEvalScript);
		
		
		// M.seedTooltip
		// Return str for no effect
		if(!Game.customMinigame[objKey].seedTooltip) Game.customMinigame[objKey].seedTooltip = [];
		GameLoader.ReplaceCodeIntoFunction('M.seedTooltip', 'return str;',
				`// M.seedTooltip injection point 0
				for(var i in Game.customMinigame['` + objKey + `'].seedTooltip) str = Game.customMinigame['` + objKey + `'].seedTooltip[i](id, str);`, -1,
			preEvalScript);
		
		
		// M.toolTooltip
		// Return str for no effect
		if(!Game.customMinigame[objKey].toolTooltip) Game.customMinigame[objKey].toolTooltip = [];
		GameLoader.ReplaceCodeIntoFunction('M.toolTooltip', 'return str;',
				`// M.toolTooltip injection point 0
				for(var i in Game.customMinigame['` + objKey + `'].toolTooltip) str = Game.customMinigame['` + objKey + `'].toolTooltip[i](id, str);`, -1,
			preEvalScript);
		
		
		// M.tileTooltip
		// Return ret for no effect
		if(!Game.customMinigame[objKey].tileTooltip) Game.customMinigame[objKey].tileTooltip = [];
		GameLoader.ReplaceCodeIntoFunction('M.tileTooltip', 'return function(){', `return function(){
				var ret = '';`, 0,
			preEvalScript);
		GameLoader.ReplaceCodeIntoFunction('M.tileTooltip', /return str;/g, 'ret = str;', 0,
			preEvalScript);
		GameLoader.ReplaceCodeIntoFunction('M.tileTooltip', '};',
				`// M.tileTooltip injection point 0
				for(var i in Game.customMinigame['` + objKey + `'].tileTooltip) ret = Game.customMinigame['` + objKey + `'].tileTooltip[i](x, y, ret);
				return ret;`, -1,
			preEvalScript);
		
		
		// M.refillTooltip
		// functions should return a string value (Return str for no effect)
		if(!Game.customMinigame[objKey].refillTooltip) Game.customMinigame[objKey].refillTooltip = [];
		GameLoader.ReplaceCodeIntoFunction('M.refillTooltip', 'return', 'var str = ', 0,
			preEvalScript);
		GameLoader.SliceCodeIntoFunction('M.refillTooltip', -1, `
			// M.refillTooltip injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].refillTooltip) str = Game.customMinigame['` + objKey + `'].refillTooltip[i](id, str);
			return str;
		`, preEvalScript);
		
		
		// M.buildPanel
		if(!Game.customMinigame[objKey].buildPanel) Game.customMinigame[objKey].buildPanel = [];
		GameLoader.SliceCodeIntoFunction('M.buildPanel', -1,
			`// M.buildPanel injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].buildPanel) Game.customMinigame['` + objKey + `'].buildPanel[i]();
		`, preEvalScript);
		
		
		// M.buildPlot
		if(!Game.customMinigame[objKey].buildPlot) Game.customMinigame[objKey].buildPlot = [];
		GameLoader.SliceCodeIntoFunction('M.buildPlot', -1,
			`// M.buildPlot injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].buildPlot) Game.customMinigame['` + objKey + `'].buildPlot[i]();
		`, preEvalScript);
		
		
		// M.clickTile
		if(!Game.customMinigame[objKey].clickTile) Game.customMinigame[objKey].clickTile = [];
		GameLoader.SliceCodeIntoFunction('M.clickTile', -1,
			`// M.clickTile injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].clickTile) Game.customMinigame['` + objKey + `'].clickTile[i](x, y);
		`, preEvalScript);
		
		
		// M.useTool
		
		
		// M.getTile
		// Return ret to have no effect
		if(!Game.customMinigame[objKey].getTile) Game.customMinigame[objKey].getTile = [];
		GameLoader.ReplaceCodeIntoFunction('M.getTile', '{', 'var ret;', 1,
			preEvalScript);
		GameLoader.ReplaceCodeIntoFunction('M.getTile', 'return', 'ret =', 0,
			preEvalScript);
		GameLoader.ReplaceCodeIntoFunction('M.getTile', 'return', 'else ret =', 0,
			preEvalScript);
		GameLoader.SliceCodeIntoFunction('M.getTile', -1,
			`// M.getTile injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].getTile) ret = Game.customMinigame['` + objKey + `'].getTile[i](x, y, ret);
			return ret;
		`, preEvalScript);
		
		
		// M.getTile
		// Return ret to have no effect
		if(!Game.customMinigame[objKey].isTileUnlocked) Game.customMinigame[objKey].isTileUnlocked = [];
		GameLoader.ReplaceCodeIntoFunction('M.isTileUnlocked', '{', 'var ret;', 1,
			preEvalScript);
		GameLoader.ReplaceCodeIntoFunction('M.isTileUnlocked', /return/g, 'ret =', 0,
			preEvalScript);
		GameLoader.SliceCodeIntoFunction('M.isTileUnlocked', -1,
			`// M.isTileUnlocked injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].isTileUnlocked) ret = Game.customMinigame['` + objKey + `'].isTileUnlocked[i](x, y, ret);
			return ret;
		`, preEvalScript);
		
		
		// M.computeStepT
		if(!Game.customMinigame[objKey].computeStepT) Game.customMinigame[objKey].computeStepT = [];
		GameLoader.SliceCodeIntoFunction('M.computeStepT', -1,
			`// M.computeStepT injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].computeStepT) Game.customMinigame['` + objKey + `'].computeStepT[i]();
		`, preEvalScript);
		
		
		// M.convert
		if(!Game.customMinigame[objKey].convert) Game.customMinigame[objKey].convert = [];
		GameLoader.SliceCodeIntoFunction('M.convert', -1,
			`// M.convert injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].convert) Game.customMinigame['` + objKey + `'].convert[i]();
		`, preEvalScript);
		
		
		// M.harvestAll
		if(!Game.customMinigame[objKey].harvestAll) Game.customMinigame[objKey].harvestAll = [];
		GameLoader.SliceCodeIntoFunction('M.harvestAll', -1,
			`// M.harvestAll injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].harvestAll) Game.customMinigame['` + objKey + `'].harvestAll[i](type, mature, mortal);
		`, preEvalScript);
		
		
		// M.harvest
		if(!Game.customMinigame[objKey].harvest) Game.customMinigame[objKey].harvest = [];
		GameLoader.ReplaceCodeIntoFunction('M.harvest', 'return true;',
				`// M.harvest injection point 0
				for(var i in Game.customMinigame['` + objKey + `'].harvest) Game.customMinigame['` + objKey + `'].harvest[i](x, y, manual);`, -1,
			preEvalScript);
		
		
		// M.unlockSeed
		if(!Game.customMinigame[objKey].unlockSeed) Game.customMinigame[objKey].unlockSeed = [];
		GameLoader.ReplaceCodeIntoFunction('M.unlockSeed', 'return true;',
			`// M.unlockSeed injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].unlockSeed) Game.customMinigame['` + objKey + `'].unlockSeed[i](me);`, -1,
			preEvalScript);
		
		
		// M.lockSeed
		if(!Game.customMinigame[objKey].lockSeed) Game.customMinigame[objKey].lockSeed = [];
		GameLoader.ReplaceCodeIntoFunction('M.lockSeed', 'return true;',
			`// M.lockSeed injection point 0
			for(var i in Game.customMinigame['` + objKey + `'].lockSeed) Game.customMinigame['` + objKey + `'].lockSeed[i](me);`, -1,
			preEvalScript);
		
		
		// M.launch
		if(M.launch.toString().indexOf('// M.launch injection point 0') == -1){
			GameLoader.SliceCodeIntoFunction('M.launch', -1, `
	// M.launch injection point 0
	for(var i in Game.customMinigameOnLoad['` + objKey + `']) Game.customMinigameOnLoad['` + objKey + `'][i](M.parent);
`, preEvalScript);
		}
	}
	
	
	/*=====================================================================================
	Grimoire
	=======================================================================================*/
	if(!GameLoader.customRedrawSpells) GameLoader.customRedrawSpells = [];
	GameLoader.RedrawSpells = function(){
		var str = '';
		var M = Game.Objects['Wizard tower'].minigame;
		
		for(var i in M.spells){
			var me = M.spells[i];
			var icon = me.icon || [28,12];
			str += '<div class="grimoireSpell titleFont" id="grimoireSpell' + me.id + '" ' + Game.getDynamicTooltip('Game.ObjectsById[' + M.parent.id + '].minigame.spellTooltip(' + me.id + ')','this') + '><div class="usesIcon shadowFilter grimoireIcon" style="' + (icon[2]?'background-image:url('+icon[2]+');':'') + 'background-position:' + (-icon[0] * 48) + 'px ' + (-icon[1] * 48) + 'px;"></div><div class="grimoirePrice" id="grimoirePrice' + me.id + '">-</div></div>';
		}
		
		l('grimoireSpells').innerHTML = str;
		
		for(var i in M.spells){
			var me = M.spells[i];
			AddEvent(l('grimoireSpell' + me.id), 'click', function(spell){return function(){PlaySound('snd/tick.mp3'); M.castSpell(spell);}}(me));
		}
		
		for(var i in GameLoader.customRedrawSpells) GameLoader.customRedrawSpells[i]();
	}
	// Cookie Monster compatibility because it was here first
	GameLoader.customRedrawSpells.push(function(){if(typeof CM != 'undefined') CM.Disp.AddTooltipGrimoire();});
	
	if(!GameLoader.customNewSpell) GameLoader.customNewSpell = [];
	GameLoader.NewSpell = function(key, spell){
		var M = Game.Objects['Wizard tower'].minigame;
		
		M.spells[key] = spell;
		
		M.spellsById = [];
		var n = 0;
		for(var i in M.spells){
			M.spells[i].id = n;
			M.spellsById[n] = M.spells[i];
			n++;
		}
		
		for(var i in GameLoader.customNewSpell) GameLoader.customNewSpell[i](key, spell);
		GameLoader.RedrawSpells();
	}
	
	
	/*=====================================================================================
	Pantheon
	=======================================================================================*/
	if(!GameLoader.customRedrawGods) GameLoader.customRedrawGods = [];
	GameLoader.RedrawGods = function(){
		var str = '';
		var M = Game.Objects['Temple'].minigame;
		
		for(var i in M.slot){
			var me = M.slot[i];
			str += '<div class="ready templeGod templeGod' + (i % 4) + ' templeSlot titleFont" id="templeSlot' + i + '" ' + Game.getDynamicTooltip('Game.ObjectsById[' + M.parent.id + '].minigame.slotTooltip(' + i + ')', 'this') + '><div class="usesIcon shadowFilter templeGem templeGem' + (parseInt(i) + 1) + '"></div></div>';
		}
		l('templeSlots').innerHTML = str;
		
		str = '';
		for(var i in M.gods){
			var me = M.gods[i];
			var icon = me.icon || [0,0];
			str += '<div class="ready templeGod templeGod' + (me.id % 4) + ' titleFont" id="templeGod' + me.id + '" ' + Game.getDynamicTooltip('Game.ObjectsById[' + M.parent.id + '].minigame.godTooltip(' + me.id + ')', 'this') + '><div class="usesIcon shadowFilter templeIcon" style="' + (icon[2]?'background-image:url('+icon[2]+');':'') + 'background-position:' + (-icon[0] * 48) + 'px ' + (-icon[1] * 48) + 'px;"></div><div class="templeSlotDrag" id="templeGodDrag' + me.id + '"></div></div>';
			str += '<div class="templeGodPlaceholder" id="templeGodPlaceholder' + me.id + '"></div>';
		}
		l('templeGods').innerHTML = str;
		
		for(var i in M.slot){
			var me=M.slot[i];
			AddEvent(l('templeSlot' + i), 'mouseover', function(what){return function(){M.hoverSlot(what);}}(i));
			AddEvent(l('templeSlot' + i), 'mouseout', function(what){return function(){M.hoverSlot(-1);}}(i));
		}
		
		for(var i in M.gods){
			var me = M.gods[i];
			AddEvent(l('templeGodDrag' + me.id), 'mousedown', function(what){return function(){M.dragGod(what);}}(me));
			AddEvent(l('templeGodDrag' + me.id), 'mouseup', function(what){return function(){M.dropGod(what);}}(me));
		}
		
		M.load(M.save());
		for(var i in GameLoader.customRedrawGods) GameLoader.customRedrawGods[i]();
	}
	
	if(!GameLoader.customNewGod) GameLoader.customNewGod = [];
	GameLoader.NewGod = function(key, god){
		var M = Game.Objects['Temple'].minigame;
		
		M.gods[key] = god;
		
		M.godsById = [];
		var n = 0;
		for(var i in M.gods){
			M.gods[i].id = n;
			M.godsById[n] = M.gods[i];
			n++;
		}
		
		for(var i in GameLoader.customNewGod) GameLoader.customNewGod[i](key, god);
		GameLoader.RedrawGods();
	}
	
	
	/*=====================================================================================
	Garden
	=======================================================================================*/
	if(!GameLoader.customNewPlant) GameLoader.customNewPlant = [];
	GameLoader.NewPlant = function(key, plant){
		var M = Game.Objects['Farm'].minigame;
		
		M.plants[key] = plant;
		
		M.plantsById = [];
		var n = 0;
		for(var i in M.plants){
			M.plants[i].id = n;
			M.plantsById[n] = M.plants[i];
			n++;
		}
		
		for(var i in GameLoader.customNewPlant) GameLoader.customNewPlant[i](key, plant);
		M.buildPanel();
	}
	
	
	/*=====================================================================================
	Save custom things
	If you use GameLoader to create custom upgrades or achievements,
	it will also save their state to local storage whenever the game is saved.
		Each custom upgrade or achievement needs a unique name, or they could get overwritten.
		Yes, this means across mods as well.
		If two mods have things with the same name, the mods cannot be used at the same time.
		This is because of how the game itself keeps track of these things
	
	You can also use GameLoader to save your mod data.
		Add your save data as a child of GameLoader.config.OtherMods. Make sure not to step on anyone else's toes!
		Push your save function into GameLoader.customSave, and push your load function into GameLoader.customLoad
	=======================================================================================*/
	
	// The following code copied from https://github.com/pieroxy/lz-string
	GameLoader.LZString = function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString);
	
	if(!GameLoader.customSave) GameLoader.customSave = [];
	GameLoader.save = function(type){
		GameLoader.config.version = GameLoader.version;
		
		for(var name in GameLoader.config.Buildings){
			if(Game.Objects[name]){
				var saved = GameLoader.config.Buildings[name];
				var me = Game.Objects[name];
				
				saved.amount = me.amount;
				saved.bought = me.bought;
				saved.totalCookies = me.totalCookies;
				saved.level = me.level;
				saved.muted = me.muted;
				saved.highest = me.highest;
				saved.free = me.free;
				
				if(Game.isMinigameReady(me)) saved.minigameSave = me.minigame.save(); else saved.minigameSave = '';
			}
		}
		
		for(var name in GameLoader.config.Achievements){
			if(Game.Achievements[name]){
				GameLoader.config.Achievements[name].won = Game.Achievements[name].won;
			}
		}
		
		for(var name in GameLoader.config.Upgrades){
			if(Game.Upgrades[name]){
				GameLoader.config.Upgrades[name].unlocked = Game.Upgrades[name].unlocked;
				GameLoader.config.Upgrades[name].bought = Game.Upgrades[name].bought;
			}
		}
		
		for(var name in GameLoader.config.Buffs){
			var buff = GameLoader.config.Buffs[name];
			buff.time = 0;
			if(Game.buffs[buff.name]){
				if(Game.buffs[buff.name].time){
					buff.time = Game.buffs[buff.name].time;
					buff.maxTime = Game.buffs[buff.name].maxTime;
					buff.arg1 = Game.buffs[buff.name].arg1;
					buff.arg2 = Game.buffs[buff.name].arg2;
					buff.arg3 = Game.buffs[buff.name].arg3;
				}
			}
		}
		
		for(var name in GameLoader.config.Seasons){
			var season = GameLoader.config.Seasons[name];
			season.lastTime = Date.now();
			if(Game.season == name){
				season.T = Game.seasonT;
			}
			else{
				season.T = -1;
			}
		}
		
		for(var i in GameLoader.customSave) GameLoader.customSave[i]();
		
		var str = JSON.stringify(GameLoader.config);
		//str = GameLoader.LZString.compressToUTF16(str);
		
		if(type == 2){
			return str;
		}
		else if(type == 3){
			return JSON.stringify(GameLoader.config, null, 2);
		}
		else if (type==1){
			str = escape(utf8_to_b64(str) + '!END!');
			return str;
		}
		else{
			return str;
			/*str = utf8_to_b64(str) + '!END!';
			str = escape(str);
			Game.localStorageSet(GameLoader.name, str);*/
		}
	}
	
	if(!GameLoader.customLoad) GameLoader.customLoad = [];
	GameLoader.load = function(data, isBase64){
		var config;
		var str = '';
		
		var cautiousDecompress = function(data){
			var ret = null;
			try{
				ret = JSON.parse(data);
			}catch{
				ret = GameLoader.LZString.decompressFromUTF16(data);
				ret = JSON.parse(ret);
			}
			
			return ret;
		}
		
		if(isBase64){ // Getting here from import GameLoader in menu
			if(data){
				str = unescape(data);
			}
			
			if(str != ''){
				str = str.split('!END!')[0];
				str = b64_to_utf8(str);
				config = cautiousDecompress(str);
			}
		}
		else{ // Getting here from game function call
			if(data){ // Has data in game save
				config = cautiousDecompress(data);
			}
		}
		
		
		GameLoader.InitializeConfig(config);
		
		
		if(GameLoader.config.version != GameLoader.version){
			//l('logButton').classList.add('hasUpdate');
			GameLoader.collapseMenu['GameLoaderinfo'] = 0;
		}else{
			GameLoader.collapseMenu['GameLoaderinfo'] = 1;
		}
		
		for(var name in GameLoader.config.Buildings){
			if(Game.Objects[name]){
				var saved = GameLoader.config.Buildings[name];
				var me = Game.Objects[name];
				
				me.switchMinigame(false);
				me.pics = [];
				
				me.amount = saved.amount;
				me.bought = saved.bought;
				me.totalCookies = saved.totalCookies;
				me.level = saved.level;
				me.muted = saved.muted;
				me.highest = saved.highest ? saved.highest : 0; // Left this out earlier, can't expect it to be there
				me.free = saved.free ? saved.free : 0; // Left this out earlier, can't expect it to be there
				
				me.minigameSave = saved.minigameSave;
				if(me.minigame && me.minigameLoaded && me.minigame.reset){me.minigame.reset(true); me.minigame.load(me.minigameSave);}
				
				Game.BuildingsOwned += me.amount;
			}
		}
		
		for(var name in GameLoader.config.Achievements){
			if(Game.Achievements[name]){
				Game.Achievements[name].won = GameLoader.config.Achievements[name].won;
			}
		}
		
		for(var name in GameLoader.config.Upgrades){
			if(Game.Upgrades[name]){
				Game.Upgrades[name].unlocked = GameLoader.config.Upgrades[name].unlocked;
				Game.Upgrades[name].bought = GameLoader.config.Upgrades[name].bought;
			}
		}
		
		for(var name in GameLoader.config.Buffs){
			var found = false;
			for(var i in Game.buffTypes) if(Game.buffTypes[i].name == name) found = true;
			if(found){
				if(GameLoader.config.Buffs[name].time){
					var buff = GameLoader.config.Buffs[name];
					Game.gainBuff(name, buff.maxTime / Game.fps, buff.arg1, buff.arg2, buff.arg3).time = buff.time;
				}
			}
		}
		
		for(var name in GameLoader.config.Seasons){
			if(Game.seasons[name]){
				if(GameLoader.config.Seasons[name].T > 0){
					Game.season = name;
					Game.seasonT = GameLoader.config.Seasons[name].T;
					var framesElapsed = Math.ceil(((Date.now() - GameLoader.config.Seasons[name].lastTime) / 1000) * Game.fps);
					if(Game.seasonT > 0) Game.seasonT = Math.max(Game.seasonT - framesElapsed, 1);
				}
				
				if(Game.Has('Season switcher')) Game.Unlock(Game.seasons[name].trigger);
			}
		}
		
		Game.upgradesToRebuild = 1;
		for(var i in GameLoader.customLoad) GameLoader.customLoad[i]();
		
		Game.Win('Third-party');
	}
	
	GameLoader.InitializeConfig = function(config){
		if(!GameLoader.config)					 GameLoader.config = {};
		if(!GameLoader.config.version)			 GameLoader.config.version = 1;
		if(!GameLoader.config.Achievements)		 GameLoader.config.Achievements = {};
		if(!GameLoader.config.Upgrades)			 GameLoader.config.Upgrades = {};
		if(!GameLoader.config.Buildings)			 GameLoader.config.Buildings = {};
		if(!GameLoader.config.Buffs)				 GameLoader.config.Buffs = {};
		if(!GameLoader.config.Seasons)			 GameLoader.config.Seasons = {};
		if(!GameLoader.config.OtherMods)			 GameLoader.config.OtherMods = {};
		if(!GameLoader.config.vault)				 GameLoader.config.vault = [];
		if(!GameLoader.config.permanentUpgrades)	 GameLoader.config.permanentUpgrades = [-1,-1,-1,-1,-1];
		if(!GameLoader.config.chimeType)			 GameLoader.config.chimeType = 'No sound';
		if(!GameLoader.config.milkType)			 GameLoader.config.milkType = 'Automatic';
		if(!GameLoader.config.bgType)				 GameLoader.config.bgType = 'Automatic';
		if(GameLoader.config.showVersionNo === undefined) GameLoader.config.showVersionNo = 1;
		
		if(config){
			if(config.version) GameLoader.config.version = config.version;
			if(config.Achievements)		 for(var i in config.Achievements)		GameLoader.config.Achievements[i] = config.Achievements[i];
			if(config.Upgrades)			 for(var i in config.Upgrades)			GameLoader.config.Upgrades[i] = config.Upgrades[i];
			if(config.Buildings)		 for(var i in config.Buildings)			GameLoader.config.Buildings[i] = config.Buildings[i];
			if(config.Buffs)			 for(var i in config.Buffs)				GameLoader.config.Buffs[i] = config.Buffs[i];
			if(config.Seasons)			 for(var i in config.Seasons)			GameLoader.config.Seasons[i] = config.Seasons[i];
			if(config.OtherMods)		 for(var i in config.OtherMods)			GameLoader.config.OtherMods[i] = config.OtherMods[i];
			if(config.vault)			 for(var i in config.vault)				GameLoader.config.vault[i] = config.vault[i];
			if(config.permanentUpgrades) for(var i in config.permanentUpgrades) GameLoader.config.permanentUpgrades[i] = config.permanentUpgrades[i];
			if(config.chimeType) GameLoader.config.chimeType = config.chimeType;
			if(config.milkType)  GameLoader.config.milkType = config.milkType;
			if(config.bgType)    GameLoader.config.bgType = config.bgType;
			if(config.showVersionNo !== undefined) GameLoader.config.showVersionNo = config.showVersionNo;
		}
	}
	
	GameLoader.applyPref = function(prefName){
		switch(prefName){
			case 'showVersionNo':
				if(GameLoader.config[prefName]){
					l('GameLoaderversionNumber').style.display = '';
					l('GameLoaderversionGame').style.display = '';
				}else{
					l('GameLoaderversionNumber').style.display = 'none';
					l('GameLoaderversionGame').style.display = 'none';
				}
				break;
		}
	}
	
	// These two kept for people who might be blindsided by the save format change
	GameLoader.ExportSave = function(){
		Game.Prompt(
			'<h3>Export configuration</h3>' +
			'<div class="block">This is your GameLoader save.<br>It contains data that other mods authors decided to allow GameLoader to manage, as well as data for custom things added through GameLoader (i.e. achivements, upgrades, etc)</div>' +
			'<div class="block"><textarea id="textareaPrompt" style="width:100%;height:128px;" readonly>' + GameLoader.save(1) + '</textarea></div>',
			['All done!']);
		l('textareaPrompt').focus();
		l('textareaPrompt').select();
	}
	
	GameLoader.ImportSave = function(){
		var load = 'if(l("textareaPrompt").value.length > 0){GameLoader.load(l("textareaPrompt").value, 1); Game.ClosePrompt(); Game.UpdateMenu();}';
		Game.Prompt(
			'<h3>Import config</h3>'+
			'<div class="block">Paste your GameLoader save here.</div>'+
			'<div class="block"><textarea id="textareaPrompt" style="width: 100%; height: 128px;"></textarea></div>',
			[['Load', load], 'Nevermind']);
		l('textareaPrompt').focus();
	}
	
	/*
	Made obsolete by native mod save support
	
	GameLoader.ExportCombinedSave = function(){
		var saveString = JSON.stringify({'Vanilla':Game.WriteSave(1),'GameLoader':GameLoader.save(1)});
		Game.Prompt('<h3>Export combined save</h3><div class="block">This is your vanilla game save combined with your GameLoader save in a single convenient location!</div><div class="block"><textarea id="textareaPrompt" style="width:100%;height:128px;" readonly>' +
					saveString +
					'</textarea></div>',['All done!']);
		l('textareaPrompt').focus();
		l('textareaPrompt').select();
	}
	
	GameLoader.ImportCombinedSave = function(){
		Game.Prompt('<h3>Import combined save</h3><div class="block">Paste your combined vanilla/GameLoader save here.</div><div class="block"><textarea id="textareaPrompt" style="width:100%;height:128px;"></textarea></div>',
					[['Load','if(l(\'textareaPrompt\').value.length > 0){GameLoader.LoadCombinedSave(l(\'textareaPrompt\').value); Game.ClosePrompt(); Game.UpdateMenu();}'], 'Nevermind']);
		l('textareaPrompt').focus();
	}
	
	GameLoader.LoadCombinedSave = function(saveStr){
		var save = JSON.parse(saveStr);
		Game.ImportSaveCode(save.Vanilla);
		GameLoader.load(save.GameLoader, 1);
	}*/
	
	/*
	I apparently never incorporated these anywhere. Might as well comment them out.
	
	GameLoader.ExportEditableSave = function(){
		Game.Prompt('<h3>Export configuration</h3><div class="block">This is your GameLoader save.<br>In JSON format for people who want to edit it.</div><div class="block"><textarea id="textareaPrompt" style="width:100%;height:128px;" readonly>' +
					GameLoader.save(3) +
					'</textarea></div>',['All done!']);
		l('textareaPrompt').focus();
		l('textareaPrompt').select();
	}
	
	GameLoader.ImportEditableSave = function(){
		Game.Prompt('<h3>Import config</h3><div class="block">Paste your GameLoader save here (in JSON format).</div><div class="block"><textarea id="textareaPrompt" style="width:100%;height:128px;"></textarea></div>',
					[['Load','if(l(\'textareaPrompt\').value.length > 0){GameLoader.load(l(\'textareaPrompt\').value); Game.ClosePrompt(); Game.UpdateMenu();}'], 'Nevermind']);
		l('textareaPrompt').focus();
	}*/
	
	GameLoader.reset = function(hard){
		for(var name in GameLoader.config.Buildings){
			var me = GameLoader.config.Buildings[name];
			me.amount=0;me.bought=0;me.highest=0;me.free=0;me.totalCookies=0;
			me.onMinigame = false;
			if(hard) me.muted=0;
			me.pics=[];
		}
		
		for(var name in GameLoader.config.Achievements){
			if(hard) GameLoader.config.Achievements[name].won = 0;
		}
		
		for(var name in GameLoader.config.Upgrades){
			var me = GameLoader.config.Upgrades[name];
			me.bought = 0;
			me.unlocked = 0;
		}
		
		for(var name in GameLoader.config.Buffs){
			var buff = GameLoader.config.Buffs[name];
			buff.time = 0;
			buff.maxTime = 0;
			buff.arg1 = 0;
			buff.arg2 = 0;
			buff.arg3 = 0;
		}
		
		for(var name in GameLoader.config.Seasons){
			var season = GameLoader.config.Seasons[name];
			season.lastTime = Date.now();
			season.T = 0;
		}
		
		
		if(hard){
			GameLoader.config.vault = [];
			GameLoader.config.permanentUpgrades = [-1,-1,-1,-1,-1];
			GameLoader.config.chimeType = 'No sound';
			GameLoader.config.milkType = 'Automatic';
			GameLoader.config.bgType = 'Automatic';
		} else {
			if(Game.ascensionMode != 1){
				for(var i in GameLoader.config.permanentUpgrades){
					if(GameLoader.config.permanentUpgrades[i] != -1)
						if(Game.Upgrades[GameLoader.config.permanentUpgrades[i]])
							Game.Upgrades[GameLoader.config.permanentUpgrades[i]].earn();
				}
			}
		}
	}
	
	
	/*=====================================================================================
	Standard creation helpers
	=======================================================================================*/
	GameLoader.NewUpgrade = function(name, desc, price, icon, buyFunction){
		var me = new Game.Upgrade(name, desc, price, icon, buyFunction);
		GameLoader.ReplaceUpgrade(name);
		
		if(GameLoader.config.Upgrades[name]){
			me.unlocked = GameLoader.config.Upgrades[name].unlocked;
			me.bought = GameLoader.config.Upgrades[name].bought;
		}else{
			GameLoader.config.Upgrades[name] = {
				unlocked: 0,
				bought: 0
			}
		}
		
		me.GameLoader = 1;
		
		if(typeof LocalizeUpgradesAndAchievs !== 'undefined') LocalizeUpgradesAndAchievs();
		return me;
	}
	
	GameLoader.NewHeavenlyUpgrade = function(name, desc, price, icon, posX, posY, parents, buyFunction){
		var me = GameLoader.NewUpgrade(name, desc, price, icon, buyFunction);
		Game.PrestigeUpgrades.push(me);
		
		me.pool = 'prestige';
		me.posX = posX;
		me.posY = posY;
		me.order = me.id;
		
		me.parents = parents;
		if(me.parents.length == 0) me.parents = ['Legacy'];
		me.parents = me.parents || [-1];
		for(var ii in me.parents){
			if(me.parents[ii] != -1) me.parents[ii] = Game.Upgrades[me.parents[ii]];
		}
		
		return me;
	}
	
	GameLoader.NewAchievement = function(name, desc, icon){
		var me = new Game.Achievement(name, desc, icon);
		GameLoader.ReplaceAchievement(name);
		
		if(GameLoader.config.Achievements[name]){
			me.won = GameLoader.config.Achievements[name].won;
		}else{
			GameLoader.config.Achievements[name] = {
				won: 0
			}
		}
		
		if(typeof LocalizeUpgradesAndAchievs !== 'undefined') LocalizeUpgradesAndAchievs();
		return me;
	}
	
	GameLoader.NewBuilding = function(name, commonName, desc, icon, iconColumn, art, price, cps, buyFunction, foolObject, buildingSpecial){
		var me = new Game.Object(name, commonName, desc, icon, iconColumn, art, price, cps, buyFunction);
		
		// This is the name, description, and icon used during Business Season
		if(foolObject) Game.foolObjects[name] = foolObject;
		// The name of this building's golden cookie buff and debuff
		if(buildingSpecial) Game.goldenCookieBuildingBuffs[name] = buildingSpecial;
		
		GameLoader.ReplaceBuilding(name);
		
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
		
		
		
		if(GameLoader.config.Buildings[name]){
			var saved = GameLoader.config.Buildings[name];
			me.amount = saved.amount;
			me.bought = saved.bought;
			me.totalCookies = saved.totalCookies;
			me.level = saved.level;
			me.muted = saved.muted;
			me.highest = saved.highest ? saved.highest : 0; // Left this out earlier, can't expect it to be there
			me.free = saved.free ? saved.free : 0; // Left this out earlier, can't expect it to be there
			me.minigameSave = saved.minigameSave;
			
			Game.BuildingsOwned += me.amount;
			
		}else{
			var saved = {};
			saved.amount = 0;
			saved.bought = 0;
			saved.totalCookies = 0;
			saved.level = 0;
			saved.muted = 0;
			saved.free = 0;
			saved.highest = 0;
			saved.minigameSave = '';
			
			GameLoader.config.Buildings[name] = saved;
		}
		
		
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
	
	GameLoader.NewBuff = function(name, func){
		var me = new Game.buffType(name, func);
		
		if(GameLoader.config.Buffs[name]){
			if(GameLoader.config.Buffs[name].time){
				GameLoader.config.Buffs[name].name = func().name;
				var buff = GameLoader.config.Buffs[name];
				Game.gainBuff(name, buff.maxTime / Game.fps, buff.arg1, buff.arg2, buff.arg3).time = buff.time;
			}
		}else{
			GameLoader.config.Buffs[name] = {
				name: func().name,
				maxTime: 0,
				time: 0,
				arg1: 0,
				arg2: 0,
				arg3: 0
			}
		}
		
		return me;
	}
	
	GameLoader.NewSeason = function(name, firstDay, lastDay, season, announcement){
		Game.seasons[name] = season;
		
		lastDay.setDate(lastDay.getDate() + 1); // lastDay is inclusive
		if(Date.now() >= firstDay && Date.now() <= lastDay) Game.baseSeason = name;
		
		GameLoader.customLoad.push(function(){
			if(Game.season == name && Game.season == Game.baseSeason){
				Game.Notify(announcement[0], announcement[1], announcement[2], 60 * 3);
			}
		});
		
		GameLoader.ReplaceCodeIntoFunction('Game.WriteSave', /\(\(Game.season/g, "((Game.season && Game.season != '" + name + "'", 0);
		
		Game.computeSeasons();
		Game.computeSeasonPrices();
		
		if(GameLoader.config.Seasons[name]){
			if(GameLoader.config.Seasons[name].T > 0){
				Game.seasonT = GameLoader.config.Seasons[name].T;
				Game.season = name;
				var framesElapsed = Math.ceil(((Date.now() - GameLoader.config.Seasons[name].lastTime) / 1000) * Game.fps);
				if(Game.seasonT > 0) Game.seasonT = Math.max(Game.seasonT - framesElapsed, 1);
			}
		}else{
			GameLoader.config.Seasons[name] = {
				T: 0,
				lastTime: Date.now()
			}
		}
		
		if(Game.Has('Season switcher')) Game.Unlock(Game.seasons[name].trigger);
		Game.upgradesToRebuild = 1;
	}
	
	GameLoader.NewShimmerSoundSelection = function(name, icon, defaultSound, shimmerTypes){
		// name				What the game will display in the selector
		// icon				An array [x, y, (optional)url] See how upgrades handle icons to get an idea
		// defaultSound		The default sound to play for a shimmer spawn
		// shimmerTypes		For different sounds for each shimmer type {golden:'soundUrl',reindeer:'differentSoundUrl'}
		let sound = {name:name, icon:icon};
		if(defaultSound) sound.default = defaultSound;
		if(shimmerTypes) sound.shimmerTypes = shimmerTypes;
		
		Game.customUpgrades['Golden cookie sound selector'].choicesFunction.push(function(choices){
			choices.push(sound);
		});
	}
	
	GameLoader.NewMilkSelection = function(name, icon, pic){
		// name		What the game will display in the selector
		// icon		An array [x, y, (optional)url] See how upgrades handle icons to get an idea
		// pic		Url to your picture
		
		let milk = {name:name, icon:icon, milk:{pic:pic}, order:Game.AllMilks.length};
		Game.customUpgrades['Milk selector'].choicesFunction.push(function(choices){
			choices.push(milk);
		});
	}
	
	GameLoader.NewBackgroundSelection = function(name, icon, pic){
		// name		What the game will display in the selector
		// icon		An array [x, y, (optional)url] See how upgrades handle icons to get an idea
		// pic		Url to your picture
		
		let bg = {name:name, icon:icon, pic:pic};
		Game.customUpgrades['Background selector'].choicesFunction.push(function(choices){
			choices.push(bg);
		});
	}
	
	
	/*=====================================================================================
	Custom Selector helper functions
	=======================================================================================*/
	GameLoader.OverrideShimmerSoundSelector = function(choices){
		let found = false;
		for(var i in choices){
			let choice = choices[i];
			if(choice.name == GameLoader.config.chimeType){choice.selected = 1; found = true}
			else choice.selected = false;
		}
		
		// If the selected sound is from an unloaded mod, default to Chime
		if(!found) choices[1].selected = 1;
	}
	
	GameLoader.GetSelectedShimmerSound = function(){
		let choices = Game.Upgrades['Golden cookie sound selector'].choicesFunction();
		let choice = choices[1];
		for(var i in choices) if(choices[i].selected) choice = choices[i];
		return choice;
	}
	
	GameLoader.SetSelectedShimmerSound = function(id){
		let choices = Game.Upgrades['Golden cookie sound selector'].choicesFunction();
		Game.chimeType = (id > 4 ? 0 : id);    // Manually update when vanilla choices change
		GameLoader.config.chimeType = choices[id].name;
	}
	
	GameLoader.PlayShimmerSpawnSound = function(shimmerType){
		//if(Game.chimeType){ // Game.chimeType is 0 for No sound
			let choice = GameLoader.GetSelectedShimmerSound();
			let sfx = '';
			if(choice.shimmerTypes && choice.shimmerTypes[shimmerType] !== undefined) sfx = choice.shimmerTypes[shimmerType];
			else if(choice.default) sfx = choice.default;
			
			PlaySound(sfx);
		//}
	}
	
	GameLoader.OverrideMilkSelector = function(choices){
		let found = false;
		for(var i in choices){
			let choice = choices[i];
			if(choice.name == GameLoader.config.milkType){choice.selected = 1; found = true}
			else choice.selected = false;
		}
		
		// If the selected milk is from an unloaded mod, default to Automatic
		if(!found) choices[0].selected = 1;
	}
	
	GameLoader.GetSelectedMilk = function(){
		let choices = Game.Upgrades['Milk selector'].choicesFunction();
		let choice = {milk:Game.Milk};
		for(var i in choices) if(choices[i].selected) choice = choices[i];
		return choice;
	}
	
	GameLoader.SetSelectedMilk = function(id){
		Game.milkType = (id<Game.AllMilks.length ? id : 0); // Vanilla value defaults to 0 (Automatic)
		GameLoader.config.milkType = Game.Upgrades['Milk selector'].choicesFunction()[id].name;
	}
	
	GameLoader.OverrideBackgroundSelector = function(choices){
		let found = false;
		for(var i in choices){
			let choice = choices[i];
			if(choice.name == GameLoader.config.bgType){choice.selected = 1; found = true}
			else choice.selected = false;
		}
		
		// If the selected bg is from an unloaded mod, default to Automatic
		if(!found) choices[0].selected = 1;
	}
	
	GameLoader.GetSelectedBackground = function(){
		let choices = Game.Upgrades['Background selector'].choicesFunction();
		let choice = choices[0];
		for(var i in choices) if(choices[i].selected){
			choice = choices[i];
			if(Game.BGsByChoice[i]) choice.pic = Game.BGsByChoice[i].pic;
		}
		return choice;
	}
	
	GameLoader.SetSelectedBackground = function(id){
		Game.bgType = (Game.BGsByChoice[id] ? id : 0); // Vanilla value defaults to 0 (Automatic)
		GameLoader.config.bgType = Game.Upgrades['Background selector'].choicesFunction()[id].name;
	}
	
	
	/*=====================================================================================
	Other
	=======================================================================================*/
	GameLoader.AddMoreWrinklers = function(n){
		var j = Game.wrinklers.length;
		for (var i = j; i < j + n; i++){
			Game.wrinklers.push({id:parseInt(i),close:0,sucked:0,phase:0,x:0,y:0,r:0,hurt:0,hp:Game.wrinklerHP,selected:0,type:0});
		}
	}
	
	GameLoader.CreateSpecialObject = function(name, conditionFunc, pictureFunc, drawFunc){
		// name            the key to identify this particular special object. Must be unique
		// conditionFunc   a function that returns true if the object should be shown, false if not
		// pictureFunc     a function that recieves and alters an object picframe{pic:<url>, frame:<integer>}
		// drawFunc        a function that recieves and returns an HTML string.
		
		Game.customSpecialTabs.push(function(){
			if(conditionFunc()) Game.specialTabs.push(name);
		});
		
		Game.customDrawSpecialPic.push(function(picframe, tab){
			if(tab == name) pictureFunc(picframe);
		});
		
		
		Game.customToggleSpecialMenu.push(function(str){
			if(Game.specialTab == name) str = drawFunc(str);
			return str;
		});
	}
	
	GameLoader.SetSpecialMenuImage = function(str, pic, frame){
		// We assume that Game.specialTab is not santa or dragon
		return str.replace(
			'background:url('+Game.resPath+'img/dragon.png?v='+Game.version+');background-position:'+(-4*96)+'px 0px;',
			'background:url(' + pic + ');background-position:' + (frame * (-96)) + 'px 0px;');
	}
	
	GameLoader.GetPermanentUpgrade = function(slot, id){
		if(GameLoader.config.permanentUpgrades[slot] == -1) return id;
		return (Game.Upgrades[GameLoader.config.permanentUpgrades[slot]] ? Game.Upgrades[GameLoader.config.permanentUpgrades[slot]].id : -1);
	}
	
	GameLoader.RectifyPermanentUpgrades = function(){
		for(var i in Game.permanentUpgrades){
			if(Game.permanentUpgrades[i] != -1){
				var upgrade = Game.UpgradesById[Game.permanentUpgrades[i]];
				if(upgrade.GameLoader){
					Game.permanentUpgrades[i] = -1;
					GameLoader.config.permanentUpgrades[i] = upgrade.name;
				}else{
					GameLoader.config.permanentUpgrades[i] = -1;
				}
			}
		}
	}
	
	GameLoader.AddStyles = function(content){
		var style = document.createElement('style');
		style.setAttribute('type', 'text/css');
		style.innerHTML = content;
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	
	
	/*=====================================================================================
	Confirmation Prompts
	=======================================================================================*/
	GameLoader.ConfirmLoad = function(modName, modVersion, versionText){
		return confirm(
			`${ modName } version ${ modVersion } is meant for ${ versionText }.  `+
			"Loading a different version may cause errors.  " +
			`Do you still want to load ${ modName }?`);
	}
	GameLoader.ConfirmGameVersion = function(modName, modVersion, version){
		var proceed = true;
		if(Game.version != version){
			proceed = GameLoader.ConfirmLoad(modName, modVersion, `Game version ${ version }`);
		}
		return proceed;
	}
	
	GameLoader.ConfirmGameLoaderVersion = function(modName, modVersion, version){
		var proceed = true;
		if(GameLoader.version != version){
			proceed = GameLoader.ConfirmLoad(modName, modVersion, `GameLoader version ${ version }`);
		}
		return proceed;
	}
	
	GameLoader.ConfirmGameGameLoaderVersion = function(modName, modVersion, gameVersion, GameLoaderVersion){
		var proceed = true;
		if(Game.version != gameVersion && GameLoader.version != GameLoaderVersion){
			proceed = GameLoader.ConfirmLoad(modName, modVersion, `Game version ${ gameVersion } and GameLoader version ${ GameLoaderVersion }`);
		}
		else if(Game.version != gameVersion){
			proceed = GameLoader.ConfirmLoad(modName, modVersion, `Game version ${ gameVersion }`);
		}
		else if(GameLoader.version != GameLoaderVersion){
			proceed = GameLoader.ConfirmLoad(modName, modVersion, `GameLoader version ${ GameLoaderVersion }`);
		}
		return proceed;
	}
	
	/*  Doesn't work until the mods actually get loaded in order
	GameLoader.LaunchGameLoaderMod = function(func){
		if(GameLoader.isLoaded) func();
		else GameLoader.postLoadHooks.push(func);
	}*/
	
	if(GameLoader.Steam){
		GameLoader.GetModPath = (modName) => {
			let mod = App.mods[modName];
			let pos = mod.dir.lastIndexOf('\\');
			if(pos == -1) return '../mods/' + (mod.local ? 'local' : 'workshop') + '/' + mod.path;
			else return '../mods/' + mod.dir.substring(pos + 1);
		}
		
		GameLoader.GetModFolder = (modName) => App.mods[modName].path;
		
		GameLoader.MenuHelper.AutoVersion = (mod) => {
			let func = function(){
				let modInfo = Steam.mods[mod.id].info;
				Game.customStatsMenu.push(function(){
					GameLoader.AppendStatsVersionNumber(modInfo.Name, modInfo.ModVersion);
				});
			}
			
			if(GameLoader.isLoaded) func();
			else GameLoader.postLoadHooks.push(func);
		}
	}
	
	
	/*=====================================================================================
	Start your engines
	=======================================================================================*/
	if(GameLoader.ConfirmGameVersion(GameLoader.name, GameLoader.version, GameLoader.GameVersion)){
		Game.registerMod(GameLoader.name, GameLoader);
		
		if(GameLoader.Steam){
			GameLoader.LaunchOtherMods = Game.launchMods;
			Game.launchMods = GameLoader.init;
			
			GameLoader.GameLoadModData = Game.loadModData;
			Game.loadModData = function(){GameLoader.gameHasLoadedSave=1;}
		}
	}
}

if(!GameLoader.isLoaded && !GameLoader.loading) GameLoader.launch();
