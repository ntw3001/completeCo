let numbers = [1, 2, 3, 4, 5]
let smallNumbers = []

for (const num of numbers) {
  if (num < 4)
  smallNumbers.push(num)
}

console.log (smallNumbers)
