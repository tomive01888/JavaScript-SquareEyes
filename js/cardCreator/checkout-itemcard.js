import { cartTotalQty, cartTotalPrice } from "../Uilities/cart-counting.js";
import { getFromStorage } from "../Uilities/localstorage.js";

let localStorageList = getFromStorage("movieitem");

let cartContainer = document.querySelector(".created-itemlist");
const totalPriceCart = document.querySelector(".total-price");
const amountTotalCart = document.querySelector(".amount-incart");
const hrefToCheckout = document.querySelector(".go-to-check");
const purchaseBtn = document.getElementById("purchased");


const localListWrapper = document.createElement("div");
localListWrapper.classList.add('localListWrapper');
cartContainer.appendChild(localListWrapper);

export function createCartItem(arr) {
    localListWrapper.innerHTML = "";

    if (arr.length === 0) {
        return [];
    }

    for (let i = 0; i < arr.length; i++) {
        const movieWrapper = document.createElement("div");
        movieWrapper.classList.add('single-product');
        localListWrapper.appendChild(movieWrapper);

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

        const containerSecond = document.createElement("div");
        containerSecond.classList.add('rightContainer');
        movieWrapper.appendChild(containerSecond);

        const quantityWrapper = document.createElement("div");
        quantityWrapper.classList.add('qtyContainer');
        containerSecond.appendChild(quantityWrapper);

        const buttonMinus = document.createElement("button");
        buttonMinus.classList.add('minus');
        buttonMinus.type = "button"
        buttonMinus.textContent = "-";
        buttonMinus.dataset.action = 'decrease';
        buttonMinus.dataset.title = arr[i].title;
        quantityWrapper.appendChild(buttonMinus);

        const movieQnty = document.createElement("p");
        movieQnty.textContent = arr[i].quantity;
        movieQnty.dataset.quantity = arr[i].quantity;
        movieQnty.dataset.title = arr[i].title;
        quantityWrapper.appendChild(movieQnty);

        const buttonPlus = document.createElement("button");
        buttonPlus.classList.add('plus');
        buttonPlus.type = "button"
        buttonPlus.textContent = "+";
        buttonPlus.dataset.action = 'increase';
        buttonPlus.dataset.title = arr[i].title;
        quantityWrapper.appendChild(buttonPlus);

        const moviePrice = document.createElement("p");
        moviePrice.textContent = "$" + Math.round(arr[i].price * arr[i].quantity * 100) / 100;
        moviePrice.classList.add('price');
        containerSecond.appendChild(moviePrice);

        const movieRemoveAll = document.createElement("button");
        movieRemoveAll.classList.add('remove-from-cart');
        movieRemoveAll.type = "button"
        movieRemoveAll.textContent = "X";
        movieRemoveAll.dataset.title = arr[i].title;
        containerSecond.appendChild(movieRemoveAll);
    }

    return localListWrapper;
}

//////// Using event listener to run function cartAddOrRemove, depending on the identifier of class.
//////// Meaning if the element has class containing the word 'minus' or 'plus' it activates the function.
//////// Same goes for 'remove-from-cart'. 

localListWrapper.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('minus') || target.classList.contains('plus')) {
        cartAddOrRemove(event);
    } else if (target.classList.contains('remove-from-cart')) {
        deleteFromCart(event);
    }
});

//////// Updates the cart value and total sum of cart.

function updateCart() {
    if (localStorageList.length === 0) {
        hrefToCheckout.href = "";
        cartContainer.innerHTML = "<p class='empty'>It seems your cart is empty</p>";
        purchaseBtn.style.display = "none";
    } else {

        let html = createCartItem(localStorageList);
        cartContainer.innerHTML = "";
        cartContainer.appendChild(html);
    }

    totalPriceCart.textContent = "$" + cartTotalPrice(localStorageList);
    amountTotalCart.textContent = cartTotalQty(localStorageList);
}

////// Add or Remove qty of clicked item. Contains IF if item is reaching only 1 left.
////// by using nested IF or ELSE, I can achieve increasing quantity according to actionType, 
////// which relates back to when element is created above. 'Decrease' or 'Increase'

function cartAddOrRemove(event) {
    const target = event.target;
    const actionType = target.dataset.action;
    const title = target.dataset.title;
    const itemIndex = localStorageList.findIndex(movie => movie.title === title);
    const currentItem = localStorageList[itemIndex];

    if (actionType === 'increase') {
        currentItem.quantity++;
    } else if (actionType === 'decrease') {
        if (currentItem.quantity === 1) {
            localStorageList.splice(itemIndex, 1);            
            cartContainer.innerHTML = "<p class='empty'>It seems your cart is empty</p>";
        } else {            
            currentItem.quantity--;
        }
    }

    localStorage.setItem("movieitem", JSON.stringify(localStorageList));

    updateCart()
}

////// The function that removes the item entirely without care if it's 1 or 10 inside of it.

function deleteFromCart(event) {

    const title = event.target.dataset.title;

    const removeOne = localStorageList.filter(obj => obj.title !== title);
    localStorageList = removeOne;
    localStorage.setItem("movieitem", JSON.stringify(localStorageList));

    if (localStorageList.length === 0) {
        hrefToCheckout.href = "";
        cartContainer.innerHTML = "<p class='empty'>It seems your cart is empty</p>";
    } else {
        let html = createCartItem(localStorageList);
        cartContainer.innerHTML = "";
        cartContainer.appendChild(html);
    }
    updateCart()
}
