'use strict'
let getCoordinates = function (min, max, accuracy) {
  if (min >= 0 && max > 0 && min < max) {
    if (Math.floor(min) === Math.floor(max) && accuracy === 0) {
      return -1;
    }
    if (accuracy === 0 && min != Math.floor(min)) {
      min += 1;
    }
    return Math.floor((Math.random() * (max * Math.pow(10, accuracy) - min * Math.pow(10, accuracy)) + 1) + min * Math.pow(10, accuracy)) / Math.pow(10, accuracy);
  } else {
    return -1;
  }
}
console.log(getCoordinates(2.9, 3.1, 1));
