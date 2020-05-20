// Функция, которая добавляет класс с ошибкой
const showInputError = (formObject, formElement, inputElement, errorMessage) => {
  const errorClass = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(formObject.inputErrorClass);
  errorClass.textContent = errorMessage;
  errorClass.classList.add('popup__error_visible_active');
};
// Функция, которая удаляет класс с ошибкой
const hideInputError = (formObject, formElement, inputElement) => {
  const errorClass = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(formObject.inputErrorClass);
  errorClass.classList.remove('popup__error_visible_active');
  errorClass.textContent = '';
};

function resetHandlerValidation (input, popup) {

  input.forEach(elem => {
    const errorClass = document.querySelector(`#${elem.id}-error`);
    elem.classList.remove('popup__input_type_error');
    errorClass.classList.remove('popup__error_visible_active');
    errorClass.textContent = '';
  });

  const submitButton = popup.querySelector('.popup__button');

  submitButton.setAttribute('disabled', true);
  submitButton.classList.add('popup__button_disabled');

};

// Функция, которая проверяет валидность поля
const isValid = (formObject, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formObject, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formObject, formElement, inputElement);
  }
};

const setEventListeners = (formObject, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
  const submitButton = formElement.querySelector(formObject.submitButtonSelector);

    formElement.checkForm = () => {
      toggleButtonState(formObject, inputList,submitButton);
  };

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formObject, formElement, inputElement);
      toggleButtonState(formObject, inputList, submitButton);
    });
  });
};


const enableValidation = (formObject) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(formObject.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formObject, formElement);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
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

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
