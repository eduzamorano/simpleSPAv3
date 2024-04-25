window.addEventListener('load', function() {
    handleHashChange();
});

window.addEventListener('hashchange', function() {
    handleHashChange();
});
//Función que maneja la lógica para mostrar/ocultar div
function handleHashChange() {
    var pageId = window.location.hash.replace('#', '') + 'Page';
    var pages = document.querySelectorAll('#content div');
    var found = false;
    //console.log(pageId);

    if (pageId === 'Page') {
        // Si solo se carga index.html(Page), ocultamos todas las páginas
        for (var i = 0; i < pages.length; i++) {
            pages[i].classList.add('hidden');
        }
        pages[0].classList.remove('hidden');
        return; // Salimos de la función sin realizar más acciones
    }

    // Si se encuentra el hash correspondiente a una página, la mostramos
    for (var i = 0; i < pages.length; i++) {
        if (pages[i].id === pageId) {
            pages[i].classList.remove('hidden');
            found = true;
        } else {
            pages[i].classList.add('hidden');
        }
    }

    // Si no se encuentra la página correspondiente, mostramos "Página no encontrada"
    if (!found) {
        var notFoundPage = document.getElementById('notFoundPage');
        if (notFoundPage) {
            notFoundPage.classList.remove('hidden');
        }
    }
}

//Manejo de llamada API
const apiurl = 'https://pokeapi.co/api/v2/pokemon/'


function llamarPoke() {
    pokem = prompt("Ingrese nombre pokemon");
    fetch(apiurl+pokem)
        .then(function(response) {
            if (!response.ok) {
                notFound();
                throw new Error('Error en la llamada');
                
            }
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            displayUser(data);
            
        })
        .catch(function(error) {
            console.error('Fetch error:', error);
        });
};

function displayUser(user) {
var pokeInfoDiv = document.getElementById('pokeInfoPage');
pokeInfoDiv.innerHTML = `
<p>Nueva Búsqueda<p><button onclick="llamarPoke()">Buscar</button>
<b><p>Nombre: ${user.name}</p></b>
<b><p>Índice: ${user.id}</p></b>
<p><img src="${user.sprites.other.home.front_default}" alt="User Image"></p>
`;
}
function notFound(){
var pokeInfoDiv = document.getElementById('pokeInfoPage');
pokeInfoDiv.innerHTML = '<b><h2>Pokémon no encontrado!</h2></b><button onclick="llamarPoke()">Buscar</button>';
}

function recargar(){
window.location.reload();
}
