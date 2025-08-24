// function stringToNumber(input) {
//   let output = Number(input)
//   if (isNaN(output)) {
//       output = "Not a number"
//   }
//   return output
// }
// result = stringToNumber("4")

// function flipBoolean(input) {
//   let booleanisedInput = Boolean(input)
//   return !booleanisedInput
// }
// result = flipBoolean(false)

// function whatAmI(input) {
//   let type = typeof(input)
//   let article = /^[aeiou]/i.test(type) ? "an" : "a";
//   output = `I'm ${article} ${type}!`
//   return output
// }
// result = whatAmI(["coffee", "tea"])

function isItTruthy(input) {
  output = Boolean(input)
  if(output==true) {
    output = "It's truthy!"
  } else {
    output = "It's falsy!"
  }
  return output
}
result = isItTruthy(null)

console.log(result)
