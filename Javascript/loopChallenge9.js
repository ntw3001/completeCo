let numbers = [2, 5, 7, 9]
let doubledNumbers = []

for (let i=0; i<numbers.length; i++) {
  if (numbers[i] !== 7)
    newNumber = numbers[i] * 2
  if (newNumber)
    doubledNumbers.push(newNumber)
    newNumber = null;
}

console.log(doubledNumbers)
