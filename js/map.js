import { mapLib } from './libraries.js';
import { setInactiveState, setActiveState } from './page-state.js';
import { renderSimilarPromos } from './similar-promos.js';
import { setAddress } from './form.js';

const OBJECT_QUANTITY = 10;

const DEFAULT_FILTER_VALUE = 'any';

const CoordinatesDefault = {
  LAT: 35.6894,
  LNG: 139.692,
  ZOOM: 12,
};

const MarkerSizes = {
  MAIN: {
    X: 52,
    Y: 52,
  },
  USUAL: {
    X: 40,
    Y: 40,
  },
};

const mapCanvas = document.querySelector('#map-canvas');
const mapFilterForm = document.querySelector('.map__filters');
const objectTypeFilterSelect = mapFilterForm.querySelector('[name=housing-type]');

setInactiveState();

const map = mapLib.map(mapCanvas,
  {
    scrollWheelZoom: false,
  })
  .on('load', () => {
    setActiveState();
  })
  .setView({
    lat: CoordinatesDefault.LAT,
    lng: CoordinatesDefault.LNG,
  }, CoordinatesDefault.ZOOM);

mapLib.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

const mapMainIcon = mapLib.icon({
  iconUrl: '../img/pin/main-pin.svg',
  iconSize: [MarkerSizes.MAIN.X, MarkerSizes.MAIN.Y],
  iconAnchor: [MarkerSizes.MAIN.X / 2, MarkerSizes.MAIN.Y],
  popupAnchor: [0, -MarkerSizes.MAIN.Y / 2],
});

const mainMarker = mapLib.marker(
  {
    lat: CoordinatesDefault.LAT,
    lng: CoordinatesDefault.LNG,
  },
  {
    draggable: true,
    icon: mapMainIcon,
  },
);

const setMainMarkerDefault = () => {
  mainMarker.setLatLng([CoordinatesDefault.LAT, CoordinatesDefault.LNG]);
  setAddress(CoordinatesDefault.LAT, CoordinatesDefault.LNG);
};

mainMarker.addTo(map);

const mapUsualIcon = mapLib.icon({
  iconUrl: '../img/pin/pin.svg',
  iconSize: [MarkerSizes.USUAL.X, MarkerSizes.USUAL.Y],
  iconAnchor: [MarkerSizes.USUAL.X / 2, MarkerSizes.USUAL.Y],
  popupAnchor: [0, -MarkerSizes.USUAL.Y / 2],
});

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

const setObjectFilter = (cb) => {
  objectTypeFilterSelect.addEventListener('change', () => {
    cb();
  });
};

const setUsualMarkers = (similarPromos) => {
  const usualMarkers = [];
  const popupInfo = [];

  similarPromos.slice().sort(comparePromos).slice(0, OBJECT_QUANTITY).forEach(({ author, offer, location }) => {
    const usualMarker = mapLib.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: mapUsualIcon,
      },
    );
    usualMarkers.push(usualMarker);
    popupInfo.push(renderSimilarPromos({ author, offer, location }));
  });

  usualMarkers.forEach((marker, index) => {
    marker.addTo(map).bindPopup(popupInfo[index]),
    {
      keepInView: true,
    };
  })

  setObjectFilter(() => usualMarkers.forEach((marker) => marker.remove()));
};

mainMarker.on('move', (evt) => {
  setAddress(evt.target.getLatLng().lat, evt.target.getLatLng().lng);
});

const setInitialFilterState = () => {
  objectTypeFilterSelect.value = DEFAULT_FILTER_VALUE;
}

export { setUsualMarkers, setMainMarkerDefault, setObjectFilter, setInitialFilterState };
