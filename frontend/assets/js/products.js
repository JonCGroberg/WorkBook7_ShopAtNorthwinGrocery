const searchTypesSel = document.querySelector("#searchTypes");
const categoriesSel = document.querySelector("#categories");

searchTypesSel.addEventListener("change", (e) => {
  if (e.target.value === "categories") {
    categoriesSel.classList.remove("d-none");
  } else {
    categoriesSel.classList.add("d-none");
  }
});
categoriesSel.addEventListener("change", (e) => {
  console.log(e.target.value);
});

function loadCategories() {
  fetch("http://localhost:8081/api/categories")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((category) => {
        categoriesSel.appendChild(new Option(category.name));
      });
    });
}

loadCategories();
