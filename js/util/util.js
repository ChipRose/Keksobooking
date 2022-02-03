const ALERT_SHOW_TIME = 3000;

const showAllertMessage = (template) => {
  const body = document.querySelector('body');
  body.appendChild(template);

  setTimeout(() => {
    body.removeChild(template);;
  }, ALERT_SHOW_TIME);
};

export { showAllertMessage };
