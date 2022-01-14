import { getRandomInt, getRandomFloat } from './util/math-util.js';
import { getRandomElement, getUniqueIndex, getVariousLengthRandomArray } from './util/array-util.js';

const PROMO_QUANTITY = 10;

const Rooms = {
  MIN: 1,
  MAX: 20,
};

const Guests = {
  MIN: 1,
  MAX: 20,
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
  ACCURACY: 5,
};

const TITLES = [
  'Сдаю',
  'Продаю',
  'Сдаю апартаменты',
  'Аренда',
];

const OBJECT_TYPES = [
  'palace',
  'flat',
  'hotel',
  'house',
  'bungalow',
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

const DESCRIPTIONS = [
  'Помещение уютное, здесь есть всё самое необходимое, а большое окно впускает много солнца.',
  'Просторные, светлые комнаты с высокими полками.',
  'Комнаты в стиле лофт.',
];

const PHOTO_SOURCES = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const getPrice = (objectType='flat') => {
  const minPrice = {
    bungalow: 0,
    flat: 1000,
    hotel: 3000,
    house: 5000,
    palace: 10000,
  }
  return {
    MIN: minPrice[objectType],
    MAX: 1000000,
  }
};

const createAuthor = (photoIndex) => {
  const necessaryNameLength = String(PROMO_QUANTITY).length;
  const nessesaryNulls = new Array(necessaryNameLength - String(photoIndex).length).fill('0');
  const photoName = `img/avatars/user${nessesaryNulls.join() + photoIndex}.png`;
  return {
    avatar: photoName,
  };
}

const createLocation = (xMin = Coordinates.X.MIN, xMax = Coordinates.X.MAX, yMin = Coordinates.Y.MIN, yMax = Coordinates.Y.MAX, accuracy = Coordinates.ACCURACY) => {
  const xCoordinate = getRandomFloat(xMin, xMax, accuracy);
  const yCoordinate = getRandomFloat(yMin, yMax, accuracy);
  return {
    x: xCoordinate,
    y: yCoordinate,
  };
};

const createOffer = (coordinateX, coordinateY) => {
  const offerTitle = getRandomElement(TITLES);
  const addressString = `${coordinateX}, ${coordinateY}`;
  const offerType = getRandomElement(OBJECT_TYPES);
  const offerPrice = getRandomInt(getPrice(offerType).MIN, getPrice(offerType).MAX);
  const roomsQuantity = getRandomInt(Rooms.MIN, Rooms.MAX);
  const guestsQuantity = getRandomInt(Guests.MIN, Guests.MAX);
  const timeCheckIn = getRandomElement(TIMES_TO_CHECK_IN);
  const timeCheckOut = getRandomElement(TIMES_TO_CHECK_OUT);
  const availableFeatures = getVariousLengthRandomArray(FEATURES, getRandomInt(0, FEATURES.length));
  const offerDescription = getRandomElement(DESCRIPTIONS);
  const offerPhotos = getVariousLengthRandomArray(PHOTO_SOURCES, getRandomInt(1, PHOTO_SOURCES.length));

  return {
    title: offerTitle,
    address: addressString,
    price: offerPrice,
    type: offerType,
    rooms: roomsQuantity,
    guests: guestsQuantity,
    checkin: timeCheckIn,
    checkout: timeCheckOut,
    features: availableFeatures,
    description: offerDescription,
    photos: offerPhotos,
  };
};

const createPromos = () => {
  const getIndex = getUniqueIndex(1, PROMO_QUANTITY);
  const promos = new Array(PROMO_QUANTITY).fill(null).map(() => {
    const getLocation = createLocation();
    return Object.assign({}, { author: createAuthor(getIndex()) }, { offer: createOffer(getLocation.x, getLocation.y) }, { location: getLocation });
  });
  return promos;
};

export { createPromos, getPrice };
