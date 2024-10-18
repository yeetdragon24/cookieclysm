Game.registerMod('Cookieclysm', {
	init: function() {
		if (localStorage.getItem('cclysmGame') === null) {
			this.startingPrompt();
		}
		else {
			this.switchSave();
			this.loadScripts();
		}
	},
	load: function(str) {
		Game.mods['Cookieclysm'].loadStr = str;
	},
	save: function() {
		if (typeof C !== 'undefined' && C.save) return C.save();
		else return '';
	},
	loadScripts: function() {
		const Mod = this;
		const path = 'https://yeetdragon24.github.io/cookieclysm/';
		LoadScript(path + 'cookieclysm.js', function() {
		LoadScript(path + 'transcensions.js', function() {
        LoadScript(path + 'youMinigame.js', function() {
        LoadScript(path + 'sniperGold.js', function() {
		LoadScript(path + 'wizardPortal.js', function() { C.toLoad = true; Mod.load(Game.modSaveData['Cookieclysm']); })
		})})})});
	}, 	
	switchSave: function() {
		Game.WriteSave();
		Game.SaveTo = 'cclysmGame';
		Game.LoadSave();
	},
	wipeCookieclysm: function(){
		localStorage.removeItem('cclysmGame');
	},
	startingPrompt: function() {
		Game.Prompt(`<id CheckCclysm>
			<h3>Cookieclysm</h3>
			<div class="block">
				Some features of Cookieclysm require the game to use different save data than vanilla Cookie Clicker. The vanilla save data is not modified while Cookieclysm is loaded, and loadingCookieclysm will automatically load the Cookieclysm save data.
				<div class="line"></div>
				Cookieclysm creates save data using the existing save data, so you'll start off where you left off in vanilla Cookie Clicker.
				<div class="line"></div>
				Clicking "Got it" will save the game, create the new save data, and start using the new save data.
			</div>`,
		[['Got it','Game.mods[\'Cookieclysm\'].switchSave();Game.mods[\'Cookieclysm\'].loadScripts();Game.ClosePrompt();'], ['No','delete Game.mods[\'Cookieclysm\']; console.log(\'Mod "Cookieclysm" removed.\'); Game.ClosePrompt();']]);
	}
});
