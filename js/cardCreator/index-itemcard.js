export function createHTML(movie) {  

    let html = `<a class="movies-card" href="./product/index.html?movieid=${movie.id}">
                  <div class="flex-sale">
                    <p class="${movie.onSale ? "on-sale" : ""}">${movie.onSale ? movie.price : ""}</p>
                    <p class="current-price">$ ${movie.onSale ? movie.discountedPrice : movie.price} </p>
                  </div>
      
                  <img src="${movie.image.url}" alt="${movie.title}"/>
                  <h2 class="title">${movie.title}</h2>
                  ${movie.onSale ? `<div class='ribbon'>%</div>` : ""}                  
                </a>`

     return html
 }


 export function createSmallCard(movie) {  

    let html = `<a class="smallcard" href="./index.html?movieid=${movie.id}"> 
                  <img src="${movie.image.url}" alt="${movie.title}"/>
                </a>`
 
     return html
 }