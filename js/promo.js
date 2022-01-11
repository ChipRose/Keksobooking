import { createPromos } from './data.js';

const RusCompareOfferTypes = {
  flat: 'квартира',
  bungalow: 'бунгало',
  house: 'дом',
  palace: 'дворец',
  hotel: 'отель',
};

const promoTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarPromos = createPromos();
const similarListFragment = document.createDocumentFragment();


const getRightRoomGuestWordsForm = (elementsQuantity) => {
  let formWords = {
    room: 'комнат',
    guest: 'гостей',
  };
  if (elementsQuantity === 1) {
    formWords = {
      room: 'комната',
      guest: 'гостя',
    }
  }
  if (elementsQuantity > 1 && elementsQuantity <= 4) {
    formWords = {
      room: 'комнаты',
    }
  }
  return formWords;
};

const getPhraseForAvailableRooms = (roomsQuantity, guestQuantity) => {
  return `${roomsQuantity} ${getRightRoomGuestWordsForm(roomsQuantity).room} для ${guestQuantity} ${getRightRoomGuestWordsForm(guestQuantity).guest}`
};

const showAvailableFeatures = (allFeatures, availableFeatures) => {
  allFeatures.forEach((element) => {
    element.classList.add('hidden');
  });
  availableFeatures.forEach((feature) => {
    let availableFeature = feature;
    allFeatures.forEach((element) => {
      if (element.classList.contains(`popup__feature--${availableFeature}`)) {
        element.classList.remove('hidden');
      }
    });
  });
};

const showOfferPhotos = (photoBlock, availablePhotos) => {
  const photoTemplate = photoBlock.querySelector('.popup__photo');
  const photoFragment = document.createDocumentFragment();
  availablePhotos.forEach((photo, index) => {
    let photoItem = photoTemplate;
    if (index >= 1) {
      photoItem = photoTemplate.cloneNode(true);
    }
    photoItem.src = photo;
    photoFragment.appendChild(photoItem);
  });
  photoBlock.appendChild(photoFragment);
};

similarPromos.forEach(({ author, offer }) => {
  const promoItem = promoTemplate.cloneNode(true);
  promoItem.querySelector('.popup__avatar').src = author.avatar;
  promoItem.querySelector('.popup__title').textContent = offer.title;
  promoItem.querySelector('.popup__text--address').textContent = offer.address;
  promoItem.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  promoItem.querySelector('.popup__type').textContent = RusCompareOfferTypes[offer.type];
  promoItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  promoItem.querySelector('.popup__text--capacity').textContent = getPhraseForAvailableRooms(offer.rooms, offer.guests);
  showAvailableFeatures(promoItem.querySelectorAll('.popup__feature'), offer.features);
  promoItem.querySelector('.popup__description').textContent = offer.description;
  showOfferPhotos(promoItem.querySelector('.popup__photos'), offer.photos);
  similarListFragment.appendChild(promoItem);
});

export { similarPromos };
