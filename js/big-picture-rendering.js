

// const listComments = bigPhoto.querySelector('.social__comments');
// const bigPhotoComment = listComments.querySelector('.');


// const onPhotoClick = (evt) => {
//   if (evt.target.matches('.picture__img')) {
//     evt.preventDefault();
//     bigPhoto.classList.remove('hidden');

//     addBigPhotoInfo(photo);
//   }
// };

const bigPhoto = document.querySelector('.big-picture');
const photoContainer = document.querySelector('.pictures');
const bigPictureImage = bigPhoto.querySelector('.big-picture__img');
const likesCount = bigPhoto.querySelector('.likes-count');
const commentsCount = bigPhoto.querySelector('.comments-count');


const renderBigPicture = (photos) => {
  photoContainer.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      bigPhoto.classList.remove('hidden');

      const currentTarget = evt.target.closest('.picture');
      const currentPhoto = photos.find((item) => item.id === Number(currentTarget.dataset.miniaturesId));

      bigPictureImage.querySelector('img').src = currentPhoto.url;
      likesCount.textContent = currentPhoto.likes;
      commentsCount.textContent = currentPhoto.comments.length;
    }
  });
};




// const renderComment = (comments) => {
//   const commentListFragment = document.createDocumentFragment();
//   const commentElement = listComments.cloneNode(true);
//   listComments.innerHTML = '';

//   comments.forEach(({avatar, name, message}) => {
//     commentElement.querySelector('.social__picture').src = avatar;
//     commentElement.querySelector('.social__picture').alt = name;
//     commentElement.querySelector('.social__text').textContent = message;
//     commentListFragment.appendChild(commentElement);
//   });
//   listComments.append(commentListFragment);
// };

// const bigPhoto = document.querySelector('.big-picture');
// const photoContainer = document.querySelector('.pictures');
// const photoList = photoContainer.querySelectorAll('.picture');


// const openBigPhoto = (photo) => {

//   photo.addEventListener('click', () => {
//     const bigPhoto = document.querySelector('.big-picture');
//     bigPhoto.classList.remove('hidden');

//     const bigPictureImage = bigPhoto.querySelector('.big-picture__img');
//     const likesCount = bigPhoto.querySelector('.likes-count');
//     const commentsCount = bigPhoto.querySelector('.comments-count');

//     bigPictureImage.querySelector('img').src = photo.querySelector('.picture__img').src;
//     likesCount.textContent = photo.querySelector('.picture__likes').textContent;
//     commentsCount.textContent = photo.querySelector('.picture__comments').textContent;

//   });
// };

// const renderBigPicture = () => {
//   const photoContainer = document.querySelector('.pictures');
//   const photoList = photoContainer.querySelectorAll('.picture');

//   photoList.forEach(openBigPhoto);

// };

// const renderBigPicture = () => {
//   photoList.forEach((photo) =>{
//     photo.addEventListener('click', () => {
//       bigPhoto.classList.remove('hidden');

//       const bigPictureImage = bigPhoto.querySelector('.big-picture__img');
//       const likesCount = bigPhoto.querySelector('.likes-count');
//       const commentsCount = bigPhoto.querySelector('.comments-count');

//       bigPictureImage.querySelector('img').src = photo.querySelector('.picture__img').src;
//       likesCount.textContent = photo.querySelector('.picture__likes').textContent;
//       commentsCount.textContent = photo.querySelector('.picture__comments').textContent;

//       // renderComment(photo.comments);

//     });
//   });
// };



export {renderBigPicture};
