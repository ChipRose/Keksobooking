import {setErrorState } from './form.js';

const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        const promos = response.json();
        return promos;
      }
      setErrorState(`Ошибка загрузки данных ${response.statusText}`);
    })
    .then((promos) => onSuccess(promos))
    .catch((err) => setErrorState(`Ошибка загрузки данных ${err.status}`));
};

const sendData = (onSuccess, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        setErrorState(`Ошибка отправки формы ${response.status} ${response.statusText}`);
      }
    })
    .catch((err) => setErrorState(`Ошибка отправки данных ${err.status}`));
};

export { getData, sendData }
