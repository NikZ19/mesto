import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCb) {
    super(popupSelector);
    this._formSubmitCb = formSubmitCb;
    this._formElement = this.popupElement.querySelector('.popup__form');

    this._inputsList = Array.from(this._formElement.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const inputs = {};
    this._inputsList.forEach(input => {
      inputs[input.name] = input.value;
    });

    return inputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this._formSubmitCb(this._getInputValues())
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
