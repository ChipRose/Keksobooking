import { setInactiveState, setActiveState } from './page-state.js';
import { mapLib } from './map-library.js';
import { setAddress } from './form.js';
import { createPromos } from './data.js';
import {createCustomPopup, similarPromos} from './promo.js'

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
  }
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

var mapMainPin = mapLib.icon({
  iconUrl: '../img/pin/main-pin.svg',
  iconSize: [MARKER_SIZES.MAIN.X, MARKER_SIZES.MAIN.Y],
  iconAnchor: [MARKER_SIZES.MAIN.X / 2, MARKER_SIZES.MAIN.Y],
  popupAnchor: [-3, -76],
});

const mainMarker = mapLib.marker({
  lat: COORDINATES_TOKYO.LAT,
  lng: COORDINATES_TOKYO.LNG,
},
  {
    draggable: true,
    icon: mapMainPin,
  },
);

mainMarker.addTo(map);

var mapUsualPin = mapLib.icon({
  iconUrl: '../img/pin/pin.svg',
  iconSize: [MARKER_SIZES.USUAL.X, MARKER_SIZES.USUAL.Y],
  iconAnchor: [MARKER_SIZES.USUAL.X / 2, MARKER_SIZES.USUAL.Y],
  popupAnchor: [-3, -76],
});

createPromos();

const setUsualMarker = (offer, index) => {
  const usualMarker = mapLib.marker({
    lat: offer.location.x,
    lng: offer.location.y,
  },
    {
      icon: mapUsualPin,
    },
  );
  usualMarker
    .addTo(map)
    .bindPopup(createCustomPopup(offer));
};

similarPromos.forEach((element,index) => {
  setUsualMarker(element,index);
});

setAddress(COORDINATES_TOKYO.LAT, COORDINATES_TOKYO.LNG);

mainMarker.on('move', (evt) => {
  setAddress(evt.target.getLatLng().lat, evt.target.getLatLng().lng);
});


