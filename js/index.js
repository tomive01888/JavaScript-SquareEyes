import { createHTML } from "./index-itemcard.js"
import { getMovies } from "./fetch-movies.js"


 

const moviesContainer = document.querySelector(".all-movies")
const selectOption = document.querySelector(".genre-selector")
const errorContainer = document.querySelector(".container")

let movies = []


const allMovies = await getMovies()

console.log("errrrror", allMovies.error)


if(allMovies.error === false){

  console.log(allMovies)

  movies = allMovies.movies.data

  moviesContainer.innerHTML = ""

 for(let i = 0; i < movies.length; i++){   
      moviesContainer.innerHTML +=  createHTML(movies[i])  
     }

} else{
  errorContainer.innerHTML = ""

  errorContainer.innerHTML += `<div class="error">
                <h1>${allMovies.msg}</h1>
                <p>Error status: ${allMovies.status}</p>
                <p>Something went wrong</p>

    </div>`;

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
    console.log(filteredMovies[i])
  }

}