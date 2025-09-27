// A generator is a special type of function that can pause and resume its execution.
// It is defined using the function* syntax and uses the yield keyword to produce a series of values.

// Each time the generator's next() method is called, it resumes execution until it reaches the next yield statement,
// at which point it pauses and returns the yielded value. The generator maintains its state between calls,
// allowing it to produce a sequence of values over time.
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
const gen2 = numberGenerator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

console.log(gen2.next()); // { value: 1, done: false }
console.log(gen2.next()); // { value: 2, done: false }
console.log(gen2.next()); // { value: 3, done: false }
console.log(gen2.next()); // { value: undefined, done: true }

//It might be useful to create an ID generator such as this
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}
