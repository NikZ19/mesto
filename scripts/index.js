let popup = document.querySelector('.popup'); // находим блок попап
let existName = document.querySelector('.profile__name'); // находим элемент с именем
let existAbout = document.querySelector('.profile__about'); // находим элемент с описанием
let formPopup = document.forms.popup; // находим форму
let inputName = document.querySelector('.popup__input_el_name'); // находим инпут для имени
let inputAbout = document.querySelector('.popup__input_el_about'); // находим инпут для описания
let editProfileButton = document.querySelector('.profile__edit-btn'); // находим кнопку редактирования профиля
let closePopupButton = document.querySelector('.popup__close-btn'); // находим кнопку закрыть

function showPopup() {
  popup.classList.add('popup_opened');
  inputName.value = existName.textContent;
  inputAbout.value = existAbout.textContent;
}

function hidePopup() {
  popup.classList.remove('popup_opened');
}

function editFormSubmit(event) {
  event.preventDefault();
  existName.textContent = inputName.value;
  existAbout.textContent = inputAbout.value;
  hidePopup();
}

editProfileButton.addEventListener('click', showPopup);
closePopupButton.addEventListener('click', hidePopup);
formPopup.addEventListener('submit', editFormSubmit);
