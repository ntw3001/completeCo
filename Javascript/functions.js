// let teaOrder;
// function makeTea(teaStyle) {
//   teaOrder = (`making ${teaStyle} tea...`);
// }
// makeTea("guzzleyum")
// console.log(teaOrder);

function orderTea(teaStyle) {
  function confirmOrder() {
    console.log(`Order confirmed: ${teaStyle} tea`);
  }
  confirmOrder();
}

teaStyle = "lapsang souchong";
orderTea(teaStyle);
