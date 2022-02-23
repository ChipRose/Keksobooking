import './api.js';
import './filter-form.js';
import './form.js';
import './map.js';
import './images-preview.js';

import { setUsualMarkers, setInitialMapState } from './map.js';
import { getData } from './api.js';
import { showAllertMessage, createErrorMessage } from './util/util-message.js';
import { setPromoFormSubmit, clearForm, sendPromoForm, setSuccessState, setErrorState, setInitialFormState } from './form.js';
import { setInitialFilterState, setObjectTypeFilter, setObjectPriceFilter, setObjectRoomsFilter, setObjectCapacityFilter } from './filter-form.js';
import { debounceLib } from './libraries.js';

const RERENDER_DELAY = 500;

getData(
  (promos) => {
    setUsualMarkers(promos);
    setPromoFormSubmit(() => setUsualMarkers(promos));
    setObjectTypeFilter(debounceLib(() => setUsualMarkers(promos), RERENDER_DELAY));
    setObjectPriceFilter(debounceLib(() => setUsualMarkers(promos), RERENDER_DELAY));
    setObjectRoomsFilter(debounceLib(() => setUsualMarkers(promos), RERENDER_DELAY));
    setObjectCapacityFilter(debounceLib(() => setUsualMarkers(promos), RERENDER_DELAY));
    clearForm(() => setUsualMarkers(promos));
  },

  () => showAllertMessage(createErrorMessage),
);

setPromoFormSubmit(sendPromoForm(setSuccessState, setErrorState), setInitialFormState, setInitialFilterState, setInitialMapState);
clearForm(setInitialFormState, setInitialFilterState, setInitialMapState);
