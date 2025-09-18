const changeBtn = document.getElementById("changeTextButton")
changeBtn.addEventListener("click", function() {
  let parag = document.getElementById("my-paragraph")
  parag.textContent = "Wow you clicked it!"
})

const cityList = document.getElementById("citiesList")
const citiesBtn = document.getElementById("highlightFirstCity")
highlightFirstCity.addEventListener("click", function() {
  let topmostCity = citiesList.firstElementChild
  topmostCity.classList.add("highlight")
})

const coffeeList = document.getElementById("coffeeOrder")
const coffeeType = document.getElementById("coffeeType")
const changeCoffee = document.getElementById("changeOrder")
changeCoffee.addEventListener("click", function() {
  coffeeType.textContent = "Espresso"
})

const addItem = document.getElementById("addNewItem")
const shopList = document.getElementById("shopList")
addItem.addEventListener("click", function() {
  let newItem = document.createElement("li")
  newItem.textContent = "another 1"
  shopList.appendChild(newItem)
})

const removeItem = document.getElementById("removeLastItem")
const taskList = document.getElementById("taskList")
removeItem.addEventListener("click", function() {
  let lastItem = taskList.lastElementChild
  console.log(lastItem)
  taskList.removeChild(lastItem)
})

const disgraceText = document.getElementById("disgraceText")
const toggleVisibility = document.getElementById("toggleVisibility")
toggleVisibility.addEventListener("click", function() {
  if (disgraceText.textContent === "Fuck you!") {
    disgraceText.textContent = "Sorry about that"
    toggleVisibility.textContent = "Replace that disgrace"
  } else {
    disgraceText.textContent = "Fuck you!"
    toggleVisibility.textContent = "Remove this disgrace"
  }
})

const teaList = document.getElementById("teaList")

teaList.addEventListener("click", function(event) {
  if (event.target.classList.contains("teaItem")) {
    alert("You clicked on " + event.target.textContent);
  }
})

const wordForm = document.getElementById("wordForm")
const feedbackDisplay = document.getElementById("feedbackDisplay");

wordForm.addEventListener("submit", function(event) {
  event.preventDefault();
  feedbackDisplay.innerHTML = "";
  let input = document.getElementById("input");
  let newContent = document.createElement("li");
  newContent.textContent = `Your feedback says: ${input.value}. Wow!`;
  feedbackDisplay.appendChild(newContent);
  input.value = "";
});

const domStatus = document.getElementById("domStatus");
document.addEventListener("DOMContentLoaded", function() {
  domStatus.textContent = "The DOM has fully loaded!";
})

const descriptionText = document.getElementById("descriptionText");
const colourChange = document.getElementById("toggleColour");

colourChange.addEventListener("click", function() {
  for (const sheet of document.styleSheets) {
    for (const rule of sheet.cssRules) {
      if (rule.selectorText === ".colourchange") {
        rule.style.color = "red";
      }
    }
  }
})
