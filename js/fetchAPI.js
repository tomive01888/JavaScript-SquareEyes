const baseURL = "https://v2.api.noroff.dev/square-eyes/"


export async function getMovies(){  
 
    try {

        showLoader();
        const req = await fetch(baseURL);

        await delay(1000);

        if (!req.ok) {

            throw new Error("Error fetching API");
        }

        const result = await req.json();

        hideLoader();

        return { movies: result, error: false };


    } catch (error) {

        hideLoader();

        return { movies: [], error: true, msg: error.message, status: 404 };
        
    }
}


function showLoader() {
    const loader = document.querySelector('#loader');
    loader.style.display = 'infline-flex';
}

function hideLoader() {
    const loader = document.querySelector('#loader');
    loader.style.display = 'none';
}

function delay(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));
}