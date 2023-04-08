// import { isEscapeKey } from './util';
// import { onFormEscKeydown } from './form';

const body = document.querySelector('body');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const errorElement = errorTemplate.cloneNode(true);
const successElement = successTemplate.cloneNode(true);

const isEscapeKey = (evt) => evt.key === 'Escape';

const errorEscKeydown = (formClose) => (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.addEventListener('keydown', formClose);
    errorElement.remove();
  }
};

const addError = (formClose, onErrorEscKeydown) => {
  document.removeEventListener('keydown', formClose);
  document.addEventListener('keydown', onErrorEscKeydown, {once: true});
  const errorButton = errorElement.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    errorElement.remove();
    document.removeEventListener('keydown', onErrorEscKeydown);
    document.addEventListener('keydown', formClose);
  }, {once: true});
  body.appendChild(errorElement);
};


const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successElement.remove();
    document.removeEventListener('keydown', onSuccessEscKeydown);
  }
};

const addSuccess = () => {
  document.addEventListener('keydown', onSuccessEscKeydown, {once: true});
  const successButton = successElement.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    successElement.remove();
    document.removeEventListener('keydown', onSuccessEscKeydown);
  }, {once: true});
  body.appendChild(successElement);
};


export {addError, errorEscKeydown, addSuccess};
