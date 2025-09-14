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
