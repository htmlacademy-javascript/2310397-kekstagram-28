const listComments = document.querySelector('.social__comments');

const renderComments = (comments) => {
  const commentListFragment = document.createDocumentFragment();
  const commentTemplate = listComments.querySelector('li');
  listComments.innerHTML = '';

  comments.forEach(({avatar, name, message}) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentListFragment.appendChild(commentElement);
  });
  listComments.appendChild(commentListFragment);
};

export {renderComments};
