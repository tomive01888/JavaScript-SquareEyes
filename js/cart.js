import { createCartItem } from "./cart-itemcard.js"
import { getFromStorage } from "./localstorage.js"



const cartContainer = document.querySelector(".cart-items")


let localStorageList = getFromStorage("movieitem")
console.log(localStorageList)

if(localStorageList.length > 0){

  cartContainer.innerHTML = ""

  const html = createCartItem(localStorageList)
  
  cartContainer.appendChild(html)

  console.log(html)
  // for(let i = 0; i < localStorageList.length; i++){ 
    
  //   const movieWrapper = document.createElement("div")
  //   movieWrapper.classList.add('single-product');

  //   //
  //   const containerFirst = document.createElement("div")
  //   containerFirst.classList.add('contFirst');
  //   movieWrapper.appendChild(containerFirst)

  //   const movieImage = document.createElement("img")
  //   movieImage.src = localStorageList[i].image
  //   movieImage.alt = localStorageList[i].title
  //   containerFirst.appendChild(movieImage)

  //   const movieTitle = document.createElement("p")
  //   movieTitle.textContent = localStorageList[i].title
  //   movieTitle.classList.add("title")
  //   containerFirst.appendChild(movieTitle)
    
  //   //
  //   const containerSecond = document.createElement("div")
  //   containerSecond.classList.add('contSecond');
  //   movieWrapper.appendChild(containerSecond)    
    
  //   //
  //   const quantityWrapper = document.createElement("div")
  //   quantityWrapper.classList.add('quantitywrapper')
  //   containerSecond.appendChild(quantityWrapper);

  //   const buttonMinus = document.createElement("button")
  //   buttonMinus.classList.add('minus')
  //   buttonMinus.textContent = "-"
  //   quantityWrapper.appendChild(buttonMinus)    

  //   const movieQnty = document.createElement("p")
  //   movieQnty.textContent = localStorageList[i].quantity
  //   movieQnty.dataset.quantity = localStorageList[i].quantity
  //   movieQnty.dataset.title = localStorageList[i].title
  //   quantityWrapper.appendChild(movieQnty)

  //   const buttonPlus = document.createElement("button")
  //   buttonPlus.classList.add('plus')
  //   buttonPlus.textContent = "+"
  //   // movieRemoveAll.dataset.target = localStorageList[i].quantity
  //   quantityWrapper.appendChild(buttonPlus);

  //   //
  //   const moviePrice = document.createElement("p")
  //   moviePrice.textContent = "$" + localStorageList[i].price * localStorageList[i].quantity
  //   moviePrice.classList.add('price');

  //   containerSecond.appendChild(moviePrice)

  //   const movieRemoveAll = document.createElement("button")
  //   movieRemoveAll.classList.add('remove-from-cart')
  //   movieRemoveAll.textContent = "X"
  //   movieRemoveAll.dataset.target = localStorageList[i].title    
  //   containerSecond.appendChild(movieRemoveAll)  ;

  //   cartContainer.appendChild(movieWrapper)

    
  // };

}else{
  cartContainer.innerHTML = "Your cart is empty"
}


const minusFromCart = document.querySelectorAll(".minus")
const plusFromCart = document.querySelectorAll(".plus")

minusFromCart.forEach(btn => btn.addEventListener("click", removeOneFromCart))

plusFromCart.forEach(btn => btn.addEventListener("click", addOneToCart))



function removeOneFromCart(event){

  const title = event.target.nextSibling.dataset.title
  const amount = event.target.nextSibling.dataset.quantity

  console.log("minus",title, amount)

  if(amount.length === 1){


    console.log("asdasd")
    
    cartContainer.innerHTML = ""


    const filteredMovies = localStorageList.filter(item => item.title !== title)

    localStorageList = filteredMovies

    localStorage.setItem("movieitem", JSON.stringify(localStorageList))


    console.log(localStorageList)

    const html = createCartItem(filteredMovies)

    cartContainer.appendChild(html)





  }else{



  }

  // const findIndex = localStorageList.findIndex(movie => movie.title === movieDetail.data.title)

  // localStorageList[findIndex].quantity++

  // localStorage.setItem("movieitem", JSON.stringify(localStorageList))




}

function addOneToCart(event){

  const title = event.target.previousSibling.dataset.title
  const amount = event.target.previousSibling.dataset.quantity

  console.log("add",title, amount)

  // console.log("add",event)


}





const deleteBtn = document.querySelectorAll(".remove-from-cart")

deleteBtn.forEach(btn => btn.addEventListener("click", removeFromCart))

function removeFromCart(event){

  const movieToRemove = event.target.dataset.target

  const filteredMovies = localStorageList.filter(item => item.title !== movieToRemove)

  localStorageList = filteredMovies

  localStorage.setItem("movieitem", JSON.stringify(localStorageList))

}






