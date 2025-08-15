let myWorldCities = ["New York", "London", "Tokyo", "Berlin", "Sydney", "Cape Town"];
let travelledCities = []

myWorldCities.forEach(function(city) {
  if (city == "Berlin")
    return;
  travelledCities.push(city)
})

console.log(travelledCities)
