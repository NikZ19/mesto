export default class Card {
  constructor(data, templateSelector, openPhoto) {
    this._cardTitle = data.name;
    this._cardLink = data.link;
    this._templateSelector = templateSelector;
    this.openPhoto = openPhoto;

    this._popupScalePhoto = document.querySelector('#popup-fullsize');

    this._makeElement();
    this._setEventListeners();
  }

  _makeElement() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.places__item');
    this._cardElement = cardTemplate.cloneNode(true);

    this._likeButton = this._cardElement.querySelector('.places__like');
    this._trashButton = this._cardElement.querySelector('.places__trash');
    this._cardImage = this._cardElement.querySelector('.places__photo');
    this._photoPopup = this._popupScalePhoto.querySelector('.popup__image');
    this._captionPopup = this._popupScalePhoto.querySelector('.popup__caption');

    this._cardElement.querySelector('.places__title').textContent = this._cardTitle;
    this._cardImage.src = this._cardLink;
    this._cardImage.alt = `Фото ${this._cardTitle}`;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeClick());
    this._trashButton.addEventListener('click', () => this._handleRemoveClick());
    this._cardImage.addEventListener('click', () => this._handleOpenPhoto());
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle('places__like_active');
  }

  _handleRemoveClick() {
    this._cardElement.remove();
  }

  _handleOpenPhoto() {
    this._photoPopup.src = this._cardLink;
    this._photoPopup.alt = `Фото ${this._cardTitle}`;
    this._captionPopup.textContent = this._cardTitle;
    this.openPhoto(this._popupScalePhoto);
  }

  render() {
    return this._cardElement;
  }
}

