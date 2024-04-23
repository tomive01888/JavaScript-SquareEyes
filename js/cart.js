import { cartQtyTotalCount, cartSumTotalPrice } from "./cart-counting.js"
import { createCartItem } from "./cart-itemcard.js"
import { getFromStorage } from "./localstorage.js"

let localStorageList = getFromStorage("movieitem")

const cartContainer = document.querySelector(".cart-items")
const amountTotalCart = document.querySelector(".amount-incart")

const totalCart = cartQtyTotalCount(localStorageList)

amountTotalCart.textContent = totalCart


console.log(localStorageList)

if(localStorageList.length > 0){


  const html = createCartItem(localStorageList)
  
  cartContainer.appendChild(html)


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


const cartTotalPrice = document.querySelector(".total-price")

const totalPrice = cartSumTotalPrice(localStorageList)

cartTotalPrice.textContent ="$" + totalPrice


const confirmBtn = document.querySelector(".checkout")
const closeBtn = document.querySelector(".xmark")
const modalWindow = document.querySelector("#user-confirm")

confirmBtn.addEventListener('click', openWindow)


closeBtn.addEventListener('click', closeWindow)

function closeWindow(){
  modalWindow.style.display = "none"
}

function openWindow(){
  modalWindow.style.display = "flex" 

}

const purchaseBtn = document.querySelector("#purchased")

purchaseBtn.addEventListener('click', confirmOrder)

function confirmOrder(){
  localStorage.removeItem("movieitem");
}  




