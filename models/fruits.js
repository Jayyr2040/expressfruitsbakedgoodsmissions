const fruits = [
    {
      name: "apple",
      color: "red",
      readyToEat: true,
    },
    {
      name: "pear",
      color: "green",
      readyToEat: false,
    },
    {
      name: "banana",
      color: "yellow",
      readyToEat: true,
    },
  ];

  module.exports = fruits; // JS common way
  // export default fruits => es6 modules way
  // export const PI = 3.142 => import PI from XXX
  // module.exports = {PI: 3.412} => const {PI} = require('XXX')