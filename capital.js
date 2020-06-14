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
      user: JSON.parse(localStorage.getItem("currentuser")),
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

  updateDOM();
}

function updateDOM(providedData = capitals) {
  // clear the main div

  table.innerHTML = `<thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Description</th>
        <th scope="col">Preview</th>
        <th scope="col">Amount</th>
        <th scope="col">Status</th>
      </tr>
    </thead>`;

  providedData.forEach((item, i) => {
    let currentuser = JSON.parse(window.localStorage.getItem("currentuser"));

    console.log(currentuser, item);
    if (currentuser.id === item.user.id) {
      const element = document.createElement("tr");
      element.innerHTML = `
  
    
    <td>${item.date}</td>
    <td>${item.documentDescription}</td>
    <td><a href="#">Preview</td>
    <td>${item.amount}</td>
    <td>Pending</td>

    `;
      table.appendChild(element);
    }
  });
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

// *****************PDF js work**********************//
// will hold the PDF handle returned by PDF.JS API
var _PDF_DOC;

// PDF.JS renders PDF in a <canvas> element
var _CANVAS = document.querySelector("#pdf-preview");

// will hold object url of chosen PDF
var _OBJECT_URL;

// load the PDF
function showPDF(pdf_url) {
  PDFJS.getDocument({ url: pdf_url })
    .then(function (pdf_doc) {
      _PDF_DOC = pdf_doc;

      // show the first page of PDF
      showPage(1);

      // destroy previous object url
      URL.revokeObjectURL(_OBJECT_URL);
    })
    .catch(function (error) {
      // error reason
      alert(error.message);
    });
}

// show page of PDF
function showPage(page_no) {
  _PDF_DOC.getPage(page_no).then(function (page) {
    // set the scale of viewport
    var scale_required = _CANVAS.width / page.getViewport(1).width;

    // get viewport of the page at required scale
    var viewport = page.getViewport(scale_required);

    // set canvas height
    _CANVAS.height = viewport.height;

    var renderContext = {
      canvasContext: _CANVAS.getContext("2d"),
      viewport: viewport,
    };

    // render the page contents in the canvas
    page.render(renderContext).then(function () {
      document.querySelector("#pdf-preview").style.display = "inline-block";
      document.querySelector("#pdf-loader").style.display = "none";
    });
  });
}

/* showing upload file dialog */
document.querySelector("#upload-dialog").addEventListener("click", function () {
  document.querySelector("#pdf-file").click();
});

/* when users selects a file */
document.querySelector("#pdf-file").addEventListener("change", function () {
  // user selected PDF
  var file = this.files[0];

  // allowed MIME types
  var mime_types = ["application/pdf"];

  // validate whether PDF
  if (mime_types.indexOf(file.type) == -1) {
    alert("Error : Incorrect file type");
    return;
  }

  // validate file size
  if (file.size > 10 * 1024 * 1024) {
    alert("Error : Exceeded size 10MB");
    return;
  }

  // validation is successful

  // hide upload dialog
  document.querySelector("#upload-dialog").style.display = "none";

  // show the PDF preview loader
  document.querySelector("#pdf-loader").style.display = "inline-block";

  // object url of PDF
  _OBJECT_URL = URL.createObjectURL(file);

  // send the object url of the pdf to the PDF preview function
  showPDF(_OBJECT_URL);
});

//
// Init app
function init() {
  tbody.innerHTML = "";

  capitals.forEach(addCapitalToDOM);
}

init();

form.addEventListener("submit", addCapital);
