let pokemonRepository = (function () {
  let pokemonList = [
    {name: 'Bulbasaur', type: ['grass','poison'], height: 0.7},
    {name: 'Ivysaur', type: ['grass', 'poison'], height: 1},
    {name: 'Venusaur', type: ['grass', 'poison'], height: 2},
    {name: 'Charmander', type: ['fire'], height: 0.6},
    {name: 'Charmeleon', type: ['fire'], height: 1.1},
    {name: 'Charizard', type: ['fire', 'flying'], height: 1.7},
    {name: 'Squirtle', type: ['water'], height: 0.5},
    {name: 'Wartortle', type: ['water'], height: 1},
    {name: 'Blastoise', type: ['water'], height: 1.6}
  ];

  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    } else {
      document.write('<p>Error adding new pokemon</p><hr>');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector ('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('selected');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    pokemonClick(button, pokemon);
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function pokemonClick(button, pokemon) {
    button.addEventListener ('click', function(){
      showDetails(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

function printPokemon(pokemon) {
  pokemonRepository.addListItem(pokemon);
}

pokemonRepository.add({name: 'Pikachu', type:['Eletric'], height:0.4});
pokemonRepository.getAll().forEach(printPokemon);
