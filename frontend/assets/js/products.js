const searchTypesSel = document.querySelector("#searchTypes");
const categoriesSel = document.querySelector("#categories");

searchTypesSel.addEventListener("change", (e) => {
  if (e.target.value === "categories") {
    categoriesSel.classList.remove("d-none");
  } else {
    categoriesSel.classList.add("d-none");
  }
  if (e.target.value === "all") {
    populateProducts();
  }
});

categoriesSel.addEventListener("change", (e) => {
  const chosenCategory = e.target.value;
  removeProducts();
  populateProducts(chosenCategory);
});

function populateCategories() {
  fetch("http://localhost:8081/api/categories")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((category) => {
        categoriesSel.innerHTML += `<option value="${category.categoryId}">${category.name} : ${category.description}</option>`;
      });
    });
}

function removeProducts() {
  const products = document.querySelector("#products");
  while (products.firstChild) {
    products.removeChild(products.firstChild);
  }
}

function populateProducts(chosenCategory) {
  if (chosenCategory) {
    fetch("http://localhost:8081/api/products")
      .then((response) => response.json())
      .then((allProducts) => {
        let filteredProducts = allProducts.filter(
          (product) => product.categoryId == chosenCategory
        );
        populate(
          filteredProducts.sort((a, b) =>
            a.productName.localeCompare(b.productName)
          )
        );
      });
    populate();
  } else {
    fetch("http://localhost:8081/api/products")
      .then((response) => response.json())
      .then((allProducts) => {
        populate(
          allProducts.sort((a, b) => a.productName.localeCompare(b.productName))
        );
      });
  }
  function populate(choosenProducts) {
    choosenProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-4", "col-xl-3");
      productCard.innerHTML = generateCard(product);
      document.querySelector("#products").appendChild(productCard);
    });
  }
}

const generateCard = (product) =>
  `
            <div class="card h-100 shadow-sm">
                <h5 class="card-header">${product.productName}</h5>
                <div class="card-body">
                    <div class="">$${Number(product.unitPrice).toFixed(2)}</div>
                    <div class="">${product.unitsInStock} units in stock</div>
                </div>
                <div class="card-footer p-2">
                    <div class="input-group ">
                        <a href="#" class="col-8 btn-sm btn btn-danger"> + add</a>
                        <a href="#" class="col btn btn-outline-secondary btn-sm">?</a>
                    </div>
                </div>
            </div>
        `;

populateCategories();
populateProducts();
