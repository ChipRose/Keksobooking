'use strict';

const PROMO_QUANTITY = 10;

const Rooms = {
  MIN: 1,
  MAX: 20,
};

const Guests = {
  MIN: 1,
  MAX: 20,
};

const Prices = {
  MIN: 2000,
  MAX: 5000,
};

const OBJECT_TYPES = [
  'palace',
  'flat',
  'house',
  'bungallow',
];

const TIMES_TO_CHECK_IN = [
  '12:00',
  '13:00',
  '14:00',
];

const TIMES_TO_CHECK_OUT = [
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

const PHOTO_SOURCES = [
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

const getRandomVariousIndexArray = (min, max, size) => {
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

const getRandomVariousLengthArray = (arrayElements, size) => {
  const indexArray = getRandomVariousIndexArray(0, arrayElements.length - 1, size);
  const randomArray = indexArray.map((index) => {
    return arrayElements[index];
  });
  return randomArray;
};

const getRandomElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};

const createAuthor = (index, necessaryNameLength) => {
  const nullsQuantity = necessaryNameLength - String(index).length;
  let photoIndex = (String(Math.pow(10, nullsQuantity)) + index).slice(-necessaryNameLength);
  return {
    avatar: 'img/avatars/user' + photoIndex + '.png',
  }
};

const LOCATION = {
  X: getRandomFloat(35.65, 35.7, 4),
  Y: getRandomFloat(139.7, 139.8, 4),
};

const createOffer = () => {
  return {
    title: 'Сдам',
    address: LOCATION.X + ', ' + LOCATION.Y,
    price: getRandomInt(Prices.MIN, Prices.MAX),
    type: getRandomElement(OBJECT_TYPES),
    rooms: getRandomInt(Rooms.MIN, Rooms.MAX),
    guests: getRandomInt(Guests.MIN, Guests.MAX),
    checkin: getRandomElement(TIMES_TO_CHECK_IN),
    checkout: getRandomElement(TIMES_TO_CHECK_OUT),
    features: getRandomVariousLengthArray(FEATURES, getRandomInt(1, FEATURES.length)),
    description: 'Помещение уютное, здесь есть всё самое необходимое, а большое окно впускает много солнца.',
    photos: getRandomVariousLengthArray(PHOTO_SOURCES, getRandomInt(1, PHOTO_SOURCES.length)),
  };
}

const authors = getRandomVariousIndexArray(1, PROMO_QUANTITY, 10).map((index) => createAuthor(index, 2));

const createPromo = (person, content, address) => {
  return {
    author: person,
    offer: content,
    location: address,
  }
}

const Promos = new Array(PROMO_QUANTITY).fill(null).map((element, index) => element = createPromo(authors[index], createOffer(), LOCATION));

Promos;
