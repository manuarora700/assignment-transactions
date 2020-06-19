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

  if (documentDescription.value.trim() === "" || amount.value.trim() === "") {
    showAlert("Please add document description / amount");
  } else {
    const date = new Date(Date.now());

    const capital = {
      id: generateID(),
      documentDescription: documentDescription.value,
      amount: amount.value,
      user: JSON.parse(localStorage.getItem("currentuser")),
      date: date,
      blob: _OBJECT_URL,
    };

    capitals.push(capital);
    addCapitalToDOM(capital);

    updateLocalStorage();

    documentDescription.value = "";
    amount.value = "";

    showAlertSuccess("Data updated successfully");
  }
}

function addCapitalToDOM(capital) {
  // Get sign -- implement later
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
      <td>${capital.amount}</td>
      <td>Pending</td>
  `;

  table.appendChild(item);

  updateDOM();
}

function updateDOM(providedData = capitals) {
  // clear the main div

  table.innerHTML = `<thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Description</th>
        <th scope="col">Amount</th>
        <th scope="col">Status</th>
      </tr>
    </thead>`;

  providedData.forEach((item, i) => {
    let currentuser = JSON.parse(window.localStorage.getItem("currentuser"));

    if (currentuser.id === item.user.id) {
      const element = document.createElement("tr");
      element.innerHTML = `
  
    
    <td>${item.date}</td>
    <td>${item.documentDescription}</td>
    <td>${item.amount}</td>
    <td>Pending</td>

    `;
      table.appendChild(element);
    }
  });
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

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

      // !UNDO IT
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
document.querySelector("#pdf-file").addEventListener("change", function (e) {
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

  // store blog in localStorage with current user
  // send the object url of the pdf to the PDF preview function -- but we'll show in submit button
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
