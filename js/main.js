'use strict';
let getRandomCoordinates = function (min, max, accuracy) {
  if (min >= 0 && max > 0 && min < max) {
    if (Math.floor(min) === Math.floor(max) && accuracy === 0) {
      return -1;
    }
    let power = Math.pow(10, accuracy);
    min = Math.ceil(min * power);
    max = Math.floor(max * power + 1);
    return Math.floor((Math.random() * (max - min) + min)) / power;
  } else {
    return -1;
  }
};
getRandomCoordinates(3.2, 4.3, 0);
