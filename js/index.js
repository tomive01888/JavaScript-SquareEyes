import { createHTML } from "./index-itemcard.js"
import { getMovies } from "./fetchAPI.js"
import { getFromStorage } from "./localstorage.js"
import { cartQtyTotalCount } from "./cart-counting.js" 

const moviesContainer = document.querySelector(".all-movies")
const selectOption = document.querySelector(".genreSelector")
const errorContainer = document.querySelector(".container")
const amountTotalCart = document.querySelector(".amount-incart")

let movies = []
let localStorageList = getFromStorage("movieitem")

const allMovies = await getMovies()

const totalCart = cartQtyTotalCount(localStorageList)

amountTotalCart.textContent = totalCart


if(allMovies.error === false){ 

  movies = allMovies.movies.data

  console.log("target value", movies)

  moviesContainer.innerHTML = ""

 for(let i = 0; i < movies.length; i++){   
      moviesContainer.innerHTML +=  createHTML(movies[i])
     }

} else{
  // errorContainer.innerHTML = ""

  errorContainer.innerHTML += `<div class="error">
                <h1>${allMovies.msg}</h1>
                <p>Error status: ${allMovies.status}</p>
                <p>Something went wrong</p>

    </div>`
}


selectOption.addEventListener("input", filteredByGenres)

function filteredByGenres(event) {  

 let selectedGenre = event.target.value

 if(selectedGenre === "all"){
  moviesContainer.innerHTML = ""

  for (let i = 0; i < movies.length; i++){   
    moviesContainer.innerHTML +=  createHTML(movies[i])
  }
  return 
 }

 let filteredMovies = movies.filter(movie => movie.genre.toLowerCase() === selectedGenre.toLowerCase())

 moviesContainer.innerHTML = ""

 for (let i = 0; i < filteredMovies.length; i++){   
    moviesContainer.innerHTML +=  createHTML(filteredMovies[i]) 
  }
}