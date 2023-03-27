import { isEscapeKey } from './util.js';
import { renderComments } from './render-comments.js';

const bigPhoto = document.querySelector('.big-picture');

const bigPictureImage = bigPhoto.querySelector('.big-picture__img');
const likesCount = bigPhoto.querySelector('.likes-count');
const commentsCount = bigPhoto.querySelector('.comments-count');
const photoDescription = bigPhoto.querySelector('.social__caption');
const currentCommentsCount = bigPhoto.querySelector('.social__comment-count');
const commentsLoader = bigPhoto.querySelector('.comments-loader');

const bigPhotoCancel = bigPhoto.querySelector('.big-picture__cancel');

// Коллбэк для обработчика клика для закрытия полноэкранного показа изображения
function onCrossClick(evt) {
  evt.preventDefault();
  bigPhoto.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  bigPhotoCancel.removeEventListener('click', onCrossClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
}
// Коллбэк для обработчика нажатия 'escape' для закрытия полноэкранного показа изображения
function onDocumentEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPhoto.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    bigPhotoCancel.removeEventListener('click', onCrossClick);
    document.removeEventListener('keydown', onDocumentEscKeydown);
  }
}

// Функция добавления данных большому фото
const createBigPhotoDescription = (photo) => {
  bigPictureImage.querySelector('img').src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  photoDescription.textContent = photo.description;
  // Добавление комментариев под большое фото из модуля 'render-comments.js'
  renderComments(photo.comments);
};


const renderBigPicture = (photos) => {
  bigPhoto.classList.remove('hidden');
  createBigPhotoDescription(photos);

  currentCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  bigPhotoCancel.addEventListener('click', onCrossClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
};

export {renderBigPicture};
