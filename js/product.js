// import { getToken, getApiKey } from "./api.js"

const baseURL = "https://v2.api.noroff.dev/"

const singleproductEndpoint = "square-eyes/"

const movieContainer = document.querySelector(".movie-detail")

const parameterString = window.location.search;
const searchParameters = new URLSearchParams(parameterString);

const movieId = searchParameters.get("movieid")

console.log(movieId)

async function getMovieDetail() {
    
    // const apiKey = await getApiKey()
    // const token = await getToken()

    // const options = {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "X-Noroff-API-Key": apiKey
    //     }
    //   }

   const completeMovieUrl = baseURL + singleproductEndpoint + movieId  
    
  const req = await fetch(completeMovieUrl, options)

  const result = await req.json()

  console.log(result) 
 
    movieContainer.innerHTML += `<div class="info">

                                    <div class="flex-sale">
                                    <p class="${result.data.onSale ? "on-sale" : ""}">${result.data.onSale ? result.data.price : ""}</p>
                                    <p class="current-price">$ ${result.data.onSale ? result.data.discountedPrice : result.data.price} </p>
                                    </div>

                                    <img src="${result.data.image.url}" alt="${result.data.title}"/>
                                    <p>${result.data.title}</p>
                                 </div>`
  

}

getMovieDetail()