import { isEscapeKey } from './util.js';

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

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const onFocusTextFields = () => {
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

const onBlurTextFields = () => {
  document.addEventListener('keydown', onDocumentEscKeydown);
};

const addFocusAndBlurAction = () => {
  hashTagField.addEventListener('focus', onFocusTextFields);
  hashTagField.addEventListener('blur', onBlurTextFields);
  descriptionField.addEventListener('focus', onFocusTextFields);
  descriptionField.addEventListener('blur', onBlurTextFields);
};

const removeFocusAndBlurAction = () => {
  hashTagField.removeEventListener('focus', onFocusTextFields);
  hashTagField.removeEventListener('blur', onBlurTextFields);
  descriptionField.removeEventListener('focus', onFocusTextFields);
  descriptionField.removeEventListener('blur', onBlurTextFields);
};

const openLoadFileField = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
  crossButton.addEventListener('click', onCrossClick);
  addFocusAndBlurAction();
};

const hideLoadFileField = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);
  crossButton.removeEventListener('click', onCrossClick);
  removeFocusAndBlurAction();
};

const onLoadFileFieldClick = () => {
  openLoadFileField();
};


function onDocumentEscKeydown(evt) {
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

const checkHashtagsUnique = (hashtags) => {
  const lowerCaseTags = hashtags.map((hashtag) => hashtag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateHashtags = (value) => {
  const hashtags = value.trim()
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
