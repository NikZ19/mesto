const formPopupAdd = document.forms.form_add; // форма добавления карточки

const inputName = document.querySelector('#input-name'); //  инпут имени
const inputAbout = document.querySelector('#input-about'); // инпут описания

const editButton = document.querySelector('.profile__edit-btn'); // кнопка редактирования профиля
const addButton = document.querySelector('.profile__add-btn'); // кнопка добавления карточки

const templateContainer = document.querySelector('#card'); // темплейт контейнер с разметкой карточки

export { formPopupAdd, inputName, inputAbout, editButton, addButton, templateContainer };
