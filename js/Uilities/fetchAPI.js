const baseURL = "https://v2.api.noroff.dev/square-eyes/";

export async function getMovies() {
  try {
    showLoader();
    const response = await fetch(baseURL);
    await delay(800);

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(`${errorData.statusCode}: ${errorData.status}. ${errorData.errors[0].message}`);
      error.response = response;
      throw error;
    }

    const result = await response.json();
    hideLoader();
    return { movies: result, error: false };
  } catch (error) {
    hideLoader();
    console.error("What went wrong?", error);
  }
}

function showLoader() {
  const loader = document.querySelector("#loader");
  loader.style.display = "inline-flex";
}

function hideLoader() {
  const loader = document.querySelector("#loader");
  loader.style.display = "none";
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
