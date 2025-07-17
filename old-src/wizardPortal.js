var wizardPortal=document.createElement('div');
//wizardPortal.src='img/buildings.png';
wizardPortal.style='position:absolute;bottom:15px;left:0px;background-image:url("img/buildings.png");width:64px;height:64px;background-position:0px -704px;z-index:1;opacity:50%;';
wizardPortal.height='64';
wizardPortal.width='64';
wizardPortal.id='wizardPortal';
//wizardPortal.onmouseover=function(){alert("skibidi")};
/*
for testing (i was incredibly sleep deprived)
function lcookiething(){
	console.log('sigma skibidi rizz');
}*/
//wizardPortal.onMouseOver="lcookiething()";
//str='';
//str+='<div id="wizardPortal" onmouseover="lcookiething()" style="height:64px;width:64px;background-image:url("img/buildings.png");background-position:0px -704px;"></div>';
//wizardPortal.onmouseout=function(){Game.tooltip.shouldHide=1};
//wizardPortal.onmouseover=function(){Game.tooltip.dynamic=1;Game.tooltip.draw(this,function(){return '</p>lol</p>'();},'middle');Game.tooltip.wobble()};
var theTooltip='<div style="padding:8px 4px;min-width:350px;" id="tooltipSpell"><div class="icon" style="float:left;margin-left:-8px;margin-top:-8px;background-position:-336px -0px;"></div><div class="name">Wizard Portal</div><div class="line"></div><div class="description">Hmmm... Something appears to be broken. Give it about 3-5 business days to fix!</div></div>';
function wizardPortalTooltip(){
	Game.tooltip.dynamic=1;Game.tooltip.draw(this,function(){return theTooltip;},'middle');Game.tooltip.wobble()
}
function wizardPortalMouseOff(){Game.tooltip.shouldHide=1}
var grimoire=document.getElementById('rowSpecial7');
grimoire.appendChild(wizardPortal);
//wizardPortal.outerHTML=str;
//document.getElementById('grimoireBG').style.zIndex=1;
//document.getElementById('grimoireContent').style.zIndex=2;
//document.getElementById('wizardPortal').onmouseout=function(){Game.tooltip.shouldHide=1;};
document.getElementById('wizardPortal').onmouseover=wizardPortalTooltip;
document.getElementById('wizardPortal').onmouseout=wizardPortalMouseOff;
//document.getElementById('wizardPortal').innerHTML=str;
