import { cartQtyTotalCount, cartSumTotalPrice } from "./cart-counting.js";
import { getFromStorage } from "./localstorage.js";

let localStorageList = getFromStorage("movieitem")


const cartContainer = document.querySelector(".cart-items")
const totalPriceCart = document.querySelector(".total-price")
const amountTotalCart = document.querySelector(".amount-incart")
const hrefToCheckout = document.querySelector(".go-to-check")



const cardWrapper = document.createElement("div")
cardWrapper.classList.add("innerWrapper")

amountTotalCart.textContent = "$" + cartSumTotalPrice(localStorageList)



export function createCartItem(arr){   

    cardWrapper.innerHTML = ""

    if(arr.length === 0){

      return []
    }

    if(arr.length > 0){
    
      for(let i = 0; i < arr.length; i++){ 
        
        const movieWrapper = document.createElement("div")
        movieWrapper.classList.add('single-product');
    
        //
        const containerFirst = document.createElement("div")
        containerFirst.classList.add('leftContainer');
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
        containerSecond.classList.add('rightContainer')
        movieWrapper.appendChild(containerSecond)    
        
        //
        const quantityWrapper = document.createElement("div")
        quantityWrapper.classList.add('qtyContainer')
        containerSecond.appendChild(quantityWrapper)
    
        const buttonMinus = document.createElement("button")
        buttonMinus.classList.add('minus')
        buttonMinus.textContent = "-"
        buttonMinus.dataset.action = 'decrease'
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
        buttonPlus.dataset.action = 'increase'
        quantityWrapper.appendChild(buttonPlus);
        buttonPlus.addEventListener("click", removeOneFromCart)
    
        //
        const moviePrice = document.createElement("p")
        moviePrice.textContent = "$" + Math.round(arr[i].price * arr[i].quantity * 100) / 100
        moviePrice.classList.add('price')    
        containerSecond.appendChild(moviePrice)
    
        const movieRemoveAll = document.createElement("button")
        movieRemoveAll.classList.add('remove-from-cart')
        movieRemoveAll.textContent = "X"
        movieRemoveAll.dataset.title = arr[i].title    
        containerSecond.appendChild(movieRemoveAll);
        movieRemoveAll.addEventListener('click', deleteFromCart)
    
        cardWrapper.appendChild(movieWrapper)
    
        
      };

      return cardWrapper
    
    }else{

        return []
    }
}

function removeOneFromCart(event){

  const actionType = event.target.dataset.action

  const title = actionType === 'decrease' ? event.target.nextSibling.dataset.title : event.target.previousSibling.dataset.title
  const amount = actionType === 'decrease' ? Number(event.target.nextSibling.dataset.quantity) : Number(event.target.previousSibling.dataset.quantity) 
  switch (actionType) {
    case 'increase':

    console.log("opp kvanta")

    cardWrapper.innerHTML = ""

    let findTitle = localStorageList.findIndex(movie => movie.title === title)

    localStorageList[findTitle].quantity++

    localStorage.setItem("movieitem", JSON.stringify(localStorageList))

    let cartHtml = createCartItem(localStorageList)

    cartContainer.appendChild(cartHtml)
 

    totalPriceCart.textContent = "$" + cartSumTotalPrice(localStorageList)
    
    amountTotalCart.textContent = cartQtyTotalCount(localStorageList)


      
      break;

    //
    case 'decrease':
    
    if(localStorageList.length === 1 && amount === 1){

      hrefToCheckout.href = ""
      cardWrapper.innerHTML = ""

      localStorage.clear("movieitem");
      cartContainer.innerHTML = "Your cart is empty";

      totalPriceCart.textContent = "$" + 0
      amountTotalCart.textContent = 0 

      return

    }

    if(amount === 1){

      cardWrapper.innerHTML = ""

      const filterOut = localStorageList.filter(movie => movie.title !== title)

      console.log(filterOut)

      localStorageList = filterOut

      localStorage.setItem("movieitem", JSON.stringify(localStorageList))

      const html = createCartItem(localStorageList)

      cartContainer.appendChild(html)

      totalPriceCart.textContent = "$" + cartSumTotalPrice(localStorageList)
      amountTotalCart.textContent = cartQtyTotalCount(localStorageList)


      return 

    }

      console.log("log222")

      cardWrapper.innerHTML = ""

      let findIndex = localStorageList.findIndex(movie => movie.title === title)

      localStorageList[findIndex].quantity--

      localStorage.setItem("movieitem", JSON.stringify(localStorageList))

      let html = createCartItem(localStorageList)

      cartContainer.appendChild(html)

      totalPriceCart.textContent = "$" + cartSumTotalPrice(localStorageList)
      amountTotalCart.textContent = cartQtyTotalCount(localStorageList)

      break;   
  }  
}

function deleteFromCart(event){

  cardWrapper.innerHTML = ""

  const title = event.target.dataset.title

  if(localStorageList.length === 1){

    hrefToCheckout.href = ""
    cardWrapper.innerHTML = ""

    localStorage.clear("movieitem");
    
    cartContainer.innerHTML = "Your cart is empty";

    totalPriceCart.textContent = "$" + 0
    amountTotalCart.textContent = 0

    return
  }

  const removeOne = localStorageList.filter(obj => obj.title !== title)

  localStorageList = removeOne

  localStorage.setItem("movieitem", JSON.stringify(localStorageList))

  let HTML = createCartItem(localStorageList)

  cartContainer.appendChild(HTML)

  totalPriceCart.textContent = "$" + cartSumTotalPrice(localStorageList)
  amountTotalCart.textContent = cartQtyTotalCount(localStorageList)

}