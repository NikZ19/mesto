import './index.css';
import { initialCards } from '../utils/initial-сards.js';
import { config } from '../utils/config.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { GetUserInfo } from '../components/GetUserInfo.js';
import {
  formPopupAdd,
  inputName,
  inputAbout,
  editButton,
  addButton,
  templateContainer
} from '../utils/constants.js';

// функции
const handleCardClick = (image, title) => imagePopup.open(image, title);

// создание классов
const renderCards = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = new Card(cardData, templateContainer, handleCardClick);
    return card.render();
  }
}, '.places__items');

renderCards.renderInitialCards(); // рендер начальных карточек

const addPopup = new PopupWithForm('#popup-add', (cardData) => {
  renderCards.addItem({
    name: cardData.input_title,
    link: cardData.input_link
  });
  addPopup.close();
});

addPopup.setEventListeners();

const editPopup = new PopupWithForm('#popup-edit', (userData) => {
  userInfo.setUserInfo(userData);
  editPopup.close();
});

editPopup.setEventListeners();

const imagePopup = new PopupWithImage('#popup-fullsize');
imagePopup.setEventListeners();

const userInfo = new GetUserInfo({ name: '.profile__name', about: '.profile__about' });

const profileFormValidator = new FormValidator(config, document.querySelector(`form[name="form_edit"]`));
profileFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, document.querySelector(`form[name="form_add"]`));
addFormValidator.enableValidation();

// вызовы обработчиков
editButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputAbout.value = userData.about;
  profileFormValidator.resetForm();
  editPopup.open();
});

addButton.addEventListener('click', () => {
  addFormValidator.resetForm();
  formPopupAdd.reset();
  addPopup.open();
});



