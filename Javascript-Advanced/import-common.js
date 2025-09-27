//commonJS import - used in Node.js - not supported in browsers without a bundler

const mathsCommon = require("./maths-common.js");

console.log(mathsCommon.add(2, 3));
console.log(mathsCommon.subtract(5, 2));
console.log(mathsCommon.multiply(3, 4));
console.log(mathsCommon.divide(10, 2));

// It won't work in the browser without a bundler like Webpack or Rollup - it will throw an error like:
// Uncaught ReferenceError: require is not defined
