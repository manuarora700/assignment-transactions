const form = document.getElementById("form-signup");
const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("passwordConfirm");

const localStorageUsers = JSON.parse(localStorage.getItem("users"));

let users = localStorage.getItem("users") !== null ? localStorageUsers : [];

function updateLocalStorage() {
  localStorage.setItem("users", JSON.stringify(users));
}

function setCurrentUser() {}

// Redirection
function redirect() {
  window.location = "/login.html";
}
// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (msg) => {
  hideAlert();

  const markup = `<div class="alert alert--error">${msg}</div> `;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);

  window.setTimeout(hideAlert, 5000);
};

// Show success outline message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
// Check email is valid

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showAlert("Email is not valid");
  }
}

// check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showAlert(`${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// check input lengths
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showAlert(`${getFieldName(input)} must be atleast ${min} characters`);
  } else if (input.value.length > max) {
    showAlert(`${getFieldName(input)} must be atmost ${max} characters`);
  } else {
    showSuccess(input);
  }
}

// check passwords match

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showAlert("Passwords donot match");
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function signup() {
  if (
    name.value.trim() === "" ||
    email.value.trim() === "" ||
    password.value.trim() === "" ||
    password.value.trim() === ""
  ) {
    alert("Please add a to, from and amount");
  } else if (password.value.trim() !== passwordConfirm.value.trim()) {
    alert("Passwords donot match!");
  } else {
    console.log("Generating user now");
    const user = {
      id: generateID(),
      name: name.value,
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
    };

    users.push(user);

    updateLocalStorage();
  }

  redirect();
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([name, email, password, passwordConfirm]);
  checkLength(name, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, passwordConfirm);
  signup();
  // redirect();
});
