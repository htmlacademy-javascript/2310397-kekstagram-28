const listComments = document.querySelector('.social__comments');
const commentTemplate = listComments.querySelector('li');

const createComments = (comments, currentCommentsShown) => {
  const commentListFragment = document.createDocumentFragment();
  listComments.innerHTML = '';

  for (let i = 0; i < currentCommentsShown; i++) {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comments[i].avatar;
    commentElement.querySelector('.social__picture').alt = comments[i].name;
    commentElement.querySelector('.social__text').textContent = comments[i].message;
    commentListFragment.appendChild(commentElement);
  }
  listComments.appendChild(commentListFragment);
};

export {createComments};
