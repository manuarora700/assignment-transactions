const formLogin = document.getElementById("form-login");

function redirect() {
  window.location = "/transactions.html";
}

const localStorageUsers = JSON.parse(localStorage.getItem("users"));

let users = localStorage.getItem("users") !== null ? localStorageUsers : [];

function updateLocalStorage() {
  localStorage.setItem("users", JSON.stringify(users));
}

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let flag = true;

  users.forEach((item, i) => {
    if (item.email === email && item.password === password) {
      const currentUser = localStorage.setItem(
        "currentuser",
        JSON.stringify(item)
      );
      flag = false;
      return redirect();
    }
  });

  if (flag) alert("Email or password is incorrect");
  // sessionStorage.setItem("login", `{email: ${email}, password: ${password}`);
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

formLogin.addEventListener("submit", function (e) {
  e.preventDefault();

  login();
});
