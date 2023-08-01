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

            // Creates a modal that will contain the information of each Pokemon
            function showModal(title, text) {
                let modalContainer = document.querySelector("#modal-container");
                
                modalContainer.innerHTML = "";
            
                let modal = document.createElement("div");
                modal.classList.add("modal");
            
                // Creates a close button for the modal
                let closeButtonElement = document.createElement("button");
                closeButtonElement.classList.add("modal-close");
                closeButtonElement.innerText = "Close";
                closeButtonElement.addEventListener("click", hideModal);
            
                let titleElement = document.createElement("h1");
                titleElement.innerText = title;
            
                let contentElement = document.createElement("p");
                contentElement.innerText = text;

                // Creates the image container for the Pokemon sprite
                let spriteContainer = document.querySelector("#sprite-container");
                let pokemonSprite = document.createElement("img");
                pokemonSprite.src = pokemon.imageURL;
                pokemonSprite.setAttribute("height", "200");
                pokemonSprite.setAttribute("width", "200");
                spriteContainer.appendChild(pokemonSprite);

                modal.appendChild(closeButtonElement);
                modal.appendChild(titleElement);
                modal.appendChild(contentElement);
                modal.appendChild(pokemonSprite);
                modalContainer.appendChild(modal);
                
                modalContainer.classList.add("is-visible");
            
                // Allows closing the modal by clicking outside of it
                modalContainer.addEventListener("click", (e) => {
                let target = e.target;
                if (target === modalContainer) {
                    hideModal();
                }
                });

                // Removes the event listener from showModalOnClick after initial click
                document.querySelector(".pokemon-list").removeEventListener("click", showModalOnClick);
            };

            function hideModal() {
                let modalContainer = document.querySelector("#modal-container");
                modalContainer.classList.remove("is-visible");
            }
            
            // Allows closing the modal with Escape key
            window.addEventListener("keydown", (e) => {
                let modalContainer = document.querySelector("#modal-container");
                if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
                hideModal();
                }
            });
            
            // Tells the modal what to display when showModal is executed
            showModal(
                capitalize(pokemon.name), 
                "Height: " + (pokemon.height / Math.pow(10, 1)).toFixed(1) + " m"
                );
        }).catch(function (e) {
            console.error(e);
        });
    }

    // Adds each Pokemon object from repository as list item to unordered list in <main> of index.html
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");

        // Turns each Pokemon object into a button that listens for a click event to execute showDetails
        let button = document.createElement("button");
        button.innerText = capitalize(pokemon.name);
        button.classList.add("pokemon-button");
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

// Executes the showDetails function for each item in the pokemonRepository when showModalOnClick is called
function showModalOnClick(event) {
    if (event.target.classList.contains("pokemon-button")) {
        let pokemonName = event.target.innerText;
        let pokemon = pokemonRepository.getAll().find((p) => p.name === pokemonName);
        showDetails(pokemon);
    }
};

// Executes showModalOnClick when the event listener is triggered
document.querySelector(".pokemon-list").addEventListener("click", showModalOnClick);
