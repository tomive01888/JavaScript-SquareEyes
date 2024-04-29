import { cartTotalQty, cartTotalPrice } from "./cart-counting.js"
import { createCartItem } from "./cart-itemcard.js"
import { getFromStorage } from "./localstorage.js"

let localStorageList = getFromStorage("movieitem")

let cartContainer = document.querySelector(".created-itemlist")
const priceDisplay = document.querySelector(".total-price")
const amountTotalCart = document.querySelector(".amount-incart")

const totalCart = cartTotalQty(localStorageList)

amountTotalCart.textContent = totalCart

if(localStorageList.length > 0){

  cartContainer = createCartItem(localStorageList);

}else{
  cartContainer.innerHTML = "<p class='empty'>It seems your cart is empty</p>";
}


priceDisplay.textContent ="$" + cartTotalPrice(localStorageList);


const hrefToCheckout = document.querySelector(".go-to-check");
const purchaseBtn = document.querySelector("#purchased");

purchaseBtn.addEventListener('click', confirmOrder);

function confirmOrder(){
  if(localStorageList.length >= 1){

    hrefToCheckout.href = "./confirmation/index.html";
    localStorage.removeItem("movieitem");

  }else{
    
    hrefToCheckout.href = "";
   
  }
}  




