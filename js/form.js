import { getPrice } from './data.js';

const offerForm = document.querySelector('.ad-form');
const offerTypeSelect = offerForm.querySelector('#type');
const offerPriceInput = offerForm.querySelector('#price');
const timeCheck = offerForm.querySelector('.ad-form__element--time');

const setMinPrice = (offerType = offerTypeSelect.value) => {
  offerPriceInput.placeholder = getPrice(offerType).MIN;
  offerPriceInput.min = getPrice(offerType).MIN;
}


const setTimeCheck = (evt) => {
  const FIELD_TIMEIN_ID = 'timein';
  const FIELD_TIMEOUT_ID = 'timeout';
  const nessesaryTimeValue = evt.target.value;
  const elementId = evt.srcElement.id;
  let relateElementId = '';
  elementId === FIELD_TIMEIN_ID ? relateElementId = FIELD_TIMEOUT_ID : relateElementId = FIELD_TIMEIN_ID;
  const relateEventElement = timeCheck.querySelector(`#${relateElementId}`);
  relateEventElement.value = nessesaryTimeValue;
}

setMinPrice();

offerTypeSelect.addEventListener('change', () => {
  setMinPrice();
});

timeCheck.addEventListener('change', setTimeCheck);
