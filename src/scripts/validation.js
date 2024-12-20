//функция показа ошибки валидации
const showInputError = (formElement, inputElement, errorMessage, configValidat) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add(configValidat['inputErrorClass']);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configValidat['errorClass']);
};

//функция сокрытия ошибки валидации
const hideInputError = (formElement, inputElement, configValidat) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove(configValidat['inputErrorClass']);
  errorElement.classList.remove(configValidat['errorClass']);
  errorElement.textContent = '';
  inputElement.setCustomValidity('');
};

//функция установки кастомного сообщения при ошибках
const setCustomMsg = (inputElement, configValidat) => {
  if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessageValid);
  } else {
      inputElement.setCustomValidity('');
  }
};

//провека полей на валидность
export const isValid = (formElement, inputElement, configValidat) => {
  setCustomMsg(inputElement, configValidat);
  if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      showInputError(formElement, inputElement, inputElement.validationMessage, configValidat);
  } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      hideInputError(formElement, inputElement, configValidat);
  }
};

//функция поиска невалидных полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
  });
};

const toggleButtonState = (valueParamtr, buttonElement, configValidat) => {
  // Если есть хотя бы один невалидный инпут
  if (valueParamtr) {
      // сделай кнопку неактивной
      buttonElement.disabled = true;
      buttonElement.classList.add(configValidat['inactiveButtonClass']);
  } else {
      // иначе сделай кнопку активной
      buttonElement.disabled = false;
      buttonElement.classList.remove(configValidat['inactiveButtonClass']);
  }
};

//листенер на валидацию полей
export const setEventListeners = (formElement, configValidat) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(configValidat['inputSelector']));
  const buttonElement = formElement.querySelector(configValidat['submitButtonSelector']);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
          // Внутри колбэка вызовем isValid,
          // передав ей форму и проверяемый элемент
          isValid(formElement, inputElement, configValidat);
          toggleButtonState(hasInvalidInput(inputList), buttonElement, configValidat);
      });
  });
};

//функция валидации всех форм
export const enableValidation = (configValidat) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(configValidat['formSelector']));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement, configValidat);
  });
};

//функция очистки сообщений валидации и смены состояния кнопки
export function clearValidation(formElement, configVal, configValidat) {
  const inputList = Array.from(formElement.querySelectorAll(configValidat['inputSelector']));
  const buttonElement = formElement.querySelector(configValidat['submitButtonSelector']);
  toggleButtonState(hasInvalidInput(inputList), buttonElement, configValidat);
  if (configVal['errorMsgClear']) {
      inputList.forEach(function (item) {
          hideInputError(formElement, item, configValidat);
          toggleButtonState(false, buttonElement, configValidat);
      });
  }
};