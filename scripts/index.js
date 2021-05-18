const existName = document.querySelector('.profile__name'); // находим элемент с именем
const existAbout = document.querySelector('.profile__about'); // находим элемент с описанием

const formPopupEdit = document.forms.form_edit; // находим форму редактирвания
const inputName = formPopupEdit.input_name; // находим инпут для имени
const inputAbout = formPopupEdit.input_about; // находим инпут для описания

const popupEdit = document.querySelector('#popup-edit'); // находим блок попап редактирования профиля
const editButton = document.querySelector('.profile__edit-btn'); // находим кнопку редактирования профиля
const closePopupEdit = document.querySelector('#close-edit'); // находим кнопку закрыть

const formPopupAdd = document.forms.form_add; // находим форму добавления карточки
const inputTitle = formPopupAdd.input_title; // находим инпут для названия
const inputLink = formPopupAdd.input_link; // находим инпут для ссылки

const popupAdd = document.querySelector('#popup-add'); // находим блок попап дообавления карточки
const addButton = document.querySelector('.profile__add-btn'); // находим кнопку добавления карточки
const closePopupAdd = document.querySelector('#close-add'); // находим кнопку закрыть

const popupScalePhoto = document.querySelector('#popup-fullsize'); // попап для фото
const closePopupPhoto = popupScalePhoto.querySelector('#close-fullsize'); // кнопка закрыть
const captionPopup = popupScalePhoto.querySelector('.popup__caption'); // подпись к фото
const photoPopup = popupScalePhoto.querySelector('.popup__image'); // фото попапа

const cardsList = document.querySelector('.places__items'); // находим контейнер для вставки
const cardTemplate = document.querySelector('#card'); // находим темплейт тег

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// функции

// открытие попапа
function showPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  enableValidation(config);
}

// закрытие попапа
function hidePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function editFormSubmit(e) {
  e.preventDefault();
  existName.textContent = inputName.value;
  existAbout.textContent = inputAbout.value;
  hidePopup(popupEdit);
}

// создание карточки
function createCard(itemData) {
  const newCard = cardTemplate.content.querySelector('.places__item').cloneNode(true);
  const cardTitle = newCard.querySelector('.places__title');
  const cardImage = newCard.querySelector('.places__photo');
  const cardImageAlt = newCard.querySelector('.places__photo');
  const likeButton = newCard.querySelector('.places__like');
  const trashButton = newCard.querySelector('.places__trash');

  cardTitle.textContent = itemData.name;
  cardImage.src = itemData.link;
  cardImageAlt.alt = 'Фото ' + itemData.name;

  // лайк карточки
  likeButton.addEventListener('click', function (e) {
    e.target.classList.toggle('places__like_active');
  });

  // удаление карточки
  trashButton.addEventListener('click', function (e) {
    e.target.closest('.places__item').remove();
  });

  // увеличение фотографии карточки
  cardImage.addEventListener('click', function () {
    showPopup(popupScalePhoto);
    photoPopup.src = itemData.link;
    photoPopup.alt = 'Фото ' + itemData.name;
    captionPopup.textContent = itemData.name;
  });

  return newCard;
}
// добавление карточки
initialCards.forEach(currentItem => {
  const newCards = createCard(currentItem);
  cardsList.append(newCards);
});

// цепочка функций валидации

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
    editButton.addEventListener('click', () => {
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

// вызовы обработчиков

editButton.addEventListener('click', function () {
  inputName.value = existName.textContent;
  inputAbout.value = existAbout.textContent;
  showPopup(popupEdit);
});

addButton.addEventListener('click', function () {
  showPopup(popupAdd);
});

closePopupEdit.addEventListener('click', function () {
  hidePopup(popupEdit);
});

closePopupAdd.addEventListener('click', function () {
  hidePopup(popupAdd);
});

closePopupPhoto.addEventListener('click', function () {
  hidePopup(popupScalePhoto);
});

formPopupEdit.addEventListener('submit', editFormSubmit);

// обработка формы добавления карточки
formPopupAdd.addEventListener('submit', function (e) {
  e.preventDefault();

  const addNewCard = { name: inputTitle.value, link: inputLink.value };
  cardsList.prepend(createCard(addNewCard));
  formPopupAdd.reset();

  hidePopup(popupAdd);
});
