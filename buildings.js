if (typeof Buildings == "undefined") Buildings = {};
Buildings.isLoaded = 0;

Buildings.launch = function () {
  Buildings.InitNote = function () {
    Buildings.iconURL =
      "https://klattmose.github.io/CookieClicker/img/CCSEicon.png";

    Buildings.functionsTotal =
      141 +
      Game.ObjectsN * 18 -
      1 +
      3 +
      Game.UpgradesN * 1 +
      25 +
      Game.AchievementsN * 1; // Needs to be manually updated
    Buildings.functionsAltered = 0;
    Buildings.progress = 0;

    Game.Notify(
      "Buildings is initializing",
      Buildings.GetProgressHTML(0),
      [0, 0, Buildings.iconURL],
      6,
      1,
    );
    Buildings.Note = Game.NotesById[Game.noteId - 1];
    Buildings.Note.life = 600000; // 10 minutes, just to be sure
  };

  Buildings.SliceCodeIntoFunction = function (
    functionName,
    pos,
    code,
    preEvalScript,
    hasPrototype,
  ) {
    var alterFunctionCode = function (temp) {
      return temp.slice(0, pos) + code + temp.slice(pos);
    };
    Buildings.InjectCodeIntoFunction(
      functionName,
      alterFunctionCode,
      code,
      preEvalScript,
      hasPrototype,
    );
  };

  Buildings.GetProgressHTML = function (progress) {
    return `<div style="text-align: center; font-weight: bold; color: white;">${progress}%</div>`;
  };

  Buildings.ReplaceCodeIntoFunction = function (
    functionName,
    targetString,
    code,
    mode,
    preEvalScript,
    hasPrototype,
  ) {
    var alterFunctionCode = function (temp) {
      switch (mode) {
        case -1: // Insert before targetString
          return temp.replace(targetString, code + "\n" + targetString);
        case 0: // Replace targetString. Regex will work
          return temp.replace(targetString, code);
        case 1: // Insert after targetString
          return temp.replace(targetString, targetString + "\n" + code);
        default:
          throw new Error("mode must be either, -1, 0, or 1");
      }
    };
    Buildings.InjectCodeIntoFunction(
      functionName,
      alterFunctionCode,
      code,
      preEvalScript,
      hasPrototype,
    );
  };

  Buildings.SpliceCodeIntoFunction = function (
    functionName,
    row,
    code,
    preEvalScript,
    hasPrototype,
  ) {
    var alterFunctionCode = function (temp) {
      temp = temp.split("\n");
      i = row < 0 ? temp.length + row : row;
      temp.splice(i, 0, code);
      return temp.join("\n");
    };
    Buildings.InjectCodeIntoFunction(
      functionName,
      alterFunctionCode,
      code,
      preEvalScript,
      hasPrototype,
    );
  };

  Buildings.InjectCodeIntoFunction = function (
    functionName,
    alterFunctionCode,
    code,
    preEvalScript,
    hasPrototype,
  ) {
    // preEvalScript is to set variables that are used in the function but aren't declared in the function
    if (preEvalScript) eval(preEvalScript);

    var originalFunction = eval(functionName);
    if (originalFunction === null) {
      console.warn(
        `Buildings: ${functionName} is not found. Could not inject ${code}`,
      );
      return;
    } else if (typeof originalFunction !== "function") {
      console.warn(
        `Buildings: ${functionName} is not a function. Could not inject ${code}`,
      );
      return;
    }

    //console.log(functionName);
    eval(functionName + " = " + alterFunctionCode(originalFunction.toString()));
    if (hasPrototype) {
      var alteredFunction = eval(functionName);
      alteredFunction.prototype = originalFunction.prototype;
    }

    Buildings.functionsAltered++;
    if (!Buildings.isLoaded) Buildings.UpdateNote();
    //if(eval(functionName + ".toString()").indexOf(code) == -1) console.log("Error injecting code into function " + functionName + ". Could not inject " + code);
  };

  Buildings.UpdateNote = function () {
    Buildings.Note.life = 600000;
    var progress = Math.min(
      Math.floor((Buildings.functionsAltered / Buildings.functionsTotal) * 100),
      100,
    );
    if (progress != Buildings.progress) {
      Buildings.progress = progress;
      Buildings.Note.desc = Buildings.GetProgressHTML(Buildings.progress);
      Game.UpdateNotes();
    }
  };

  Buildings.NewBuilding = function (
    name,
    commonName,
    desc,
    icon,
    iconColumn,
    art,
    price,
    cps,
    buyFunction,
    foolObject,
    buildingSpecial,
  ) {
    var me = new Game.Object(
      name,
      commonName,
      desc,
      icon,
      iconColumn,
      art,
      price,
      cps,
      buyFunction,
    );
    if (foolObject) Game.foolObjects[name] = foolObject;

    if (buildingSpecial) Game.goldenCookieBuildingBuffs[name] = buildingSpecial;

    Buildings.ReplaceBuilding(name);

    if (art.customBuildingPic) {
      Game.customBuildStore.push(function () {
        l("productIcon" + me.id).style.backgroundImage =
          "url(" + art.customBuildingPic + ")";
        l("productIconOff" + me.id).style.backgroundImage =
          "url(" + art.customBuildingPic + ")";
      });
    }
    if (art.customIconsPic) {
      Game.customBuildings[name].tooltip.push(function (obj, ret) {
        if (me.locked) return ret;
        else
          return ret.replace(
            "background-position",
            "background-image:url(" +
              obj.art.customIconsPic +
              ");background-position",
          );
      });
    }

    if (Buildings.config.Buildings[name]) {
      var saved = Buildings.config.Buildings[name];
      me.amount = saved.amount;
      me.bought = saved.bought;
      me.totalCookies = saved.totalCookies;
      me.level = saved.level;
      me.muted = saved.muted;
      me.highest = saved.highest ? saved.highest : 0; // Left this out earlier, can't expect it to be there
      me.free = saved.free ? saved.free : 0; // Left this out earlier, can't expect it to be there
      me.minigameSave = saved.minigameSave;

      Game.BuildingsOwned += me.amount;
    } else {
      var saved = {};
      saved.amount = 0;
      saved.bought = 0;
      saved.totalCookies = 0;
      saved.level = 0;
      saved.muted = 0;
      saved.free = 0;
      saved.highest = 0;
      saved.minigameSave = "";

      Buildings.config.Buildings[name] = saved;
    }

    Game.BuildStore();

    me.canvas = l("rowCanvas" + me.id);
    me.ctx = me.canvas.getContext("2d", { alpha: false });
    me.pics = [];
    var icon = [0 * 64, me.icon * 64];
    var muteStr =
      '<div class="tinyProductIcon" id="mutedProduct' +
      me.id +
      '" style="display:none;' +
      (me.art.customBuildingPic
        ? "background-image:url(" + me.art.customBuildingPic + ");"
        : "") +
      "background-position:-" +
      icon[0] +
      "px -" +
      icon[1] +
      'px;" ' +
      Game.clickStr +
      '="Game.ObjectsById[' +
      me.id +
      "].mute(0);PlaySound(Game.ObjectsById[" +
      me.id +
      "].muted?'snd/clickOff.mp3':'snd/clickOn.mp3');\" " +
      Game.getDynamicTooltip(
        "Game.mutedBuildingTooltip(" + me.id + ")",
        "this",
      ) +
      "></div>";

    AddEvent(
      me.canvas,
      "mouseover",
      (function (me) {
        return function () {
          me.mouseOn = true;
        };
      })(me),
    );
    AddEvent(
      me.canvas,
      "mouseout",
      (function (me) {
        return function () {
          me.mouseOn = false;
        };
      })(me),
    );
    AddEvent(
      me.canvas,
      "mousemove",
      (function (me) {
        return function (e) {
          var box = this.getBoundingClientRect();
          me.mousePos[0] = e.pageX - box.left;
          me.mousePos[1] = e.pageY - box.top;
        };
      })(me),
    );

    l("buildingsMute").innerHTML += muteStr;

    Game.recalculateGains = 1;
    return me;
  };

  Buildings.ReplaceBuilding = function (key) {
    // A lot of Copy/Paste happened, hence why I did so many functions.
    // Also, I may not have fully tested each one.
    var temp = "";
    var pos = 0;
    var proto;
    var escKey = key.replace(/'/g, "\\'");
    var obj = Game.Objects[key];

    if (!Game.customBuildings[key]) Game.customBuildings[key] = {};
    Buildings.Backup.customBuildings[key] = {};

    // this.switchMinigame
    if (!Game.customBuildings[key].switchMinigame)
      Game.customBuildings[key].switchMinigame = [];
    Game.customBuildings[key].switchMinigame.push(
      Buildings.customBuildingsAllswitchMinigame,
    );
    Buildings.SliceCodeIntoFunction(
      "Game.Objects['" + escKey + "'].switchMinigame",
      -1,
      `
        // Game.Objects['` +
        escKey +
        `'].switchMinigame injection point 0
        for(var i in Game.customBuildings[this.name].switchMinigame) Game.customBuildings[this.name].switchMinigame[i](this, on);
      `,
    );

    // this.getSellMultiplier
    // Return ret to have no effect
    if (!Game.customBuildings[key].getSellMultiplier)
      Game.customBuildings[key].getSellMultiplier = [];
    Game.customBuildings[key].getSellMultiplier.push(
      Buildings.customBuildingsAllgetSellMultiplier,
    );
    Buildings.ReplaceCodeIntoFunction(
      "Game.Objects['" + escKey + "'].getSellMultiplier",
      "return",
      `
        // Game.Objects['` +
        escKey +
        `'].getSellMultiplier injection point 0
        for(var i in Game.customBuildings[this.name].getSellMultiplier) giveBack = Game.customBuildings[this.name].getSellMultiplier[i](this, giveBack);`,
      -1,
    );

    // this.buy
    if (!Game.customBuildings[key].buy) Game.customBuildings[key].buy = [];
    Game.customBuildings[key].buy.push(Buildings.customBuildingsAllbuy);
    Buildings.SliceCodeIntoFunction(
      "Game.Objects['" + escKey + "'].buy",
      -1,
      `
        // Game.Objects['` +
        escKey +
        `'].buy injection point 0
        for(var i in Game.customBuildings[this.name].buy) Game.customBuildings[this.name].buy[i](this, amount);
      `,
    );

    // this.sell
    if (!Game.customBuildings[key].sell) Game.customBuildings[key].sell = [];
    Game.customBuildings[key].sell.push(Buildings.customBuildingsAllsell);
    Buildings.SliceCodeIntoFunction(
      "Game.Objects['" + escKey + "'].sell",
      -1,
      `
        // Game.Objects['` +
        escKey +
        `'].sell injection point 0
        for(var i in Game.customBuildings[this.name].sell) Game.customBuildings[this.name].sell[i](this, amount, bypass);
      `,
    );

    // this.sacrifice
    if (!Game.customBuildings[key].sacrifice)
      Game.customBuildings[key].sacrifice = [];
    Game.customBuildings[key].sacrifice.push(
      Buildings.customBuildingsAllsacrifice,
    );
    Buildings.SliceCodeIntoFunction(
      "Game.Objects['" + escKey + "'].sacrifice",
      -1,
      `
        // Game.Objects['` +
        escKey +
        `'].sacrifice injection point 0
        for(var i in Game.customBuildings[this.name].sacrifice) Game.customBuildings[this.name].sacrifice[i](this, amount);
      `,
    );

    // this.buyFree
    if (!Game.customBuildings[key].buyFree)
      Game.customBuildings[key].buyFree = [];
    Game.customBuildings[key].buyFree.push(Buildings.customBuildingsAllbuyFree);
    Buildings.SliceCodeIntoFunction(
      "Game.Objects['" + escKey + "'].buyFree",
      -1,
      `
        // Game.Objects['` +
        escKey +
        `'].buyFree injection point 0
        for(var i in Game.customBuildings[this.name].buyFree) Game.customBuildings[this.name].buyFree[i](this, amount);
      `,
      'var price = Game.Objects["' + escKey + '"].basePrice',
    );

    // this.getFree
    if (!Game.customBuildings[key].getFree)
      Game.customBuildings[key].getFree = [];
    Game.customBuildings[key].getFree.push(Buildings.customBuildingsAllgetFree);
    Buildings.SliceCodeIntoFunction(
      "Game.Objects['" + escKey + "'].getFree",
      -1,
      `
        // Game.Objects['` +
        escKey +
        `'].getFree injection point 0
        for(var i in Game.customBuildings[this.name].getFree) Game.customBuildings[this.name].getFree[i](this, amount);
      `,
    );

    // this.getFreeRanks
    if (!Game.customBuildings[key].getFreeRanks)
      Game.customBuildings[key].getFreeRanks = [];
    Game.customBuildings[key].getFreeRanks.push(
      Buildings.customBuildingsAllgetFreeRanks,
    );
    Buildings.SliceCodeIntoFunction(
      "Game.Objects['" + escKey + "'].getFreeRanks",
      -1,
      `
        // Game.Objects['` +
        escKey +
        `'].getFreeRanks injection point 0
        for(var i in Game.customBuildings[this.name].getFreeRanks) Game.customBuildings[this.name].getFreeRanks[i](this, amount);
      `,
    );

    // this.tooltip
    // Return ret to have no effect
    if (!Game.customBuildings[key].tooltip)
      Game.customBuildings[key].tooltip = [];
    Game.customBuildings[key].tooltip.push(Buildings.customBuildingsAlltooltip);
    Buildings.ReplaceCodeIntoFunction(
      "Game.Objects['" + escKey + "'].tooltip",
      "return",
      "var ret =",
      0,
    );
    Buildings.SliceCodeIntoFunction(
      "Game.Objects['" + escKey + "'].tooltip",
      -1,
      `
        // Game.Objects['` +
        escKey +
        `'].tooltip injection point 0
        for(var i in Game.customBuildings[this.name].tooltip) ret = Game.customBuildings[this.name].tooltip[i](this, ret);
        return ret;
      `,
    );

    // this.levelTooltip
    // Return ret to have no effect
    if (!Game.customBuildings[key].levelTooltip)
      Game.customBuildings[key].levelTooltip = [];
    Game.customBuildings[key].levelTooltip.push(
      Buildings.customBuildingsAlllevelTooltip,
    );
    Buildings.ReplaceCodeIntoFunction(
      "Game.Objects['" + escKey + "'].levelTooltip",
      "return",
      "var ret =",
      0,
    );
    Buildings.SliceCodeIntoFunction(
      "Game.Objects['" + escKey + "'].levelTooltip",
      -1,
      `
        // Game.Objects['` +
        escKey +
        `'].levelTooltip injection point 0
        for(var i in Game.customBuildings[this.name].levelTooltip) ret = Game.customBuildings[this.name].levelTooltip[i](this, ret);
        return ret;
      `,
    );

    // this.levelUp
    // Haha no. This is like four functions that return each other
    // I'm not dealing with it unless I have to.

    // this.refresh
    if (!Game.customBuildings[key].refresh)
      Game.customBuildings[key].refresh = [];
    Game.customBuildings[key].refresh.push(Buildings.customBuildingsAllrefresh);
    Buildings.SliceCodeIntoFunction(
      "Game.Objects['" + escKey + "'].refresh",
      -1,
      `
        // Game.Objects['` +
        escKey +
        `'].refresh injection point 0
        for(var i in Game.customBuildings[this.name].refresh) Game.customBuildings[this.name].refresh[i](this);
      `,
    );

    // this.rebuild
    if (!Game.customBuildings[key].rebuild)
      Game.customBuildings[key].rebuild = [];
    Game.customBuildings[key].rebuild.push(Buildings.customBuildingsAllrebuild);
    Buildings.SliceCodeIntoFunction(
      "Game.Objects['" + escKey + "'].rebuild",
      -1,
      `
        // Game.Objects['` +
        escKey +
        `'].rebuild injection point 0
        for(var i in Game.customBuildings[this.name].rebuild) Game.customBuildings[this.name].rebuild[i](this);
      `,
    );

    // this.mute
    if (!Game.customBuildings[key].mute) Game.customBuildings[key].mute = [];
    Game.customBuildings[key].mute.push(Buildings.customBuildingsAllmute);
    Buildings.SliceCodeIntoFunction(
      "Game.Objects['" + escKey + "'].mute",
      -1,
      `
        // Game.Objects['` +
        escKey +
        `'].mute injection point 0
        for(var i in Game.customBuildings[this.name].mute) Game.customBuildings[this.name].mute[i](this, val);
      `,
    );

    // this.draw
    if (!Game.customBuildings[key].draw) Game.customBuildings[key].draw = [];
    Game.customBuildings[key].draw.push(Buildings.customBuildingsAlldraw);
    if (key == "Cursor") {
      // Because cursors are special
      Game.Objects[key].draw = function () {
        // Game.Objects['Cursor'].draw injection point 0
        for (var i in Game.customBuildings[this.name].draw)
          Game.customBuildings[this.name].draw[i](this);
      };
    } else {
      Buildings.SliceCodeIntoFunction(
        "Game.Objects['" + escKey + "'].draw",
        -1,
        `
        // Game.Objects['` +
          escKey +
          `'].draw injection point 0
        for(var i in Game.customBuildings[this.name].draw) Game.customBuildings[this.name].draw[i](this);
      `,
      );
    }

    // this.buyFunction
    if (!Game.customBuildings[key].buyFunction)
      Game.customBuildings[key].buyFunction = [];
    Game.customBuildings[key].buyFunction.push(
      Buildings.customBuildingsAllbuyFunction,
    );
    Buildings.SliceCodeIntoFunction(
      "Game.Objects['" + escKey + "'].buyFunction",
      -1,
      `
        // Game.Objects['` +
        escKey +
        `'].buyFunction injection point 0
        for(var i in Game.customBuildings[this.name].buyFunction) Game.customBuildings[this.name].buyFunction[i](this);
      `,
    );

    // this.cps
    // cpsMult Functions should return a value to multiply the price by (Return 1 to have no effect)
    if (!Game.customBuildings[obj.name].cpsMult)
      Game.customBuildings[obj.name].cpsMult = [];
    Game.customBuildings[key].cpsMult.push(Buildings.customBuildingsAllcpsMult);
    Buildings.ReplaceCodeIntoFunction(
      "Game.Objects['" + escKey + "'].cps",
      "return",
      `
        // Game.Objects['` +
        escKey +
        `'].cps injection point 0
        for(var i in Game.customBuildings[this.name].cpsMult) mult *= Game.customBuildings[this.name].cpsMult[i](me);
    `,
      -1,
    );

    for (var i in Buildings.customReplaceBuilding)
      Buildings.customReplaceBuilding[i](key, obj);
  };

  if (!Buildings.customReplaceUpgrade) Buildings.customReplaceUpgrade = [];
  Buildings.ReplaceUpgradesStart = function () {
    if (!Game.customUpgradesAll) Game.customUpgradesAll = {};

    if (!Game.customUpgradesAll.getPrice) Game.customUpgradesAll.getPrice = [];
    Buildings.customUpgradesAllgetPrice = function (me) {
      var ret = 1;
      for (var i in Game.customUpgradesAll.getPrice)
        ret *= Game.customUpgradesAll.getPrice[i](me);
      return ret;
    };

    if (!Game.customUpgradesAll.click) Game.customUpgradesAll.click = [];
    Buildings.customUpgradesAllclick = function (me, e) {
      for (var i in Game.customUpgradesAll.click)
        Game.customUpgradesAll.click[i](me, e);
    };

    if (!Game.customUpgradesAll.buy) Game.customUpgradesAll.buy = [];
    Buildings.customUpgradesAllbuy = function (me, bypass, success) {
      for (var i in Game.customUpgradesAll.buy)
        Game.customUpgradesAll.buy[i](me, bypass, success);
    };

    if (!Game.customUpgradesAll.earn) Game.customUpgradesAll.earn = [];
    Buildings.customUpgradesAllearn = function (me) {
      for (var i in Game.customUpgradesAll.earn)
        Game.customUpgradesAll.earn[i](me);
    };

    if (!Game.customUpgradesAll.unearn) Game.customUpgradesAll.unearn = [];
    Buildings.customUpgradesAllunearn = function (me) {
      for (var i in Game.customUpgradesAll.unearn)
        Game.customUpgradesAll.unearn[i](me);
    };

    if (!Game.customUpgradesAll.unlock) Game.customUpgradesAll.unlock = [];
    Buildings.customUpgradesAllunlock = function (me) {
      for (var i in Game.customUpgradesAll.unlock)
        Game.customUpgradesAll.unlock[i](me);
    };

    if (!Game.customUpgradesAll.lose) Game.customUpgradesAll.lose = [];
    Buildings.customUpgradesAlllose = function (me) {
      for (var i in Game.customUpgradesAll.lose)
        Game.customUpgradesAll.lose[i](me);
    };

    if (!Game.customUpgradesAll.toggle) Game.customUpgradesAll.toggle = [];
    Buildings.customUpgradesAlltoggle = function (me) {
      for (var i in Game.customUpgradesAll.toggle)
        Game.customUpgradesAll.toggle[i](me);
    };

    if (!Game.customUpgradesAll.buyFunction)
      Game.customUpgradesAll.buyFunction = [];
    Buildings.customUpgradesAllbuyFunction = function (me) {
      for (var i in Game.customUpgradesAll.buyFunction)
        Game.customUpgradesAll.buyFunction[i](me);
    };

    if (!Game.customUpgradesAll.descFunc) Game.customUpgradesAll.descFunc = [];
    Buildings.customUpgradesAlldescFunc = function (me, desc) {
      for (var i in Game.customUpgradesAll.descFunc)
        desc = Game.customUpgradesAll.descFunc[i](me, desc);
      return desc;
    };

    if (!Game.customUpgrades) Game.customUpgrades = {};
    Buildings.Backup.customUpgrades = {};
    Buildings.i = 0;
  };

  Buildings.ReplaceUpgrades = function () {
    var time = Date.now();

    for (var i = Buildings.i; i < Game.UpgradesN; i++) {
      Buildings.ReplaceUpgrade(Game.UpgradesById[i].name);
      if (Date.now() > time + 500 / Game.fps) break;
    }

    Buildings.i = i + 1;
    if (Buildings.i < Game.UpgradesN) {
      // Didn't do all of them. Wait for priority and go again
      requestAnimationFrame(Buildings.ReplaceUpgrades);
    } else {
      // Continue on
      requestAnimationFrame(Buildings.playlist[Buildings.track++]);
    }
  };

  Buildings.ReplaceUpgradesFinish = function () {
    // this.getPrice
    // Functions should return a value to multiply the price by (Return 1 to have no effect)
    Buildings.ReplaceCodeIntoFunction(
      "Game.Upgrade.prototype.getPrice",
      "return Math",
      `
      // Game.Upgrade.prototype.getPrice injection point 0
      if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].getPrice) price *= Game.customUpgrades[this.name].getPrice[i](this);`,
      -1,
    );

    // this.click
    Buildings.SliceCodeIntoFunction(
      "Game.Upgrade.prototype.click",
      -1,
      `
        // Game.Upgrade.prototype.click injection point 0
        if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].click) Game.customUpgrades[this.name].click[i](this, e);
      `,
    );

    // this.buy
    Buildings.ReplaceCodeIntoFunction(
      "Game.Upgrade.prototype.buy",
      "return success",
      `
      // Game.Upgrade.prototype.buy injection point 0
      if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].buy) Game.customUpgrades[this.name].buy[i](this, bypass, success);`,
      -1,
    );

    // this.earn
    Buildings.SliceCodeIntoFunction(
      "Game.Upgrade.prototype.earn",
      -1,
      `
        // Game.Upgrade.prototype.earn injection point 0
        if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].earn) Game.customUpgrades[this.name].earn[i](this);
      `,
    );

    // this.unearn
    Buildings.SliceCodeIntoFunction(
      "Game.Upgrade.prototype.unearn",
      -1,
      `
        // Game.Upgrade.prototype.unearn injection point 0
        if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].unearn) Game.customUpgrades[this.name].unearn[i](this);
      `,
    );

    // this.unlock
    Buildings.SliceCodeIntoFunction(
      "Game.Upgrade.prototype.unlock",
      -1,
      `
        // Game.Upgrade.prototype.unlock injection point 0
        if(Game.customUpgrades[this.name]) if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].unlock) Game.customUpgrades[this.name].unlock[i](this);
      `,
    );

    // this.lose
    Buildings.SliceCodeIntoFunction(
      "Game.Upgrade.prototype.lose",
      -1,
      `
        // Game.Upgrade.prototype.lose injection point 0
        if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].lose) Game.customUpgrades[this.name].lose[i](this);
      `,
    );

    // this.toggle
    Buildings.SliceCodeIntoFunction(
      "Game.Upgrade.prototype.toggle",
      -1,
      `
        // Game.Upgrade.prototype.toggle injection point 0
        if(Game.customUpgrades[this.name]) for(var i in Game.customUpgrades[this.name].toggle) Game.customUpgrades[this.name].toggle[i](this);
      `,
    );

    // this.isVaulted
    Buildings.SpliceCodeIntoFunction(
      "Game.Upgrade.prototype.isVaulted",
      2,
      `
        // Game.Upgrade.prototype.isVaulted injection point 0
        if (Buildings.config.vault.indexOf(this.name)!=-1) return true;
      `,
    );

    // this.vault
    Buildings.ReplaceCodeIntoFunction(
      "Game.Upgrade.prototype.vault",
      "Game.vault",
      `
        if(this.Building) Buildings.config.vault.push(this.name);
                else `,
      -1,
    );

    // this.unvault
    Buildings.ReplaceCodeIntoFunction(
      "Game.Upgrade.prototype.unvault",
      "Game.vault",
      `
        if(this.Building) Buildings.config.vault.splice(Buildings.config.vault.indexOf(this.name),1);
                else `,
      -1,
    );

    // Golden cookie sound selector custom options
    Buildings.ReplaceCodeIntoFunction(
      "Game.Upgrades['Golden cookie sound selector'].olddescFunc",
      "this.choicesFunction()[Game.chimeType]",
      "Buildings.GetSelectedShimmerSound()",
      0,
    );
    //Buildings.ReplaceCodeIntoFunction("Game.Upgrades['Golden cookie sound selector'].olddescFunc", "'+icon[2]+'", "'+choice.icon[2]+'", 0);

    // Game.Upgrades['Golden cookie sound selector'].choicesFunction
    if (!Game.customUpgrades["Golden cookie sound selector"].choicesFunction)
      Game.customUpgrades["Golden cookie sound selector"].choicesFunction = [];
    Buildings.ReplaceCodeIntoFunction(
      "Game.Upgrades['Golden cookie sound selector'].choicesFunction",
      "return choices;",
      `// Game.customUpgrades['Golden cookie sound selector'].choicesFunction injection point 0
      for(var i in Game.customUpgrades['Golden cookie sound selector'].choicesFunction) Game.customUpgrades['Golden cookie sound selector'].choicesFunction[i](choices);
      Buildings.OverrideShimmerSoundSelector(choices);`,
      -1,
    );

    /*Game.customUpgrades['Golden cookie sound selector'].choicesFunction.push(function(choices){
      choices[1].default = 'snd/chime.mp3';
      choices[1].shimmerTypes = {golden:'snd/chime.mp3', reindeer:'snd/jingle.mp3'};
    });*/

    Buildings.ReplaceCodeIntoFunction(
      "Game.Upgrades['Golden cookie sound selector'].choicesPick",
      "Game.chimeType=id;",
      "Buildings.SetSelectedShimmerSound(id);",
      0,
    );

    // Milk selector custom options
    Buildings.ReplaceCodeIntoFunction(
      "Game.Upgrades['Milk selector'].olddescFunc",
      "this.choicesFunction()[Game.milkType]",
      "Buildings.GetSelectedMilk()",
      0,
    );

    // Game.Upgrades['Milk selector'].choicesFunction
    if (!Game.customUpgrades["Milk selector"].choicesFunction)
      Game.customUpgrades["Milk selector"].choicesFunction = [];
    Buildings.ReplaceCodeIntoFunction(
      "Game.Upgrades['Milk selector'].choicesFunction",
      "return choices;",
      `// Game.customUpgrades['Milk selector'].choicesFunction injection point 0
      for(var i in Game.customUpgrades['Milk selector'].choicesFunction) Game.customUpgrades['Milk selector'].choicesFunction[i](choices);
      Buildings.OverrideMilkSelector(choices);`,
      -1,
    );

    Game.customUpgrades["Milk selector"].choicesFunction.push(
      function (choices) {
        if (!Buildings.Steam)
          for (var i in choices) choices[i].milk = Game.AllMilks[i];
        choices[0].milk = Game.Milk;
      },
    );

    Buildings.ReplaceCodeIntoFunction(
      "Game.Upgrades['Milk selector'].choicesPick",
      "Game.milkType=id;",
      "Buildings.SetSelectedMilk(id);",
      0,
    );

    // Background selector custom options
    Buildings.ReplaceCodeIntoFunction(
      "Game.Upgrades['Background selector'].olddescFunc",
      "this.choicesFunction()[Game.bgType]",
      "Buildings.GetSelectedBackground()",
      0,
    );

    // Game.Upgrades['Background selector'].choicesFunction
    if (!Game.customUpgrades["Background selector"].choicesFunction)
      Game.customUpgrades["Background selector"].choicesFunction = [];
    Buildings.ReplaceCodeIntoFunction(
      "Game.Upgrades['Background selector'].choicesFunction",
      "return choices;",
      `// Game.customUpgrades['Background selector'].choicesFunction injection point 0
      for(var i in Game.customUpgrades['Background selector'].choicesFunction) Game.customUpgrades['Background selector'].choicesFunction[i](choices);
      Buildings.OverrideBackgroundSelector(choices);`,
      -1,
    );

    Buildings.ReplaceCodeIntoFunction(
      "Game.Upgrades['Background selector'].choicesPick",
      "Game.bgType=id;",
      "Buildings.SetSelectedBackground(id);",
      0,
    );

    // Game.Upgrades['Jukebox'].choicesFunction
    // Return str to have no effect
    if (!Game.customUpgrades["Jukebox"].choicesFunction)
      Game.customUpgrades["Jukebox"].choicesFunction = [];
    Buildings.ReplaceCodeIntoFunction(
      "Game.Upgrades['Jukebox'].choicesFunction",
      "return",
      `// Game.customUpgrades['Jukebox'].choicesFunction injection point 0
      for(var i in Game.customUpgrades['Jukebox'].choicesFunction) str = Game.customUpgrades['Jukebox'].choicesFunction[i](str);`,
      -1,
    );

    // Permanent upgrades are tricky
    var slots = [
      "Permanent upgrade slot I",
      "Permanent upgrade slot II",
      "Permanent upgrade slot III",
      "Permanent upgrade slot IV",
      "Permanent upgrade slot V",
    ];
    for (var i = 0; i < slots.length; i++) {
      Buildings.SpliceCodeIntoFunction(
        "Game.Upgrades['" + slots[i] + "'].olddescFunc",
        1,
        `// ` +
          slots[i] +
          ` olddescFunc injection point 0
        var id = Game.permanentUpgrades[` +
          i +
          `];
        for(var i in Game.customPermanentUpgradeId) id = Game.customPermanentUpgradeId[i](` +
          i +
          `, id);`,
        'Game.Upgrades["' +
          slots[i] +
          '"].olddescFunc=' +
          Game.Upgrades[slots[i]].olddescFunc
            .toString()
            .replaceAll("Game.permanentUpgrades[i]", "id"),
      );
    }
  };

  Buildings.InitializeConfig = function (config) {
    if (!Buildings.config) Buildings.config = {};
    if (!Buildings.config.version) Buildings.config.version = 1;
    if (!Buildings.config.Achievements) Buildings.config.Achievements = {};
    if (!Buildings.config.Upgrades) Buildings.config.Upgrades = {};
    if (!Buildings.config.Buildings) Buildings.config.Buildings = {};
    if (!Buildings.config.Buffs) Buildings.config.Buffs = {};
    if (!Buildings.config.Seasons) Buildings.config.Seasons = {};
    if (!Buildings.config.OtherMods) Buildings.config.OtherMods = {};
    if (!Buildings.config.vault) Buildings.config.vault = [];
    if (!Buildings.config.permanentUpgrades)
      Buildings.config.permanentUpgrades = [-1, -1, -1, -1, -1];
    if (!Buildings.config.chimeType) Buildings.config.chimeType = "No sound";
    if (!Buildings.config.milkType) Buildings.config.milkType = "Automatic";
    if (!Buildings.config.bgType) Buildings.config.bgType = "Automatic";
    if (Buildings.config.showVersionNo === undefined)
      Buildings.config.showVersionNo = 1;

    if (config) {
      if (config.version) Buildings.config.version = config.version;
      if (config.Achievements)
        for (var i in config.Achievements)
          Buildings.config.Achievements[i] = config.Achievements[i];
      if (config.Upgrades)
        for (var i in config.Upgrades)
          Buildings.config.Upgrades[i] = config.Upgrades[i];
      if (config.Buildings)
        for (var i in config.Buildings)
          Buildings.config.Buildings[i] = config.Buildings[i];
      if (config.Buffs)
        for (var i in config.Buffs) Buildings.config.Buffs[i] = config.Buffs[i];
      if (config.Seasons)
        for (var i in config.Seasons)
          Buildings.config.Seasons[i] = config.Seasons[i];
      if (config.OtherMods)
        for (var i in config.OtherMods)
          Buildings.config.OtherMods[i] = config.OtherMods[i];
      if (config.vault)
        for (var i in config.vault) Buildings.config.vault[i] = config.vault[i];
      if (config.permanentUpgrades)
        for (var i in config.permanentUpgrades)
          Buildings.config.permanentUpgrades[i] = config.permanentUpgrades[i];
      if (config.chimeType) Buildings.config.chimeType = config.chimeType;
      if (config.milkType) Buildings.config.milkType = config.milkType;
      if (config.bgType) Buildings.config.bgType = config.bgType;
      if (config.showVersionNo !== undefined)
        Buildings.config.showVersionNo = config.showVersionNo;
    }
  };
  function inRect(x, y, rect) {
    //find out if the point x,y is in the rotated rectangle rect{w,h,r,o} (width,height,rotation in radians,y-origin) (needs to be normalized)
    //I found this somewhere online I guess
    var dx = x + Math.sin(-rect.r) * -(rect.h / 2 - rect.o),
      dy = y + Math.cos(-rect.r) * -(rect.h / 2 - rect.o);
    var h1 = Math.sqrt(dx * dx + dy * dy);
    var currA = Math.atan2(dy, dx);
    var newA = currA - rect.r;
    var x2 = Math.cos(newA) * h1;
    var y2 = Math.sin(newA) * h1;
    if (
      x2 > -0.5 * rect.w &&
      x2 < 0.5 * rect.w &&
      y2 > -0.5 * rect.h &&
      y2 < 0.5 * rect.h
    )
      return true;
    return false;
  }

  Buildings.ConfirmGameVersion = function (modName, modVersion, version) {
    var proceed = true;
    if (Game.version != version) {
      proceed = Buildings.ConfirmLoad(
        modName,
        modVersion,
        `Game version ${version}`,
      );
    }
    return proceed;
  };

  Buildings.ConfirmLoad = function(modName, modVersion, versionText){
    return confirm(
      `${ modName } version ${ modVersion } is meant for ${ versionText }.  `+
      "Loading a different version may cause errors.  " +
      `Do you still want to load ${ modName }?`);
  }
  
  Buildings.getTieredUpgradeOrder = function () {
    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    var res = 0;
    for (var i = 0; i < Game.ObjectsN; i++) {
      var me = Game.ObjectsById[i];
      for (var ii in me.tieredUpgrades) {
        if (isNumber(ii)) res = Math.max(me.tieredUpgrades[ii].order, res);
      }
    }

    return res + 0.01;
  };

  Buildings.getGrandmaUpgradeOrder = function () {
    var res = 0;
    for (var i in Game.GrandmaSynergies) {
      res = Math.max(Game.Upgrades[Game.GrandmaSynergies[i]].order, res);
    }

    return res + 0.01;
  };

  Buildings.getSynergyUpgradeOrder = function () {
    var res = 0;
    for (var i = 0; i < Game.ObjectsN; i++) {
      var me = Game.ObjectsById[i];
      for (var ii in me.synergies) {
        res = Math.max(me.synergies[ii].order, res);
      }
    }

    return res + 0.01;
  };

  Buildings.getAchievementOrder = function () {
    var res = 0;
    for (var i = 0; i < Game.ObjectsN - 1; i++) {
      var me = Game.ObjectsById[i];

      for (var ii in me.tieredAchievs) {
        res = Math.max(me.tieredAchievs[ii].order, res);
      }

      for (var ii in me.productionAchievs) {
        res = Math.max(me.productionAchievs[ii].achiev.order, res);
      }

      if (me.levelAchiev10) res = Math.max(me.levelAchiev10.order, res);
    }

    return res + 0.01;
  };

  Buildings.ReplaceAchievement = function(key){
    var escKey = key.replace(/'/g, "\\'");
    var achievement = Game.Achievements[key];

    if(!Game.customAchievements[key]) Game.customAchievements[key] = {};
    CCSE.Backup.customAchievements[key] = {};


    // this.click
    if(!Game.customAchievements[key].click) Game.customAchievements[key].click = [];
    Game.customAchievements[key].click.push(Buildings.customAchievementsAllclick);
    Buildings.SliceCodeIntoFunction("Game.Achievements['" + escKey + "'].click", -1, `
        // Game.Achievements['` + escKey + `'].click injection point 0
        if(Game.customAchievements[this.name]) for(var i in Game.customAchievements[this.name].click) Game.customAchievements[this.name].click[i](this);
      `);


    for(var i in CCSE.customReplaceAchievement) CCSE.customReplaceAchievement[i](key, achievement);
  }
  
  Buildings.NewAchievement = function(name, desc, icon){
    var me = new Game.Achievement(name, desc, icon);
    Buildings.ReplaceAchievement(name);

    if(Buildings.config.Achievements[name]){
      me.won = Buildings.config.Achievements[name].won;
    }else{
      Buildings.config.Achievements[name] = {
        won: 0
      }
    }

    if(typeof LocalizeUpgradesAndAchievs !== 'undefined') LocalizeUpgradesAndAchievs();
    return me;

  Buildings.AppendStatsVersionNumber = function (modName, versionString) {
    var general = l("statsGeneral");
    var str = "<b>" + modName + ":</b> " + versionString;
    var div = document.createElement("div");
    div.className = "listing";
    div.innerHTML = str;

    if (general) general.parentNode.appendChild(div);
  };

  Buildings.MakeBuilding = async function ({
    undefined: json_url,
    undefined: json,
  }) {
    if (json === undefined) {
      const response = await fetch(json_url);
      json = await response.json();
    }
    
    for (var b;json.hasOwnProperty("building"+b.toString()); b++){
      var local = json["building"+b.toString()];
      var iconsURL = local.art.customIconsPic;

    Buildings.NewBuilding(
      local.name,
      local.commonName,
      local.desc,
      1,
      2,
      local.art,
      "doesn't matter what you put here",
      function (me) {
        var mult = 1;
        mult *= Game.GetTieredCpsMult(me);
        mult *= Game.magicCpS(me.name);
        return me.baseCps * mult;
      },
      function () {
        Game.UnlockTiered(this);
        if (
          this.amount >= Game.SpecialGrandmaUnlock &&
          Game.Objects["Grandma"].amount > 0
        )
          Game.Unlock(this.grandma.name);
      },
      local.foolObject,
      local.buildingSpecial,
    );

    Game.Objects[local.name].displayName =
      '<span style="font-size:'+local.zoom+'%;position:relative;bottom:4px;">'+local.name+'</span>'; // Shrink the name since it's so large

    // Upgrades
    var last;
    var some = 0;
    var order = Buildings.getTieredUpgradeOrder();
    for (var j; local.upgrades.hasOwnProperty("upgrade"+j.toString()); j++){
      var upgrade = local.upgrades["upgrade"+j.toString()];
      Game.TieredUpgrade(
        upgrade.name,
        upgrade.quote,
        local.name,
        j+1
      );
      last = Game.last;
      last.icon[2] = iconsURL;
      last.order = order + some / 100;
      some++;
    }
    
    order = Buildings.getGrandmaUpgradeOrder();
    upgrade = local.upgrades.grandma;
    last = Game.GrandmaSynergy(
      upgrade.name,
      upgrade.quote,
      local.name,
    );
    last.order = order;

    order = Buildings.getSynergyUpgradeOrder();
    upgrade = local.upgrades.synergy1;
    last = Game.SynergyUpgrade(
      upgrade.name,
      upgrade.quote,
      local.name,
      upgrade.building,
      "synergy1",
    );
    last.icon[2] = iconsURL;
    last.order = order;
    upgrade = local.upgrades.synergy2;
    last = Game.SynergyUpgrade(
      upgrade.name,
      upgrade.quote,
      local.name,
      upgrade.building,
      "synergy2",
    );
    last.icon[2] = iconsURL;
    last.order = order + 0.01;

    // Achievements
    order = Buildings.getAchievementOrder();
    some = 0;
    for (var j; local.achievs.hasOwnProperty("achiev"+j.toString()); j++){
      var achiev = local.achievs["achiev"+j.toString()];
      Game.Achievement(
        achiev.name,
        achiev.quote,
        local.name,
        j+1
      );
      last.icon[2] = iconsURL;
      last.order = order + some / 100;
      some++;
    }
    for (var j; local.achievs.hasOwnProperty("produce"+j.toString()); j++){
      achiev = local.achievs["produce"+j.toString()]
      last = Game.ProductionAchievement(
        achiev.name,
        local.name,
        j+1
      );
      last.icon[2] = iconsURL;
      last.order = order + some / 100;
      some++;
    }
    
    achiev = local.achievs.level10;
    last = Buildings.NewAchievement(
      achiev.name,
      achiev.qoute,
      [1, 26, iconsURL],
    );
    Game.Objects[local.name].levelAchiev10 = last;
    last.order = order + i / 100;
    i++;
    }
  };


      // Game.UpdateGrandmapocalypse
      // executed every logic frame
      if (!Game.customUpdateGrandmapocalypse)
        Game.customUpdateGrandmapocalypse = [];
      Buildings.SliceCodeIntoFunction(
        "Game.UpdateGrandmapocalypse",
        -1,
        `
        // Game.UpdateGrandmapocalypse injection point 0
        for(var i in Game.customUpdateGrandmapocalypse) Game.customUpdateGrandmapocalypse[i]();
      `,
      );

      // Game.getWrinklersMax
      // Functions should return a value to add to n. Return 0 to have no effect
      if (!Game.customGetWrinklersMax) Game.customGetWrinklersMax = [];
      Buildings.ReplaceCodeIntoFunction(
        "Game.getWrinklersMax",
        "return",
        `
        // Game.getWrinklersMax injection point 0
        for(var i in Game.customGetWrinklersMax) n += Game.customGetWrinklersMax[i](n);`,
        -1,
      );

      // Game.SpawnWrinkler
      if (!Game.customSpawnWrinkler) Game.customSpawnWrinkler = [];
      Buildings.ReplaceCodeIntoFunction(
        "Game.SpawnWrinkler",
        "return me",
        `
        // Game.SpawnWrinkler injection point 0
        for(var i in Game.customSpawnWrinkler) Game.customSpawnWrinkler[i](me);`,
        -1,
      );

      // Game.UpdateWrinklers
      // customWrinklerSpawnChance functions should return a multiplier to chance. (Return 1 to have no effect)
      if (!Game.customUpdateWrinklers) Game.customUpdateWrinklers = [];
      if (!Game.customWrinklerSpawnChance) Game.customWrinklerSpawnChance = [];
      if (!Game.customWrinklerPop) Game.customWrinklerPop = [];
      Buildings.ReplaceCodeIntoFunction(
        "Game.UpdateWrinklers",
        "if (Math.random()<chance)",
        `
            // Game.UpdateWrinklers injection point 0
            for(var i in Game.customWrinklerSpawnChance) chance *= Game.customWrinklerSpawnChance[i]();`,
        -1,
      );
      Buildings.ReplaceCodeIntoFunction(
        "Game.UpdateWrinklers",
        "Game.Earn(me.sucked);",
        `
            // Game.UpdateWrinklers injection point 1
            for(var i in Game.customWrinklerPop) Game.customWrinklerPop[i](me);`,
        -1,
      );
      Buildings.SliceCodeIntoFunction(
        "Game.UpdateWrinklers",
        -1,
        `
        // Game.UpdateWrinklers injection point 2
        for(var i in Game.customUpdateWrinklers) Game.customUpdateWrinklers[i]();
      `,
        inRect.toString(),
      );

      // Game.DrawWrinklers
      if (!Game.customDrawWrinklers) Game.customDrawWrinklers = [];
      Buildings.SliceCodeIntoFunction(
        "Game.DrawWrinklers",
        -1,
        `
        // Game.DrawWrinklers injection point 0
        for(var i in Game.customDrawWrinklers) Game.customDrawWrinklers[i]();
      `,
      );

      // Game.SaveWrinklers
      // Return ret to have no effect
      if (!Game.customSaveWrinklers) Game.customSaveWrinklers = [];
      Buildings.ReplaceCodeIntoFunction(
        "Game.SaveWrinklers",
        "return",
        `
        // Game.SaveWrinklers injection point 0
        var ret =`,
        0,
      );
      Buildings.SliceCodeIntoFunction(
        "Game.SaveWrinklers",
        -1,
        `
        // Game.SaveWrinklers injection point 1
        for(var i in Game.customSaveWrinklers) ret = Game.customSaveWrinklers[i](ret);
        return ret;
      `,
      );

      // Game.LoadWrinklers
      if (!Game.customLoadWrinklers) Game.customLoadWrinklers = [];
      Buildings.SliceCodeIntoFunction(
        "Game.LoadWrinklers",
        -1,
        `
        // Game.LoadWrinklers injection point 0
        for(var i in Game.customLoadWrinklers) Game.customLoadWrinklers[i](amount, number, shinies, amountShinies);
      `,
      );

      // -----     Special things and stuff block     ----- //

      // Game.UpdateSpecial
      // customSpecialTabs functions should push a string to Game.specialTabs (or not)
      if (!Game.customSpecialTabs) Game.customSpecialTabs = [];
      Buildings.ReplaceCodeIntoFunction(
        "Game.UpdateSpecial",
        "if (Game.specialTabs.length==0)",
        `// Game.UpdateSpecial injection point 0
        for(var i in Game.customSpecialTabs) Game.customSpecialTabs[i]();`,
        -1,
      );

      // Game.UpgradeSanta
      if (!Game.customUpgradeSanta) Game.customUpgradeSanta = [];
      Buildings.SliceCodeIntoFunction(
        "Game.UpgradeSanta",
        -1,
        `
        // Game.UpgradeSanta injection point 0
        for(var i in Game.customUpgradeSanta) Game.customUpgradeSanta[i]();
      `,
      );

      // Game.hasAura
      // Return ret to have no effect
      if (!Game.customHasAura) Game.customHasAura = [];
      Buildings.SpliceCodeIntoFunction("Game.hasAura", 2, "var ret;");
      Buildings.ReplaceCodeIntoFunction("Game.hasAura", /return/g, "ret =", 0);
      Buildings.SliceCodeIntoFunction(
        "Game.hasAura",
        -1,
        `
        // Game.hasAura injection point 0
        for(var i in Game.customHasAura) ret = Game.customHasAura[i](what, ret);
        return ret;
      `,
      );

      // Game.auraMult
      // Return 1 to have no effect
      if (!Game.customAuraMult) Game.customAuraMult = [];
      Buildings.ReplaceCodeIntoFunction(
        "Game.auraMult",
        "return",
        `
        // Game.auraMult injection point 0
        for(var i in Game.customAuraMult) n *= Game.customAuraMult[i](what);
        return`,
        0,
      );

      if (!Game.customDescribeDragonAura) Game.customDescribeDragonAura = [];
      Buildings.SliceCodeIntoFunction(
        "Game.DescribeDragonAura",
        -1,
        `
        // Game.DescribeDragonAura injection point 0
        for(var i in Game.customDescribeDragonAura) Game.customDescribeDragonAura[i](aura);
      `,
      );

      // Game.UpgradeDragon
      if (!Game.customUpgradeDragon) Game.customUpgradeDragon = [];
      Buildings.SliceCodeIntoFunction(
        "Game.UpgradeDragon",
        -1,
        `
        // Game.UpgradeDragon injection point 0
        for(var i in Game.customUpgradeDragon) Game.customUpgradeDragon[i]();
      `,
      );

      // Game.ClickSpecialPic
      if (!Game.customClickSpecialPic) Game.customClickSpecialPic = [];
      Buildings.SliceCodeIntoFunction(
        "Game.ClickSpecialPic",
        -1,
        `
        // Game.ClickSpecialPic injection point 0
        for(var i in Game.customClickSpecialPic) Game.customClickSpecialPic[i]();
      `,
      );

      // Game.ToggleSpecialMenu
      // customToggleSpecialMenu functions should return a string for l('specialPopup').innerHTML (Return str for no effect)
      // str.replace('background:url(img/dragon.png?v='+Game.version+');background-position:-384px 0px;', <your pic here>)
      // Pics are 96px by 96px
      if (!Game.customToggleSpecialMenu) Game.customToggleSpecialMenu = [];
      Buildings.ReplaceCodeIntoFunction(
        "Game.ToggleSpecialMenu",
        "l('specialPopup').innerHTML=str;",
        `// Game.ToggleSpecialMenu injection point 0
        for(var i in Game.customToggleSpecialMenu) str = Game.customToggleSpecialMenu[i](str);`,
        -1,
      );

      // Game.DrawSpecial
      // customDrawSpecialPic functions should alter the picframe object
      // Pics are 96px by 96px
      if (!Game.customDrawSpecial) Game.customDrawSpecial = [];
      if (!Game.customDrawSpecialPic) Game.customDrawSpecialPic = [];
      Buildings.ReplaceCodeIntoFunction(
        "Game.DrawSpecial",
        "if (hovered || selected)",
        `// Game.DrawSpecial injection point 0
          var picframe = {pic:pic, frame:frame};
          for(var j in Game.customDrawSpecialPic) Game.customDrawSpecialPic[j](picframe, Game.specialTabs[i]);
          pic = picframe.pic; frame = picframe.frame;`,
        -1,
      );
      Buildings.SliceCodeIntoFunction(
        "Game.DrawSpecial",
        -1,
        `
        // Game.DrawSpecial injection point 1
        for(var i in Game.customDrawSpecial) Game.customDrawSpecial[i]();
      `,
      );

      // -----     Visual Effects block     ----- //

      // Game.DrawBackground
      // Game.customDrawBackground functions get called in the same block that creates the cookie rain and seasonal backgrounds
      // If you want a hook somewhere else, let me know
      if (!Game.customDrawBackground) Game.customDrawBackground = [];
      Buildings.ReplaceCodeIntoFunction(
        "Game.DrawBackground",
        "Timer.track('left background');",
        `// Game.DrawBackground injection point 0
        for(var i in Game.customDrawBackground) Game.customDrawBackground[i]();`,
        -1,
      );

      // Setup for custom Milk Selector options
      Buildings.ReplaceCodeIntoFunction(
        "Game.DrawBackground",
        "if (Game.milkType!=0 && Game.ascensionMode!=1) pic=Game.AllMilks[Game.milkType].pic;",
        'if (Buildings.config.milkType!="Automatic" && Game.ascensionMode!=1) pic=Buildings.GetSelectedMilk().milk.pic;',
        0,
      );

      // Setup for custom Background Selector options
      temp = Game.DrawBackground.toString();
      temp = temp.replace("Game.bg+'.jpg'", "Game.bg");
      temp = temp.replace("Game.bgFade+'.jpg'", "Game.bgFade");
      temp = temp.replace("Game.BGsByChoice[Game.bgType]", "choice");
      temp = temp.replace(
        "if (Game.bgType!=0 && Game.ascensionMode!=1)",
        `Game.bg += '.jpg';
              Game.bgFade += '.jpg';

              if (Game.ascensionMode!=1)
              {
                let choice = Buildings.GetSelectedBackground();
                if(choice.name != loc('Automatic'))`,
      );
      temp = temp.replace(
        "Game.Background.fillPattern(Pic(Game.bg)",
        `}
              Game.Background.fillPattern(Pic(Game.bg)`,
      );
      eval("Game.DrawBackground = " + temp);
      for (var i in Game.BGsByChoice) Game.BGsByChoice[i].pic += ".jpg";

      // -----     Debug block     ----- //

      // Game.OpenSesame
      // Game.customOpenSesame functions should add HTML strings to the debug menu
      if (!Game.customOpenSesame) Game.customOpenSesame = [];
      Buildings.ReplaceCodeIntoFunction(
        "Game.OpenSesame",
        "str+='</div>';",
        `// Game.OpenSesame injection point 0
        for(var i in Game.customOpenSesame) str += Game.customOpenSesame[i]();`,
        -1,
      );

      // -----     YouCustomizer block     ----- //

      // Game.YouCustomizer.render
      if (!Game.customYouCustomizerRender) Game.customYouCustomizerRender = [];
      Buildings.SliceCodeIntoFunction(
        "Game.YouCustomizer.render",
        -1,
        `
        // Game.YouCustomizer.render injection point 0
        for(var i in Game.customYouCustomizerRender) Game.customYouCustomizerRender[i]();
      `,
      );

      // Game.YouCustomizer.getGeneValue
      // Return retVal to have no effect
      temp = Game.YouCustomizer.getGeneValue.toString();
      temp = temp.replace("var gene=", "var retVal;\r\nvar gene=");
      temp = temp.replaceAll("return", "retVal =");
      eval("Game.YouCustomizer.getGeneValue = " + temp);
      if (!Game.customYouCustomizerGetGeneValue)
        Game.customYouCustomizerGetGeneValue = [];
      Buildings.SliceCodeIntoFunction(
        "Game.YouCustomizer.getGeneValue",
        -1,
        `
        // Game.YouCustomizer.getGeneValue injection point 0
        for(var i in Game.customYouCustomizerGetGeneValue) retVal = Game.customYouCustomizerGetGeneValue[i](id, retVal);
        return retVal;
      `,
      );

      // Game.YouCustomizer.offsetGene
      if (!Game.customYouCustomizerOffsetGene)
        Game.customYouCustomizerOffsetGene = [];
      Buildings.SliceCodeIntoFunction(
        "Game.YouCustomizer.offsetGene",
        -1,
        `
        // Game.YouCustomizer.offsetGene injection point 0
        for(var i in Game.customYouCustomizerOffsetGene) Game.customYouCustomizerOffsetGene[i](gene,off);
      `,
      );

      // Game.YouCustomizer.randomize
      if (!Game.customYouCustomizerRandomize)
        Game.customYouCustomizerRandomize = [];
      Buildings.ReplaceCodeIntoFunction(
        "Game.YouCustomizer.randomize",
        "Game.YouCustomizer.render();",
        `// Game.YouCustomizer.randomize injection point 0
        for(var i in Game.customYouCustomizerRandomize) str = Game.customYouCustomizerRandomize[i]();`,
        -1,
      );

      // Game.YouCustomizer.renderPortrait
      if (!Game.customYouCustomizerRenderPortrait)
        Game.customYouCustomizerRenderPortrait = [];
      Buildings.SliceCodeIntoFunction(
        "Game.YouCustomizer.renderPortrait",
        -1,
        `
        // Game.YouCustomizer.renderPortrait injection point 0
        for(var i in Game.customYouCustomizerRenderPortrait) Game.customYouCustomizerRenderPortrait[i]();
      `,
      );

      // Game.YouCustomizer.prompt
      if (!Game.customYouCustomizerPrompt) Game.customYouCustomizerPrompt = [];
      if (!Game.customYouCustomizerMakeCustomizerSelector)
        Game.customYouCustomizerMakeCustomizerSelector = [];
      temp = Game.YouCustomizer.prompt.toString();
      temp = temp.replace("return", "var retVal =");
      temp = temp.replace(
        "}",
        `
        // Game.YouCustomizer.prompt injection point 0
        for(var i in Game.customYouCustomizerMakeCustomizerSelector) retVal = Game.customYouCustomizerMakeCustomizerSelector[i](gene,text,retVal);
        return retVal;
      }`,
      );
      eval("Game.YouCustomizer.prompt = " + temp);
      Buildings.SliceCodeIntoFunction(
        "Game.YouCustomizer.prompt",
        -1,
        `
        // Game.YouCustomizer.prompt injection point 1
        for(var i in Game.customYouCustomizerPrompt) Game.customYouCustomizerPrompt[i]();
      `,
      );

      // -----     Gifting block     ----- //
      // Game.promptGiftRedeem
      // Game.promptGiftSend
      // Submit an issue to the GitHub page with where you want a hook
      // Until that happens, these functions won't either
    };

    if (!Buildings.customReplaceShimmerType)
      Buildings.customReplaceShimmerType = [];
    Buildings.ReplaceShimmerType = function (key) {
      var temp = "";
      var pos = 0;
      var proto;
      var escKey = key.replace(/'/g, "\\'");

      if (!Game.customShimmerTypes[key]) Game.customShimmerTypes[key] = {};
      Buildings.Backup.customShimmerTypes[key] = {};

      // Game.shimmerTypes[key].initFunc
      // durationMult functions should return a value to multiply the duration by
      if (!Game.customShimmerTypes[key].initFunc)
        Game.customShimmerTypes[key].initFunc = [];
      if (!Game.customShimmerTypes[key].durationMult)
        Game.customShimmerTypes[key].durationMult = [];
      Game.customShimmerTypes[key].initFunc.push(
        Buildings.customShimmerTypesAllinitFunc,
      );
      Game.customShimmerTypes[key].durationMult.push(
        Buildings.customShimmerTypesAlldurationMult,
      );
      Buildings.ReplaceCodeIntoFunction(
        "Game.shimmerTypes['" + escKey + "'].initFunc",
        "me.dur=dur;",
        `// Game.shimmerTypes['` +
          escKey +
          `'].initFunc injection point 0
            for(var i in Game.customShimmerTypes['` +
          escKey +
          `'].durationMult) dur *= Game.customShimmerTypes['` +
          escKey +
          `'].durationMult[i](me);`,
        -1,
      );
      Buildings.SliceCodeIntoFunction(
        "Game.shimmerTypes['" + escKey + "'].initFunc",
        -1,
        `
            // Game.shimmerTypes['` +
          escKey +
          `'].initFunc injection point 1
            for(var i in Game.customShimmerTypes['` +
          escKey +
          `'].initFunc) Game.customShimmerTypes['` +
          escKey +
          `'].initFunc[i](me);
          `,
      );
      //Buildings.ReplaceCodeIntoFunction("Game.shimmerTypes['" + escKey + "'].initFunc", 'Game.chimeType==1 && ', '', 0);

      // Game.shimmerTypes[key].updateFunc
      if (!Game.customShimmerTypes[key].updateFunc)
        Game.customShimmerTypes[key].updateFunc = [];
      Game.customShimmerTypes[key].updateFunc.push(
        Buildings.customShimmerTypesAllupdateFunc,
      );
      Buildings.SliceCodeIntoFunction(
        "Game.shimmerTypes['" + escKey + "'].updateFunc",
        -1,
        `
            // Game.shimmerTypes['` +
          escKey +
          `'].updateFunc injection point 0
            for(var i in Game.customShimmerTypes['` +
          escKey +
          `'].updateFunc) Game.customShimmerTypes['` +
          escKey +
          `'].updateFunc[i](me);
          `,
      );

      // Game.shimmerTypes[key].popFunc
      if (!Game.customShimmerTypes[key].popFunc)
        Game.customShimmerTypes[key].popFunc = [];
      Game.customShimmerTypes[key].popFunc.push(
        Buildings.customShimmerTypesAllpopFunc,
      );
      Buildings.SliceCodeIntoFunction(
        "Game.shimmerTypes['" + escKey + "'].popFunc",
        -1,
        `
            // Game.shimmerTypes['` +
          escKey +
          `'].popFunc injection point 0
            for(var i in Game.customShimmerTypes['` +
          escKey +
          `'].popFunc) Game.customShimmerTypes['` +
          escKey +
          `'].popFunc[i](me);
          `,
      );

      // Game.shimmerTypes[key].spawnConditions
      // Return ret to have no effect
      if (!Game.customShimmerTypes[key].spawnConditions)
        Game.customShimmerTypes[key].spawnConditions = [];
      Game.customShimmerTypes[key].spawnConditions.push(
        Buildings.customShimmerTypesAllspawnConditions,
      );
      Buildings.SpliceCodeIntoFunction(
        "Game.shimmerTypes['" + escKey + "'].spawnConditions",
        2,
        "var ret;",
      );
      Buildings.ReplaceCodeIntoFunction(
        "Game.shimmerTypes['" + escKey + "'].spawnConditions",
        /return/g,
        "ret =",
        0,
      );
      Buildings.SliceCodeIntoFunction(
        "Game.shimmerTypes['" + escKey + "'].spawnConditions",
        -1,
        `
            // Game.shimmerTypes['` +
          escKey +
          `'].spawnConditions injection point 0
            for(var i in Game.customShimmerTypes['` +
          escKey +
          `'].spawnConditions) ret = Game.customShimmerTypes['` +
          escKey +
          `'].spawnConditions[i](ret);
            return ret;
          `,
      );

      // Game.shimmerTypes[key].getTimeMod
      // Functions should return a multiplier to the shimmer's spawn time (higher takes longer to spawn)
      // Return 1 to have no effect
      if (!Game.customShimmerTypes[key].getTimeMod)
        Game.customShimmerTypes[key].getTimeMod = [];
      Game.customShimmerTypes[key].getTimeMod.push(
        Buildings.customShimmerTypesAllgetTimeMod,
      );
      Buildings.ReplaceCodeIntoFunction(
        "Game.shimmerTypes['" + escKey + "'].getTimeMod",
        "return",
        `
            // Game.shimmerTypes['` +
          escKey +
          `'].getTimeMod injection point 0
            for(var i in Game.customShimmerTypes['` +
          escKey +
          `'].getTimeMod) m *= Game.customShimmerTypes['` +
          escKey +
          `'].getTimeMod[i](me);`,
        -1,
      );

      for (var i in Buildings.customReplaceShimmerType)
        Buildings.customReplaceShimmerType[i](key);
    };

    if (!Buildings.customReplaceBuilding) Buildings.customReplaceBuilding = [];
    Buildings.ReplaceBuildingsStart = function () {
      if (!Game.customBuildingsAll) Game.customBuildingsAll = {};

      if (!Game.customBuildingsAll.switchMinigame)
        Game.customBuildingsAll.switchMinigame = [];
      Buildings.customBuildingsAllswitchMinigame = function (obj, on) {
        for (var i in Game.customBuildingsAll.switchMinigame)
          Game.customBuildingsAll.switchMinigame[i](obj, on);
      };

      if (!Game.customBuildingsAll.getSellMultiplier)
        Game.customBuildingsAll.getSellMultiplier = [];
      Buildings.customBuildingsAllgetSellMultiplier = function (obj, giveBack) {
        for (var i in Game.customBuildingsAll.getSellMultiplier)
          giveBack = Game.customBuildingsAll.getSellMultiplier[i](obj, giveBack);
        return giveBack;
      };

      if (!Game.customBuildingsAll.buy) Game.customBuildingsAll.buy = [];
      Buildings.customBuildingsAllbuy = function (obj, amount) {
        for (var i in Game.customBuildingsAll.buy)
          Game.customBuildingsAll.buy[i](obj, amount);
      };

      if (!Game.customBuildingsAll.sell) Game.customBuildingsAll.sell = [];
      Buildings.customBuildingsAllsell = function (obj, amount, bypass) {
        for (var i in Game.customBuildingsAll.sell)
          Game.customBuildingsAll.sell[i](obj, amount, bypass);
      };

      if (!Game.customBuildingsAll.sacrifice)
        Game.customBuildingsAll.sacrifice = [];
      Buildings.customBuildingsAllsacrifice = function (obj, amount) {
        for (var i in Game.customBuildingsAll.sacrifice)
          Game.customBuildingsAll.sacrifice[i](obj, amount);
      };

      if (!Game.customBuildingsAll.buyFree) Game.customBuildingsAll.buyFree = [];
      Buildings.customBuildingsAllbuyFree = function (obj, amount) {
        for (var i in Game.customBuildingsAll.buyFree)
          Game.customBuildingsAll.buyFree[i](obj, amount);
      };

      if (!Game.customBuildingsAll.getFree) Game.customBuildingsAll.getFree = [];
      Buildings.customBuildingsAllgetFree = function (obj, amount) {
        for (var i in Game.customBuildingsAll.getFree)
          Game.customBuildingsAll.getFree[i](obj, amount);
      };

      if (!Game.customBuildingsAll.getFreeRanks)
        Game.customBuildingsAll.getFreeRanks = [];
      Buildings.customBuildingsAllgetFreeRanks = function (obj, amount) {
        for (var i in Game.customBuildingsAll.getFreeRanks)
          Game.customBuildingsAll.getFreeRanks[i](obj, amount);
      };

      if (!Game.customBuildingsAll.tooltip) Game.customBuildingsAll.tooltip = [];
      Buildings.customBuildingsAlltooltip = function (obj, ret) {
        for (var i in Game.customBuildingsAll.tooltip)
          ret = Game.customBuildingsAll.tooltip[i](obj, ret);
        return ret;
      };

      if (!Game.customBuildingsAll.levelTooltip)
        Game.customBuildingsAll.levelTooltip = [];
      Buildings.customBuildingsAlllevelTooltip = function (obj, ret) {
        for (var i in Game.customBuildingsAll.levelTooltip)
          ret = Game.customBuildingsAll.levelTooltip[i](obj, ret);
        return ret;
      };

      if (!Game.customBuildingsAll.refresh) Game.customBuildingsAll.refresh = [];
      Buildings.customBuildingsAllrefresh = function (obj) {
        for (var i in Game.customBuildingsAll.refresh)
          Game.customBuildingsAll.refresh[i](obj);
      };

      if (!Game.customBuildingsAll.rebuild) Game.customBuildingsAll.rebuild = [];
      Buildings.customBuildingsAllrebuild = function (obj) {
        for (var i in Game.customBuildingsAll.rebuild)
          Game.customBuildingsAll.rebuild[i](obj);
      };

      if (!Game.customBuildingsAll.mute) Game.customBuildingsAll.mute = [];
      Buildings.customBuildingsAllmute = function (obj, val) {
        for (var i in Game.customBuildingsAll.mute)
          Game.customBuildingsAll.mute[i](obj, val);
      };

      if (!Game.customBuildingsAll.draw) Game.customBuildingsAll.draw = [];
      Buildings.customBuildingsAlldraw = function (obj) {
        for (var i in Game.customBuildingsAll.draw)
          Game.customBuildingsAll.draw[i](obj);
      };

      if (!Game.customBuildingsAll.buyFunction)
        Game.customBuildingsAll.buyFunction = [];
      Buildings.customBuildingsAllbuyFunction = function (obj) {
        for (var i in Game.customBuildingsAll.buyFunction)
          Game.customBuildingsAll.buyFunction[i](obj);
      };

      if (!Game.customBuildingsAll.cpsMult) Game.customBuildingsAll.cpsMult = [];
      Buildings.customBuildingsAllcpsMult = function (obj) {
        var mult = 1;
        for (var i in Game.customBuildingsAll.cpsMult)
          mult *= Game.customBuildingsAll.cpsMult[i](obj);
        return mult;
      };

      if (!Game.customBuildings) Game.customBuildings = {};
      Buildings.Backup.customBuildings = {};
      Buildings.i = 0;
    
  Buildings.isLoaded = 1;
};
