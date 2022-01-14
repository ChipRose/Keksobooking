import { getPrice } from './data.js';
import { checkEmptyField, checkValideTitle, checkValidePrice } from './validation.js'

const COORDINATE_ACCURACY = 5;

const promoForm = document.querySelector('.ad-form');
const promoTitleInput = promoForm.querySelector('#title');
const promoTypeSelect = promoForm.querySelector('#type');
const promoPriceInput = promoForm.querySelector('#price');
const promoAddress = promoForm.querySelector('#address');
const timeCheck = promoForm.querySelector('.ad-form__element--time');

const setMinPrice = (offerType = promoTypeSelect.value) => {
  promoPriceInput.placeholder = getPrice(offerType).MIN;
  promoPriceInput.min = getPrice(offerType).MIN;
};

setMinPrice();

promoTypeSelect.addEventListener('change', () => {
  setMinPrice();
});

const setTimeCheck = (elementID = 'timein', relateElementId = 'timeout') => {
  const nessesaryTimeValue = promoForm.querySelector(`#${elementID}`);
  const relateEventElement = promoForm.querySelector(`#${relateElementId}`);
  relateEventElement.value = nessesaryTimeValue.value;
};

setTimeCheck();

timeCheck.addEventListener('change', (evt) => {
  const FIELD_TIMEIN_ID = 'timein';
  const FIELD_TIMEOUT_ID = 'timeout';
  const elementId = evt.target.id;
  let relateElementId = '';
  elementId === FIELD_TIMEIN_ID ? relateElementId = FIELD_TIMEOUT_ID : relateElementId = FIELD_TIMEIN_ID;
  setTimeCheck(elementId, relateElementId);
});

const setAddress = (coordinateLat, coordinateLng) => {
  const Coordinates = {
    LAT: coordinateLat.toFixed(COORDINATE_ACCURACY),
    LNG: coordinateLng.toFixed(COORDINATE_ACCURACY),
  };
  promoAddress.value = `${Coordinates.LAT}, ${Coordinates.LNG}`;
};

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

export { setAddress };
