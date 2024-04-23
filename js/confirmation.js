import { cartQtyTotalCount } from "./cart-counting.js"
import { getFromStorage } from "./localstorage.js"

const amountTotalCart = document.querySelector(".amount-incart")
const todaysDate = document.querySelector(".date")
const randomValue = document.querySelector(".random-value")

let localStorageList = getFromStorage("movieitem")

const totalCart = cartQtyTotalCount(localStorageList)

amountTotalCart.textContent = totalCart

let date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let fullYear = `${day}-${month}-${year}`

todaysDate.innerHTML = fullYear



function fiveRandomValues(length) {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

randomValue.innerHTML = fiveRandomValues(6)