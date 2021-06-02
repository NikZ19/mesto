import Card from './Card.js';
import FormValidator from './FormValidator.js';

const existName = document.querySelector('.profile__name'); // находим элемент с именем
const existAbout = document.querySelector('.profile__about'); // находим элемент с описанием

const formPopupEdit = document.forms.form_edit; // находим форму редактирвания
const inputName = formPopupEdit.input_name; // находим инпут для имени
const inputAbout = formPopupEdit.input_about; // находим инпут для описания
const submitButtonEdit = formPopupEdit.submit_btn_edit;

const popupEdit = document.querySelector('#popup-edit'); // находим блок попап редактирования профиля
const editButton = document.querySelector('.profile__edit-btn'); // находим кнопку редактирования профиля
const closePopupEdit = document.querySelector('#close-edit'); // находим кнопку закрыть

const formPopupAdd = document.forms.form_add; // находим форму добавления карточки
const inputTitle = formPopupAdd.input_title; // находим инпут для названия
const inputLink = formPopupAdd.input_link; // находим инпут для ссылки
const submitButtonAdd = formPopupAdd.submit_btn_add;

const popupAdd = document.querySelector('#popup-add'); // находим блок попап дообавления карточки
const addButton = document.querySelector('.profile__add-btn'); // находим кнопку добавления карточки
const closePopupAdd = document.querySelector('#close-add'); // находим кнопку закрыть

const popupScalePhoto = document.querySelector('#popup-fullsize'); // попап для фото
const closePopupPhoto = document.querySelector('#close-fullsize'); // кнопка закрыть

const cardsList = document.querySelector('.places__items'); // находим контейнер для вставки

// функции

// открытие попапа
function showPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
  document.addEventListener('mousedown', closePopupOverlay);
}

// закрытие попапа
function hidePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
  document.removeEventListener('mousedown', closePopupOverlay);
}
// закрытие попапа по оверлею
function closePopupOverlay(e) {
  if (e.target.classList.contains('popup_opened')) {
    hidePopup(document.querySelector('.popup_opened'));
  }
}
// закрытие попапа на клавишу Esc
function closePopupEscape(e) {
  if (e.key === 'Escape') {
    hidePopup(document.querySelector('.popup_opened'));
  }
}

// сабмит формы редактирования профиля
function handleProfileFormSubmit(e) {
  e.preventDefault();
  existName.textContent = inputName.value;
  existAbout.textContent = inputAbout.value;
  hidePopup(popupEdit);
}

// сабмит формы добавления карточки
function handleCardFormSubmit(e) {
  e.preventDefault();
  const addNewCard = { name: inputTitle.value, link: inputLink.value };
  createCard(addNewCard);
  formPopupAdd.reset();

  hidePopup(popupAdd);
}

// создание карточки
function createCard(data) {

  const newCard = new Card(data, '#card', showPopup);
  cardsList.prepend(newCard.render());

  return newCard;
}

// добавление карточек по умолчанию
initialCards.forEach((currentItem) => {
  const newCards = createCard(currentItem);
});

// вызовы обработчиков
editButton.addEventListener('click', () => {
  inputName.value = existName.textContent;
  inputAbout.value = existAbout.textContent;
  profileFormValidator.hideErrorMessage(inputName, document.querySelector(`#input-name-error`));
  profileFormValidator.hideErrorMessage(inputAbout, document.querySelector(`#input-about-error`));
  profileFormValidator.toggleButtonState();
  showPopup(popupEdit);
});

addButton.addEventListener('click', () => {
  addFormValidator.hideErrorMessage(inputTitle, document.querySelector(`#input-title-error`));
  addFormValidator.hideErrorMessage(inputLink, document.querySelector(`#input-link-error`));
  addFormValidator.toggleButtonState();
  formPopupAdd.reset();
  showPopup(popupAdd);
});

closePopupEdit.addEventListener('click', () => {
  hidePopup(popupEdit);
});

closePopupAdd.addEventListener('click', () => {
  hidePopup(popupAdd);
});

closePopupPhoto.addEventListener('click', () => {
  hidePopup(popupScalePhoto);
});

formPopupEdit.addEventListener('submit', handleProfileFormSubmit);

formPopupAdd.addEventListener('submit', handleCardFormSubmit);

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
};

const profileFormValidator = new FormValidator(config, document.querySelector(`form[name="form_edit"]`));
profileFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, document.querySelector(`form[name="form_add"]`));
addFormValidator.enableValidation();
