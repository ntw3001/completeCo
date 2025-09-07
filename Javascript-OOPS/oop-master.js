let car = {
  make: "Toyota",
  model: "Camry",
  year: 2020,
  start: function () {
    return `${this.make} was first introduced in ${this.year} I think`
  }
}
console.log (car.start())

function Person(name, age, gender) {
  this.name = name
  this.age = age
  this.gender = gender
  if (this.gender == "male")
    this.pronoun = "he"
  else if (this.gender == "female")
    this.pronoun = "she"
  else
    this.pronoun = "they"
}

let john = new Person ("John", 20, "male")
let marc = new Person ("Marc", 38, "male")
let shannon = new Person ("Shannon", 24, "female")
let rondo = new Person ("Rondo", 25, "snakeself")

console.log (`I just met ${rondo.name}, ${
rondo.pronoun
}'${rondo.pronoun = "they" ? "re" : "s"} ${rondo.age}. Wow!`)

class Vehicle {
  constructor(make, model, year) {
    this.make = make
    this.model = model
    this.year = year
  }
  start () {
    return `${this.make} was first introduced in ${this.year} I think`
  }
}

class Car extends Vehicle {
  drive() {
    return `The ${this.make} ${this.model} drove. Vroom Vroom!`
  }
}

let myCar = new Car ("Honda", "Civic", 2019)
console.log (myCar.start())
console.log (myCar.drive())

// Encapsulation

class BankAccount {
  #balance = 0;
  deposit(amount) {
    this.#balance += amount;
    console.log(`Oh buoy! ${amount} currency units! Gromf nomf chomp chew`);
    return this.#balance;
  }
  withdraw(amount) {
    this.#balance -= amount;
    console.log(`Oh no! Please don't take those ${amount} currency units I need them D:`);
    return this.#balance;
  }
  getBalance() {
    return `You have a ${this.#balance} of currency units`;
  }
}

let account = new BankAccount();
console.log(account.getBalance());
account.deposit(100);
console.log(account.getBalance());
account.withdraw(30);
console.log(account.getBalance());

class CoffeeMachine {
  start() {
    return "Starting the coffee machine";
  }
  brewCoffee() {
    return "Brewing coffee";
  }
  stop() {
    return "Stopping the coffee machine";
  }
  pressStartOnTheCoffeeMachine() {
    let msgOne = this.start();
    let msgTwo = this.brewCoffee();
    let msgThree = this.stop();
    return `${msgOne}\n${msgTwo}\n${msgThree}`;
  }
}

let machine = new CoffeeMachine();
console.log(machine.pressStartOnTheCoffeeMachine());


// Polymorphism

class Bird {
  fly() {
    return "The bird is flying";
  }
}

class Penguin extends Bird {
  fly() {
    return "No";
  }
}

class Eagle extends Bird {
}

let myBird = new Bird();
let myPenguin = new Penguin();
let myEagle = new Eagle();

console.log("Sparrow fly: " + myBird.fly());
console.log("Penguin fly: " + myPenguin.fly());
console.log("Eagle fly: " + myEagle.fly());

// Static Methods and Properties

class Calculator {
  static add(a, b) {
    return a + b;
  }
  static subtract(a, b) {
    return a - b;
  }
  static multiply(a, b) {
    return a * b;
  }
  static divide(a, b) {
    if (b === 0) {
      throw new Error("Disgraceful");
    }
    return a / b;
  }
}

let miniCalc =  new Calculator();
console.log(miniCalc.add(2,3));
console.log(miniCalc.subtract(5,2));
console.log(miniCalc.multiply(3,4));
console.log(miniCalc.divide(8,2));
