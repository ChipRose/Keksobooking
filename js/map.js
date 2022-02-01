import { setInactiveState, setActiveState } from './page-state.js';
import { setAddress } from './form.js';
import { createPromos } from './data.js';
import { renderSimilarPromos } from './similar-promos.js';
import { mapLib } from './map-lib.js';

const COORDINATES_TOKYO = {
  LAT: 35.6894,
  LNG: 139.692,
  ZOOM: 12,
};

const MARKER_SIZES = {
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

setInactiveState();

const map = mapLib.map(mapCanvas)
  .on('load', () => {
    setActiveState();
  })
  .setView({
    lat: COORDINATES_TOKYO.LAT,
    lng: COORDINATES_TOKYO.LNG,
  }, COORDINATES_TOKYO.ZOOM);

mapLib.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mapMainPin = mapLib.icon({
  iconUrl: '../img/pin/main-pin.svg',
  iconSize: [MARKER_SIZES.MAIN.X, MARKER_SIZES.MAIN.Y],
  iconAnchor: [MARKER_SIZES.MAIN.X / 2, MARKER_SIZES.MAIN.Y],
  popupAnchor: [0, -MARKER_SIZES.USUAL.Y / 2],
});

const mainMarker = mapLib.marker(
  {
    lat: COORDINATES_TOKYO.LAT,
    lng: COORDINATES_TOKYO.LNG,
  },
  {
    draggable: true,
    icon: mapMainPin,
  },
);

mainMarker.addTo(map);

const mapUsualPin = mapLib.icon({
  iconUrl: '../img/pin/pin.svg',
  iconSize: [MARKER_SIZES.USUAL.X, MARKER_SIZES.USUAL.Y],
  iconAnchor: [MARKER_SIZES.USUAL.X / 2, MARKER_SIZES.USUAL.Y],
  popupAnchor: [0, -MARKER_SIZES.USUAL.Y / 2],
});

const setUsualMarker = (promo) => {
  const usualMarker = mapLib.marker(
    {
      lat: promo.location.lat,
      lng: promo.location.lng,
    },
    {
      icon: mapUsualPin,
    },
  );
  usualMarker.addTo(map).bindPopup(renderSimilarPromos(promo)),
  {
    keepInView: true,
  };
};


setAddress(COORDINATES_TOKYO.LAT, COORDINATES_TOKYO.LNG);

mainMarker.on('move', (evt) => {
  setAddress(evt.target.getLatLng().lat, evt.target.getLatLng().lng);
});

export {setUsualMarker};
