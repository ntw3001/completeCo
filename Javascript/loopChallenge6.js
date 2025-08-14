let worldCities = {
  Sydney: 5000000,
  Tokyo: 9000000,
  Berlin: 3500000,
  Paris: 2200000
}

let largeCities = {};

for (let city in worldCities) {
  if (worldCities[city] > 4000000) {
    largeCities[city] = worldCities[city];
  }
}

console.log(largeCities)
