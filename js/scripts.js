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

function printPokemonList(){
  for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1.7) {
      document.write("<p>" + pokemonList[i].name + " <strong>is huge!</strong> (height: " + pokemonList[i].height + ")</p>");
    } else {
      document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")</p>");
    }
  }
}

printPokemonList();
