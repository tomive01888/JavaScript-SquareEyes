export function createHTML(movie) {  

    let html = `<a class="movies-card" href="/product/index.html?movieid=${movie.id}">
             ${movie.favorite ? "<span class='trending'> Trending </span>" : ""}
             <div class="flex-sale">
               <p class="${movie.onSale ? "on-sale" : ""}">${movie.onSale ? movie.price : ""}</p>
               <p class="current-price">$ ${movie.onSale ? movie.discountedPrice : movie.price} </p>
             </div>
 
             <img src="${movie.image.url}" alt="${movie.title}"/>
             <p class="title">${movie.title}</p>
             ${movie.favorite ? `<div class='ribbon'>Favorite</div>` : ""}
     </a>`
 
     return html
 }


 export function createSmallCard(movie) {  

    let html = `<a class="smallcard" href="/product/index.html?movieid=${movie.id}"> 
             <img src="${movie.image.url}" alt="${movie.title}"/>
     </a>`
 
     return html
 }