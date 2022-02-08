let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('Error adding new pokemon');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    loadDetails(pokemon).then(function () {
      let $pokemonList = $('.pokemon-list');
      let $listItem = $('<li class="pokemon-item list-group-item"></li>');
      let $itemTitle = $('<h4>' + pokemon.name + '</h4>');
      let $itemImage = $('<img>');
      $itemImage.attr('src', pokemon.imageUrlFront);
      let $itemButton = $('<br><button type="button" class="pokemon-button btn btn-outline-info" data-toggle="modal" data-target="#pokemonModal">Details</button>');

      $pokemonList.append($listItem);
      $listItem.append($itemTitle);
      $listItem.append($itemImage);
      $listItem.append($itemButton);

      $itemButton.on('click', function (event) {
        showDetails(pokemon);
      });
    });
  }

  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
    });
  }

  function loadList() {
    return $.ajax(apiUrl)
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return $.ajax(url).then(function (details) {
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.weight = details.weight;
      item.id = details.id;
      item.types = [];
      for (let i = 0; i < details.types.length; i++) {
        item.types.push(details.types[i].type.name);
      }
      item.abilities = [];
      for (let i = 0; i < details.abilities.length; i++) {
        item.abilities.push(details.abilities[i].ability.name);
      }
    })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();


    // Pokemon types hex colors
    let typeColors = {
      normal: '#A8A77A',
      fire: '#EE8130',
      water: '#6390F0',
      electric: '#F7D02C',
      grass: '#7AC74C',
      ice: '#96D9D6',
      fighting: '#C22E28',
      poison: '#A33EA1',
      ground: '#E2BF65',
      flying: '#A98FF3',
      psychic: '#F95587',
      bug: '#A6B91A',
      rock: '#B6A136',
      ghost: '#735797',
      dragon: '#6F35FC',
      dark: '#705746',
      steel: '#B7B7CE',
      fairy: '#D685AD',
    };

    let typeBgC = Object.keys(typeColors);
    let bG = [];

    // Sorts typeBgC based on item.types, checks what types are the same, sets header background based on type
    typeBgC.forEach(function (key, index) {
      typeBgC.sort((a, b) => item.types.indexOf(a) - item.types.indexOf(b));
      for (let i = 0; i <= item.types.length; i++) {
        if (item.types[i] === `${key}`) {
          bG.push(`${typeColors[key]}`);
          if (bG.length > 1) {
            $('.modal-header').css('background', 'linear-gradient(90deg, ' + bG[0] + ' 50%, ' + bG[1] + ' 50%)');
          } else {
            $('.modal-header').css('background', bG[0]);
          }
        }
      }
    });

    // Rounds to the first decimal place
    function round(value, precision) {
      let multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }

    // Converts pokemon Height to meters and Weight to kilograms
    let pokemonHeight = item.height * 0.1;
    pokemonHeight = round(pokemonHeight, 1);
    let pokemonWeight = item.weight * 0.1;
    pokemonWeight = round(pokemonWeight, 1);

    let nameElement = $('<h1 class="white-title">' + item.name + '</h1>');
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr('src', item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr('src', item.imageUrlBack);
    let idElement = $('<p>' + 'ID: #' + item.id + '</p>');
    let heightElement = $('<p>' + 'Height: ' + pokemonHeight + ' meters</p>');
    let weightElement = $('<p>' + 'Weight: ' + pokemonWeight + ' kilograms</p>');
    let typesElement = $('<p>' + 'Types: ' + item.types + '</p>/');
    let abilitiesElement = $('<p>' + 'Abilities: ' + item.abilities + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(idElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };

})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
