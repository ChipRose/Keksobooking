import { mapLib } from './libraries.js';
import { setInactiveState, setActiveState } from './page-state.js';
import { renderSimilarPromos } from './similar-promos.js';
import { setAddress } from './form.js';
import { comparePromos } from './filter-form.js';

const COORDINATES_DEFAULT = {
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
    lat: COORDINATES_DEFAULT.LAT,
    lng: COORDINATES_DEFAULT.LNG,
  }, COORDINATES_DEFAULT.ZOOM);

mapLib.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mapMainIcon = mapLib.icon({
  iconUrl: '../img/pin/main-pin.svg',
  iconSize: [MARKER_SIZES.MAIN.X, MARKER_SIZES.MAIN.Y],
  iconAnchor: [MARKER_SIZES.MAIN.X / 2, MARKER_SIZES.MAIN.Y],
  popupAnchor: [0, -MARKER_SIZES.MAIN.Y / 2],
});

const mainMarker = mapLib.marker(
  {
    lat: COORDINATES_DEFAULT.LAT,
    lng: COORDINATES_DEFAULT.LNG,
  },
  {
    draggable: true,
    icon: mapMainIcon,
  },
);

const setMainMarkerDefault = () => {
  mainMarker.setLatLng([COORDINATES_DEFAULT.LAT, COORDINATES_DEFAULT.LNG]);
  setAddress(COORDINATES_DEFAULT.LAT, COORDINATES_DEFAULT.LNG);
};

mainMarker.addTo(map);

const mapUsualIcon = mapLib.icon({
  iconUrl: '../img/pin/pin.svg',
  iconSize: [MARKER_SIZES.USUAL.X, MARKER_SIZES.USUAL.Y],
  iconAnchor: [MARKER_SIZES.USUAL.X / 2, MARKER_SIZES.USUAL.Y],
  popupAnchor: [0, -MARKER_SIZES.USUAL.Y / 2],
});

const setUsualMarkers = (similarPromos) => {
  similarPromos.slice().slice(0,10).sort(comparePromos).forEach(({author, offer,location}) => {
    const usualMarker = mapLib.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: mapUsualIcon,
      },
    );
    usualMarker.addTo(map).bindPopup(renderSimilarPromos({author, offer,location})),
    {
      keepInView: true,
    };
  });
};

mainMarker.on('move', (evt) => {
  setAddress(evt.target.getLatLng().lat, evt.target.getLatLng().lng);
});

export { setUsualMarkers, setMainMarkerDefault };
