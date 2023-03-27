import { isEscapeKey } from './util.js';
import { renderComments } from './render-comments.js';

const bigPhoto = document.querySelector('.big-picture');
const photoContainer = document.querySelector('.pictures');

const bigPictureImage = bigPhoto.querySelector('.big-picture__img');
const likesCount = bigPhoto.querySelector('.likes-count');
const commentsCount = bigPhoto.querySelector('.comments-count');
const photoDescription = bigPhoto.querySelector('.social__caption');
const currentCommentsCount = bigPhoto.querySelector('.social__comment-count');
const commentsLoader = bigPhoto.querySelector('.comments-loader');

const bigPhotoCancel = bigPhoto.querySelector('.big-picture__cancel');

// Коллбэк для обработчика клика для закрытия полноэкранного показа изображения
const onCrossClick = (evt) => {
  evt.preventDefault();
  bigPhoto.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  bigPhotoCancel.removeEventListener('click', onCrossClick);
};
// Коллбэк для обработчика нажатия 'escape' для закрытия полноэкранного показа изображения
const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPhoto.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    bigPhotoCancel.removeEventListener('click', onCrossClick);
  }
};
// Добавление документу обработчика нажатия 'escape' для закрытия полноэкранного показа изображения
document.addEventListener('keydown', onDocumentEscKeydown);

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
  photoContainer.addEventListener('click', (evt) => {
    const currentTarget = evt.target.closest('.picture');
    if (currentTarget) {
      bigPhoto.classList.remove('hidden');
      // Связывание элемента массива с данными фото с выбранной миниатюрой через дата-атрибут
      const currentPhoto = photos.find((item) =>
        item.id === Number(currentTarget.dataset.miniaturesId));

      // Вызов функции добавления данных большому фото
      createBigPhotoDescription(currentPhoto);

      currentCommentsCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
      document.querySelector('body').classList.add('modal-open');

      bigPhotoCancel.addEventListener('click', onCrossClick);
    }
  });
};

export {renderBigPicture};
