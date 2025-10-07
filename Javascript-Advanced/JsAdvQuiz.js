// function simulateAsyncTask() {
//   console.log("Task started")
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(console.log("Task finished"))
//     }, 2000)
//   })
// }
// simulateAsyncTask()

// function simulateMultipleTasks() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//         resolve(console.log("Task 1 finished")
//         )
//     }, 1000)
//         setTimeout(() => {
//         resolve(console.log("Task 2 finished")
//         )
//     }, 2000)
//         setTimeout(() => {
//         resolve(console.log("Task 3 finished")
//         )
//     }, 3000)
// })
// }
// simulateMultipleTasks()

// function fetchDataWithCallback(callback) {
//   setTimeout(() => {
//     const data = "Fetched data"
//     callback(data)
//   }, 2000)
// }
// fetchDataWithCallback(console.log)

// Create a function createCounter() that returns a function which increments and returns a counter value each time it is called.
// function createCounter() {
//   let counter = 0;
//   function increment() {
//     counter ++
//     return counter
//   }
//   return increment
// }

// Create a function rateLimiter(fn, limit) that returns a new function. The returned function allows calling fn only once within a limit time in milliseconds. If it is called again before the limit is reached, it should return "Rate limit exceeded".
// function rateLimiter(fn, limit) {
//   let available = true
//   return function (...args) {
//     if(!available) {
//       return "Rate limit exceeded"
//     }
//     available = false
//     setTimeout(() => {
//       available = true
//     }, limit)
//     return fn(...args)
//   }
// }

// Write a function memoize(fn) that returns a memoized version of fn. The memoized function should cache the results of function calls, and return the cached result if the same inputs are provided again.
// function memoize(fn) {
//   const cache = {}

//   return function (...args) {
//     const key = JSON.stringify(args)
//     if (key in cache) {
//       return cache[key]
//     }
//     const result = fn(...args)
//     cache[key] = result
//     return result
//   };
// }

// Task 1
// function Animal(name) {
//   this.name = name
// }

// Animal.prototype.makeSound = function() {
//   return "Animal sound"

// }
// function Dog(name) {
//   this.bark = function() {
//     return "Woof!"
//   }
// }
// Dog.prototype = Object.create(Animal.prototype)
// Dog.prototype.constructor = Dog

// // Task 2
// function Shape(color) {
//   this.color = color
//   this.getColor = function() {
//     return this.color
//   }
// }

// function Rectangle(width, height, color) {
//   Shape.call(this, color)
//   this.height = height
//   this.width = width
//   this.getArea = function() {
//     return (this.width * this.height)
//   }
// }

// Rectangle.prototype = Object.create(Shape.prototype)
// Rectangle.prototype.constructor = Rectangle

// // Task 1
// const person = {
//     name: "Alice",
//     introduce: function() {
//         return `Hi, my name is ${this.name}`
//     }
// };
// const boundIntroduce = person.introduce.bind(person)

// // Task 2
// function introduce() {
//     return `Hi, my name is ${this.name}`
// }
// const person1 = { name: "Bob" }
// const person2 = { name: "Carol" }
// introduce.call(person1)
// introduce.call(person2)

// // Task 3
// function sum(a, b) {
//     return a + b * this.factor
// }
// const double = { multiplier: 2 }
// const triple = { multiplier: 3 }
// sum.apply(double, [2, 3])
// sum.apply(triple, [2, 3])

// Task 1
function fetchUser() {
  return new Promise ((resolve) => {
    setTimeout(() => {
      resolve ("User data")
    }, 1000);
  })
}

function fetchPosts() {
  return new Promise ((resolve) => {
    setTimeout(() => {
      resolve ("Posts data")
    }, 1000);
  })
}

async function fetchAllData() {
    try {
    const results = await Promise.all([fetchUser(), fetchPosts()]);
    return results
  } catch (error) {
    return ["Error occurred"]
  }
}

// Task 2
function fetchSuccess() {
}

function fetchFailure() {
}

async function handlePromises() {
  try {
  } catch (error) {
  }
}

// Task 3
function fetchWithTimeout(promise, timeout) {
}

function fetchData() {
  return new Promise(resolve => setTimeout(() => resolve('Data fetched'), 3000));
}
