import { getFromStorage } from "./localstorage.js";

const cartCounter = document.querySelector(".shop-cart span")

const storageList = getFromStorage("movieitem")

export function cartQtyTotalCount(){


  cartCounter.textContent = 0

  // replace with array from localStorage =>>>>    const arr = [23, 34, 77, 99, 324];
  let qty = 0;
  for (let i = 0; i < storageList.length; i++) {
   
    qty += storageList[i].quantity;
  
  } 

  console.log("qty total:", qty);

  cartCounter.textContent = qty

}

export function cartSumTotalPrice(){
  const cartTotalPrice = document.querySelector(".total-price")

// replace with array from localStorage =>>>>    const arr = [23, 34, 77, 99, 324];
  let sum = 0;

  cartTotalPrice.textContent = ""

  for (let i = 0; i < localStorageList.length; i++) {

    sum += localStorageList[i].quantity * localStorageList[i].price;

  }
  console.log("total sum of cart:", sum);

  cartTotalPrice.textContent = "$" + sum

}