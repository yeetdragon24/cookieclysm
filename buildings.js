function loadJSON(json) {
    const buildings = json.buildings;
    const list = [];
    const orderBase = 1800;

    buildings.forEach((b, index) => {
        const key = b.name;
        const building = NewBuilding(
            key,
            b.commonName,
            b.desc,
            b.icon,
            b.iconColumn,
            b.art,
            b.price,
            Function(b.cps),
            Function(b.buyFunction),
            b.foolObject,
            b.buildingSpecial
        );

        const o = Game.Objects[key];
        o.desc = b.desc;
        o.grandma = Game.Upgrades[b.grandma];
        o.l.childNodes[0].style.background = `url('${b.background}')`;
        o.l.childNodes[1].style.background = `url('${b.background}')`;
        o.unshackleUpgrade = b.unshackled;

        let order = orderBase + o.id;
        b.upgrades.forEach((u, i) => {
            if (i < 15) {
                list.push(Game.TieredUpgrade(u.name, `<q>${u.quote}</q>`, key, i));
                Game.last.icon[1] = i - 1;
            } else if (i === 15) {
                list.push(Game.GrandmaSynergy(u.name, u.desc, key));
            } else {
                list.push(Game.SynergyUpgrade(u.name, `<q>${u.quote}</q>`, key, u.pair), 'synergy' + (i - 16).toString());
            }
        });

        order = 2700 + o.id;
        b.achievements.forEach((a, i) => {
            if (i < 15) {
                list.push(Game.TieredAchievement(a.name, `<q>${a.quote}</q>`, key, i));
                Game.last.icon[1] = i - 1;
            } else if (i < 18) {
                list.push(Game.ProductionAchievement(a.name, key, i - 15));
                Game.last.icon[1] = i - 1;
            } else {
                list.push(new Game.Achievement(a.name, a.desc, a.location));
                o.levelAchiev10 = Game.last;
                Game.last.icon[1] = 1;
            }
        });
    });
    return list;
}