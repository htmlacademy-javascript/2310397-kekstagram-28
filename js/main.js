const DESCRIPTIONS = [
  'Новое фото',
  'Делюсь фотографией',
  'Моё первое фото',
  'Очередное фото',
  'Что-то в этом фото мне нравится, делюсь с вами',
  'Просто выложил',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Зинаида Афанасьевна',
  'Джони',
  'Эдвард',
  'Линда',
  'Валюша',
];

// url и id
const idGenerator = () => {
  let lastIdValue = 0;

  return () => {
    lastIdValue += 1;
    return lastIdValue;
  };
};

const generatePhotoId = idGenerator();
const generateCommentId = idGenerator();


const getRandomNumberGenerator = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = (element) => element[getRandomNumberGenerator(0, element.length - 1)];


const comment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomNumberGenerator(1, 6)}.svg`,
  message: getRandomElement(MESSAGES),
  name: getRandomElement(NAMES),
});

const getPhotoInfo = () => {
  const id = generatePhotoId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomNumberGenerator(15, 200),
    comments: Array.from({length: 2}, comment),
  };
};


const photos = Array.from({length: 25}, getPhotoInfo);
