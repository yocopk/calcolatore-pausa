function calculateTime() {
  const breakLength = document.getElementById("select-break-length").value;

  const currentTime = new Date();

  // Non vogliamo farci rubare circa mezzo minuto dalla pausa
  // quindi arrotondiamo al minuto dopo (grazie Luca "Iagan" Carturan)
  const secondsToRoundUp = 20;
  if (currentTime.getSeconds() >= secondsToRoundUp) {
    currentTime.setSeconds(currentTime.getSeconds() + secondsToRoundUp);
  }
  const futureTime = new Date(currentTime);
  futureTime.setMinutes(futureTime.getMinutes() + parseInt(breakLength));

  const options = { hour: "numeric", minute: "numeric" };

  document.getElementById("display-input-time").textContent =
    currentTime.toLocaleTimeString("it-IT", options);
  document.getElementById("display-future-time").textContent =
    futureTime.toLocaleTimeString("it-IT", options);
}

// FUNZIONE EDITING DEL TITOLO

var editingEnabled = false;
var originalTitle = "";

function enableEdit() {
  if (!editingEnabled) {
    var courseTitleElement = document.querySelector(".banner");

    originalTitle = courseTitleElement.innerText;
    document.getElementById("editInput").value = originalTitle;
    courseTitleElement.style.display = "none";
    document.getElementById("editInput").style.display = "inline-block";
    document.getElementById("saveButton").style.display = "inline-block";
    document.querySelector(".edit-title").style.display = "none";
    editingEnabled = true;
  }
}

function saveEdit() {
  var newTitle = document.getElementById("editInput").value;
  if (newTitle.trim() !== "") {
    var courseTitleElement = document.querySelector(".banner");
    courseTitleElement.innerText = newTitle;

    // Salva il nuovo titolo in localStorage
    localStorage.setItem("savedTitle", newTitle);
  }
  courseTitleElement.style.display = "inline-block";
  document.getElementById("editInput").style.display = "none";
  document.getElementById("saveButton").style.display = "none";
  document.querySelector(".edit-title").style.display = "inline-block";
  editingEnabled = false;
}

function resetDefault() {
  // Cancella i dati salvati in localStorage
  localStorage.removeItem("savedTitle");
  localStorage.removeItem("savedCode");

  // Ripristina il titolo originale
  var courseTitleElement = document.querySelector(".banner");
  courseTitleElement.innerText = originalTitle;

  var courseCodeElement = document.querySelector(".course-code");
  courseCodeElement.innerText = originalCode;
}

// FUNZIONE EDITING CODICE CORSO

var editingCodeEnabled = false;
var originalCode = "";

function enableEditCode(codeId, editInputId, saveButtonId) {
  if (!editingCodeEnabled) {
    originalCode = document.getElementById(codeId).innerText;
    document.getElementById(editInputId).value = originalCode;
    document.getElementById(codeId).style.display = "none";
    document.getElementById(editInputId).style.display = "inline-block";
    document.getElementById(saveButtonId).style.display = "inline-block";

    // Nascondi tutti gli elementi con la classe .edit-title
    var editTitleElements = document.querySelectorAll(".edit-title");
    for (var i = 0; i < editTitleElements.length; i++) {
      editTitleElements[i].style.display = "none";
    }

    editingCodeEnabled = true;
  }
}

function saveEditCode(codeId, editInputId, saveButtonId) {
  var newCode = document.getElementById(editInputId).value;
  if (newCode.trim() !== "") {
    document.getElementById(codeId).innerText = newCode;

    // Salva il nuovo codice in localStorage
    localStorage.setItem("savedCode", newCode);
  }
  document.getElementById(codeId).style.display = "inline-block";
  document.getElementById(editInputId).style.display = "none";
  document.getElementById(saveButtonId).style.display = "none";

  // Mostra tutti gli elementi con la classe .edit-title
  var editTitleElements = document.querySelectorAll(".edit-title");
  for (var i = 0; i < editTitleElements.length; i++) {
    editTitleElements[i].style.display = "inline-block";
  }

  editingCodeEnabled = false;
}

// Ripristina i valori salvati al caricamento della pagina
window.onload = function () {
  // Ripristina il titolo salvato
  var savedTitle = localStorage.getItem("savedTitle");
  if (savedTitle) {
    document.querySelector(".banner").innerText = savedTitle;
  }

  // Ripristina il codice salvato
  var savedCode = localStorage.getItem("savedCode");
  if (savedCode) {
    document.getElementById("courseCode").innerText = savedCode;
  }
};
