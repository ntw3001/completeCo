function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`How do you do im ${this.name}`);
};

const alice = new Person('Alice');
alice.greet();

console.log(alice instanceof Person);

const bob = new Person('Bob');
bob.greet();

console.log(bob instanceof Person);
