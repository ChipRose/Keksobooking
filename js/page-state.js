const newOfferForm = document.querySelector('.ad-form');
const newOfferFormElements = newOfferForm.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormElements = mapFiltersForm.querySelectorAll('.map__filter');

const setInactiveState = () => {
  const setElementsDisabled = (elements) => {
    for (let element of elements) {
      element.disabled = true;
    }
  };

  newOfferForm.classList.add('ad-form--disabled');
  mapFiltersForm.classList.add('map__filters--disabled');
  setElementsDisabled(newOfferFormElements);
  setElementsDisabled(mapFiltersFormElements);
};

const setActiveState = () => {
  const setElementsActive = (elements) => {
    for (let element of elements) {
      element.disabled = false;
    }
  };

  newOfferForm.classList.remove('ad-form--disabled');
  mapFiltersForm.classList.remove('map__filters--disabled');
  setElementsActive(newOfferFormElements);
  setElementsActive(mapFiltersFormElements);
};

export { setInactiveState, setActiveState };
