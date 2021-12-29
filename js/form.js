import {getPrice} from './data.js';

const offerForm = document.querySelector('.ad-form');
const offerTypeSelect = offerForm.querySelector('#type');
const offerPriceInput = offerForm.querySelector('#price');

const setMinPrice = (offerType=offerTypeSelect.value) => {
  offerPriceInput.placeholder = getPrice(offerType).MIN;
  offerPriceInput.min = getPrice(offerType).MIN;
}

setMinPrice();

const setTimeCheck = (evt) => {
  let nessesaryValue = {};
  if (evt.target.nodeName === 'SELECT') {
    nessesaryValue=evt.target.value;
  }
  return console.log(nessesaryValue);
}

setMinPrice();

offerTypeSelect.addEventListener('input', () =>{
  setMinPrice();
});

const timeCheck = offerForm.querySelector('.ad-form__element--time');

timeCheck.addEventListener('input', setTimeCheck);
