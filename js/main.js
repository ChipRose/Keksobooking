import './form.js';
import './map.js';
import './api.js';
import './images-preview.js';

import { setUsualMarkers } from './map.js';
import { getData } from './api.js';
import { showAllertMessage, createErrorMessage } from './util/util-message.js';
import { setPromoFormSubmit, clearForm, setSuccessState, setErrorState, setInitialState } from './form.js';
import { setObjectFilter } from './map.js';

getData(
  (promos) => {
    setUsualMarkers(promos);
    setObjectFilter(() => setUsualMarkers(promos));
  },
  () => showAllertMessage(createErrorMessage),
);

setPromoFormSubmit(setSuccessState, setErrorState);
clearForm(setInitialState);
