const productNameInput = document.getElementById("productNameInput");
const productPriceInput = document.getElementById("productPriceInput");
const productCategoryInput = document.getElementById("productCategoryInput");
const productDescriptionInput = document.getElementById(
  "productDescriptionInput"
);

const updateBtnEl = document.getElementById("updateBtn");
const addProductBtnEl = document.getElementById("addProductBtn");

let currentIndex = 0;
let productsContainer;

function productsValues() {
  product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescriptionInput.value,
  };
}

if (localStorage.getItem("myProducts") != null) {
  productsContainer = JSON.parse(localStorage.getItem("myProducts"));
  displayProducts(productsContainer);
} else {
  productsContainer = [];
}

function addProduct() {
  // For Update
  if (addProductBtnEl.textContent === "UPDATE") {
    addProductBtnEl.textContent = "Add Product";
    addProductBtnEl.classList.replace("btn-warning", "btn-success");

    productsValues();
    productsContainer.splice(currentIndex, 1, product);
  } else {
    // For Add
    productsValues();
    productsContainer.push(product);
  }
  localStorage.setItem("myProducts", JSON.stringify(productsContainer));
  displayProducts(productsContainer);
  clearForm();
}

function clearForm() {
  productNameInput.value = productPriceInput.value = productCategoryInput.value = productDescriptionInput.value = "";
}

function displayProducts(list) {
  tableBox = ``;
  for (let i = 0; i < list.length; i++) {
    tableBox += `<tr class="text-center textColor">
    <td>${i}</td>
    <td>${list[i].name}</td>
    <td>${list[i].price}</td>
    <td>${list[i].category}</td>
    <td>${list[i].desc}</td>
    <td><button class="btn btn-warning" onclick="updateForm(${i})">Update</button></td>
    <td><button class="btn btn-danger" onclick="deletedProducts(${i})">Delete</button></td>
</tr>`;
  }
  document.getElementById("tableBody").innerHTML = tableBox;
}

function searchProducts(searchTerm) {
  const searchResult = [];
  for (let i = 0; i < productsContainer.length; i++) {
    if (
      productsContainer[i].name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) == true
    ) {
      searchResult.push(productsContainer[i]);
    }
  }
  displayProducts(searchResult);
}
// searchProducts(searchResult);

function deletedProducts(deletedIndex) {
  productsContainer.splice(deletedIndex, 1);
  localStorage.setItem("myProducts", JSON.stringify(productsContainer));
  displayProducts(productsContainer);
}

function updateForm(updatedIndex) {
  productNameInput.value = productsContainer[updatedIndex].name;
  productPriceInput.value = productsContainer[updatedIndex].price;
  productCategoryInput.value = productsContainer[updatedIndex].category;
  productDescriptionInput.value = productsContainer[updatedIndex].desc;

  addProductBtnEl.textContent = "UPDATE";
  addProductBtnEl.classList.replace("btn-success", "btn-warning");
  currentIndex = updatedIndex;
}

function validInput() {
  const regex = /^[A-Z]{1}[a-z]{3,9}[0-9]{0,}/;
  if (regex.test(productNameInput.value) == true) {
    productNameInput.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    productNameInput.classList.add("is-invalid");
    return false;
  }
}

//    /^[a-zA-Z]{2,9}[_]?[a-z]{1,9}[@]{1}(yahoo|gmail|hotmail)(.com|.info)$/        // Test for Emails
