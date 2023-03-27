// Модуль, в котором находятся вспомогательные функции.

const idGenerator = () => {
  let lastIdValue = 0;

  return () => {
    lastIdValue += 1;
    return lastIdValue;
  };
};

const getRandomNumberGenerator = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {idGenerator, getRandomNumberGenerator, isEscapeKey};
