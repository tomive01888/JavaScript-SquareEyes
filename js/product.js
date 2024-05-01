import { createSmallCard } from "./index-itemcard.js"
import { cartTotalQty } from "./cart-counting.js"
import { getFromStorage } from "./localstorage.js"


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
  try {

    await delayLoad(400);   

    const completeMovieUrl = baseURL + movieId  
      
    const req = await fetch(completeMovieUrl)

    if (!req.ok) {

      throw new Error('Failed to fetch movie details');

    }

    const result = await req.json() 

    movieDetail = result

    document.title = result.data.title

    movieContainerImage.innerHTML = `
                                      ${movieDetail.data.onSale ? `<div class='ribbon'>%</div>` : ""}
                                      <img class="movie-img" src="${movieDetail.data.image.url}" alt="${movieDetail.data.title}" />
                                    `

    movieContainerInfo.innerHTML = `<div class="text-box">
                                      <h1>${movieDetail.data.title} </h1>
                                      <div class="price">
                                        <p class="current-price">$ ${movieDetail.data.onSale ? movieDetail.data.discountedPrice : movieDetail.data.price}</p>
                                        <p class="${movieDetail.data.onSale ? "on-sale" : ""}">${movieDetail.data.onSale ? movieDetail.data.price : ""}</p>
                                      </div>
                                      <p>Description: ${movieDetail.data.description} </i></p>
                                      <p>Rating: <i class="fa-solid fa-star"></i> ${movieDetail.data.rating} </p>
                                      <p>Release year: ${movieDetail.data.released}</p>
                                      <p>Genre: ${movieDetail.data.genre}</p>
                                    </div>`


  }catch(error){

    console.error('Error fetching movie details:', error);
  }
}

function delayLoad(ms) {    
  return new Promise(resolve => setTimeout(resolve, ms));
}

getMovieDetail()

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const totalCart = cartTotalQty(localStorageList)


amountTotalCart.textContent = totalCart
addCartBtn.addEventListener("click", addToCart)
function addToCart(){

  let quantity = 0

  const movieToAdd = { 
    image: movieDetail.data.image.url,
    title: movieDetail.data.title,
    price: movieDetail.data.onSale ? movieDetail.data.discountedPrice : movieDetail.data.price,
    quantity: quantity,
  }

  const isMovieInCart = itemInCart(localStorageList, movieDetail.data.title)

  if(!isMovieInCart){

    localStorageList.push({...movieToAdd, quantity:quantity+1})

    localStorage.setItem("movieitem", JSON.stringify(localStorageList)) 

    const totalCart = cartTotalQty(localStorageList)

    amountTotalCart.textContent = totalCart

  } 
  else {    
    const findIndex = localStorageList.findIndex(movie => movie.title === movieDetail.data.title)

    localStorageList[findIndex].quantity++

    localStorage.setItem("movieitem", JSON.stringify(localStorageList))

    const totalCart = cartTotalQty(localStorageList)

    amountTotalCart.textContent = totalCart
  }
};



function itemInCart(arr, titleToCheck) {

   const found = arr.some((item) => item.title === titleToCheck )

  if (found) {
    return true
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function filterOutCurrent(){


  await delay(200);

  const req = await fetch(baseURL)
 
  if (req.ok){
   const movieDetail = await req.json()
 
   const movies = movieDetail.data 
   
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
   </div>`   
  }  
}

function delay(ms) {
    
  return new Promise(resolve => setTimeout(resolve, ms));
}

filterOutCurrent();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////