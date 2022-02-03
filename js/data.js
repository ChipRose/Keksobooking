import { setUsualMarkers } from './map.js';
import {setPromoFormSubmit, setSuccessState, createErrorMessage} from './form.js';

const PROMO_QUANTITY = 10;

fetch('https://2323.javascript.pages.academy/keksobooking/data')
  .then((resolve) => resolve.json())
  .then((promos) => {
    const similarPromos = promos.slice(0, PROMO_QUANTITY);
    return similarPromos;
  })
  .then((similarPromos) => {
    setUsualMarkers(similarPromos);
  })
  .catch(() => createErrorMessage());

setPromoFormSubmit(setSuccessState);
