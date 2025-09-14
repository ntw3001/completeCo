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
