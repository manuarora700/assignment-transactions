function redirect() {
  window.location = "/views/transactions.html";
}

function logout() {
  localStorage.removeItem("currentuser");
  window.location = "/";
  showAlertSuccess("Logged out successfully");
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

const showAlertSuccess = (msg) => {
  hideAlert();

  const markup = `<div class="alert alert--success">${msg}</div> `;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);

  window.setTimeout(hideAlert, 5000);
};
