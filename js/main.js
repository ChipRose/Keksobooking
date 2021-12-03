'use strict';

const RoomsQuantity = {
  min: 1,
  max: 20,
};

const GuestsQuantity = {
  min: 1,
  max: 20,
};

const Price = {
  min: 2000,
  max: 5000,
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

const checkUniqueNumber = (array, number) => {
  return array.every((element) => element !== number);
}

const getRandomVariousIndexArray = (maxValue, size) => {
  let randomNumber = 0;
  let VariousNumbers = new Array(size).fill(null).map((element, VariousNumbers) => {
    while (element === null) {
      randomNumber = getRandomInt(0, maxValue);
      if (checkUniqueNumber(VariousNumbers, randomNumber)) {
        element = randomNumber;
      }
      return element;
    }
  });
  return VariousNumbers;
};


console.log('Случайные числа ' + getRandomVariousIndexArray(4, 3));

const getRandomVariousLengthArray = (arrayElements, size) => {
  const IndexArray = getRandomVariousIndexArray(arrayElements.length - 1, size);
  let i = -1;
  const RandomArray = new Array(size).fill(null).map(() => {
    i++;
    return arrayElements[IndexArray[i]];
  });
  return RandomArray;
};

const getRandomElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};


const createAuthor = () => {
  return {
    avatar: 'img/avatars/user{{xx}}.png', //??
  }
};

const createOffer = () => {
  return {
    title: 'Сдам', //??
    address: '', //из географических координат по маске {{location.x}}, {{location.y}}
    price: getRandomInt(Price.min, Price.max),
    type: getRandomElement(OBJECT_TYPES),
    rooms: getRandomInt(RoomsQuantity.min, RoomsQuantity.max),
    guests: getRandomInt(GuestsQuantity.min, GuestsQuantity.max),
    checkin: getRandomElement(TIMES_TO_CHECK),
    checkout: getRandomElement(TIMES_TO_CHECK),
    features: getRandomVariousLengthArray(FEATURES, getRandomInt(1, FEATURES.length)),
    description: '', // описание помещения. Придумайте самостоятельно.
    photos: getRandomVariousLengthArray(PHOTOS_LOCATIONS, getRandomInt(1, PHOTOS_LOCATIONS.length)),
  };
}

const createLocation = () => {
  return {
    x: getRandomFloat(35.65, 35.7, 4),
    y: getRandomFloat(139.7, 139.8, 4),
  }
};

console.log(createOffer());
