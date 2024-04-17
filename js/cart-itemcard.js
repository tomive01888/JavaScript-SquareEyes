
const cardWrapper = document.createElement("div")
cardWrapper.classList.add("innerWrapper")


export function createCartItem(arr){   

    if(arr.length > 0){
    
      for(let i = 0; i < arr.length; i++){ 
        
        const movieWrapper = document.createElement("div")
        movieWrapper.classList.add('single-product');
    
        //
        const containerFirst = document.createElement("div")
        containerFirst.classList.add('contFirst');
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
        containerSecond.classList.add('contSecond');
        movieWrapper.appendChild(containerSecond)    
        
        //
        const quantityWrapper = document.createElement("div")
        quantityWrapper.classList.add('quantitywrapper')
        containerSecond.appendChild(quantityWrapper);
    
        const buttonMinus = document.createElement("button")
        buttonMinus.classList.add('minus')
        buttonMinus.textContent = "-"
        quantityWrapper.appendChild(buttonMinus)    
    
        const movieQnty = document.createElement("p")
        movieQnty.textContent = arr[i].quantity
        movieQnty.dataset.quantity = arr[i].quantity
        movieQnty.dataset.title = arr[i].title
        quantityWrapper.appendChild(movieQnty)
    
        const buttonPlus = document.createElement("button")
        buttonPlus.classList.add('plus')
        buttonPlus.textContent = "+"
        quantityWrapper.appendChild(buttonPlus);
    
        //
        const moviePrice = document.createElement("p")
        moviePrice.textContent = "$" + arr[i].price * arr[i].quantity
        moviePrice.classList.add('price');    
        containerSecond.appendChild(moviePrice)
    
        const movieRemoveAll = document.createElement("button")
        movieRemoveAll.classList.add('remove-from-cart')
        movieRemoveAll.textContent = "X"
        movieRemoveAll.dataset.target = arr[i].title    
        containerSecond.appendChild(movieRemoveAll)  ;
    
        cardWrapper.appendChild(movieWrapper)
    
        
      };

      return cardWrapper
    
    }else{

        return []
    }
}