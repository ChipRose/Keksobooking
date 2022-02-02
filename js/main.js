import './form.js';
import './map.js';
import './similar-promos.js';
import { setUsualMarkers } from './map.js'

const PROMO_QUANTITY = 10;

fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((resolve) => resolve.json())
  .then((promos) => {
    const similarPromos = promos.slice(0, PROMO_QUANTITY);
    return similarPromos;
  })
  .then((similarPromos) => {
    setUsualMarkers(similarPromos);
  });
