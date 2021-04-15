let popup = document.querySelector('.popup');
let formPopup = popup.querySelector('.popup__container');
let inputName = formPopup.querySelector('.popup__input_name');
let inputAbout = formPopup.querySelector('.popup__input_about');
let saveButton = document.querySelector('.popup__save-btn');
let closePopup = document.querySelector('.popup__close-btn');

let existName = document.querySelector('.profile__name');
let existAbout = document.querySelector('.profile__about');
let editButton = document.querySelector('.profile__edit-btn');

function showPopup() {
  popup.classList.toggle('popup_opened');
  inputName.value = existName.innerHTML;
  inputAbout.value = existAbout.innerHTML;
}

function formSubmitHandler(event) {
  event.preventDefault();
  existName.textContent = inputName.value;
  existAbout.textContent = inputAbout.value;
  showPopup();
}

editButton.addEventListener('click', showPopup);
closePopup.addEventListener('click', showPopup);
saveButton.addEventListener('click', formSubmitHandler);
