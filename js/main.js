import './form.js';
import './map.js';
import './api.js';

import { setUsualMarkers } from './map.js';
import { getData } from './api.js';

import { setPromoFormSubmit, clearForm, setSuccessState } from './form.js';

const PROMO_QUANTITY = 10;

getData((promos) => {
  setUsualMarkers(promos.slice(0, PROMO_QUANTITY));
});

setPromoFormSubmit(setSuccessState);
clearForm();
