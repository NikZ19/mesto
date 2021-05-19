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
const closePopupPhoto = popupScalePhoto.querySelector('#close-fullsize'); // кнопка закрыть
const captionPopup = popupScalePhoto.querySelector('.popup__caption'); // подпись к фото
const photoPopup = popupScalePhoto.querySelector('.popup__image'); // фото попапа

const cardsList = document.querySelector('.places__items'); // находим контейнер для вставки
const cardTemplate = document.querySelector('#card'); // находим темплейт тег

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
  cardsList.prepend(createCard(addNewCard));
  formPopupAdd.reset();

  hidePopup(popupAdd);
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

// добавление карточек по умолчанию
initialCards.forEach(currentItem => {
  const newCards = createCard(currentItem);
  cardsList.append(newCards);
});

// вызовы обработчиков

editButton.addEventListener('click', () => {
  inputName.value = existName.textContent;
  inputAbout.value = existAbout.textContent;
  hideErrorMessage(inputName, document.querySelector(`#input-name-error`), config.inputErrorClass, config.errorClass);
  hideErrorMessage(inputAbout, document.querySelector(`#input-about-error`), config.inputErrorClass, config.errorClass);
  toggleButtonState([ inputName, inputAbout ], submitButtonEdit, config.inactiveButtonClass);
  showPopup(popupEdit);
});

addButton.addEventListener('click', () => {
  hideErrorMessage(inputTitle, document.querySelector(`#input-title-error`), config.inputErrorClass, config.errorClass);
  hideErrorMessage(inputLink, document.querySelector(`#input-link-error`), config.inputErrorClass, config.errorClass);
  toggleButtonState([ inputTitle, inputLink ], submitButtonAdd, config.inactiveButtonClass);
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
