export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.popupElement = document.querySelector(popupSelector);
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this.popupElement.querySelector('.popup__close-btn').addEventListener('click', () => {
      this.close();
    });

    this.popupElement.addEventListener('click', (e) => this._handleOverlayClick(e));
  }

  open() {
    this.popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', (e) => {
      this._handleEscClose(e);
    });
  }

  close() {
    this.popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', (e) => {
      this._handleEscClose(e);
    });
  }
}
