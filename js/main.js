import './form.js';
import './map.js';
import './api.js';

import { setUsualMarkers } from './map.js';
import { getData } from './api.js';
import { showAllertMessage, createErrorMessage } from './util/util.js';

import { setPromoFormSubmit, clearForm, setSuccessState, setErrorState } from './form.js';

const PROMO_QUANTITY = 10;

getData((promos) => setUsualMarkers(promos.slice(0, PROMO_QUANTITY)), () => showAllertMessage(createErrorMessage));

setPromoFormSubmit(setSuccessState, setErrorState);
clearForm();
