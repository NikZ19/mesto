export class Card {
  constructor(data, templateSelector, userId, { handleCardClick, handleCardLike, handleCardDelete }) {
    this._cardTitle = data.name;
    this._cardLink = data.link;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;

    this._popupScalePhoto = document.querySelector('#popup-fullsize');

    this._makeElement();
    this._setEventListeners();
  }

  _makeElement() {
    const cardTemplate = this._templateSelector.content.querySelector('.places__item');
    this._cardElement = cardTemplate.cloneNode(true);

    this._likeButton = this._cardElement.querySelector('.places__like');
    this._counterLikes = this._cardElement.querySelector('.place__like-counter');
    this._trashButton = this._cardElement.querySelector('.places__trash');
    this._cardImage = this._cardElement.querySelector('.places__photo');
    this._photoPopup = this._popupScalePhoto.querySelector('.popup__image');
    this._captionPopup = this._popupScalePhoto.querySelector('.popup__caption');

    this._cardElement.querySelector('.places__title').textContent = this._cardTitle;
    this._cardImage.src = this._cardLink;
    this._cardImage.alt = `Фото ${this._cardTitle}`;

    if (this._ownerId !== this._userId) {
      this._trashButton.style.display = 'none';
    }

    this._counterLikes.textContent = this._likes.length;

    this._checkIsLiked();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleCardLike(this._likeButton, this._cardId));
    this._trashButton.addEventListener('click', () => this._handleCardDelete(this._cardId, this._cardElement));
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._cardLink, this._cardTitle));
  }

  // removeCard() {
  //   this._cardElement.remove();
  // }

  _checkIsLiked() {
    this._likes.forEach(like => {
      if (like._id === this._userId) {
        this._likeButton.classList.add('places__like_active');
      }
    });
  }

  removeLike(likesList) {
    this._likeButton.classList.remove('places__like_active');
    this._counterLikes.textContent = likesList.length;
  }

  addLike(likesList) {
    this._likeButton.classList.add('places__like_active');
    this._counterLikes.textContent = likesList.length;
  }

  render() {
    return this._cardElement;
  }
}

