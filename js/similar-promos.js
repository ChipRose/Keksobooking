import { createPromos } from './data.js';

const RusCompareOfferTypes = {
  flat: 'квартира',
  bungalow: 'бунгало',
  house: 'дом',
  palace: 'дворец',
  hotel: 'отель',
};

const StepsWordsFormChanged = {
  first: 1,
  second: 4,
};

const promoTemplate = document.querySelector('#card').content.querySelector('.popup');
//const renderSimilarPromos = createPromos();

const getRightRoomGuestWordsForm = (elementsQuantity) => {
  let formWords = {
    room: 'комнат',
    guest: 'гостей',
  };
  if (elementsQuantity === StepsWordsFormChanged.first) {
    formWords = {
      room: 'комната',
      guest: 'гостя',
    }
  }
  if (elementsQuantity > StepsWordsFormChanged.first && elementsQuantity <= StepsWordsFormChanged.second) {
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
    allFeatures.forEach((element) => {
      if (element.classList.contains(`popup__feature--${feature}`)) {
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

const renderSimilarPromos = (similarPromos) => {
  similarPromos.forEach(({ author, offer, location }) => {
    const popupElement = promoTemplate.cloneNode(true);
    popupElement.querySelector('.popup__avatar').src = author.avatar;
    popupElement.querySelector('.popup__title').textContent = offer.title;
    popupElement.querySelector('.popup__text--address').textContent = offer.address;
    popupElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    popupElement.querySelector('.popup__type').textContent = RusCompareOfferTypes[offer.type];
    popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    popupElement.querySelector('.popup__text--capacity').textContent = getPhraseForAvailableRooms(offer.rooms, offer.guests);
    //showAvailableFeatures(popupElement.querySelectorAll('.popup__feature'), offer.features);
    popupElement.querySelector('.popup__description').textContent = offer.description;
    //showOfferPhotos(popupElement.querySelector('.popup__photos'), offer.photos);
    //console.log(popupElement);
    //

    return popupElement;
  });
}

export { renderSimilarPromos };
