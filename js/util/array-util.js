import { getRandomInt } from './math-util.js';

const getRandomElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};

const checkUniqueNumber = (array, number) => {
  return array.every((element) => element !== number);
}

const getRandomArrayOfVariousIndex = (min, max, size) => {
  let randomNumber;
  let randomIndexes = [];
  while (randomIndexes.length < size) {
    randomNumber = getRandomInt(min, max);
    if (checkUniqueNumber(randomIndexes, randomNumber)) {
      randomIndexes.push(randomNumber);
    }
  }
  return randomIndexes;
}

const getRandomArray = (arrayElements, size) => {
  const indexArray = getRandomArrayOfVariousIndex(0, arrayElements.length - 1, size);
  const randomArray = indexArray.map((index) => {
    return arrayElements[index];
  });
  return randomArray;
};

export { getRandomElement, getRandomArrayOfVariousIndex, getRandomArray };
