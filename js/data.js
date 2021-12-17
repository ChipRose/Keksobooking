import { getRandomInt, getRandomFloat } from './util/math-util.js';
import { getRandomElement, getRandomArrayOfVariousIndex, getRandomArray } from './util/array-util.js';

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

const Coordinates = {
  X: {
    MIN: 35.65,
    MAX: 35.7,
  },
  Y: {
    MIN: 139.7,
    MAX: 139.8,
  },
  ACCURACY: 4,
}

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


const createAuthor = (index, necessaryNameLength) => {
  const nullsQuantity = new Array(necessaryNameLength - String(index).length).fill('0');
  let photoIndex = nullsQuantity.join() + index;
  return {
    avatar: `img/avatars/user${photoIndex}.png`,
  }
};

const createLocation = (xMin = Coordinates.X.MIN, xMax = Coordinates.X.MAX, yMin = Coordinates.Y.MIN, yMax = Coordinates.Y.MAX, accuracy = Coordinates.ACCURACY) => {
  return {
    x: getRandomFloat(xMin, xMax, accuracy),
    y: getRandomFloat(yMin, yMax, accuracy),
  }
};

const authors = getRandomArrayOfVariousIndex(1, PROMO_QUANTITY, PROMO_QUANTITY).map((index) => createAuthor(index, 2));


const createOffer = (coordinateX, coordinateY) => {
  return {
    title: 'Сдам',
    address: `${coordinateX}, ${coordinateY}`,
    price: getRandomInt(Prices.MIN, Prices.MAX),
    type: getRandomElement(OBJECT_TYPES),
    rooms: getRandomInt(Rooms.MIN, Rooms.MAX),
    guests: getRandomInt(Guests.MIN, Guests.MAX),
    checkin: getRandomElement(TIMES_TO_CHECK_IN),
    checkout: getRandomElement(TIMES_TO_CHECK_OUT),
    features: getRandomArray(FEATURES, getRandomInt(1, FEATURES.length)),
    description: 'Помещение уютное, здесь есть всё самое необходимое, а большое окно впускает много солнца.',
    photos: getRandomArray(PHOTO_SOURCES, getRandomInt(1, PHOTO_SOURCES.length)),
  };
}


const createPromo = (person, content, address) => {
  return {
    author: person,
    offer: content,
    location: address,
  }
}

const Promos = new Array(PROMO_QUANTITY).fill(null).map((element, index) => {
  const location = createLocation();
  return element = createPromo(authors[index], createOffer(location.x, location.y), location);
});

export {Promos};
