import { getRandomNumberGenerator } from './util.js';

const PICTURES_COUNT = 10;
const FilterId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};


const filterElement = document.querySelector('.img-filters');
let currentFilter = FilterId.DEFAULT;
let photos;


const shufflePhotos = (photosArray) => {
  let lastPhotoElement = photosArray.length;
  while (lastPhotoElement !== 0) {
    lastPhotoElement--;
    const anotherPhotoElement = Math.floor(Math.random() * lastPhotoElement);
    const swap = photosArray[lastPhotoElement];
    photosArray[lastPhotoElement] = photosArray[anotherPhotoElement];
    photosArray[anotherPhotoElement] = swap;
  }
  return photosArray;
};


let tempPhotos = [];

const getPhotosForRandomShuffling = (photosArray) => {
  const tempFirstPhotoElement = getRandomNumberGenerator(0, photosArray.length);

  if (tempFirstPhotoElement > photosArray.length - PICTURES_COUNT) {
    tempPhotos = photosArray.slice(tempFirstPhotoElement, photosArray.length);
    const secondPartPhotos = photosArray.slice(0, PICTURES_COUNT - (photosArray.length - tempFirstPhotoElement));
    Array.prototype.push.apply(tempPhotos, secondPartPhotos);
  } else {
    tempPhotos = photosArray.slice(tempFirstPhotoElement, tempFirstPhotoElement + PICTURES_COUNT);
  }
};


const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;


const getFilteredPhotos = () => {
  if(currentFilter === FilterId.RANDOM) {
    if (photos.length <= PICTURES_COUNT) {
      return shufflePhotos(photos.slice());
    }
    getPhotosForRandomShuffling(photos);
    return shufflePhotos(tempPhotos);
  } else if (currentFilter === FilterId.DISCUSSED) {
    return photos.slice().sort(sortByComments);
  } else {
    return photos;
  }
};


const setOnFilterClick = (cb) => {
  filterElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    filterElement.querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    cb(getFilteredPhotos());
  });
};

const initialGalary = (loadedPhotos, debounce) => {
  filterElement.classList.remove('img-filters--inactive');
  photos = loadedPhotos;
  setOnFilterClick(debounce);
};

export {getFilteredPhotos, initialGalary};
