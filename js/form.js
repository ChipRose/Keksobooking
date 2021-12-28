import {similarPromos} from './promo.js';
import {getPrice} from './data.js';

const offerTypeSelect = document.querySelector('#type');
const offerPriceInput = document.querySelector('#price');

offerTypeSelect.addEventListener('change', () =>{ 
  offerPriceInput.placeholder = getPrice(offerTypeSelect.value).MIN;
});

