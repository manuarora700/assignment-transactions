let users = [
  {
    email: "manu@gmail.com",
    password: "manuarora",
  },
  {
    email: "arora@gmail.com",
    password: "aroramanu",
  },
  {
    email: "instahyre@gmail.com",
    password: "instahyre",
  },
];

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  redirect();
  // sessionStorage.setItem("login", `{email: ${email}, password: ${password}`);
}

function signup() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let passwordConfirm = document.getElementById("passwordConfirm").value;

  redirect();
}
