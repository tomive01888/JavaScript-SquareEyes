const baseURL = "https://v2.api.noroff.dev/square-eyes/"

const movieContainerImage = document.querySelector(".movie-img")
const movieContainerInfo = document.querySelector(".movie-info")
const addCartBtn = document.querySelector(".addcart")
const randomPickDiv = document.querySelector(".random-picks")


let movieDetail = {}

let localStorageList = getFromStorage("movieitem")

const parameterString = window.location.search;

const searchParameters = new URLSearchParams(parameterString);

const movieId = searchParameters.get("movieid")

async function getMovieDetail() {    

  const completeMovieUrl = baseURL + movieId  
    
  const req = await fetch(completeMovieUrl)

  const result = await req.json()

  movieDetail = result

  const updateButton = itemInCart(localStorageList, movieDetail.data.title)

  if(updateButton){

    addCartBtn.innerHTML = `<i class='fa-solid fa-minus'></i> Remove from cart`

  }

  document.title = result.data.title   

  movieContainerImage.src = result.data.image.url

  movieContainerImage.alt = result.data.title

  movieContainerInfo.innerHTML = `<div class="text-box">
   <h1>${result.data.title} ${result.data.favorite ? "<span> is now trending </span>" : ""} </h1>
   <div class="price">
     <p class="current-price">$ ${result.data.onSale ? result.data.discountedPrice : result.data.price}</p>
     <p class="${result.data.onSale ? "on-sale" : ""}">${result.data.onSale ? result.data.price : ""}</p>
   </div>
   <p>Description:${result.data.description} </i></p>
   <p>Rating: <i class="fa-solid fa-star"></i> ${result.data.rating} </p>
   <p>Release year: ${result.data.released}</p>
   <p>Genre: ${result.data.genre}</p>
</div>`

}

getMovieDetail()

addCartBtn.addEventListener("click", addToCart)

function addToCart(){

  const movieToAdd = { 
    title: movieDetail.data.title,
    price: movieDetail.data.onSale ? movieDetail.data.discountedPrice : movieDetail.data.price,
  }

  const isMovieInCart = itemInCart(localStorageList, movieDetail.data.title)

  console.log("is it tho?", isMovieInCart)

  if(isMovieInCart){

    console.log("is movie in cart")

    const filteredList = localStorageList.filter((movie) => movie.title !==  movieToAdd.title)

    localStorageList = filteredList

    localStorage.setItem("movieitem", JSON.stringify(localStorageList))

    addCartBtn.innerHTML = `<i class='fa-solid fa-plus'></i> Add to cart`


  } else {

    console.log("else")
    
    localStorageList.push(movieToAdd)

    localStorage.setItem("movieitem", JSON.stringify(localStorageList))

    addCartBtn.innerHTML = `<i class='fa-solid fa-minus'></i> Remove from cart`
  } 
};

function itemInCart(arr, titleToCheck) {
  
   const found = arr.some((item) => item.title === titleToCheck )

  if (found) {
    return true
  }
}

function getFromStorage(key) {
  const savedInStorage = localStorage.getItem(key)

  if (!savedInStorage) {
    return []
  }

  return JSON.parse(savedInStorage)
}

async function getMovies(){

  const req = await fetch(baseURL)
 
  if (req.ok){
   const result = await req.json()
 
   const movies = result.data 
   
   randomPickDiv.innerHTML = ""

   const removeFromRandom = movies.filter(movie => movie.title !== movieDetail.data.title)

   function yesSir(){

    let max = removeFromRandom.length


    let randomNumArr = []
    let numberOfDisplayedMovies = 3

    for (let i = 0; i < numberOfDisplayedMovies; i++){  
      
      let num = Math.floor(Math.random() * max)

      if(randomNumArr.indexOf(num) === -1){
        randomNumArr.push(num)

      } else i--

    }

    return randomNumArr    

   }
   
   const threeRandomNumbers = yesSir()

   console.log("asdasdaasdasdadasdad", threeRandomNumbers)



    for ( let i = 0; i < threeRandomNumbers; i++){

      console.log("asdasda", removeFromRandom[i])

      randomPickDiv.innerHTML += createHTML(removeFromRandom[i])
    }
  } else{
 
   randomPickDiv.innerHTML = ""
 
   randomPickDiv.innerHTML += `
 
   <div class="error">
               <p>Error: while fetching data</p>
               <p>Status code: ${req.status} </p>
   </div> 
   
   `  
  }
 
  
 }

 getMovies()

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
