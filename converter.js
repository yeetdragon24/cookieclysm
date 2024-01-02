const prefix = "https://github.com/yeetdragon24/cookieclysm/tree/main/img"
Game.LoadMod("https://unpkg.com/cppkies")
if (!window.CPPKIES_ONLOAD) CPPKIES_ONLOAD = []
CPPKIES_ONLOAD.push(() => {
    Cppkies.buildingLink = `${prefix}/buildingBigIcon.png`
    Cppkies.iconLink = `${prefix}/buildingIcons.png`
    new Cppkies.Building(
        "Converter", // The Name of your building
        "Converter|Converters|Convertered|[X] more dense|[X] more dense", // Name of your building in a sentence, and then it plural, then what boosts your building when a sugar lump is added, then it plural
        "Generates cookies by converting living matter into cookies", // How your building generates cookies
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
            name: "Converter",
            desc: "The top of your cookie hierarchy",
            icon: [2, 0],
        }, // Your building's data on business day
        ["Motivation!", "Distractions"] // Your building's building buff and building debuff
    )
    /* // Other stuff needed later
    new Cppkies.TieredUpgrade(
        "Keyboard Toppings", // The name of the upgrade.
        "Cherry Switches can be used as a replacement for cherries, right? I guess it doesn't really matter, <b>everyone</b> loves clacky keys.", // Your upgrade's quote.
        "Cppkie Baker", // The building your upgrade is boosting.
        "1" // Your upgrade's tier in this case, the 1st normal tier, Plain
    )

    new Cppkies.TieredUpgrade(
        "Multi Finger Addition Surgery",
        "Increases your cps by about 128 clicks. MFAS for short, we do lung extensions as well if you're interested.",
        "Cppkie Baker",
        "13" // The 13th normal tier, Iridyum
    )
    new Cppkies.TieredAchievement(
        "Cahpuhkies",
        "An inferior version your Cppkies (Look there isn't really a pronunciation.)",
        "13", // The 13th normal tier, Iridyum
        "Cppkie Baker"
    )

    // Non-tier upgrades

    // Grandma synergies
    new Cppkies.GrandmaSynergy(
        "Sleepy Grandmas",
        "A nice ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ to ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ʐ̈ you cookies",
        "Cppkie Baker",
        `${prefix}/cppkieGrandma.png`
    )

    // Production achievements (Make _ cookies from only _)

    new Cppkies.ProductionAchievement(
        "How did he write 518 of these things.",
        "Cppkie Baker",
        1 // The tier of the production achievement, unrelated to game tiers, works without modifications for 1 2 and 3
    )

    new Cppkies.ProductionAchievement(
        "Like seriously it's kinda crazy, I'm really running out of ideas and references.",
        "Cppkie Baker",
        2,
        "This" // The flavor text of it
    )

    new Cppkies.ProductionAchievement(
        "Good job, Orteil.",
        "Cppkie Baker",
        3,
        null, // No flavor text here
        3 // Additional multiplier for the requirement (Will up the normal req for this by 10^3)
    )

    new Cppkies.Level10Achievement(
        "Open Source",
        "Cppkie Baker",
        '<a href="https://github.com/Cppkies-Team/Cppkies">https://github.com/Cppkies-Team/Cppkies</a>'
    )

    // Dragon stuff

    new Cppkies.DragonAura(
        "Dragonsilk", 
        "The shimmering veil is unbreakable. You can no longer click golden cookies or the big cookie.",
        [0, 0]
    )

    new Cppkies.DragonAuraLevel(
        "Dragon's Will", 
        "Grants you a random positive buff every minute. You can only have one buff active at once.", // Just a note here, Reality Bending would not be given the one buff active at once, if someone ever were to implement this
        "Cppkie Baker"
    )
    */
   
})


