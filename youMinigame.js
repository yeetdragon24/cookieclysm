if(Game.Objects['You'].minigame) throw new Error("amogus prevented from loading by already present You minigame.");

var M = {};
M.parent = Game.Objects['You'];
M.parent.minigame = M;


M.launch = function(){
	var M = this;
	M.init = function(div){
		
		M.developers={
			'yeetdragon':{
				name:'YeetDragon24',
				icon:[0,0],
				buff:'Does something idk',
				debuff:'Does something bad idk',
				quote:'say something funny here idk'
			},
			'sniper':{
                name:'Stream Sniper',
                icon:[1,1],
                buff:'<span class="green">Increases chance of positive effects from golden cookies</span>',
                debuff:'<span class="red">Decrease effectiveness of Temple Pantheon</span>',
                quote:'Cookie good. Me no likey <b><u>those</u></b> gods'
			}
		}
		M.devsById=[];var n=0;
		for (var i in M.developers){M.developers[i].id=n+11;M.developers[i].slot=-1;M.devsById[n+11]=M.developers[i];n++;}
		console.log(M.devsById);
		M.slot=[];
		M.slot[0]=-1;
		//M.slot[3]=-1
		//M.slot[3]=-1
		
		M.slotNames=['regular'];
		
		M.devTooltip=function(id)
		{
			//console.log('devtooltip has been called');
			return function(){
				var me=M.devsById[id];
				//console.log(M.devsById)
				me.icon=me.icon||[0,0];
				var str='<div style="padding:8px 4px;min-width:350px;">'+
				'<div class="icon" style="float:left;margin-left:-8px;margin-top:-8px;background-position:'+(-me.icon[0]*48)+'px '+(-me.icon[1]*48)+'px;"></div>'+
				'<div class="name">'+me.name+'</div>'+
				'<div class="line"></div><div class="description"><div style="margin:6px 0px;font-weight:bold;">Effects :</div>'+
					(me.descBefore?('<div class="templeEffect">'+me.descBefore+'</div>'):'')+
					(me.buff?('<div class="templeEffect templeEffect1"><div class="usesIcon shadowFilter templeGem templeGem3"></div>'+me.buff+'</div>'):'')+
					(me.debuff?('<div class="templeEffect templeEffect2"><div class="usesIcon shadowFilter templeGem templeGem2"></div>'+me.debuff+'</div>'):'')+
					(me.descAfter?('<div class="templeEffect">'+me.descAfter+'</div>'):'')+
					(me.quote?('<q>'+me.quote+'</q>'):'')+
				'</div></div>';
				return str;
			};
		}
		M.slotTooltip=function(id)
		{
			//console.log('L bozo + '+id);
			//console.log('slottooltip has been called');
			return function(){
				if (M.slot[id]!=-1)
				{
					var me=M.devsById[M.slot[id]];
					me.icon=me.icon||[0,0];
				}
				var str='<div style="padding:8px 4px;min-width:350px;">'+
				(M.slot[id]!=-1?(
					'<div class="name templeEffect" style="margin-bottom:12px;"><div class="usesIcon shadowFilter templeGem templeGem'+(parseInt(id)+1)+'"></div>'+M.slotNames[id]+' slot</div>'+
					'<div class="icon" style="float:left;margin-left:-8px;margin-top:-8px;background-position:'+(-me.icon[0]*48)+'px '+(-me.icon[1]*48)+'px;"></div>'+
					'<div class="name">'+me.name+'</div>'+
					'<div class="line"></div><div class="description"><div style="margin:6px 0px;font-weight:bold;">Effects :</div>'+
						(me.activeDescFunc?('<div class="templeEffect templeEffectOn" style="padding:8px 4px;text-align:center;">'+me.activeDescFunc()+'</div>'):'')+
						(me.descBefore?('<div class="templeEffect">'+me.descBefore+'</div>'):'')+
						(me.desc1?('<div class="templeEffect templeEffect1'+(me.slot==0?' templeEffectOn':'')+'"><div class="usesIcon shadowFilter templeGem templeGem1"></div>'+me.desc1+'</div>'):'')+
						(me.desc2?('<div class="templeEffect templeEffect2'+(me.slot==1?' templeEffectOn':'')+'"><div class="usesIcon shadowFilter templeGem templeGem2"></div>'+me.desc2+'</div>'):'')+
						(me.desc3?('<div class="templeEffect templeEffect3'+(me.slot==2?' templeEffectOn':'')+'"><div class="usesIcon shadowFilter templeGem templeGem3"></div>'+me.desc3+'</div>'):'')+
						(me.descAfter?('<div class="templeEffect">'+me.descAfter+'</div>'):'')+
						(me.quote?('<q>'+me.quote+'</q>'):'')+
					'</div>'
				):
				('<div class="name templeEffect"><div class="usesIcon shadowFilter templeGem templeGem1"></div>Developer slot (empty)</div><div class="line"></div><div class="description">'+
				((M.slotHovered==id && M.dragging)?'Release to assign <b>'+M.dragging.name+'</b> to this slot.':'Drag a developer onto this slot to assign it.')+
				'</div>')
				)+
				'</div>';
				return str;
			};
		}
		M.slotGod=function(god,slot)
		{
			//console.log('slotGod has been called');
			
			if (slot==god.slot) return false;
			if (slot!=-1 && M.slot[slot]!=-1)
			{
				M.devsById[M.slot[slot]].slot=god.slot;//swap
				M.slot[god.slot]=M.slot[slot];
			}
			else if (god.slot!=-1) M.slot[god.slot]=-1;
			if (slot!=-1) M.slot[slot]=god.id;
			god.slot=slot;
			Game.recalculateGains=true;
			
		}
		M.dragging=false;
		M.dragGod=function(what)
		{
			//console.log('dragGod has been called');
			M.dragging=what;
			var div=l('templeGod'+what.id);
			var box=div.getBoundingClientRect();
			var box2=l('templeDrag').getBoundingClientRect();
			div.className='ready templeGod titleFont templeDragged';
			l('templeDrag').appendChild(div);
			var x=box.left-box2.left;
			var y=box.top-box2.top;
			div.style.transform='translate('+(x)+'px,'+(y)+'px)';
			l('templeGodPlaceholder'+M.dragging.id).style.display='inline-block';
			PlaySound('snd/tick.mp3');
		}
		M.dropGod=function()
		{
			//console.log('dropGod has been called');
			if (!M.dragging) return;
			var div=l('templeGod'+M.dragging.id);
			div.className='ready templeGod titleFont';
			div.style.transform='none';
			console.log('Slot hovered: '+M.slotHovered);
			if (M.slotHovered!=-1 && (M.swaps==0 || M.dragging.slot==M.slotHovered))//dropping on a slot but no swaps left, or slot is the same as the original
			{
				console.log('swaps: '+M.swaps);
				if (M.dragging.slot!=-1) l('templeSlot'+M.dragging.slot).appendChild(div);
				else l('templeGodPlaceholder'+(M.dragging.id)).parentNode.insertBefore(div,l('templeGodPlaceholder'+(M.dragging.id)));
				PlaySound('snd/sell1.mp3',0.75);
			}
			else if (M.slotHovered!=-1)//dropping on a slot
			{
				console.log('trying to drop on a slot');

				//console.log('ba 2'+prev.id);
				//M.useSwap(1);
				//M.lastSwapT=0;
				//console.log('ba but first '+M.slotHovered);
				var prev=M.slot[M.slotHovered];//id of the god already in the slot
				//console.log('ba '+M.slot[M.slotHovered]);
				if (prev!=-1)
				{
					prev=M.devsById[prev];
					console.log('prev: '+l('templeGod'+prev.id));
					var prevDiv=l('templeGod'+prev.id);
					if (M.dragging.slot!=-1)//swap with god's previous slot
					{
						l('templeSlot'+M.dragging.slot).appendChild(prevDiv);
					}
					else//swap back to roster
					{
						var other=l('templeGodPlaceholder'+(prev.id));
						other.parentNode.insertBefore(prevDiv,other);
					}
				}
				l('templeSlot'+M.slotHovered).appendChild(div);
				console.log('attempting to slot god, dragging: '+M.dragging.id+', hovering over: '+M.slotHovered);
				M.slotGod(M.dragging,M.slotHovered+3);
				
				PlaySound('snd/tick.mp3');
				PlaySound('snd/spirit.mp3',0.5);
				
				var rect=div.getBoundingClientRect();
				Game.SparkleAt((rect.left+rect.right)/2,(rect.top+rect.bottom)/2-24);
			}
			else//dropping back to roster
			{
				//console.log('the game believes that you have not hovered on a slot. skill issue.');
				var other=l('templeGodPlaceholder'+(M.dragging.id));
				other.parentNode.insertBefore(div,other);
				other.style.display='none';
				M.slotGod(M.dragging,-1);
				PlaySound('snd/sell1.mp3',0.75);
			}
			M.dragging=false;
		}
		
		M.slotHovered=-1;
		M.hoverSlot=function(what)
		{
			console.log('CAP'+what);
			M.slotHovered=what;
			if (M.dragging)
			{
				if (M.slotHovered==-1) l('templeGodPlaceholder'+M.dragging.id).style.display='inline-block';
				else l('templeGodPlaceholder'+M.dragging.id).style.display='none';
				//console.log('hoverslot code: '+l('templeGodPlaceholder'+M.dragging.id));
				PlaySound('snd/clickb'+Math.floor(Math.random()*7+1)+'.mp3',0.75);
			}
		}
		
		var str = '';
		str+='<style>'+
		'#templeBG{background:url(img/shadedBorders.png),url(img/BGpantheon.jpg);background-size:100% 100%,auto;position:absolute;left:0px;right:0px;top:0px;bottom:16px;}'+
		'#templeContent{position:relative;box-sizing:border-box;padding:4px 24px;text-align:center;}'+
		'#templeGods{text-align:center;width:100%;padding:8px;box-sizing:border-box;}'+
		'.templeIcon{pointer-events:none;margin:12px 6px 0px 6px;width:48px;height:48px;opacity:0.8;position:relative;}'+
		'.templeSlot .templeIcon{margin:2px 6px 0px 6px;}'+
		'.templeGod{box-shadow:4px 4px 4px #000;cursor:pointer;position:relative;color:#f33;opacity:0.8;text-shadow:0px 0px 4px #000,0px 0px 6px #000;font-weight:bold;font-size:12px;display:inline-block;width:60px;height:74px;background:url(img/spellBG.png);}'+
		'.templeGod.ready{color:rgba(255,255,255,0.8);opacity:1;}'+
		'.templeGod.ready:hover{color:#fff;}'+
		'.templeGod:hover,.templeDragged{box-shadow:6px 6px 6px 2px #000;z-index:1000000001;top:-1px;}'+
		'.templeGod:active{top:1px;}'+
		'.templeGod.ready .templeIcon{opacity:1;}'+
		'.templeGod:hover{background-position:0px -74px;} .templeGod:active{background-position:0px 74px;}'+
		'.templeGod1{background-position:-60px 0px;} .templeGod1:hover{background-position:-60px -74px;} .templeGod1:active{background-position:-60px 74px;}'+
		'.templeGod2{background-position:-120px 0px;} .templeGod2:hover{background-position:-120px -74px;} .templeGod2:active{background-position:-120px 74px;}'+
		'.templeGod3{background-position:-180px 0px;} .templeGod3:hover{background-position:-180px -74px;} .templeGod3:active{background-position:-180px 74px;}'+
		
		'.templeGod:hover .templeIcon{top:-1px;}'+
		'.templeGod.ready:hover .templeIcon{animation-name:bounce;animation-iteration-count:infinite;animation-duration:0.8s;}'+
		'.noFancy .templeGod.ready:hover .templeIcon{animation:none;}'+
		
		'.templeGem{z-index:100;width:24px;height:24px;}'+
		'.templeEffect{font-weight:bold;font-size:11px;position:relative;margin:0px -12px;padding:4px;padding-left:28px;}'+
		'.description .templeEffect{border-top:1px solid rgba(255,255,255,0.15);background:linear-gradient(to top,rgba(255,255,255,0.1),rgba(255,255,255,0));}'+
		'.templeEffect .templeGem{position:absolute;left:0px;top:0px;}'+
		'.templeEffectOn{text-shadow:0px 0px 6px rgba(255,255,255,0.75);color:#fff;}'+
		'.templeGod .templeGem{position:absolute;left:18px;bottom:8px;pointer-events:none;}'+
		'.templeGem1{background-position:-1104px -720px;}'+
		'.templeGem2{background-position:-1128px -720px;}'+
		'.templeGem3{background-position:-1104px -744px;}'+
		
		'.templeSlot .templeGod,.templeSlot .templeGod:hover,.templeSlot .templeGod:active{background:none;}'+
		
		'.templeSlotDrag{position:absolute;left:0px;top:0px;right:0px;bottom:0px;background:#999;opacity:0;cursor:pointer;}'+
		
		'#templeDrag{position:absolute;left:0px;top:0px;z-index:1000000000000;}'+
		'.templeGod{transition:transform 0.1s;}'+
		'#templeDrag .templeGod{position:absolute;left:0px;top:0px;}'+
		'.templeDragged{pointer-events:none;}'+
		
		'.templeGodPlaceholder{background:red;opacity:0;display:none;width:60px;height:74px;}'+
		
		'#templeSlots{margin:4px auto;text-align:center;}'+
		'#templeSlot0{top:-4px;}'+
		'#templeSlot1{top:0px;}'+
		'#templeSlot2{top:4px;}'+
		
		'#templeInfo{position:relative;display:inline-block;margin:8px auto 0px auto;padding:8px 16px;padding-left:32px;text-align:center;font-size:11px;color:rgba(255,255,255,0.75);text-shadow:-1px 1px 0px #000;background:rgba(0,0,0,0.75);border-radius:16px;}'+
		'</style>';
		str+='<div id="templeBG"></div>';
		str+='<div id="templeContent">';
			str+='<div id="templeDrag"></div>';
			str+='<div id="templeSlots">';
			for (var i in M.slot)
			{
				var me=M.slot[i];
				str+='<div class="ready templeGod templeGod'+(i%4)+' templeSlot titleFont" id="templeSlot'+i+3+'" '+Game.getDynamicTooltip('Game.ObjectsById['+M.parent.id+'].minigame.slotTooltip('+i+')','this')+'><div class="usesIcon shadowFilter templeGem templeGem'+(parseInt(i)+1)+'"></div></div>';
			}
			str+='</div>';
			str+='<div id="templeInfo"><div>lump cooldowns were here</div></div>';
			str+='<div id="templeGods">';
			for (var i in M.developers)
			{
				var me=M.developers[i];
				var icon=me.icon||[0,0];
				str+='<div class="ready templeGod templeGod'+(me.id%4)+' titleFont" id="templeGod'+me.id+'" '+Game.getDynamicTooltip('Game.ObjectsById['+M.parent.id+'].minigame.devTooltip('+me.id+')','this')+'><div class="usesIcon shadowFilter templeIcon" style="background-position:'+(-icon[0]*48)+'px '+(-icon[1]*48)+'px;"></div><div class="templeSlotDrag" id="templeDevDrag'+me.id+'"></div></div>';
				str+='<div class="templeGodPlaceholder" id="templeGodPlaceholder'+me.id+'"></div>';
			}//<div class="usesIcon shadowFilter templeGem templeGem'+(me.id%3+1)+'"></div>
			str+='</div>';
		str+='</div>';
		div.innerHTML=str;
		M.swapsL=l('templeSwaps');
		div.innerHTML = str;
		for (var i in M.developers)
		{
			var me=M.developers[i];
			//console.log(me.name)
			//console.log(i+' '+me.id);
			//console.log('skill issue:'+l('templeDevDrag'+me.id));
			AddEvent(l('templeDevDrag'+me.id),'mousedown',function(what){return function(e){if (e.button==0){M.dragGod(what);}}}(me));
			AddEvent(l('templeDevDrag'+me.id),'mouseup',function(what){return function(e){if (e.button==0){M.dropGod(what);}}}(me));
		}
		for (var i in M.slot)
		{
			//alert('wasdown brop but this is slot');
			var me=M.slot[i];
			//console.log(me+' '+M.slot);
			console.log('this also');
			console.log(l('templeSlot'+i));
			AddEvent(l('templeSlot'+i+3),'mouseover',function(what){return function(){M.hoverSlot(what+3);}}(i));
			console.log('should work');
			AddEvent(l('templeSlot'+i+3),'mouseout',function(what){return function(e){if (e.button==0){M.hoverSlot(-1);}}}(i));
		}
		//it didnt know
		//it does now
		AddEvent(document,'mouseup',M.dropGod);
		
		//this curly brace on the next line ends M.init() but copy pasting messed up the indentation
		}
		
		M.save=function()
	{
		//output cannot use ",", ";" or "|"
		var str='';
		for (var i in M.slot)
		{str+=parseFloat(M.slot[i])+'/';}
		str=str.slice(0,-1);
		str+=' '+parseFloat(M.swaps)+' '+parseFloat(M.swapT);
		str+=' '+parseInt(M.parent.onMinigame?'1':'0');
		return str;
	}
	M.load=function(str)
	{
		//interpret str; called after .init
		//note : not actually called in the Game's load; see "minigameSave" in main.js
		if (!str) return false;
		var i=0;
		var spl=str.split(' ');
			var bit=spl[i++].split('/')||[];
			for (var ii in M.slot)
			{
				if (parseFloat(bit[ii])!=-1)
				{
					var god=M.devsById[parseFloat(bit[ii])];
					//M.slotGod(god,ii);
					//l('templeSlot'+god.slot).appendChild(l('templeGod'+god.id));
				}
			}
		M.swaps=parseFloat(spl[i++]||3);
		M.swapT=parseFloat(spl[i++]||Date.now());
		var on=parseInt(spl[i++]||0);if (on && Game.ascensionMode!=1) M.parent.switchMinigame(1);
	}
	M.reset=function()
	{
		M.swaps=3;
		M.swapT=Date.now();
		for (var i in M.slot) {M.slot[i]=-1;}
		for (var i in M.gods)
		{
			var me=M.gods[i];
			me.slot=-1;
			var other=l('templeGodPlaceholder'+(me.id));
			other.parentNode.insertBefore(l('templeGod'+me.id),other);
			other.style.display='none';
		}
	}
	M.logic=function()
	{
		//console.log(M.dragging);
		//run each frame
		var t=1000*60*60;
		if (M.swaps==0) t=1000*60*60*16;
		else if (M.swaps==1) t=1000*60*60*4;
		var t2=M.swapT+t-Date.now();
		if (t2<=0 && M.swaps<3) {M.swaps++;M.swapT=Date.now();}
		//M.lastSwapT++;
	}
	M.draw=function()
	{
		//run each draw frame
		if (M.dragging)
		{
			var box=l('templeDrag').getBoundingClientRect();
			var x=Game.mouseX-box.left-60/2;
			var y=Game.mouseY-box.top;
			if (M.slotHovered!=-1)//snap to slots
			{
				var box2=l('templeSlot'+M.slotHovered).getBoundingClientRect();
				x=box2.left-box.left;
				y=box2.top-box.top;
			}
			l('templeGod'+M.dragging.id).style.transform='translate('+(x)+'px,'+(y)+'px)';
		}
		var t=1000*60*60;
		if (M.swaps==0) t=1000*60*60*16;
		else if (M.swaps==1) t=1000*60*60*4;
		var t2=M.swapT+t-Date.now();
		M.swapsL.innerHTML='Worship swaps : <span class="titleFont" style="color:'+(M.swaps>0?'#fff':'#c00')+';">'+M.swaps+'/'+(3)+'</span>'+((M.swaps<3)?' (next in '+Game.sayTime((t2/1000+1)*Game.fps,-1)+')':'');
	}

	

	M.init(l('rowSpecial' + M.parent.id));
}


M.launcher = function(){
	var M = Game.Objects['You'].minigame;
	
	M.parent.minigameUrl = 'https://yeetdragon24.github.io';
	M.parent.minigameName = 'amogus';
	
	M.name = M.parent.minigameName;
	M.savePrefix = 'minigameAmogus';
	
	
	
	
	
	Game.LoadMinigames();
}

M.launcher();


var M = 0;
