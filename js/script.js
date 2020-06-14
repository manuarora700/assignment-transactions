// const formLogin = document.getElementById("form-login");

function redirect() {
  window.location = "/views/transactions.html";
}

// const localStorageUsers = JSON.parse(localStorage.getItem("users"));

// let users = localStorage.getItem("users") !== null ? localStorageUsers : [];

// function updateLocalStorage() {
//   localStorage.setItem("users", JSON.stringify(users));
// }

// function login() {
//   let email = document.getElementById("email").value;
//   let password = document.getElementById("password").value;
//   let flag = true;

//   users.forEach((item, i) => {
//     if (item.email === email && item.password === password) {
//       const currentUser = localStorage.setItem(
//         "currentuser",
//         JSON.stringify(item)
//       );
//       flag = false;
//       return redirect();
//     }
//   });

//   if (flag) alert("Email or password is incorrect");
//   // sessionStorage.setItem("login", `{email: ${email}, password: ${password}`);
// }

function logout() {
  localStorage.removeItem("currentuser");
  window.location = "/";
}

// function signup() {
//   let name = document.getElementById("name");
//   let email = document.getElementById("email");
//   let password = document.getElementById("password");
//   let passwordConfirm = document.getElementById("passwordConfirm");

//   e.preventDefault();

//   if (
//     name.value.trim() === "" ||
//     email.value.trim() === "" ||
//     password.value.trim() === "" ||
//     password.value.trin() === ""
//   ) {
//     alert("Please add a to, from and amount");
//   } else if (password.value.trim() !== passwordConfirm.value.trim()) {
//     alert("Passwords donot match!");
//   } else {
//     const user = {
//       id: generateID(),
//       name: name.value,
//       email: email.value,
//       password: password.value,
//       passwordConfirm: passwordConfirm.value,
//     };

//     users.push(user);

//     updateLocalStorage();

//     name.value = "";
//     email.value = "";
//     password.value = "";
//     passwordConfirm.value = "";
//   }

//   redirect();
// }

// // Generate random ID
// function generateID() {
//   return Math.floor(Math.random() * 100000000);
// }

// formLogin.addEventListener("submit", function (e) {
//   e.preventDefault();

//   login();
// });
