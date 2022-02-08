const ALERT_SHOW_TIME = 3000;

const createSuccessMessage = () => {
  const successContainer = document.querySelector('#success').content.querySelector('.success');
  const successElement = successContainer.cloneNode(true);
  return successElement;
};

const createErrorMessage = (message) => {
  const createMessage = () => {
    const errorContainer = document.createElement('div');
    errorContainer.style.zIndex = 100;
    errorContainer.style.position = 'absolute';
    errorContainer.style.left = '10px';
    errorContainer.style.top = '10px';
    errorContainer.style.right = '10px';
    errorContainer.style.padding = '5px 10px';
    errorContainer.style.fontSize = '20px';
    errorContainer.style.textAlign = 'center';
    errorContainer.style.backgroundColor = 'tomato';
    errorContainer.style.border = '3px solid white';
    errorContainer.style.borderRadius = '5px';
    errorContainer.textContent = message;
    return errorContainer;
  };
  return createMessage;
};

const showAllertMessage = (template, message) => {
  const body = document.querySelector('body');
  const messageElement = template(message);
  body.appendChild(messageElement);

  setTimeout(() => {
    body.removeChild(messageElement);
  }, ALERT_SHOW_TIME);
};

const showSuccessMessage = (template) => {
  const body = document.querySelector('body');
  const messageElement = template();
  body.appendChild(messageElement);

  messageElement.addEventListener('click', () => {
    body.removeChild(messageElement);
  })

  document.addEventListener('keydown', (evt) => {
    if (evt.key === ('Escape' || 'Esc')) {
      body.removeChild(messageElement);
    }
  });
};

export { createErrorMessage, createSuccessMessage, showAllertMessage, showSuccessMessage };
