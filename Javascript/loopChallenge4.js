let teas = ["black", "chai", "green", "herbal", "cherry blossom", "lapsang souchong"]
let preferredTeas = [];

for (const tea of teas) {
  if (tea !== "herbal")
    preferredTeas.push(tea)
}

console.log(preferredTeas)
