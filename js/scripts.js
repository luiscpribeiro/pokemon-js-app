let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      document.write('<p>Error adding new pokemon</p><hr>');
    }
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideModal();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  };

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideModal();
      item.imgUrlFront = details.sprites.front_default;
      item.imgUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = [];
      for (var i = 0; i < details.types.length; i++) {
        item.types.push(details.types[i].type.name);
      }
      item.id = details.id;
    }).catch(function (e) {
      console.error(e);
    });
  };

  function getAll() {
    return pokemonList;
  }

  // function detailsListItem(pokemon) {
  //   loadDetails(pokemon).then(function(){
  //     addListItem(pokemon);
  //   });
  // }

  function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listItem = document.createElement('div');
      // let listImg = document.createElement('img');
      let button = document.createElement('button');
      let breakLine = document.createElement('br');
      // listItem.innerText = ('#' + pokemon.id + ' ' + pokemon.name);
      listItem.innerText = (pokemon.name);
      // listImg.src = pokemon.imgUrlFront;
      listItem.classList.add('pokemon-item');
      button.innerText = ('Details');
      button.classList.add('pokemon-button', 'group-list-item', 'btn', 'btn-primary');
      pokemonList.appendChild(listItem);
      // listItem.appendChild(listImg);
      listItem.appendChild(breakLine);
      listItem.appendChild(button);
      pokemonClick(button, pokemon);
  }

  function pokemonClick(button, pokemon) {
    button.addEventListener ('click', function(){
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showLoadingMessage() {
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let contentElement = document.createElement('p');
    contentElement.innerText = ('Loading');

    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  };

  let modalContainer = document.querySelector('.modal-container');
  function showModal(pokemon) {
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement ('h1');
    titleElement.innerText = pokemon.name;
    titleElement.style.textTransform = 'capitalize';

    let imgElementFront = document.createElement ('img');
    imgElementFront.src = pokemon.imgUrlFront;

    let imgElementBack = document.createElement ('img');
    imgElementBack.src = pokemon.imgUrlBack;

    let pokemonDetails = document.createElement ('p');

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imgElementFront);
    modal.appendChild(imgElementBack);
    modal.appendChild(pokemonDetails);
    pokemonDetails.innerHTML += ('<br>ID: #' + pokemon.id);
    pokemonDetails.innerHTML += ('<br>Height: ' + pokemon.height + ' (dm)');
    pokemonDetails.innerHTML += ('<br>Weight: ' + pokemon.weight + ' (hg)');
    pokemonDetails.innerHTML += ('<br>Type: ' + pokemon.types);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;

    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    // detailsListItem: detailsListItem,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
