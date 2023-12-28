import Cppkies from "cppkies"
const prefix = "https://example.com/CppkieBaker/static"
Cppkies.onLoad.push(() => {
    Cppkies.buildingLink = `${prefix}/buildingBigIcon.png`
    Cppkies.iconLink = `${prefix}/buildingIcons.png`
    new Cppkies.Building(
        "Cppkie Baker", // The Name of your building
        "cppkie baker|cppkie bakers|baked|[X] bug fix|[X] bug fixes", // Name of your building in a sentence, and then it plural, then what boosts your building when a sugar lump is added, then it plural
        "Generates cookies by baking them, why did nobody think about this?", // How your building generates cookies
        [0, 0], // The coordinates for the small, tooltip icon for your building
        [0, 0], // The coordinates for the big icon in the store for your building
        {
            bg: `${prefix}/buildingBg.png`, // The background for your building on the building screen
            pic: `${prefix}/buildingBake.png`, // The actual building pic on the building screen
            yV: 64, // The amount your building can move left and right on the building screen in pixels
            xV: 16, // The amount your building can move up and down on the building screen in pixels
        },
        Cppkies.DEFAULT_CPS, // Your building's cps
        Cppkies.DEFAULT_ONBUY, // The function to call when your building gets bought but don't worry about this
        {
            name: "Normal Baker",
            desc: "The top of your cookie hierarchy",
            icon: [2, 0],
        }, // Your building's data on business day
        ["Motivation!", "Distractions"] // Your building's building buff and building debuff
    )
})
