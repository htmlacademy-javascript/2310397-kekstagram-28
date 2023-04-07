const getData = () => fetch(
  'https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    throw new Error('Не удалось поулчить данные с сервера. Попробуйте перезагрузить страницу');
  });

const sendData = (body) => fetch(
  'https://28.javascript.pages.academy/kekstagram',
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
  })
  .catch(() => {
    throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
  });


export {getData, sendData};
