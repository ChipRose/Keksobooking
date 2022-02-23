import { clearForm } from './form.js';
import { setFeaturesDefault } from './form.js';

const DEFAULT_FILTER_VALUE = 'any';

const mapFilterForm = document.querySelector('.map__filters');
const objectTypeFilterSelect = mapFilterForm.querySelector('[name=housing-type]');
const objectPriceFilterSelect = mapFilterForm.querySelector('[name=housing-price]');
const objectRoomsFilterSelect = mapFilterForm.querySelector('[name=housing-rooms]');
const objectCapacityFilterSelect = mapFilterForm.querySelector('[name=housing-guests]');
const objectFeaturesFilterSet = mapFilterForm.querySelectorAll('.map__checkbox');

const compareCallBack = () => {

  const getPromoRank = (promo) => {
    const objectTypeFilter = objectTypeFilterSelect.value;
    let rank = 0;

    if (promo.offer.type === objectTypeFilter) {
      rank += 3;
    }

    return rank;
  };

  const comparePromos = (promoA, promoB) => {
    const rankA = getPromoRank(promoA);
    const rankB = getPromoRank(promoB);
    return (rankB - rankA);
  };

  return comparePromos;
};

const setObjectFilter = (cb) => {
  objectTypeFilterSelect.addEventListener('change', () => {
    cb();
  });
};

const setInitialFilterState = () => {
  objectTypeFilterSelect.value = DEFAULT_FILTER_VALUE;
  objectPriceFilterSelect.value = DEFAULT_FILTER_VALUE;
  objectRoomsFilterSelect.value = DEFAULT_FILTER_VALUE;
  objectCapacityFilterSelect.value = DEFAULT_FILTER_VALUE;
  setFeaturesDefault(objectFeaturesFilterSet);
};

clearForm(setInitialFilterState);

export { setObjectFilter, compareCallBack, setInitialFilterState };
