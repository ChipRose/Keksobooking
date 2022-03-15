import { setInitialFormState } from "../form";
import { setInitialFilterState } from "../filter-form";
import { setInitialMapState } from "../map";

const ALERT_SHOW_TIME = 3000;

const keys = {
  escape: 'Escape',
  esc: 'ESC',
};

const body = document.querySelector('body');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');

const isEscape = (evt) => {
  return evt.key === keys.esc || evt.key === keys.escape;
}

const showMessage = (template, buttonClose) => {

  body.appendChild(template);

  template.addEventListener('click', () => {
    body.removeChild(template);
  })

  document.addEventListener('keydown', (evt) => {
    if (isEscape(evt)) {
      body.removeChild(template);
      document.removeEventListener('keydown', (evt));
    }
  });

  if (buttonClose) {
    const button = elementTemplate.querySelector(`.${buttonClose}`);
    button.addEventListener('click', () => {
      body.removeChild(template);;
    })
  }
};

const setSuccessState = () => {
  showMessage(templateSuccess);
  setInitialFormState();
  setInitialFilterState();
  setInitialMapState();
};

const setErrorState = () => {
  showMessage(templateError);
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

const showAllertMessage = () => {
  const element = createErrorMessage();
  body.appendChild(element);

  setTimeout(() => {
    body.removeChild(element);
  }, ALERT_SHOW_TIME);
};

export { setSuccessState, setErrorState, showAllertMessage};
