Game.registerMod('Cookieclysm', {
	init: function() {
        window.Cookieclysm = this;
		if (localStorage.getItem('cclysmGame') === null) {
			this.startingPrompt();
		}
		else {
			this.switchSave();
			this.loadScripts();
		}
	},
	load: function(str) {
        if (!Cookieclysm.loadStr) Cookieclysm.loadStr = str;
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
		LoadScript(path + 'wizardPortal.js', function() { Game.mods['Cookieclysm'].loaded = true; Mod.toLoad = true; })
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
    unloadCookieclysm: function() {
        delete Game.mods['Cookieclysm'];
        delete window.Cookieclysm;
        delete window.C;
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
                <div class="line"></div>
                Join our <a href="https://discord.gg/bR4qKSJuCS">Discord server</a>!
			</div>`,
		[['Got it','Cookieclysm.switchSave(); Cookieclysm.loadScripts();Game.ClosePrompt();'], ['No','Cookieclysm.unloadCookieclysm(); console.log(\'Mod "Cookieclysm" removed.\'); Game.ClosePrompt();']]);
	}
});
