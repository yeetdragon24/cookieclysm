/*
wrinklers
*/
C.wrinklerSkins = new Crumbs.behavior(function(p) {
    if (Game.wrinklers[this.wId].phase > 0) {
        if (Game.wrinklers[this.wId].super) { this.imgUsing = Game.WINKLERS ? 5 : Game.wrinklers[this.wId].type > 0 ? 7 : 8; return; }
        if (Game.wrinklers[this.wId].type > 0) { this.imgUsing = Game.WINKLERS?5:2; return; }
        if (Game.season == 'christmas') { this.imgUsing = Game.WINKLERS?6:3; return; }
        this.imgUsing = Game.WINKLERS?4:1; return;
    }
    this.imgUsing = 0;
});
C.wrinklerMovement = new Crumbs.behavior(function(p) {
    const me = Game.wrinklers[this.wId];
    const sw = me.super ? 100+2*Math.sin(Game.T*0.15+this.wId*3) : 100+2*Math.sin(Game.T*0.2+this.wId*3);
    const sh = me.super ? 200+5*Math.sin(Game.T*0.15-2+this.wId*3) : 200+5*Math.sin(Game.T*0.2-2+this.wId*3);
    this.scaleX = sw / 100;
    this.scaleY = sh / 200;
    if (me.super) {
        this.scaleX *= 1.25;
        this.scaleY *= 1.25;
    }
    this.x = me.x;
    this.y = me.y;
    this.offsetX = -sw/2 + 50;
    this.rotation = -(me.r)*Math.PI/180;
    this.alpha = me.close;
});

C.allWrinklerSkins = [
    'img/filler.png',
    'img/wrinkler.png',
    'img/shinyWrinkler.png',
    'img/winterWrinkler.png',
    'winkler.png',
    'shinyWinkler.png',
    'winterWinkler.png',
    'https://yeetdragon24.github.io/cookieclysm/img/superWrinkler.png',
    'https://yeetdragon24.github.io/cookieclysm/img/superWrinkler2.png'
];

C.onWrinklerClick = function() {
    const me = Game.wrinklers[this.wId];
    if (Game.OnAscend) return;
    if (Game.keys[17] && Game.sesame) { me.type = !me.type; PlaySound('snd/shimmerClick.mp3'); return; }
    Game.playWrinklerSquishSound();
    me.clicks++;
    if (me.clicks >= 50) Game.Win('Wrinkler poker');
    me.hurt = 1;
    me.hp -= 0.75;
    if (Game.prefs.particles && !Game.prefs.notScary && !Game.WINKLERS && !(me.hp <= 0.5 && me.phase > 0) && !me.super) {
        for (let i = 0; i < 3; i++) { Crumbs.spawnWrinklerBits(me.type, me.id, Math.floor(i + Math.floor(3 * (me.id + 1) * Math.random()) + 2)); }
    }
}

C.antPositions = [
    {x: 20, y: 20, r: (230 * Math.PI) / 180}, //top right
    {x: -20, y: 27, r: (75 * Math.PI) / 180}, //top left
    {x: 30, y: 55, r: (325 * Math.PI) / 180}, //middle right
    {x: -25, y: 60, r: (115 * Math.PI) / 180}, //middle left
    {x: 25, y: 100, r: (235 * Math.PI) / 180}, //bottom right
    {x: -25, y: 105, r: (30 * Math.PI) / 180}, //bottom left
    {x: -7, y: 150, r: (20 * Math.PI) / 180}, //very bottom
];

C.antSkin = new Crumbs.behavior(function() {
    this.sy = 48 * this.type; //absolutely insane
});
C.antMovement = new Crumbs.behavior(function() {
    if (this.life == 0) {
        const c = Math.cos(this.parent.rotation);
        const s = Math.sin(this.parent.rotation);
        this.x = (this.positions.x * c - this.positions.y * s);
        this.y = (this.positions.x * s + this.positions.y * c);
        //if (Math.random() < 0.001) C.loseAnt(this.parent.wId, this.aId, false);
        this.cookies += (((Game.cookiesPs / Game.fps) * Game.cpsSucked)) * (0.05 * (this.type + 1));
    } else {
        let yOffset = 0;
        if (this.life > 0) {
            this.life++;
            yOffset = 45 - this.life;
            this.alpha = this.life / 45;
            if (this.life == 45) {
                Game.recalculateGains = 1;
                this.life = 0;
            }
        }
        else if (this.life < 0) {
            this.life--;
            yOffset = -this.life;
            this.alpha = 1 - (this.life / -45);
            if (this.life <= -45) C.loseAnt(this.parent.wId, this.aId, true);
        }
        this.offsetY = yOffset;
        this.x = this.positions.x;
        this.y = this.positions.y;
    }
    this.rotation = this.positions.r;
    this.alpha *= this.parent.alpha;
});

C.antTemplate = {
    enabled: false,
    id: 'ant',
    width: 48, height: 48, sx: 48 * 8,
    imgs: icons,
    scope: 'left', order: 20, anchor: 'center',
    behaviors: [
        new Crumbs.behaviorInstance(C.antSkin),
        new Crumbs.behaviorInstance(C.antMovement)
    ],
    components: new Crumbs.component.pointerInteractive({ alwaysInteractable: true, onClick: function(m) { C.killAnt(m); } }),
};

for (let i in Game.wrinklers) {
    let w = Crumbs.findObject('wrinkler' + i, 'left');
    w.imgs = C.allWrinklerSkins;
    w.behaviors = [
        new Crumbs.behaviorInstance(C.wrinklerSkins), 
        new Crumbs.behaviorInstance(C.wrinklerMovement), 
        new Crumbs.behaviorInstance(Crumbs.objectBehaviors.wrinklerParticles)
    ];
    for (let ii = 0; ii < 3; ii++) w.spawnChild(C.antTemplate, { aId: parseInt(ii) });
    w.getComponent('pointerInteractive').onRelease = C.onWrinklerClick;
    w.getComponent('pointerInteractive').alwaysInteractable = true;
    Game.wrinklers[i].crumbsObj = w;
}


/*
ascend objects
*/
C.ascendObjectBehavior = new Crumbs.behavior(function(p) {
    if (Game.OnAscend != 1) {
        this.noDraw = true;
        return false;
    }
    this.noDraw = false;
    if (this.baseX === undefined) {
        this.baseX = this.x;
        this.baseY = this.y;
        this.baseScaleX = this.scaleX;
        this.baseScaleY = this.scaleY;
    }
    this.x = (this.baseX + Game.AscendOffX) * Game.AscendZoom + (Game.windowW / 2);
    this.y = (this.baseY + Game.AscendOffY) * Game.AscendZoom + (Game.windowH / 2);
    this.scaleX = this.baseScaleX * Game.AscendZoom;
    this.scaleY = this.baseScaleY * Game.AscendZoom;
});


/*
broken cookie stuff
*/
C.brokenCookieReset = function() {
    C.brokenCookieObject.children.slice(2, 12).forEach(x => { x.x = x.y = 0; x.rotation = 0; x.alpha = 1; x.behaviors.at(-1).yd = 0; } )
    C.brokenCookieObject.enabled = false;
}
C.brokenCookieObject = Crumbs.findObject('brokenCookie');
C.brokenCookieBehavior = new Crumbs.behavior(function() {
    if ((!Game.AscendTimer || C.bigCookieGone) && !C.doCookieFalling && C.youWrath < 2.5) { this.enabled = false; }
    else {
        var shake = Game.AscendTimer/Game.AscendBreakpoint;
        if (shake < 1) {
            this.x+=(Math.random()*2-1)*10*shake;
            this.y+=(Math.random()*2-1)*10*shake;
        }
    }
});
C.brokenCookieObject.behaviors[1] = new Crumbs.behaviorInstance(C.brokenCookieBehavior);
C.brokenCookieObject.order = 1;

C.brokenHaloBehavior = new Crumbs.behavior(function() {
    this.noDraw = Game.AscendTimer > Game.AscendBreakpoint;
    if (this.noDraw) { return; }
    // if (C.doCookieFalling) {
    //     this.alpha = C.cookieFallingTimer < 90 ? Math.min(C.cookieFallingTimer / Game.AscendBreakpoint, 1) : 0;
    // }
    else this.alpha = Game.AscendTimer / Game.AscendBreakpoint;
});
C.brokenCookieObject.findChild('brokenCookieHalo').behaviors[0] = new Crumbs.behaviorInstance(C.brokenHaloBehavior);

C.chunkExplode = new Crumbs.behavior(function(p) {
    if (!C.cookieFallingAnimation) return false;
    if (C.cookieFallingTimer < 90) {
        var shake = C.cookieFallingTimer < Game.AscendBreakpoint ? C.cookieFallingTimer/Game.AscendBreakpoint : 8.5 - 0.1*C.cookieFallingTimer;
        this.offsetX=(Math.random()*2-1)*4*shake-128; 
        this.offsetY=(Math.random()*2-1)*4*shake-128;
    } else {
        var t=((C.cookieFallingTimer-90) * 0.2) ** 0.5;
        var s = 256 * (t*0.5+1);
        var d=t*(80+((p.cID+2)%3)*40);
        var h = -(((p.cNum+4)%10)*0.1)*Math.PI*2;
        //this.rotation = -t*Math.PI*0.05;
        this.offsetX = -s*0.5 + Math.sin(h)*d;
        this.offsetY = -s*0.5 + Math.cos(h)*d;
        this.alpha = Math.max(1-t*0.35, 0);
        this.scaleX = this.scaleY = s *  0.00390625;
        //console.log(`t: ${t}, s: ${s}, d: ${d}, h: ${h}, offsetX: ${this.offsetX}, offsetY: ${this.offsetY}, id: ${p.cID}`)

    }
});
C.chunkFall = new Crumbs.behavior(function(p) {
    if (!this.shouldFall) return false;
    if (this.y > 1.5 * this.scope.c.canvas.height) {
        this.shouldFall = false;
    }
    this.y += p.yd;
    p.yd += 0.5 + Math.random() * 0.2;
});
C.brokenCookieObject.children.slice(2, 12).forEach(x => x.behaviors.push(new Crumbs.behaviorInstance(C.chunkFall, { yd: Math.random() * 5 + 3 })));


C.dropChunk = function(id) {
    let chunk = C.brokenCookieObject.children.slice(2, 12)[id];
    chunk.shouldFall = true;    
}


/*
background clones
*/
C.cloneBGBehavior = new Crumbs.behavior(function(p) {
    this.alpha = Math.max(0, Math.min(C.youWrath - 3, 1));
});
C.cloneBG = Crumbs.spawn({
    imgs: icons,
    anchor: 'top-left',
    scope: 'background',
    order: 10,
    enabled: false,
    behaviors: new Crumbs.behaviorInstance(C.cloneBGBehavior),
    components: new Crumbs.component.patternFill({
        width: Game.bounds.width,
        height: Game.bounds.height,
        sx: 48, sy: 48*3,
        sWidth: 48, sHeight: 48,
        dWidth: 96, dHeight: 96
    })
})
window.addEventListener('resize', function() {
    let patternFill = C.cloneBG.getComponent('patternFill');
    patternFill.width = Game.bounds.width;
    patternFill.height = Game.bounds.height;
})

C.ascendBlack = {
    anchor: 'top-left',
    scope: 'background',
    id: 'ascendBlack',
    order: 10,
    components: new Crumbs.component.canvasManipulator({function: function(m, ctx){if(m.noDraw)return;ctx.fillStyle = '#000000';ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)}}),
    behaviors: function() {
        if (this.noDraw = (!Game.OnAscend || !C.cookieclysm)) return false;
        if (Game.AscendOffX + Game.AscendOffY < 4000) {
            this.alpha = 0;
            return;
        }
        this.alpha = Math.min(1, (Game.AscendOffX + Game.AscendOffY - 4000) / 1600);
    }
}

C.ascendRift = {
    anchor: new Crumbs.anchor(2.5, 0.5),
    scope: 'background',
    imgs: 'https://cdn.eso.org/images/screen/eso0932a.jpg',
    id: 'ascendRift',
    order: 11,
    realX: Game.Upgrades['Rift'].posX,
    realY: Game.Upgrades['Rift'].posY,
    rotation: -Math.PI / 6,
    behaviors: function() {
        if (this.noDraw = (!Game.OnAscend || !C.cookieclysm)) return false;
        let b=Game.ascendl.getBounds();
        this.x = (b.left+b.right)/2 + (this.realX + Game.AscendOffX) * Game.AscendZoom;
		this.y = (b.top+b.bottom)/2 + (this.realY + Game.AscendOffY)  * Game.AscendZoom;
        this.scaleX = this.scaleY = 2 * Game.AscendZoom;
        if (Game.AscendOffX + Game.AscendOffY < 4000) {
            this.alpha = 0;
            return;
        }
        this.alpha = Math.min(1, (Game.AscendOffX + Game.AscendOffY - 4000) / 1600) * 0.3;
        // this.getComponent('patternFill').width = 1280
    },
    components: [
        new Crumbs.component.patternFill({ width: 1280 * 5 * 2, sy: 40, sHeight: 560 }),
        // new Crumbs.component.linearFade({ distance: 160, progress: 320 }),
        // new Crumbs.component.linearFade({ distance: 160, progress: 320, flip: true }),
    ]
}
