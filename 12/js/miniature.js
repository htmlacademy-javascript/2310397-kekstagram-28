import { renderBigPicture } from './big-picture-rendering.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const renderMiniatures = (photos) => {
  picturesContainer.querySelectorAll('.picture').forEach((element) => element.remove());
  const photoListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.addEventListener('click', () => {
      renderBigPicture(photo);
    });

    photoListFragment.appendChild(photoElement);
  });

  picturesContainer.appendChild(photoListFragment);
};

export {renderMiniatures};

