import { Popup } from "./Popup";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleRemove) {
  super(popupSelector);
  this._handleRemove = handleRemove;

  }

  setEventListeners() {
    super.setEventListeners();
    this.popupElement.querySelector('.popup__save-btn').addEventListener('click', () => {
      this._handleRemove(this.cardId, this.cardElement);
    });
  }

  open(cardId, cardElement) {
    super.open();
    this.cardId = cardId;
    this.cardElement = cardElement;
  }


}
