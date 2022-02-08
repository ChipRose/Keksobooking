import { checkEmptyField, checkValideTitle, checkValidePrice, checkValideCapacity } from './validation.js'
import { createErrorMessage, createSuccessMessage, showAllertMessage, showSuccessMessage } from './util/util.js';
import { sendData } from './api.js';
import { setMainMarkerDefault } from './map.js';

const COORDINATE_ACCURACY = 5;
const FIELD_TIMEIN_ID = 'timein';
const FIELD_TIMEOUT_ID = 'timeout';

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

const RoomsValue = {
  FOR_ONE: '1',
  NOT_FOR_GUESTS: '100',
};

const CapacityValue = {
  FOR_ONE: '1',
  NOT_FOR_GUESTS: '0',
}

const getPrice = (objectType = 'flat') => {
  const minPrice = {
    BUNGALOW: 0,
    FLAT: 1000,
    HOTEL: 3000,
    HOUSE: 5000,
  }
  return {
    MIN: minPrice[objectType.toUpperCase()],
    MAX: 1000000,
  }
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

const setTime = (elementID, relateElementId) => {
  const nessesaryTimeValue = promoForm.querySelector(`#${elementID}`);
  const relateEventElement = promoForm.querySelector(`#${relateElementId}`);
  relateEventElement.value = nessesaryTimeValue.value;
};

const setTimeDefault = () => {
  setTime(FIELD_TIMEIN_ID, FIELD_TIMEOUT_ID);
};

timeForm.addEventListener('change', (evt) => {
  const elementId = evt.target.id;
  let relateElementId = FIELD_TIMEIN_ID;
  if (elementId === FIELD_TIMEIN_ID) { relateElementId = FIELD_TIMEOUT_ID; }
  setTime(elementId, relateElementId);
});

const setCapacityDefault = () => {
  roomNumberSelect.value = RoomsValue.FOR_ONE;
  capacitySelect.value = CapacityValue.FOR_ONE;
};

const setFeaturesDefault = () => {
  featuresSet.forEach((feature) => {
    feature.checked = false;
  });
};

const clearField = (fields) => {
  fields.forEach((field) => {
    field.value = '';
  })
};

const setInitialState = () => {
  clearField([promoTitleInput, promoPriceInput, descriptionTextArea]);
  setMainMarkerDefault();
  setMinPriceDefault();
  setTimeDefault();
  setCapacityDefault();
  setFeaturesDefault();
};

setInitialState();

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

const setPromoFormSubmit = (setSuccessState) => {
  promoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(() => setSuccessState(), formData);
  });
};

const setSuccessState = () => {
  showSuccessMessage(createSuccessMessage);
  setInitialState();
};

const setErrorState = (message) => { showAllertMessage(createErrorMessage(message)) };

const clearForm = () => {
  promoForm.addEventListener('reset', (evt) => {
    evt.preventDefault();
    setInitialState();
  });
}

export { setAddress, getPrice, setPromoFormSubmit, clearForm, setSuccessState, setErrorState, setInitialState };
