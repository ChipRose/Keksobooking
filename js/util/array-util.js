import { getRandomInt } from './math-util.js';

const getRandomElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};

const getUniqueIndex = (min, max) => {
  const randomIndexes = [];

  return () => {
    let randomIndex = getRandomInt(min, max);
    if (randomIndexes.length >= max - min + 1) {
      throw new TypeError('Разные числа не могут быть сформированы в текущем диапазоне');
    };

    while (randomIndexes.includes(randomIndex)) {
      randomIndex = getRandomInt(min, max);
    };

    randomIndexes.push(randomIndex);
    return randomIndex;
  }
};

const getVariousLengthRandomArray = (arrayElements, size) => {
  const getUniqueRandomInteger = getUniqueIndex(0, arrayElements.length - 1);
  const randomArray = new Array(size).fill(null).map(() => {
    return arrayElements[getUniqueRandomInteger()];
  });
  return randomArray;
};

export { getRandomElement, getUniqueIndex, getVariousLengthRandomArray };
