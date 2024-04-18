import { createSmallCard } from "./index-itemcard.js"
import { cartQtyTotalCount } from "./cart-counting.js"

const baseURL = "https://v2.api.noroff.dev/square-eyes/"

const movieContainerImage = document.querySelector(".image-box")
const movieContainerInfo = document.querySelector(".movie-info")
const addCartBtn = document.querySelector(".addcart")
const randomPickDiv = document.querySelector(".random-picks")
const amountTotalCart = document.querySelector(".amount-incart")


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

  // const updateButton = itemInCart(localStorageList, movieDetail.data.title) 

  document.title = result.data.title

  movieContainerImage.innerHTML = `<div> 
                                    <div class="ribbon"><i class="fa-solid fa-heart"></i></div>
                                    <img class="movie-img" src="${result.data.image.url}" alt="${result.data.title}" />
                                  </div>`

  movieContainerInfo.innerHTML = `<div class="text-box">
                                    <h1>${result.data.title} </h1>
                                    <div class="price">
                                      <p class="current-price">$ ${result.data.onSale ? result.data.discountedPrice : result.data.price}</p>
                                      <p class="${result.data.onSale ? "on-sale" : ""}">${result.data.onSale ? result.data.price : ""}</p>
                                    </div>
                                    <p>Description: ${result.data.description} </i></p>
                                    <p>Rating: <i class="fa-solid fa-star"></i> ${result.data.rating} </p>
                                    <p>Release year: ${result.data.released}</p>
                                    <p>Genre: ${result.data.genre}</p>
                                  </div>`

}
getMovieDetail()

const totalCart = cartQtyTotalCount(localStorageList)

amountTotalCart.textContent = totalCart




addCartBtn.addEventListener("click", addToCart)

function addToCart(){

  let quantity = 0


  // V2 you need to use x.data.x.x or V1 it will be movieDetail.image.url
  let movieToAdd = { 
    image: movieDetail.data.image.url,
    title: movieDetail.data.title,
    price: movieDetail.data.onSale ? movieDetail.data.discountedPrice : movieDetail.data.price,
    quantity: quantity,
  }

  const isMovieInCart = itemInCart(localStorageList, movieDetail.data.title)

  if(!isMovieInCart){

    localStorageList.push({...movieToAdd, quantity:quantity+1})

    localStorage.setItem("movieitem", JSON.stringify(localStorageList)) 

    const totalCart = cartQtyTotalCount(localStorageList)

    amountTotalCart.textContent = totalCart

  } 
  else {    
    const findIndex = localStorageList.findIndex(movie => movie.title === movieDetail.data.title)

    localStorageList[findIndex].quantity++

    localStorage.setItem("movieitem", JSON.stringify(localStorageList))

    const totalCart = cartQtyTotalCount(localStorageList)

    amountTotalCart.textContent = totalCart
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

async function filterOutCurrent(){

  const req = await fetch(baseURL)
 
  if (req.ok){
   const result = await req.json()
 
   const movies = result.data 
   
   randomPickDiv.innerHTML = ""

   const newFilteredWithoutCurrent = movies.filter(movie => movie.id !== movieId)

   function getThreeRandomNumbers(){

    let max = newFilteredWithoutCurrent.length
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
   
   const threeRandomNumbers = getThreeRandomNumbers()

    for ( let i = 0; i < threeRandomNumbers.length; i++){

      let indexFromRandomArr =  threeRandomNumbers[i] 

      randomPickDiv.innerHTML += createSmallCard(newFilteredWithoutCurrent[indexFromRandomArr])
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
 filterOutCurrent()



