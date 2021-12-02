'use strict';

const getRandomNumber = (min, max, accuracy) => {
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

  const power = Math.pow(10, accuracy);
  const start = Math.ceil(min * power) / power;
  const end = Math.floor(max * power) / power;

  return (Math.random() * (end - start) + start).toFixed(accuracy);
};

const getRandomInt = (min, max) => {
  return parseInt(getRandomNumber(min, max, 0));
};

const getRandomFloat = (min, max, accuracy) => {
  return parseFloat(getRandomNumber(min, max, accuracy));
};

const OBJECT_TYPES = [
  'palace',
  'flat',
  'house',
  'bungallow',
];

const TIMES_TO_CHECK = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS_LOCATIONS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
]
const checkUniqueNumber = (array, number) => {
  return array.every((element) => element !== number);
}

const getRandomVariousIndexArray = (maxValue, size) => {
  let count = 0;
  let variousNumber = 0;
  let VariousNumbers = new Array(size).fill(null);
  while (count < size) {
    variousNumber = getRandomInt(0, maxValue);
    if (checkUniqueNumber(VariousNumbers, variousNumber)) {
      VariousNumbers[count] = variousNumber;
      count++;
    }
  }
  return VariousNumbers;
}

console.log('Индексы ' + getRandomVariousIndexArray((FEATURES.length - 1), getRandomInt(1, FEATURES.length - 1)));

const getRandomArray = (arrayElements, size) => {
  const RandomArray = new Array(size).fill(null);
  const IndexArray = getRandomVariousIndexArray(arrayElements.length - 1, size);
  for (let i = 0; i < size; i++) {
    RandomArray[i] = arrayElements[IndexArray[i]];
  }
  return RandomArray;
};

console.log('Произвольное количество элементов ' + getRandomArray(FEATURES,  getRandomInt(1, FEATURES.length - 1)));

const getRandomElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};


const createAuthor = () => {
  return {
    avatar: 'img/avatars/user{{xx}}.png', //??
  }
};

const MAX_ROOMS_QUANTITY = 10;
const MAX_GUESTS_QUANTITY = 20;
const MAX_PRICE = 1000;

const createOffer = () => {
  return {
    title: 'Сдам', //??
    address: '', //из географических координат по маске {{location.x}}, {{location.y}}
    price: getRandomInt(0, MAX_PRICE),
    type: getRandomElement(OBJECT_TYPES),
    rooms: getRandomInt(1, MAX_ROOMS_QUANTITY),
    guests: getRandomInt(1, MAX_GUESTS_QUANTITY),
    checkin: getRandomElement(TIMES_TO_CHECK),
    checkout: getRandomElement(TIMES_TO_CHECK),
    features: getRandomArray(FEATURES, getRandomInt(1, FEATURES.length)),
    description: '', // описание помещения. Придумайте самостоятельно.
    photos: [], //массив строк — массив случайной длины из значений
  };
}

const createLocation = () => {
  return {
    x: getRandomFloat(35.65, 35.7, 4),
    y: getRandomFloat(139.7, 139.8, 4),
  }
};

console.log(createOffer());
