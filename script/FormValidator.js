export class FormValidator {
  constructor(object,form){
    this._formSelector = object.formSelector;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
    this._form = form;
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorClass = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorClass.textContent = errorMessage;
    errorClass.classList.add(`${this._errorClass}_active`);
  };

  _hideInputError(formElement, inputElement) {
    const errorClass = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorClass.classList.remove(`${this._errorClass}_active`);
    errorClass.textContent = '';
  };

  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    };
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState(inputList, submitButton) {
    if(this._hasInvalidInput(inputList)){
      submitButton.setAttribute('disabled', true);
      submitButton.classList.add(this._inactiveButtonClass);
    } else {
      submitButton.removeAttribute('disabled');
      submitButton.classList.remove(this._inactiveButtonClass);
    };
  };

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const submitButton = formElement.querySelector(this._submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement);
        this._toggleButtonState(inputList, submitButton);
      });
    });
  };

  enableValidation() {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      this._setEventListeners(formElement);
    });
  };
}
