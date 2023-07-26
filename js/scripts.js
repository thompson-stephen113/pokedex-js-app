// IIFE holds the pokemonList array, stored in pokemonRepository
let pokemonRepository = (function() {
    // Array of Pokemon objects and some general stat properties
    let repository = [
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
        return repository;
    }

    function add(pokemon) {
        repository.push(pokemon);
    }

    // Shows details of Pokemon when function is called
    function showDetails(pokemon) {
        console.log(pokemon)
    }

    // Adds each Pokemon object from repository as list item to unordered list in <main> of index.html
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        
        // Turns each Pokemon object into a button that listens for a click event to execute showDetails
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("pokemon-button");
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    }    

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    };
})();


// Fetches all objects in the pokemonList through the pokemonRepository and executes the forEach loop
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
