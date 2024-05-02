import { cartTotalQty, cartTotalPrice } from "./Uilities/cart-counting.js"
import { createCartItem } from "./cardCreator/checkout-itemcard.js"
import { getFromStorage } from "./Uilities/localstorage.js"

let localStorageList = getFromStorage("movieitem")

let cartContainer = document.querySelector(".created-itemlist")
const priceDisplay = document.querySelector(".total-price")
const amountTotalCart = document.querySelector(".amount-incart")

amountTotalCart.textContent = cartTotalQty(localStorageList)

if(localStorageList.length > 0){

  cartContainer = createCartItem(localStorageList);

}else{
  cartContainer.innerHTML = "<p class='empty'>It seems your cart is empty</p>";
}

priceDisplay.textContent ="$" + cartTotalPrice(localStorageList);

const hrefToCheckout = document.querySelector(".go-to-check");
const purchaseBtn = document.getElementById("purchased");

purchaseBtn.addEventListener('click', confirmOrder);

function confirmOrder(){
  if(localStorageList.length >= 1){

    hrefToCheckout.href = "./confirmation/index.html";
    localStorage.removeItem("movieitem");
    amountTotalCart.textContent = "0";


  }else{
    
    hrefToCheckout.href = "";
   
  }
}  




