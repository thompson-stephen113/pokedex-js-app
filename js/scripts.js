// IIFE holds the pokemonList array, stored in pokemonRepository
let pokemonRepository = (function() {
    // Array of Pokemon objects and some general stat properties
    let pokemonList = [
    { 
        name: "Bulbasaur", 
        height: 0.7, 
        type: ["Grass", "Poison"]
    },
    {
        name: "Ivysaur", 
        height: 1.0, 
        type: ["Grass", "Poison"]
    },
    {
        name: "Venusaur",
        height: 2.0,
        type: ["Grass", "Poison"]
    },
    {
        name: "Charmander",
        height: 0.6,
        type: ["Fire"]
    },
    {
        name: "Charmeleon",
        height: 1.1,
        type: ["Fire"]
    },
    {
        name: "Charizard",
        height: 1.7,
        type: ["Fire", "Flying"]
    },
    {
        name: "Squirtle",
        height: 0.5,
        type: ["Water"]
    },
    {
        name: "Wartortle",
        height: 1.0,
        type: ["Water"]
    },
    {
        name: "Blastoise",
        height: 1.6,
        type: ["Water"]
    }
    ];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    return {
        getAll: getAll,
        add: add
    };
})();

// Storing an empty string in a variable to be populated by forEach loop and written to webpage
let pokedexEntry = " ";

// Creates a function to run through if-else statements
function listIteration(pokemon) {
    // forEach loop iterates through pokemonList and documents each Pokemon and their heights, highlighting ones that are above or below average
    if (pokemon.height < 1) {
        pokedexEntry += "<p>" + pokemon.name + " (height: " + pokemon.height + ")" + " - It's tiny!" + "</p>";
    } else if (pokemon.height >= 1 && pokemon.height <= 1.5) {
        pokedexEntry += "<p>" + pokemon.name + " (height: " + pokemon.height + ")" + "</p>";
    } else {
        pokedexEntry += "<p>" + pokemon.name + " (height: " + pokemon.height + ")" + " - It's huge!" + "</p>";
    }
};

// listIteration function fetches all objects in the pokemonList through the pokemonRepository and executes the loop
pokemonRepository.getAll().forEach(listIteration);


// Link to CSS through HTML by fetching the "container" id from <main>
document.getElementById("container").innerHTML = pokedexEntry;
