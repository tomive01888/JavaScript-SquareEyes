import { cartQtyTotalCount, cartSumTotalPrice } from "./cart-counting.js"
import { createCartItem } from "./cart-itemcard.js"
import { getFromStorage } from "./localstorage.js"

let localStorageList = getFromStorage("movieitem")

const cartContainer = document.querySelector(".cart-items")
const amountTotalCart = document.querySelector(".amount-incart")

const totalCart = cartQtyTotalCount(localStorageList)

amountTotalCart.textContent = totalCart

if(localStorageList.length > 0){

  const html = createCartItem(localStorageList)
  
  cartContainer.appendChild(html)


}else{
  cartContainer.innerHTML = "Your cart is empty"
}

const cartTotalPrice = document.querySelector(".total-price")

const totalPrice = cartSumTotalPrice(localStorageList)

cartTotalPrice.textContent ="$" + totalPrice

const hrefToCheckout = document.querySelector(".go-to-check")
const purchaseBtn = document.querySelector("#purchased")

purchaseBtn.addEventListener('click', confirmOrder)

function confirmOrder(){
  if(localStorageList.length > 0){

    hrefToCheckout.href = "./confirmation/index.html"
    localStorage.removeItem("movieitem");

  }else{
    
    hrefToCheckout.href = ""
   
  }
}  




