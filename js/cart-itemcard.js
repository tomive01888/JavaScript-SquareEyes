import { cartTotalQty, cartTotalPrice } from "./cart-counting.js";
import { getFromStorage } from "./localstorage.js";

let localStorageList = getFromStorage("movieitem")

let cartContainer = document.querySelector(".created-itemlist")
const totalPriceCart = document.querySelector(".total-price")
const amountTotalCart = document.querySelector(".amount-incart")
const hrefToCheckout = document.querySelector(".go-to-check")

amountTotalCart.textContent = "$" + cartTotalPrice(localStorageList)


const localListWrapper = document.createElement("div");
localListWrapper .classList.add('localListWrapper');
cartContainer.appendChild(localListWrapper);


export function createCartItem(arr){   

  localListWrapper.innerHTML = ""

    if(arr.length === 0){

      return []
    }

    if(arr.length > 0){
    
      for(let i = 0; i < arr.length; i++){ 
        
        const movieWrapper = document.createElement("div");
        movieWrapper.classList.add('single-product');
        localListWrapper.appendChild(movieWrapper);
    
        //
        const containerFirst = document.createElement("div");
        containerFirst.classList.add('leftContainer');
        movieWrapper.appendChild(containerFirst);
    
        const movieImage = document.createElement("img");
        movieImage.src = arr[i].image;
        movieImage.alt = arr[i].title;
        containerFirst.appendChild(movieImage);
    
        const movieTitle = document.createElement("p");
        movieTitle.textContent = arr[i].title;
        movieTitle.classList.add("title");
        containerFirst.appendChild(movieTitle);
        
        //
        const containerSecond = document.createElement("div");
        containerSecond.classList.add('rightContainer');
        movieWrapper.appendChild(containerSecond);  
        
        //
        const quantityWrapper = document.createElement("div");
        quantityWrapper.classList.add('qtyContainer');
        containerSecond.appendChild(quantityWrapper);
    
        const buttonMinus = document.createElement("button");
        buttonMinus.classList.add('minus');
        buttonMinus.textContent = "-";
        buttonMinus.dataset.action = 'decrease';
        quantityWrapper.appendChild(buttonMinus);
        buttonMinus.addEventListener("click", removeOneFromCart);    
    
        const movieQnty = document.createElement("p");
        movieQnty.textContent = arr[i].quantity;
        movieQnty.dataset.quantity = arr[i].quantity;
        movieQnty.dataset.title = arr[i].title;
        quantityWrapper.appendChild(movieQnty);
    
        const buttonPlus = document.createElement("button");
        buttonPlus.classList.add('plus');
        buttonPlus.textContent = "+";
        buttonPlus.dataset.action = 'increase';
        quantityWrapper.appendChild(buttonPlus);
        buttonPlus.addEventListener("click", removeOneFromCart);
    
        //
        const moviePrice = document.createElement("p");
        moviePrice.textContent = "$" + Math.round(arr[i].price * arr[i].quantity * 100) / 100;
        moviePrice.classList.add('price'); 
        containerSecond.appendChild(moviePrice);
    
        const movieRemoveAll = document.createElement("button");
        movieRemoveAll.classList.add('remove-from-cart');
        movieRemoveAll.textContent = "X";
        movieRemoveAll.dataset.title = arr[i].title; 
        containerSecond.appendChild(movieRemoveAll);
        movieRemoveAll.addEventListener('click', deleteFromCart);   
        
      };

      return localListWrapper;
    
    }else{

        return [];
    }
}

function removeOneFromCart(event){

  const actionType = event.target.dataset.action;

  const title = actionType === 'decrease' ? event.target.nextSibling.dataset.title : event.target.previousSibling.dataset.title;
  const amount = actionType === 'decrease' ? Number(event.target.nextSibling.dataset.quantity) : Number(event.target.previousSibling.dataset.quantity) ;
  switch (actionType) {
    case 'increase':

    localListWrapper.innerHTML = "";

    let findTitle = localStorageList.findIndex(movie => movie.title === title);

    localStorageList[findTitle].quantity++;

    localStorage.setItem("movieitem", JSON.stringify(localStorageList));

    let cartHtml = createCartItem(localStorageList);

    cartContainer.appendChild(cartHtml);
 

    totalPriceCart.textContent = "$" + cartTotalPrice(localStorageList);
    
    amountTotalCart.textContent = cartTotalQty(localStorageList);
      
      break;

    //
    case 'decrease':
    
    if(localStorageList.length === 1 && amount === 1){

      hrefToCheckout.href = "";
      localListWrapper.innerHTML = "";

      localStorage.clear("movieitem");
      cartContainer.innerHTML = "<p class='empty'>It seems your cart is empty</p>";

      totalPriceCart.textContent = "$" + 0;
      amountTotalCart.textContent = 0 ;

      return;

    }

    if(amount === 1){

      localListWrapper.innerHTML = "";

      const filterOut = localStorageList.filter(movie => movie.title !== title);

      localStorageList = filterOut;

      localStorage.setItem("movieitem", JSON.stringify(localStorageList));

      const html = createCartItem(localStorageList);

      cartContainer.appendChild(html);

      totalPriceCart.textContent = "$" + cartTotalPrice(localStorageList);

      amountTotalCart.textContent = cartTotalQty(localStorageList);

      return ;

    }

      localListWrapper.innerHTML = "";

      let findIndex = localStorageList.findIndex(movie => movie.title === title);

      localStorageList[findIndex].quantity--;

      localStorage.setItem("movieitem", JSON.stringify(localStorageList));

      let html = createCartItem(localStorageList);

      cartContainer.appendChild(html);

      totalPriceCart.textContent = "$" + cartTotalPrice(localStorageList);

      amountTotalCart.textContent = cartTotalQty(localStorageList);

      break;   
  }  
}

function deleteFromCart(event){

  localListWrapper.innerHTML = "";

  const title = event.target.dataset.title;

  if(localStorageList.length === 1){

    hrefToCheckout.href = "";
    cartContainer.innerHTML = "";

    localStorage.clear("movieitem");
    
    cartContainer.innerHTML = "<p class='empty'>It seems your cart is empty</p>";

    totalPriceCart.textContent = "$" + 0;

    amountTotalCart.textContent = 0;

    return
  }

  const removeOne = localStorageList.filter(obj => obj.title !== title);

  localStorageList = removeOne;

  localStorage.setItem("movieitem", JSON.stringify(localStorageList));

  // cartContainer.innerHTML = createCartItem(localStorageList);

  var HTML = createCartItem(localStorageList);

  cartContainer.appendChild(HTML);

  totalPriceCart.textContent = "$" + cartTotalPrice(localStorageList);

  amountTotalCart.textContent = cartTotalQty(localStorageList);

}