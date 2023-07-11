// List of Pokemon and some general stats
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

// for loop to iterate over each Pokemon object in the pokemonList array

for (i = 0; i <= pokemonList.length; i++) {
    if (pokemonList[i].height < 1) {
        document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + " - It's tiny!" + "</p>");
    } else if (pokemonList[i].height >= 1 && pokemonList[i].height <= 1.5) {
        document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "</p>");
    } else {
        document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + " - It's huge!" + "</p>");
    }
}

// loop will document each Pokemon and their heights, highlighting ones that are above or below average
