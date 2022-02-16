const GET_LINK = 'https://23.javascript.pages.academy/keksobooking/data';
const POST_LINK = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  fetch(GET_LINK)
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
  fetch(POST_LINK,
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
