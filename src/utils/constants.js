const formPopupAdd = document.forms.form_add; // форма добавления карточки

const inputName = document.querySelector('#input-name'); //  инпут имени
const inputAbout = document.querySelector('#input-about'); // инпут описания

const addSubmitButton = document.querySelector(`button[name="submit_btn_add"]`);
const editSubmitButton = document.querySelector(`button[name="submit_btn_edit"]`);
const avatarSubmitButton = document.querySelector(`button[name="submit_btn_avatar"]`);

const editButton = document.querySelector('.profile__edit-btn'); // кнопка редактирования профиля
const addButton = document.querySelector('.profile__add-btn'); // кнопка добавления карточки
const avatarButton = document.querySelector('.profile__avatar-edit-btn'); // кнопка редактирования аватарки

const templateContainer = document.querySelector('#card'); // темплейт контейнер с разметкой карточки

export {
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
};
