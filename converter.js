Game.LoadMod("https://raw.githubusercontent.com/yeetdragon24/cookieclysm/main/OtherGameLoader.js")
if (!window.CPPKIES_ONLOAD) CPPKIES_ONLOAD = []
Cppkies.onLoad.push(() => {
    Cppkies.buildingLink = `https://github.com/yeetdragon24/cookieclysm/blob/main/img/building.png`
    Cppkies.iconLink = `https://github.com/yeetdragon24/cookieclysm/blob/main/img/building.png`
    new Cppkies.Building(
        "Cppkie Baker",
        "cppkie baker|cppkie bakers|baked|[X] bug fix|[X] bug fixes",
        "Generates cookies by baking them, why did nobody think about this?",
        [0, 0],
        {
            bg: `https://github.com/yeetdragon24/cookieclysm/blob/main/img/building.png`,
            pic: `https://github.com/yeetdragon24/cookieclysm/blob/main/img/building.png,
            yV: 64,
            xV: 16,
        },
        Cppkies.DEFAULT_CPS, // Your buildings cps
        Cppkies.DEFAULT_ONBUY // The function to call when your building gets bought but don't worry about this
    )
})
