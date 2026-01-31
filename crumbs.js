
C.ascendObject = new Crumbs.behavior(function(p) {
    if (Game.OnAscend != 1) {
        this.noDraw = true;
        return;
    }
    this.noDraw = false;
    let b = Game.ascendl.getBounds();
    this.x = (b.left+b.right)/2 + (p.x + Game.AscendOffX) * Game.AscendZoom;
    this.y = (b.top+b.bottom)/2 + (p.y + Game.AscendOffY)  * Game.AscendZoom;
    this.scaleX = this.scaleY = 2 * Game.AscendZoom;
}, { x: 0, y: 0 });

C.transcendObject = new Crumbs.behavior(function(p) {
    if (Game.OnAscend != 2) {
        this.noDraw = true;
        return;
    }
    this.noDraw = false;
    let b = l('transcend').getBounds();
    this.x = (b.left+b.right)/2 + (p.x + C.transcendOffX) * C.transcendZoom;
    this.y = (b.top+b.bottom)/2 + (p.y + C.transcendOffY)  * C.transcendZoom;
    this.scaleX = this.scaleY = 2 * C.transcendZoom;
}, { x: 0, y: 0 });




/*
wrinklers
*/
C.wrinklerSkins = new Crumbs.behavior(function(p) {
    if (Game.wrinklers[this.wId].phase > 0) {
        if (Game.wrinklers[this.wId].super) { this.imgUsing = Game.WINKLERS ? 5 : Game.wrinklers[this.wId].type > 0 ? 8 : 7; return; }
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
    C.images.superWrinkler,
    C.images.superWrinklerShiny,
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
    this.sy = 0;
    if (this.type == 1) this.sy = 48;
    // this.sy = 48 * this.type; //absolutely insane
});
C.antMovement = new Crumbs.behavior(function() {
    if (this.life != 0) {
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
        else {
            this.life--;
            yOffset = -this.life;
            this.alpha = 1 - (this.life / -45);
            if (this.life <= -45) C.loseAnt(this.parent.wId, this.aId, true);
        }
        this.offsetY = yOffset;
        this.x = this.positions.x;
        this.y = this.positions.y;
        return;
    }
    const c = Math.cos(this.parent.rotation);
    const s = Math.sin(this.parent.rotation);
    this.x = (this.positions.x * c - this.positions.y * s);
    this.y = (this.positions.x * s + this.positions.y * c);
    this.rotation = this.positions.r;
    this.alpha *= this.parent.alpha;

    this.cookies += (((Game.cookiesPs / Game.fps) * Game.cpsSucked)) * (0.05 * (this.type + 1));

    if (Math.random() < 0.001) C.loseAnt(this.parent.wId, this.aId, false);
});

C.antTemplate = {
    enabled: false,
    id: 'ant',
    width: 48, height: 48, sx: 48 * 8,
    imgs: C.images.icons,
    scope: 'left', order: 20, anchor: 'center',
    behaviors: [
        new Crumbs.behaviorInstance(C.antSkin),
        new Crumbs.behaviorInstance(C.antMovement)
    ],
    components: new Crumbs.component.pointerInteractive({ alwaysInteractable: true, onClick: function() { C.killAnt(this); } }),
};

for (let i in Game.wrinklers) {
    let w = Crumbs.findObject('wrinkler' + i, 'left');
    w.imgs = C.allWrinklerSkins;
    w.behaviors = [
        new Crumbs.behaviorInstance(C.wrinklerSkins), 
        new Crumbs.behaviorInstance(C.wrinklerMovement), 
        new Crumbs.behaviorInstance(Crumbs.objectBehaviors.wrinklerParticles)
    ];
    for (let ii = 0; ii < 3; ii++) w.spawnChild(C.antTemplate, { aId: ii });
    w.getComponent('pointerInteractive').onRelease = C.onWrinklerClick;
    w.getComponent('pointerInteractive').alwaysInteractable = true;
    Game.wrinklers[i].crumbsObj = w;
}


/*
broken cookie stuff
*/

//broken cookie chunks
C.brokenCookieChunks = [];
C.createAlternateBrokenCookie = function() {
    C.brokenCookieChunksContainer = Crumbs.spawn({
        id: 'brokenCookieChunks',
        scope: 'left',
        order: 10,
        // behaviors: Crumbs.objectBehaviors.centerOnBigCookie
    });

    
    let h = [ //hardcoded values for where the chunks are visually (sx, sy, swidth, sheight)
        [32, 18, 67, 60],
        [40, 6, 108, 126],
        [130, 7, 116, 130],
        [143, 116, 106, 99],
        [161, 154, 53, 79],
        [109, 170, 102, 80],
        [106, 127, 65, 58],
        [11, 134, 115, 113],
        [7, 46, 125, 111],
        [81, 81, 58, 54  ]
    ]

    for (let i = 0; i < 10; i++) {
        let chunk = C.brokenCookieChunksContainer.spawnChild({
            id: i,
            imgs: 'brokenCookie.png',
            order: i,
            sx: 256 * i + h[i][0],
            sy: h[i][1],
            width: h[i][2],
            height: h[i][3],
            behaviors: new Crumbs.behaviorInstance(C.brokenCookieToyBehavior, { s: Math.min(h[i][2], h[i][3]), id: i }),
            components: new Crumbs.component.pointerInteractive(),
        });
        C.brokenCookieChunks.push(chunk);
    }
}

C.brokenCookieReset = function() {
    C.brokenCookieChunks.forEach(x => { x.x = x.y = 0; x.rotation = 0; x.alpha = 1; x.behaviors.find(b => b[Crumbs.behaviorSym] == C.brokenCookieToyBehavior).yd = 0; } )
    // C.brokenCookieObject.enabled = false;
}



C.brokenCookieToyBehavior = new Crumbs.behavior(function(p) {
    // if (!C.cookieShattered) { return; }

    

    let height = this.scope.c.canvas.height;
    let width = this.scope.c.canvas.width;
    p.rd *= 0.75;
    p.yd += 1.5;
    
    if (this.y >= height - (Game.milkHd * height) + 8) {
        // p.xd *= 0.85;
        p.yd *= 0.85;
        if (Math.abs(p.rd) > 0.01) p.rd *= 0.35;
        p.yd -= 1;
        // p.xd += (this.id % 2 - 0.5) * 0.3;
        // p.yd += (this.id % 2 - 0.5) * 0.05;
    } else {
        p.rd += (this.id % 2 - 0.5) * 0.01;
    }
    
    p.yd *= Math.min(1, Math.abs(this.y + this.parent.y - (height - (Game.milkHd) * height) / 16));
    // p.rd += p.xd * 0.006 / (p.s / 64);
    
    if (this.x < p.s / 2 && p.xd < 0) { p.rd = p.xd / 100; p.xd = -p.xd * 0.57; } //0.57 decided by hr
    else if (this.x < p.s / 2) { p.xd = 0; this.x = p.s / 2; } 
    
    if (this.x > width - p.s / 2 && p.xd > 0) { p.rd = p.xd / 100; p.xd = -p.xd * 0.57; }
    else if (this.x > width - p.s / 2) { p.xd = 0; this.x = width - p.s / 2; }
    
    p.xd = Math.min(Math.max(p.xd, -30), 30);
    p.yd = Math.min(Math.max(p.yd, -30), 30);
    // p.rd = Math.min(Math.max(p.rd, -0.5), 0.5);
    
    this.x += p.xd;
    this.y += p.yd;
    this.y = Math.min(this.y, height - p.s / 2);
    this.rotation += p.rd;
    
    let comp = this.getComponent('pointerInteractive');
    if (comp.click) {
        this.x = Game.mouseX;
        this.y = Game.mouseY;
        p.xd += ((Game.mouseX - Game.mouseX2) * 3 - p.xd) * 0.5;
        p.yd += ((Game.mouseY - Game.mouseY2) * 3 - p.yd) * 0.5
    }
}, { xd: 0, yd: 0, rd: 0, s: 256 });
C.brokenCookieChunks.forEach(chunk => chunk.behaviors.push(new Crumbs.behaviorInstance(C.brokenCookieToyBehavior, { xd: 0, yd: 0, rd: 0, s: 256 })));
C.brokenCookieChunks.forEach(chunk => chunk.anchor = Crumbs.defaultAnchors.center);

C.brokenCookieChunks.forEach(chunk => chunk.addComponent(new Crumbs.component.text({ content: chunk.id.at(-1), outline: 2, size: 30 })));

C.dropChunk = function(id) {
    let chunk = C.brokenCookieChunks[id];
    chunk.shouldFall = true;    
}

C.dropRemainingChunks = function() {
    //it's easier to drop all of them instead of figuring out which ones are still there
    C.brokenCookieChunks.forEach(chunk => chunk.shouldFall = true);
}


/*
background clones
*/
/*
C.cloneBGBehavior = new Crumbs.behavior(function(p) {
    this.alpha = Math.max(0, Math.min(C.youWrath - 3, 1));
});
C.cloneBG = Crumbs.spawn({
    imgs: C.images.icons,
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
        if (Game.Ascend != 1 || !C.cookieclysm) {
            this.noDraw = true;
            return false;
        }
        this.noDraw = false;
        if (Game.AscendOffX + Game.AscendOffY < 4000) {
            this.alpha = 0;
            return;
        }
        this.alpha = Math.min(1, (Game.AscendOffX + Game.AscendOffY - 4000) / 1600);
    }
}
*/
/*
transcend
*/
C.transcendBGBehavior = new Crumbs.behavior(function() {
    if (Game.OnAscend != 2) {
        this.noDraw = true;
        return;
    }
    this.noDraw = false;

    var w = this.scope.c.canvas.width;
	var h = this.scope.c.canvas.height;
	var b = l('transcend').getBounds();
	var x = (b.left + b.right) / 2;
	var y = (b.top + b.bottom) / 2;
    this.alpha = (0.15 * Math.sin((Math.PI * Game.drawT) / 2800)) + 0.2;
    var s = 1 * (1 + Math.cos(Game.T * 0.0027) * 0.05);

    const comp = this.getComponent('patternFill');
    comp.width = w;
    comp.height = h;
    comp.dWidth = comp.dHeight = 1024 * s;
    comp.offX = x * 0.00125 * s;
    comp.offY = y * 0.00125 * s;
});

C.transcendBG = {
    anchor: 'top-left',
    id: 'transcendBackground',
    scope: 'transcend',
    imgs: 'starbg.jpg',
    order: -1,
    x: 0, y: 0,
    behaviors: new Crumbs.behaviorInstance(C.transcendBGBehavior),
    components: [
        new Crumbs.component.patternFill(),
        new Crumbs.component.canvasManipulator({ function: function(m, ctx) {
            ctx.fillStyle = 'black';
            let oldAlpha = ctx.globalAlpha;
            ctx.globalAlpha = 1;
            ctx.fillRect(0, 0, Game.bounds.width, Game.bounds.height);
            ctx.globalAlpha = oldAlpha;
        } }),
        new Crumbs.component.settings({ globalCompositeOperation: 'lighter' })
    ]
}

/*
C.transcendRiftUpgrade = {
    scope: 'transcend',
    imgs: C.images.icons, id: 'puck',
    sx: Game.Upgrades['Rift'].icon[0] * 48,
    sy: Game.Upgrades['Rift'].icon[1] * 48,
    width: 48, height: 48, scaleX: 2, scaleY: 2,
    alpha: 0.5,
    components: new Crumbs.component.pointerInteractive({
        alwaysInteractable: true,
        onMouseOver: function(m) { m.alpha = 0.7; },
        onMouseOut: function(m) { m.alpha = 0.5; },
        onRelease: function(m) {

        }
    })
}
*/

C.riftVisualBehavior = new Crumbs.behavior(function() {
    if (C.transcendModifier != 1) {
        this.noDraw = true;
        return;
    }
    this.noDraw = false;
});

C.riftBorders = {
    anchor: 'top-left',
    scope: 'foreground',
    imgs: C.images.riftBorders,
    order: 1,
    id: 'riftBorders',
    alpha: 0.25,
    behaviors: [
        new Crumbs.behaviorInstance(C.riftVisualBehavior),
        function() {
            this.scaleX = Game.bounds.width / 256;
            this.scaleY = Game.bounds.height / 256;
        }
    ]
}
Crumbs.spawn(C.riftBorders);


