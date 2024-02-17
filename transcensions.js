var transcendence=document.createElement('div');
//var me=Game.Upgrades['Switchblade and bleach']
//transcendence.innerHTML=Game.crate(me,'ascend',false,me.id);
transcendence.id='transcend';
transcendence.style='width:'+window.innerWidth+'px;height:'+window.innerHeight+'px;display:none;z-index:5000000;position:fixed;color:#000000;opacity:100%';
l('game').appendChild(transcendence);

var transcendContent=document.createElement('div');
transcendContent.id='transcendContent';
var str='';
for (var i of upAndAchiev) {
	if (i.id >= 884) {
		str+=Game.crate(i,'ascend','Game.Upgrades[\''+i.name+'\'].tier++;',undefined,'top:'+GU[i.id][0]+'px;left:'+GU[i.id][1]+'px;z-index:4534225');
		//str+='<div data-id="'+i.id+'" onclick="Game.Upgrades[\''+i.name+'\'].tier++;" class="crate upgrade heavenly" onmouseout="Game.setOnCrate(0);Game.tooltip.shouldHide=1;" onmouseover="if (!Game.mouseDown) {Game.setOnCrate(this);Game.tooltip.dynamic=1;Game.tooltip.draw(this,function(){return function(){return \'<div style=\'position:absolute;left:1px;top:1px;right:1px;bottom:1px;background:linear-gradient(125deg,rgba(15,115,130,1) 0%,rgba(15,115,130,0) 20%);mix-blend-mode:screen;z-index:1;\'></div><div style=\'z-index:10;padding:8px 4px;min-width:350px;position:relative;\' id=\'tooltipCrate\'><div class=\'icon\' style=\'float:left;margin-left:-8px;margin-top:-8px;background-position:-816px -192px;\'></div><div style=\'float:right;text-align:right;\'><span class=\'price heavenly disabled\'>'+i.getPrice()+'</span></div><div class=\'name\'>Twitter account '+i.tier+'</div><div class=\'tag\' style=\'background-color:#efa438;\'>Heavenly</div><div class=\'line\'></div><div class=\'description\'>'+i.desc+'</div></div><div style=\'font-size:9px;\'>Id: '+i.id+' | Order: '+i.order+' | Tier: '+i.tier+' | Icon: ['+i.icon[0]+','+i.icon[1]+']</div>\'}();},\'top\');Game.tooltip.wobble();}" style="background-position:-816px -192px;position:absolute;left:undefinedpx;top:undefinedpx;top:400px;left:500px;z-index:4534225"></div>';
	}
}
transcendContent.style='z-index:10200000;opacity:100%';
transcendContent.innerHTML=str;
l('transcend').appendChild(transcendContent);

var transcendOverlay=document.createElement('div');
transcendOverlay.id='transcendOverlay';

var transcendAnimation=document.createElement('style');
transcendAnimation.innerHTML='@keyframes example { from {opacity:0%;} to {opacity:100%;} }';
document.body.appendChild(transcendAnimation);
var transcendTransition=document.createElement('div');
transcendTransition.style='width:'+window.innerWidth+'px;height:'+window.innerHeight+'px;background-color:#000000;opacity:0%;animation-name:example;animation-duration:4s;position:fixed;z-index:4534223';

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
transcendBox2.innerHTML='<h3>Moné:</h3><br>'+
'<h3 style="all:initial;"><span class="price transcendent" id="mone" style="'+styleWoBA+'">'+69420+'</span></h3><br>';
transcendBox2.style='margin-top:0px;width:60%;rotate:180deg;margin:auto;top:26px;position:relative';
transcendBox2.id='transcencionBox1';
transcendBox2.className='ascendData2 smallFramed prompt';

transcendButton=document.createElement('a');
transcendButton.innerHTML='<span class="fancyText" style="font-size:20px;">Transcend</span>'
transcendButton.className='option framed large red';
transcendButton.id='transcendButton';
transcendButton.style.rotate='180deg';transcendButton.style.top='24px';transcendButton.style.position='relative';

l('ascendInfo').style='background:url(img/ascendBox.png);width:344px;height:162px;position:absolute;bottom:-20px;text-align:center;rotate:180deg;margin:auto}'
var ascendInfo=document.getElementById('ascendInfo').childNodes[0];
l('ascendInfo').replaceChild(transcendBox1,ascendInfo);
if (!l('ascendInfo').childNodes[1]) l('ascendInfo').appendChild(transcendBox2); else l('ascendInfo').replaceChild(transcendBox2,l('ascendInfo').childNodes[1]);
if (!l('ascendInfo').childNodes[2]) l('ascendInfo').appendChild(transcendButton); else l('ascendInfo').replaceChild(transcendButton,l('ascendInfo').childNodes[2]);
//'<div style="background-image:url(img/icons.png);background-position:528px 1200px;"></div>'
l('transcendMeterContainer').style.width='70%';l('transcendMeterContainer').style.margin='auto';
//l('transcendMeterContainer').style.margin='auto';

AddEvent(l('transcendButton'),'click',function(){
	PlaySound('snd/tick.mp3');
	transcend();
});


Game.transcendReady=1;
