import {isEscapeKey} from './util.js';

const body = document.body;
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');


const addError = (errorText, onCloseError) => {
  const errorElement = errorTemplate.cloneNode(true);
  const errorMessage = errorElement.querySelector('.error__title');
  const errorButton = errorElement.querySelector('.error__button');
  errorMessage.innerHTML = errorText;

  let closeErrorPopup = () => {};

  const onErrorEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeErrorPopup();
    }
  };

  closeErrorPopup = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onErrorEscKeydown);
    onCloseError();
  };

  errorButton.addEventListener('click', () => {
    closeErrorPopup();
  });

  errorElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('error')) {
      return;
    }
    closeErrorPopup();
  });

  document.addEventListener('keydown', onErrorEscKeydown);
  body.appendChild(errorElement);
};


const addSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  const successButton = successElement.querySelector('.success__button');

  const closeSuccessPopup = () => {
    successElement.remove();
  };

  const onSuccessEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeSuccessPopup();
      document.removeEventListener('keydown', onSuccessEscKeydown);
    }
  };

  successButton.addEventListener('click', () => {
    closeSuccessPopup();
  });

  successElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('success')) {
      return;
    }
    closeSuccessPopup();
  });

  document.addEventListener('keydown', onSuccessEscKeydown);
  body.appendChild(successElement);
};

export {addError, addSuccess};
