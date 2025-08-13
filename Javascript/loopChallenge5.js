let citiesPopulation = {"London": 8900000, "New York": 8400000, "Paris": 2200000, "Berlin": 3500000, "Tokyo": 14000000, "Sydney": 5000000};
let cityPopulations = {}

for (const city in citiesPopulation) {
  if (city !== "Berlin")
  cityPopulations[city] = citiesPopulation[city]
  if (city == "Berlin") break

}

console.log(Object.values(cityPopulations))
console.log(Object.keys(cityPopulations))
