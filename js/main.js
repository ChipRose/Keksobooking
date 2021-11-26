'use strict';

let getRandomTemplate = function (min, max, accuracy) {
  if (min >= 0 && max > 0 && max >= min && accuracy >= 0) {
    if (Math.floor(min) === Math.floor(max) && max !== min && accuracy === 0) {
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

let getRandomInt = function (min, max) {
  return getRandomTemplate(min, max, 0);
};

let getRandomFloat = function (min, max, accuracy) {
  return getRandomTemplate(min, max, accuracy);
}

getRandomInt(6, 6);
getRandomFloat(2.1, 2.5, 1);
