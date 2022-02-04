import { setUsualMarkers } from './map.js';
import { setPromoFormSubmit, setSuccessState, setErrorState } from './form.js';

const PROMO_QUANTITY = 10;

const requestToData = (onError) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    })
    .then((response) => {
      if (response.ok) {
        const promos = response.json();
        return promos;
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((promos) => {
      const similarPromos = promos.slice(0, PROMO_QUANTITY);
      return similarPromos;
    })
    .then((similarPromos) => {
      setUsualMarkers(similarPromos);
    })
    .catch((err) => {
      onError(err);
    });
};

requestToData(setErrorState);


setPromoFormSubmit(setSuccessState, setErrorState);

