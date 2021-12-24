import {createPromos} from './data.js';

const promoTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const similarPromos = createPromos();
const similarListFragment = document.createDocumentFragment();

similarPromos.forEach(({author, offer})=>{
  const promoItem = promoTemplate.cloneNode(true);
  promoItem.querySelector('.popup__title').textContent = offer.title;
  promoItem.querySelector('.popup__text--address').textContent = offer.address;
  promoItem.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  promoItem.querySelector('.popup__type').textContent = offer.type; //???
  promoItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  promoItem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`; //?????
  promoItem.querySelector('.popup__features').textContent = offer.features.join(', '); //???
  promoItem.querySelector('.popup__description').textContent = offer.description;
  promoItem.querySelector('.popup__avatar').src = author.avatar;
  similarListFragment.appendChild(promoItem);
});

mapCanvas.appendChild(similarListFragment).content;


/*

В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями:
Квартира для flat
Бунгало для bungalow
Дом для house
Дворец для palace
В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
Если данных для заполнения не хватает, соответствующий блок в карточке скрывается.

Отрисуйте один из сгенерированных DOM-элементов, например первый, в блок #map-canvas, чтобы проверить, что данные в разметку были вставлены корректно.
*/
