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

const createCustomPopup = (promo) => {
  const popupElement = promoTemplate.cloneNode(true);
  popupElement.querySelector('.popup__avatar').src = promo.author.avatar;
  popupElement.querySelector('.popup__title').textContent = promo.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = promo.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = `${promo.offer.price} ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent = RusCompareOfferTypes[promo.offer.type];
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${promo.offer.checkin}, выезд до ${promo.offer.checkout}`;
  popupElement.querySelector('.popup__text--capacity').textContent = getPhraseForAvailableRooms(promo.offer.rooms, promo.offer.guests);
  showAvailableFeatures(popupElement.querySelectorAll('.popup__feature'), promo.offer.features);
  popupElement.querySelector('.popup__description').textContent = promo.offer.description;
  showOfferPhotos(popupElement.querySelector('.popup__photos'), promo.offer.photos);
  return popupElement;
};

export { createCustomPopup };
