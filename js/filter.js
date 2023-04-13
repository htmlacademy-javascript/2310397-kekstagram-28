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


function sortByComments(photoA, photoB) {
  return photoB.comments.length - photoA.comments.length;
}


const getFilteredPhotos = () => {
  const tempPhotos = photos.slice();
  if(currentFilter === FilterId.RANDOM) {
    return shufflePhotos(tempPhotos).slice(0, PICTURES_COUNT);
  } else if (currentFilter === FilterId.DISCUSSED) {
    return tempPhotos.sort(sortByComments);
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
