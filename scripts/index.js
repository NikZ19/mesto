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

function switchPopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
}

function editFormSubmit(evt) {
  evt.preventDefault();
  existName.textContent = inputName.value;
  existAbout.textContent = inputAbout.value;
  switchPopup(popupEdit);
}

editButton.addEventListener('click', function () {
  inputName.value = existName.textContent;
  inputAbout.value = existAbout.textContent;
  switchPopup(popupEdit);
});

addButton.addEventListener('click', function () {
  switchPopup(popupAdd);
});

closePopupEdit.addEventListener('click', function () {
  switchPopup(popupEdit);
});

closePopupAdd.addEventListener('click', function () {
  switchPopup(popupAdd);
});

formPopupEdit.addEventListener('submit', editFormSubmit);


const cardsList = document.querySelector('.places__items'); // находим контейнер для вставки
// const cardTemplate = document.querySelector('#card').content; // находим содержимое тэмплейт тега
const cardTemplate = document.querySelector('#card');

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

function createCard(itemData) {
  const newCard = cardTemplate.content.querySelector('.places__item').cloneNode(true);
  const cardTitle = newCard.querySelector('.places__title');
  const cardImage = newCard.querySelector('.places__photo');
  const cardImageAlt = newCard.querySelector('.places__photo');

  cardTitle.textContent = itemData.name;
  cardImage.src = itemData.link;
  cardImageAlt.alt = 'Фото ' + itemData.name;

  inputTitle.value = '';
  inputLink.value = '';

  return newCard;
}

initialCards.forEach(currentItem => {
  const newCards = createCard(currentItem);
  cardsList.append(newCards);
});

formPopupAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const addNewCard = { name: inputTitle.value, link: inputLink.value };
  cardsList.prepend(createCard(addNewCard));

  switchPopup(popupAdd);
});
