const PICTURES_COUNT = 10;
const FilterId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};


const filterElement = document.querySelector('.img-filters');
let currentFilter = FilterId.DEFAULT;
let photos;


const shufflePhotosAndCutPhotosCount = (pictures) => {
  const shuffledPhotos = pictures.slice();
  const shuffledPhotosLength = shuffledPhotos.length;
  for (let i = 0; i < shuffledPhotosLength && i < PICTURES_COUNT; i++) {
    const randomPhotoIndex = Math.floor(Math.random() * (shuffledPhotosLength - i) + i);
    const tempPhoto = shuffledPhotos[randomPhotoIndex];
    shuffledPhotos[randomPhotoIndex] = shuffledPhotos[i];
    shuffledPhotos[i] = tempPhoto;
  }

  return shuffledPhotos.slice(0, PICTURES_COUNT);
};


const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;


const getFilteredPhotos = () => {
  if(currentFilter === FilterId.RANDOM) {
    return shufflePhotosAndCutPhotosCount(photos);
  } else if (currentFilter === FilterId.DISCUSSED) {
    return photos.slice().sort(sortByComments);
  }
  return photos;
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
