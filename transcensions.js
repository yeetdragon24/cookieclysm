//i really need to start using setAttribute smh
let transcendence = document.createElement('div');
//var i=Game.Upgrades['Switchblade and bleach']
//transcendence.innerHTML=Game.crate(i,'ascend',false,i.id);
transcendence.id = 'transcend';
transcendence.style = 'width:' + Game.bounds.width + 'px;height:' + window.innerHeight + 'px;display:none;z-index:5000000;position:fixed;color:#000000;opacity:100%';
l('game').appendChild(transcendence);

new Crumbs.canvas(l('transcend'), 'transcend', 'transcendCanvas', `position: absolute; top: 0; left: 0;`);
Crumbs.prefs.objects.transcend = 1;

let transcendZoomable = document.createElement('div');
transcendZoomable.id = 'transcendZoomable';
l('transcend').appendChild(transcendZoomable);

let transcendContent = document.createElement('div');
transcendContent.id = 'transcendContent';

transcendContent.style = 'z-index:10200000;opacity:100%';
transcendZoomable.appendChild(transcendContent);

let transcendOverlay = document.createElement('div');
transcendOverlay.id = 'transcendOverlay';

let transcendAnimation = document.createElement('style');
transcendAnimation.innerHTML = '@keyframes transcend { from {opacity:0%;} to {opacity:100%;} }';
document.body.appendChild(transcendAnimation);
let transcendTransition = document.createElement('div');
transcendTransition.id = 'transcendTransition';//hopefully this works
transcendAnimationStyle = () => { transcendTransition.style = `width:  ${Game.bounds.width}px; height: ${Game.bounds.height}px; background-color: #000000; opacity: 0; animation-name: transcend; animation-duration: 4s; position:fixed; z-index: ${5e6}`; }
transcendAnimationStyle();

//i think this is style without background but idk
//name your variables properly kids
let styleWoBA = "text-align:center;font-weight:bold;font-size:14px;position:relative;font-variant:small-caps;display:inline-block;color:#ece2b6; text-shadow:0px 1px 0px #733726,0px 2px 0px #875626,0px 2px 1px #000,0px 2px 3px #000; font-family:Georgia,serif; font-size:15px;";
let transcendBox1 = document.createElement('div');
transcendBox1.innerHTML = '<h3>Transcend Power:</h3><br>' +
	'<h3 style="all:initial"><span id="transcendPower" style="' + styleWoBA + '">+' + 42069 + '</span><!--</h3>-->' +
	'<div class="smallFramed meterContainer" id="transcendMeterContainer"><div id="transcendMeter" class="meter filling"></div></div></h3>';
transcendBox1.style = 'margin-top:30px;width:60%;rotate:180deg;margin:auto;top:24px;position:relative';
transcendBox1.id = 'transcensionBox1';
transcendBox1.className = 'ascendData1 smallFramed prompt';
//i put so much time into this and its not even needed :(
//jk i dont even know how long this took
//probably less than 15 minutes
//i got bored and fixed it  (2 days after i removed it) lol

let transcendBox2 = document.createElement('div');
transcendBox2.innerHTML = '<h3 id="moneName">Moné:</h3><br>' +
	'<h3 style="all:initial;"><span class="transcendent price" id="mone" style="' + styleWoBA + '">' + 69420 + '</span></h3><br>';
transcendBox2.style = 'margin-top:0px;width:60%;rotate:180deg;margin:auto;top:26px;position:relative';
transcendBox2.id = 'transcensionBox1';
transcendBox2.className = 'ascendData2 smallFramed prompt';

let transcendButton = document.createElement('a');
transcendButton.innerHTML = '<span class="fancyText" style="font-size:20px;">Transcend</span>'
transcendButton.className = 'option framed large red';
transcendButton.id = 'transcendButton';
transcendButton.style.rotate = '180deg'; transcendButton.style.top = '24px'; transcendButton.style.position = 'relative';

let transcendModIco = document.createElement('div');
transcendModIco.innerHTML = '<div id="transcendModIcon" style="background-image:url(\'img/icons.png\'); background-position:-48px -48px;; width:48px;height:48px"></div>';
transcendModIco.style.right = '0px';
transcendModIco.style.bottom = '25px';
transcendModIco.style.position = 'absolute';
l('sectionLeft').appendChild(transcendModIco);

let transcendHTML = transcendence.innerHTML;
let ascendInfoCopy = document.createElement('div'); ascendInfoCopy.id = 'ascendInfoCopy';//l('ascendInfo').cloneNode(true);//ascendInfoCopy.style.position='fixed';ascendInfoCopy.style.top=window.innerHeight/1.25+'px';ascendInfoCopy.style.right='0px';ascendInfoCopy.style.margin='auto';ascendInfoCopy.style.left='0px';ascendInfoCopy.style.opacity='50%';ascendInfoCopy.style.backgroundImage='';//what the hell am i doing (putting it all in one line)
//screw it im just doing this 
ascendInfoCopy.innerHTML = '<div id="transcensionBox1" style="width: 60%; rotate: 180deg; margin: auto; top: 24px; position: relative;"><h3>Transcend Power:</h3><br><h3 style="all:initial"><span id="transcendPower" style="text-align:center;font-weight:bold;font-size:14px;position:relative;font-variant:small-caps;display:inline-block;color:#ece2b6; text-shadow:0px 1px 0px #733726,0px 2px 0px #875626,0px 2px 1px #000,0px 2px 3px #000; font-family:Georgia,serif; font-size:15px;">15</span>\x3C!--</h3>--><div class="smallFramed meterContainer" id="transcendMeterContainer" style="width: 70%; margin: auto;"><div id="transcendMeter" class="meter filling" style="background-position: -9519px center; width: 0%;"></div></div></h3></div><div id="transcensionBox1" style="width: 60%; rotate: 180deg; margin: auto; top: 26px; position: relative;"><h3>Moné:</h3><br><h3 style="all:initial;"><span class="price transcendent" id="mone" style="text-align:center;font-weight:bold;font-size:14px;position:relative;font-variant:small-caps;display:inline-block;color:#ece2b6; text-shadow:0px 1px 0px #733726,0px 2px 0px #875626,0px 2px 1px #000,0px 2px 3px #000; font-family:Georgia,serif; font-size:15px;">0</span></h3><br></div>';


let transcendBounds = { left: -1000, right: 1000, top: 1000, bottom: -1000 };
buildTranscendTree = function() {
	var str = '';
	for (var i of transcendentUpgrades) {
		//if (i.id >= tUSA) {
		var shown = 1;
		for (let ii of i.parents) {
			if (!ii.bought) shown = 0; 
		}
		//str+=Game.crate(i,'ascend','Game.Upgrades[\''+i.name+'\'].transcendBuy();',undefined,'top:'+GU[i.id][0]+'px;left:'+GU[i.id][1]+'px;z-index:4534225;opacity:'+(shown?50:5)+'%');
		//str+='<div data-id="'+i.id+'" onclick="Game.Upgrades[\''+i.name+'\'].tier++;" class="crate upgrade heavenly" onmouseout="Game.setOnCrate(0);Game.tooltip.shouldHide=1;" onmouseover="if (!Game.mouseDown) {Game.setOnCrate(this);Game.tooltip.dynamic=1;Game.tooltip.draw(this,function(){return function(){return \'<div style=\'position:absolute;left:1px;top:1px;right:1px;bottom:1px;background:linear-gradient(125deg,rgba(15,115,130,1) 0%,rgba(15,115,130,0) 20%);mix-blend-mode:screen;z-index:1;\'></div><div style=\'z-index:10;padding:8px 4px;min-width:350px;position:relative;\' id=\'tooltipCrate\'><div class=\'icon\' style=\'float:left;margin-left:-8px;margin-top:-8px;background-position:-816px -192px;\'></div><div style=\'float:right;text-align:right;\'><span class=\'price heavenly disabled\'>'+i.getPrice()+'</span></div><div class=\'name\'>Twitter account '+i.tier+'</div><div class=\'tag\' style=\'background-color:#efa438;\'>Heavenly</div><div class=\'line\'></div><div class=\'description\'>'+i.desc+'</div></div><div style=\'font-size:9px;\'>Id: '+i.id+' | Order: '+i.order+' | Tier: '+i.tier+' | Icon: ['+i.icon[0]+','+i.icon[1]+']</div>\'}();},\'top\');Game.tooltip.wobble();}" style="background-position:-816px -192px;position:absolute;left:undefinedpx;top:undefinedpx;top:400px;left:500px;z-index:4534225"></div>';
		//}
		let parentsOwned = 0;
		for (let ii of i.parents) if (ii.bought) parentsOwned++;
		if (parentsOwned == i.parents.length) i.canBePurchased = 1;
		if (i.canBePurchased) str += Game.crate(i, 'ascend', 'Game.Upgrades[\'' + i.name + '\'].transcendBuy();', undefined, 'top:' + GU[i.id][0] + 'px;left:' + GU[i.id][1] + 'px;z-index:4534225;opacity:' + (shown ? 50 : 5) + '%');
		//orteil doesnt like it but it works because game.crate doesnt yet support this
		else str += '<div class="crate upgrade heavenly ghosted" id="heavenlyUpgrade' + i.id + '" style="position:absolute;left:' + GU[i.id][1] + 'px;top:' + GU[i.id][0] + 'px;opacity:0.1;' + writeIcon(i.icon) + '"></div>';
		for (var ii in i.parents)//create pulsing links
		{
			ghosted = i.canBePurchased;
			if (i.parents[ii] != -1 && (i.canBePurchased || ghosted)) {
				var origX = 0;
				var origY = 0;
				var targX = GU[i.id][1] + 28;
				var targY = GU[i.id][0] + 28;
				if (i.parents[ii] != -1) { origX = GU[i.parents[ii].id][1] + 28; origY = GU[i.parents[ii].id][0] + 28; }
				var rot = -(Math.atan((targY - origY) / (origX - targX)) / Math.PI) * 180;
				if (targX <= origX) rot += 180;
				var dist = Math.floor(Math.sqrt((targX - origX) * (targX - origX) + (targY - origY) * (targY - origY)));
				str += '<div class="parentLink" id="heavenlyLink' + i.id + '-' + ii + '" style="opacity:' + (ghosted ? '0.25;' : '0.05;') + 'width:' + dist + 'px;-webkit-transform:rotate(' + rot + 'deg);-moz-transform:rotate(' + rot + 'deg);-ms-transform:rotate(' + rot + 'deg);-o-transform:rotate(' + rot + 'deg);transform:rotate(' + rot + 'deg);left:' + (origX) + 'px;top:' + (origY) + 'px;"></div>';
			}
		}
	}

	l('transcendContent').innerHTML = str;
}

var [transcendOffX, transcendOffY, transcendOffXT, transcendOffYT, transcendZoom, transcendZoomT] = [0, 0, 0, 0, 1, 1];
var [transcendDragX, transcendDragY, transcendDragging] = [0, 0, 0];

updateTranscend = function() {
	if (Game.keys[37]) transcendOffXT += 16 * (1 / transcendZoomT);
	if (Game.keys[38]) transcendOffYT += 16 * (1 / transcendZoomT);
	if (Game.keys[39]) transcendOffXT -= 16 * (1 / transcendZoomT);
	if (Game.keys[40]) transcendOffYT -= 16 * (1 / transcendZoomT);

	//if (transcendOffXT>-transcendBounds.left) transcendOffXT=-transcendBounds.left;
	//if (transcendOffXT<-transcendBounds.right) transcendOffXT=-transcendBounds.right;
	//if (transcendOffXT>-transcendBounds.top) transcendOffYT=-transcendBounds.top;
	//if (transcendOffYT<-transcendBounds.bottom) transcendOffYT=-transcendBounds.bottom;
	transcendOffX += (transcendOffXT - transcendOffX) * 0.5;
	transcendOffY += (transcendOffYT - transcendOffY) * 0.5;
	transcendZoom += (transcendZoomT - transcendZoom) * 0.25;
	if (Math.abs(transcendZoomT - transcendZoom) < 0.005) transcendZoom = transcendZoomT;
	if (Math.abs(transcendOffXT - transcendOffX) < 0.005) transcendOffX = transcendOffXT;
	if (Math.abs(transcendOffYT - transcendOffY) < 0.005) transcendOffY = transcendOffYT;


	if (Game.mouseDown && !Game.promptOn) {
		if (!transcendDragging) {
			transcendDragX = Game.mouseX;
			transcendDragY = Game.mouseY;
		}
		if (document.elementFromPoint(Game.mouseX, Game.mouseY) && !document.elementFromPoint(Game.mouseX, Game.mouseY).getAttribute('data-id')) transcendDragging = 1;

		if (!Game.SelectedHeavenlyUpgrade) {
			transcendOffXT += (Game.mouseX - transcendDragX);
			transcendOffYT += (Game.mouseY - transcendDragY);
		}
		transcendDragX = Game.mouseX;
		transcendDragY = Game.mouseY;
	}
	else {
		transcendDragging = 0;
		//Game.SelectedHeavenlyUpgrade=0;
	}
	if (Game.Click || Game.promptOn) {
		transcendDragging = 0;
	}
	let transcendContent = l('transcendContent');
	let transcendZoomable = l('transcendZoomable');
	//Game.ascendl.style.backgroundPosition=Math.floor(Game.AscendOffX/2)+'px '+Math.floor(Game.AscendOffY/2)+'px';
	//Game.ascendl.style.backgroundPosition=Math.floor(Game.AscendOffX/2)+'px '+Math.floor(Game.AscendOffY/2)+'px,'+Math.floor(Game.AscendOffX/4)+'px '+Math.floor(Game.AscendOffY/4)+'px';
	//transcendUl.style.left=Math.floor(Game.AscendOffX)+'px';
	//transcendUl.style.top=Math.floor(Game.AscendOffY)+'px';
	transcendContent.style.webkitTransform = 'translate(' + Math.floor(transcendOffX) + 'px,' + Math.floor(transcendOffY) + 'px)';
	transcendContent.style.msTransform = 'translate(' + Math.floor(transcendOffX) + 'px,' + Math.floor(transcendOffY) + 'px)';
	transcendContent.style.oTransform = 'translate(' + Math.floor(transcendOffX) + 'px,' + Math.floor(transcendOffY) + 'px)';
	transcendContent.style.mozTransform = 'translate(' + Math.floor(transcendOffX) + 'px,' + Math.floor(transcendOffY) + 'px)';
	transcendContent.style.transform = 'translate(' + Math.floor(transcendOffX) + 'px,' + Math.floor(transcendOffY) + 'px)';
	transcendZoomable.style.webkitTransform = 'scale(' + (transcendZoom) + ',' + (transcendZoom) + ')';
	transcendZoomable.style.marginLeft = (Game.windowW / 2) + 'px';
	transcendZoomable.style.marginTop = (Game.windowH / 2) + 'px';
	transcendZoomable.style.msTransform += ' scale(' + (transcendZoom) + ',' + (transcendZoom) + ')';
	transcendZoomable.style.oTransform += ' scale(' + (transcendZoom) + ',' + (transcendZoom) + ')';
	transcendZoomable.style.mozTransfor += ' scale(' + (transcendZoom) + ',' + (transcendZoom) + ')';
	transcendZoomable.style.transform += ' scale(' + (transcendZoom) + ',' + (transcendZoom) + ')';

	//if (Game.Scroll!=0) Game.ascendContentl.style.transformOrigin=Math.floor(Game.windowW/2-Game.mouseX)+'px '+Math.floor(Game.windowH/2-Game.mouseY)+'px';
	if (Game.Scroll < 0 && !Game.promptOn) { transcendZoomT = 0.8; }
	if (Game.Scroll > 0 && !Game.promptOn) { transcendZoomT = 1; }
}


let onUnlockTranscend = function() {
	l('ascendInfo').style = 'background:url(img/ascendBox.png);width:344px;height:162px;position:absolute;bottom:-20px;text-align:center;rotate:180deg;margin:auto}'
	l('ascendInfo').replaceChild(transcendBox1, l('ascendInfo').childNodes[0]);
	if (!l('ascendInfo').childNodes[1]) l('ascendInfo').appendChild(transcendBox2); else l('ascendInfo').replaceChild(transcendBox2, l('ascendInfo').childNodes[1]);
	if (!l('ascendInfo').childNodes[2]) l('ascendInfo').appendChild(transcendButton); else l('ascendInfo').replaceChild(transcendButton, l('ascendInfo').childNodes[2]);
	//'<div style="background-image:url(img/icons.png);background-position:528px 1200px;"></div>'
	l('transcendMeterContainer').style.width = '70%'; l('transcendMeterContainer').style.margin = 'auto';
	Game.attachTooltip(l('transcendButton'), function() { return '<div style="min-width:300px;text-align:center;font-size:11px;padding:8px;" id="tooltipTranscendButton">Upon transcending, you will gain ' + moneName + ' based on how much transcend power you gained since your last transcension.<br>' + moneName + ' can be spent on Transcendent Upgrades.</div>'; }, 'bottom-right');
	AddEvent(l('transcendButton'), 'click', function() {
		PlaySound('snd/tick.mp3');
		transcend();
	});

	ascendInfoCopy = l('ascendInfo').cloneNode(true);
	ascendInfoCopy.id = 'ascendInfoCopy';
	ascendInfoCopy.style.position = 'absolute';
	ascendInfoCopy.style.right = '0px'; ascendInfoCopy.style.left = '0px';
	ascendInfoCopy.style.margin = 'auto'; ascendInfoCopy.style.marginBottom = '0px';
	ascendInfoCopy.style.opacity = '50%';
	ascendInfoCopy.style.backgroundImage = '';
	ascendInfoCopy.className = 'ascendCopy'; ascendInfoCopy.childNodes[0].className += ' ascendCopy';
	///*screw it im just doing this*/ ascendInfoCopy.innerHTML='<div id="transcensionBox1" style="width: 60%; rotate: 180deg; margin: auto; top: 24px; position: relative;"><h3>Transcend Power:</h3><br><h3 style="all:initial"><span id="transcendPower" style="text-align:center;font-weight:bold;font-size:14px;position:relative;font-variant:small-caps;display:inline-block;color:#ece2b6; text-shadow:0px 1px 0px #733726,0px 2px 0px #875626,0px 2px 1px #000,0px 2px 3px #000; font-family:Georgia,serif; font-size:15px;">15</span>\x3C!--</h3>--><div class="smallFramed meterContainer" id="transcendMeterContainer" style="width: 70%; margin: auto;"><div id="transcendMeter" class="meter filling" style="background-position: -9519px center; width: 0%;"></div></div></h3></div><div id="transcensionBox1" style="width: 60%; rotate: 180deg; margin: auto; top: 26px; position: relative;"><h3>Moné:</h3><br><h3 style="all:initial;"><span class="price transcendent" id="mone" style="text-align:center;font-weight:bold;font-size:14px;position:relative;font-variant:small-caps;display:inline-block;color:#ece2b6; text-shadow:0px 1px 0px #733726,0px 2px 0px #875626,0px 2px 1px #000,0px 2px 3px #000; font-family:Georgia,serif; font-size:15px;">0</span></h3><br></div>';
	l('transcend').appendChild(ascendInfoCopy);
	
	ascendInfoCopy.childNodes[2].childNodes[0].innerHTML = 'Return';
	ascendInfoCopy.childNodes[2].style.backgroundColor = '#000000';
	ascendInfoCopy.childNodes[2].style.top = '30px';
	ascendInfoCopy.childNodes[2].className = 'framed option large';//uh hopefully this works (leave transcend button styling)
	AddEvent(l('ascendInfoCopy').childNodes[2],'click',function(){
			PlaySound('snd/tick.mp3');
			leaveTranscend();
		});

	ascendInfoCopy.childNodes[0].className = 'prompt'; //idk man it works decently
	ascendInfoCopy.childNodes[1].className = 'prompt';
}
let loadTranscend = function() {
	//l('transcendMeterContainer').style.margin='auto';
	l('topBar').style.zIndex = `${2**31}`;
	transcendHTML = l('transcend').innerHTML;

	Game.transcendReady = 1;
}
transcendOnResize = function() {
	l('transcend').style.width = `${Game.bounds.width}px`;
	l('transcend').style.height = `${Game.bounds.height}px`;
	l('transcend').style.top = `${Game.bounds.top}px`;
}
addEventListener('resize', transcendOnResize);

Game.transcendUnlocked = 0;

Game.registerHook('check', function() {
	if (Game.prestige >= 1e15) {
		Game.transcendUnlocked = true;
		onUnlockTranscend();
	}
});
Game.registerHook('logic', () => !Game.transcendReady && loadTranscend());
