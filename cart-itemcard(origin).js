import { getFromStorage } from "./localstorage.js";

const cartContainer = document.querySelector(".cart-items")

const cardWrapper = document.createElement("div")
cardWrapper.classList.add("innerWrapper")

let localStorageList = getFromStorage("movieitem")

export function createCartItem(arr){   

    cardWrapper.innerHTML = ""

    if(arr.length > 0){
    
      for(let i = 0; i < arr.length; i++){ 
        
        const movieWrapper = document.createElement("div")
        movieWrapper.classList.add('single-product');
    
        //
        const containerFirst = document.createElement("div")
        containerFirst.classList.add('contFirst');
        movieWrapper.appendChild(containerFirst)
    
        const movieImage = document.createElement("img")
        movieImage.src = arr[i].image
        movieImage.alt = arr[i].title
        containerFirst.appendChild(movieImage)
    
        const movieTitle = document.createElement("p")
        movieTitle.textContent = arr[i].title
        movieTitle.classList.add("title")
        containerFirst.appendChild(movieTitle)
        
        //
        const containerSecond = document.createElement("div")
        containerSecond.classList.add('contSecond')
        movieWrapper.appendChild(containerSecond)    
        
        //
        const quantityWrapper = document.createElement("div")
        quantityWrapper.classList.add('quantitywrapper')
        containerSecond.appendChild(quantityWrapper)
    
        const buttonMinus = document.createElement("button")
        buttonMinus.classList.add('minus')
        buttonMinus.textContent = "-"
        quantityWrapper.appendChild(buttonMinus)
        buttonMinus.addEventListener("click", removeOneFromCart)
    
    
        const movieQnty = document.createElement("p")
        movieQnty.textContent = arr[i].quantity
        movieQnty.dataset.quantity = arr[i].quantity
        movieQnty.dataset.title = arr[i].title
        quantityWrapper.appendChild(movieQnty)
    
        const buttonPlus = document.createElement("button")
        buttonPlus.classList.add('plus')
        buttonPlus.textContent = "+"
        quantityWrapper.appendChild(buttonPlus);
        buttonPlus.addEventListener("click", addOneToCart)
    
        //
        const moviePrice = document.createElement("p")
        moviePrice.textContent = "$" + Number(arr[i].price).toFixed(2) * arr[i].quantity
        moviePrice.classList.add('price')    
        containerSecond.appendChild(moviePrice)
    
        const movieRemoveAll = document.createElement("button")
        movieRemoveAll.classList.add('remove-from-cart')
        movieRemoveAll.textContent = "X"
        movieRemoveAll.dataset.target = arr[i].title    
        containerSecond.appendChild(movieRemoveAll);
    
        cardWrapper.appendChild(movieWrapper)
    
        
      };

      return cardWrapper
    
    }else{

        return []
    }
}

function removeOneFromCart(event){

  const title = event.target.nextSibling.dataset.title
  const amount = Number(event.target.nextSibling.dataset.quantity)

  console.log("minus",title, amount)

  if(localStorageList.length === 1 && amount === 1){

    localStorage.clear("movieitem");
    cartContainer.innerHTML = "Your cart is empty";

  }



  if(amount === 1 && localStorageList.length > 1){
    
    cardWrapper.innerHTML = ""

    const filteredMovies = localStorageList.filter(item => item.title !== title)

    localStorageList = filteredMovies

    localStorage.setItem("movieitem", JSON.stringify(localStorageList))

    const html = createCartItem(filteredMovies)

    cartContainer.appendChild(html)

  } 
  
  if(amount > 1 && localStorageList.length > 1){

    cardWrapper.innerHTML = ""

    const findIndex = localStorageList.findIndex(movie => movie.title === title)

    localStorageList[findIndex].quantity--

    localStorage.setItem("movieitem", JSON.stringify(localStorageList))

    const html = createCartItem(localStorageList)

    cartContainer.appendChild(html)

  }

  // const findIndex = localStorageList.findIndex(movie => movie.title === movieDetail.data.title)

  // localStorageList[findIndex].quantity++

  // localStorage.setItem("movieitem", JSON.stringify(localStorageList))




}

function addOneToCart(event){

  const title = event.target.previousSibling.dataset.title
  const amount = event.target.previousSibling.dataset.quantity

  console.log("add",title, amount);

  // console.log("add",event)


}