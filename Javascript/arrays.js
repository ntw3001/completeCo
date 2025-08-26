function filterNumbers(arr) {
  const numbers = arr.filter(item => typeof item === "number");
  console.log(numbers);
  return numbers;
}

function reverseArray(arr) {
    arr.reverse()
    console.log(arr)
  return arr;
}

function findMax(arr) {
  const numbers = arr.filter(item => typeof item === "number");
  const max = Math.max(...numbers);
  console.log(max);
  return max;
}

function removeDuplicates(arr) {
    arr = [...new Set(arr)];
    console.log(arr)
  return arr;
}

function flattenArray(arr) {
    arr = arr.flat(Infinity);
    console.log(arr)
  return arr;
}

theArray = [1, "two", 3, null, 4, "five", 6, 7, "eight", 9, 10, 10, [11, 12], [[13]], [[[14]]]];

filterNumbers(theArray);
reverseArray(theArray);
findMax(theArray);
removeDuplicates(theArray);
flattenArray(theArray);
