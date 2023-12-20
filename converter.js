Game.LoadMod("https://unpkg.com/cppkies")
if (!window.CPPKIES_ONLOAD) CPPKIES_ONLOAD = []
CPPKIES_ONLOAD.push(() => {
    new Cppkies.Upgrade("Hello, World!", "My first upgrade!", 7, [10, 5])
})
