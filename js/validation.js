import { getPrice } from './form.js';

const TitleLengthLimit = {
  MIN: 30,
  MAX: 100,
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

const checkValideCapacity = (capacityField, capacityNotForGuests, roomNumber, roomNotForGuests) => {
  const capacity = capacityField.value;
  let message = '';
  if (roomNumber === roomNotForGuests) {
    if (capacity !== capacityNotForGuests) {
      message = 'Данное размещение "не для гостей"';
    }
  } else if (capacity > roomNumber || capacity === capacityNotForGuests) {
    message = 'Выберите количество комнат менее или равноe числу гостей или комнату побольше';
  }
  capacityField.setCustomValidity(message);
};

export { checkEmptyField, checkValideTitle, checkValidePrice, checkValideCapacity };
