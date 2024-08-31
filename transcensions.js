//i really need to start using setAttribute smh
let transcendence = document.createElement('div');
//var i=Game.Upgrades['Switchblade and bleach']
//transcendence.innerHTML=Game.crate(i,'ascend',false,i.id);
transcendence.id = 'transcend';
transcendence.style = 'width:' + Game.bounds.width + 'px;height:' + window.innerHeight + 'px;display:none;z-index:5000000;position:fixed;color:#000000;opacity:100%';
l('game').appendChild(transcendence);

new Crumbs.canvas(l('transcend'), 'transcend', 'transcendCanvas', `position: absolute; top: 0; left: 0;`);

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

let transcendHTML = transcendence.innerHTML;
let ascendInfoCopy = document.createElement('div'); ascendInfoCopy.id = 'ascendInfoCopy';//l('ascendInfo').cloneNode(true);//ascendInfoCopy.style.position='fixed';ascendInfoCopy.style.top=window.innerHeight/1.25+'px';ascendInfoCopy.style.right='0px';ascendInfoCopy.style.margin='auto';ascendInfoCopy.style.left='0px';ascendInfoCopy.style.opacity='50%';ascendInfoCopy.style.backgroundImage='';//what the hell am i doing (putting it all in one line)
//screw it im just doing this 
ascendInfoCopy.innerHTML = '<div id="transcensionBox1" style="width: 60%; rotate: 180deg; margin: auto; top: 24px; position: relative;"><h3>Transcend Power:</h3><br><h3 style="all:initial"><span id="transcendPower" style="text-align:center;font-weight:bold;font-size:14px;position:relative;font-variant:small-caps;display:inline-block;color:#ece2b6; text-shadow:0px 1px 0px #733726,0px 2px 0px #875626,0px 2px 1px #000,0px 2px 3px #000; font-family:Georgia,serif; font-size:15px;">15</span>\x3C!--</h3>--><div class="smallFramed meterContainer" id="transcendMeterContainer" style="width: 70%; margin: auto;"><div id="transcendMeter" class="meter filling" style="background-position: -9519px center; width: 0%;"></div></div></h3></div><div id="transcensionBox1" style="width: 60%; rotate: 180deg; margin: auto; top: 26px; position: relative;"><h3>Moné:</h3><br><h3 style="all:initial;"><span class="price transcendent" id="mone" style="text-align:center;font-weight:bold;font-size:14px;position:relative;font-variant:small-caps;display:inline-block;color:#ece2b6; text-shadow:0px 1px 0px #733726,0px 2px 0px #875626,0px 2px 1px #000,0px 2px 3px #000; font-family:Georgia,serif; font-size:15px;">0</span></h3><br></div>';


C.transcendBounds = { left: -1000, right: 1000, top: 1000, bottom: -1000 };
C.buildTranscendTree = function() {
	var str = '';
	for (var i of C.transcendentUpgrades) {
		var shown = 1;
		for (let ii of i.parents) {
			if (!ii.bought) shown = 0; 
		}
		let parentsOwned = 0;
		for (let ii of i.parents) if (ii.bought) parentsOwned++;
		if (parentsOwned == i.parents.length) i.canBePurchased = 1;
		if (i.canBePurchased) str += Game.crate(i, 'ascend', 'Game.Upgrades[\'' + i.name + '\'].transcendBuy();', undefined, 'position:absolute;top:' + GU[i.id][1] + 'px;left:' + GU[i.id][0] + 'px;z-index:4534225;opacity:' + (shown ? 50 : 5) + '%');
		//orteil doesnt like it but it works because game.crate doesnt yet support this
		else str += '<div class="crate upgrade heavenly ghosted" id="heavenlyUpgrade' + i.id + '" style="position:absolute;left:' + GU[i.id][0] + 'px;top:' + GU[i.id][1] + 'px;opacity:0.1;' + writeIcon(i.icon) + '"></div>';
		for (var ii in i.parents)//create pulsing links
		{
			ghosted = i.canBePurchased;
			if (i.parents[ii] != -1 && (i.canBePurchased || ghosted)) {
				var origX = 0;
				var origY = 0;
				var targX = GU[i.id][0] + 28;
				var targY = GU[i.id][1] + 28;
				if (i.parents[ii] != -1) { origX = GU[i.parents[ii].id][0] + 28; origY = GU[i.parents[ii].id][1] + 28; }
				var rot = -(Math.atan((targY - origY) / (origX - targX)) / Math.PI) * 180;
				if (targX <= origX) rot += 180;
				var dist = Math.floor(Math.sqrt((targX - origX) * (targX - origX) + (targY - origY) * (targY - origY)));
				str += '<div class="parentLink" id="heavenlyLink' + i.id + '-' + ii + '" style="opacity:' + (ghosted ? '0.25;' : '0.05;') + 'width:' + dist + 'px;-webkit-transform:rotate(' + rot + 'deg);-moz-transform:rotate(' + rot + 'deg);-ms-transform:rotate(' + rot + 'deg);-o-transform:rotate(' + rot + 'deg);transform:rotate(' + rot + 'deg);left:' + (origX) + 'px;top:' + (origY) + 'px;"></div>';
			}
		}
	}

	l('transcendContent').innerHTML = str;
};

[C.transcendOffX, C.transcendOffY, C.transcendOffXT, C.transcendOffYT, C.transcendZoom, C.transcendZoomT] = [0, 0, 0, 0, 1, 1];
[C.transcendDragX, C.transcendDragY, C.transcendDragging] = [0, 0, 0];

C.updateTranscend = function() {
	if (Game.keys[37]) C.transcendOffXT += 16 * (1 / C.transcendZoomT);
	if (Game.keys[38]) C.transcendOffYT += 16 * (1 / C.transcendZoomT);
	if (Game.keys[39]) C.transcendOffXT -= 16 * (1 / C.transcendZoomT);
	if (Game.keys[40]) C.transcendOffYT -= 16 * (1 / C.transcendZoomT);

	//if (transcendOffXT>-C.transcendBounds.left) transcendOffXT=-C.transcendBounds.left;
	//if (transcendOffXT<-C.transcendBounds.right) transcendOffXT=-C.transcendBounds.right;
	//if (transcendOffXT>-C.transcendBounds.top) transcendOffYT=-C.transcendBounds.top;
	//if (transcendOffYT<-C.transcendBounds.bottom) transcendOffYT=-C.transcendBounds.bottom;
	C.transcendOffX += (C.transcendOffXT - C.transcendOffX) * 0.5;
	C.transcendOffY += (C.transcendOffYT - C.transcendOffY) * 0.5;
	C.transcendZoom += (C.transcendZoomT - C.transcendZoom) * 0.25;
	if (Math.abs(C.transcendZoomT - C.transcendZoom) < 0.005) C.transcendZoom = C.transcendZoomT;
	if (Math.abs(C.transcendOffXT - C.transcendOffX) < 0.005) C.transcendOffX = C.transcendOffXT;
	if (Math.abs(C.transcendOffYT - C.transcendOffY) < 0.005) C.transcendOffY = C.transcendOffYT;


	if (Game.mouseDown && !Game.promptOn) {
		if (!C.transcendDragging) {
			C.transcendDragX = Game.mouseX;
			C.transcendDragY = Game.mouseY;
		}
		if (document.elementFromPoint(Game.mouseX, Game.mouseY) && !document.elementFromPoint(Game.mouseX, Game.mouseY).getAttribute('data-id')) C.transcendDragging = 1;

		if (!Game.SelectedHeavenlyUpgrade) {
			C.transcendOffXT += (Game.mouseX - C.transcendDragX);
			C.transcendOffYT += (Game.mouseY - C.transcendDragY);
		}
		C.transcendDragX = Game.mouseX;
		C.transcendDragY = Game.mouseY;
	}
	else {
		C.transcendDragging = 0;
		//Game.SelectedHeavenlyUpgrade=0;
	}
	if (Game.Click || Game.promptOn) {
		C.transcendDragging = 0;
	}
	let transcendContent = l('transcendContent');
	let transcendZoomable = l('transcendZoomable');
	//Game.ascendl.style.backgroundPosition=Math.floor(Game.AscendOffX/2)+'px '+Math.floor(Game.AscendOffY/2)+'px';
	//Game.ascendl.style.backgroundPosition=Math.floor(Game.AscendOffX/2)+'px '+Math.floor(Game.AscendOffY/2)+'px,'+Math.floor(Game.AscendOffX/4)+'px '+Math.floor(Game.AscendOffY/4)+'px';
	//transcendUl.style.left=Math.floor(Game.AscendOffX)+'px';
	//transcendUl.style.top=Math.floor(Game.AscendOffY)+'px';
	transcendContent.style.webkitTransform = 'translate(' + Math.floor(C.transcendOffX) + 'px,' + Math.floor(C.transcendOffY) + 'px)';
	transcendContent.style.msTransform = 'translate(' + Math.floor(C.transcendOffX) + 'px,' + Math.floor(C.transcendOffY) + 'px)';
	transcendContent.style.oTransform = 'translate(' + Math.floor(C.transcendOffX) + 'px,' + Math.floor(C.transcendOffY) + 'px)';
	transcendContent.style.mozTransform = 'translate(' + Math.floor(C.transcendOffX) + 'px,' + Math.floor(C.transcendOffY) + 'px)';
	transcendContent.style.transform = 'translate(' + Math.floor(C.transcendOffX) + 'px,' + Math.floor(C.transcendOffY) + 'px)';
	transcendZoomable.style.webkitTransform = 'scale(' + (C.transcendZoom) + ',' + (C.transcendZoom) + ')';
	transcendZoomable.style.marginLeft = (Game.windowW / 2) + 'px';
	transcendZoomable.style.marginTop = (Game.windowH / 2) + 'px';
	transcendZoomable.style.msTransform += ' scale(' + (C.transcendZoom) + ',' + (C.transcendZoom) + ')';
	transcendZoomable.style.oTransform += ' scale(' + (C.transcendZoom) + ',' + (C.transcendZoom) + ')';
	transcendZoomable.style.mozTransfor += ' scale(' + (C.transcendZoom) + ',' + (C.transcendZoom) + ')';
	transcendZoomable.style.transform += ' scale(' + (C.transcendZoom) + ',' + (C.transcendZoom) + ')';

	//if (Game.Scroll!=0) Game.ascendContentl.style.transformOrigin=Math.floor(Game.windowW/2-Game.mouseX)+'px '+Math.floor(Game.windowH/2-Game.mouseY)+'px';
	if (Game.Scroll < 0 && !Game.promptOn) { C.transcendZoomT = 0.8; }
	if (Game.Scroll > 0 && !Game.promptOn) { C.transcendZoomT = 1; }
}


C.onUnlockTranscend = function() {
	l('ascendInfo').style = 'background:url(img/ascendBox.png);width:344px;height:162px;position:absolute;bottom:-20px;text-align:center;rotate:180deg;margin:auto}'
	l('ascendInfo').replaceChild(transcendBox1, l('ascendInfo').childNodes[0]);
	if (!l('ascendInfo').childNodes[1]) l('ascendInfo').appendChild(transcendBox2); else l('ascendInfo').replaceChild(transcendBox2, l('ascendInfo').childNodes[1]);
	if (!l('ascendInfo').childNodes[2]) l('ascendInfo').appendChild(transcendButton); else l('ascendInfo').replaceChild(transcendButton, l('ascendInfo').childNodes[2]);
	//'<div style="background-image:url(img/icons.png);background-position:528px 1200px;"></div>'
	l('transcendMeterContainer').style.width = '70%'; l('transcendMeterContainer').style.margin = 'auto';
	Game.attachTooltip(l('transcendButton'), function() {
		return `<div style="min-width:300px;text-align:center;font-size:11px;padding:8px;" id="tooltipTranscendButton">Upon transcending, you will gain ${moneName} based on how much transcend power you gained since your last transcension.<br>${moneName} can be spent on Transcendent Upgrades.</div>`;
	}, 'top-right');
	AddEvent(l('transcendButton'), 'click', function() {
		PlaySound('snd/tick.mp3');
		C.transcend();
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
	Game.attachTooltip(l('transcensionBox1'), function() {
		return `<div style="min-width:300px;text-align:center;font-size:11px;padding:8px;" id="tooltipTranscendPower">You gain 1 transcend power for every digit in your cookie count.<br>You currently have ${transcendPower} transcend power, buffing your CpS by a base +${Beautify(transcendPower * 100)}%.</div>`
	}, 'top-right');
	
	ascendInfoCopy.childNodes[2].childNodes[0].innerHTML = 'Return';
	ascendInfoCopy.childNodes[2].style.backgroundColor = '#000000';
	ascendInfoCopy.childNodes[2].style.top = '30px';
	ascendInfoCopy.childNodes[2].className = 'framed option large';//uh hopefully this works (leave transcend button styling)
	AddEvent(l('ascendInfoCopy').childNodes[2], 'click', function() {
		PlaySound('snd/tick.mp3');
		C.leaveTranscend();
	});

	ascendInfoCopy.childNodes[0].className = 'prompt'; //idk man it works decently
	ascendInfoCopy.childNodes[1].className = 'prompt';
}
C.loadTranscend = function() {
	//l('transcendMeterContainer').style.margin='auto';
	l('topBar').style.zIndex = `${2**31}`;
	transcendHTML = l('transcend').innerHTML;

	C.transcendReady = 1;
}
C.transcendOnResize = function() {
	l('transcend').style.width = `${Game.bounds.width}px`;
	l('transcend').style.height = `${Game.bounds.height}px`;
	l('transcend').style.top = `${Game.bounds.top}px`;
}
window.addEventListener('resize', C.transcendOnResize);

C.transcendUnlocked = false;

Game.registerHook('logic', function() {
	if (Game.T % 2 == 0 || C.transcendUnlocked) return;
	if(!C.transcendReady) {
		C.loadTranscend();
	}
	if (C.transcendReady && Game.prestige >= 1e15) {
		C.transcendUnlocked = true;
		onUnlockTranscend();
	}
});
