import './index.css';
import { config } from '../utils/config.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api';
import {
  formPopupAdd,
  inputName,
  inputAbout,
  addSubmitButton,
  editSubmitButton,
  avatarSubmitButton,
  editButton,
  addButton,
  avatarButton,
  templateContainer
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co',
  token: 'cc9b5eea-6347-43e1-8bc0-e5144b330bd4',
  cohort: 'cohort-25'
});

let userId;

Promise.all([api.getInitialCards(), api.getInitialProfile()])
  .then(([cardsData, userData]) => {
    userId = userData._id;
    renderCards.renderInitialCards(cardsData);
    userInfo.setUserInfo(userData);
  })
  .catch(err => console.log(err));

const renderCards = new Section({
  renderer: (cardData) => {
    const card = new Card(cardData, templateContainer, userId, {
      handleCardClick: (image, title) => {
        imagePopup.open(image, title)
      },
      handleCardLike: (likeElement, cardId) => {
        if (likeElement.classList.contains('places__like_active')) {
          api.removeLikeCard(cardId)
            .then(result => card.removeLike(result.likes))
            .catch(err => console.log(err));
        } else {
          api.likeCard(cardId)
            .then(result => card.addLike(result.likes))
            .catch(err => console.log(err));
        }
      },
      handleCardDelete: (cardId, cardElement) => {
        confirmPopup.open(cardId, cardElement)
      }
    })
    return card.render();
  }
}, '.places__items');

const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__about',
  avatar: '.profile__avatar'
});

const confirmPopup = new PopupWithConfirm('#popup-confirm', (cardId, cardElement) => {
  api.removeCard(cardId)
    .then(() => {
      cardElement.remove();
      confirmPopup.close();
    })
    .catch(err => console.log(err));
});
confirmPopup.setEventListeners();

const addPopup = new PopupWithForm('#popup-add', (cardData) => {
  addSubmitButton.textContent = 'Сохранение...';
  api.addNewCard(cardData)
    .then((result) => {
      renderCards.addItem(result);
      addPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => addSubmitButton.textContent = 'Создать');

});
addPopup.setEventListeners();

const editPopup = new PopupWithForm('#popup-edit', (userData) => {
  editSubmitButton.textContent = 'Сохранение...';
  api.updateUserInfo(userData)
    .then((result) => {
      userInfo.setUserInfo(result)
      editPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => editSubmitButton.textContent = 'Сохранить');
}
);
editPopup.setEventListeners();

const avatarPopup = new PopupWithForm('#popup-avatar', (link) => {
  avatarSubmitButton.textContent = 'Сохранение...';
  api.updateAvatar(link)
    .then((result) => {
      userInfo.setUserInfo(result);
      avatarPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => avatarSubmitButton.textContent = 'Сохранить');
});
avatarPopup.setEventListeners();

const imagePopup = new PopupWithImage('#popup-fullsize');
imagePopup.setEventListeners();

const profileFormValidator = new FormValidator(config, document.querySelector(`form[name="form_edit"]`));
profileFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, document.querySelector(`form[name="form_add"]`));
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, document.querySelector(`form[name="form_avatar"]`));
avatarFormValidator.enableValidation();

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

avatarButton.addEventListener('click', () => {
  avatarFormValidator.resetForm();
  avatarPopup.open()
});



