//i really need to start using setAttribute smh
var transcendence=document.createElement('div');
//var i=Game.Upgrades['Switchblade and bleach']
//transcendence.innerHTML=Game.crate(i,'ascend',false,i.id);
transcendence.id='transcend';
transcendence.style='width:'+Game.bounds.width+'px;height:'+window.innerHeight+'px;display:none;z-index:5000000;position:fixed;color:#000000;opacity:100%';
l('game').appendChild(transcendence);

var transcendContent=document.createElement('div');
transcendContent.id='transcendContent';
buildTranscendTree=function(){
	var str='';
	for (var i of transcendentUpgrades) {
		//if (i.id >= tUSA) {
			str+=Game.crate(i,'ascend','Game.Upgrades[\''+i.name+'\'].transcendBuy();',undefined,'top:'+GU[i.id][0]+'px;left:'+GU[i.id][1]+'px;z-index:4534225;opacity:50%');
			//str+='<div data-id="'+i.id+'" onclick="Game.Upgrades[\''+i.name+'\'].tier++;" class="crate upgrade heavenly" onmouseout="Game.setOnCrate(0);Game.tooltip.shouldHide=1;" onmouseover="if (!Game.mouseDown) {Game.setOnCrate(this);Game.tooltip.dynamic=1;Game.tooltip.draw(this,function(){return function(){return \'<div style=\'position:absolute;left:1px;top:1px;right:1px;bottom:1px;background:linear-gradient(125deg,rgba(15,115,130,1) 0%,rgba(15,115,130,0) 20%);mix-blend-mode:screen;z-index:1;\'></div><div style=\'z-index:10;padding:8px 4px;min-width:350px;position:relative;\' id=\'tooltipCrate\'><div class=\'icon\' style=\'float:left;margin-left:-8px;margin-top:-8px;background-position:-816px -192px;\'></div><div style=\'float:right;text-align:right;\'><span class=\'price heavenly disabled\'>'+i.getPrice()+'</span></div><div class=\'name\'>Twitter account '+i.tier+'</div><div class=\'tag\' style=\'background-color:#efa438;\'>Heavenly</div><div class=\'line\'></div><div class=\'description\'>'+i.desc+'</div></div><div style=\'font-size:9px;\'>Id: '+i.id+' | Order: '+i.order+' | Tier: '+i.tier+' | Icon: ['+i.icon[0]+','+i.icon[1]+']</div>\'}();},\'top\');Game.tooltip.wobble();}" style="background-position:-816px -192px;position:absolute;left:undefinedpx;top:undefinedpx;top:400px;left:500px;z-index:4534225"></div>';
		//}
	}
	for (var ii in i.parents)//create pulsing links
		{
			if (i.parents[ii]!=-1 && (i.canBePurchased || ghosted))
			{
				var origX=0;
				var origY=0;
				var targX=GU[i.id][0]+28;
				var targY=GU[i.id][1]+28;
				if (i.parents[ii]!=-1) {origX=i.parents[ii].posX+28;origY=i.parents[ii].posY+28;}
				var rot=-(Math.atan((targY-origY)/(origX-targX))/Math.PI)*180;
				if (targX<=origX) rot+=180;
				var dist=Math.floor(Math.sqrt((targX-origX)*(targX-origX)+(targY-origY)*(targY-origY)));
				str+='<div class="parentLink" id="heavenlyLink'+i.id+'-'+ii+'" style="'+(ghosted?'opacity:0.1;':'')+'width:'+dist+'px;-webkit-transform:rotate('+rot+'deg);-moz-transform:rotate('+rot+'deg);-ms-transform:rotate('+rot+'deg);-o-transform:rotate('+rot+'deg);transform:rotate('+rot+'deg);left:'+(origX)+'px;top:'+(origY)+'px;"></div>';
			}
		}
	l('transcendContent').innerHTML=str;
}
transcendContent.style='z-index:10200000;opacity:100%';
l('transcend').appendChild(transcendContent);

var transcendOverlay=document.createElement('div');
transcendOverlay.id='transcendOverlay';

var transcendAnimation=document.createElement('style');
transcendAnimation.innerHTML='@keyframes example { from {opacity:0%;} to {opacity:100%;} }';
document.body.appendChild(transcendAnimation);
var transcendTransition=document.createElement('div');
transcendTransition.id='transcendTransition';//hopefully this works
transcendTransition.style='width:'+Game.bounds.width+'px;height:'+window.innerHeight+'px;background-color:#000000;opacity:0%;animation-name:example;animation-duration:4s;position:fixed;z-index:5000000';

//i think this is style without background but idk
//name your variables properly kids
var styleWoBA="text-align:center;font-weight:bold;font-size:14px;position:relative;font-variant:small-caps;display:inline-block;color:#ece2b6; text-shadow:0px 1px 0px #733726,0px 2px 0px #875626,0px 2px 1px #000,0px 2px 3px #000; font-family:Georgia,serif; font-size:15px;";
var transcendBox1=document.createElement('div');
transcendBox1.innerHTML='<h3>Transcend Power:</h3><br>'+
'<h3 style="all:initial"><span id="transcendPower" style="'+styleWoBA+'">+'+42069+'</span><!--</h3>-->'+
'<div class="smallFramed meterContainer" id="transcendMeterContainer"><div id="transcendMeter" class="meter filling"></div></div></h3>';
transcendBox1.style='margin-top:30px;width:60%;rotate:180deg;margin:auto;top:24px;position:relative';
transcendBox1.id='transcencionBox1';
transcendBox1.className='ascendData1 smallFramed prompt';
//i put so much time into this and its not even needed :(
//jk i dont even know how long this took
//probably less than 15 minutes
//i got bored and fixed it  (2 days after i removed it) lol

transcendBox2=document.createElement('div');
transcendBox2.innerHTML='<h3>'+moneName+':</h3><br>'+
'<h3 style="all:initial;"><span class="price transcendent" id="mone" style="'+styleWoBA+'">'+69420+'</span></h3><br>';
transcendBox2.style='margin-top:0px;width:60%;rotate:180deg;margin:auto;top:26px;position:relative';
transcendBox2.id='transcencionBox1';
transcendBox2.className='ascendData2 smallFramed prompt';

transcendButton=document.createElement('a');
transcendButton.innerHTML='<span class="fancyText" style="font-size:20px;">Transcend</span>'
transcendButton.className='option framed large red';
transcendButton.id='transcendButton';
transcendButton.style.rotate='180deg';transcendButton.style.top='24px';transcendButton.style.position='relative';
var transcendHTML=transcendence.innerHTML;
var ascendInfoCopy=document.createElement('div');ascendInfoCopy.id='ascendInfoCopy';//l('ascendInfo').cloneNode(true);//ascendInfoCopy.style.position='fixed';ascendInfoCopy.style.top=window.innerHeight/1.25+'px';ascendInfoCopy.style.right='0px';ascendInfoCopy.style.margin='auto';ascendInfoCopy.style.left='0px';ascendInfoCopy.style.opacity='50%';ascendInfoCopy.style.backgroundImage='';//what the hell am i doing (putting it all in one line)
/*screw it im just doing this*/ ascendInfoCopy.innerHTML='<div id="transcencionBox1" style="width: 60%; rotate: 180deg; margin: auto; top: 24px; position: relative;"><h3>Transcend Power:</h3><br><h3 style="all:initial"><span id="transcendPower" style="text-align:center;font-weight:bold;font-size:14px;position:relative;font-variant:small-caps;display:inline-block;color:#ece2b6; text-shadow:0px 1px 0px #733726,0px 2px 0px #875626,0px 2px 1px #000,0px 2px 3px #000; font-family:Georgia,serif; font-size:15px;">15</span>\x3C!--</h3>--><div class="smallFramed meterContainer" id="transcendMeterContainer" style="width: 70%; margin: auto;"><div id="transcendMeter" class="meter filling" style="background-position: -9519px center; width: 0%;"></div></div></h3></div><div id="transcencionBox1" style="width: 60%; rotate: 180deg; margin: auto; top: 26px; position: relative;"><h3>Moné:</h3><br><h3 style="all:initial;"><span class="price transcendent" id="mone" style="text-align:center;font-weight:bold;font-size:14px;position:relative;font-variant:small-caps;display:inline-block;color:#ece2b6; text-shadow:0px 1px 0px #733726,0px 2px 0px #875626,0px 2px 1px #000,0px 2px 3px #000; font-family:Georgia,serif; font-size:15px;">0</span></h3><br></div>';
var loadTranscend=function(){
	if (Game.prestige>=Math.pow(10,15)){ //move this to the check hook
		l('ascendInfo').style='background:url(img/ascendBox.png);width:344px;height:162px;position:absolute;bottom:-20px;text-align:center;rotate:180deg;margin:auto}'
		var ascendInfo=document.getElementById('ascendInfo').childNodes[0];
		l('ascendInfo').replaceChild(transcendBox1,ascendInfo);
		if (!l('ascendInfo').childNodes[1]) l('ascendInfo').appendChild(transcendBox2); else l('ascendInfo').replaceChild(transcendBox2,l('ascendInfo').childNodes[1]);
		if (!l('ascendInfo').childNodes[2]) l('ascendInfo').appendChild(transcendButton); else l('ascendInfo').replaceChild(transcendButton,l('ascendInfo').childNodes[2]);
		//'<div style="background-image:url(img/icons.png);background-position:528px 1200px;"></div>'
		l('transcendMeterContainer').style.width='70%';l('transcendMeterContainer').style.margin='auto';
		//l('transcendMeterContainer').style.margin='auto';
		ascendInfoCopy=l('ascendInfo').cloneNode(true);ascendInfoCopy.id='ascendInfoCopy';ascendInfoCopy.style.position='fixed';ascendInfoCopy.style.top=window.innerHeight/1.25+'px';ascendInfoCopy.style.right='0px';ascendInfoCopy.style.margin='auto';ascendInfoCopy.style.left='0px';ascendInfoCopy.style.opacity='50%';ascendInfoCopy.style.backgroundImage='';ascendInfoCopy.className='ascendCopy';ascendInfoCopy.childNodes[0].className+=' ascendCopy';//what the hell am i doing (putting it all in one line)
		///*screw it im just doing this*/ ascendInfoCopy.innerHTML='<div id="transcencionBox1" style="width: 60%; rotate: 180deg; margin: auto; top: 24px; position: relative;"><h3>Transcend Power:</h3><br><h3 style="all:initial"><span id="transcendPower" style="text-align:center;font-weight:bold;font-size:14px;position:relative;font-variant:small-caps;display:inline-block;color:#ece2b6; text-shadow:0px 1px 0px #733726,0px 2px 0px #875626,0px 2px 1px #000,0px 2px 3px #000; font-family:Georgia,serif; font-size:15px;">15</span>\x3C!--</h3>--><div class="smallFramed meterContainer" id="transcendMeterContainer" style="width: 70%; margin: auto;"><div id="transcendMeter" class="meter filling" style="background-position: -9519px center; width: 0%;"></div></div></h3></div><div id="transcencionBox1" style="width: 60%; rotate: 180deg; margin: auto; top: 26px; position: relative;"><h3>Moné:</h3><br><h3 style="all:initial;"><span class="price transcendent" id="mone" style="text-align:center;font-weight:bold;font-size:14px;position:relative;font-variant:small-caps;display:inline-block;color:#ece2b6; text-shadow:0px 1px 0px #733726,0px 2px 0px #875626,0px 2px 1px #000,0px 2px 3px #000; font-family:Georgia,serif; font-size:15px;">0</span></h3><br></div>';
		l('transcend').appendChild(ascendInfoCopy);
		AddEvent(l('transcendButton'),'click',function(){
			PlaySound('snd/tick.mp3');
			transcend();
		});
		ascendInfoCopy.childNodes[2].childNodes[0].innerHTML='Return';
		ascendInfoCopy.childNodes[2].style.backgroundColor='#000000';
		ascendInfoCopy.childNodes[2].style.top='30px';
		ascendInfoCopy.childNodes
		ascendInfoCopy.childNodes[2].className='framed option large';//uh hopefully this works (leave transcend button styling)
		AddEvent(l('ascendInfoCopy').childNodes[2],'click',function(){
			PlaySound('snd/tick.mp3');
			leaveTranscend();
		}); //it works for the reincarnate button so it should work here
		
		ascendInfoCopy.childNodes[0].className='prompt'; //idk man it works decently
		ascendInfoCopy.childNodes[1].className='prompt';
		
		transcendHTML=transcendence.innerHTML;
		Game.transcendReady=1;
	}
}
Game.registerHook('check',()=>{if (!Game.transcendReady){loadTranscend()}});
