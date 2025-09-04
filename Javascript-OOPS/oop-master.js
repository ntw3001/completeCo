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
