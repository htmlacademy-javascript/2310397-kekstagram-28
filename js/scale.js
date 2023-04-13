const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const imagePreview = document.querySelector('.img-upload__preview img');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');


const scaleImagePreview = (value) => {
  imagePreview.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentScaleValue = parseInt(scaleValue.value, 10);
  let newScaleValue = currentScaleValue - SCALE_STEP;
  newScaleValue = (newScaleValue < MIN_SCALE) ? MIN_SCALE : newScaleValue;

  scaleImagePreview(newScaleValue);
};

const onBiggerButtonClick = () => {
  const currentScaleValue = parseInt(scaleValue.value, 10);
  let newScaleValue = currentScaleValue + SCALE_STEP;
  newScaleValue = (newScaleValue > MAX_SCALE) ? MAX_SCALE : newScaleValue;

  scaleImagePreview(newScaleValue);
};


const addScaleActive = () => {
  scaleImagePreview(DEFAULT_SCALE);
  scaleSmallerButton.addEventListener('click', onSmallerButtonClick);
  scaleBiggerButton.addEventListener('click', onBiggerButtonClick);
};

const removeScaleActive = () => {
  scaleSmallerButton.removeEventListener('click', onSmallerButtonClick);
  scaleBiggerButton.removeEventListener('click', onBiggerButtonClick);
};

export {addScaleActive, removeScaleActive};
