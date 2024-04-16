const baseURL = "https://v2.api.noroff.dev/square-eyes/"

const moviesContainer = document.querySelector(".movies")

const selectOption = document.querySelector(".genre-selector")

let movies = []

let genre = ""

let loadingEyes = setTimeout(getMovies, 2000)

async function getMovies(){

 const req = await fetch(baseURL)

 console.log(req)

 if (req.ok){
  const result = await req.json()

  movies = result.data
 
  console.log("DATA INNMAT" ,movies)
  
  moviesContainer.innerHTML = ""

  for (let i = 0; i < movies.length; i++){   
    moviesContainer.innerHTML +=  createHTML(movies[i])  
   }

 } else {

  moviesContainer.innerHTML = ""

  moviesContainer.innerHTML += `

  <div class="error">
              <p>Error: while fetching data</p>
              <p>Status code: ${req.status} </p>
  </div> 
  
  `  
 }

 
}
// getMovies()

for (let i = 0; i < movies.length; i++){   
  moviesContainer.innerHTML +=  createHTML(movies[i]) 

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

function createHTML(movie) {  

   let html = `<a class="movies-card" href="/product/index.html?movieid=${movie.id}">
            ${movie.favorite ? "<span class='trending'> Trending </span>" : ""}
            <div class="flex-sale">
              <p class="${movie.onSale ? "on-sale" : ""}">${movie.onSale ? movie.price : ""}</p>
              <p class="current-price">$ ${movie.onSale ? movie.discountedPrice : movie.price} </p>
            </div>

            <img src="${movie.image.url}" alt="${movie.title}"/>
            <p class="title">${movie.title}</p>
    </a>`

    return html
}