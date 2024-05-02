import { cartTotalQty, cartTotalPrice } from "./Uilities/cart-counting.js";
import { createCartItem } from "./cardCreator/checkout-itemcard.js";
import { getFromStorage } from "./Uilities/localstorage.js";

let localStorageList = getFromStorage("movieitem");

let cartContainer = document.querySelector(".created-itemlist");
const priceDisplay = document.querySelector(".total-price");
const amountTotalCart = document.querySelector(".amount-incart");
const purchaseBtn = document.getElementById("purchased");
const disabledBtn = document.getElementById("disabled");



amountTotalCart.textContent = cartTotalQty(localStorageList);

if(localStorageList.length > 0){

  cartContainer = createCartItem(localStorageList);

}else{
  cartContainer.innerHTML = "<p class='empty'>It seems your cart is empty</p>";
}

priceDisplay.textContent ="$" + cartTotalPrice(localStorageList);

if(localStorageList.length === 0){
  disabledBtn.style.display = "grid";

  purchaseBtn.style.display = "none";
}

purchaseBtn.addEventListener('click', confirmOrder);
function confirmOrder(){
  let storageList = getFromStorage("movieitem")

  if(storageList.length > 0){

    localStorage.removeItem("movieitem");
    amountTotalCart.textContent = "0";
    window.location = "./confirmation/index.html";

  }
}  




