import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://stretchgoals-9aa81-default-rtdb.europe-west1.firebasedatabase.app/",
};

const btnEl = document.getElementById("btn-el");
const ulEl = document.getElementById("ul-el");
const inputEl = document.getElementById("input-el");
const nameEl = document.getElementById("input-name-el");
const surnameEl = document.getElementById("input-surname-el");
const warn = document.getElementById("warn-el");

const app = initializeApp(appSettings);
const database = getDatabase(app);
const goalsInDB = ref(database, "list");

onValue(goalsInDB, function (snapshot) {
  let content = Object.values(snapshot.val(goalsInDB));

  ulEl.innerHTML = "";
  nameEl.innerHTML = "";
  surnameEl.innerHTML = "";

  for (let i = content.length - 1; i >= 0; i = i - 3) {
    let currentItemValue = content[i - 2];
    let currentName = content[i - 1];
    let currentSurname = content[i];
    generateContent(currentItemValue, currentName, currentSurname);
  }
});

btnEl.addEventListener("click", function () {
  if (surnameEl.value === "" || nameEl.value === "" || inputEl.value === "") {
    inputWarn();
  } else {
    push(goalsInDB, inputEl.value);
    push(goalsInDB, nameEl.value);
    push(goalsInDB, surnameEl.value);
    warn.innerHTML = "";
  }
});

function generateContent(text, name, surname) {
  ulEl.innerHTML += `<li>
    From: ${name} ${surname}<br>
    ${text}<br>
    </li>
    `;
  inputEl.value = "";
}

function inputWarn() {
  if ((surnameEl.value === "") & (nameEl.value === "")) {
    warn.innerHTML = `
                         <p>Please, enter your name and surname 😁<p>  
                         `;
  } else if (surnameEl.value === "") {
    warn.innerHTML = `
        <p>Please, enter your surname 😁<p>  
        `;
  } else if (nameEl.value === "") {
    warn.innerHTML = `
        <p>Please, enter your name 😁<p>  
        `;
  } else if (inputEl.value === "") {
    warn.innerHTML = `
        <p>Please, write your endorsement 😁<p>  
        `;
  }
}
