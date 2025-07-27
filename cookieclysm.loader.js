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
		const path = 'https://yeetdragon24.github.io/cookieclysm/';
        window.icons = path + 'img/icons.png';
		LoadScript('https://cursedsliver.github.io/Crumbs-engine/Crumbs.js', function() {
            l('CrumbsEngineVersion').innerHTML = '';
            setTimeout(function loadModScripts() {
                if (!CrumbsEngineLoaded) setTimeout(loadModScripts, 500);
                LoadScript(path + 'cookieclysm.js', function() {
                    //no particular loading order needed;
                    LoadScript(path + 'transcensions.js');
                    LoadScript(path + 'youMinigame.js');
                    LoadScript(path + 'sniperGold.js');
                    LoadScript(path + 'crumbs.js');
                    LoadScript(path + 'wizardPortal.js');
                    C.stylesheet = document.createElement('link');
                    C.stylesheet.id = 'cookieclysmCss';
                    C.stylesheet.rel = 'stylesheet';
                    C.stylesheet.type = 'text/css';
                    C.stylesheet.href = path + 'cookieclysmStyles.css';
                    document.head.appendChild(C.stylesheet);
                });
            }, 250);
        });  
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