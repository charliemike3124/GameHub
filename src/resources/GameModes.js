
export default [
        {
            name: "Key Destroyer",
            url:  "KeyDestroyerLogo.png",
            desc: "Press the keys shown on screen as fast as you can.",
            component: "KeyDestroyer",
            options: {
                maxScore: { 
                    name: "Max score",
                    selected: 10,
                    min: 5,
                    max: 30
                },
                minKeyCount: { 
                    name: "Min. key count",
                    selected: 5,
                    min: 3,
                    max: 7
                },
                maxKeyCount: { 
                    name: "Max. key count",
                    selected: 15,
                    min: 7,
                    max: 30
                },
            }
        },
        {
            name: "Castle Defense",
            url:  "KeyDestroyerLogo.png",
            desc: "Defend the castle in the middle of the map by placing defensing structures.",
            component: "CastleDefense",
            options: {
                maxScore: { 
                    name: "Difficulty",
                    selected: 2,
                    min: 1,
                    max: 3
                },
            }
        },
    ]
