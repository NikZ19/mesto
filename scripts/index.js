const popup = document.querySelector('.popup');
const formPopup = popup.querySelector('.popup__container');
const inputName = formPopup.querySelector('.popup__input_name');
const inputAbout = formPopup.querySelector('.popup__input_about');
const saveButton = document.querySelector('.popup__save-btn');
const closePopup = document.querySelector('.popup__close-btn');

const existName = document.querySelector('.profile__name');
const existAbout = document.querySelector('.profile__about');
const editButton = document.querySelector('.profile__edit-btn');

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
