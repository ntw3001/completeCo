// Closure example

// Outer sets a variable (counter), defines inner, and returns inner.
// Because inner has been returned and uses counter, the execution context of inner is not cleared when outer completes its task. The work environment thus preserved is the closure.
function outer () {
  let counter = 4;
  function inner() {
    counter++
    return counter
  }
  return inner
}

// When you assign let increment = outer();, you call outer once and store the returned inner function. Then, because inner has not been cleared, subsequent calls will refer to inner, using the same counter variable.
let increment = outer()
console.log(increment())
console.log(increment())
console.log(increment())
console.log(increment())
console.log(increment())
console.log(increment())

// A second variable calling outer will create a fresh version, so multiple instances of the counter can be run concurrently and will refer to different instances of inner.
let increment2 = outer()
console.log(increment2())
console.log(increment2())
