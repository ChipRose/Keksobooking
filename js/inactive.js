const setInactiveState = () => {
  const newOfferForm = document.querySelector('.ad-form');
  const newOfferFormElements = newOfferForm.querySelectorAll('.ad-form__element');
  const mapFiltersForm = document.querySelector('.map__filters');
  const mapFiltersFormElements = mapFiltersForm.querySelectorAll('.map__filter');

  const setElementsDisabled = (elements) => {
    for (let element of elements) {
      element.disabled = 'true;'
    }
  };

  newOfferForm.classList.add('ad-form--disabled');
  mapFiltersForm.classList.add('map__filters--disabled');
  setElementsDisabled(newOfferFormElements);
  setElementsDisabled(mapFiltersFormElements);
}

export { setInactiveState };
