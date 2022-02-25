import './api.js';
import './filter-form.js';
import './form.js';
import './map.js';
import './images-preview.js';

import { setUsualMarkers } from './map.js';
import { getData } from './api.js';
import { showAllertMessage, createErrorMessage } from './util/util-message.js';
import { setPromoFormSubmit, clearForm, sendPromoForm, setSuccessState, setErrorState, setInitialState } from './form.js';
import { setInitialFilterState, setObjectFilter } from './filter-form.js';
import {setDefaultPreview} from './images-preview.js';

getData(
  (promos) => {
    setUsualMarkers(promos);
    setPromoFormSubmit(() => setUsualMarkers(promos));
    setObjectFilter(() => setUsualMarkers(promos));
    clearForm(() => setUsualMarkers(promos));
  },

  () => showAllertMessage(createErrorMessage),
);

setPromoFormSubmit(sendPromoForm(setSuccessState, setErrorState),setInitialState, setInitialFilterState, setDefaultPreview);
clearForm(setInitialState, setDefaultPreview);
