const listComments = document.querySelector('.social__comments');
const commentTemplate = listComments.querySelector('li');
const bigPhoto = document.querySelector('.big-picture');
const currentCommentsCount = bigPhoto.querySelector('.social__comment-count');
const commentsLoader = bigPhoto.querySelector('.comments-loader');


// let currentCommentsShown = 5;

// const createComment = (comment) => {
//   const commentElement = commentTemplate.cloneNode(true);
//   commentElement.querySelector('.social__picture').src = comment.avatar;
//   commentElement.querySelector('.social__picture').alt = comment.name;
//   commentElement.querySelector('.social__text').textContent = comment.message;
// };


// const renderComments = () => {
//   currentCommentsShown += currentCommentsShown;

//   if (currentCommentsShown >= comments.length)
// };



const renderComments = (comments, currentCommentsShown) => {
  const commentListFragment = document.createDocumentFragment();
  listComments.innerHTML = '';

  for (let i = 0; i < currentCommentsShown; i++) {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comments[i].avatar;
    commentElement.querySelector('.social__picture').alt = comments[i].name;
    commentElement.querySelector('.social__text').textContent = comments[i].message;
    commentListFragment.appendChild(commentElement);
  }
  // console.log(commentListFragment.children[1]);
  listComments.appendChild(commentListFragment);
};




export {renderComments};
