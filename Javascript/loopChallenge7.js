let teas = ["earl grey", "green tea", "chai", "oolong tea"];
let availableTeas = [];
let gotChai = false

teas.forEach((tea) => {
  if (gotChai) return;
  if (tea === "chai") {
    gotChai = true;
    return
  }
    availableTeas.push(tea)
});

console.log(availableTeas)
