const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;


const renderMiniatures = (photos) => {
  const photoListFragment = document.createDocumentFragment();

  photos.forEach(({url, likes, comments, id}) => {
    const photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('.picture__img').dataset.miniaturesId = id;
    photoListFragment.appendChild(photoElement);
  });
  picturesContainer.appendChild(photoListFragment);
};

export {renderMiniatures};

