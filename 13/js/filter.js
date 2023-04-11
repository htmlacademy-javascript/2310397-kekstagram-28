const PICTURES_COUNT = 10;
const FilterId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};


const filterElement = document.querySelector('.img-filters');
let currentFilter = FilterId.DEFAULT;
let photos;

const sortRandomly = () => Math.random() - 0.5;

function sortByComments(photoA, photoB) {
  return photoB.comments.length - photoA.comments.length;
}


const getFilteredPhotos = () => {
  if(currentFilter === FilterId.RANDOM) {
    return photos.slice().sort(sortRandomly).slice(0, PICTURES_COUNT);
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
