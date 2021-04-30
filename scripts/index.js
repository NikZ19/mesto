const formPopupEdit = document.forms.form_edit; // находим форму редактирвания
const formPopupAdd = document.forms.form_add; // находим форму добавления
const existName = document.querySelector('.profile__name'); // находим элемент с именем
const existAbout = document.querySelector('.profile__about'); // находим элемент с описанием
const inputName = document.querySelector('.popup__input_el_name'); // находим инпут для имени
const inputAbout = document.querySelector('.popup__input_el_about'); // находим инпут для описания

const popupEdit = document.querySelector('#popup-edit'); // находим блок попап редактирования профиля
const editButton = document.querySelector('.profile__edit-btn'); // находим кнопку редактирования профиля
const closePopupEdit = document.querySelector('#close-edit'); // находим кнопку закрыть

const popupAdd = document.querySelector('#popup-add'); // находим блок попап дообавления карточки
const addButton = document.querySelector('.profile__add-btn'); // находим кнопку добавления карточки
const closePopupAdd = document.querySelector('#close-add'); // находим кнопку закрыть

function openPopup(openElement) {
  openElement.classList.add('popup_opened');
}

function hidePopup(closeElement) {
  closeElement.classList.remove('popup_opened');
}

function editFormSubmit(event) {
  event.preventDefault();
  existName.textContent = inputName.value;
  existAbout.textContent = inputAbout.value;
  hidePopup(popupEdit);
}

editButton.addEventListener('click', function () {
  inputName.value = existName.textContent;
  inputAbout.value = existAbout.textContent;
  openPopup(popupEdit);
});

addButton.addEventListener('click', function () {
  openPopup(popupAdd);
});

closePopupEdit.addEventListener('click', function () {
  hidePopup(popupEdit);
});

closePopupAdd.addEventListener('click', function () {
  hidePopup(popupAdd);
});

formPopupEdit.addEventListener('submit', editFormSubmit);















const cardsList = document.querySelector('.places__items');
const cardTemplate = document.querySelector('#card').content;

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

initialCards.forEach(element => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.places__title').textContent = element.name;
  cardElement.querySelector('.places__photo').src = element.link;
  cardElement.querySelector('.places__photo').alt = 'Фото ' + element.name;
  cardsList.append(cardElement);
});
