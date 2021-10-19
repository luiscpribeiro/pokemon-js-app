let pokemonRepository = (function () {
  let pokemonList = [
    {name:'Bulbasaur', type:['grass','poison'], height:0.7},
    {name:'Ivysaur', type:['grass', 'poison'], height:1},
    {name:'Venusaur', type:['grass', 'poison'], height:2},
    {name:'Charmander', type:['fire'], height:0.6},
    {name:'Charmeleon', type:['fire'], height:1.1},
    {name:'Charizard', type:['fire', 'flying'], height:1.7},
    {name:'Squirtle', type:['water'], height:0.5},
    {name:'Wartortle', type:['water'], height:1},
    {name:'Blastoise', type:['water'], height:1.6}
  ];

  function add(item) {
    if (typeof item === 'object') {
      pokemonList.push(item);
    } else {
      document.write('<p>Error adding new pokemon</p><hr>');
    }
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

function printPokemon(pokemon) {
    if (pokemon.height >= 1.7) {
      document.write("<p>" + pokemon.name + " is <strong>huge</strong>! (height: " + pokemon.height + ")</p>");
    } else {
      document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ")</p>");
    }
}

pokemonRepository.add({name: 'Pikachu', type:['Eletric'], height:0.4});
pokemonRepository.getAll().forEach(printPokemon);
