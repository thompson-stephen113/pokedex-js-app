// IIFE holds the repository array, stored in pokemonRepository
let pokemonRepository = (function() {
    // Array of Pokemon objects and some general stat properties
    let repository = [];
    let apiURL = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    function add(pokemon) {
        repository.push(pokemon);
    }

    // Fetches data from API, then adds each Pokemon to repository array with add function
    function loadList() {
        return fetch(apiURL).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsURL: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        });
    }

    // Fetches detailed data of each Pokemon, then stores details
    function loadDetails(item) {
        let url = item.detailsURL;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageURL = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // Executes loadDetails and logs to console
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
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

    function getAll() {
        return repository;
    }

    return {
        add: add,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        getAll: getAll
    };
})();


// Fetches all objects from API and executes the forEach loop
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
