const getData = (onSuccess, onError) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        const promos = response.json();
        return promos;
      } else {
        onError()
      }
    })
    .then((promos) => onSuccess(promos))
    .catch(() => onError());
};

const sendData = (onSuccess, onError, body) => {
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
      }
      else {
        onError();
      }
    })
    .catch(() => onError());
};

export { getData, sendData };
