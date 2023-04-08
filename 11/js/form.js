import { isEscapeKey, showAlert} from './util.js';
import {addScaleActive, removeScaleActive} from './scale.js';
import {addEffectActive, removeEffectActive} from './effects.js';
import {sendData} from './api.js';

const MAX_HASHTAG_COUNT = 5;
const HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_TEXT = 'Ошибка заполнения #хэштэгов';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const loadFileField = form.querySelector('#upload-file');
const hashTagField = overlay.querySelector('.text__hashtags');
const descriptionField = overlay.querySelector('.text__description');
const crossButton = overlay.querySelector('.img-upload__cancel');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const submitButton = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});


const onFocusTextFields = () => {
  document.removeEventListener('keydown', onFormEscKeydown);
};

const onBlurTextFields = () => {
  document.addEventListener('keydown', onFormEscKeydown);
};

const addFocusAndBlur = (target) => {
  target.addEventListener('focus', onFocusTextFields);
  target.addEventListener('blur', onBlurTextFields);
};

const removeFocusAndBlur = (target) => {
  target.removeEventListener('focus', onFocusTextFields);
  target.removeEventListener('blur', onBlurTextFields);
};


const addFocusAndBlurAction = () => {
  addFocusAndBlur(descriptionField);
  addFocusAndBlur(hashTagField);
};

const removeFocusAndBlurAction = () => {
  removeFocusAndBlur(descriptionField);
  removeFocusAndBlur(hashTagField);
};

const openLoadFileField = () => {
  addScaleActive();
  addEffectActive();
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);
  crossButton.addEventListener('click', onCrossClick);
  addFocusAndBlurAction();
};

const hideLoadFileField = () => {
  removeScaleActive();
  removeEffectActive();
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
  crossButton.removeEventListener('click', onCrossClick);
  removeFocusAndBlurAction();
};

const onLoadFileFieldClick = () => {
  openLoadFileField();
};


function onFormEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideLoadFileField();
  }
}

function onCrossClick(evt) {
  evt.preventDefault();
  hideLoadFileField();
}

// Валидация хэштэгов

const isValidHashtag = (tag) => HASHTAG_SYMBOLS.test(tag);

const checkHashtagsCount = (hashtags) => hashtags.length <= MAX_HASHTAG_COUNT;

const checkHashtagsUnique = (hashtags) => hashtags.length === new Set(hashtags).size;

const validateHashtags = (value) => {
  const hashtags = value.trim()
    .toLowerCase()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return checkHashtagsCount(hashtags) && checkHashtagsUnique(hashtags) && hashtags.every(isValidHashtag);
};

pristine.addValidator(
  hashTagField,
  validateHashtags,
  ERROR_TEXT
);

loadFileField.addEventListener('change', onLoadFileFieldClick);

const errorElement = errorTemplate.cloneNode(true);
const successElement = successTemplate.cloneNode(true);

const onErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.addEventListener('keydown', onFormEscKeydown);
    errorElement.remove();
    document.removeEventListener('keydown', onErrorEscKeydown);
  }
};

const addError = () => {
  document.removeEventListener('keydown', onFormEscKeydown);
  document.addEventListener('keydown', onErrorEscKeydown);
  const errorButton = errorElement.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    errorElement.remove();
    document.removeEventListener('keydown', onErrorEscKeydown);
    document.addEventListener('keydown', onFormEscKeydown);
  });
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
  document.addEventListener('keydown', onSuccessEscKeydown);
  const successButton = successElement.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    successElement.remove();
    document.removeEventListener('keydown', onSuccessEscKeydown);
  });
  body.appendChild(successElement);
};


const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Пубилкую...'
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(addSuccess())
        .catch((err) => {
          showAlert(err.message);
        })
        .finally(unblockSubmitButton);
    } else {
      addError();
    }
  });
};

setUserFormSubmit(hideLoadFileField);
