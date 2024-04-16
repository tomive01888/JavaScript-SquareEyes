
// const baseURL = "https://v2.api.noroff.dev/"

// const tokenurl = "auth/create-api-key"

// const loginUrl = "auth/login"

// export async function getToken() {

//     const req = await fetch(baseURL + loginUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: "first.last@stud.noroff.no",
//         password: "UzI1NiIsInR5cCI"})
//       });      
    
//     const result = await req.json()  

//     const token = result.data.accessToken

//     return token
//   } 

//   export async function getApiKey() {

//     const token = await getToken()

//     const options = {
//         method : "POST",
//         headers: {
//             Authorization: `Bearer ${token}`           
//           }
//     }
    
//     const req = await fetch(baseURL + tokenurl, options)  
  
//     const result = await req.json()

//     return result.data.key   
//   }