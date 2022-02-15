const PROMO_QUANTITY = 10;

const Default = {
  OBJECT_TYPE: 'flat',
};

const RusCompareOfferTypes = {
  FLAT: 'квартира',
  BUNGALOW: 'бунгало',
  HOUSE: 'дом',
  PALACE: 'дворец',
  HOTEL: 'отель',
};

const StepsWordsFormChanged = {
  FIRST: 1,
  SECOND: 4,
};

const promoTemplate = document.querySelector('#card').content.querySelector('.popup');

const getRightRoomGuestWordsForm = (elementsQuantity) => {
  let formWords = {
    ROOM: 'комнат',
    GUEST: 'гостей',
  };
  if (elementsQuantity === StepsWordsFormChanged.FIRST) {
    formWords.ROOM = 'комната';
    formWords.GUEST = 'гостя';
  }
  if (elementsQuantity > StepsWordsFormChanged.FIRST && elementsQuantity <= StepsWordsFormChanged.SECOND) {
    formWords.ROOM = 'комнаты';
  }
  return formWords;
};

const createPhraseForAvailableRooms = (roomsQuantity, guestQuantity) => {
  return `${roomsQuantity} ${getRightRoomGuestWordsForm(roomsQuantity).ROOM} для ${guestQuantity} ${getRightRoomGuestWordsForm(guestQuantity).GUEST}`
};

const showOfferPhotos = (parentBlock, availablePhotos) => {
  const photoTemplate = parentBlock.querySelector('.popup__photo');
  const photoFragment = document.createDocumentFragment();
  availablePhotos.forEach((photo, index) => {
    let photoItem = photoTemplate;
    if (index >= 1) {
      photoItem = photoTemplate.cloneNode(true);
    }
    photoItem.src = photo;
    photoFragment.appendChild(photoItem);
  });
  parentBlock.appendChild(photoFragment);
};

const showOfferFeatures = (parentBlock, availableFeatures) => {
  const allFeatures = parentBlock.querySelectorAll('.popup__feature');
  allFeatures.forEach((element) => {
    element.classList.add('hidden');
  })
  availableFeatures.forEach((feature) => {
    parentBlock.querySelector(`.popup__feature--${feature}`).classList.remove('hidden');
  })
};

const showAvailableProperties = (parentBlock, availableProperty) => {
  if (!availableProperty) {
    parentBlock.classList.add('hidden')
  } else if (parentBlock.classList.contains('popup__photos')) {
    showOfferPhotos(parentBlock, availableProperty);
  } else if (parentBlock.classList.contains('popup__features')) {
    showOfferFeatures(parentBlock, availableProperty);
  }
};

const renderSimilarPromos = ({ author, offer }) => {
  const popupElement = promoTemplate.cloneNode(true);
  popupElement.querySelector('.popup__avatar').src = author.avatar;
  popupElement.querySelector('.popup__title').textContent = offer.title;
  popupElement.querySelector('.popup__text--address').textContent = offer.address;
  popupElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent = RusCompareOfferTypes[offer.type.toUpperCase()];
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  popupElement.querySelector('.popup__text--capacity').textContent = createPhraseForAvailableRooms(offer.rooms, offer.guests);
  showAvailableProperties(popupElement.querySelector('.popup__features'), offer.features);
  popupElement.querySelector('.popup__description').textContent = offer.description;
  showAvailableProperties(popupElement.querySelector('.popup__photos'), offer.photos);
  return popupElement;
};

export { renderSimilarPromos, getRightRoomGuestWordsForm };
