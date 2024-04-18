export function cartQtyTotalCount(arr){

  // replace with array from localStorage =>>>>    const arr = [23, 34, 77, 99, 324];
  let qty = 0;
  for (let i = 0; i < arr.length; i++) {
   
    qty += arr[i].quantity;
  
  } 

  return qty
}


export function cartSumTotalPrice(arr){  

  // replace with array from localStorage =>>>>    const arr = [23, 34, 77, 99, 324];
    let sum = 0;    
  
    for (let i = 0; i < arr.length; i++) {
  
      sum += arr[i].quantity * arr[i].price;
  
    }
  
 return Math.round(sum*100)/100
}