
var BuildingsFromJSON = function (json) {
  const json_keys = Object.keys(json);
  for (const i in json_keys) {
    const key = json_keys[i];
    let b = json[key];
    var building = NewBuilding(
      key,
      b["commonName"],
      b["desc"],
      b["icon"],
      b["iconColumn"],
      b["art"],
      b["price"],
      Function(b["cps"]),
      Function(b["buyFunction"]),
      b["foolObject"],
      b["buildingSpecial"],
    );
  }
  for (const i in json_keys) {
    const key = json_keys[i];
    let b = json[key];
    const o = Game.Objects[key];
    o.desc = b["desc"];
    o.grandma = Game.Upgrades[b["grandma"]];
    o.l.childNodes[0].style.background = `url('${b["background"]}')`;
    o.l.childNodes[1].style.background = `url('${b["background"]}')`;
    o.unshackleUpgrade = b["unshackle"];
  }
  var list = [];
  var order = 1800;
  for (const i in json_keys) {
    const key = json_keys[i];
    let b = json[key];
    order = 1800 + Game.Objects[key].id;
    for (var i = 0; i < 15; i++) {
      var u = b["upgrades"][i.toString()];
      list.push(Game.TieredUpgrade(u["name"], `<q>${u["quote"]}</q>`, key, i));
      Game.last.icon[1] = i - 1;
    }
    var u = b["upgrades"][(15).toString()];
    list.push(Game.GrandmaSynergy(u["name"], u["desc"], key));
    for (var i = 0; i < 2; i++) {
      var u = b["upgrades"][(16 + i).toString()];
      list.push(Game.SynergyUpgrade(u['name'],`<q>${u["quote"]}</q>`,key,u['pair']),'synergy'+i.toString()); /// add synergy upgrades
    }
  }
  var order = 2700;
  for (const i in json_keys) {
    const key = json_keys[i];
    var b = json[key];
    order = 2700 + Game.Objects[b["name"]].id;
    for (var i = 0; i < 15; i++) {
      var a = b["achievements"][i.toString()];
      list.push(
        Game.TieredAchievement(a["name"], `<q>${a["quote"]}</q>`, key, i),
      );
      Game.last.icon[1] = i - 1;
    }
    for (var i = 0; i < 3; i++) {
      var a = b["achievements"][(i + 15).toString()];
      list.push(Game.ProductionAchievement(a["name"], key, i));
      Game.last.icon[1] = i - 1;
    }
    var a = b["achievements"][(18).toString()];
    const o = Game.Objects[key];
    list.push(new Game.Achievement(a["name"],a['desc'],a['location']));            o.levelAchiev10=Game.last;Game.last.icon[1]=1;);
  }

  console.log("Buildings created");
  return list;
};
