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

const createAuthor =() => {
  return {
    avatar: 'img/avatars/user{{xx}}.png', //??
  }
}

const createOffer = () => {
  return {
    title: '', //??
    address: '', //??
    price: getRandomInt(0, 1000),
    type: OBJECT_TYPES[getRandomInt(0, OBJECT_TYPES.length-1)],
    rooms: getRandomInt(1, 20),
    guests: getRandomInt(1, 100),
    checkin: TIMES_TO_CHECK[getRandomInt(0, TIMES_TO_CHECK.length-1)],
    checkout: TIMES_TO_CHECK[getRandomInt(0, TIMES_TO_CHECK.length-1)],
    features: [], //??
    description: '',
    photos: [], //??
    location: {
      x: getRandomFloat(35.65, 35.7, 4),
      y: getRandomFloat(139.7, 139.8, 4),
    },
  };
}
