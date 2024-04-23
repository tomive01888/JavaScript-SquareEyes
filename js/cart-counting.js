export function cartQtyTotalCount(arr){

  let qty = 0;
  for (let i = 0; i < arr.length; i++) {
   
    qty += arr[i].quantity;
  
  } 

  return qty
}


export function cartSumTotalPrice(arr){  

    let sum = 0;    
  
    for (let i = 0; i < arr.length; i++) {
  
      sum += arr[i].quantity * arr[i].price;
  
    }
  
 return Math.round(sum*100)/100
}