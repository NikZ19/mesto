const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
};

function showErrorMessage(inputElement, errorElement, inputErrorClass, errorClass) {
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideErrorMessage(inputElement, errorElement, inputErrorClass, errorClass) {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

function hasInvalidInput(inputList) {
   return inputList.every((inputElement) => inputElement.validity.valid);
}

function checkInputValidity(inputElement, formElement, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (inputElement.validity.valid) {
    hideErrorMessage(inputElement, errorElement, inputErrorClass, errorClass);
  } else {
    showErrorMessage(inputElement, errorElement, inputErrorClass, errorClass);
  }
}

function toggleButtonState(inputList, buttonElement, inactiveClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.remove(inactiveClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(inactiveClass);
    buttonElement.disabled = true;
  }
}

function setEventListeners(formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, ...restConfig }) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButtonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, formElement, restConfig);
      toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
    });
  });
}

function enableValidation({ formSelector, ...restConfig }) {
  Array.from(document.querySelectorAll(formSelector)).forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement, restConfig);
  });
}

enableValidation(config);
