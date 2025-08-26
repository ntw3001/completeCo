function sumOfN(n) {
    let sum = 0;
    for(let i=1; i <= n; i++) {
        sum = sum + i;
    }
  return sum;
}
console.log(sumOfN(5));

function printMultiplicationTable(n) {
    let table = []
    let item
    for (let i=1; i<=10; i++) {
        item = `${n} * ${i} = ${i*n}`
        table.push(item)
    }

  return table;
}
console.log(printMultiplicationTable(5));

function countVowels(str) {
  const vowels = "aeiouAEIOU"
  let count = 0;
  for(const char of str) {
    if(vowels.includes(char)) {
      count++;
    }
  }
  return count;
}
console.log(countVowels("Hello World"));
