function Person (name, age) {
  this.name = name
  this.age = age
}

function Car(make, model) {
  this.make = make
  this.model = model
}

let myCar = new Car("Toyota", "Camry")
console.log(myCar)

let myNewCar = new Car ("Tata", "Safari")
console.log(myNewCar)

function Tea(type){
  this.type = type
  this.describe = function() {
    return `This is a cup of ${this.type} tea.`
  }
}

let lemonTea = new Tea ("lemon")
console.log(lemonTea.describe())

function Animal(species){
  this.species = species
  this.observe = function() {
    return `Look! A ${this.species}!`
  }
}

let whale = new Animal("whale")
console.log(whale.observe())

function Drink(name) {
  if (!new.target) {
    throw new Error(`Gotta use "new" friend`)
  }
  this.name = name
}
let tea = new Drink("tea")
let coffee = Drink("coffee")
