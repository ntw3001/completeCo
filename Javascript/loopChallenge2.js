let cities = ["London", "New York", "Paris", "Berlin"]
let newList = [];

for (let i=0; i < cities.length; i++) {
  if (cities[i] !== "Paris")
    newList.push(cities[i])
}

console.log(newList);
