if(Game.Objects['You'].minigame) throw new Error("amogus prevented from loading by already present You minigame.");

var M = {};
M.parent = Game.Objects['You'];
M.parent.minigame = M;


M.launch = function(){
	var M = this;
	M.init = function(div){
		var str = '<iframe src="https://nitrotype.com"></iframe>';
		div.innerHTML = str;
	}

	M.init(l('rowSpecial' + M.parent.id));
}


M.launcher = function(){
	var M = Game.Objects['You'].minigame;
	
	M.parent.minigameUrl = 'https://google.com';
	M.parent.minigameName = 'amogus';
	
	M.name = M.parent.minigameName;
	M.savePrefix = 'minigameAmogus';
	
	
	
	
	
	Game.LoadMinigames();
}

M.launcher();


var M = 0;
