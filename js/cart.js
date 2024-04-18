import { createCartItem } from "./cart-itemcard.js"
import { getFromStorage } from "./localstorage.js"



const cartContainer = document.querySelector(".cart-items")


let localStorageList = getFromStorage("movieitem")
console.log(localStorageList)

if(localStorageList.length > 0){

  // cartContainer.innerHTML = ""

  const html = createCartItem(localStorageList)
  
  cartContainer.appendChild(html)

  // console.log(html)

}else{
  cartContainer.innerHTML = "Your cart is empty"
}

const deleteBtn = document.querySelectorAll(".remove-from-cart")

deleteBtn.forEach(btn => btn.addEventListener("click", removeFromCart))

function removeFromCart(event){

  const movieToRemove = event.target.dataset.target

  const filteredMovies = localStorageList.filter(item => item.title !== movieToRemove)

  localStorageList = filteredMovies

  localStorage.setItem("movieitem", JSON.stringify(localStorageList))

}

