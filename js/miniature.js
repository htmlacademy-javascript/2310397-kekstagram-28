import {getPhoto} from './data.js';
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const photos = Array.from({length: 25}, getPhoto);
const photoListFragment = document.createDocumentFragment();

photos.forEach(({url, likes, comments}) => {
  const photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoListFragment.appendChild(photoElement);
});

picturesContainer.appendChild(photoListFragment);
