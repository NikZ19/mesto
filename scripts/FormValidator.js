export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._submitButtonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _setEventListeners() {
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  _showErrorMessage(inputElement, errorElement) {
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  hideErrorMessage(inputElement, errorElement) {
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput(inputList) {
    return inputList.every((inputElement) => inputElement.validity.valid);
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (inputElement.validity.valid) {
      this.hideErrorMessage(inputElement, errorElement);
    } else {
      this._showErrorMessage(inputElement, errorElement);
    }
  }

  toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButtonElement.classList.remove(this._config.inactiveButtonClass);
      this._submitButtonElement.disabled = false;
    } else {
      this._submitButtonElement.classList.add(this._config.inactiveButtonClass);
      this._submitButtonElement.disabled = true;
    }
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}
