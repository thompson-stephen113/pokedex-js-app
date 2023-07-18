(function() {    
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

    let processedList = " ";

    // for loop to iterate over each Pokemon object in the pokemonList array

    pokemonList.forEach(listIteration);

    function listIteration(pokemon) {
        if (pokemon.height < 1) {
            processedList += "<p>" + pokemon.name + " (height: " + pokemon.height + ")" + " - It's tiny!" + "</p>";
        } else if (pokemon.height >= 1 && pokemon.height <= 1.5) {
            processedList += "<p>" + pokemon.name + " (height: " + pokemon.height + ")" + "</p>";
        } else {
            processedList += "<p>" + pokemon.name + " (height: " + pokemon.height + ")" + " - It's huge!" + "</p>";
        }
    };

    // loop will document each Pokemon and their heights, highlighting ones that are above or below average

    document.getElementById("container").innerHTML = processedList;
})()
