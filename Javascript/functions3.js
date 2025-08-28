const squareNumbers = (arr) => {
  return arr.map(num => num * num);
}
console.log(squareNumbers([1, 2, 3, 4]));

const filterEvenNumbers = (arr) => {
  return arr.filter((number) => number % 2 === 0)
}
console.log(filterEvenNumbers([1, 2, 3, 4, 5, 6, 7]))

const sumPositiveNumbers = (arr) => {
  let positives = arr.filter((number) => number >= 0)
  return positives.reduce((acc, curr) => acc + curr, 0)
}
console.log(sumPositiveNumbers([-1, 2, -3, 4, 5, -6, 7]))
