const ALERT_SHOW_TIME = 3000;

const body = document.querySelector('body');

const createMessage = (templateID, contentClass) => {
  const template = document.querySelector(`#${templateID}`).content.querySelector(`.${contentClass}`);
  const elementTemplate = template.cloneNode(true);
  return elementTemplate;
};

const showMessage = (template, buttonClose) => {
  body.appendChild(template);
  template.addEventListener('click', () => {
    template.remove();
  })

  document.addEventListener('keydown', (evt) => {
    if (evt.key === ('Escape' || 'Esc')) {
      template.remove();
    }
  });

  if (buttonClose) {
    const button = template.querySelector(`.${buttonClose}`);
    button.addEventListener('click', () => {
      template.remove();
    })
  }
};

const createErrorMessage = () => {
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
  errorContainer.textContent = 'Не удалось загрузить данные';
  return errorContainer;
};

const showAllertMessage = (template) => {
  const element = template();
  body.appendChild(element);

  setTimeout(() => {
    body.removeChild(element);
  }, ALERT_SHOW_TIME);
};

export { createMessage, showMessage, createErrorMessage, showAllertMessage };
