import { createHTML } from "./index-itemcard.js"
import { getMovies } from "./fetchAPI.js"
import { getFromStorage } from "./localstorage.js"
import { cartTotalQty } from "./cart-counting.js" 

const moviesContainer = document.querySelector(".all-movies");
const selectOption = document.querySelector(".genreSelector");
const errorContainer = document.querySelector(".container");
const amountTotalCart = document.querySelector(".amount-incart");

let movies = [];
let localStorageList = getFromStorage("movieitem");

async function initialize() {
    try{
        const allMovies = await getMovies();
        amountTotalCart.textContent = cartTotalQty(localStorageList);

        if(allMovies.error === false) {
            movies = allMovies.movies.data;
            showMovies(movies);
        }else{
            showError(allMovies.msg, allMovies.status);

        };

    }catch(error){
        showError("Error fetching movies", 500);

    };
};

function showMovies(filteredMovies) {
  moviesContainer.innerHTML = filteredMovies.map(createHTML).join('');
}

function showError(message, status) {
  errorContainer.innerHTML = `<div class="error">
        <h1>${message}</h1>
        <p>Error status: ${status}</p>
        <p>Something went wrong</p>
  </div>`
};


selectOption.addEventListener("input", filteredByGenres);
function filteredByGenres(event) {  
  const selectedGenre = event.target.value.toLowerCase();

  if(selectedGenre === "all") {
    showMovies(movies);

  }else{
    const filteredMovies = movies.filter(movie => movie.genre.toLowerCase() === selectedGenre);
    showMovies(filteredMovies);

  };
};


initialize();

