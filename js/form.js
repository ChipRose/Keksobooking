import { checkEmptyField, checkValideTitle, checkValidePrice, checkCapacityDefault, checkValideCapacity } from './validation.js'
import { showAllertMessage } from './util/util.js';

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
const successNoteTemplate = document.querySelector('#success').content.querySelector('.success');

const getPrice = (objectType = 'flat') => {
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

const setAddress = (coordinateLat, coordinateLng) => {
  const Coordinates = {
    LAT: coordinateLat.toFixed(COORDINATE_ACCURACY),
    LNG: coordinateLng.toFixed(COORDINATE_ACCURACY),
  };
  promoAddress.value = `${Coordinates.LAT}, ${Coordinates.LNG}`;
};

const setMinPrice = (offerType = promoTypeSelect.value) => {
  promoPriceInput.placeholder = getPrice(offerType).MIN;
  promoPriceInput.min = getPrice(offerType).MIN;
};

setMinPrice();

promoTypeSelect.addEventListener('change', () => {
  setMinPrice();
});

const setTime = (elementID, relateElementId) => {
  const nessesaryTimeValue = promoForm.querySelector(`#${elementID}`);
  const relateEventElement = promoForm.querySelector(`#${relateElementId}`);
  relateEventElement.value = nessesaryTimeValue.value;
};

setTime(FIELD_TIMEIN_ID, FIELD_TIMEOUT_ID);

timeForm.addEventListener('change', (evt) => {
  const elementId = evt.target.id;
  let relateElementId = FIELD_TIMEIN_ID;
  if (elementId === FIELD_TIMEIN_ID) { relateElementId = FIELD_TIMEOUT_ID; }
  setTime(elementId, relateElementId);
});

const setCapacity = (roomNumber) => {
  capacitySelect.value = checkCapacityDefault(roomNumber);
};

setCapacity(roomNumberSelect.value);

const checkCapacity = (roomNumber) => {
  checkValideCapacity(capacitySelect, roomNumber);
  capacitySelect.reportValidity();
};

checkCapacity(roomNumberSelect.value);

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

const setPromoFormSubmit = (onSuccess) => {
  promoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    fetch('https://23.javascript.pages.academy/keksobooking ',
      {
        method: 'POST',
        body: formData,
      }).then(() => onSuccess());
  });
};

const setSuccessState = () => { showAllertMessage(successNoteTemplate) };

const createErrorMessage = () => {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = 100;
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = 100;
  errorContainer.style.top = 0;
  errorContainer.style.right = -100;
  errorContainer.style.padding = '10px';
  errorContainer.style.fontSize = '30px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = 'red';
  errorContainer.textContent = 'Не удалось загрузить данные по соседям';
  document.body.append(errorContainer);
};


export { setAddress, getPrice, setPromoFormSubmit, setSuccessState, createErrorMessage };
