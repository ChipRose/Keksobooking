import { mapLib } from './libraries.js';
import { renderSimilarPromos } from './similar-promos.js';
import { setAddress, clearForm, setPromoFormSubmit } from './form.js';
import { setObjectTypeFilter, setObjectPriceFilter, setObjectRoomsFilter, setObjectCapacityFilter, setObjectFeaturesFilter, compareCallBack } from './filter-form.js';
import { setInactiveFilterState, setActiveFilterState, setInactiveOfferFormState, setActiveOfferFormState } from './page-state.js';

const OBJECT_QUANTITY = 10;

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

setInactiveOfferFormState();
setInactiveFilterState();

const map = mapLib.map(mapCanvas,
  {
    scrollWheelZoom: false,
  })
  .on('load', () => {
    setActiveOfferFormState();
    setActiveFilterState();
  });

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

mainMarker.addTo(map);

const setMapDefault = () => {
  map.setView({
    lat: CoordinatesDefault.LAT,
    lng: CoordinatesDefault.LNG,
  }, CoordinatesDefault.ZOOM);
};

const mapUsualIcon = mapLib.icon({
  iconUrl: '../img/pin/pin.svg',
  iconSize: [MarkerSizes.USUAL.X, MarkerSizes.USUAL.Y],
  iconAnchor: [MarkerSizes.USUAL.X / 2, MarkerSizes.USUAL.Y],
  popupAnchor: [0, -MarkerSizes.USUAL.Y / 2],
});

const setUsualMarkers = (similarPromos) => {
  const usualMarkers = [];
  const popupInfo = [];

  similarPromos.slice().sort(compareCallBack()).slice(0, OBJECT_QUANTITY).forEach((promo) => {
    const { location } = promo;
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
    popupInfo.push(renderSimilarPromos(promo));
  });

  usualMarkers.forEach((marker, index) => {
    marker.addTo(map).bindPopup(popupInfo[index]),
    {
      keepInView: true,
    };
  })

  setObjectTypeFilter(() => removeMarker(usualMarkers));
  setObjectPriceFilter(() => removeMarker(usualMarkers));
  setObjectRoomsFilter(() => removeMarker(usualMarkers));
  setObjectCapacityFilter(() => removeMarker(usualMarkers));
  setObjectFeaturesFilter(() => removeMarker(usualMarkers));
  clearForm(() => removeMarker(usualMarkers));
  setPromoFormSubmit(() => removeMarker(usualMarkers));
};

const setMainMarkerDefault = () => {
  mainMarker.setLatLng([CoordinatesDefault.LAT, CoordinatesDefault.LNG]);
  setAddress(CoordinatesDefault.LAT, CoordinatesDefault.LNG);
};

const setAddressDefault = () => {
  setAddress(CoordinatesDefault.LAT, CoordinatesDefault.LNG);
}

const setInitialMapState = () => {
  setMapDefault();
  setMainMarkerDefault();
  setAddressDefault();
};

setInitialMapState();

const removeMarker = (markers) => {
  markers.forEach((marker) => marker.remove());
};

mainMarker.on('move', (evt) => {
  setAddress(evt.target.getLatLng().lat, evt.target.getLatLng().lng);
});

export { setUsualMarkers, setInitialMapState, setMapDefault };
