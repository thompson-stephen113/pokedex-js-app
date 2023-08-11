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
            item.imageURLFront = details.sprites.front_default;
            item.imageURLBack = details.sprites.back_default;

            item.types = [];
            for (let i = 0; i < details.types.length; i++) {
                item.types.push(details.types[i].type.name);
            }

            item.abilities = [];
            for (let i = 0; i < details.abilities.length; i++) {
                item.abilities.push(details.abilities[i].ability.name);
            }            
            
            item.height = details.height;
            item.weight = details.weight;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // Selects modal elements to append Pokédex details
    function showModal(item) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        modalTitle.empty();
        modalBody.empty();

        let nameElement = $("<h5>" + capitalize(item.name) + "</h5>");
        
        let imageElementFront = $('<img class="modal-img" style="width: 50%">');
        imageElementFront.attr("src", item.imageURLFront);
        
        let imageElementBack = $('<img class="modal-img" style="width: 50%">');
        imageElementBack.attr("src", item.imageURLBack);

        let typesElement = "";
        if (item.types.length === 2) {
            typesElement = $("<p>Type: " + capitalize(item.types[0]) + ", " + capitalize(item.types[1]) + "</p>");
        } else {
            typesElement = $("<p>Type: " + capitalize(item.types[0])+ "</p>");
        }
        
        let abilitiesElement = $(
            "<p>Abilities: " + 
            capitalize(item.abilities[0]) + 
            ", " + 
            capitalize(item.abilities[1]) + 
            "</p>");

        let heightElement = $(
            "<p>Height: " + 
            (item.height / Math.pow(10, 1)).toFixed(1) + 
            " m</p>");

        let weightElement = $(
            "<p>Weight: " +
            (item.weight / Math.pow(10, 1)).toFixed(1) +
            " kg</p>");

        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
    }

    // Executes loadDetails, then executes showModal
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    // Adds each Pokémon object from repository as list item to unordered list in <main> of index.html
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".list-group");
        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item");

        // Turns each Pokémon object into a button that listens for a click event to execute showDetails
        let button = document.createElement("button");
        button.innerText = capitalize(pokemon.name);
        button.classList.add("btn", "btn-primary");
        button.setAttribute("data-target", "#modal-container")
        button.setAttribute("data-toggle", "modal")
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    }

    // Allows for the capitalization of fetched data when called
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getAll() {
        return repository;
    }

    return {
        add: add,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
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
