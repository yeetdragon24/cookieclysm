Game.registerMod('Cookieclysm', {
	init: function() {
		this.SwitchSave=function(){
			Game.WriteSave();
			Game.SaveTo='cclysmGame';
		}
		this.WipeCookieclysm=function(){
			delete localStorage['cclysmGame'];
		}

		this.loadScripts();
	},
	load: function(str) {
		window.CookieclysmLoadStr = str;
	},
	save: function() {
		if (C.save) return C.save();
		else return '';
	},
	loadScripts: function() {
		let dir='https://yeetdragon24.github.io/cookieclysm/';
		LoadScript(dir + 'cookieclysm.js', function() {
		LoadScript(dir + 'transcensions.js', function() {
		LoadScript(dir + 'youMinigame.js', function() {
		LoadScript(dir + 'sniperGold.js', function() {
		LoadScript(dir + 'wizardPortal.js')
		})})})});
	}
});
