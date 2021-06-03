export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._submitButtonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _showErrorMessage(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideErrorMessage(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput(inputList) {
    return inputList.every((inputElement) => inputElement.validity.valid);
  }

  _checkInputValidity(inputElement) {

    if (inputElement.validity.valid) {
      this._hideErrorMessage(inputElement);
    } else {
      this._showErrorMessage(inputElement);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButtonElement.classList.remove(this._config.inactiveButtonClass);
      this._submitButtonElement.disabled = false;
    } else {
      this._submitButtonElement.classList.add(this._config.inactiveButtonClass);
      this._submitButtonElement.disabled = true;
    }
  }

  resetForm() {
    this._inputList.forEach(input => {
      const errorElement = this._formElement.querySelector(`#${input.id}-error`);
      input.classList.remove(this._config.inputErrorClass);
      errorElement.classList.remove(this._config.errorClass);
      errorElement.textContent = '';
      this._toggleButtonState();
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}
