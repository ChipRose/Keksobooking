const ROOMS_NOT_FOR_GUESTS = '100';
const CAPACITY_NOT_FOR_GUESTS = '0';

const TitleLengthLimit = {
  MIN: 30,
  MAX: 100,
};

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

const checkEmptyField = (field) => {
  if (field.validity.valueMissing) {
    field.setCustomValidity('Это обязательное поле');
  }
};

const checkValideTitle = (titleField, titleLength) => {
  if (titleLength < TitleLengthLimit.MIN) {
    titleField.setCustomValidity(`Введите ещё ${TitleLengthLimit.MIN - titleLength} симв.`);
  } else if (titleLength > TitleLengthLimit.MAX) {
    titleField.setCustomValidity(`Удалите лишние ${titleLength - TitleLengthLimit.MAX} симв.`);
  } else {
    titleField.setCustomValidity('');
  }
};

const checkValidePrice = (priceField, type, price) => {
  if (price < getPrice(type).MIN) {
    priceField.setCustomValidity(`Цена должна быть больше ${getPrice(type).MIN}`);
  } else if (price > getPrice().MAX) {
    priceField.setCustomValidity(`Максимальная цена ${getPrice().MAX}`);
  } else {
    priceField.setCustomValidity('');
  }
};

const checkCapacityDefault = (roomNumber) => {
  if (roomNumber === ROOMS_NOT_FOR_GUESTS) {
    return CAPACITY_NOT_FOR_GUESTS;
  }
  return roomNumber;
};

const checkValideCapacity = (capacityField, roomNumber) => {
  const capacity = capacityField.value;
  let message = '';
  if (roomNumber === ROOMS_NOT_FOR_GUESTS) {
    if (capacity !== CAPACITY_NOT_FOR_GUESTS) {
      message = 'Данное размещение "не для гостей"';
    }
  } else if (capacity > roomNumber || capacity === CAPACITY_NOT_FOR_GUESTS) {
    message = `Выберите значение менее или равно "для ${roomNumber} гостей",  или комнату побольше`;
  }
  capacityField.setCustomValidity(message);
};

export { checkEmptyField, checkValideTitle, checkValidePrice, checkCapacityDefault, checkValideCapacity };
