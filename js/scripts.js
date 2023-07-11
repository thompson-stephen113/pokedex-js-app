let pokemonList = [
    {
        name: "Bulbasaur", 
        height: 0.7, 
        type: ["grass", "poison"]
    },
    {
        name: "Ivysaur", 
        height: 1.0, 
        type: ["grass", "poison"]
    },
    {
        name: "Venusaur",
        height: 2.0,
        type: ["grass", "poison"]
    },
    {
        name: "Charmander",
        height: 0.6,
        type: ["fire"]
    },
    {
        name: "Charmeleon",
        height: 1.1,
        type: ["fire"]
    },
    {
        name: "Charizard",
        height: 1.7,
        type: ["fire", "flying"]
    },
    {
        name: "Squirtle",
        height: 0.5,
        type: ["water"]
    },
    {
        name: "Wartortle",
        height: 1.0,
        type: ["water"]
    },
    {
        name: "Blastoise",
        height: 1.6,
        type: ["water"]
    }
];

for (i = 0; i <= pokemonList.length; i++) {
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
}

