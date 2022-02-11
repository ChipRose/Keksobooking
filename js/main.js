import './form.js';
import './filter-form.js';
import './map.js';
import './api.js';

import { setUsualMarkers } from './map.js';
import { getData } from './api.js';
import { showAllertMessage, createErrorMessage } from './util/util-message.js';
import { setPromoFormSubmit, clearForm, setSuccessState, setErrorState } from './form.js';
import { renderSimilarPromos } from './similar-promos.js';

getData(
  (promos) => setUsualMarkers(promos),
  () => showAllertMessage(createErrorMessage)
);

setPromoFormSubmit(setSuccessState, setErrorState);
clearForm();
