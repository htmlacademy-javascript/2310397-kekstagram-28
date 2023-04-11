const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const photoUpload = document.querySelector('.img-upload__input');
const photoPreview = document.querySelector('.img-upload__preview img');

photoUpload.addEventListener('change', () => {
  const file = photoUpload.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    photoPreview.src = URL.createObjectURL(file);
  }
});
