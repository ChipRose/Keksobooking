import { setFeaturesDefault } from './form.js';

const DEFAULT_FILTER_VALUE = 'any';

const mapFilterForm = document.querySelector('.map__filters');
const objectTypeFilterSelect = mapFilterForm.querySelector('[name=housing-type]');
const objectPriceFilterSelect = mapFilterForm.querySelector('[name=housing-price]');
const objectRoomsFilterSelect = mapFilterForm.querySelector('[name=housing-rooms]');
const objectCapacityFilterSelect = mapFilterForm.querySelector('[name=housing-guests]');
const objectFeaturesFilterSet = mapFilterForm.querySelectorAll('.map__checkbox');

const PriceRange = {
  ANY: {
    MIN: 0,
    MAX: 1000000,
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000,
  },
  LOW: {
    MIN: 0,
    MAX: 10000,
  },
  HIGH: {
    MIN: 50000,
    MAX: 1000000,
  },
};

const compareCallBack = () => {

  const getPromoRank = (promo) => {

    const { offer } = promo;
    const objectTypeFilter = objectTypeFilterSelect.value;
    const objectPriceFilter = objectPriceFilterSelect.value.toUpperCase();
    const objectRoomsFilter = Number(objectRoomsFilterSelect.value);

    let rank = 0;

    if (offer.type === objectTypeFilter) rank += 3;
    if (offer.price >= PriceRange[objectPriceFilter].MIN && offer.price <= PriceRange[objectPriceFilter].MAX) rank += 2;
    if (offer.rooms === objectRoomsFilter) rank += 1;

    return rank;
  };

  const comparePromos = (promoA, promoB) => {
    const rankA = getPromoRank(promoA);
    const rankB = getPromoRank(promoB);
    return (rankB - rankA);
  };

  return comparePromos;
};

const setObjectTypeFilter = (cb) => {
  objectTypeFilterSelect.addEventListener('change', () => {
    cb();
  });
};

const setObjectPriceFilter = (cb) => {
  objectPriceFilterSelect.addEventListener('change', () => {
    cb();
  });
};

const setObjectRoomsFilter = (cb) => {
  objectRoomsFilterSelect.addEventListener('change', () => {
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

export { compareCallBack, setInitialFilterState, setObjectTypeFilter, setObjectPriceFilter, setObjectRoomsFilter };
