const ALERT_SHOW_TIME = 3000;

const createSuccessMessage = () => {
  const successContainer = document.querySelector('#success').content.querySelector('.success');
  return successContainer;
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

export { createErrorMessage, createSuccessMessage, showAllertMessage };
