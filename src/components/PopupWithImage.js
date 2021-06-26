import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(image, title) {
    super.open();
    const popupImage = this.popupElement.querySelector('.popup__image');
    const popupCaption = this.popupElement.querySelector('.popup__caption');
    popupImage.src = image;
    popupImage.alt = `Изображение ${title}`;
    popupCaption.textContent = title;
  }
}
