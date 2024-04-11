// import { getToken, getApiKey } from "./api.js"

const baseURL = "https://v2.api.noroff.dev/rainy-days/"

const moviesContainer = document.querySelector(".movies")

const filterBrowseAll = document.querySelector(".browse-all")

const filterAction = document.querySelector(".action")

const filterComedies = document.querySelector(".comedies")

const filterKids = document.querySelector(".kids")

const filterHorror = document.querySelector(".horror")

const filterDrama = document.querySelector(".drama")

async function getMovies(){

  const req = await fetch(baseURL)

  const result = await req.json()  

  for (let i = 0; i < result.data.length; i++){
    moviesContainer.innerHTML += `<a class="movies-card" href="/html/product.html?jacketid=${result.data[i].id}">

                          <div class="flex-sale">
                            <p class="${result.data[i].onSale ? "on-sale" : ""}">${result.data[i].onSale ? result.data[i].price : ""}</p>
                            <p class="current-price">$ ${result.data[i].onSale ? result.data[i].discountedPrice : result.data[i].price} </p>
                          </div>

                          <img src="${result.data[i].image.url}" alt="${result.data[i].title}"/>
                          <p>${result.data[i].title}</p>
      </a>`
  }
  console.log("DATA INNMAT" , result)
}

getMovies()


// async function filterAction(){

//   const actionMovie = result.filter(data => data.genre === 'action')

//   console.log(actionMovie)

// }


