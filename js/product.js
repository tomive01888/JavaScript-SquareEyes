// import { getToken, getApiKey } from "./api.js"

// const baseURL = "https://v2.api.noroff.dev/square-eyes/"

// const movieContainer = document.querySelector(".movie-detail")

// const parameterString = window.location.search;

// const searchParameters = new URLSearchParams(parameterString);

// const movieId = searchParameters.get("movieid")

// console.log(movieId)

// async function getMovieDetail() {    

//   const completeMovieUrl = baseURL + movieId  
    
//   const req = await fetch(completeMovieUrl)

//   const result = await req.json()

//   console.log(result) 
 
//   movieContainer.innerHTML += `<div class="info">

//            <div class="flex-sale">
//               <p class="${result.data.onSale ? "on-sale" : ""}">${result.data.onSale ? result.data.price : ""}</p>
//               <p class="current-price">$ ${result.data.onSale ? result.data.discountedPrice : result.data.price} </p>
//             </div>

//             <img src="${result.data.image.url}" alt="${result.data.title}"/>

//             <p>${result.data.title}</p>
//   </div>`
  

// }

// getMovieDetail()


const baseURL = "https://v2.api.noroff.dev/rainy-days/" 
 
const jacketsContainer = document.querySelector(".jacket-detail")
 
const parameterString = window.location.search;

const searchParameters = new URLSearchParams(parameterString);
 
const jacketId = searchParameters.get("jacketid")
 
// console.log(jacketId)

 
async function getJacketDetail() {

  const completejacketUrl = baseURL  + jacketId
 
  const req = await fetch(completejacketUrl)
 
  const result = await req.json()

  // console.log = (result)
 
  jacketsContainer.innerHTML += `<div class="info">

             <div class="flex-sale">
                <p class="${result.data.onSale ? "on-sale" : ""}">${result.data.onSale ? result.data.price : ""}</p>
               <p class="current-price">$ ${result.data.onSale ? result.data.discountedPrice : result.data.price} </p>
             </div>
  
              <img src="${result.data.image.url}" alt="${result.data.title}"/>
  
               <p>${result.data.title}</p>
   </div>`
}
 
getJacketDetail()