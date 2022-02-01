import './form.js';
import './map.js';
import { renderSimilarPromos } from './similar-promos.js';
import {setUsualMarker} from './map.js'

const PROMO_QUANTITY = 10;
const similarPromos = fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((resolve) => resolve.json())
  .then((promos) => {
    const similarPromos = promos.slice(0, PROMO_QUANTITY);
    renderSimilarPromos(similarPromos);
    console.log(similarPromos);
    });
console.log(similarPromos);
