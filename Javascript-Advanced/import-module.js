//default import - only one default export allowed per module
import multiply from "./maths-module.js";

console.log(multiply(2, 3));

//named import - multiple named exports allowed per module
import { add, subtract } from "./maths-module.js";

console.log(add(2, 3));
console.log(subtract(5, 2));

//mixed import - default and named imports together
// import addDefault, { subtract as sub, multiply as mul } from "./maths-module.js";

// console.log(addDefault(7, 3));
// console.log(sub(10, 4));
// console.log(mul(2, 5));
