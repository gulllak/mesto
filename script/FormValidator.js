export class FormValidator {
  constructor(validationConfig, form){
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._form = form;
  }

  _showInputError(inputElement, errorMessage) {
    const errorClass = this._form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorClass.textContent = errorMessage;
    errorClass.classList.add(`${this._errorClass}_active`);
  };

  _hideInputError(inputElement) {
    const errorClass = this._form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorClass.classList.remove(`${this._errorClass}_active`);
    errorClass.textContent = '';
  };

  resetHandlerValidation(validationConfig, popup) {
    const submitButton = popup.querySelector(validationConfig.submitButtonSelector);
    const inputList = Array.from(popup.querySelectorAll('.popup__input'));
    inputList.forEach(inputElement => {
         this._hideInputError(inputElement);
     });
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(validationConfig.inactiveButtonClass);
  };

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
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

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const submitButton = this._form.querySelector(this._submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, submitButton);
      });
    });
  };

  enableValidation() {
      this._setEventListeners();
  };
}
