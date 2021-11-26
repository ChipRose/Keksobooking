'use strict';

let getRandomNumber = (min, max, accuracy) => {
  min = parseFloat(min);
  max = parseFloat(max);
  accuracy = parseInt(accuracy);

  if (min < 0 || max < 0 || accuracy < 0) {
    throw new TypeError('Все параметры должны быть положительными');
  }

  if (isNaN(min) || isNaN(max) || isNaN(accuracy)) {
    throw new TypeError('Все параметры должны быть числами');
  }

  if (parseInt(min) === parseInt(max) && accuracy === 0) {
    if (parseInt(min) !== min && parseInt(max) !== max) {
      throw new TypeError('Невозможно сгенерировать числа удовлетворяющие условию');
    }
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  let power = Math.pow(10, accuracy);
  let start = Math.ceil(min * power);
  let end = Math.floor(max * power) + 1;

  return parseInt((Math.random() * (end - start) + start)) / power;
};

let getRandomInt = (min, max) => {
  return getRandomNumber(min, max, 0);
};

let getRandomFloat = (min, max, accuracy) => {
  return getRandomNumber(min, max, accuracy);
};

getRandomInt(4.1, 4);
getRandomFloat(3.2, 3.3, 2);
