const balance = document.getElementById("balance");
const table = document.getElementById("table");
const form = document.getElementById("form");
const to = document.getElementById("to");
const from = document.getElementById("from");
const amount = document.getElementById("amount");
const tbody = document.getElementById("tbody");
const mode = document.getElementById("mode");
// const sortBtn = document.getElementById("sort");
// const filterBtn = document.getElementById("filterBtn");
const filterChoice = document.getElementById("filterChoice");
const sortChoice = document.getElementById("sortChoice");

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (
    to.value.trim() === "" ||
    from.value.trim() === "" ||
    amount.value.trim() === ""
  ) {
    alert("Please add a to, from and amount");
  } else {
    const date = new Date(Date.now());
    date.toString();
    const transaction = {
      id: generateID(),
      to: to.value,
      from: from.value,
      amount: +amount.value,
      mode: mode.value,
      date: date,
      user: JSON.parse(localStorage.getItem("currentuser")),
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    to.value = "";
    from.value = "";
    amount.value = "";
  }
}

// Update the balance, income and expense
function updateValues() {
  // const amounts = transactions.map((transaction) => transaction.amount);

  // const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  // const income = amounts
  //   .filter((item) => item > 0)
  //   .reduce((acc, item) => (acc += item), 0)
  //   .toFixed(2);

  // const expense = (
  //   amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
  //   -1
  // ).toFixed(2);
  let total = 0;
  let userBalance = 1000000;
  let currentUserAmount = transactions.forEach((item) => {
    if (
      item.user.id === JSON.parse(window.localStorage.getItem("currentuser")).id
    ) {
      total = total + item.amount;
    }
  });
  console.log(total);

  balance.innerText = `$${userBalance - total}`;
  // money_plus.innerText = `$${income}`;
  // money_minus.innerText = `$${expense}`;
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  // const sign = transaction.amount < 0 ? "-" : "+";
  const length = transactions.length;

  const item = document.createElement("tr");
  const date = new Date(Date.now());
  date.toString();

  // Add class based on value
  // item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `
  
      
      <td>${transaction.date}</td>
      <td>${transaction.to}</td>
      <td>${transaction.mode}</td>
      <td>${transaction.amount}</td>
  
  `;
  // item.innerHTML = `
  //   ${transaction.text} <span>${sign}${Math.abs(
  //   transaction.amount
  // )}</span> <button class="delete-btn" onclick="removeTransaction(${
  //   transaction.id
  // })">x</button>
  // `;

  table.appendChild(item);
  updateDOM();
}
// Update DOM
function updateDOM(providedData = transactions) {
  // clear the main div

  table.innerHTML = `<thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">Date</th>
    <th scope="col">Beneficiary Name</th>
    <th scope="col">Payment mode</th>
    <th scope="col">Amount</th>
  </tr>
</thead>`;

  providedData.forEach((item, i) => {
    let currentuser = JSON.parse(window.localStorage.getItem("currentuser"));

    console.log(currentuser, item);
    if (currentuser.id === item.user.id) {
      const element = document.createElement("tr");
      element.innerHTML = `
  
    <th scope="row">${i + 1}</th>
    <td>${item.date}</td>
    <td>${item.to}</td>
    <td>${item.mode}</td>
    <td>${item.amount}</td>

    `;
      table.appendChild(element);
    }
  });
}
function sorterName(a, b) {
  if (a.to < b.to) {
    return -1;
  }
  if (a.to > b.to) {
    return 1;
  }
  return 0;
}

function sorterDate(a, b) {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
}

function sorterAmount(a, b) {
  if (a.amount < b.amount) {
    return -1;
  }
  if (a.amount > b.amount) {
    return 1;
  }
  return 0;
}
// Sort by name
function sortByChoice() {
  // console.log("Before sorting", transactions);
  if (sortChoice.value === "name") transactions.sort(sorterName);
  else if (sortChoice.value === "date") transactions.sort(sorterDate);
  else transactions.sort(sorterAmount);
  // console.log("After sorting", transactions);

  updateDOM();
}

// filter only Mode
function filterByMode() {
  transactions = transactions.filter(
    (transaction) => transaction.mode === filterChoice.value
  );

  updateDOM();
}
// Init app
function init() {
  tbody.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener("submit", addTransaction);
sortChoice.addEventListener("click", sortByChoice);
filterChoice.addEventListener("click", filterByMode);
