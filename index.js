const searchBox = document.getElementById("search-box");
const searchResultContainer = document.getElementById(
  "search-result-container"
);

let timeoutId;

async function fetchProductsData(searchKeyword) {
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${searchKeyword}`
  );
  return await response.json();
}

function addSuggestion(title) {
  searchResultContainer.insertAdjacentHTML(
    "beforeend",
    `
    <span>${title}<span/><br>
    `
  );
}

async function showSuggestion(searchKeyword) {
  const { products } = await fetchProductsData(searchKeyword);
  searchResultContainer.innerHTML = "";
  products.forEach((product) => {
    addSuggestion(product.title);
  });
}

searchBox.addEventListener("keyup", async () => {
  const searchKeyword = searchBox.value.trim();
  if (searchKeyword === "") {
    return;
  }
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    showSuggestion(searchKeyword);
  }, 1000);
});
