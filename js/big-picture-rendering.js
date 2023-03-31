import { isEscapeKey } from './util.js';
import { createComments } from './render-comments.js';

const bigPhoto = document.querySelector('.big-picture');
const bigPictureImage = bigPhoto.querySelector('.big-picture__img');
const likesCount = bigPhoto.querySelector('.likes-count');
const commentsCountShown = bigPhoto.querySelector('.social__comment-count');
const photoDescription = bigPhoto.querySelector('.social__caption');
const commentsLoader = bigPhoto.querySelector('.comments-loader');
const bigPhotoCancel = bigPhoto.querySelector('.big-picture__cancel');


const COMMENTS_PORTION_COUNT = 5;
let currentCommentsShown = null;

const checkCommentsLength = (photo) => {
  if (currentCommentsShown >= photo.comments.length) {
    commentsLoader.classList.add('hidden');
    currentCommentsShown = photo.comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

// Функция добавления данных большому фото
const createBigPhotoDescription = (photo) => {
  bigPictureImage.querySelector('img').src = photo.url;
  likesCount.textContent = photo.likes;
  photoDescription.textContent = photo.description;
};


const renderBigPicture = (photos) => {
  bigPhoto.classList.remove('hidden');
  createBigPhotoDescription(photos);

  document.querySelector('body').classList.add('modal-open');

  // Блок отрисовки комментариев
  // Коллбэк для обработчика клика для отрисовки дополнительных комментариев
  const onCommentsLouderButtonClick = () => {
    currentCommentsShown += COMMENTS_PORTION_COUNT;

    checkCommentsLength(photos);
    commentsCountShown.innerHTML = `${currentCommentsShown} из <span class="comments-count">${photos.comments.length}</span> комментариев`;
    createComments(photos.comments, currentCommentsShown);
  };

  // Отрисовка начального количества комментариев под большое фото
  const renderComments = () => {
    currentCommentsShown = COMMENTS_PORTION_COUNT;
    commentsLoader.classList.remove('hidden');

    checkCommentsLength(photos);
    commentsCountShown.innerHTML = `${currentCommentsShown} из <span class="comments-count">${photos.comments.length}</span> комментариев`;
    createComments(photos.comments, currentCommentsShown);
    commentsLoader.addEventListener('click', onCommentsLouderButtonClick);
  };

  renderComments();
  // Блок отрисовки комментариев закончен

  // Функция закрытия попапа большого фото
  const closeBigPhoto = () => {
    bigPhoto.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    bigPhotoCancel.removeEventListener('click', onCrossClick);
    document.removeEventListener('keydown', onDocumentEscKeydown);
    commentsLoader.removeEventListener('click', onCommentsLouderButtonClick);
  };
  // Коллбэк для обработчика клика для закрытия полноэкранного показа изображения
  function onCrossClick(evt) {
    evt.preventDefault();
    closeBigPhoto();
  }
  // Коллбэк для обработчика нажатия 'escape' для закрытия полноэкранного показа изображения
  function onDocumentEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPhoto();
    }
  }

  bigPhotoCancel.addEventListener('click', onCrossClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
};

export {renderBigPicture};
