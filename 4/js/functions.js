// Первая функция
const checkLength = (string, number) => string.length <= number;

// Вторая функция с помощью пройденных материалов
const checkPalindrome = (string) => {
  const preparedString = string.toLowerCase().replaceAll(' ', '');
  let reverseString = '';

  for (let i = preparedString.length - 1; i >= 0; i--) {
    reverseString += preparedString.at(i);
  }
  return preparedString === reverseString;
};

// Вторая функция, второй вариант (я немного погуглил)
const checkString = (string) => {
  const preparedString = string.toLowerCase().replaceAll(' ', '');
  const reverseString = preparedString.split('').reverse().join('');
  return preparedString === reverseString;
};

// Третья функция (для дополнительного задания не нашёл решения).
// Также не очень понял как работать с функцией isNaN. Просто нашёл примеры в инете.
/* И вопрос: в строке 35 я объявляю переменную, а именно преобразовываю тип символа в число
так вот, именовать переменную как функцию или же оставить имя как для переменной?*/
const getNumber = (string) => {
  let number = '';
  for (let i = 0; i < string.length; i++) {
    const exactSign = parseInt(string.at(i), 10);
    if (!Number.isNaN(exactSign)) {
      number += exactSign;
    }
  }
  number = parseInt(number, 10);

  return number;
};

// Четвёртая функция
/* Прошу заметить при 4ой проверке из задания (имяФункции('q', 4, 'we');)
будет выводить результат 'wewq', а не 'wweq'. Это сделано специально, т.к. моя функция
учитывает вариант, в котором будет вводиться второй параметр (длина конечной строики)
в значение не только 4, но и >4. А на ретроспективе код этого не учитывал, если не ошибаюсь
в любом случае. С этой функцией долго мучался :D*/
const addString = (string, number, extraString) => {
  let newString = '';
  if (string.length >= number) {
    newString = string;
    return newString;
  }
  const difference = number - string.length;
  const howMachAdd = difference / extraString.length;
  extraString += extraString.repeat(howMachAdd);
  newString = extraString.slice(0, difference) + string;
  return newString;
};
