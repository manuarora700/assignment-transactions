let form = document.getElementById("form-upload");
let parentDiv = document.getElementById("result");
let documentDescription = document.getElementById("documentDescription");
let amount = document.getElementById("amount");
const table = document.getElementById("table");
const tbody = document.getElementById("tbody");

const localStorageCapitals = JSON.parse(localStorage.getItem("capitals"));

let capitals =
  localStorage.getItem("capitals") !== null ? localStorageCapitals : [];

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("capitals", JSON.stringify(capitals));
}

function addCapital(e) {
  e.preventDefault();

  if (
    documentDescription.value.trim() === "" ||
    amount.value.trim() === "" ||
    document.getElementById("image").files[0] === undefined
  ) {
    alert("Please add document description / amount");
  } else {
    const date = new Date(Date.now());
    const capital = {
      id: generateID(),
      documentDescription: documentDescription.value,
      amount: amount.value,

      date: date,
    };

    capitals.push(capital);

    addCapitalToDOM(capital);

    // updateValues();

    updateLocalStorage();

    documentDescription.value = "";
    amount.value = "";
  }
}

function addCapitalToDOM(capital) {
  // Get sign
  // const sign = transaction.amount < 0 ? "-" : "+";
  const length = capitals.length;

  const item = document.createElement("tr");
  const date = new Date(Date.now());
  date.toString();

  // Add class based on value
  // item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `
  
      
      <td>${capital.date}</td>
      <td>${capital.documentDescription}</td>
      <td><a href="#">Preview</a></td>
      <td>${capital.amount}</td>
      <td>Pending</td>
  `;
  // item.innerHTML = `
  //   ${transaction.text} <span>${sign}${Math.abs(
  //   transaction.amount
  // )}</span> <button class="delete-btn" onclick="removeTransaction(${
  //   transaction.id
  // })">x</button>
  // `;

  table.appendChild(item);
}

// function updateValues() {
//   const amounts = capitals.map((capital) => capital.amount);

//   const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

//   const income = amounts
//     .filter((item) => item > 0)
//     .reduce((acc, item) => (acc += item), 0)
//     .toFixed(2);

//   const expense = (
//     amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
//     -1
//   ).toFixed(2);

//   balance.innerText = `$${total}`;
//   // money_plus.innerText = `$${income}`;
//   // money_minus.innerText = `$${expense}`;
// }
// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let reader = new FileReader();

  let name = document.getElementById("image").files[0].name;
  console.log(name);

  reader.addEventListener("load", function () {
    if (this.result && localStorage) {
      window.localStorage.setItem(name, this.result);
      alert("image stored in local storage");
      parentDiv.innerHTML = ``;
      showImages();
    } else {
      alert("not successful");
    }
  });

  reader.readAsDataURL(document.getElementById("image").files[0]);
});

function showImages() {
  // for loop lagalena
  for (let i = 2; i < window.localStorage.length; i++) {
    // console.log(window.localStorage);
    // if (i === "transactions") continue;
    let res = window.localStorage.getItem(window.localStorage.key(i));

    let image = new Image();
    image.src = res;

    parentDiv.appendChild(image);
  }
}

showImages();

// Init app
function init() {
  tbody.innerHTML = "";

  capitals.forEach(addCapitalToDOM);
}

init();

form.addEventListener("submit", addCapital);
