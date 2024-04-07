// async function getMovieFolder() {
    
//     const apiKey = await getApiKey()
//     const token = await getToken()

//     const options = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "X-Noroff-API-Key": apiKey
//         }
//       }
    
//   const req = await fetch(baseURL + moviesEndpoint, options)

//   const result = await req.json()

//   for (let i = 0; i < result.data.length; i++){
//     moviesContainer.innerHTML += `<a class="movies-card" href="/html/product.html?movieid=${result.data[i].id}">

//                         <div class="flex-sale">
//                           <p class="${result.data[i].onSale ? "on-sale" : ""}">${result.data[i].onSale ? result.data[i].price : ""}</p>
//                           <p class="current-price">$ ${result.data[i].onSale ? result.data[i].discountedPrice : result.data[i].price} </p>
//                         </div>

//                         <img src="${result.data[i].image.url}" alt="${result.data[i].title}"/>
//                         <p>${result.data[i].title}</p>

//                         <div>
//                           <p>button</p>
//                           <p>price</p>
//                         </div>
                    
//                         <img src="" alt="">
                    
//                         <h3>title of jacket</h3>

//                       </a>`
//   }

//    console.log(result)


// }

// getMovieFolder()


//Lag en funksjon som legger sammen to tall og som vil console.logge summen av begge tallene

function addNumbers(a, b){  
    console.log(a, b)
  
  }
  
  addNumbers(1, 2)
  
  
  
  //Lag en funksjon som tar et parameter
  //lag en variabel som legger sammen strengen "du skrev:" + parameter
  //console.log variabelen
  
  function addText(writtenText){
  
    const string = "du skrev:" + writtenText
  
  
    console.log(string)
  }
  
  addText("Shaman suger")
  
  //lag en funksjon som tar 2 parametere, a og b
  //funksjonen skal returnere a ganget med b
  //kall på funksjonen og assign den til en variabel kalt "multiplyNumber"
  //til slutt console.log variabelen
  
  function multiplyNumber(a, b, c, d){
      return a*b*c*d
  
  }
  
  const nmb = multiplyNumber(5, 7, 5, 7)
  
  console.log(nmb)
  
  //lag en funksjon som tar et parameter (skal være et tall)
  //lag en IF sjekk om tallet er mindre enn 10
  //og hvis tallet er  mindre enn 10, console.log strengen "tallet er mindre enn 10"
  //hvis ikke console.log "tallet ditt er høyere enn 10"
  
  //hvordan lage en sjekk med if statement
  function checkIfNumIsSmallerThan(a){
  
    if( a * 10 === 100 ){
      //gjør noe
      console.log("tallet er mindre enn 10")
    } else{
      //gjør noe annet
      console.log("tallet ditt er høyere enn 10")
  
    }
  }
  
  checkIfNumIsSmallerThan(10)
  
  