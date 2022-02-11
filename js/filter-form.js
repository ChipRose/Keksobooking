

const mapFilterForm = document.querySelector('.map__filters');
const objectTypeFilterSelect = mapFilterForm.querySelector('[name=housing-type]');

const getPromoRank = (promo) => {
  let rank = 0;
  const objectTypeFilter = objectTypeFilterSelect.value;
  if (promo.offer.type === (objectTypeFilter || Default.OBJECT_TYPE)) {
    rank += 3;
  }
  return rank;
};

const comparePromos = (promoA, promoB) => {
  const rankA = getPromoRank(promoA);
  const rankB = getPromoRank(promoB);
  return (rankB - rankA);
};

objectTypeFilterSelect.addEventListener('change', () => {

});

export {comparePromos};

//Запрограммировать фильтр «Тип жилья»
//Фильтрация производится при изменении значений соответствующих полей формы .map__filters
//При изменении фильтров открытый балун (при наличии) должен быть скрыт
