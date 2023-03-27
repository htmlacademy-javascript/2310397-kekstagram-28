import { renderBigPicture } from './big-picture-rendering.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const renderMiniatures = (photos) => {
  const photoListFragment = document.createDocumentFragment();

  photos.forEach((picture) => {
    const photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = picture.url;
    photoElement.querySelector('.picture__likes').textContent = picture.likes;
    photoElement.querySelector('.picture__comments').textContent = picture.comments.length;
    photoElement.addEventListener('click', () => {
      renderBigPicture(picture);
    });

    photoListFragment.appendChild(photoElement);
  });

  picturesContainer.appendChild(photoListFragment);
};

export {renderMiniatures};

