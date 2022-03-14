import { checkEmptyField, checkValideTitle, checkValidePrice, checkValideCapacity } from './validation.js';
import { createMessage, showMessage } from './util/util-message.js';
import { sendData } from './api.js';
import { setDefaultPreview } from './images-preview.js';

const COORDINATE_ACCURACY = 5;
const FIELD_TIMEIN_ID = 'timein';
const FIELD_TIMEOUT_ID = 'timeout';

const TimeValueDefault = {
  IN: '12:00',
}

const RoomsValue = {
  FOR_ONE: '1',
  NOT_FOR_GUESTS: '100',
};

const CapacityValue = {
  FOR_ONE: '1',
  NOT_FOR_GUESTS: '0',
};

const promoForm = document.querySelector('.ad-form');
const promoTitleInput = promoForm.querySelector('#title');
const promoTypeSelect = promoForm.querySelector('#type');
const promoPriceInput = promoForm.querySelector('#price');
const promoAddress = promoForm.querySelector('#address');
const timeForm = promoForm.querySelector('.ad-form__element--time');
const roomNumberSelect = promoForm.querySelector('#room_number');
const capacitySelect = promoForm.querySelector('#capacity');
const featuresSet = promoForm.querySelectorAll('.feature__checkbox');
const descriptionTextArea = promoForm.querySelector('#description');

const getPrice = (objectType = 'flat') => {
  const MinPrice = {
    BUNGALOW: 0,
    FLAT: 1000,
    HOTEL: 3000,
    HOUSE: 5000,
  };
  return {
    MIN: MinPrice[objectType.toUpperCase()],
    MAX: 1000000,
  };
};

const setAddress = (coordinateLat, coordinateLng) => {
  const Coordinates = {
    LAT: coordinateLat.toFixed(COORDINATE_ACCURACY),
    LNG: coordinateLng.toFixed(COORDINATE_ACCURACY),
  };
  promoAddress.value = `${Coordinates.LAT}, ${Coordinates.LNG}`;
};

const setMinPrice = (offerType) => {
  promoPriceInput.placeholder = getPrice(offerType).MIN;
  promoPriceInput.min = getPrice(offerType).MIN;
};

const setMinPriceDefault = () => {
  setMinPrice(promoTypeSelect.value);
};

promoTypeSelect.addEventListener('change', () => {
  setMinPrice();
});

const setTime = (elementID, relateElementId, defValue) => {
  const nessesaryTimeValue = promoForm.querySelector(`#${elementID}`);
  const relateEventElement = promoForm.querySelector(`#${relateElementId}`);
  if (defValue) {
    nessesaryTimeValue.value = defValue;
    relateEventElement.value = defValue;
  } else {
    relateEventElement.value = nessesaryTimeValue.value;
  }
};

const setTimeDefault = () => {
  setTime(FIELD_TIMEIN_ID, FIELD_TIMEOUT_ID, TimeValueDefault.IN);
};

timeForm.addEventListener('change', (evt) => {
  const elementId = evt.target.id;
  let relateElementId = FIELD_TIMEIN_ID;
  if (elementId === FIELD_TIMEIN_ID) {
    relateElementId = FIELD_TIMEOUT_ID;
  }
  setTime(elementId, relateElementId);
});

const setCapacityDefault = () => {
  roomNumberSelect.value = RoomsValue.FOR_ONE;
  capacitySelect.value = CapacityValue.FOR_ONE;
};

const setFeaturesDefault = (features) => {
  features.forEach((feature) => {
    feature.checked = false;
  });
};

const clearField = (fields) => {
  fields.forEach((field) => {
    field.value = '';
  });
};

const setInitialFormState = () => {
  clearField([promoTitleInput, promoPriceInput, descriptionTextArea]);
  setMinPriceDefault();
  setTimeDefault();
  setCapacityDefault();
  setFeaturesDefault(featuresSet);
  setDefaultPreview();
};

setInitialFormState();

const checkCapacity = (roomNumber) => {
  checkValideCapacity(capacitySelect, CapacityValue.NOT_FOR_GUESTS, roomNumber, RoomsValue.NOT_FOR_GUESTS);
  capacitySelect.reportValidity();
};

capacitySelect.addEventListener('change', () => {
  checkCapacity(roomNumberSelect.value);
});

roomNumberSelect.addEventListener('change', () => {
  checkCapacity(roomNumberSelect.value);
});

promoTitleInput.addEventListener('invalid', () => {
  checkEmptyField(promoTitleInput);
});

promoTitleInput.addEventListener('input', () => {
  const titleLength = promoTitleInput.value.length;
  checkValideTitle(promoTitleInput, titleLength);
  promoTitleInput.reportValidity();
});

promoPriceInput.addEventListener('invalid', () => {
  checkEmptyField(promoPriceInput);
});

promoPriceInput.addEventListener('input', () => {
  checkValidePrice(promoPriceInput, promoTypeSelect.value, promoPriceInput.value);
  promoPriceInput.reportValidity();
});

const setSuccessState = () => {
  const SUCCESS_MESSAGE_ID = 'success';
  const SUCCESS_MESSAGE_CONTENT = 'success';
  showMessage(createMessage(SUCCESS_MESSAGE_ID, SUCCESS_MESSAGE_CONTENT));
};

const setErrorState = () => {
  const ERROR_MESSAGE_ID = 'error';
  const ERROR_MESSAGE_CONTENT = 'error';
  const ERROR_BUTTON = 'error__button';
  showMessage(createMessage(ERROR_MESSAGE_ID, ERROR_MESSAGE_CONTENT), ERROR_BUTTON);
};

const sendPromoForm = (onSuccess, onError) => {
  const setState = () => {
    const formData = new FormData(promoForm);
    sendData(
      () => onSuccess(),
      () => onError(),
      formData,
    );
  };
  return setState;
};

const setPromoFormSubmit = (...callbacks) => {
  promoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    callbacks.forEach((cb) => cb());
  });
};

const clearForm = (...callbacks) => {
  promoForm.addEventListener('reset', (evt) => {
    evt.preventDefault();
    callbacks.forEach((cb) => cb());
  });
};

export {
  setAddress,
  getPrice,
  setFeaturesDefault,
  setPromoFormSubmit,
  sendPromoForm,
  clearForm,
  setSuccessState,
  setErrorState,
  setInitialFormState
};
