// Функция, которая добавляет класс с ошибкой
const showInputError = (formObject,formSelector,inputSelector, errorMessage) => {
  const errorClass = formSelector.querySelector(`#${inputSelector.id}-error`);

  inputSelector.classList.add(formObject.inputErrorClass);
  errorClass.textContent = errorMessage;
  errorClass.classList.add('popup__error_visible_active');
};
// Функция, которая удаляет класс с ошибкой
const hideInputError = (formObject, formSelector,inputSelector) => {
  const errorClass = formSelector.querySelector(`#${inputSelector.id}-error`);

  inputSelector.classList.remove(formObject.inputErrorClass);
  errorClass.classList.remove('popup__error_visible_active');
  errorClass.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formObject, formSelector,inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(formObject, formSelector,inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formObject, formSelector,inputSelector);
  }
};

const setEventListeners = (formObject, formSelector) => {
  const inputList = Array.from(formSelector.querySelectorAll(formObject.inputSelector));
  const submitButton = formSelector.querySelector(formObject.submitButtonSelector);

    formSelector.checkForm = () => {
      toggleButtonState(formObject, inputList,submitButton);
  };

  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      isValid(formObject, formSelector,inputSelector);
      toggleButtonState(formObject, inputList, submitButton);
    });
  });
};


const enableValidation = (formObject) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(formObject.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formObject, formSelector);
  });
};

const toggleButtonState = (formObject, inputList, submitButton) => {
  if(hasInvalidInput(inputList)){
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(formObject.inactiveButtonClass);
  } else {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove(formObject.inactiveButtonClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
