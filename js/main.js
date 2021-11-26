'use strict';

let getRandomNumber = (min, max, accuracy) => {
  if (min < 0 || max < 0 || accuracy < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  min = parseFloat(min);
  max = parseFloat(max);
  accuracy = parseInt(accuracy);

  if (isNaN(min) || isNaN(max) || isNaN(accuracy)) {
    return -1;
  }

  let power = Math.pow(10, accuracy);
  min = Math.floor(min * power);
  max = Math.floor(max * power + 1);
  return Math.floor(Math.random() * (max - min) + min) / power;
};

let getRandomInt = (min, max) => {
  return getRandomNumber(min, max, 0);
};

let getRandomFloat = (min, max, accuracy) => {
  if (Math.floor(min) === Math.floor(max) && accuracy === 0) {
    if (Math.floor(min) !== min && Math.floor(max) !== max) {
      return -1;
    }
  }

  return getRandomNumber(min, max, accuracy);
};

getRandomInt(4, 4);
getRandomFloat(3.2, 3.8, 0);
