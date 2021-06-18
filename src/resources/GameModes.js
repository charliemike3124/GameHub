
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
                    selected: 3,
                    min: 3,
                    max: 15
                },
                maxKeyCount: { 
                    name: "Max. key count",
                    selected: 15,
                    min: 15,
                    max: 40
                },
            }
        },
        // {
        //     name: "Dictionary",
        //     url:  "KeyDestroyerLogo.png",
        //     desc: "Write a definition that sounds like it could be the real meaning to the shown word.",
        //     component: "Dictionary"
        // },
    ]
