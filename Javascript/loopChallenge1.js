let teas = ["green", "black", "herbal", "chai", "oolong", "gunpowder"];
let selectedTeas = [];
let i = 0;

while (teas[i] != "chai") {
  selectedTeas.push(teas[i]);
  i++;
}

console.log(selectedTeas);
