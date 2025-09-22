const person = {
  name: "Alice",
  greet: function() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

person.greet();
// It's gonna say Alice because this refers to the object that called the method, which is 'person'

const greetFunction = person.greet;
greetFunction();
// It's gonna log without 'this.name' because 'this' refers to the global object (or undefined in strict mode), which is an object that doesn't have a 'name' property. The global object is 'window' in browsers and 'global' in Node.js.

const boundGreetFunction = greetFunction.bind(person);
boundGreetFunction();
// It's gonna say Alice because we bound 'this' to the 'person' object

const johnGreetFunction = person.greet.bind({ name: "John" });
johnGreetFunction();
// It's gonna say John because we bound 'this' to a new object with name 'John'
