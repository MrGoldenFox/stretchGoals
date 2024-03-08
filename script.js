import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://stretchgoals-9aa81-default-rtdb.europe-west1.firebasedatabase.app/"
}

const btnEl = document.getElementById("btn-el")
const ulEl = document.getElementById("ul-el")
const inputEl = document.getElementById("input-el")

const app = initializeApp(appSettings)
const database = getDatabase(app)
const goalsInDB = ref(database, "list")

onValue(goalsInDB, function(snapshot){

    let itemsArray = Object.values(snapshot.val())

    ulEl.innerHTML = ''

    for (let i = itemsArray.length - 1; i >= 0; i--) {
        let currentItemValue = itemsArray[i];
        generateIl(currentItemValue);
    }
})

btnEl.addEventListener("click", function(){
    push(goalsInDB, inputEl.value)
})

function generateIl(text){
    ulEl.innerHTML += `<li>
                        ${text}
                      </li>
    `
    inputEl.value = ''
}
